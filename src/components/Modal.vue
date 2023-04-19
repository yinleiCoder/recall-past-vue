<script setup>
import TheIcon from "./icons/TheIcon.vue";
import { mdiClose } from "@mdi/js";
</script>
<template>
  <Teleport to="body">
    <div class="modal">
      <div class="backdrop"></div>
      <div class="modalContent">
        <button class="closeBtn"><TheIcon :path="mdiClose" /></button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: end;
}

.backdrop {
  background: rgba(0, 0, 0, 0.56);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.modalContent {
  position: relative;
  background: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
}

.closeBtn {
  position: absolute;
  background: none;
  border: none;
  right: 10px;
  top: 10px;
}

.closeBtn svg {
  width: 24px;
  height: 24px;
}
</style>
