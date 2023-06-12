<template>
    <main
        v-if="Object.keys(album).length"
        class="main"
    >
        <div class="main-container main-container-scroller">
            <BaseNavigation/>
            <div class="item-head">
                <BaseImage
                    :alt="album.title"
                    :height="150"
                    :src="album.ogImage"
                    :width="150"
                    type="album"
                />

                <div class="item-info">
                    <p class="info-type">
                        {{ album?.type === 'single' ? 'Сингл' : 'Альбом' }}
                    </p>

                    <h2 class="info-title">
                        {{ album.title }}
                        <span v-if="album.year">
                        ({{ album.year }})
                    </span>
                    </h2>

                    <div class="info-row">
                        <h3
                            v-if="album.artists"
                            class="info-artists"
                        >
                            Исполнители:
                        </h3>
                        <ArtistsLinks :artists="album.artists"/>
                        <img
                            alt="circle"
                            class="info-circle"
                            src="../assets/img/circle-white.svg"
                        >
                        <p
                            v-if="album.trackCount"
                            class="info-tracks-count"
                        >
                            {{ useTracksCount(album.trackCount) }}
                        </p>
                    </div>

                    <div class="item-controls">
                        <button
                            class="btn"
                            @click="usePlayShuffle(album.volumes[0])"
                        >
                            <i class="fas fa-play fa-sm"/>
                            {{ album?.type === 'single' ? 'Слушать' : 'Перемешать' }}
                        </button>
                    </div>
                </div>
            </div>
            <TheTracksTable
                v-if="album.volumes"
                :filter-bar="album.type !== 'single'"
                :tracks="album.volumes[0]"
                :without-image="true"
            />
        </div>
    </main>
    <BaseLoading v-else/>
</template>

<script lang="ts" setup>
import BaseNavigation from '@/components/ui/BaseNavigation.vue';
import ArtistsLinks from '@/components/artist/ArtistsLinks.vue';
import useTracksCount from '@/composables/useTracksCount';
import { useRoute } from 'vue-router';
import useRequest from '@/composables/useRequest';
import { onMounted, ref, Ref } from 'vue';
import AlbumWithTracksInterface from '@/interfaces/AlbumWithTracksInterface';
import TheTracksTable from '@/components/track/TracksTable.vue';
import usePlayShuffle from '@/composables/usePlayShuffle';
import BaseImage from '@/components/ui/BaseImage.vue';
import BaseLoading from '@/components/ui/BaseLoading.vue';

const route = useRoute();
const request = useRequest();

const album: Ref<AlbumWithTracksInterface> = ref({} as AlbumWithTracksInterface);

onMounted(async () => {
    const res = await request.get(`/albums/${route.params.id}/with-tracks`); // Запрашиваем альбом с песнями
    album.value = res.data.result;
});

</script>

<style scoped>
.item-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
}

.item-head img {
    width: 140px;
    height: 140px;
    margin-right: 20px;
    border-radius: 6px;
}

.item-info {
    display: flex;
    flex-direction: column;
}

.item-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.item-controls button i {
    margin-right: 5px;
}

.item-info-additional p:first-child {
    margin-right: 5px;
}

.info-type {
    font-weight: 400;
    font-size: 12.8px;
    line-height: 16px;
    color: #8E929C;
    margin-bottom: 10px;
}

.info-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 16px;
    color: #FFFFFF;
    margin-bottom: 20px;
}

.info-artists {
    margin-right: 5px;
}

.info-artists, .info-tracks-count {
    font-weight: 400;
    font-size: 12.8px;
    line-height: 16px;
    color: #8E929C;
}

.info-tracks-count {
    color: white;
}

.info-artists span {
    color: white;
}

.info-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 17px;
}

.info-circle {
    width: 3px !important;
    height: 3px !important;
    margin-inline: 10px !important;
}

</style>
