<template>
  <section class="form-wrapper" v-if="postLoaded">
    <div class="form-container">

      <h1>Edit Article</h1>

      <form @submit.prevent="updatePost" class="form-card">

        <label>Title</label>
        <input v-model="title" required />

        <label>Content</label>
        <textarea v-model="content" rows="10" required></textarea>

        <button type="submit" class="btn-primary">
          Update
        </button>

      </form>

    </div>
  </section>

  <section v-else class="loading">
    <p>Loading...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import API from "../services/api"

const route = useRoute()
const router = useRouter()

const title = ref("")
const content = ref("")
const postLoaded = ref(false)

onMounted(async () => {
  try {
    const res = await API.get(`/posts/${route.params.id}`)
    title.value = res.data.title
    content.value = res.data.content
    postLoaded.value = true
  } catch (err) {
    console.error("Error loading post:", err)
  }
})

const updatePost = async () => {
  try {
    await API.put(`/posts/${route.params.id}`, {
      title: title.value,
      content: content.value
    })

    router.push(`/posts/${route.params.id}`)
  } catch (err) {
    console.error("Error updating post:", err)
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 100px 20px;
  background-color: var(--cream);
}

.form-container {
  max-width: 750px;
  margin: 0 auto;
}

.form-card {
  background-color: var(--white);
  padding: 40px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 20px;
  margin-bottom: 8px;
  font-weight: 500;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #ddd;
  font-family: 'Inter', sans-serif;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--terracotta);
}

button {
  margin-top: 30px;
}

.loading {
  padding: 100px 20px;
  text-align: center;
}
</style>