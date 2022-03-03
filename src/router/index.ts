import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movies/:section",
    component: () => import("../views/MoviesView.vue"),
  },
  {
    path: "/movies",
    name: "popular-movies",
    component: () => import("../views/MoviesView.vue"),
  },
  {
    path: "/movie/:id",
    component: () => import("../views/MovieView.vue"),
  },
  {
    path: "/tv-shows/:section",
    component: () => import("../views/TVShowsView.vue"),
  },
  {
    path: "/tv-shows",
    name: "popular-shows",
    component: () => import("../views/TVShowsView.vue"),
  },
  {
    path: "/tv-show/:id",
    component: () => import("../views/TVShowView.vue"),
  },
  {
    path: "/people",
    name: "people",
    component: () => import("../views/PeopleView.vue"),
  },
  {
    path: "/person/:personId",
    name: "person",
    component: () => import("../views/PersonView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
