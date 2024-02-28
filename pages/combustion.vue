<template>
  <div id="app">
    <h1>SURTES Combustion</h1>
    <div class="flex flex-col md:flex-row gap-4 md:gap-8 py-4 items-center">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
    </div>
    <div v-for="i in 3" :key="i" class="liquid"></div>
  </div>
</template>

<script>
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
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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

</style>