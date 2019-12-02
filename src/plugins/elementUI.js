import 'element-ui/lib/theme-chalk/index.css'
import { Button, Table, TableColumn, Autocomplete } from 'element-ui';
import clickoutside from 'element-ui/src/utils/clickoutside.js'

console.log(clickoutside)
export default {
  install (Vue) {
    const components = [
      Button,
      Table,
      TableColumn,
      Autocomplete
    ]

    Vue.directive('clickoutside', clickoutside)

    components.forEach((component) => {
      Vue.use(component)
    })

  }
}