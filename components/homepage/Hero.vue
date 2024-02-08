<template>
    <div id="hero" class="homepage-hero h-3/4-screen w-full relative">
        <div id="hero-media" class="h-full w-full bg-gradient-to-b from-surtes-950 to-surtes-900">
            <video class="h-full w-auto object-cover bg-white m-auto" autoplay loop muted>
                <source src="/mov/title-page-broll.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div id="hero-bottom" class="absolute bottom-0 left-0 right-0 text-center">
          <h1>We are Team SURTES</h1>
          <div id="powertrain-pills" class="grid grid-cols-2 w-1/2 mx-auto gap-4 py-8 min-w-80">
            <div id="electric-powertrain" class="glass hover:bg-surtes-950 rounded-full border-2 border-white h-12 min-w-20">
                <button class="w-full h-full ">Electric</button>
            </div>
            <div id="electric-powertrain" class="glass hover:bg-surtes-950 rounded-full border-2 border-white h-12 min-w-20">
                <button class="w-full h-full">Combustion</button>
            </div>
          </div>
        </div>
  </div>
</template>

<style scoped lang="scss">
.glass {
  background: rgba( 69, 12, 10, 0.75 );
  box-shadow: 0 8px 32px 0 rgba( 69, 12, 10, 0.37 );
  backdrop-filter: blur( 5px );
  -webkit-backdrop-filter: blur( 5px );
}
</style>
<script setup lang="ts">
</script>