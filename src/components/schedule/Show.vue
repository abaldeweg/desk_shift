<template>
  <div class="shift_item" v-if="item">
    <span class="remove" @click="$emit('remove', { day, item })"
      ><b-icon type="close" :size="10"
    /></span>
    <p class="shift_item-time">{{ item.starttime }} - {{ item.endtime }}</p>
    <p class="shift_item-staff">{{ name }}</p>
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
    day: Number,
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
  padding: 20px;
  margin: 10px;
}
.shift_item-time {
  padding: 0;
  color: var(--color-neutral-06);
  font-size: 0.8em;
}
.shift_item-staff {
  padding: 0;
  font-weight: bold;
}
.remove {
  float: right;
  line-height: 0;
}
</style>
