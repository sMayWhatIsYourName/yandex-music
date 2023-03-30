<template>
    <div class="range-container">
        <div
            :style="{width: getWidth}"
            class="range-selected"
        />
        <input
            v-model.number="currentValue"
            :max="maxValue"
            :step="step || 1"
            class="range"
            min="0"
            type="range"
            @input="onInput"
        >
        <div class="range-unselected"/>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
    (e: 'change', value: number): void;
}>();

const props = defineProps<{
    value: number;
    maxValue: number;
    step?: number;
}>();

const currentValue = ref(props.value);

watch(props, (value) => {
    currentValue.value = value.value;
});

const getWidth = computed(() => {
    const divide = (currentValue.value / props.maxValue) * 100;
    if (isNaN(divide)) {
        return '0%';
    } else if (divide < 50) {
        return `calc(${divide}% + 5px)`;
    } else {
        return `calc(${divide}% - 5px)`;
    }
});

function onInput() {
    emits('change', currentValue.value);
}
</script>

<style scoped>
.range-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100%;
}

.range-unselected, .range-selected {
    background: #A1A1A1;
    width: calc(100% - 2px);
    height: 6px;
    position: absolute;
    z-index: 5;
    border-radius: 15px;
    left: 0;
}

.range-selected {
    background: var(--main-color);
    z-index: 10;
}

.range {
    height: 6px;
    -webkit-appearance: none;
    outline: none;
    background: none;
    z-index: 20;
    width: 100%;
}

.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    cursor: pointer;
    border: 4px solid #434343;
    background: var(--main-color);
}
</style>
