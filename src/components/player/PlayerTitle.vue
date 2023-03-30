<template>
    <p
        ref="trackTitle"
        class="player-track-title"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
    >
        {{ title }}
    </p>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue';

const trackTitle = ref<HTMLElement | null>(null);
const scroller = ref({
    tick: 1,
    amount: 0,
    play: false,
    playBackup: false,
    delayOffset: 20
});

const props = defineProps<{
    title: string;
}>();

function handleEnter() {
    if (!trackTitle.value) {
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
        if (!trackTitle.value || !scroller.value.play) {
            return;
        }

        if (scroller.value.amount >= trackTitle.value.scrollWidth -
            trackTitle.value.offsetWidth + scroller.value.delayOffset
        ) {
            scroller.value.tick = -1;
        }

        if (scroller.value.amount <= 0) {
            scroller.value.tick = 1;
            scroller.value.play = false;
        }

        scroller.value.amount += scroller.value.tick;

        trackTitle.value.scrollTo({
            left: scroller.value.amount,
            behavior: 'smooth'
        });
    }, 60);
});

watch(props, () => {
    scroller.value.play = false;
    scroller.value.tick = 1;
    scroller.value.amount = 0;
    trackTitle.value?.scrollTo({
        left: 0
    });

    setTimeout(() => {
        scroller.value.play = true;
    }, 1000);
});

</script>

<style scoped>
.player-track-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    color: white;
    overflow-x: scroll;
    width: 145px;
    white-space: nowrap;
    cursor: pointer;
}

.player-track-title::-webkit-scrollbar {
    display: none;
}
</style>
