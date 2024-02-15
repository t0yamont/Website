<template>
    <div id="hero" class="homepage-hero h-3/4-screen relative">
        <div id="hero-media" class="h-full w-full bg-gradient-to-b from-surtes-950 to-surtes-900">
            <div id="inner-hero-media" class="flex text-center justify-center content-center">
            </div>
        </div>
        <div id="hero-bottom" class="absolute bottom-0 left-0 right-0 text-center">
          <h1 class="text-white">We are Team SURTES</h1>
          <p class="hidden lg:block text-gray-400">Hover to learn about our developments.</p>
          <p class="block lg:hidden text-grey-400">Tap to learn about our developments.</p>
          <div id="powertrain-cards" class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-0 mt-8">
            <div id="electric-powertrain" class= " hover:bg-text-500 border-surtes-900 rounded-r-2xl h-40">
                <button class="w-3/4 h-3/4 bg-transparent text-white rounded-r-2x1 transition duration-300 ease-in-out" >SURTES Electric</button>
            </div>
            <span class="hidden lg:block"></span>
            <div id="combustion-powertrain" class= " hover:bg-text-500 border-surtes-900 rounded-l-2xl h-40">
                <button class="w-3/4 h-3/4 bg-transparent text-white rounded-r-2x1 transition duration-300 ease-in-out" >SURTES Combustion</button>
            </div>
          </div>
        </div>
  </div>
</template>

<script setup lang="ts">
   import { gsap } from "gsap";
   

</script>
