<template>
    <main class="main">
        <PlaylistsSmall v-once/>
        <PersonalPlaylists v-once/>
        <NewReleases v-once/>
        <HitsPlaylists v-once/>
        <TheChart v-once/>
        <TheRecentPlayed v-once/>
    </main>
</template>

<script lang="ts" setup>
import PlaylistsSmall from '@/components/playlist/PlaylistsSmall.vue';
import NewReleases from '@/components/playlist/PlaylistNewReleases.vue';
import HitsPlaylists from '@/components/playlist/PlaylistsHits.vue';
import TheChart from '@/components/chart/TheChart.vue';
import TheRecentPlayed from '@/components/TheRecentPlayed.vue';
import PersonalPlaylists from '@/pages/PersonalPlaylists.vue';
</script>

<style>

</style>
