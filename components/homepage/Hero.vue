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
              <button class="w-full h-full">
                  <div class="button-text">SURTES Electric</div>
              </button>
          </div>
          <div id="combustion-powertrain" class="glass hover:bg-surtes-950 rounded-full border-2 border-white h-12 min-w-20">
              <button class="w-full h-full">
                  <div class="button-text">SURTES Combustion</div>
              </button>
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

import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const expandAnimation = (element: HTMLElement, url: string) => {
  const rect = element.getBoundingClientRect();
  const diagonal = Math.sqrt(window.innerWidth**2 + window.innerHeight**2);
  const scaleX = diagonal / rect.width;
  const scaleY = diagonal / rect.height;

  const button = element.querySelector('button');
  const buttonText = button?.querySelector('.button-text');
  if (button && buttonText) {
    const buttonRect = button.getBoundingClientRect();
    gsap.to(button, {
      duration: 0.5, // increase the duration to slow down the animation
      x: -buttonRect.left,
      y: -buttonRect.top,
      scaleX: scaleX,
      scaleY: scaleY,
      ease: 'power1.out',
      transformOrigin: 'top left',
      onStart: () => {
        element.classList.remove('glass');
      },
    });

    gsap.to(buttonText, {
      duration: 0.5,
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY,
      x: buttonRect.left,
      y: buttonRect.top,
      ease: 'power1.out',
      transformOrigin: 'center center',
    });
  }

  gsap.to(element, {
    duration: 0.5, // increase the duration to slow down the animation
    x: -rect.left + (window.innerWidth - rect.width) / 2,
    y: -rect.top + (window.innerHeight - rect.height) / 2,
    scaleX: scaleX,
    scaleY: scaleY,
    ease: 'power1.out',
    transformOrigin: 'center center',
    onComplete: () => {
      window.location.href = url;
    }
  });
};

onMounted(() => {
  const electricButton = document.getElementById('electric-powertrain');
  const combustionButton = document.getElementById('combustion-powertrain');

  electricButton?.addEventListener('click', () => expandAnimation(electricButton, '/electric'));
  combustionButton?.addEventListener('click', () => expandAnimation(combustionButton, '/combustion'));
});


</script>
