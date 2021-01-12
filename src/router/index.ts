import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";
import Account from "../views/Account.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Auth
  },
  { path: "/account/:accountId", component: Account },
  // otherwise redirect to login
  { path: "*", redirect: "/" }
  // {
  //   // path: "/about",
  //   // name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const loggedIn = true; // localStorage.getItem("user")

  if (to.path !== "/" && !loggedIn) {
    return next("/");
  }

  next();
});

export default router;
