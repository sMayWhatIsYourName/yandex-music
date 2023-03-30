<template>
    <div class="background">
        <div
            :class="{'stop': !playerStore.playing}"
            class="playing"
        >
            <span class="playing__bar playing__bar1"/>
            <span class="playing__bar playing__bar2"/>
            <span class="playing__bar playing__bar3"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { usePlayerStore } from '@/store/player';

const playerStore = usePlayerStore();
</script>

<style scoped>
.background {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.playing {
    width: 32px;
    height: 32px;
    border-radius: .3rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: .5rem;
    box-sizing: border-box;
}

.stop > .playing__bar {
    animation: none !important;
    animation-fill-mode: forwards !important;
}

.playing__bar {
    display: inline-block;
    background: var(--main-color);
    width: 4px;
    height: 100%;
    animation: up-and-down 1.3s ease infinite alternate;
}

.playing__bar1 {
    height: 60%;
}

.playing__bar2 {
    height: 30%;
    animation-delay: -2.2s;
}

.playing__bar3 {
    height: 75%;
    animation-delay: -3.7s;
}

@keyframes up-and-down {
    10% {
        height: 30%;
    }

    30% {
        height: 100%;
    }

    60% {
        height: 50%;
    }

    80% {
        height: 75%;
    }

    100% {
        height: 60%;
    }
}
</style>
