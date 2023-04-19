<script setup>
import { mdiHeart, mdiStar, mdiComment } from "@mdi/js";
import TheIcon from "./icons/TheIcon.vue";
</script>
<template>
  <div class="postActions">
    <TheIcon :path="mdiHeart" color="red" />
    <TheIcon :path="mdiComment" />
    <TheIcon :path="mdiStar" />
    <span>1.5w</span>
    <span>3w</span>
    <span>2w</span>
  </div>
</template>
<style scoped>
.postActions {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: .25rem;
  justify-items: center;
}
</style>
