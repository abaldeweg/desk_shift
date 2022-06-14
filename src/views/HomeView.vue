<script setup>
import { useTitle } from '@baldeweg/ui'
import { request } from './../api'
import { useSchedule } from './../composables/useSchedule.js'

defineProps({
  auth: Object,
})

useTitle({ title: 'Home' })

const { currentlyOnDuty } = useSchedule()

const saveForwarding = () => {
  request('put', 'api/call/update', {
    destination: currentlyOnDuty.value.phone,
    timeout: 0,
    active: true,
  })
}

const resetForwarding = () => {
  request('put', 'api/call/reset', [])
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
    <BButton design="outline_danger" @click="resetForwarding">Reset</BButton>
    <BButton design="primary" @click="saveForwarding">Set</BButton>
    <p>
      {{ $t('currently_you_have_to_set_and_reset_a_phone_number_manually') }}
    </p>
  </BContainer>

  <BContainer size="m" v-else>
    <BAlert type="warning">
      <p>{{ $t('nobody_on_call') }}</p>
    </BAlert>
  </BContainer>
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
