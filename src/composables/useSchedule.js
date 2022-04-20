import { computed, onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'
import dayjs from 'dayjs'
import { find, findIndex } from 'lodash'
import useStaff from './useStaff'

export default function useSchedule() {
  const { staffMembers } = useStaff()

  let schedule = ref({})

  const daysInMonth = computed(() => {
    return dayjs().daysInMonth()
  })

  const showSchedule = () => {
    return request('get', '/api/schedule/show').then((response) => {
      if (response.data) {
        schedule.value = JSON.parse(response.data)
      }
    })
  }

  onMounted(showSchedule)

  const update = () => {
    return request('put', '/api/schedule/update', {
      body: schedule.value,
    })
  }

  const addService = (day, staff, starttime, endtime) => {
    if (schedule.value[day] === undefined) {
      schedule.value[day] = []
    }

    schedule.value[day].push({
      staff,
      starttime,
      endtime,
    })

    update()
  }

  const removeService = (data) => {
    const index = findIndex(schedule.value[data.day], (item) => {
      return item === data.item
    })
    schedule.value[data.day].splice(index, 1)

    update()
  }

  const getDate = (day) => {
    let year = dayjs().year()
    let month = dayjs().month() + 1

    return dayjs(year + '-' + month + '-' + day).format('dd. DD.MM.')
  }

  const currentlyOnDuty = computed(() => {
    const service = find(schedule.value[dayjs().date()], (item) => {
      const now = dayjs().format('HH:mm')
      if (now >= item.starttime && now <= item.endtime) {
        return true
      }
      return false
    })

    if (service === undefined) return null

    const staff = find(staffMembers.value, {
      key: parseInt(service.staff),
    })

    return staff ? staff : null
  })

  return {
    schedule,
    daysInMonth,
    getDate,
    addService,
    removeService,
    currentlyOnDuty,
  }
}
