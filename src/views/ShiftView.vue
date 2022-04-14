<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('shifts') }}</h1>
    </b-container>

    <b-container size="m">
      <shift-edit />
    </b-container>
  </article>
</template>

<script>
import ShiftEdit from '../components/shift/Edit.vue'

export default {
  name: 'shift-view',
  head: {
    title: 'Shifts',
  },
  components: {
    ShiftEdit,
  },
}
</script>
