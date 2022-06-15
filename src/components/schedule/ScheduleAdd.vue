<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { ref, toRefs } from 'vue'

const props = defineProps({
  staffList: Array,
  shift: Object,
  date: String,
  year: Number,
  month: Number,
})

const emit = defineEmits(['update', 'close'])

const { shift } = toRefs(props)

let start1 = dayjs(props.date)
  .hour(shift.value.start.split(':')[0])
  .minute(shift.value.start.split(':')[1])

let end1 = dayjs(props.date)
  .hour(shift.value.start.split(':')[0])
  .minute(shift.value.start.split(':')[1])
  .second(59)
  .add(shift.value.duration, 'hours')

const staff = ref(null)
const startdate = ref(start1.format('YYYY-MM-DD'))
const starttime = ref(start1.format('HH:mm'))
const enddate = ref(end1.format('YYYY-MM-DD'))
const endtime = ref(end1.format('HH:mm'))

const start = computed(() => {
  return dayjs(startdate.value)
    .hour(starttime.value.split(':')[0])
    .minute(starttime.value.split(':')[1])
})

const end = computed(() => {
  return dayjs(enddate.value)
    .hour(endtime.value.split(':')[0])
    .minute(endtime.value.split(':')[1])
})

const update = () => {
  emit('update', {
    staff: staff.value,
    start: start.value.unix(),
    end: end.value.unix(),
  })
}
</script>

<template>
  <BModal @close="$emit('close')">
    <template #title>
      {{ $t('add_service') }}
    </template>

    <BContainer size="l">
      <BForm @submit.prevent="update" v-if="staffList && shift">
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
            <BFormLabel for="startdate">{{ $t('startdate') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput id="startdate" type="date" v-model="startdate" />
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
            <BFormLabel for="enddate">{{ $t('enddate') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput id="enddate" type="date" v-model="enddate" />
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

        <BFormGroup>
          <BFormItem>
            <BButton design="primary_wide">
              {{ $t('save') }}
            </BButton>
          </BFormItem>
        </BFormGroup>
      </BForm>
    </BContainer>
  </BModal>
</template>
