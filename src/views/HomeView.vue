<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('welcome') }}</h1>
    </b-container>

    <b-container size="m">
      <router-link :to="{ name: 'schedule' }">{{ $t('schedule') }}</router-link>
    </b-container>
  </article>
</template>

<script>
export default {
  name: 'home-view',
  head: {
    title: 'Home',
  },
}
</script>
