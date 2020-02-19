<template>
  <div>
    <input type="text" v-model="text">
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({ text: 'test' })
});
</script>
