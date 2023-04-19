<script setup>
import Avatar from "../components/Avatar.vue";
import PostActions from "../components/PostActions.vue";
</script>

<template>
  <div class="postItem">
    <img src="" alt="" />
    <div class="postInfo">
      <div class="postMeta">
        <Avatar class="avatar" />
        <span class="username">尹磊</span>
        <span class="postPubDate">12小时之前发布</span>
        <PostActions />
      </div>
      <div class="postDesc">这是我们的全家福</div>
    </div>
  </div>
</template>

<style scoped>

.postItem {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.postInfo {
  padding: 1.5rem;
}

.postItem > img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: red;
  cursor: pointer;
}

.postMeta {
  display: grid;
  grid-template-areas:
    "avatar name actions"
    "pubDate pubDate actions";
  grid-template-columns: 42px 1fr 3fr;
  row-gap: 0.375rem;
  align-items: center;
}

.postMeta .avatar {
  grid-area: avatar;
}

.postMeta .username {
  grid-area: name;
  font-weight: bold;
  letter-spacing: 0.2em;
}

.postMeta .postPubDate {
  grid-area: pubDate;
  color: #9f9f9f;
  font-size: 14px;
}

.postMeta .postActions {
  grid-area: actions;
  justify-self: end;
}

.postDesc {
  margin-top: 1rem;
  white-space: pre-line;
}
</style>
