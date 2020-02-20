<template>
  <div>
    <input
      v-model="text"
      type="text"
    >
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({ text: 'test' })
});
</script>
