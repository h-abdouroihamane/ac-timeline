<template>
    <div class="copy-alt-text">
        <v-btn
            :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'"
            :color="copied ? 'success' : undefined"
            :disabled="!supported"
            variant="tonal"
            size="small"
            @click="onCopy"
        >
            Copy alt text
        </v-btn>

        <!--
          Visually hidden live region. We don't change the button label
          itself on success, so screen readers won't double-announce when
          the button stays focused after activation.
        -->
        <span class="sr-only" aria-live="polite" role="status">
            {{ status }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { getAltText } from '@/scripts/getAltText';

const copied = ref(false);
const status = ref('');

const supported = computed(
    () =>
        typeof navigator !== 'undefined' &&
        typeof navigator.clipboard?.writeText === 'function',
);

let timer: ReturnType<typeof setTimeout> | null = null;

const onCopy = async () => {
    try {
        await navigator.clipboard.writeText(getAltText());
        copied.value = true;
        status.value = 'Alt text copied to clipboard.';

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            copied.value = false;
            status.value = '';
        }, 2000);
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        status.value = `Could not copy alt text: ${msg}`;
    }
};

onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
});
</script>
