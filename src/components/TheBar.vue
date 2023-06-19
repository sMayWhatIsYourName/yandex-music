<template>
    <div class="bar">
        <div>
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
<div
class="bar-exit"
@click="handleClick"
>
    <svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
fill="#fff"
viewBox="0 0 20 20"
><path
fill-rule="evenodd"
d="M8.317 2h.933a.75.75 0 1 1 0 1.5h-.9c-.992 0-1.692 0-2.238.045-.537.044-.86.127-1.11.255A2.75 2.75 0 0 0 3.8 5.002c-.128.25-.21.573-.255 1.11-.044.546-.045 1.245-.045 2.238v3.3c0 .992 0 1.692.045 2.238.044.537.127.86.255 1.11A2.75 2.75 0 0 0 5.002 16.2c.25.128.573.21 1.11.255.546.044 1.246.045 2.238.045h.895a.75.75 0 0 1 0 1.5h-.928c-.952 0-1.713 0-2.327-.05-.63-.052-1.172-.16-1.67-.413a4.25 4.25 0 0 1-1.857-1.858c-.253-.497-.361-1.04-.413-1.67C2 13.397 2 12.636 2 11.684V8.317c0-.952 0-1.713.05-2.327.052-.63.16-1.172.413-1.67a4.25 4.25 0 0 1 1.858-1.857c.497-.253 1.04-.361 1.67-.413C6.603 2 7.364 2 8.316 2Zm5.903 4.97a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 1 1-1.06-1.06l1.22-1.22H8.75a.75.75 0 0 1 0-1.5h6.69l-1.22-1.22a.75.75 0 0 1 0-1.06Z"
clip-rule="evenodd"
/></svg>
</div>
        </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '@/store';
import { AppStateEnum } from '@/enums/AppStateEnum';

const route = useRoute();
const mainStore = useMainStore();

const handleClick = () => {
    mainStore.setAppState(AppStateEnum.LOGIN);
    localStorage.removeItem('token');
};

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

.bar-exit {
    position: absolute;
    bottom: 10px;
    left: 20px;
    cursor: pointer;
}

.bar-exit:hover svg {
    fill: #fcca00;
    /* stroke: #fcca00; */
}
</style>
