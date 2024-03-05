<template>
  <NuxtLayout name="electric">
    <div class="py-24 px-6 md:px-12 lg:px-24">
      <span id="breadcrumbs" class="my-4"><NuxtLink class="underline" to="/">Home</NuxtLink> > <span>Electric</span></span>
      <h1 class="mb-10">SURTES Electric</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center">
        <p class="lg:col-span-2 xl:col-span-3">Team SURTES was one of the first teams to bring a successful electric car to FSUK and presented an innovative inboard dual motor drivetrain vehicle at the 2023 competition. The team will be competing in the Concept Class this academic year 2023/24 to gather feedback on our future EV design. Our plan is to build the skills and knowledge of younger students through Concept Class to build a successfully running Electric Vehicle in the future.</p>
        <NuxtImg src="/img/EV_Page_photo.jpg" class="rounded-lg" />
      </div>
      <CarModel />
    </div>
  </NuxtLayout>
</template>
