<script setup>
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import TheIcon from "./icons/TheIcon.vue";
import { mdiMagnify, mdiBulletinBoard, mdiCloudUploadOutline } from "@mdi/js";
import Avatar from "./Avatar.vue";
import { useUserStore } from "../stores/user";
import { usePostStore } from "../stores/post";

const showDropdown = ref(false);
const userStore = useUserStore();
const postStore = usePostStore();
const router = useRouter();
const userAvatar = computed(() => userStore.user.avatar_url);

async function logout() {
  await userStore.logoutUser();
  router.replace("/login");
}

async function searchPosts(e) {
  await postStore.loadAllPosts(12, 1, e.target.value);
  router.push({
    name: "search_result",
    params: {
      term: e.target.value,
    },
  });
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/">
      <span class="logo">RecallPast</span>
    </RouterLink>
    <div class="searchInput">
      <input type="text" @change="searchPosts" />
      <TheIcon :path="mdiMagnify" />
    </div>
    <div class="navItems">
      <RouterLink to="/news">
        <TheIcon :path="mdiBulletinBoard" />
      </RouterLink>
      <RouterLink to="/publish">
        <TheIcon :path="mdiCloudUploadOutline" />
      </RouterLink>
      <div class="profileDropDown">
        <Avatar
          :width="36"
          :height="36"
          :src="userAvatar"
          @click="showDropdown = !showDropdown"
        />
        <div
          class="dropdownMenu"
          v-show="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><RouterLink to="/profile">个人主页</RouterLink></li>
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 95vw;
  height: 5rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}

.navbar > a {
  text-decoration: none;
  color: var(--color-text);
}

.navbar .logo {
  font-weight: bold;
  letter-spacing: 0.1em;
  font-size: 1.25rem;
}

.navbar svg {
  width: 1.5rem;
  height: 1.5rem;
}

.searchInput {
  position: relative;
}

.searchInput input {
  width: 100%;
  padding: 0.625rem;
  padding-left: 2.125rem;
  border-radius: 0.5rem;
  outline: none;
}

.searchInput > svg {
  position: absolute;
  left: 0;
  top: 8px;
  left: 8px;
}

.navItems {
  display: flex;
  justify-self: end;
  gap: 24px;
  align-items: center;
}

.navItems a {
  text-decoration: none;
  color: #000;
}

.navItems > button {
  border: none;
  background: none;
  cursor: pointer;
}

.profileDropDown {
  position: relative;
}

.profileMenu {
  position: absolute;
  width: max-content;
  padding: 24px 26px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}

.profileMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.profileMenu a,
.profileMenu li {
  cursor: pointer;
}

.profileMenu a:visited {
  color: initial;
}
</style>
