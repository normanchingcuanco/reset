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
    path: "/admin/advisors/edit/:id",
    name: "AdminEditAdvisor",
    component: () => import("../pages/AdminEditAdvisor.vue")
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
  },

  // ✅ NEW: Advisor Registration / Application Page
  {
    path: "/advisor-register",
    name: "AdvisorRegister",
    component: () => import("../pages/AdvisorRegister.vue")
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

/* ================= ROUTE GUARDS ================= */

router.beforeEach((to) => {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "null")

  if (to.path === "/create" && !token) {
    return "/login"
  }

  if (to.path.startsWith("/edit") && !token) {
    return "/login"
  }

  if (to.path === "/admin" && !user?.isAdmin) {
    return "/"
  }

  return true
})
/* ================= HARD SCROLL FIX =================
   Ensures scroll happens AFTER the new page is rendered
*/
router.afterEach(async () => {
  await nextTick()
  window.scrollTo(0, 0)
})

export default router