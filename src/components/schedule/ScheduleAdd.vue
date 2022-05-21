<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  staffList: Array,
  shift: Object,
})

defineEmits(['update', 'close'])

const { shift } = toRefs(props)

const staff = ref(null)
const starttime = ref(shift.value.start)
const endtime = ref(shift.value.end)
</script>

<template>
  <BForm
    @submit.prevent="
      $emit('update', {
        staff,
        starttime,
        endtime,
      })
    "
    v-if="staffList && shift"
  >
    <BModal @close="$emit('close')">
      <template #title>
        {{ $t('add_service') }}
      </template>

      <BContainer size="l">
        <BFormGroup>
          <BFormItem>
            <BFormLabel for="staff">{{ $t('staff') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormSelect
              id="staff"
              :items="staffList"
              allow-empty
              v-model="staff"
            />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="starttime">{{ $t('starttime') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput id="starttime" type="time" v-model="starttime" />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="endtime">{{ $t('endtime') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput id="endtime" type="time" v-model="endtime" />
          </BFormItem>
        </BFormGroup>
      </BContainer>

      <template #footer>
        <BFormGroup>
          <BFormItem>
            <BButton design="primary_wide">
              {{ $t('save') }}
            </BButton>
          </BFormItem>
        </BFormGroup>
      </template>
    </BModal>
  </BForm>
</template>
