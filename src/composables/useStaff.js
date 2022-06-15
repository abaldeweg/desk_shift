import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import { onMounted, ref } from 'vue'

export function useStaff() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const staffMembers = ref([])

  const listStaff = () => {
    return request('get', '/api/staff/list').then((response) => {
      staffMembers.value = response.data ? response.data : []
    })
  }

  onMounted(listStaff)

  return { staffMembers }
}
