<template>
    <main
        v-if="response"
        class="main"
    >
        <BaseNavigation/>
        <div
            v-if="response.best?.result && Object.keys(response.best?.result).length"
            class="result-block"
        >
            <div class="result-best">
                <h2 class="result-best-title">
                    Лучший результат
                </h2>

                <SearchResultArtist
                    v-if="response.best?.type === 'artist'"
                    :artist="response.best?.result"
                />

                <SearchResultTrack
                    v-else-if="response.best?.type === 'track'"
                    :track="response.best?.result"
                />

                <SearchResultPlaylist
                    v-else-if="response.best?.type === 'playlist'"
                    :playlist="response.best?.result"
                />
            </div>
            <div
                v-if="tracks?.length"
                class="result-tracks"
            >
                <h2 class="result-tracks-title">
                    Треки
                </h2>
                <SearchTracksTable
                    :tracks="tracks"
                />
            </div>
        </div>
        <div
            v-if="response.artists?.results?.length"
            class="result-container"
        >
            <h2 class="result-container-title">
                Исполнители
            </h2>
            <BaseFlickity
                ref="flickity"
                :options="useFlickityDefaultOptions"
            >
                <div
                    v-for="artist in response.artists?.results"
                    :key="artist.id"
                    class="carousel-cell"
                >
                    <SearchArtistCard :artist="artist"/>
                </div>
            </BaseFlickity>
        </div>
        <div
            v-if="response.albums?.results?.length"
            class="result-container"
        >
            <h2 class="result-container-title">
                Альбомы
            </h2>
            <BaseFlickity
                ref="flickity"
                :options="useFlickityDefaultOptions"
            >
                <div
                    v-for="album in response.albums.results"
                    :key="album.id"
                    class="carousel-cell"
                >
                    <AlbumCard
                        :album="album"
                        :album-id="album.id"
                    />
                </div>
            </BaseFlickity>
        </div>
        <div
            v-if="response.playlists?.results?.length"
            class="result-container"
        >
            <h2 class="result-container-title">
                Плейлисты
            </h2>
            <BaseFlickity
                ref="flickity"
                :options="useFlickityDefaultOptions"
            >
                <div
                    v-for="playlist in response.playlists?.results"
                    :key="playlist.uid"
                    class="carousel-cell"
                >
                    <SearchPlaylistCard
                        :playlist="playlist"
                    />
                </div>
            </BaseFlickity>
        </div>
    </main>
    <BaseLoading v-else/>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSearchStore } from '@/store/search';
import BaseNavigation from '@/components/ui/BaseNavigation.vue';
import SearchResultArtist from '@/components/search/SearchResultArtist.vue';
import SearchResultTrack from '@/components/search/SearchResultTrack.vue';
import SearchResultPlaylist from '@/components/search/SearchResultPlaylist.vue';
import BaseFlickity from '@/components/ui/BaseFlickity.vue';
import AlbumCard from '@/components/album/AlbumCard.vue';
import useFlickityDefaultOptions from '@/composables/useFlickityDefaultOptions';
import SearchTracksTable from '@/components/search/SearchTracksTable.vue';
import SearchPlaylistCard from '@/components/search/SearchPlaylistCard.vue';
import SearchArtistCard from '@/components/search/SearchArtistCard.vue';
import BaseLoading from '@/components/ui/BaseLoading.vue';

const searchStore = useSearchStore();

const response = computed(() => searchStore.response);
const tracks = computed(() => searchStore.response?.tracks?.results.slice(0, 5));
</script>

<style scoped>
.result-best-body img {
    border-radius: 8px;
}

.result-block {
    display: flex;
    flex-direction: row;
    gap: 50px;
}

.result-tracks {
    grid-area: tracks;
    flex: 1;
    width: 50%;
}

.result-best {
    width: 100%;
    max-width: 380px;
}

.result-best-title, .result-tracks-title {
    margin-bottom: 15px;
}

.result-container-title {
    margin: 20px 0;
}
</style>
