<template>
    <div class="settings-container">
        <p class="title">
            {{ stationStore.currentInfo?.station?.name }}
        </p>
        <div
            v-for="(item, key) in stationStore.currentInfo?.station?.restrictions2"
            :key="item.name"
            class="setting-block"
        >
            <p class="settings-block-title">
                {{ item.name }}
            </p>
            <div class="settings-block-body">
                <button
                    v-for="possible in item.possibleValues"
                    :key="possible.value"
                    :class="{'active': stationSettings[key] === possible.value}"
                    @click="setStationSetting(key, possible.value)"
                >
                    {{ possible.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStationStore } from '@/store/station';
import { defineEmits, ref, watch } from 'vue';

const stationStore = useStationStore();
const emit = defineEmits<{
    (e: 'updateSettings', settings: any): void,
    (e: 'close'): void,
}>();

const stationSettings = ref<typeof stationStore.currentInfo.settings2>({
    diversity: stationStore.currentInfo.settings2?.diversity,
    language: stationStore.currentInfo.settings2?.language,
    moodEnergy: stationStore.currentInfo.settings2?.moodEnergy
});

watch(() => stationStore.currentInfo.settings2, (value) => {
    stationSettings.value.diversity = value.diversity;
    stationSettings.value.language = value.language;
    stationSettings.value.moodEnergy = value.moodEnergy;
}, { deep: true });

function setStationSetting(key: string, value: string) {
    stationSettings.value[key as keyof typeof stationSettings.value] = value;
    emit('updateSettings', stationSettings.value);
}
</script>

<style scoped>
.settings-container {
    position: absolute;
    left: 0;
    top: -10px;
    transform: translateY(-100%);
    background: #242833;
    padding: 20px;
    border-radius: 6px;
    color: white;
    flex-direction: column;
    gap: 20px;
}

.title {
    font-size: 18px;
    font-weight: 400;
    text-align: center;
}

.setting-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.settings-block-title {
    font-size: 12px;
    margin-bottom: 7px;
}

.settings-block-body {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    background: var(--background);
}

.settings-block-body button {
    flex: 1;
    padding: 10px 18px;
    background: none;
    color: white;
    font-size: 14px;
    font-weight: 400;
}

.settings-block-body .active {
    background: var(--main-color);
    color: black;
    border-radius: 999px;
}
</style>
