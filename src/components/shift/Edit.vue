<template>
  <section>
    <b-form @submit.prevent="shift.update">
      <b-form-group>
        <b-form-item>
          <b-form-label for="shifts">{{ $t('shifts') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-textarea
            id="shifts"
            :rows="20"
            v-model="shift.state.shifts"
          />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary_wide">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </section>
</template>

<script>
import useShift from '@/composables/useShift'

export default {
  name: 'shift-edit',
  setup() {
    const shift = useShift()

    return { shift }
  },
}
</script>
