<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('schedule') }}</h1>
    </b-container>

    <b-container size="m">
      <shift-edit />
    </b-container>
  </article>
</template>

<script>
import ShiftEdit from '../components/schedule/Edit.vue'

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
