<script setup>
import { ref, inject } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
const isLogin = ref(true);

const username = ref("");
const password = ref("");
const agreementChecked = ref(false);

const userStore = useUserStore();
const router = useRouter();
const $notify = inject("$notify");

async function register() {
  if (!agreementChecked.value) {
    $notify({
      title: "Warning",
      message: "请先阅读用户隐私协议并勾选同意加入我们这个大家庭！",
      type: "warning",
    });
    return;
  }
  await userStore.registerUser({
    name: username.value,
    password: password.value,
  });
  router.replace("/");
}

async function login() {
  await userStore.login({
    name: username.value,
    password: password.value,
  });
  router.replace("/");
}
</script>

<template>
  <div class="loginPage">
    <img src="@/assets/loginImg.png" alt="" class="loginImage" />
    <div class="loginForm">
      <form @submit.prevent>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="用户名"
          v-model="username"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="密码"
          v-model="password"
        />
        <button
          type="submit"
          class="loginButton"
          @click="isLogin ? login() : register()"
        >
          {{ isLogin ? "登录" : "注册" }}
        </button>
        <p class="info" @click="isLogin = !isLogin">
          {{
            isLogin ? "还没有账号？快加入我们吧" : "已有账号？快认证你的身份"
          }}
        </p>
        <div v-if="!isLogin" class="agreement">
          <input
            type="checkbox"
            v-model="agreementChecked"
          />勾选表示同意隐私规范同时加入我们这个大家庭
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.loginPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100vh;
  align-items: center;
  gap: 1vw;
  width: 100vw;
  height: 100vh;
}

.loginImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.8);
}

.loginForm {
  box-sizing: border-box;
  padding: 10%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loginForm > form {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 20px;
}

input {
  background: #fafafa;
  border-radius: 8px;
  outline: none;
  padding: 8px 10px;
}

.loginButton {
  background: black;
  padding: 6px 0;
  color: white;
  border-radius: 8px;
}

.info {
  text-align: center;
  cursor: pointer;
}

.agreement {
  display: flex;
  align-items: center;
}
</style>
