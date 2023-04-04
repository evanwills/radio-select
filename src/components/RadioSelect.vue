<script lang="ts">
import { selectData, singleOption } from '../types/radio-select.d';
import { ref } from 'vue';

export default {
  data() : selectData {
    return {
      expanded: false,
      selected: null,
      selectedKey: 0,
      setFocus: true,
      shift: false,
    }
  },

  props: {
    options: { type: Array<singleOption>, required: true },
    emptySelection: { type: String, required: false, default: '-- please choose --' },
    id: { type: String, required: true },
    label: { type: String, required: true },
  },

  methods: {
    buttonKeyHandler(event: KeyboardEvent) {
      const max = (this.options.length - 1);
      const oldKey = this.selectedKey;
      const multiplyer = (this.shift) ? 10 : 1;
      let newKey = oldKey;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          newKey = oldKey + multiplyer;
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
          newKey = oldKey - multiplyer;
          break;

        case 'Home':
          newKey = 0;
          break;

        case 'End':
          newKey = max;
          break;

        case 'PageDown':
          newKey = oldKey + 10;
          break;

        case 'PageUp':
          newKey = oldKey - 10;
          break;

        case 'Shift':
          break;
      }

      this.shift = false;

      this.updateSelected(oldKey, newKey, max);
    },

    buttonShiftKeyHandler(event: KeyboardEvent) {
      if (event.key === 'Shift') {
        this.shift = true;
      }
    },

    getGroupLabelID() : string {
      return `${this.id}--group-label`;
    },

    getOptionLabel(option: singleOption) : string {
      if (option.label.trim() === '' && option.value.trim() !== '') {
        return option.value;
      } else {
        return option.label;
      }
    },

    getRadioID(key: string) : string {
      return `${this.id}--input-${key}`;
    },

    getRadioName() : string {
      return `${this.id}--input`;
    },

    getSelectedLabel() : string {
      return (this.selected === null)
        ? this.emptySelection
        : this.selected.label;
    },

    getThingClass(thing: string) : string {
      const tmp = `radio-select__${thing}`;
      const tail = (this.expanded) ? 'open' : 'closed';


      return `${tmp} ${tmp}--is-${tail}`;
    },

    toggleExpanded(event : Event) {
      this.expanded = !this.expanded;
      this.setFocus = (this.expanded === true);
    },

    forceExpanded(event : Event) {
      this.expanded = true;
    },

    updateSelected(oldKey: number, newKey: number, max: number) : boolean {
      if (newKey < 0) {
        newKey = 0;
      } else if (newKey > max) {
        newKey = max;
      }

      if (oldKey !== newKey) {
        this.options[oldKey].selected = false;
        this.options[newKey].selected = true;

        this.selected = this.options[newKey];
        this.selectedKey = newKey;
        this.$forceUpdate();

        return true;
      }
      return false;
    },

    updateValue(event : Event, close : boolean = false) {
      const max = (this.options.length - 1);
      const tmp : string|undefined = (event.target as HTMLInputElement).dataset.index;
      const oldKey = this.selectedKey;

      const newKey = (typeof tmp !== 'undefined')
        ? parseInt(tmp)
        : this.selectedKey;

      // If the user has clicked something, reset shift's state to false.
      this.shift = false;

      this.updateSelected(oldKey, newKey, max);

      this.expanded = false;
    },
  },

  mounted() {
    for (let a = 0; a < this.options.length; a += 1) {
      if (typeof this.options[a].selected === 'boolean' && this.options[a].selected === true) {
        this.selected = this.options[a];
        this.selectedKey = a;
      }
    }
  },
}

</script>

<template>
  <div role="group" :aria-labelledby="getGroupLabelID()" class="radio-select">
    <span :id="getGroupLabelID()" class="radio-select__group-label">{{label}}</span>
    <button :class="getThingClass('btn-main')"
            aria-hidden="true"
            ref="radioSelectBtn"
            v-on:click="toggleExpanded($event)"
            v-on:keydown="buttonShiftKeyHandler($event)"
            v-on:keyup="buttonKeyHandler($event)">{{ getSelectedLabel() }}</button>
    <ul role="radiogroup" aria-labelledby="groupID" :class="getThingClass('list')">
      <li v-for="(option, index) in options" :key="index" class="radio-select__list-item">
        <input type="radio"
               class="radio-select__input"
               v-on:change="updateValue($event)"
               v-on:focus="forceExpanded($event)"
               :name="getRadioName()"
               :id="getRadioID(index.toString())"
               :value="option.value"
               :checked="option.selected"
               :autofocus="setFocus && selected !== null && selected.value === option.value"
               :data-index="index" />
        <label :for="getRadioID(index.toString())"
               class="radio-select__label">{{ getOptionLabel(option) }}</label>
      </li>
    </ul>
    <button class="radio-select__bg-close"
            v-if="expanded"
            aria-hidden="true"
            v-on:click="toggleExpanded($event)">Close</button>
  </div>
</template>

<style>
.radio-select {
  box-sizing: border-box;
  padding: 0;
  position: relative;
  text-align: left;
  text-align: start;
  z-index: 1;
}

.radio-select__group-label {
  display: block;
  padding: 0.5rem 0;
}

.radio-select__btn-main {
  background-color: #fff;
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
  text-align: left;
  width: 100%;
  z-index: 2;
}
.radio-select__btn-main::before {
  background-color: transparent;
  border-bottom: 0.125rem solid #000;
  border-right: 0.125rem solid #000;
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
.radio-select__btn-main--is-open::before {
  transform: translate(-50%, -70%) rotate(-135deg);
}
.radio-select__btn-main--is-closed::before {
  transform: translate(-40%, -80%) rotate(45deg);
}
.radio-select__btn-main:empty::before {
  content: 'please choose';
}

.radio-select__list {
  background-color: #fff;
  border-top: 0.05rem solid #ccc;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  transform-origin: top;
  transition: transform ease-in-out 0.3s;
  width: calc(100% + 0.05rem);
  z-index: 2;
}
.radio-select__list--is-open {
  transform: scaleY(1);
}
.radio-select__list--is-closed {
  transform: scaleY(0);
}

.radio-select__list-item {
  margin: 0;
  padding: 0;
  width: 100%;
}

.radio-select__label {
  border-top: 0.05rem solid #ccc;
  color: #000;
  cursor: pointer;
  display: block;
  padding: 0.5rem 1rem;
  transition: background-color ease-in-out 0.15s;
}
.radio-select__label:hover {
  background-color: #e5e5f5;
}

.radio-select__input {
  left: -1000rem;
  position: absolute;
  top: -1000rem;
}
.radio-select__input:focus + label {
  outline-offset: 0.1rem;
  outline-color: blueviolet;
  background-color: #ccc;
}
.radio-select__input:checked + label {
  background-color: #cfc;
}
.radio-select__input:checked + label:hover {
  background-color: #9d9;
}

.radio-select__bg-close {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: auto;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
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
