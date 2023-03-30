<template>
    <div class="content-warning">
        {{ contentWarning[0] }}
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
    contentWarning: string;
}>();
</script>

<style scoped>
.content-warning {
    color: var(--background);
    background: #8E929C;
    border-right: 1px;
    width: 12px;
    height: 12px;
    text-transform: uppercase;
    font-size: 9px;
    font-weight: 500;
    line-height: 12px;
    text-align: center;
    border-radius: 2px;
    margin-right: 5px;
}
</style>
