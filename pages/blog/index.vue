<template>
  <div id="blog-index" class="px-4 pt-4">
    <h1>Latest Stories</h1>
    <div id="story-list" class="my-8">
      <ContentList path="/blog" v-slot="{ list }">
        <NuxtLink v-for="article in list" :key="article._path" class="my-2" :to="article._path">
          <div class="bg-surtes-900 rounded-xl p-4">
            <div class="" v-if="!!article.keyImage">
              <NuxtImg src="{{article.keyImage}}" />
            </div>
            <div class="flex flex-col">
              <div>
                <h2>{{ article.title }}</h2>
                <span>Published {{ formatDate(article.date) }}</span>
              </div>
              <p class="py-4" v-if="!!article.excerpt">{{ article.excerpt }}</p>
              <span>Read More...</span>
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