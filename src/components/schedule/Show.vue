<template>
  <div class="shift_item" v-if="item">
    <p>{{ item.starttime }} - {{ item.endtime }}</p>
    <p>
      <b>{{ name }}</b>
    </p>
  </div>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
import find from 'lodash/find'

export default {
  name: 'schedule-show',
  props: {
    item: Object,
    staff: Array,
  },
  setup(props) {
    const { item, staff } = toRefs(props)

    const name = computed(() => {
      const result = find(staff.value, { key: parseInt(item.value.staff) })

      return result ? result.value : null
    })

    return { name }
  },
}
</script>

<style scoped>
.shift_item {
  border: 1px solid var(--color-neutral-02);
  border-radius: 10px;
  width: 200px;
  padding: 10px;
  margin: 10px;
}
.shift_item p {
  padding: 0;
}
</style>
