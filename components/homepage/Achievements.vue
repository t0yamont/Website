<template>
  <div id="achievements" class="w-full py-12 pb-8 bg-surtes-900 text-center">
    <h2>Our Achievements</h2>
    <div id="achievements-inner" class="h-full max-w-full lg:max-w-6xl mx-auto grid gap-16 grid-rows-3 pt-8 lg:pt-4 lg:grid-rows-none lg:grid-cols-3 justify-center">
      <div class="achievement-card flex flex-col gap-4">
        <Icon name="material-symbols:trophy-rounded" color="#ffd700" class="mx-auto text-5xl" />
        <span>2020 IMechE Overall Winner of Dynamic Events</span>
      </div>
      <div class="achievement-card flex flex-col gap-4">
        <Icon name="material-symbols:leaf-spark-rounded" color="#60b45a" class="mx-auto text-5xl" />
        <span>{YEAR} IMechE Most Efficient Car Award</span>
      </div>
      <div class="achievement-card flex flex-col gap-4">
        <Icon name="material-symbols:bolt" color="#fcc01e" class="mx-auto text-5xl" />
        <span>Mercedes-AMG HPP Best<br>High Voltage Powertrain Implementation Award</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>