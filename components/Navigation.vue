<template>
    <header class="fixed top-0 left-0 right-0 h-24 mx-4 mt-4 py-4 px-12 rounded-full bg-surtes-900 border-solid border-2 border-white">
        <div id="nav-container" class="relative h-full grid grid-cols-3 lg:flex gap-8 items-center">
            <div id="logo" class=" h-full col-span-2">
                <NuxtLink to="/">
                        <NuxtImg src="/surtes-logo.svg" class="h-full" />
                </NuxtLink>
            </div>
            <div id="links" class="hidden xl:visible">
                <nav>
                
                </nav>
            </div>
            <div id="expand-drawer" class="visible xl:hidden">•••</div>
        </div>
    </header>
</template>