import { computed, onMounted, reactive, set } from '@vue/composition-api'
import { request } from '@/api'
import dayjs from 'dayjs'

export default function useSchedule() {
  let schedule = reactive({})

  const daysInMonth = computed(() => {
    return dayjs().daysInMonth()
  })

  const showSchedule = () => {
    return request('get', '/api/schedule/show').then((response) => {
      if (response.data) {
        set(schedule, JSON.parse(response.data))
      }
    })
  }

  onMounted(showSchedule)

  const update = () => {
    return request('put', '/api/shift/update', {
      body: schedule,
    }).then(() => {
      showSchedule()
    })
  }

  const addService = (day, staff, starttime, endtime) => {
    if (schedule[day] === undefined) {
      set(schedule, day, [])
    }

    schedule[day].push({
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
