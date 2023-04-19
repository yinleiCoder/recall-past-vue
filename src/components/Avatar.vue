<script setup>
import defaultAvatar from "@/assets/default_avatar.png";
defineProps({
  src: String,
  width: {
    type: Number,
    default: 32,
  },
  height: {
    type: Number,
    default: 32,
  },
});
</script>

<template>
  <img :src="src || defaultAvatar" class="avatar" />
</template>

<style scoped>
.avatar {
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border-radius: 50%;
  background: #eee;
  object-fit: cover;
  object-position: top center;
}
</style>
