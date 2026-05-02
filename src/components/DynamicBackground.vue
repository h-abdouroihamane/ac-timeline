<template>
    <div
        id="background-image"
        :style="{ backgroundImage: `url(${backgroundURL})` }"
    >
        <div
            class="overlay"
            :style="{ background: `rgba(0,0,0,${props.dim})` }"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    name: string;
    dim: number;
}>();

const backgroundURL = computed(
    () =>
        new URL(`../assets/backgrounds/${props.name}.jpg`, import.meta.url)
            .href,
);
</script>
