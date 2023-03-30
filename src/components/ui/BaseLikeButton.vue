<template>
    <button>
        <i
            :class="liked ? 'fas': 'far'"
            class="fa-heart"
        />
    </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
    liked?: boolean;
}>();
</script>

<style scoped>
button {
    background: none;
    outline: none;
    border: none;
    transition: 0.2s;
}

button:hover .far {
    color: var(--main-color);
    transition: 0.2s;
}

.far {
    color: #8E929C;
    transition: 0.2s;
}

.fas {
    color: var(--main-color);
    transition: 0.2s;
}
</style>
