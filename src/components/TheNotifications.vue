<template>
    <div class="notifications-container">
        <Transition name="notify">
            <div
                v-if="current"
                class="notification-item"
            >
                {{ current.title }}
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { useNotificationsStore } from '@/store/notifications';
import { computed } from 'vue';

const notificationStore = useNotificationsStore();
const current = computed(() => notificationStore.current);
</script>

<style scoped>
.notifications-container {
    position: absolute;
    left: calc(50% - 68px);
    bottom: 130px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notification-item {
    background: var(--main-color);
    color: white;
    border-radius: 10px;
    padding: 5px 15px;
    transition: .5s;
}

.notify-enter-active, .notify-leave-active {
    transform: translateY(0);
}

.notify-enter-from, .notify-leave-to {
    opacity: 0;
    transform: translateY(100px);
}
</style>
