import axios from 'axios';
import {
  cloneDeep
} from 'lodash';
import movieStore from '~/store/movie';



describe('store/movie.js', () => {
  let store;
  beforeEach(() => {
    store = cloneDeep(movieStore);
    store.state = store.state();

    store.commit = (name, payload) => {
      store.mutations[name](store.state, payload);
    }

    store.dispatch = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch
      }
      return store.actions[name](context, payload);
    }

  })
  test('영화 데이터를 초기화 합니다', () => {
    store.commit('updateState', {
      movies: [{
        imdbID: '1'
      }],
      message: 'hello world',
      loading: true
    })
    store.commit('resetMovies');
    expect(store.state.movies).toEqual([])
    expect(store.state.message).toBe('Search for the movie title');
    expect(store.state.loading).toBe(false);
  })

  test('영화 목록을 잘 가져온 경우 데이터를 확인합니다', async () => {
    const res = {
      data: {
        totalResults: '1',
        Search: [{
          imdbID: '1',
          TItle: "Hello",
          Poster: "hello.jog",
          Year: 2022
        }]
      }
    }
    axios.post = jest.fn().mockResolvedValue(res);

    await store.dispatch('searchMovies');

    expect(store.state.movies).toEqual(res.data.Search);
  })

  test('영화 목록을 가져오지 못한 경우 에러 메시지를 확인합니다', async () => {
    const errorMassage = "Network Error.";
    axios.post = jest.fn().mockRejectedValue(new Error(errorMassage));

    await store.dispatch('searchMovies');

    expect(store.state.message).toBe(errorMassage);
  })

  test('영화 아이템이 중복된 경우 고유하게 처리합니다', async () => {
    const res = {
      data: {
        totalResults: '1',
        Search: [{
            imdbID: '1',
            TItle: "Hello",
            Poster: "hello.jog",
            Year: 2022
          },
          {
            imdbID: '1',
            TItle: "Hello",
            Poster: "hello.jog",
            Year: 2022
          },
          {
            imdbID: '1',
            TItle: "Hello",
            Poster: "hello.jog",
            Year: 2022
          }
        ]
      }
    }
    axios.post = jest.fn().mockResolvedValue(res);
    await store.dispatch('searchMovies');
    expect(store.state.movies.length).toBe(1);
  })

  test('단일 영화의 상세 정보를 잘 가져온 경우 데이터를 확인합니다', async () => {
    const res = {
      data: {
        imdbID: '1',
        Title: 'Frozen',
        Poster: 'frozen.jpg',
        Year: '2021'
      }
    }
    axios.post = jest.fn().mockResolvedValue(res);
    await store.dispatch('searchMovieWithId');
    expect(store.state.theMovie).toEqual(res.data);
  })
})