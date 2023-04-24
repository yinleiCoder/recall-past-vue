<script setup>
</script>

<template>
  <div class="postList">
    <slot></slot>
  </div>
</template>

<style scoped>
.postList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
</style>
