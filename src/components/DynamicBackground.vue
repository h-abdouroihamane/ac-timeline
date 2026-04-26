<template>
    <div
        id="background-image"
        :style="{ backgroundImage: `url(${backgroundURL})` }"
    >
        <div class="overlay" :style="{ background: `rgba(0,0,0,${dim})` }" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
});

const backgroundURL = computed(
    () =>
        new URL(`../assets/backgrounds/${props.name}.jpg`, import.meta.url)
            .href,
);

const dimMap: Record<string, number> = {
    ocean: 0.5,
    helix: 0.4,
    obsidian: 0.1,
    obsidian_3D: 0.1,
    rust: 0.25,
};
const dim = computed(() => dimMap[backgroundURL.value] ?? 0.3);
</script>
