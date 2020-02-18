<template>
  <div>
    <input type="text" v-model="text">
    {{ text }}
  </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend('search-form', {
  data: () => ({ text: 'test' })
});
</script>
