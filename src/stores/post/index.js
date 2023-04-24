import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useAxios from "../../composables/useAxios";
import { useUserStore } from "../user";

export const usePostStore = defineStore("post", () => {
  const list = ref([]);
  const likedList = ref([]);
  const publishList = ref([]);
  const searchResultList = ref([]);

  async function loadAllPosts(per_page = 12, page = 1, q = "") {
    const posts = await useAxios().get(
      `/api/rest/posts?per_page=${per_page}&page=${page}&q=` + (q && `${q}`)
    );
    if (q) {
      // 搜索帖子列表
      searchResultList.value = posts;
    } else {
      list.value = posts;
    }
  }

  function toggleLike(postId, isLike) {
    const post = list.value.find((post) => post._id === postId);
    if (isLike) {
      likePost(postId);
      post.voteCount = (post.voteCount || 0) + 1;
    } else {
      unlikePost(postId);
      post.voteCount--;
    }
  }

  async function likePost(postId) {
    await useAxios().put(`/api/likingPosts/${postId}`);
  }

  async function unlikePost(postId) {
    await useAxios().delete(`/api/unlikingPosts/${postId}`);
  }

  // 当前用户喜欢的帖子列表
  async function likedPost() {
    const userStore = useUserStore();
    const likedPosts = await useAxios().get(
      `/api/${userStore.user._id}/likingPosts`
    );
    likedList.value = likedPosts;
    return likedPosts;
  }
  const likedPostsIds = computed(() => likedList.value.map((item) => item._id));

  // 当前用户发布过的帖子列表
  async function publishedPost() {
    const userStore = useUserStore();
    const publishItems = await useAxios().get(
      `/api/${userStore.user._id}/publishedPosts`
    );
    publishList.value = publishItems;
    return publishItems;
  }

  return {
    list,
    publishList,
    likedList,
    searchResultList,
    loadAllPosts,
    toggleLike,
    likedPost,
    publishedPost,
    likedPostsIds,
  };
});
