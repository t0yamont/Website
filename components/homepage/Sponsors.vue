<template>
    <div id="sponsors" class="py-8 text-center">
        <div id="sponsors-inner" class="flex flex-col gap-12 md:gap-4 max-w-full lg:max-w-3xl mx-auto">
            <h2>Our Team Sponsors</h2>
            <div id="principle-sponsors" class="flex flex-row gap-4 justify-center">
              <div v-for="sponsor in principleSponsors">
                <NuxtLink :to="sponsor.url">
                  <NuxtImg :src="sponsor.logoSrc" alt="{{sponsor.name}} Logo" />
                </NuxtLink>
              </div>
            </div>
            <div id="sponsors" class="flex flex-row gap-8 flex-wrap justify-center">
              <div v-for="sponsor in nonPrincipleSponsors">
                <NuxtLink :to="sponsor.url">
                  <NuxtImg :src="sponsor.logoSrc" alt="{{sponsor.name}} Logo" />
                </NuxtLink>
              </div>
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
const principleSponsors = await queryContent<Sponsor>('sponsors').where( { 'isPrimary': 'true' } ).only(['name', 'logoSrc', 'url']).find();
const nonPrincipleSponsors = await queryContent<Sponsor>('sponsors').where( { 'isPrimary': 'false' } ).only(['name', 'logoSrc', 'url']).find();
</script>