<template>
    <table id="arc-table">
        <tbody>
            <tr v-for="(arc, index) in arcList" :key="index">
                <td class="header">
                    <p>{{ arc.name }}</p>
                </td>
                <td class="games">
                    <div class="img-container">
                        <img
                            v-for="(g, idx) in arc.games"
                            :key="idx"
                            :src="getPicture(g)"
                            :alt="g.name"
                        />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { arcList } from '@/scripts/arcList';
import { getPicture } from '@/scripts/game';
</script>

<style>
@import '../styles/table.css';
</style>
