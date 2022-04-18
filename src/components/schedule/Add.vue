<template>
  <b-form
    @submit.prevent="
      $emit('update', {
        staff,
        starttime,
        endtime,
      })
    "
    v-if="staffList && shift"
  >
    <b-modal @close="$emit('close')">
      <template #title>
        {{ $t('add_service') }}
      </template>

      <b-container size="l">
        <b-form-group>
          <b-form-item>
            <b-form-label for="staff">{{ $t('staff') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select
              id="staff"
              :items="staffList"
              allow-empty
              v-model="staff"
            />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="starttime">{{ $t('starttime') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input id="starttime" type="time" v-model="starttime" />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="endtime">{{ $t('endtime') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input id="endtime" type="time" v-model="endtime" />
          </b-form-item>
        </b-form-group>
      </b-container>

      <template #footer>
        <b-form-group>
          <b-form-item>
            <b-button design="primary_wide">
              {{ $t('save') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>
    </b-modal>
  </b-form>
</template>

<script>
import { ref, toRefs } from '@vue/composition-api'

export default {
  name: 'schedule-add',
  props: {
    staffList: Array,
    shift: Object,
  },
  setup(props) {
    const { shift } = toRefs(props)

    const staff = ref(null)
    const starttime = ref(shift.value.start)
    const endtime = ref(shift.value.end)

    return {
      staff,
      starttime,
      endtime,
    }
  },
}
</script>
