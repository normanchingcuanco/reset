<template>
  <section class="form-wrapper">
    <div class="form-container">

      <h1>Create Article</h1>

      <form @submit.prevent="submitPost" class="form-card">

        <label>Title</label>
        <input v-model="title" required />

        <label>Content</label>
        <textarea v-model="content" rows="10" required></textarea>

        <button type="submit" class="btn-primary">
          Publish
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

const title = ref("")
const content = ref("")

const submitPost = async () => {
  try {
    const res = await API.post("/posts", {
      title: title.value,
      content: content.value
    })

    router.push(`/posts/${res.data._id}`)
  } catch (err) {
    console.error("Error creating post:", err)
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
</style>