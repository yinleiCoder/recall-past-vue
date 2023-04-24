<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
  reverse: Boolean,
});
</script>

<template>
  <button class="button" :class="{ primary: color === 'primary', reverse }">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
    border-radius: 8px;
    padding: 5px 8px;
    border: none;
    color: white;
    font-size: 16px;
}

.button.primary {
    background: black;
}

.button.reverse {
    background: none;
    border: 1px solid black;
    color: initial;
}
</style>
