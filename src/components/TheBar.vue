<template>
    <div class="bar">
        <div
            :style="{top: getLineTopPos}"
            class="bar-line"
        />
        <RouterLink
            v-for="(item, key) in routes"
            :key="item.id"
            :class="{'active': route.name === key}"
            :to="{name: key}"
            class="bar-button"
        >
            <i :class="item.icon"/>
        </RouterLink>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

interface IBarRoute {
    id: number;
    icon: string;
}

const routes = ref<Record<string, IBarRoute>>({
    home: {
        id: 0,
        icon: 'fas fa-home-alt'
    },
    station: {
        id: 1,
        icon: 'fal fa-broadcast-tower'
    },
    tracks: {
        id: 2,
        icon: 'fal fa-music'
    },
    artists: {
        id: 3,
        icon: 'fal fa-user-music'
    },
    albums: {
        id: 4,
        icon: 'fal fa-album'
    },
    playlists: {
        id: 5,
        icon: 'fal fa-list-music'
    }
});

const getLineTopPos = computed(() => {
    const routeId: number = routes.value[String(route.name)]?.id;
    if (routeId < 0) {
        return '0px';
    }

    return `${routeId * 50 + 25}px`;
});

</script>

<style scoped>
.bar {
    display: flex;
    flex-direction: column;
    max-width: 60px;
    padding: 0 5px;
    -webkit-app-region: no-drag;
    position: relative;
    z-index: 20;
    background: var(--background);
}

.bar-line {
    position: absolute;
    left: 0;
    top: 25px;
    height: 17px;
    width: 4px;
    border-radius: 9px;
    background: var(--main-color);
    transform: translateY(-50%);
    transition: 0.2s;
}

.bar-button {
    width: 50px;
    height: 50px;
    background: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    color: #AFB8C1;
    transition: 0.2s;
}

.bar-button:hover {
    transition: 0.2s;
    color: var(--main-color);
}

.bar-button.active {
    background: var(--main-color-transperent);
    border-radius: 4px;
    color: var(--main-color);
}
</style>
