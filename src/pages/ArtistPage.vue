<template>
    <main
        v-if="Object.keys(artist).length"
        class="main"
    >
        <div
            class="main-container"
        >
            <BaseNavigation/>
            <div class="artist-head">
                <BaseImage
                    :alt="artist.artist.name"
                    :height="150"
                    :src="artist.artist.cover.uri"
                    :width="150"
                    class="artist-image"
                    type="artist"
                />
                <div class="artist-head-info">
                    <p>Исполнитель</p>
                    <h1>{{ artist.artist.name }}</h1>
                    <div class="artist-head-controls">
                        <button class="btn">
                            <i class="fas fa-play fa-sm"/> Слушать
                        </button>
                        <BaseLikeButton
                            :liked="artist.artist.liked"
                            class="fa-lg"
                            @click="handleLike"
                        />
                        <BaseMenu>
                            <BaseMenuItem @click="usePlayShuffle(artist.popularTracks)">
                                Перемешать
                            </BaseMenuItem>
                            <BaseMenuItem @click="usePlayStation(artist.artist.id, 'artist')">
                                Поток по исполнителю
                            </BaseMenuItem>
                            <BaseMenuItem @click="handleShare">
                                Поделится
                            </BaseMenuItem>
                        </BaseMenu>
                    </div>
                </div>
            </div>
            <div class="artist-body">
                <div v-if="artist.popularTracks.length">
                    <div class="artist-body-title">
                        <h2>Популярные треки</h2>
                        <RouterLink
                            :to="{
                                name: 'artist-tracks',
                                query: {artist_name: artist.artist.name}
                            }"
                        >
                            Посмотреть все
                        </RouterLink>
                    </div>
                    <div
                        class="artist-body-block"
                    >
                        <TheTracksTable
                            :filter-bar="false"
                            :tracks="artist.popularTracks"
                            :without-margin="true"
                        />
                    </div>
                </div>

                <div
                    v-if="albums.length"
                    class="artist-body-block"
                >
                    <div class="artist-body-title">
                        <h2>Популярные альбомы</h2>
                        <RouterLink
                            :to="{
                                name: 'artist-albums',
                                query: {artist_name: artist.artist.name}
                            }"
                        >
                            Посмотреть все
                        </RouterLink>
                    </div>
                    <BaseFlickity
                        ref="flickity"
                        :options="useFlickityDefaultOptions"
                    >
                        <div
                            v-for="album in albums"
                            :key="album.id"
                            class="carousel-cell"
                        >
                            <AlbumCard :album-id="album.id"/>
                        </div>
                    </BaseFlickity>
                </div>

                <div
                    v-if="artist.alsoAlbums.length"
                    class="artist-body-block"
                >
                    <div class="artist-body-title">
                        <h2>Сборники</h2>
                    </div>
                    <BaseFlickity
                        ref="flickity"
                        :options="useFlickityDefaultOptions"
                    >
                        <div
                            v-for="album in artist.alsoAlbums"
                            :key="album.id"
                            class="carousel-cell"
                        >
                            <AlbumCard :album-id="album.id"/>
                        </div>
                    </BaseFlickity>
                </div>

                <div
                    v-if="artist.similarArtists.length"
                    class="artist-body-block"
                >
                    <div class="artist-body-title">
                        <h2>Похожие артисты</h2>
                    </div>

                    <BaseFlickity :options="useFlickityDefaultOptions">
                        <div
                            v-for="similarArtist in artist.similarArtists"
                            :key="similarArtist.id"
                            class="carousel-cell"
                        >
                            <ArtistCard
                                :artist="similarArtist"
                            />
                        </div>
                    </BaseFlickity>
                </div>
            </div>
        </div>
    </main>
    <BaseLoading v-else/>
</template>

<script lang="ts" setup>
import BaseLoading from '@/components/ui/BaseLoading.vue';
import BaseNavigation from '@/components/ui/BaseNavigation.vue';
import useFlickityDefaultOptions from '@/composables/useFlickityDefaultOptions';
import BaseFlickity from '@/components/ui/BaseFlickity.vue';
import { computed, nextTick, onMounted, ref, Ref, watch } from 'vue';
import ArtistBriefInterface from '@/interfaces/ArtistBriefInterface';
import { useRoute } from 'vue-router';
import useRequest from '@/composables/useRequest';
import ArtistCard from '@/components/artist/ArtistCard.vue';
import AlbumCard from '@/components/album/AlbumCard.vue';
import TheTracksTable from '@/components/track/TracksTable.vue';
import BaseLikeButton from '@/components/ui/BaseLikeButton.vue';
import { useUserStore } from '@/store/user';
import { useNotificationsStore } from '@/store/notifications';
import useLikeAction from '@/composables/useLikeAction';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';
import ArtistLikeInterface from '@/interfaces/ArtistLikeInterface';
import BaseMenu from '@/components/ui/BaseMenu.vue';
import BaseMenuItem from '@/components/ui/BaseMenuItem.vue';
import usePlayShuffle from '@/composables/usePlayShuffle';
import usePlayStation from '@/composables/usePlayStation';
import BaseImage from '@/components/ui/BaseImage.vue';

const userStore = useUserStore();
const notificationStore = useNotificationsStore();
const request = useRequest();
const route = useRoute();

const artist: Ref<ArtistBriefInterface> = ref({} as ArtistBriefInterface);

const albums = computed(() => [...artist.value.albums] // Сортировка альбомов по дате релиза по убыванию
    .sort((a, b) => {
        if (Date.parse(a.releaseDate) > Date.parse(b.releaseDate)) {
            return -1;
        }
        if (Date.parse(a.releaseDate) < Date.parse(b.releaseDate)) {
            return 1;
        }
        return 0;
    }));

onMounted(async () => { // При первой загрузки компонента сохраняем инфу об артисте
    artist.value = await getArtistBriefInfo(Number(route.params.id));
    artist.value.artist.liked = userStore.likes.artists.findIndex(item => item.id === artist.value.artist.id) !== -1;
});

watch(route, async (value) => {
    if (value.params.id) {
        artist.value = {} as ArtistBriefInterface;
        await nextTick();
        artist.value = await getArtistBriefInfo(Number(route.params.id));
    }
});

async function getArtistBriefInfo(id: number): Promise<ArtistBriefInterface> { // Получение информации об артисте
    const res = await request.get(`/artists/${id}/brief-info`);
    return res.data.result;
}

async function handleLike() { // Добавление артиста в избранное
    artist.value.artist.liked = await useLikeAction(
        LikesObjectTypesEnum.ARTIST,
        `${artist.value.artist.id}`,
        artist.value.artist.liked
    );

    artist.value.artist.liked
        ? userStore.addLikesArtists(artist.value.artist as ArtistLikeInterface)
        : userStore.removeLikesArtists(artist.value.artist as ArtistLikeInterface);
}

function handleShare() { // Копирование ссылки на артиста
    navigator.clipboard.writeText(`https://music.yandex.ru/artist/${artist.value.artist.id}`);
    notificationStore.pushNotification('Ссылка скопирована');
}

</script>

<style scoped>
.artist-head {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.artist-image {
    border-radius: 50%;
    margin-right: 40px;
    width: 150px;
    height: 150px;
}

.artist-body-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 0;
}

#app > div > div > main > div.artist-body > div.artist-body-title:first-child {
    margin-bottom: 0;
}

.artist-body-title a {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: var(--main-color);
    margin-left: auto;
}

.artist-body-block {
    display: flex;
    flex-direction: column;
}

.artist-head-controls {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-top: 5px;
}
</style>
