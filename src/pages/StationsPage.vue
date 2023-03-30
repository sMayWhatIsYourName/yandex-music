<template>
    <main
        v-if="isLoaded"
        class="main"
    >
        <div class="main-container">
            <h2 class="main-container-title">
                Радио
            </h2>
            <div
                v-if="stationDashboard.stations?.length"
                class="my-wave-container"
            >
                <div
                    v-for="item in stationDashboard.stations"
                    :key="item.station.idForFrom"
                    class="my-wave-block"
                >
                    <StationCard :station="item"/>
                </div>
            </div>
        </div>
        <div
            class="main-container"
        >
            <h2 class="main-container-title station-collections-title">
                Подборки
            </h2>
            <div class="station-types-slider-container">
                <button
                    v-for="item in stationStore.listKeys"
                    :key="item"
                    :class="{'active': item === selectedKey}"
                    @click="selectKey(item)"
                >
                    {{ keyToName(item) }}
                </button>
            </div>
            <div class="genres-container">
                <div
                    v-for="item in stationListByKey"
                    :key="item.station.id.tag"
                    class="genre-block"
                >
                    <StationCardSmall
                        :station="item"
                    />
                </div>
            </div>
        </div>
    </main>
    <BaseLoading v-else/>
</template>

<script lang="ts" setup>
import BaseLoading from '@/components/ui/BaseLoading.vue';
import { useStationStore } from '@/store/station';
import { computed, onMounted, ref, Ref } from 'vue';
import useRequest from '@/composables/useRequest';
import StationCard from '@/components/station/StationCard.vue';
import StationCardSmall from '@/components/station/StationCardSmall.vue';

const request = useRequest();
const stationStore = useStationStore();

const selectedKey: Ref<string> = ref('genre');

const stationDashboard = computed(() => stationStore.dashboard);
const stationList = computed(() => stationStore.list);
const isLoaded = computed(() => Boolean(Object.keys(stationDashboard.value).length && Boolean(Object.keys(stationList.value).length)));

const stationListByKey = computed(() => stationStore.list[selectedKey.value]);
onMounted(async () => {
    if (isLoaded.value) {
        return;
    }

    const [dashboard, list] = await Promise.all([
        getStationDashboard(),
        getStationsList()
    ]);

    console.log(dashboard);
    console.log(list);

    await Promise.all([
        stationStore.setDashboard(dashboard),
        stationStore.setList(list)
    ]);
});

async function getStationDashboard() {
    const res = await request.get('/rotor/stations/dashboard');
    return res.data.result;
}

async function getStationsList() {
    const res = await request.get('/rotor/stations/list');
    return res.data.result;
}

function selectKey(key: string) {
    selectedKey.value = key;
}

function keyToName(key: string) {
    switch (key) {
    case 'genre':
        return 'Жанры';
    case 'mood':
        return 'Настроение';
    case 'activity':
        return 'Активность';
    case 'epoch':
        return 'Эпоха';
    case 'author':
        return 'Автор';
    case 'local':
        return 'Место';
    case 'editorial':
        return 'Редакция';
    case 'personal':
        return 'Персональное';
    default:
        return key;
    }
}
</script>

<style scoped>
.my-wave-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    width: 100%;
    gap: 10px;
}

.station-collections-title {
    margin-bottom: 15px;
}

.station-types-slider-container {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #353B4E;
    margin-bottom: 24px;
}

.station-types-slider-container button {
    background: none;
    transition: 0.2s;
    color: #8E929C;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    box-sizing: border-box;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
}

.genres-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 7px;
    width: 100%;
    grid-auto-flow: row;
    justify-content: space-between;
}

.active {
    border-bottom: 2px solid var(--main-color) !important;
    color: white !important;
    transition: 0.2s;
}

</style>
