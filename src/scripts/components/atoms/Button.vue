<template>
  <button
    class="basic"
    :class="classObject"
    :disabled="disabled"
    @click="clickEvent"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() classObject!: Record<string, string>;

  @Prop() text!: string;

  @Prop() disabled!: boolean;

  @Prop() clickEvent!: Function;
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
  outline: none;

  &:hover {
    opacity: .85;
  }
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
