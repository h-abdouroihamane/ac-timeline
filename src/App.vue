<template>
    <v-app>
        <DynamicBackground :name="currentBg" :dim="dim" />
        <v-app-bar density="compact" flat>
            <v-spacer />
            <v-select
                v-model="currentBg"
                :items="backgroundList"
                label="Background"
                density="compact"
                hide-details
                variant="outlined"
                style="max-width: 200px"
                class="mr-4"
            />
        </v-app-bar>

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

                <div
                    class="flex flex-col items-start justify-center gap-8 text-left lg:flex-row"
                >
                    <div class="overflow-x-auto">
                        <ArcTable />
                    </div>
                    <Notes />
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import ArcTable from './components/ArcTable.vue';
import DynamicBackground from './components/DynamicBackground.vue';
import Notes from './components/Notes.vue';
import { ref } from 'vue';
const currentBg = ref('helix');
const backgroundList = ['helix', 'obsidian', 'obsidian_3D', 'ocean', 'rust'];
const dim = 0.4;
</script>

<style>
@import './styles/fonts.css';
@import './styles/style.css';
</style>
