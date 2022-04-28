import { request } from '@/api'
import { onMounted, ref } from '@vue/composition-api'

export default function useStaff() {
  const staffMembers = ref([])

  const listStaff = () => {
    return request('get', '/api/staff/list').then((response) => {
      staffMembers.value = response.data ? response.data : []
    })
  }

  onMounted(listStaff)

  return { staffMembers }
}
