<template>
    <div class="mobile-view">
        <v-tabs
            v-model="activeTab"
            align-tabs="center"
            color="white"
            grow
            density="compact"
        >
            <v-tab value="table">Table</v-tab>
            <v-tab value="notes">Notes</v-tab>
        </v-tabs>

        <v-tabs-window v-model="activeTab" class="mt-3">
            <v-tabs-window-item value="table">
                <v-carousel
                    hide-delimiter-background
                    show-arrows="hover"
                    color="white"
                    height="auto"
                    progress="primary"
                >
                    <v-carousel-item
                        v-for="(arc, i) in arcList"
                        :key="i"
                        class="arc-slide"
                    >
                        <div class="arc-card">
                            <h2 class="arc-name">{{ arc.name }}</h2>
                            <div
                                class="games-grid"
                                :class="
                                    arc.games.length >= 5 ? 'cols-3' : 'cols-2'
                                "
                            >
                                <img
                                    v-for="(g, idx) in arc.games"
                                    :key="idx"
                                    :src="getPicture(g)"
                                    :alt="g.name"
                                />
                            </div>
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-tabs-window-item>

            <v-tabs-window-item value="notes">
                <Notes />
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Notes from '@/components/Notes.vue';
import { arcList } from '@/scripts/arcList';
import { getPicture } from '@/scripts/game';

const activeTab = ref<'table' | 'notes'>('table');
</script>

<style scoped>
.mobile-view {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
}

.arc-slide {
    aspect-ratio: 1 / 1;
}

.arc-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    box-sizing: border-box;
    text-shadow: 1px 1px 2px #000;
}

.arc-name {
    margin: 0;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.2;
}

.games-grid {
    flex: 1;
    display: grid;
    gap: 0.5rem;
    place-items: center;
    min-height: 0;
}

.games-grid.cols-2 {
    grid-template-columns: repeat(2, 1fr);
}

.games-grid.cols-3 {
    grid-template-columns: repeat(3, 1fr);
}

.games-grid img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow:
        rgba(50, 50, 93, 0.25) 0 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0 3px 7px -3px;
}
</style>
