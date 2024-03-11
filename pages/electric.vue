<template>
  <NuxtLayout name="electric">
    <div class="py-24 px-6 md:px-12 lg:px-24">
      <span id="breadcrumbs" class="my-4"
        ><NuxtLink class="underline" to="/">Home</NuxtLink> >
        <span>Electric</span></span
      >
      <h1 class="mb-10">SURTES Electric</h1>
      <div
        class="mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center"
      >
        <p class="lg:col-span-2 xl:col-span-3">
          Team SURTES was one of the first teams to bring a successful electric
          car to FSUK and presented an innovative inboard dual motor drivetrain
          vehicle at the 2023 competition. The team will be competing in the
          Concept Class this academic year 2023/24 to gather feedback on our
          future EV design. Our plan is to build the skills and knowledge of
          younger students through Concept Class to build a successfully running
          Electric Vehicle in the future.
        </p>
        <NuxtImg src="/img/EV_Page_photo.jpg" class="rounded-lg" />
      </div>
      <div
        class="mb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center"
      >
        <div class="lg:col-span-2 sm:col-auto md:col-auto xl:col-span-2">
          <h2>SE1</h2>
          <NuxtImg src="/img/Team-2016-2.jpg" class="rounded-lg w-11/12" />
        </div>
        <div
          class="flex flex-col text-center w-full lg:col-span-2 xl:col-span-2"
        >
          <p class="lg:col-span-2 xl:col-span-3">
            In 2016 TEAM SURTES has become one of the few teams in the UK to
            switch to electric power. A year later, we successfully passed as 1
            of only 3 teams in the UK.​
          </p>
          <p class="mt-8">5<sup>th</sup> Best UK Team​</p>
          <p class="mt-8">12<sup>th</sup> Best Overall​</p>
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center"
      >
        <div
          class="flex flex-col text-center w-full lg:col-span-2 xl:col-span-2"
        >
          <p class="lg:col-span-2 xl:col-span-3">Awards Won:</p>
          <div class="  ">
            <p class="mt-4">IMechE Class 1 Most Efficient Car.​</p>
            <p class="mt-8">
              Mercedes-AMG HPP Best High Voltage Powertrain Implementation.​​
            </p>
            <p class="mt-8">Placed 11<sup> th </sup> Overall​</p>
            <p class="mt-8">Best UK EV Team</p>
          </div>
        </div>
        <div
          class="lg:col-span-2 sm:col-auto md:col-auto xl:col-span-2 max-md:order-first"
        >
          <h2>SE4</h2>
          <NuxtImg src="/img/Car-2019-Running.jpg" class="rounded-lg w-11/12" />
        </div>
      </div>
      <!-- <CarModel /> -->
    </div>
  </NuxtLayout>
</template>
