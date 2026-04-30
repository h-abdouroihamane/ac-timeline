<template>
    <v-btn
        prepend-icon="mdi-camera"
        :loading="busy"
        :disabled="!target"
        variant="tonal"
        size="small"
        @click="onClick"
    >
        Screenshot
    </v-btn>
</template>

<script setup lang="ts">
import { toPng } from 'html-to-image';
import { ref } from 'vue';

const props = defineProps<{
    target: HTMLElement | null;
}>();

const busy = ref(false);

const filename = (): string => {
    const date = new Date().toISOString().slice(0, 10);
    return `ac-timeline-${date}.png`;
};

const onClick = async () => {
    if (!props.target) return;
    busy.value = true;
    try {
        // Wait for custom fonts (Avenir Next World Demi, Roboto) to be
        // ready, otherwise html-to-image can rasterize a fallback face.
        await document.fonts.ready;

        const dataUrl = await toPng(props.target, {
            // The page background is a dimmed image; the .grid itself is
            // transparent. Capturing on a near-black backdrop keeps the
            // screenshot looking like the live page when posted.
            backgroundColor: '#0a0a0a',
            // 2x for retina-ish quality on social media.
            pixelRatio: 2,
        });

        const link = document.createElement('a');
        link.download = filename();
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Screenshot failed:', err);
    } finally {
        busy.value = false;
    }
};
</script>
