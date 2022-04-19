import { computed, onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'
import dayjs from 'dayjs'

export default function useSchedule() {
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
    console.log(schedule)
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

  const getDate = (day) => {
    let year = dayjs().year()
    let month = dayjs().month() + 1

    return dayjs(year + '-' + month + '-' + day).format('dd. DD.MM.')
  }

  return { schedule, daysInMonth, getDate, addService }
}
