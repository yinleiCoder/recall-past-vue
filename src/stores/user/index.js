import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    username: '暂无',
    age: 18,
    sex: '男'
  })
  const username = computed(() => user.value.username)
  function calAge() {
    user.value.age++
  }

  return { user, username, calAge }
})
