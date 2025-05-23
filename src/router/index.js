import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";
import store from "../store";
import HomeView from "../views/HomeView.vue";
import CourseDetails from "../views/CourseDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/CourseList.vue"),
    },
    {
      path: "/courses/:id",
      name: "CourseDetail",
      component: () => import("@/views/CourseDetail.vue"),
      props: true,
    },
    {
      path: "/beginner",
      name: "BeginnerPath",
      component: () => import("@/views/learning-paths/Beginner.vue"),
      meta: { title: "Beginner Learning Path" },
    },
    {
      path: "/intermediate",
      name: "IntermediatePath",
      component: () => import("@/views/learning-paths/Intermediate.vue"),
      meta: { title: "Intermediate Learning Path" },
    },
    {
      path: "/advanced",
      name: "AdvancedPath",
      component: () => import("@/views/learning-paths/Advanced.vue"),
      meta: { title: "Advanced Learning Path" },
    },
    {
      path: "/search",
      name: "SearchResults",
      component: () => import("@/views/SearchResults.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/Signup.vue"),
      meta: { requiresGuest: true },
    },
    {
    path: '/dashboard/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'UserProfile',
        component: () => import('@/views/dashboard/UserProfile.vue'),
        meta: { title: 'User Profile' }
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: () => import('@/views/dashboard/UserSettings.vue'),
        meta: { title: 'User Settings' }
      },
    ],
    },
  ],
  // Scroll behavior to scroll to the top of the page on navigation
    
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});
// Navigation guard to check auth status
router.beforeEach(async (to, from, next) => {
  // Wait for auth to initialize
  await store.dispatch("auth/initializeAuth");

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (requiresGuest && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
// Set the document title based on the route meta title

export default router;
