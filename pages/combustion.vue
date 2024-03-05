<template>
  <NuxtLayout name="combustion">
  <div class="py-24 px-6 md:px-12 lg:px-24">
    <span id="breadcrumbs" class="my-4"><NuxtLink class="underline" to="/">Home</NuxtLink> > <span>Combustion</span></span>
    <h1>SURTES Combustion</h1>
    <div class="flex flex-col items-center justify-center gap-4 md:gap-8 py-4">
      <NuxtImg src="/img/SurtesEC-front.webp" class="w-full rounded-lg justify-self-center" />
      <p>During the beginning of the 2023/24 academic year, team SURTES decided to rebuild its knowledge by going back to the combustion powertrain  and taking the time to design and build an EV  for the coming years. While the EV vehicle is being designed, we hope to train and pass knowledge down to our brand new members by using the combustion car that will be built during the 2023/24 academic year and future years. Further down you can see our previous combustion car that built the foundations of TEAM SURTES.​</p>
    </div> 
    <h2 class=" flex flex-col items-center py-6">STAG '09</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center">
      <NuxtImg src="/img/SE09.webp" class="w-full rounded-lg" />
      <p class="lg:col-span-2 xl:col-span-3">In the academic year of 2008/9, a dedicated group of students from Mechanical, Medical and Aerospace engineering designed and manufactured Surrey's first Formula Student racing car to compete in the Formula Student competition. In total, 105 universities from 23 countries were represented at the competition which was held at the Silverstone racetrack. The car proved highly competitive and was the 3rd fastest UK car in the acceleration event. Spurred on from this remarkable achievement for a first time entry, the SURTES team seeks out every year to design and manufacture ever lighter, more powerful and more successful racing cars.​</p>
    </div>
    <div class="flex flex-col">
      <p class="text-xs"><strong>Chassis:</strong> steel frame with carbon fibre bodywork</p>
      <p class="text-xs"><strong>Engine:</strong> Restricted Honda CBR600 F3 engine; 78 hp @ 9000 rpm; 50 Nm @ 6500 rpm</p>
      <p class="text-xs"><strong>Transmission:</strong> customised 4-speed gearbox</p>
      <p class="text-xs"><strong>Overall weight:</strong> 201.5 kg</p>
      <p class="text-xs"><strong>Performance:</strong> 0-60 mph: under 4s; top speed: 85 mph, max. lateral acceleration: 1.5 g</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 justify-between items-center py-8 gap-8">
      <div class="">
        <div class="text-xl py-2.5">STAG '13</div>
        <NuxtImg src="/img/Car-2013-2.webp" class="w-full h-auto rounded-lg self-center" style="width: 100%; height: auto" />
      </div>
      <div class="">
        <div class="text-xl py-2.5">STAG '15</div>
        <NuxtImg src="/img/Car-2015-3.webp" class="w-full h-auto rounded-lg self-center" style="width: 100%; height: auto" />
      </div>
</div>
    <div v-for="i in 3" :key="i" class="liquid"></div>
  </div>
  </NuxtLayout>
</template>

<!--<script>
 import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

export default {
  mounted() {
    gsap.registerPlugin(MotionPathPlugin);

    gsap.to(".liquid", {
      duration: 5,
      repeat: -1,
      motionPath: {
        path: [{x: window.innerWidth * Math.random(), y: window.innerHeight * Math.random()}, {x: window.innerWidth * Math.random(), y: window.innerHeight * Math.random()}],
        align: "self",
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      },
      ease: "power1.inOut"
    });
  }
}; 

</script>-->

<!-- <style lang="scss" scoped>
.liquid {
  background: linear-gradient(270deg, #ccab19, #023979, #00ffb3);
  background-size: 400% 400%;
  animation: AnimationName 5s ease infinite;
  overflow: hidden;
}

@keyframes AnimationName { 
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

</style> -->