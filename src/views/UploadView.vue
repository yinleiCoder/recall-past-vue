<script setup>
import Button from "../components/Button.vue";
import { ref, inject } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { getJwtToken } from "../apis/auth";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const fileList = ref([]);
const postTitle = ref("");
const postDescription = ref("");

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const $http = inject("$http");
const $notify = inject("$notify");

const userStore = useUserStore();
const router = useRouter();

const authHeader = {
  Authorization: `Bearer ${getJwtToken()}`,
};

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

const handleUpload = (response, uploadFile, uploadFiles) => {};

function publishPost() {
  const imgs = fileList.value.map((item) => item.response.url);
  userStore.uploadPost({
    title: postTitle.value,
    description: postDescription.value,
    imgs,
  });
  $notify({
    title: 'Success',
    message: '帖子发布成功！',
    type: 'success',
  });
  router.replace("/");
}
</script>

<template>
  <div class="postUpload">
    <h2 class="title">上传作品</h2>
    <div class="upload">
      <el-upload
        v-model:file-list="fileList"
        :action="$http.defaults.baseURL + '/api/upload'"
        :headers="authHeader"
        multiple
        drag
        accept="image/*"
        list-type="picture-card"
        :limit="9"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <div class="postContent">
      <div class="title">
        <label for="title">作品名称：</label>
        <input type="text" name="title" id="title" v-model="postTitle" />
      </div>
      <div class="description">
        <label for="">作品说明：</label>
        <textarea rows="4" v-model="postDescription"></textarea>
      </div>
    </div>
    <Button class="publishBtn" @click="publishPost">发布</Button>
  </div>
</template>

<style scoped>
.postUpload {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
}

.postContent {
  display: grid;
  gap: 10px;
}

.publishBtn {
  align-self: end;
  justify-self: end;
}

.postContent input,
.postContent textarea {
  width: 50%;
}

:deep(li.el-upload-list__item > .el-upload-list__item-status-label) {
  background: black;
}
:deep(li.el-upload-list__item > .el-upload-list__item-thumbnail) {
  object-fit: cover;
}

:deep(.el-overlay .el-overlay-dialog div.el-dialog > div > img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
