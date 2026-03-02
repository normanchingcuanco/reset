<template>
  <section v-if="post" class="post-wrapper">
    <div class="post-container">

      <!-- TITLE -->
      <h1 class="post-title">
        {{ post.title }}
      </h1>

      <!-- META -->
      <div class="post-meta">
        <span>
          By {{ post.author?.username }}
        </span>

        <span v-if="post.advisor">
          • Advisor:
          <router-link
            :to="`/advisors/${post.advisor.slug}`"
            class="advisor-link"
          >
            {{ post.advisor.name }}
          </router-link>
        </span>
      </div>

      <!-- CONTENT -->
      <div
        class="post-content"
        v-html="formattedContent"
      ></div>

      <!-- COMMENTS -->
      <div class="comments-section">
        <CommentSection :postId="post._id" />
      </div>

    </div>
  </section>

  <section v-else class="loading">
    <p>Loading article...</p>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import API from "../services/api"
import CommentSection from "../components/CommentSection.vue"

const route = useRoute()
const post = ref(null)

const formattedContent = computed(() => {
  if (!post.value?.content) return ""
  return post.value.content.replace(/\n/g, "<br/>")
})

onMounted(async () => {
  try {
    const res = await API.get(`/posts/${route.params.id}`)
    post.value = res.data
  } catch (err) {
    console.error("Error loading post:", err)
  }
})
</script>

<style scoped>
.post-wrapper {
  padding: 100px 20px;
  background-color: var(--cream);
}

.post-container {
  max-width: 750px;
  margin: 0 auto;
}

.post-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.post-meta {
  color: var(--gray);
  margin-bottom: 40px;
  font-size: 0.9rem;
}

.advisor-link {
  color: var(--terracotta);
}

.post-content {
  line-height: 1.9;
  font-size: 1.05rem;
  color: var(--black);
}

.post-content p {
  margin-bottom: 20px;
}

.comments-section {
  margin-top: 80px;
}

.loading {
  padding: 100px 20px;
  text-align: center;
}
</style>