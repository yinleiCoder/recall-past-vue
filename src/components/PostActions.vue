<script setup>
import { mdiHeart, mdiHeartOutline, mdiCommentOutline } from "@mdi/js";
import TheIcon from "./icons/TheIcon.vue";
import { toRefs, watch, watchEffect } from "vue";

const PostProps = defineProps({
  likes: Number,
  comments: Number,
  likedByMe: Boolean,
});

const emit = defineEmits(["likeClick", "commentClick"]);
// toRefs(PostProps);

watch(
  () => PostProps.likedByMe,
  (newVal) => {
    // console.log(PostProps.likedByMe)
    // console.log(newVal)
  }
);
</script>
<template>
  <div class="postActions">
    <TheIcon
      :path="likedByMe ? mdiHeart : mdiHeartOutline"
      :color="likedByMe ? 'red' : 'black'"
      @click="emit('likeClick')"
    />
    <TheIcon :path="mdiCommentOutline" @click="emit('commentClick')" />
    <span>{{ likes || "" }}</span>
    <span>{{ comments || "" }}</span>
  </div>
</template>
<style scoped>
.postActions {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  justify-items: center;
  cursor: pointer;
}
</style>
