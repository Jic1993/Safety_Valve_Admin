import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404'

import Login from '@/views/Login'

import Home from '@/views/Home'
import User from '@/views/User'
import Apply from '@/views/Apply'
import ApplyForm from '@/views/ApplyForm'
import ApplyList from '@/views/ApplyList'
import Issue from '@/views/Issue'
import Review from '@/views/Review'

import Setting from '@/views/Setting'
import Basic from '@/views/Setting/Basic'
import Profile from '@/views/Setting/Profile'
import Account from '@/views/Setting/Account'


import Test from '@/views/Test'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/apply',
      children: [
        { path: '/User', name: 'User', component: User },
        { path: '/Issue', name: 'Issue', component: Issue },
        { path: '/Review', name: 'Review', component: Review },
        { path: '/apply', name: 'apply', component: Apply },
        { path: '/setting', name: 'Setting', component: Setting, redirect: '/setting/basic',
          children: [
            { path: '/setting/basic', name: 'Basic', component: Basic },
            { path: '/setting/profile', name: 'Profile', component: Profile },
            { path: '/setting/account',  name: 'Account', component: Account }
          ]
        }
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
})

export default router;
