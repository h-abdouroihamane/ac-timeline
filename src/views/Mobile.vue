<template>
    <div ref="mobileView" class="mobile-view">
        <div class="carousel-wrap">
            <v-carousel
                hide-delimiters
                show-arrows="hover"
                color="white"
                :height="carouselSize"
                progress="primary"
            >
                <v-carousel-item v-for="(arc, i) in arcList" :key="i">
                    <div class="arc-card">
                        <h2 class="arc-name">{{ arc.name }}</h2>
                        <div
                            class="games-grid"
                            :class="arc.games.length >= 5 ? 'cols-3' : 'cols-2'"
                        >
                            <div
                                v-for="(g, idx) in arc.games"
                                :key="idx"
                                class="cover"
                            >
                                <img :src="getPicture(g)" :alt="g.name" />
                                <span
                                    v-if="arc.name !== 'Spin-offs'"
                                    class="cover-num"
                                    >{{ idx + 1 }}</span
                                >
                            </div>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item v-for="(group, i) in noteSlides" :key="i">
                    <div class="note-card">
                        <ul v-for="(note, j) in group" :key="j" class="note">
                            <li class="question" v-html="note.question"></li>
                            <ul class="answers">
                                <li
                                    v-for="(a, k) in note.answers"
                                    :key="k"
                                    class="answer"
                                    v-html="a"
                                ></li>
                            </ul>
                        </ul>
                    </div>
                </v-carousel-item>

                <v-carousel-item>
                    <div class="note-card guide-card">
                        <QrCode />
                        <p class="guide-text">
                            Link to the Lore guide -
                            <a
                                href="https://tiny.cc/GuideAC"
                                target="_blank"
                                rel="noreferrer noopener"
                                class="text-orange-200 underline hover:no-underline"
                                >https://tiny.cc/GuideAC</a
                            >
                        </p>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import QrCode from '@/components/QrCode.vue';
import { arcList } from '@/scripts/arcList';
import { getPicture } from '@/scripts/game';
import { noteList } from '@/scripts/noteList';
import type { Note } from '@/scripts/note';

const NOTES_PER_SLIDE = 2;
const noteSlides = computed<Note[][]>(() => {
    const slides: Note[][] = [];
    for (let i = 0; i < noteList.length; i += NOTES_PER_SLIDE) {
        slides.push(noteList.slice(i, i + NOTES_PER_SLIDE));
    }
    return slides;
});

const mobileView = ref<HTMLElement | null>(null);
const carouselSize = ref(360);

let resizeObserver: ResizeObserver | null = null;

const updateSize = () => {
    if (mobileView.value) {
        carouselSize.value = mobileView.value.clientWidth;
    }
};

onMounted(() => {
    updateSize();
    if (mobileView.value && 'ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(mobileView.value);
    }
});

onUnmounted(() => {
    resizeObserver?.disconnect();
});
</script>

<style scoped src="@/styles/mobile.css"></style>
