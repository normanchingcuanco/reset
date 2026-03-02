<template>
  <section class="auth-wrapper">
    <div class="auth-container">

      <h1>Welcome Back</h1>
      <p class="auth-subtitle">
        Continue your journey into tech.
      </p>

      <form @submit.prevent="loginUser" class="auth-card">

        <label>Email</label>
        <input v-model="email" type="email" required />

        <label>Password</label>
        <input v-model="password" type="password" required />

        <button type="submit" class="btn-primary">
          Login
        </button>

      </form>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import API from "../services/api"

const router = useRouter()

const email = ref("")
const password = ref("")

const loginUser = async () => {
  try {
    const res = await API.post("/auth/login", {
      email: email.value,
      password: password.value
    })

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))

    router.push("/")
  } catch (err) {
    console.error("Login error:", err)
  }
}
</script>

<style scoped>
.auth-wrapper {
  padding: 120px 20px;
  background-color: var(--cream);
}

.auth-container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.auth-subtitle {
  color: var(--gray);
  margin-bottom: 40px;
}

.auth-card {
  background-color: var(--white);
  padding: 40px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-top: 20px;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
}

input:focus {
  outline: none;
  border-color: var(--terracotta);
}

button {
  margin-top: 30px;
}
</style>