<template>
  <nav class="navbar">
    <div class="nav-container">

      <!-- LOGO -->
      <router-link to="/" class="nav-logo">
        <span class="logo-re">RE</span><span class="logo-set">SET</span>
      </router-link>

      <!-- NAV LINKS -->
      <div class="nav-links">
        <router-link to="/start-here">Start Here</router-link>
        <router-link to="/advisors">Advisors</router-link>
        <router-link to="/about">About</router-link>

        <a
          href="https://www.youtube.com/watch?v=sTJ7AzBIJoI"
          target="_blank"
        >
          YouTube
        </a>

        <router-link v-if="isAdmin || isAdvisor" to="/create">
          Write
        </router-link>

        <router-link v-if="isAdmin" to="/admin">
          Admin
        </router-link>

        <router-link v-if="!isLoggedIn" to="/login">
          Login
        </router-link>

        <router-link v-if="!isLoggedIn" to="/register">
          Register
        </router-link>

        <button v-if="isLoggedIn" @click="logout">
          Logout
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const isLoggedIn = ref(false)
const isAdmin = ref(false)
const isAdvisor = ref(false)

onMounted(() => {
  const user = localStorage.getItem("user")

  if (user) {
    const parsedUser = JSON.parse(user)

    isLoggedIn.value = true
    isAdmin.value = parsedUser.isAdmin || false
    isAdvisor.value = parsedUser.isAdvisor || false
  }
})

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  router.push("/login")
}
</script>

<style scoped>
.navbar {
  background-color: var(--cream);
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.nav-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 4px;
  white-space: nowrap;
}

.logo-re {
  color: var(--black);
}

.logo-set {
  color: var(--terracotta);
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links a,
.nav-links button {
  margin-left: 25px;
  font-weight: 500;
  color: var(--black);
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  white-space: nowrap; /* 🔥 prevents Start Here from breaking */
}

.nav-links a:hover,
.nav-links button:hover {
  color: var(--terracotta);
}

/* ================= MOBILE FIX ================= */

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links a,
  .nav-links button {
    margin: 8px 12px;
  }
}
</style>