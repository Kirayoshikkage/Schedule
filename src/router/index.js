import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GroupsView from "../views/GroupsView.vue";
import GroupView from "../views/GroupView.vue";
import TeacherView from "../views/TeacherView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/groups/:id",
    alias: "/groups",
    name: "groups",
    component: GroupsView,
    beforeEnter(to, from, next) {
      if (!to.params.id) {
        next({
          name: "home",
        });

        return;
      }

      next();
    },
  },
  {
    path: "/group/:id",
    alias: "/group",
    name: "group",
    component: GroupView,
    beforeEnter(to, from, next) {
      if (!to.params.id) {
        next({
          name: "home",
        });

        return;
      }

      next();
    },
  },
  {
    path: "/teacher/:id",
    alias: "/teacher",
    name: "teacher",
    component: TeacherView,
    beforeEnter(to, from, next) {
      if (!to.params.id) {
        next({
          name: "home",
        });

        return;
      }

      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
