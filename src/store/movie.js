import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

const _defaultMessage ='Search for the movie title';

export default {
  // 하나의 스토어에서 모듈화되어 사용될 수 있다를 명시
  namespaced: true,
  // data를 의미
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }),
  // computed 와 동일
  getters: {},
  // methods 와 유사
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      // state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    }
  },
  // 비동기로 동작
  actions: {
    async searchMovies({
      state,
      commit
    }, payload) {
      if (state.loading) return;
      commit('updateState', {
        message: '',
        loading: true,
        searchData: {
          title: payload.title,
          type: payload.type,
          number: payload.number,
          year: payload.year
        }
      });
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        });
        const {
          Search,
          totalResults
        } = res.data;
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        });

        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);

        // 추가 요청
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) break;
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const {
              Search
            } = res.data;
            commit('updateState', {
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ],
            });
          }
        }
      } catch ({ message }) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) {
      if (state.loading) return;

      commit('updateState', {
        theMovie: {},
        loading: true
      })
      try {
        const res = await _fetchMovie(payload);
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState',{
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
 return await  axios.post('/.netlify/functions/movie', payload)
}