import { createRouter, createWebHashHistory } from "vue-router";
import Home from './Home';
import Moive from './Movie';
import About from './About';
import NotFound from './NotFound'


export default createRouter({
  //Hash, History
  //Hash
  //https://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  //page
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Moive
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})