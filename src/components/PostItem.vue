<script setup>
import { ref } from "vue";
import Avatar from "../components/Avatar.vue";
import PostActions from "../components/PostActions.vue";
import { dateToRelative } from "../utils/date";
import { usePostStore } from "../stores/post";

const postProp = defineProps({
  post: {
    type: Object,
    default: {},
  },
});

const timeRelative = ref(dateToRelative(postProp.post?.createdAt));

const postStore = usePostStore();
const likeBool = ref(postStore.likedPostsIds.includes(postProp.post._id))
</script>

<template>
  <div class="postItem">
    <img :src="post.imgs[0]" alt="" />
    <div class="postInfo">
      <div class="postMeta">
        <Avatar class="avatar" :src="post?.owner?.avatar_url" />
        <span class="username">{{ post?.owner?.name }}</span>
        <span class="postPubDate">{{ timeRelative }}</span>
        <PostActions
          :likes="post.voteCount"
          :comments="post.comments"
          :likedByMe="likeBool"
          @likeClick="likeBool=!likeBool;postStore.toggleLike(post._id, likeBool)"
        />
      </div>
      <div class="postDesc">{{ post.description }}</div>
    </div>
  </div>
</template>

<style scoped>
.postItem {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.postInfo {
  padding: 1rem;
}

.postItem > img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
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
  cursor: pointer;
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
