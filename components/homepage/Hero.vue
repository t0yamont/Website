<template>
    <div id="hero" class="homepage-hero h-3/4-screen relative">
        <div id="hero-media" class="h-full w-full bg-gradient-to-b from-surtes-950 to-surtes-900">
            <div id="inner-hero-media" class="flex text-center justify-center content-center">
            </div>
        </div>
        <div id="hero-bottom" class="absolute bottom-0 left-0 right-0 text-center">
          <h1>We are Team SURTES</h1>
          <p class="hidden lg:block">Hover to learn about our developments.</p>
          <p class="block lg:hidden">Tap to learn about our developments.</p>
          <div id="powertrain-cards" class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-0 mt-8">
            <div id="electric-powertrain" class="hover:bg-text-500 border-surtes-900 rounded-r-2xl h-40">
                <button class="w-full h-full">SURTES Electric</button>
            </div>
            <span class="hidden lg:block"></span>
            <div id="combustion-powertrain" class="hover:bg-text-500 border-surtes-900 rounded-l-2xl h-40">
                <button class="w-full h-full">SURTES Combustion</button>
            </div>
          </div>
        </div>
  </div>
</template>

<style scoped lang="scss">
#hero:has(#electric-powertrain:hover) {
    #hero-media {
        background-color: #800000 !important;
    }

    #inner-hero-media > h1 {
        content: "SURTES Electric Powertrain"
    }
}

#hero:has(#combustion-powertrain:hover) {
    #hero-media {
        background-color: goldenrod !important;
    }

    #inner-hero-media > h1 {
        content: "SURTES Combustion Powertrain"
    }
}
</style>

<script setup lang="ts">
</script>