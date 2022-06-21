import { computed, onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import { find, findIndex, findLast } from 'lodash'
import { useStaff } from './useStaff.js'

export function useSchedule() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { staffMembers } = useStaff()

  let schedule = ref([])

  const daysInMonth = computed(() => {
    return dayjs().daysInMonth()
  })

  const showSchedule = () => {
    return request('get', '/api/schedule/show').then((response) => {
      if (response.data) {
        schedule.value = response.data
      }
    })
  }

  onMounted(showSchedule)

  const update = () => {
    return request('put', '/api/schedule/update', {
      body: schedule.value,
    })
  }

  const addService = (data) => {
    schedule.value.push(data)

    update()
  }

  const removeService = (data) => {
    const index = findIndex(schedule.value, (item) => {
      return item === data.item
    })
    schedule.value.splice(index, 1)

    update()
  }

  const getDate = (day, month) => {
    return dayjs()
      .month(month - 1)
      .date(day)
      .format('dd. DD.MM.')
  }

  const currentlyOnDuty = computed(() => {
    const service = findLast(schedule.value, (item) => {
      const now = dayjs().unix()
      if (now >= item.start) return true
      return false
    })

    if (service === undefined) return null

    const staff = find(staffMembers.value, {
      id: service.staff,
    })

    return staff ? staff : null
  })

  const forwardings = ref({})

  const getForwardings = () => {
    return request('get', '/api/call/list').then((response) => {
      if (response.data) {
        forwardings.value = response.data
      }
    })
  }

  onMounted(getForwardings)

  return {
    schedule,
    daysInMonth,
    getDate,
    addService,
    removeService,
    currentlyOnDuty,
    forwardings,
    getForwardings,
  }
}
