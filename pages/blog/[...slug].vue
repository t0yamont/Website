<template>
    <div id="article-image" class="w-full h-auto" v-if="!!articleImgSrc">
      <NuxtImg src="{{articleImgSrc}}" class="w-full h-full object-cover" />
    </div>
    <div id="blog-article" class="pt-24 px-4">
      <div class="my-4">
        <NuxtLink to="/blog" class="py-4 px-6 bg-background text-white text-xl rounded-full"><Icon name="ic:round-arrow-back" color="white" class="my-auto text-2xl"/> Back To Article List</NuxtLink>
      </div>
      <ContentDoc v-slot="{ doc }">
        <article>
          <ContentRenderer :value="doc" />
        </article>
<!--            <template #not-found>-->
<!--              <h1>Oops, we'll screw this loose nut!</h1>-->
<!--              <p>In the meantime, why not tap your spanner on some other pages?</p>-->
<!--            </template>-->
      </ContentDoc>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

// Get the article image
const articleImgSrc = '/img/fs-se4.webp'
</script>