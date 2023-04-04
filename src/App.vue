<script setup lang="ts">
import RadioSelect from './components/RadioSelect.vue';
import { appData, selectData, singleOption } from './types/radio-select.d';

const selectOptions : singleOption[] = [
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
  },
  {
    value: '6',
    label: 'This is a rediculously long select option that really should have been edited down so it was shorter but we are going to use it as an example',
    selected: true,
  },
  {
    value: '7',
    label: 'option 7',
    selected: false,
  },
];

</script>

<template>
  <RadioSelect id="select-ID" label="Radio select" v-bind:options="selectOptions" emptySelection="-- Please choose one --" />
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
#app {
  max-width: 30rem !important;
}
</style>
