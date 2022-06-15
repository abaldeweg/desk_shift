<script setup>
import { useTitle } from '@baldeweg/ui'
import { useShift } from '@/composables/useShift.js'
import { useStaff } from '@/composables/useStaff.js'
import { useSchedule } from '@/composables/useSchedule.js'
import ScheduleAdd from './../components/schedule/ScheduleAdd.vue'
import ScheduleShow from './../components/schedule/ScheduleShow.vue'
import { reactive } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { filter, sortBy } from 'lodash'

const props = defineProps({
  auth: Object,
  year: {
    type: Number,
    default: dayjs().format('YYYY'),
  },
  month: {
    type: Number,
    default: dayjs().format('M'),
  },
})

useTitle({ title: 'Schedule' })

const { shifts } = useShift()
const { staffMembers } = useStaff()
const { daysInMonth, getDate, schedule, addService, removeService } =
  useSchedule()

const create = reactive({
  showCreateModal: false,
  chosenDay: null,
  chosenDate: null,
  chosenShift: null,
})

const toggleCreateModal = (day, shift) => {
  create.chosenDay = day
  create.chosenDate = dayjs()
    .year(props.year)
    .month(props.month - 1)
    .date(day)
    .format('YYYY-MM-DD')
  create.chosenShift = shifts.value[shift]
  create.showCreateModal = !create.showCreateModal
}

const save = (data) => {
  addService(data)
  create.showCreateModal = false
}

const router = useRouter()

const increaseMonth = () => {
  if (parseInt(props.month) === 12) {
    router.push({
      name: 'schedule',
      params: { year: parseInt(props.year) + 1, month: 1 },
    })
    return
  }

  router.push({
    name: 'schedule',
    params: { year: props.year, month: parseInt(props.month) + 1 },
  })
}

const decreaseMonth = () => {
  if (parseInt(props.month) === 1) {
    router.push({
      name: 'schedule',
      params: { year: parseInt(props.year) - 1, month: 12 },
    })
    return
  }

  router.push({
    name: 'schedule',
    params: { year: props.year, month: parseInt(props.month) - 1 },
  })
}

const getDay = (day) => {
  let start = dayjs()
    .year(props.year)
    .month(props.month - 1)
    .date(day)
    .hour(0)
    .minute(0)

  let end = dayjs()
    .year(props.year)
    .month(props.month - 1)
    .date(day)
    .hour(23)
    .minute(59)
    .second(59)

  let filtered = filter(schedule.value, (el) => {
    return (
      (el.start >= start.unix() && el.start <= end.unix()) ||
      (el.end >= start.unix() && el.end <= end.unix())
    )
  })

  let sorted = sortBy(filtered, ['start', 'end'])

  return sorted
}
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('schedule') }}</h1>
  </BContainer>

  <BContainer size="m">
    <b-button design="text" @click="decreaseMonth">
      <BIcon type="minus" :size="15" />
    </b-button>
    {{ month }}/ {{ year }}
    <b-button design="text" @click="increaseMonth">
      <BIcon type="plus" :size="15" />
    </b-button>
  </BContainer>

  <BContainer size="m">
    <table :aria-label="$t('shifts')">
      <thead>
        <tr>
          <th>{{ $t('day') }}</th>
          <th>{{ $t('shifts') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="day in daysInMonth" :key="day">
          <td>{{ getDate(day, month) }}</td>
          <td>
            <div class="actions">
              <BButton
                design="text"
                type="button"
                v-for="(shift, index) in shifts"
                :key="index"
                @click="toggleCreateModal(day, index)"
              >
                {{ $t('add_to') }} {{ shifts[index].name }}
              </BButton>
            </div>

            <div class="shifts">
              <ScheduleShow
                :item="item"
                :staff="staffMembers"
                :day="day"
                v-for="(item, index) in getDay(day)"
                :key="'item-' + index"
                @remove="removeService"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <ScheduleAdd
      :staffList="staffMembers"
      :shift="create.chosenShift"
      :date="create.chosenDate"
      :year="year"
      :month="month"
      v-if="create.showCreateModal"
      @update="save"
      @close="create.showCreateModal = false"
    />
  </BContainer>
</template>

<style scoped>
.shifts {
  display: flex;
  flex-wrap: wrap;
}
.actions {
  text-align: right;
}
</style>
