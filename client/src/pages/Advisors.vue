<template>
  <section class="advisors-wrapper">
    <div class="container">

      <h1 class="advisors-title">Transition Advisors</h1>
      <p class="advisors-subtitle">
        Professionals guiding career shifters into tech.
      </p>

      <div class="advisors-grid">
        <div
          v-for="advisor in advisors"
          :key="advisor._id"
          class="advisor-card"
        >
          <router-link :to="`/advisors/${advisor.slug}`">
            <div class="advisor-avatar" v-if="advisor.avatarUrl">
              <img :src="advisor.avatarUrl" :alt="advisor.name" />
            </div>

            <h3>{{ advisor.name }}</h3>
          </router-link>

          <p class="advisor-title">{{ advisor.title }}</p>

          <p class="advisor-bio">
            {{ truncate(advisor.bio) }}
          </p>

          <router-link
            :to="`/advisors/${advisor.slug}`"
            class="read-more"
          >
            View Profile →
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import API from "../services/api"

const advisors = ref([])

const truncate = (text) => {
  if (!text) return ""
  return text.length > 140 ? text.substring(0, 140) + "..." : text
}

onMounted(async () => {
  try {
    const res = await API.get("/advisors")
    advisors.value = res.data
  } catch (err) {
    console.error("Error loading advisors:", err)
  }
})
</script>

<style scoped>
.advisors-wrapper {
  padding: 100px 20px;
  background-color: var(--cream);
}

.advisors-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.advisors-subtitle {
  text-align: center;
  color: var(--gray);
  margin-bottom: 60px;
}

.advisors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.advisor-card {
  background-color: var(--white);
  padding: 30px;
  border: 1px solid #eee;
  transition: 0.3s ease;
}

.advisor-card:hover {
  border-color: var(--terracotta);
}

.advisor-avatar img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

.advisor-title {
  color: var(--terracotta);
  font-size: 0.9rem;
  margin: 10px 0;
}

.advisor-bio {
  color: var(--gray);
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.read-more {
  color: var(--terracotta);
  font-weight: 500;
}
</style>