<template>
    <div class="filter-container">
        <div class="input">
            <input
                v-model.trim="filter.query"
                placeholder="Поиск"
                type="text"
                @input="filterByQuery"
            >
            <i class="far fa-search"/>
        </div>

        <select
            v-model.number="filter.select"
            @change="filterBySelect"
        >
            <option value="-1">
                По стандарту
            </option>
            <option value="0">
                Название
            </option>
            <option value="1">
                Артист
            </option>
            <option value="2">
                Длительность
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import FilterInterface from '@/interfaces/components/FilterInterface';
import TrackInterface from '@/interfaces/TrackInterface';
import { defineEmits, defineProps, onMounted, ref, Ref } from 'vue';

const props = defineProps<{
    data: Array<TrackInterface>;
    filterFunc: Array<any>;
}>();

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
    (e: 'filtered', payload: Array<TrackInterface>): void;
}>();

const filter: Ref<FilterInterface> = ref({
    query: '',
    select: -1
});

const filteredArray: Ref<Array<TrackInterface>> = ref([]);

onMounted(() => {
    filteredArray.value = props.data;
});

// todo: debounce me
function filterByQuery() {
    if (!filter.value.query.length) {
        return emits('filtered', props.data);
    }

    const filteredResult = filteredArray.value.filter(item => {
        return item.title.toLowerCase().indexOf(filter.value.query.toLowerCase()) !== -1 ||
            item.artists.findIndex(item => item.name.toLowerCase().indexOf(filter.value.query.toLowerCase()) !== -1) !== -1;
    });

    filteredArray.value = filteredResult.concat(filteredArray.value.filter(item => {
        return filteredResult.indexOf(item) === -1;
    }));

    emits('filtered', filteredArray.value);
}

function filterBySelect() {
    if (filter.value.select < 0) {
        return emits('filtered', props.data);
    }

    emits('filtered', [...filteredArray.value].sort(props.filterFunc[filter.value.select]));
}

onMounted(() => {
    emits('filtered', props.data);
});

</script>

<style scoped>
.filter-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

input, select {
    padding: 8px 12px;
    color: white;
}

.input {
    position: relative;
    width: 215px;
    height: 40px;
}

input {
    background: rgba(44, 53, 77, 0.57);
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

input::placeholder {
    color: white;
}

i {
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translate(-50%, -50%);
}

select {
    background: none;
    outline: none;
    border: none;
}

option {
    color: black;
    background: none;
}
</style>
