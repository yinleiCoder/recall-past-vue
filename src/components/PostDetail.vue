<script setup>
import Avatar from "./Avatar.vue";
import Modal from "./Modal.vue";
import PostActions from "./PostActions.vue";
</script>
<template>
  <Modal>
    <div class="postDetails">
      <img src="" alt="" class="postImage" />
      <div class="postMeta">
        <div class="author">
          <Avatar />
          <span>尹磊</span>
        </div>
        <pre class="postDesc">这是我家的全家福</pre>
        <div class="comments">
          <div class="comment" v-for="n in 10">
            <Avatar class="commentAvatar" />
            <span class="commentUser">尹伟</span>
            <span class="commentDate">1d</span>
            <p class="commentContent">非常好！</p>
          </div>
        </div>
        <div class="actions">
          <PostActions class="postAction" />
          <span class="postPubDate">12h</span>
          <input
            type="text"
            name="comment"
            id=""
            class="commentInput"
            placeholder="写一条评论吧"
          />
          <button class="commentPubBtn">发布</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.postDetails {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 300px);
  grid-template-rows: minmax(0, 1fr);
  width: 100vw;
  height: 90vh;
}

.postImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.postMeta {
  padding: 0.75rem;
  padding-top: 1.25rem;
  display: grid;
  grid-template-rows: max-content max-content 1fr max-content;
  align-items: start;
  max-height: 100%;
  height: 100%;
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author > span {
  font-weight: bold;
  letter-spacing: 0.1em;
}

.postDesc {
  width: 100%;
  white-space: pre-wrap;
  margin-top: 0.625rem;
}

.comments {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 0.625rem;
  align-items: start;
  overflow-y: auto;
  height: 100%;
}

.comment {
  display: grid;
  grid-template-areas:
    "avatar name date"
    "comment comment comment";
  grid-template-columns: 34px 1fr 0.3fr;
  align-items: center;
  column-gap: 0.5rem;
  row-gap: 0.375rem;
}

.commentAvatar {
  grid-area: avatar;
}

.commentUser {
  grid-area: name;
}

.commentDate {
  grid-area: date;
  justify-self: center;
}

.commentContent {
  grid-area: comment;
}

.actions {
  border-top: 1px solid #eaeaea;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 0.5fr 1fr;
  grid-template-areas:
    "actions actions date"
    "comment  comment publish";
  padding: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.postAction {
  grid-area: actions;
}

.postPubDate {
  grid-area: date;
  justify-self: end;
  font-size: 14px;
}

.commentInput {
  grid-area: comment;
  border-radius: 4px;
  padding: .25rem .5rem;
  outline: none;
}

.commentPubBtn {
  grid-area: publish;
  font-weight: bold;
  border: none;
  background: none;
}
</style>
