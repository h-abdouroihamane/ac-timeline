<template>
    <div id="notes">
        <h2
            class="pb-4 pt-4 text-3xl font-bold tracking-tight text-heading md:text-3xl lg:text-3xl"
        >
            Notes
        </h2>

        <ul
            class="note mb-6 list-disc"
            v-for="(note, index) in noteList"
            :key="index"
        >
            <li
                class="question text-xl font-bold tracking-tight text-heading md:text-xl lg:text-xl"
                v-html="note.question"
            ></li>

            <ul>
                <li
                    v-for="(answer, i) in note.answers"
                    :key="i"
                    class="answer text-base mb-2 ml-4 font-light"
                    v-html="answer"
                ></li>
            </ul>
        </ul>

        <div id="guide" class="flex flex-col justify-center items-center">
            <QrCode />
            <p class="text-lg">
                Link to the Lore guide -
                <a
                    href="https://tiny.cc/GuideAC"
                    target="_blank"
                    rel="noreferrer norelopener"
                    class="text-orange-200 underline hover:no-underline"
                    >https://tiny.cc/GuideAC</a
                >
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import QrCode from './QrCode.vue';
import { noteList } from '@/scripts/noteList';
</script>

<style>
@import '../styles/notes.css';
</style>
