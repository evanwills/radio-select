<script lang="ts">
import { selectData, singleOption } from './RadioSelet.d.ts'
import { ref } from 'vue'
export default {
  data() : selectData {
    return {
      selected: '-- please select --',
      selectedVal: '',
      expanded: false,
      setFocus: true,
    }
  },

  props: {
    options: { type: Array, required: true },
    emptySelection: { type: String, required: false, default: '-- please select --' },
    id: { type: String, required: true },
    label: { type: String, required: true },
  },

  methods: {
    getBtnClass() {
      const tmp = 'radio-select__selected';
      const tail = (this.expanded) ? 'open' : 'closed';
      return `${tmp} ${tmp}--is-${tail}`;
    },
    getListClass() {
      const tmp = 'radio-select__list';
      const tail = (this.expanded) ? 'open' : 'closed';
      return `${tmp} ${tmp}--is-${tail}`;
    },

    toggleExpanded() {
      this.expanded = !this.expanded;
      this.setFocus = (this.expanded === true);
    },

    updateValue(event : Event, close : boolean = false) {
      console.group('updateValue()');
      console.log('event:', event)
      console.log('event.target:', event.target)
      console.log('event.target.value:', (event.target as HTMLInputElement).value)
      console.log('event.target.dataset.value:', (event.target as HTMLInputElement).dataset.value);
      const tmp : string|undefined = (event.target as HTMLInputElement).dataset.value;

      this.selected = (typeof tmp !== 'undefined')
        ? tmp
        : '';

      if (close === true) {
        this.expanded = false;
        // this.$refs.radioSelectBtn.focus();
      }

      this.setFocus = false;

      console.groupEnd();
    },

    buttonArrow(event: Event) {
      console.group('updateValue()');
      console.log('event:', event)
      console.log('event.target:', event.target)
      console.groupEnd();
    },

    getRadioID(key: string) : string {
      return `${this.id}--input-${key}`;
    },

    getGroupLabelID() : string {
      return `${this.id}--group-label`;
    },

    // getGroupLabelID() : string {
    //   return `${this.id}--input`;
    // },

    // getRadioName() : string {
    //   return `${this.id}--input`;
    // },
  },

  mounted() {
    console.group('mounted()');
    console.log('this:', this);
    console.groupEnd();
  },
}

</script>

<template>
  <div role="group" :aria-labelledby="getGroupLabelID()" class="radio-select">
    <span :id="getGroupLabelID()">{{label}}</span>
    <button :class="getBtnClass()"
            aria-hidden="true"
            ref="radioSelectBtn"
            v-on:click="toggleExpanded"
            v-on:keyup="buttonArrow($event)">{{ selected }}</button>
    <ul role="radiogroup" aria-labelledby="groupID" :class="getListClass()">
      <li v-for="option in options">
        <input type="radio"
               :name="getRadioName()"
               :id="getRadioID(index)"
               :value="option.value"
               :checked="option.selected"
               v-on:click="updateValue($event, true)"
               v-on:change="updateValue($event, false)"
               :autofocus="setFocus && selectedVal === 'option 1'"
               :tabindex="!expanded ? -1 : undefined" />
        <label for="radioID-input--1">{{ option.label }}</label>
      </li>
    </ul>
  </div>
  <select>
    <option>option 1</option>
    <option>option 2</option>
    <option>option 3</option>
    <option>option 4</option>
  </select>
</template>

<style scoped>
.radio-select {
  box-sizing: border-box;
  padding: 0 0 3rem;
  position: relative;
  text-align: left;
}
.radio-select__selected {
  background-color: #fff;
  /* border: 0.05rem solid #000; */
  border: none;
  border-radius: 0;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-right: -2.5rem;
  padding: 0.5rem 3rem 0.5rem 1rem;
  position: relative;
  text-align: start;
  width: 100%;
}
.radio-select__selected::before {
  background-color: transparent;
  border-bottom: 0.2rem solid #000;
  border-right: 0.2rem solid #000;
  content: '';
  display: inline-block;
  height: 0.6rem;
  position: absolute;
  right: .5rem;
  top: 50%;
  transform: translate(-40%, -80%) rotate(45deg);
  transform-origin: 70% 70%;
  transition: transform ease-in-out 0.3s;
  width: 0.6rem;
}
.radio-select__expand {
  background-color: #ddd;
  display: inline-block;
  height: 2.5rem;
  margin-left: -0.1rem;
  position: relative;
  top: 0.9rem;
  width: 2.5rem;
}
.radio-select__selected--is-open::before {
  transform: translate(-50%, -70%) rotate(-135deg);
}
.radio-select__selected:empty::before {
  content: 'please choose';
}
.radio-select__list {
  background-color: #fff;
  list-style-type: none;
  border-top: 0.05rem solid #ccc;
  margin: 0;
  padding: 0;
  position: absolute;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform ease-in-out 0.3s;
  width: calc(100% + 0.05rem);
}
.radio-select__list--is-open,
.radio-select__list:focus-within {
  transform: scaleY(1);
}

.radio-select__list li {
  margin: 0;
  padding: 0;
  width: 100%;
}
.radio-select__list input {
  position: absolute;
  top: -1000rem;
  left: -1000rem;
}
.radio-select label {
  padding: 0.5rem 1rem;
  color: #000;
  display: block;
  border-top: 0.05rem solid #ccc;
}
.radio-select label {
  cursor: pointer;
}
.radio-select input:focus + label {
  outline-offset: 0.1rem;
  outline-color: blueviolet;
  background-color: #ccc;
}
.radio-select input:checked + label {
  background-color: #cfc;
  border: 0.
}
/**
 * Copied from Bootstrap 5.x
 */
.visually-hidden,
.visually-hidden-focusable:not(:focus):not(:focus-within) {
  border: 0 !important;
  clip: rect(0,0,0,0) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 1px !important;
}
</style>
