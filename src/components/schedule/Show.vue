<template>
  <div v-if="schedule">
    <div v-for="(item, index) in schedule" :key="'item-' + index">
      <p>{{ item.starttime }} - {{ item.endtime }}</p>
      <p>
        <b>{{ item.staff }}</b>
      </p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  name: 'schedule-show',
  props: {
    schedule: Array,
  },
  setup() {
    const state = reactive({})

    return { state }
  },
}
</script>
