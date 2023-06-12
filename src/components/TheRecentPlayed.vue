<template>
    <div class="recent-container">
        <div class="recent-head">
            <h2 class="recent-title">
                Вы недавно слушали
            </h2>
        </div>
        <BaseFlickity
            v-if="recent.length"
            ref="flickity"
            :options="useFlickityDefaultOptions"
        >
            <div
                v-for="item in recent"
                :key="item.id"
                class="carousel-cell"
            >
                <AlbumCard
                    v-if="item.data.context === 'album'"
                    :album="item.data.payload"
                    :album-id="item.data.payload.id"
                />

                <PlaylistCardLanding
                    v-else-if="item.data.context === 'playlist'"
                    :playlist="item.data.payload"
                    :show-tracks-count="true"
                />

                <ArtistCard
                    v-else-if="item.data.context === 'artist'"
                    :artist="item.data.payload"
                />
            </div>
        </BaseFlickity>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { Entity } from '@/interfaces/LandingBlocksInterface';
import { useRecentStore } from '@/store/recent';
import BaseFlickity from '@/components/ui/BaseFlickity.vue';
import useFlickityDefaultOptions from '@/composables/useFlickityDefaultOptions';
import AlbumCard from '@/components/album/AlbumCard.vue';
import ArtistCard from '@/components/artist/ArtistCard.vue';
import PlaylistCardLanding from '@/components/playlist/PlaylistCardLanding.vue';

const recentStore = useRecentStore(); // Берем из хранилища последнее прослушенное
const recent: Ref<Array<Entity>> = ref([]);

onMounted(async () => {
    recent.value = recentStore.data;
});

</script>

<style scoped>
.recent-container {
    margin-top: 45px;
}

.recent-title {
    font-weight: 500;
    font-size: 25px;
    line-height: 20px;
}

.recent-head {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
