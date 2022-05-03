<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('call') }}</h1>
    </b-container>

    <b-container size="m">
      <b-form-group>
        <b-form-item>
          <b-form-label for="support">Support Phone Number</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            id="support"
            type="tel"
            v-model="support"
            :style="{ fontSize: '3rem' }"
          />
        </b-form-item>
      </b-form-group>
    </b-container>

    <b-container size="m">
      <details>
        <summary>Personal Access Token</summary>
        <b-form-group>
          <b-form-item>
            <b-form-label for="pat" hidden>Personal Access Token</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-helpline>
              Please provide the token name and the Personal Access Token.
            </b-form-helpline>
          </b-form-item>
          <b-form-item>
            <b-form-input id="pat" v-model="pat" />
          </b-form-item>
        </b-form-group>
      </details>
    </b-container>

    <b-container size="m">
      <b-form @submit.prevent="saveForwarding">
        <b-form-group>
          <b-form-item>
            <b-form-label for="phone">Phone</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-helpline>
              Who is supposed to receive the call?
            </b-form-helpline>
          </b-form-item>
          <b-form-item>
            <b-form-input id="phone" type="tel" v-model="phone" />
          </b-form-item>
        </b-form-group>
        <b-form-group buttons>
          <b-form-item>
            <b-button design="primary">Save Forwarding</b-button>
          </b-form-item>
        </b-form-group>
      </b-form>
    </b-container>

    <b-container size="m">
      <b-button design="outline" @click="resetForwarding"
        >Reset Forwarding</b-button
      >
    </b-container>
  </article>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import { request } from './../sipgate'

export default {
  name: 'call-view',
  head: {
    title: 'Call',
  },
  setup() {
    const support = ref(localStorage.getItem('shift_support') || null)
    const pat = ref(localStorage.getItem('shift_pat') || null)
    const phone = ref('')

    watch(
      () => support.value,
      () => {
        localStorage.setItem('shift_support', support.value)
      }
    )

    watch(
      () => pat.value,
      () => {
        localStorage.setItem('shift_pat', pat.value)
      }
    )

    const saveForwarding = () => {
      request('put', '', {
        forwardings: [
          {
            destination: phone.value,
            timeout: 0,
            active: true,
          },
        ],
      })
    }

    const resetForwarding = () => {
      request('put', '/w0/phonelines/p0/forwardings', {
        forwardings: [],
      })
    }

    return { support, pat, phone, saveForwarding, resetForwarding }
  },
}
</script>
