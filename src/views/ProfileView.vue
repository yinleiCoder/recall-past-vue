<script setup>
import { RouterLink } from "vue-router";
import Avatar from "../components/Avatar.vue";
import TheIcon from "../components/icons/TheIcon.vue";
import { mdiViewList, mdiHeartOutline, mdiHistory } from "@mdi/js";
import { useUserStore } from "../stores/user";
import { computed, reactive, ref, watch } from "vue";
import { usePostStore } from "../stores/post";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const postStore = usePostStore();

const tabs = ref([
  {
    label: "我的",
    icon: mdiViewList,
  },
  {
    label: "赞过",
    icon: mdiHeartOutline,
  },
  {
    label: "观看历史",
    icon: mdiHistory,
  },
]);
const currentTab = ref(0);

const myPosts = reactive({
  0: [], //发布的帖子列表
  1: [], //赞过的帖子列表
  2: [], //观看历史
});

watch(
  currentTab,
  async () => {
    switch (currentTab.value) {
      case 0:
        if (myPosts[0].length === 0) {
          myPosts[0] = await postStore.publishedPost();
        }
        break;
      case 1:
        if (myPosts[1].length === 0) {
          myPosts[1] = await postStore.likedPost();
        }
        break;
      case 2:
        if (myPosts[2].length === 0) {
          myPosts[2] = await postStore.likedPost();
        }
        break;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div class="profileContainer">
      <Avatar
        :width="120"
        :height="120"
        :border-width="4"
        class="avatar"
        :src="user.avatar_url"
      />
      <div class="profile">
        <p class="name">
          <span>{{ user.name }}</span>
          <RouterLink to="/profile/edit">编辑个人资料</RouterLink>
        </p>
        <p class="handle">{{ user._id }}</p>
        <div class="description">
          <p>{{ user.headline }}</p>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :class="{ active: index === currentTab }"
        :key="tab.label"
        @click="currentTab = index"
      >
        <TheIcon :path="tab.icon" />
        <p>{{ tab.label }}</p>
      </div>
    </div>
    <div class="tabContent">
      <p>{{ myPosts[currentTab].length }}</p>
      <div class="posts">
        <img
          :src="post.imgs[0]"
          :key="post._id"
          class="postImage"
          v-for="post in myPosts[currentTab]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profileContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
  align-items: center;
}

.avatar {
  justify-self: end;
}

.profile .name {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.profile .name > span {
  font-size: 24px;
  font-weight: bold;
}

.profile .name > a {
  color: black;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 8px;
  padding: 2px 6px;
}

.profile .handle {
  color: gray;
}

.profile .description {
  color: inherit;
}

.tabs {
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(3, auto);
  justify-content: center;
  column-gap: 1vw;
  margin-top: 7vmin;
}

.tab {
  cursor: pointer;
  display: flex;
  padding: 0 8px;
  column-gap: 4px;
  justify-content: center;
  align-items: center;
}

.tab.active > svg {
  color: white;
}

.tab.active {
  background: black;
  border-radius: 8px;
}

.tab.active > p {
  color: white;
  font-weight: bold;
}

.tabContent > p {
  text-align: center;
  font-weight: bold;
}

.posts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.postImage {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px;
}
</style>
