import ElementUIPlugin from './elementUI'
import EventBusPlugin from './eventBus'

export default function (Vue) {
  Vue.use(ElementUIPlugin)
  Vue.use(EventBusPlugin)
}