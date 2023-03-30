<template>
    <main class="main">
        <BaseNavigation/>
        <div class="main__head">
            <h2>
                <slot name="title"/>
                <br>
                <span><slot name="subtitle"/></span>
            </h2>
        </div>
        <slot
            v-if="loaded"
            name="body"
        />
        <BaseLoading v-else/>
    </main>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import BaseNavigation from '@/components/ui/BaseNavigation.vue';
import BaseLoading from '@/components/ui/BaseLoading.vue';

defineProps<{
    loaded: boolean;
}>();

</script>

<style scoped lang="scss">
.main {
    &__head {
        h2 {
            font-weight: 500;
            font-size: 31.25px;
            line-height: 20px;
            margin-bottom: 20px;
        }

        span {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #8E929C;
        }
    }
}
</style>
