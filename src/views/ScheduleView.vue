<script setup>
import { useTitle } from '@baldeweg/ui'
import useShift from '@/composables/useShift.js'
import useStaff from '@/composables/useStaff.js'
import useSchedule from '@/composables/useSchedule.js'
import ScheduleAdd from './../components/schedule/ScheduleAdd.vue'
import ScheduleShow from './../components/schedule/ScheduleShow.vue'
import { reactive } from 'vue'

defineProps({
  auth: Object,
})

useTitle({ name: 'Schedule' })

const { shifts } = useShift()
const { staffMembers } = useStaff()
const { daysInMonth, getDate, schedule, addService, removeService } =
  useSchedule()

const create = reactive({
  showCreateModal: false,
  chosenDay: null,
  chosenShift: null,
})

const toggleCreateModal = (day, shift) => {
  create.chosenDay = day
  create.chosenShift = shifts.value[shift]
  create.showCreateModal = !create.showCreateModal
}

const save = (data) => {
  addService(create.chosenDay, data.staff, data.starttime, data.endtime)
  create.showCreateModal = false
}
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('schedule') }}</h1>
  </BContainer>

  <BContainer size="m">
    <table>
      <thead>
        <tr>
          <th>{{ $t('day') }}</th>
          <th>{{ $t('shifts') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="day in daysInMonth" :key="day">
          <td>{{ getDate(day) }}</td>
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
                v-for="(item, index) in schedule[day]"
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
