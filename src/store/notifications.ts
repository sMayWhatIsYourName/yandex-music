import { defineStore } from 'pinia';

interface NotificationsInterface {
    id: number;
    title: string;
}

interface State {
    notifications: Array<NotificationsInterface>;
}

export const useNotificationsStore = defineStore('notifications', {
    state: (): State => ({
        notifications: []
    }),
    actions: {
        pushNotification(title: string) {
            this.notifications.push({
                id: this.notifications.length,
                title
            } as NotificationsInterface);

            setTimeout(() => {
                this.notifications.pop();
            }, 3000);
        },
        removeNotification(notificationId: number) {
            this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
        },
        popNotification() {
            this.notifications.pop();
        }
    },
    getters: {
        current(): NotificationsInterface | undefined {
            return this.notifications[this.notifications.length - 1];
        }
    }
});
