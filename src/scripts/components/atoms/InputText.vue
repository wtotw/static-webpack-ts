<template>
  <input
    :id="id"
    class="basic"
    :class="classObject"
    :value="value"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    @click="clickEvent"
    @change="changeEvent"
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class InputText extends Vue {
  @Prop() id!: string;

  @Prop() classObject!: Record<string, string>;

  @Prop() value!: string;

  @Prop() name!: string;

  @Prop() placeholder!: string;

  @Prop() disabled!: boolean;

  @Prop() clickEvent!: Function;

  @Prop() changeEvent!: Function;
}
</script>

<style lang="scss" scoped>
.basic {
  width: 60%;
  height: 35px;
  font-size: 18px;
  line-height: 1em;
  color: $color_base_black;
  letter-spacing: normal;
  cursor: pointer;
  background-color: $color_theme_white;
  border-radius: 4px;
}

.primary {
  color: $color_base_white;
  background-color: $color_theme_green;
}

.search {
  color: $color_base_white;
  background-color: $color_theme_orange;
}
</style>
