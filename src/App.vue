<script setup lang="ts">
import RadioSelect from './components/RadioSelect.vue';
import { appData, selectData, singleOption } from './components/RadioSelet.d.ts';

const data : appData = () => {
  return {
    options: [
      {
        value: '1',
        label: 'option 1',
        selected: false,
      },
      {
        value: '2',
        label: 'option 2',
        selected: false,
      },
      {
        value: '3',
        label: 'option 3',
        selected: false,
      },
      {
        value: '4',
        label: 'option 4',
        selected: false,
      },
      {
        value: '5',
        label: 'option 5',
        selected: false,
      }
    ]
  }
}

const selectOptions : appData = [
  {
    value: '1',
    label: 'option 1',
    selected: false,
  },
  {
    value: '2',
    label: 'option 2',
    selected: false,
  },
  {
    value: '3',
    label: 'option 3',
    selected: false,
  },
  {
    value: '4',
    label: 'option 4',
    selected: false,
  },
  {
    value: '5',
    label: 'option 5',
    selected: false,
  }
];

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <RadioSelect id="select-ID" label="Radio select" v-bind:options="selectOptions" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
