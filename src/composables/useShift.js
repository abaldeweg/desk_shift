import { useRequest } from '@baldeweg/ui'
import { onMounted, ref } from 'vue'

export function useShift() {
  const { request } = useRequest()

  const shifts = ref([])

  const listShifts = () => {
    return request('get', '/api/shift/list').then((response) => {
      shifts.value = response.data ? response.data : []
    })
  }

  onMounted(listShifts)

  return { shifts }
}
