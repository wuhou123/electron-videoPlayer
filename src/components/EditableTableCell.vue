<template>
  <td @click="handleClick" v-clickoutside="handleInputValueUpdate">
    <input
      :type="type === 'number' ? 'number' : 'text'"
      v-model="currentValue"
      ref="input"
      class="borderless"
      v-show="showInput"
      @keydown.enter="handleInputValueUpdate"
    />
    <span v-show="!showInput">
      {{ value }}
    </span>
  </td>
</template>

<script>
import _toNumber from 'lodash/toNumber'
import _isNaN from 'lodash/isNaN'

export default {
  name: 'EdtiableTableCell',
  props: ['value', 'type'],
  data () {
    return {
      showInput: false,
      currentValue: '',
      showError: false,
    }
  },
  watch: {
    showInput (v) {
      if (v === true) {
        this.currentValue = this.value
      }
    }
  },
  methods: {
    handleClick () {
      this.showInput = true
      this.$nextTick(() => {
        this.$refs.input && this.$refs.input.focus()
      })
    },
    validateValue () {
      return new Promise((resolve, reject) => {
        if (this.type === 'number') {
          if (_isNaN(_toNumber(this.currentValue))) {
            reject()
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      })
      
    },
    showErrorTip () {
      this.showError = true
    },
    handleInputValueUpdate () {
      if (this.showInput) {
        this.validateValue().then(() => {
          this.$emit('update', {
            id: this.$attrs.id,
            oldValue: this.value,
            newValue: this.currentValue
          })
        }).catch(() => {
          this.showErrorTip()
        })
        this.showInput = false
      }
      
    },
  }
}
</script>

<style scoped>
  .borderless {
    font-size: 14px;
    width: 50%;
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    background: transparent;
    font-weight: normal;
    font-size: inherit;
    font-family: inherit;
    text-align: center;
  }
</style>