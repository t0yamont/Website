<template>
    <div id="navigation" :data-drawer-state="drawerIsOpen" class="z-50">
        <header class="fixed top-0 left-0 right-0 h-24 px-8 py-4 bg-surtes-900">
            <div id="logo" class="h-full">
                <NuxtLink to="/">
                    <NuxtImg src="/surtes-logo.svg" class="h-full mx-auto" />
                </NuxtLink>
            </div>
            <nav class="hidden xl:flex w-full gap-4 items-center" style="justify-content: flex-end;">
                <NuxtLink to="/blog">News Articles</NuxtLink>
                <NuxtLink to="/sponsors">Our Sponsors</NuxtLink>
                <NuxtLink to="/contact-us">Contact Us</NuxtLink>
            </nav>
            <button class="block xl:hidden h-full w-16 absolute right-0 top-0 mr-4" @click="drawerIsOpen = true"><Icon name="ic:baseline-dehaze" color="white" /></button>
        </header>
        <div id="drawer" class="fixed w-screen h-screen top-0 right-0 bottom-0 left-0 bg-background gap-16 z-50">
            <div id="drawer-header" class="relative h-24 px-8 pt-4">
              <div id="logo" class="h-full">
                <NuxtLink to="/">
                  <NuxtImg src="/surtes-logo.svg" class="h-full" />
                </NuxtLink>
              </div>
              <button @click="drawerIsOpen = false" class="h-full w-16 absolute right-0 top-0 mr-4"><Icon name="ic:round-close" color="white" /></button>
            </div>
            <div id="drawer-links" class="px-8 flex flex-col gap-y-8">
                <NuxtLink to="/blog" class="h-12">News Articles</NuxtLink>
                <NuxtLink to="/sponsors" class="h-12">Our Sponsors</NuxtLink>
                <NuxtLink to="/contact-us" class="h-12">Contact Us</NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
let drawerIsOpen = ref(false);
</script>