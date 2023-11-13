<template>
  <NuxtLayout name="404">
    <div class="bg-background text-text-200 min-h-screen">
      <Navigation />
      <article class="min-h-screen ">
        <div id="content" class="pt-32 text-center">
          <h1>We seem to have misplaced a few gears in our website's transmission.</h1>
          <p>While our digital mechanics work on it, why not return to the paddock?</p>
          <button @click="redirectHome">Back Home</button>
        </div>
      </article>
      <Footer />
    </div>
  </NuxtLayout>
</template>
  
<script setup lang="ts">
const props = defineProps({
  error: Object
})

const redirectHome = () => clearError({ redirect: '/' })
</script>