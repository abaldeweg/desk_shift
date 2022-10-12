import { useRequest } from '@baldeweg/ui'
import { onMounted, ref } from 'vue'

export function useStaff() {
  const { request } = useRequest()

  const staffMembers = ref([])

  const listStaff = () => {
    return request('get', '/api/staff/list').then((response) => {
      staffMembers.value = response.data ? response.data : []
    })
  }

  onMounted(listStaff)

  return { staffMembers }
}
