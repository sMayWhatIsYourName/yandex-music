<template>
    <div class="menu-item-container">
        <slot/>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.menu-item-container {
    height: 30px;
    font-size: 14px;
    padding: 0 10px;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
}

.menu-item-container:hover {
    background: #2C354DFF;
}
</style>
