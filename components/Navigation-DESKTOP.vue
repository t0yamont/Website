<template>
    <nav class="fixed top-0 left-0 right-0 h-24 mx-4 mt-4 py-4 px-12 rounded-full bg-surtes-900 border-solid border-2 border-white">
        <div id="nav-container" class="relative h-full flex gap-8 items-center">
            <div id="nav-logo" class="h-full">
                <NuxtLink to="/">
                    <NuxtImg src="/surtes-logo.svg" class="h-full" />
                </NuxtLink>
            </div>
            <div id="nav-items" class="w-full flex gap-4 items-center" style="justify-content: flex-end;">
                <NuxtLink to="/articles">Articles</NuxtLink>
                <NuxtLink to="/sponsors">Our Sponsors</NuxtLink>
                <NuxtLink to="/contact-us">Contact Us</NuxtLink>
            </div>
        </div>
        <!-- <div id="mobile-nav-container" class="hidden fixed w-screen h-screen top-0 right-0 bottom-0 left-0 bg-surtes-950">
            <div id="nav-items" class="flex flex-col">
                <NuxtLink to="/articles">Blog</NuxtLink>
                <NuxtLink to="/sponsors">Our Sponsors</NuxtLink>
                <NuxtLink to="/contact-form">Contact Us</NuxtLink>
            </div>
        </div> -->
    </nav>
</template>
