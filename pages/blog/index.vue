<template>
  <div id="blog-index" class="px-4 pt-4">
    <h1>Latest Stories</h1>
    <div id="story-list" class="my-8">
      <ContentList path="/blog" v-slot="{ list }">
        <NuxtLink v-for="article in list" :key="article._path" class="my-2 rounded-lg bg-text-800" :to="article._path">
          <p>{{ article.title }}</p>
          <span>Published {{ formatDate(article.updatedAt) }}</span>
        </NuxtLink>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en', options)
}

</script>