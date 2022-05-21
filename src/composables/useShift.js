import { request } from '@/api'
import { onMounted, ref } from 'vue'

export default function useShift() {
  const shifts = ref([])

  const listShifts = () => {
    return request('get', '/api/shift/list').then((response) => {
      shifts.value = response.data ? response.data : []
    })
  }

  onMounted(listShifts)

  return { shifts }
}
