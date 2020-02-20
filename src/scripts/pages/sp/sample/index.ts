import Vue from 'vue';
import HelloComponent from '@scripts/components/Hello.vue';

// eslint-disable-next-line
const v = new Vue({
  el: '#app',
  components: {
    HelloComponent
  },
  data: {
    name: 'World'
  },
  template: `
  <div>
    Name: <input v-model="name" type="text">
    <hello-component :name="name" :initialEnthusiasm="5" />
  </div>`
});
