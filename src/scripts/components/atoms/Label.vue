<template>
  <label
    class="basic"
    :class="classObject"
    :for="id"
  >
    {{ text }}
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Label extends Vue {
  @Prop() id!: string;

  @Prop() classObject!: Record<string, string>;

  @Prop() text!: string;
}
</script>

<style lang="scss" scoped>
.basic {
  font-size: 14px;
  font-weight: bold;
}
</style>
