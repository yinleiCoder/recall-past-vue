<script setup>
import Avatar from "../components/Avatar.vue";
import { ref, inject, computed, reactive } from "vue";
import { genFileId } from "element-plus";
import { getJwtToken } from "../apis/auth";
import { useUserStore } from "../stores/user";
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const curEditUser = computed(() => userStore.user);
const profileData = reactive({
  avatar_url: curEditUser.value.avatar_url,
  name: curEditUser.value.name,
  headline: curEditUser.value.headline,
  gender: curEditUser.value.gender,
});

const $http = inject("$http");
const authHeader = {
  Authorization: `Bearer ${getJwtToken()}`,
};

const upload = ref();
const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};

const handleUploadAvatar = (response, uploadFile, uploadFiles) => {
  profileData.avatar_url = response.url;
};

async function updateUserInfo() {
  await userStore.updateUserInfo(profileData);
  router.push("/profile");
}
</script>

<template>
  <div>
    <h2 class="title">编辑个人资料</h2>
    <div class="changeAvatar">
      <Avatar :width="50" :height="50" :src="profileData.avatar_url" />
      <el-upload
        :ref="upload"
        class="uploadBtn"
        :action="$http.defaults.baseURL + '/api/upload'"
        :headers="authHeader"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="true"
        :on-success="handleUploadAvatar"
      >
        <template #trigger>
          <el-button class="avatarBtn">修改头像</el-button>
        </template>
      </el-upload>
    </div>
    <form action="" class="profileForm" @submit.prevent="updateUserInfo">
      <label for="username">用户名：</label>
      <input type="text" name="" id="" v-model="profileData.name" />
      <label for="intro">个性签名：</label>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="profileData.headline"
      ></textarea>
      <label for="gender">性别：</label>
      <div class="genderRadios">
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          v-model="profileData.gender"
        />男
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          v-model="profileData.gender"
        />女
      </div>
      <div class="actions">
        <Button type="reset" reverse @click.prevent="router.push('/profile')">取消</Button>
        <Button type="submit">确认</Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.changeAvatar {
  display: flex;
  align-items: center;
  position: relative;
  column-gap: 10px;
}

.avatarBtn {
  background: black;
  color: white;
  border-radius: 8px;
}

.uploadBtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
}

.profileForm {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 1.5rem;
  margin-top: 1.5rem;
}

.profileForm > label {
  grid-column: 1/2;
  justify-self: end;
  position: relative;
  font-weight: bold;
}

.profileForm .actions {
  grid-column: 1/3;
  justify-self: end;
  display: flex;
  column-gap: 10px;
}
</style>
