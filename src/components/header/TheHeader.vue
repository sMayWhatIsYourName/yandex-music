<template>
    <header class="header">
        <div class="header-logo">
            <img
                alt="logo"
                src="@/assets/img/logo.svg"
            >
            <p>Яндекс.Музыка</p>
        </div>

        <TheHeaderSearch/>

        <div class="controls">
            <button @click="minimize">
                <img
                    alt="min"
                    src="@/assets/img/minimize.svg"
                >
            </button>
            <button @click="maximize">
                <img
                    alt="min"
                    src="@/assets/img/maxsimize.svg"
                >
            </button>
            <button @click="close">
                <img
                    alt="min"
                    src="@/assets/img/close.svg"
                >
            </button>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { ipcRenderer } from 'electron';
import TheHeaderSearch from '@/components/header/TheHeaderSearch.vue';

function minimize() {
    ipcRenderer.send('minimize');
}

function maximize() {
    ipcRenderer.send('maximize');
}

function close() {
    ipcRenderer.send('close');
}
</script>

<style scoped>
.header, .controls, .header-logo {
    display: flex;
    flex-direction: row;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 65px;
    color: white;
    position: relative;
    z-index: 20;
    -webkit-app-region: drag;
    background: var(--background);
}

.header-logo img {
    width: 15px;
    height: 15px;
    margin: auto 10px auto 0;
}

.header-logo {
    font-size: 12px;
    font-weight: 400;
    margin-left: 20px;
}

.controls {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
}

.controls button {
    width: 45px;
    height: 100%;
    background: none;
    outline: none;
    border: none;
}

.controls button img {
    width: 10px;
    height: 10px;
}

</style>
