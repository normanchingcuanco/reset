<template>
  <section v-if="advisor" class="profile-wrapper">
    <div class="profile-container">

      <!-- HEADER -->
      <div class="profile-header">
        <div v-if="advisor.avatarUrl" class="profile-avatar">
          <img :src="advisor.avatarUrl" :alt="advisor.name" />
        </div>

        <div class="profile-info">
          <h1>{{ advisor.name }}</h1>
          <p class="profile-title">{{ advisor.title }}</p>

          <div class="profile-links">
            <a v-if="advisor.linkedinUrl" :href="advisor.linkedinUrl" target="_blank">
              LinkedIn
            </a>
            <a v-if="advisor.websiteUrl" :href="advisor.websiteUrl" target="_blank">
              Website
            </a>
          </div>
        </div>
      </div>

      <!-- BIO -->
      <div class="profile-bio">
        <p>{{ advisor.bio }}</p>
      </div>

      <!-- SPECIALTIES -->
      <div v-if="advisor.specialties?.length" class="profile-specialties">
        <h3>Specialties</h3>
        <div class="specialty-tags">
          <span v-for="(item, index) in advisor.specialties" :key="index">
            {{ item }}
          </span>
        </div>
      </div>

      <!-- RELATED POSTS -->
      <div class="profile-posts">
        <h3>Articles by {{ advisor.name }}</h3>

        <div v-if="posts.length" class="posts-grid">
          <div
            v-for="post in posts"
            :key="post._id"
            class="post-card"
          >
            <router-link :to="`/posts/${post._id}`">
              <h4>{{ post.title }}</h4>
            </router-link>

            <p>{{ truncate(post.content) }}</p>

            <router-link
              :to="`/posts/${post._id}`"
              class="read-more"
            >
              Read More →
            </router-link>
          </div>
        </div>

        <p v-else class="no-posts">
          No articles published yet.
        </p>
      </div>

    </div>
  </section>

  <section v-else class="loading">
    <p>Loading advisor profile...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import API from "../services/api"

const route = useRoute()
const advisor = ref(null)
const posts = ref([])

const truncate = (text) => {
  if (!text) return ""
  return text.length > 120 ? text.substring(0, 120) + "..." : text
}

onMounted(async () => {
  try {
    const advisorRes = await API.get(`/advisors/${route.params.slug}`)
    advisor.value = advisorRes.data

    const postsRes = await API.get(`/advisors/${route.params.slug}/posts`)
    posts.value = postsRes.data
  } catch (err) {
    console.error("Error loading advisor:", err)
  }
})
</script>

<style scoped>
.profile-wrapper {
  padding: 100px 20px;
  background-color: var(--cream);
}

.profile-container {
  max-width: 900px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-title {
  color: var(--terracotta);
  margin-top: 10px;
}

.profile-links a {
  margin-right: 20px;
  color: var(--black);
  font-weight: 500;
}

.profile-links a:hover {
  color: var(--terracotta);
}

.profile-bio {
  margin-bottom: 40px;
  line-height: 1.8;
}

.profile-specialties h3 {
  margin-bottom: 20px;
}

.specialty-tags span {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 6px 12px;
  border: 1px solid var(--terracotta);
  font-size: 0.85rem;
}

.profile-posts {
  margin-top: 60px;
}

.no-posts {
  color: var(--gray);
  margin-top: 20px;
}

.loading {
  padding: 100px 20px;
  text-align: center;
}
</style>