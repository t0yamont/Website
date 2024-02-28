<template>
  <NuxtLayout name="electric">
    <div class="w-full min-h-1/3-screen p-12 lg:pb-8 ">
      <h1>Our Sponsors</h1>
      <p>A big thank you to our sponsors. Their support helps fund the team.</p>
      <div id="sponsors-list" class="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ContentList path="/sponsors" v-slot="{ list }">
          <NuxtLink :to="sponsor.url" class="bg-surtes-900 hover:bg-surtes-800 rounded-xl p-4 grid grid-rows-2 sm:grid-rows-none sm:grid-cols-[3fr_7fr] gap-8 items-center" v-for="sponsor in list">
            <NuxtImg :src="sponsor.logoSrc" class="" />
            <div class="flex flex-col">
              <h2>{{ sponsor.name }}</h2>
              <p class="py-4" v-if="sponsor.description">{{ sponsor.description }}</p>
              <p>Learn More <Icon name="fa-solid:external-link-alt" /></p>
            </div>
          </NuxtLink>
        </ContentList>
      </div>
    </div>
  </NuxtLayout>
</template>