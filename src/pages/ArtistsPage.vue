<template>
    <LayoutItems :loaded="artists.length > 0">
        <template #title>
            Исполнители
        </template>
        <template #body>
            <ArtistCard
                v-for="artist in artists"
                :key="artist.id"
                :artist="artist"
            />
        </template>
    </LayoutItems>
</template>

<script lang="ts" setup>
import ArtistCard from '@/components/artist/ArtistCard.vue';
import LayoutItems from '@/layouts/LayoutItems.vue';
import { onMounted, ref, Ref } from 'vue';
import ArtistInterface from '@/interfaces/ArtistInterface';
import useRequest from '@/composables/useRequest';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const artists: Ref<Array<ArtistInterface>> = ref([]);

onMounted(async () => {
    const res = await useRequest().get(`/users/${userStore.userId}/likes/artists`);
    artists.value = res.data.result;
});
</script>

<style scoped>

</style>
