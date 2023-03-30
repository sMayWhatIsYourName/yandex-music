<template>
    <div class="navigation-container">
        <button @click="$router.back()">
            <i class="fal fa-chevron-left"/>
        </button>
        <button @click="$router.forward()">
            <i class="fal fa-chevron-right"/>
        </button>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.navigation-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 20px;
}

button {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: var(--background);
    color: white;
}

button:first-child i {
    transform: translateX(-1px);
}

button:last-child i {
    transform: translateX(1px);
}

</style>
