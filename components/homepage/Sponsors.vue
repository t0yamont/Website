<template>
    <div id="sponsors" class="min-h-1/2-screen py-8 text-center bg-gradient-to-b from-surtes-800 to-surtes-950">
        <div id="sponsors-inner" class="flex flex-col gap-12 md:gap-4 max-w-full lg:max-w-6xl mx-auto px-8 xl:px-0">
            <h2>Our Team Sponsors</h2>
            <div id="sponsors" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 justify-center items-center py-8">
              <div v-for="sponsor in sponsors">
                <NuxtLink :to="sponsor.url">
                  <NuxtImg :src="sponsor.logoSrc" />
                </NuxtLink>
              </div>
            </div>
          <div id="become-sponsor" class="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-8">
            <p class="my-auto">Thinking of becoming a sponsor?</p>
            <a href="mailto:teamsurtes@surrey.ac.uk?Subject=Sponsorship" class="bg-surtes-800 border-2 border-text-100 rounded-md w-auto text-center h-min py-2 hover:bg-surtes-600 hover:text-text-50 my-auto text lg:text-lg"><Icon name="ic:round-mail" class="text-2xl" /> Get In Touch</a>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

interface Sponsor extends MarkdownParsedContent {
  name: string,
  logoSrc: string,
  url: string,
}

// get sponsors
const sponsors = await queryContent<Sponsor>('sponsors').only(['name', 'logoSrc', 'url']).find();
</script>