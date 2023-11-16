<template>
    <div id="hero" class="homepage-hero h-3/4-screen relative">
        <div id="hero-media" class="h-full w-full bg-surtes-800">
            <div id="inner-hero-media" class="flex text-center justify-center content-center">
                <h1>We are Team SURTES</h1>
            </div>
        </div>
        <div id="hero-powertrain" class="absolute bottom-0 left-0 right-0 h-40 grid grid-cols-2 gap-x-0">
            <div id="electric-powertrain" class="border-background hover:bg-text-500 hover:border-text-500 border-solid border-t-4 border-r-2 border-b-0">
                <button class="w-full h-full">SURTES Electric</button>
            </div>
            <div id="combustion-powertrain" class="border-background hover:bg-text-500 hover:border-text-500 border-solid border-t-4 border-l-2 border-b-0">
                <button class="w-full h-full">SURTES Combustion</button>
            </div>
        </div>
  </div>
</template>

<style scoped lang="scss">
#hero:has(#electric-powertrain:hover) {
    #hero-media {
        background-color: maroon !important;
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

<style lang="scss">

</style>