import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6ce17788 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _7cc6f0bd = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _1c4f6f4b = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _1f57990b = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _5cdb9901 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _61129dcb = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _0621dc58 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _6ce17788,
    children: [{
      path: "",
      component: _7cc6f0bd,
      name: "home"
    }, {
      path: "/login",
      component: _1c4f6f4b,
      name: "login"
    }, {
      path: "/register",
      component: _1c4f6f4b,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _1f57990b,
      name: "profile"
    }, {
      path: "/settings",
      component: _5cdb9901,
      name: "settings"
    }, {
      path: "/editor",
      component: _61129dcb,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _0621dc58,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
