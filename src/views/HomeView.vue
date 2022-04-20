<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('welcome') }}</h1>
    </b-container>

    <b-container size="m" v-if="currentlyOnDuty">
      <h2>{{ $t('now_on_call') }}</h2>
      <div class="staff">{{ currentlyOnDuty.value }}</div>
      <div class="phone">{{ $t('phone') }}: {{ currentlyOnDuty.phone }}</div>
    </b-container>

    <b-container size="m" v-else>
      <b-alert type="warning">
        <p>{{ $t('nobody_on_call') }}</p>
      </b-alert>
    </b-container>

    <b-container size="m">
      <h2>{{ $t('manage') }}</h2>
      <router-link :to="{ name: 'schedule' }"
        >{{ $t('schedule') }} ({{ month }})</router-link
      >
    </b-container>
  </article>
</template>

<script>
import dayjs from 'dayjs'
import useSchedule from './../composables/useSchedule'

export default {
  name: 'home-view',
  head: {
    title: 'Home',
  },
  setup() {
    const month = dayjs().format('MMMM')

    const { currentlyOnDuty } = useSchedule()

    return { month, currentlyOnDuty }
  },
}
</script>

<style scoped>
.staff {
  font-size: 1.3rem;
}
.phone {
  font-weight: bold;
  font-family: var(--font-serif);
}
</style>
