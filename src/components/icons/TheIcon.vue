<!-- This icon is from <https://github.com/Templarian/MaterialDesign>, distributed under Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0) license-->
<script setup>
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

const icon = ref(props.path);
const iconColor = ref(props.color || "#000");
</script>

<template>
  <svg-icon type="mdi" :path="icon" class="svg"></svg-icon>
</template>

<style scoped>
.svg {
  color: v-bind(iconColor);
}
</style>
