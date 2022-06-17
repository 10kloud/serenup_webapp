<template>
  <RouterView />
</template>

<script>
import { storeCognito } from '@/stores/store'

export default {
  setup(){
    var store = storeCognito()
    console.log();
    store.initCognito(import.meta.env.VITE_POOL_ID, import.meta.env.VITE_CLIENT_ID)
  }
}

</script>