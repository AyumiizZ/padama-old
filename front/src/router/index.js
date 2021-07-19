import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Search from "@/views/Search"
import Patient from "@/views/Patient"
import Vdo from "@/views/Vdo"
import Pdf from "@/views/Pdf"

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
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/patient/:_id",
    name: "Patient",
    component: Patient
  },
  {
    path: "/vdo/:_id",
    name: "VDO",
    component: Vdo,
  },
  {
    path: "/pdf/:_id",
    name: "PDF",
    component: Pdf
  }
];

const router = new VueRouter({
  routes,
});

export default router;
