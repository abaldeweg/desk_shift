import { onMounted, reactive } from '@vue/composition-api'
import { request } from '@/api'

export default function useShift() {
  const state = reactive({
    shifts: null,
  })

  const show = () => {
    return request(
      'get',
      '/api/show',
      {},
      {
        name: 'shifts.json',
      }
    ).then((response) => {
      state.shifts = JSON.stringify(response.data)
    })
  }

  onMounted(show)

  const create = () => {
    return request('post', '/api/create').then(() => {
      show()
    })
  }

  const update = () => {
    return request('put', '/api/update', {
      name: 'shifts.json',
      body: state.shifts,
    }).then(() => {
      show()
    })
  }

  return { state, show, create, update }
}
