<template>
  <form>
    <InputTextWithLabel
      id="textInput"
      :label-class="{small: true}"
      label-text="出発地"
      :text-class="{}"
      placeholder="スポット / 駅 / バス停を入力"
    />
    <Button
      :class="{search: true}"
      text="検 索"
      :click-event="buttonAction"
    />
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import InputTextWithLabel from '@scripts/components/molecules/InputTextWithLabel.vue';
import Button from '@scripts/components/atoms/Button.vue';

@Component({
  components: {
    InputTextWithLabel,
    Button
  },
  methods: {
    buttonAction(): void {
      alert('!!!');
    }
  }
})
export default class TestForm extends Vue {}
</script>
