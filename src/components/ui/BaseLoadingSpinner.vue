<template>
    <svg
        viewBox="-20 -20 40 40"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            fill="none"
            r="15.9154943092"
            stroke="snow"
            stroke-width="4"
        />
    </svg>
</template>

<script lang="ts" setup>

</script>

<style scoped>

svg {
    width: 24px;
    height: 24px;
}

circle {
    animation: 4s a infinite linear, 3s o infinite linear;
}

@keyframes a {
    from {
        stroke-dasharray: 100 0
    }
    50% {
        stroke-dasharray: 0 100
    }
    to {
        stroke-dasharray: 100 0
    }
}

@keyframes o {
    from {
        stroke-dashoffset: 75
    }
    to {
        stroke-dashoffset: 375
    }
}
</style>
