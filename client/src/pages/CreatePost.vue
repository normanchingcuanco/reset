<template>
  <section class="form-wrapper">
    <div class="form-container">

      <h1>Create Article</h1>

      <form @submit.prevent="submitPost" class="form-card">

        <label>Title</label>
        <input v-model="title" required />

        <label>Content</label>
        <textarea v-model="content" rows="10" required></textarea>

        <label v-if="user?.isAdmin">Publish On Behalf of Advisor</label>

        <select v-if="user?.isAdmin" v-model="selectedAdvisor">
          <option value="">Admin Post</option>

          <option
            v-for="advisor in advisors"
            :key="advisor._id"
            :value="advisor._id"
          >
            {{ advisor.name }}
          </option>

        </select>

        <button type="submit" class="btn-primary">
          Publish
        </button>

      </form>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import API from "../services/api"

const router = useRouter()

const title = ref("")
const content = ref("")

const advisors = ref([])
const selectedAdvisor = ref("")

const user = ref(null)

/* LOAD USER + PERMISSION CHECK */
onMounted(async () => {

  const storedUser = localStorage.getItem("user")

  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }

  /* ONLY ADMIN OR ADVISOR */
  if (!user.value || (!user.value.isAdmin && !user.value.isAdvisor)) {
    router.push("/")
    return
  }

  /* ADMIN CAN CHOOSE ADVISOR */
  if (user.value.isAdmin) {
    try {
      const res = await API.get("/advisors")
      advisors.value = res.data
    } catch (err) {
      console.error("Error loading advisors:", err)
    }
  }
})

const submitPost = async () => {
  try {

    const payload = {
      title: title.value,
      content: content.value
    }

    /* ADMIN ASSIGNMENT */
    if (user.value.isAdmin && selectedAdvisor.value) {
      payload.advisor = selectedAdvisor.value
    }

    const res = await API.post("/posts", payload)

    title.value = ""
    content.value = ""
    selectedAdvisor.value = ""

    router.push(`/posts/${res.data._id}`)

  } catch (err) {
    console.error("Error creating post:", err)
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 120px 20px;
  background-color: var(--cream);
  min-height: 80vh;
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
}

.form-card {
  background-color: var(--white);
  padding: 60px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 25px;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 0.95rem;
}

input,
select {
  padding: 16px;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
}

textarea {
  padding: 20px;
  font-size: 1rem;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
  min-height: 450px;
  resize: vertical;
  line-height: 1.7;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--terracotta);
}

button {
  margin-top: 40px;
}
</style>