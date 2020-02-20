<template>
  <div class="container">
    <div class="greeting">
      Hello {{ name }}{{ exclamationMarks }}
    </div>
    <button @click="decrement">
      -
    </button>
    <button @click="increment">
      +
    </button>
    <div class="test">
      てすと
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HelloDecorator extends Vue {
  @Prop() name!: string;

  @Prop() initialEnthusiasm!: number;

  enthusiasm = this.initialEnthusiasm;

  increment(): void {
    this.enthusiasm += 1;
  }

  decrement(): void {
    if (this.enthusiasm > 1) {
      this.enthusiasm -= 1;
    }
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join('!');
  }
}
</script>

<style lang="scss" scoped>
.greeting {
  font-size: 20px;
}

.test {
  display: grid;
  width: 100px;
  height: 100px;
  background-color: #f00;
}
</style>
