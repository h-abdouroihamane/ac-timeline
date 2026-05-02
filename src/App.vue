<template>
    <v-app>
        <DynamicBackground :name="currentBg" :dim="dim" />

        <v-btn
            v-if="settingsButtonVisible"
            id="settings-button"
            icon="mdi-cog"
            variant="text"
            aria-label="Open settings"
            @click="settingsOpen = true"
        />

        <v-dialog v-model="settingsOpen" max-width="360">
            <v-card title="Settings">
                <v-card-text class="d-flex flex-column" style="gap: 1rem">
                    <v-select
                        v-model="currentBg"
                        :items="backgroundList"
                        label="Background"
                        density="compact"
                        hide-details
                        variant="outlined"
                    />
                    <v-slider
                        v-model="dim"
                        :min="0"
                        :max="1"
                        :step="0.01"
                        label="Dim"
                        thumb-label
                        hide-details
                    />
                    <CopyAltText />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn variant="text" @click="settingsOpen = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-main>
            <v-container id="container" fluid>
                <h1
                    id="title"
                    class="pb-2 pt-4 text-3xl font-bold tracking-tight text-heading md:text-3xl lg:text-3xl"
                >
                    <i
                        >"In which order should I play the Assassin's Creed
                        games?"</i
                    >
                </h1>
                <h4
                    id="me"
                    class="text-2xl tracking-tight text-heading md:text-2xl lg:text-2xl"
                >
                    by alsagone
                </h4>

                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import CopyAltText from './components/CopyAltText.vue';
import DynamicBackground from './components/DynamicBackground.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const DIM_DEFAULTS: Record<string, number> = {
    ocean: 0.5,
    helix: 0.4,
    obsidian: 0.1,
    obsidian_3D: 0.1,
    rust: 0.25,
};

const backgroundList = ['helix', 'obsidian', 'obsidian_3D', 'ocean', 'rust'];
const currentBg = ref('helix');
const dim = ref(DIM_DEFAULTS[currentBg.value] ?? 0.3);
const settingsOpen = ref(false);
const settingsButtonVisible = ref(true);

watch(currentBg, (bg) => {
    dim.value = DIM_DEFAULTS[bg] ?? 0.3;
});

const TOGGLE_SEQUENCE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
] as const;
let sequenceProgress = 0;

function onKeydown(e: KeyboardEvent) {
    if (e.key === TOGGLE_SEQUENCE[sequenceProgress]) {
        sequenceProgress += 1;
        if (sequenceProgress === TOGGLE_SEQUENCE.length) {
            settingsButtonVisible.value = !settingsButtonVisible.value;
            sequenceProgress = 0;
        }
    } else {
        sequenceProgress = e.key === TOGGLE_SEQUENCE[0] ? 1 : 0;
    }
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<style>
@import './styles/fonts.css';
@import './styles/style.css';

#settings-button {
    position: fixed;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 10;
    background: transparent;
    color: #fff;
}
</style>
