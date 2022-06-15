<script setup>
import { useTitle } from '@baldeweg/ui'
import { request } from './../api'
import { useSchedule } from './../composables/useSchedule.js'

defineProps({
  auth: Object,
})

useTitle({ title: 'Dashboard' })

const { currentlyOnDuty, forwardings, getForwardings } = useSchedule()

const saveForwarding = () => {
  request('put', 'api/call/update', {
    destination: currentlyOnDuty.value.phone,
    timeout: 0,
    active: true,
  }).then(() => {
    getForwardings()
  })
}

const resetForwarding = () => {
  request('put', 'api/call/update', []).then(() => {
    getForwardings()
  })
}
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('welcome') }}</h1>
  </BContainer>

  <BContainer size="m" v-if="currentlyOnDuty">
    <h2>{{ $t('now_on_call') }}</h2>
    <div class="staff">{{ currentlyOnDuty.value }}</div>
    <div class="phone">{{ $t('phone') }}: {{ currentlyOnDuty.phone }}</div>
  </BContainer>

  <BContainer size="m" v-else>
    <BAlert type="warning">
      <p>{{ $t('nobody_on_call') }}</p>
    </BAlert>
  </BContainer>

  <b-container size="m">
    <h2>{{ $t('debug') }}</h2>
    <BButton
      design="outline_danger"
      @click="resetForwarding"
      :style="{ marginRight: '20px' }"
      >{{ $t('remove_forwarding') }}</BButton
    >
    <BButton design="primary" @click="saveForwarding">{{
      $t('reset_forwarding')
    }}</BButton>
    <p>
      {{ $t('here_you_can_see_which_number_is_actually_set_at_the_provider') }}
    </p>
    <b-code>{{ forwardings }}</b-code>
  </b-container>

  <b-container size="m">
    <b-alert type="success">
      <p>
        This is a very early preview. Please bear in mind there are many
        features missing and bugs can occur.
      </p>
    </b-alert>
  </b-container>
</template>

<style scoped>
.staff {
  font-size: 1.3rem;
}
.phone {
  font-weight: bold;
  font-family: var(--font-serif);
}
</style>
