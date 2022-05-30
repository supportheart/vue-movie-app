window.scrollTo = jest.fn();

import { shallowMount } from '@vue/test-utils';
import router from '~/routes';
import store from '~/store';
import Header from '~/components/Header';


describe('components.vue', () => {
  let wrapper;
  beforeEach(async () => {
    router.push('/movie/tt1234567');
    await router.isReady();
    wrapper = shallowMount(Header, {
      global: {
        plugins: [
          router,
          store
        ]
      }
    });
  });

  test('경로 정규표현식이 없는 경우 일치하지 않습니다', () => {

    const regExp = undefined;
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });
  test('경로 정규표현식 일치해야 합니다', () => {
    const regExp = /^\/movie/;
    // expect(wrapper.vm.isMatch(regExp)).toBe(true);
    expect(wrapper.vm.isMatch(regExp)).toBe(true);
  })
  test('정규 표현식과 일치하지 않아야 합니다.', () => {
    const regexp = /^\/heropy/
    expect(wrapper.vm.isMatch(regexp)).toBe(false);
  })
});