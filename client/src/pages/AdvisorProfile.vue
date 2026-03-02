<template>
  <div class="page-container" v-if="advisor">
    
    <!-- Avatar -->
    <div class="avatar-wrapper" v-if="advisor.avatarUrl">
      <img :src="advisor.avatarUrl" alt="Advisor Photo" class="avatar" />
    </div>

    <!-- Advisor Info -->
    <h1>{{ advisor.name }}</h1>

    <p v-if="advisor.title">
      <strong>{{ advisor.title }}</strong>
    </p>

    <p>{{ advisor.bio }}</p>

    <!-- Specialties -->
    <div v-if="advisor.specialties?.length">
      <h3>Specialties</h3>
      <ul>
        <li v-for="(item, index) in advisor.specialties" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- External Links -->
    <div class="links" v-if="advisor.linkedinUrl || advisor.websiteUrl">
      <h3>Links</h3>

      <p v-if="advisor.linkedinUrl">
        <a :href="advisor.linkedinUrl" target="_blank">
          LinkedIn
        </a>
      </p>

      <p v-if="advisor.websiteUrl">
        <a :href="advisor.websiteUrl" target="_blank">
          Website
        </a>
      </p>
    </div>

    <hr />

    <!-- Articles Section -->
    <div class="articles-section">
      <h2>Articles by {{ advisor.name }}</h2>

      <div v-if="posts.length === 0">
        <p>No articles available yet.</p>
      </div>

      <div
        v-for="post in posts"
        :key="post._id"
        class="post-card"
      >
        <h3>
          <router-link :to="`/posts/${post._id}`">
            {{ post.title }}
          </router-link>
        </h3>

        <p class="excerpt">
          {{ post.content.substring(0, 150) }}...
        </p>

        <router-link :to="`/posts/${post._id}`">
          Read More
        </router-link>
      </div>
    </div>
  </div>

  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import API from "../services/api"

const route = useRoute()

const advisor = ref(null)
const posts = ref([])
const error = ref(null)

const fetchAdvisor = async () => {
  try {
    const res = await API.get(`/advisors/${route.params.slug}`)
    advisor.value = res.data
  } catch (err) {
    console.error("Error loading advisor:", err)
    error.value = "Advisor not found."
  }
}

const fetchAdvisorPosts = async () => {
  try {
    const res = await API.get(`/advisors/${route.params.slug}/posts`)
    posts.value = res.data
  } catch (err) {
    console.error("Error loading advisor posts:", err)
  }
}

onMounted(() => {
  fetchAdvisor()
  fetchAdvisorPosts()
})
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.avatar-wrapper {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #ddd;
}

.links a {
  color: blue;
}

.articles-section {
  margin-top: 30px;
}

.post-card {
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
}

.excerpt {
  margin: 8px 0;
}
</style>