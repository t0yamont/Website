<template>
    <footer class="h-full py-24 px-6 md:px-12 lg:px-24 bg-blue-950 relative bottom-0 left-0 right-0">
        <div id="footer-inner" class="px-6 mp-12 w-full max-w-7xl mx-auto">
          <div id="top">
              <NuxtImg src="/surtes-logo.svg" class="max-w-xs mb-8" />
              <p>
                University of Surrey, Stag Hill<br>
                Guildford, GU2 7XH<br>
                United Kingdom
              </p>
          </div>
          <div id="bottom" class="flex flex-col justify-between md:items-center mt-8 mb-2">
              <p>Copyright © Team SURTES {{currentYear}}</p>
              <div id="social-media" class="flex flex-row gap-4 max-md:mt-8">
                <NuxtLink to="mailto:teamsurtes@surrey.ac.uk" class="p-2">
                  <Icon name="ic:round-mail" color="white" class="text-2xl" />
                </NuxtLink>
                <NuxtLink to="https://www.instagram.com/teamsurtes/" class="p-2">
                  <Icon name="fa6-brands:instagram" color="white" class="text-2xl" />
                </NuxtLink>
                <NuxtLink to="https://www.facebook.com/TeamSURTES" class="p-2">
                  <Icon name="fa6-brands:square-facebook" color="white" class="text-2xl" />
                </NuxtLink>
                <NuxtLink to="https://uk.linkedin.com/company/team-surtes-surtes-ec" class="p-2">
                  <Icon name="fa6-brands:linkedin" color="white" class="text-2xl" />
                </NuxtLink>
                <NuxtLink to="https://www.youtube.com/watch?v=I_Yt8D2lGgY" class="p-2">
                  <Icon name="fa6-brands:youtube" color="white" class="text-2xl" />
                </NuxtLink>
              </div>
          </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = (new Date()).getFullYear();
</script>