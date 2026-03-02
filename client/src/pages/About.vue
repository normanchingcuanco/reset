<template>
  <section class="about-wrapper">
    <div v-if="page" class="about-container">

      <h1 class="about-title">
        {{ page.title }}
      </h1>

      <div v-if="page.videoUrl" class="about-video">
        <iframe
          :src="page.videoUrl"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <div
        class="about-content"
        v-html="page.content"
      ></div>

    </div>

    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const page = ref(null)

onMounted(async () => {
  try {
    const res = await API.get("/pages/about")
    page.value = res.data
  } catch (err) {
    console.error("Error loading page:", err)
  }
})
</script>

<style scoped>
.about-wrapper {
  padding: 100px 20px;
  background-color: var(--cream);
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
}

.about-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
}

.about-video {
  margin-bottom: 40px;
}

.about-video iframe {
  width: 100%;
  height: 400px;
}

.about-content {
  line-height: 1.9;
  font-size: 1.05rem;
}

.loading {
  padding: 100px 20px;
  text-align: center;
}
</style>