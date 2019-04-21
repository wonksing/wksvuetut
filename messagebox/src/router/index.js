import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VuejsDialog from 'vuejs-dialog'

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

// Tell Vue to install the plugin.
Vue.use(VuejsDialog)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
