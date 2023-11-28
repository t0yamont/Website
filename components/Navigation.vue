<template>
    <div id="navigation" :data-drawer-state="drawerIsOpen" class="z-50 sticky" :style="{ '--header-bg': headerBackgroundColor }">
        <header class="fixed top-0 left-0 right-0 h-24 px-8 py-4 bg-surtes-950">
            <div id="logo" class="h-full">
                <NuxtLink to="/">
                    <NuxtImg src="/surtes-logo.svg" class="h-full mx-auto" />
                </NuxtLink>
            </div>
            <button class="block h-full w-16 absolute right-0 top-0 mr-4" @click="drawerIsOpen = true"><Icon name="ic:baseline-dehaze" color="white" class="text-3xl lg:text-2xl" /></button>
        </header>
        <div id="drawer" class="fixed w-screen h-screen top-0 right-0 bottom-0 left-0 bg-background gap-16 z-50">
            <div id="drawer-header" class="relative h-24 px-8 pt-4">
              <div id="logo" class="h-full">
                <NuxtLink to="/">
                  <NuxtImg src="/surtes-logo.svg" class="h-full" />
                </NuxtLink>
              </div>
              <button @click="drawerIsOpen = false" class="h-full w-16 absolute right-0 top-0 mr-4"><Icon name="ic:round-close" color="white" class="text-3xl lg:text-2xl" /></button>
            </div>
            <nav id="drawer-links" class="px-8 flex flex-col gap-y-8">
                <NuxtLink to="/blog" class="h-12" @click="drawerIsOpen = false">News Articles</NuxtLink>
                <NuxtLink to="/sponsors" class="h-12" @click="drawerIsOpen = false">Our Sponsors</NuxtLink>
              <NuxtLink to="/electric" class="h-12" @click="drawerIsOpen = false">SURTES Electric</NuxtLink>
              <NuxtLink to="/combustion" class="h-12" @click="drawerIsOpen = false">SURTES Combustion</NuxtLink>
            </nav>
        </div>
    </div>
</template>

<style scoped lang="scss">
#navigation > header {
  background: var(--header-bg);
}

#navigation[data-drawer-state="false"] > #drawer {
  display: none;
}

#navigation[data-drawer-state="true"] > #drawer {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>

<style lang="scss">
#navigation[data-drawer-state="true"] {
  ~ main, ~ footer {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

let drawerIsOpen = ref(false);
let headerBackgroundColor = ref('#450c0a');
const handleScroll = () => {
  // Calc scroll pct
  const scrollPercentage = (window.scrollY / window.innerHeight) * 100;

  // Determine which color to show
  if (scrollPercentage >= 75) {
    headerBackgroundColor.value = '#7f241f';
  } else {
    headerBackgroundColor.value = `rgb(${69 + (58 * (scrollPercentage / 75))}, ${12 + (24 * (scrollPercentage / 75))}, ${10 + (21 * (scrollPercentage / 75))})`;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>