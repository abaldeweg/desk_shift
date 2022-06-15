import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import { onMounted, ref } from 'vue'

export function useShift() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const shifts = ref([])

  const listShifts = () => {
    return request('get', '/api/shift/list').then((response) => {
      shifts.value = response.data ? response.data : []
    })
  }

  onMounted(listShifts)

  return { shifts }
}
