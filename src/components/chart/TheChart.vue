<template>
    <div
        v-if="Object.keys(chart).length"
        class="chart-container"
    >
        <div class="main-container-title">
            <h2>
                Чарт Яндекс.Музыки<br>
                <span class="main-container-subtitle">Треки популярные на Яндекс Музыке прямо сейчас</span>
            </h2>
            <RouterLink
                :to="{name: 'chart'}"
                class="main-container-show-all"
            >
                Показать все
            </RouterLink>
        </div>
        <div
            class="chart-tracks-container"
        >
            <ChartTrack
                v-for="item in chartStore.data"
                :key="item.data.id"
                :item="item.data"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { useChartStore } from '@/store/chart';
import ChartTrack from '@/components/chart/ChartTrack.vue';
import { Entity } from '@/interfaces/LandingBlocksInterface';

const chartStore = useChartStore(); // Получаем чарт из хранилища
const chart: Ref<Array<Entity>> = ref([]);

onMounted(async () => {
    chart.value = chartStore.data;
});

</script>

<style scoped>
.chart-tracks-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 7px 40px;
}

</style>
