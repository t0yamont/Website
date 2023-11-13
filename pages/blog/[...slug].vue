<template>
    <div id="blog-article" class="pt-24 px-4">
        <ContentDoc v-slot="{ doc }">
            <article>
              <ContentRenderer :value="doc" />
            </article>
<!--            <template #not-found>-->
<!--              <h1>Oops, we'll screw this loose nut!</h1>-->
<!--              <p>In the meantime, why not tap your spanner on some other pages?</p>-->
<!--            </template>-->
        </ContentDoc>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>