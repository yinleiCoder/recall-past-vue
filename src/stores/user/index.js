import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  getJwtToken,
  getUser,
  logout,
  saveUser,
  setJwtToken,
} from "../../apis/auth";
import useAxios from "../../composables/useAxios";
import { usePostStore } from "../post";

export const useUserStore = defineStore("user", () => {
  const user = ref(getUser() || {});

  function setUser(userParam) {
    user.value = userParam;
  }

  async function registerUser({ name, password }) {
    const user = await useAxios().post("/api/signup", {
      name,
      password,
    });
  }

  async function login({ name, password }) {
    const user = await useAxios().post("/api/login", {
      name,
      password,
    });
    setJwtToken(user.token);
    useAxios().defaults.headers.common[
      "Authorization"
    ] = `Bearer ${getJwtToken()}`;
    saveUser(user.user);
    setUser(user.user);
  }

  async function updateUserInfo(userInfo) {
    const newUser = await useAxios().put(`/api/rest/users/${user.value._id}`, userInfo);
    saveUser(newUser);
    setUser(newUser);
  }

  async function uploadPost({
    title,
    description,
    imgs,
    owner = user.value._id,
  }) {
    const postStore = usePostStore();
    const post = await useAxios().post("/api/rest/posts", {
      title,
      description,
      imgs,
      owner,
    });
    postStore.loadAllPosts();
    return post;
  }

  async function logoutUser() {
    logout();
    setUser({});
  }

  return { user, registerUser, login, uploadPost, logoutUser, updateUserInfo };
});
