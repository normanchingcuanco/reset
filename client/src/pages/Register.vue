<template>
  <section class="auth-wrapper">
    <div class="auth-container">

      <h1>Create Account</h1>
      <p class="auth-subtitle">
        Start your RESET journey.
      </p>

      <form @submit.prevent="registerUser" class="auth-card">

        <label>Username</label>
        <input v-model="username" required />

        <label>Email</label>
        <input v-model="email" type="email" required />

        <label>Password</label>
        <input v-model="password" type="password" required />

        <button type="submit" class="btn-primary">
          Register
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

const username = ref("")
const email = ref("")
const password = ref("")

const registerUser = async () => {
  try {
    await API.post("/auth/register", {
      username: username.value,
      email: email.value,
      password: password.value
    })

    router.push("/login")
  } catch (err) {
    console.error("Register error:", err)
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