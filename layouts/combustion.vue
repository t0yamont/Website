<template>
    <div class="bg-background text-text-200 min-h-screen font-onest">
        <CombustionNavigation />
        <main class="min-h-screen pt-24 bg-blue-950">
            <slot />
        </main>
        <CombustionFooter />
    </div>
</template>