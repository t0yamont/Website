<template>
  <div id="blog-index"  class="pt-24 px-4">
    <h1>Latest Stories</h1>
    <hr>
    <ContentList path="/blog" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <NuxtLink >
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </NuxtLink>
      </div>
    </ContentList>
  </div>
</template>
<script setup lang="ts">
</script>