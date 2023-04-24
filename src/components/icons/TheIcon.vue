<!-- This icon is from <https://github.com/Templarian/MaterialDesign>, distributed under Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0) license-->
<script setup>
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
</script>

<template>
  <svg-icon type="mdi" :path="path" class="svg"></svg-icon>
</template>

<style scoped>
.svg {
  color: v-bind(color);
}
</style>
