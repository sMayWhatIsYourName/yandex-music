<template>
    <p
        v-if="artists.length"
        ref="artistsLinks"
        class="player-track-artist"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
    >
        <RouterLink
            v-for="(artist, index) in artists"
            :key="artist.id"
            :to="{name: 'artist', params: {id: artist.id}}"
        >
            {{ useArtistName(artist, index, artists.length) }}
        </RouterLink>
    </p>
</template>

<script lang="ts" setup>
import useArtistName from '@/composables/useArtistName';
import ArtistInterface from '@/interfaces/TrackArtistInterface';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    artists: Array<ArtistInterface>;
}>();

const artistsLinks = ref<HTMLElement | null>(null);
const scroller = ref({
    tick: 1,
    amount: 0,
    play: false,
    playBackup: false,
    delayOffset: 20
});

function handleEnter() {
    if (!artistsLinks.value) {
        return;
    }

    // если анимации нет то начинаем если она есть то стопаем
    scroller.value.play = !scroller.value.play;
}

function handleLeave() {
    if (scroller.value.amount > 0) {
        scroller.value.play = true;
    }
}

onMounted(() => {
    setInterval(() => {
        if (!artistsLinks.value || !scroller.value.play) {
            return;
        }

        if (scroller.value.amount >= artistsLinks.value.scrollWidth -
            artistsLinks.value.offsetWidth + scroller.value.delayOffset
        ) {
            scroller.value.tick = -1;
        }

        if (scroller.value.amount <= 0) {
            scroller.value.tick = 1;
            scroller.value.play = false;
        }

        scroller.value.amount += scroller.value.tick;

        artistsLinks.value.scrollTo({
            left: scroller.value.amount,
            behavior: 'smooth'
        });
    }, 60);
});

watch(props, () => {
    scroller.value.play = false;
    scroller.value.tick = 1;
    scroller.value.amount = 0;
    artistsLinks.value?.scrollTo({
        left: 0
    });

    setTimeout(() => {
        scroller.value.play = true;
    }, 1000);
});
</script>

<style scoped>
.player-track-artist {
    font-weight: 400;
    line-height: 16px;
    margin: 0;
    color: #8E919A;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: pointer;
    text-overflow: unset;
    font-size: 12px;
    width: 145px;
}

.player-track-artist a {
    font-size: inherit;
    color: inherit;
}

.player-track-artist a:hover {
    text-decoration: underline;
}

.player-track-artist::-webkit-scrollbar {
    display: none;
}
</style>
