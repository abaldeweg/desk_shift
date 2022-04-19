<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('schedule') }}</h1>
    </b-container>

    <b-container size="m">
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
              <div class="shifts">
                <schedule-show
                  :item="item"
                  :staff="staffMembers"
                  v-for="(item, index) in schedule[day]"
                  :key="'item-' + index"
                />
              </div>

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

      <schedule-add
        :staffList="staffMembers"
        :shift="create.chosenShift"
        v-if="create.showCreateModal"
        @update="save"
        @close="create.showCreateModal = false"
      />
    </b-container>
  </article>
</template>

<script>
import useShift from '@/composables/useShift'
import useStaff from '@/composables/useStaff'
import useSchedule from '@/composables/useSchedule'
import ScheduleAdd from './../components/schedule/Add.vue'
import ScheduleShow from './../components/schedule/Show.vue'
import { reactive } from '@vue/composition-api'

export default {
  name: 'shift-view',
  head: {
    title: 'Shifts',
  },
  components: {
    ScheduleAdd,
    ScheduleShow,
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
      create.chosenShift = shifts.value[shift]
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

<style scoped>
.shifts {
  display: flex;
  flex-wrap: wrap;
}
</style>
