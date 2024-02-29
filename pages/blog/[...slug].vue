<template>
  <NuxtLayout name="electric">
  <div id="blog-article" class="max-w-full lg:max-w-5xl mx-auto px-8 xl:px-0">
    <span id="breadcrumbs" class="my-4"><NuxtLink class="underline" to="/">Home</NuxtLink> > <NuxtLink class="underline" to="/blog">Blog</NuxtLink> > <span>{{ article.title }}</span></span>
    <div class="my-4">
      <h2>{{ article.title }}</h2>
      <span class="text-md">Published {{ formatDate(article.createdAt) }}</span>
    </div>
    <NuxtImg v-if="article.keyImage" :src="article.keyImage" class="h-auto w-full rounded-xl" />
    <ContentDoc class="my-8" />
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
}

const route = useRoute();
const articleName = route.path.split('/').pop();

const { data } = await useAsyncData('blog-article', () => queryContent('blog', articleName).findOne());
const article = data._value;

</script>