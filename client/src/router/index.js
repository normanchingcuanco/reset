import { createRouter, createWebHistory } from "vue-router"
import { nextTick } from "vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/Register.vue")
  },
  {
    path: "/posts/:id",
    name: "PostDetails",
    component: () => import("../pages/PostDetails.vue")
  },
  {
    path: "/create",
    name: "CreatePost",
    component: () => import("../pages/CreatePost.vue")
  },
  {
    path: "/edit/:id",
    name: "EditPost",
    component: () => import("../pages/EditPost.vue")
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: () => import("../pages/AdminDashboard.vue")
  },
  {
    path: "/start-here",
    name: "StartHere",
    component: () => import("../pages/StartHere.vue")
  },
  {
    path: "/advisors",
    name: "Advisors",
    component: () => import("../pages/Advisors.vue")
  },
  {
    path: "/advisors/:slug",
    name: "AdvisorProfile",
    component: () => import("../pages/AdvisorProfile.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

/* ================= ROUTE GUARDS ================= */

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  if (to.path === "/create" && !token) return next("/login")
  if (to.path.startsWith("/edit") && !token) return next("/login")
  if (to.path === "/admin" && !user?.isAdmin) return next("/")

  next()
})

/* ================= HARD SCROLL FIX =================
   Ensures scroll happens AFTER the new page is rendered
*/
router.afterEach(async () => {
  await nextTick()
  window.scrollTo(0, 0)
})

export default router