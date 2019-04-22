import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Webcam from '@/components/Webcam'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/webcam',
      name: 'Webcam',
      component: Webcam
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
