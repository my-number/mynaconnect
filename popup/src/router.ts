import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index";
import Root from "./components/Root.vue";
import RequestPermission from "./components/RequestPermission/index";
import AuthPassword from "./components/AuthPassword.vue";
import SelectReader from "./components/SelectReader.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Root },
  { path: "/get-auth-cert", component: RequestPermission.GetAuthCert },
  { path: "/sign-with-auth", component: RequestPermission.SignWithAuth },
  { path: "/auth-password", component: AuthPassword },
  { path: "/select-reader", component: SelectReader },
];

const router = new VueRouter({
  routes,
});
export default router;
