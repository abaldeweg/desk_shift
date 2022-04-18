import { request } from '@/api'
import { onMounted, ref } from '@vue/composition-api'

export default function useShift() {
  const shifts = ref([])

  const listShifts = () => {
    return request('get', '/api/shift/list').then((response) => {
      shifts.value = response.data ? JSON.parse(response.data) : []
    })
  }

  onMounted(listShifts)

  return { shifts }
}
