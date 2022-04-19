<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('welcome') }}</h1>
    </b-container>

    <b-container size="m">
      <router-link :to="{ name: 'schedule' }"
        >{{ $t('schedule') }} ({{ month }})</router-link
      >
    </b-container>
  </article>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'home-view',
  head: {
    title: 'Home',
  },
  setup() {
    const month = dayjs().format('MMMM')

    return { month }
  },
}
</script>
