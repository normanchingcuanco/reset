<template>
  <div>

    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-content container">
        <p class="hero-top-text">Documenting Career Reinvention</p>

        <h1 class="logo">
          <span class="logo-re">RE</span><span class="logo-set">SET</span>
        </h1>

        <p class="tagline">Career Reinvention Into Tech</p>

        <p class="hero-description">
          A realistic guide for professionals transitioning into software development — without hype.
        </p>

        <router-link to="/start-here" class="btn-primary">
          Read the Journey
        </router-link>
      </div>
    </section>

    <!-- FEATURED POSTS -->
    <section class="featured">
      <div class="container">
        <h2>Latest Articles</h2>
        <pre>{{ posts }}</pre>

        <div class="posts-grid">
          <div
            v-for="post in posts"
            :key="post._id"
            class="post-card"
          >
            <span class="category">
              {{ post.advisor ? 'Advisor Insight' : 'Article' }}
            </span>

            <router-link :to="`/posts/${post._id}`">
              <h3>{{ post.title }}</h3>
            </router-link>

            <p>
              {{ truncate(post.content) }}
            </p>

            <router-link
              :to="`/posts/${post._id}`"
              class="read-more"
            >
              Read More →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORY STRIP -->
    <section class="categories">
      <router-link to="/">Mindset</router-link>
      <router-link to="/">Technical Learning</router-link>
      <router-link to="/">Career Strategy</router-link>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const posts = ref([])

const truncate = (text) => {
  if (!text) return ""
  return text.length > 140 ? text.substring(0, 140) + "..." : text
}

onMounted(async () => {
  try {
    const res = await API.get("/posts")
    posts.value = res.data
  } catch (err) {
    console.error("Error fetching posts:", err)
  }
})
</script>