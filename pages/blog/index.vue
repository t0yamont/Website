<template>
  <div id="blog-index" class="px-8 pt-4 max-w-full lg:max-w-8xl mx-auto xl:px-0">
    <span id="breadcrumbs" class="my-4"><NuxtLink class="underline" to="/">Home</NuxtLink> > <NuxtLink class="underline" to="/blog">Blog</NuxtLink></span>
    <h1>Latest Stories</h1>
    <div id="story-list" class="my-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ContentList path="/blog" v-slot="{ list }">
        <NuxtLink v-for="article in list" :key="article._path" class="my-2" :to="article._path">
          <div class="bg-surtes-900 hover:bg-surtes-800 rounded-xl p-4">
            <NuxtImg v-if="article.keyImage" :src="article.keyImage" class="rounded-lg w-full" />
            <div class="flex flex-col">
              <div class="my-4">
                <h2>{{ article.title }}</h2>
                <span class="text-md">Published {{ formatDate(article.createdAt) }}</span>
              </div>
              <p v-if="article.description">{{ article.description }}</p>
              <span class="mt-2">Read More...</span>
            </div>
          </div>
        </NuxtLink>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
