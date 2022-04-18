<template>
  <section>
    <!-- debug -->
    <pre><code>{{ schedule }}</code></pre>
    <!-- /debug -->

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
            <b-button
              design="text"
              type="button"
              v-for="(shift, index) in shifts"
              :key="index"
              @click="toggleCreateModal(day, index)"
            >
              {{ $t('add_to') }} {{ shifts[index].name }}
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <shift-add
      :staffList="staffMembers"
      :shift="shifts"
      v-if="create.showCreateModal"
      @update="save"
      @close="create.showCreateModal = false"
    />
  </section>
</template>

<script>
import useShift from '@/composables/useShift'
import useStaff from '@/composables/useStaff'
import useSchedule from '@/composables/useSchedule'
import ShiftAdd from './../schedule/Add.vue'
import { reactive } from '@vue/composition-api'

export default {
  name: 'schedule-edit',
  components: {
    ShiftAdd,
  },
  setup() {
    const { shifts } = useShift()
    const { staffMembers } = useStaff()
    const { daysInMonth, getDate, schedule, addService } = useSchedule()

    const create = reactive({
      showCreateModal: false,
      chosenDay: null,
      chosenShift: null,
    })

    const toggleCreateModal = (day, shift) => {
      create.chosenDay = day
      create.chosenShift = shifts[shift]
      create.showCreateModal = !create.showCreateModal
    }

    const save = (data) => {
      addService(create.chosenDay, data.staff, data.starttime, data.endtime)
      create.showCreateModal = false
    }

    return {
      daysInMonth,
      create,
      getDate,
      schedule,
      shifts,
      staffMembers,
      toggleCreateModal,
      save,
    }
  },
}
</script>
