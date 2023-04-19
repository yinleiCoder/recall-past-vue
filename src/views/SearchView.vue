<script setup>
import Avatar from "../components/Avatar.vue";
import PostDetail from "../components/PostDetail.vue";
import PostActions from "../components/PostActions.vue";
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
</script>

<template>
  <div>
    <h2 class="title">搜索结果：尹才兴</h2>
    <PostList>
      <PostItem v-for="n in 10" />
      <!-- <PostDetail /> -->
    </PostList>
  </div>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 24px;
}
</style>
