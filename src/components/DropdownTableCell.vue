<template>
  <td @click="handleClick" v-clickoutside="handleSelect">
    <el-autocomplete
      ref="input"
      v-show="showInput"
      class="borderless"
      v-model="currentValue"
      :fetch-suggestions="querySearch"
      @select="handleSelect"
      value-key="label"
      :debounce="0"
      :popper-append-to-body="false"
    ></el-autocomplete>

    <span v-show="!showInput">
      {{ value }}
    </span>
  </td>
</template>

<script>
import _toNumber from 'lodash/toNumber'
import _isNaN from 'lodash/isNaN'

export default {
  name: 'DropdownTableCell',
  props: ['value', 'list'],
  data() {
    return {
      showInput: false,
      currentValue: '',
      showError: false
    }
  },
  methods: {
    handleClick() {
      this.showInput = true
      this.$nextTick(() => {
        this.$refs.input && this.$refs.input.focus()
      })
    },
    handleSelect(item) {
      if (this.showInput) {
        this.currentValue = item.value
        console.log(item)
        this.$emit('update', {
          id: this.$attrs.id,
          oldValue: this.value,
          newValue: item.value
        })
        this.showInput = false
      }
    },
    querySearch(queryString, cb) {
      let results = this.list
      if (queryString) {
        results = this.list.filter(item => {
          return (
            item.value.indexOf(queryString) !== -1 ||
            item.label.indexOf(queryString) !== -1
          )
        })
      }
      cb(results)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-autocomplete.borderless {
  .el-input__inner {
    height: 100%;
    font-size: 14px;
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
}

.el-autocomplete-suggestion.el-popper {
  width: 200px;
}
</style>
