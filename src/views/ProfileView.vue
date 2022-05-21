<script setup>
import { useTitle } from '@baldeweg/ui'
import ProfileTheme from '@/components/profile/Theme.vue'

useTitle({ title: 'Profile' })

defineProps({
  auth: Object,
})
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('profile') }}</h1>
  </BContainer>

  <BContainer size="m">
    <ProfileTheme />
  </BContainer>
</template>
