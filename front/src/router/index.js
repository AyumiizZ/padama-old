import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Search from "@/views/Search";
import Patient from "@/views/Patient";
import Vdo from "@/views/Vdo";
import Pdf from "@/views/Pdf";
import Pic from "@/views/Pic";
import CaseSearch from "@/views/CaseSearch";
import PageNotFound from "@/views/PageNotFound";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/case-search",
    name: "caseSearch",
    component: CaseSearch,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/patient/:_id",
    name: "Patient",
    component: Patient,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/vdo/:_id",
    name: "VDO",
    component: Vdo,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pdf/:_id",
    name: "PDF",
    component: Pdf,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pic/:_id",
    name: "Pic",
    component: Pic,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

var debugMode = true
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  console.log(next)
  // next()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!debugMode && !store.state.isUserLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
