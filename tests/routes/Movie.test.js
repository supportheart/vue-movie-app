window.scrollTo = jest.fn();

import { shallowMount } from '@vue/test-utils';
import Movie from '~/routes/Movie';
import store from '~/store';
import router from '~/routes';
import loadImage from '~/plugins/loadImage';

describe('routes/Movie.vue',() => {
  let wrapper;

  beforeEach( async() => {
    router.push('/movie/tt1234567');
    await router.isReady();
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    });
  });
  test('최초 접속한 URL을 확인합니다', () => {
    expect(wrapper.vm.$route.params.id).toBe('tt1234567');
  });
  test('지정한 이미지 크기로 URL을 변경합니다', () => {
    const url = 'https://google.com/sample_image_SX300';
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700');
    expect(wrapper.vm.requestDiffSizeImage(url, 900)).toContain('SX900');
  });
  test('정상적인 이미지 주소가 아닌 경우 빈 문자를 출력합니다', () => {
    const url = 'N/A';
    expect(wrapper.vm.requestDiffSizeImage()).toBe('');
    expect(wrapper.vm.requestDiffSizeImage(url)).toBe('');
  })
})
