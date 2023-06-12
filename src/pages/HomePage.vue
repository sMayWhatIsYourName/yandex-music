<template>
    <main class="main">
        <PlaylistsSmall v-once/>
        <PersonalPlaylists v-once/>
        <TheChart v-once/>
        <TheRecentPlayed v-once/>
    </main>
</template>

<script lang="ts" setup>
import PlaylistsSmall from '@/components/playlist/PlaylistsSmall.vue';
import TheChart from '@/components/chart/TheChart.vue';
import TheRecentPlayed from '@/components/TheRecentPlayed.vue';
import PersonalPlaylists from '@/pages/PersonalPlaylists.vue';
</script>

<style>

</style>
