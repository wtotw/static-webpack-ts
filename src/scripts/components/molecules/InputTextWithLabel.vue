<template>
  <div>
    <Label
      :id="id"
      :class="labelClass"
      :text="labelText"
    />
    <InpotText
      :id="id"
      :class="textClass"
      :placeholder="placeholder"
      :value="textValue"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import InpotText from '@scripts/components/atoms/InputText.vue';
import Label from '@scripts/components/atoms/Label.vue';

@Component({
  components: {
    InpotText,
    Label
  }
})
export default class InputTextWithLabel extends Vue {
  @Prop() id!: string;

  @Prop() labelClass!: string;

  @Prop() textClass!: string;

  @Prop() labelText!: string;

  @Prop() textValue!: string;

  @Prop() placeholder!: string;
}
</script>
