<template>
    <div
        ref="root"
        class="flickity"
    >
        <slot/>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted, Ref, ref } from 'vue';
import Flickity from 'flickity';
import FlickityOptionsInterface from '@/interfaces/components/FlickityOptionsInterface';

const props = defineProps<{ options: FlickityOptionsInterface }>();

const flickity: Ref<typeof Flickity | null> = ref(null);
const root: Ref<HTMLElement | string> = ref('');

onMounted(() => {
    flickity.value = new Flickity(root.value, props.options);
});

onUnmounted(() => flickity.value?.destroy());

</script>

<style scoped>
@import '~flickity/dist/flickity.css';

</style>
