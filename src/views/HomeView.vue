<script setup>
import Avatar from "../components/Avatar.vue";
import PostDetail from "../components/PostDetail.vue";
import PostActions from "../components/PostActions.vue";
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
</script>

<template>
  <div>
    <PostList>
      <PostItem v-for="n in 10" />
      <!-- <PostDetail /> -->
    </PostList>
  </div>
</template>

<style scoped></style>
