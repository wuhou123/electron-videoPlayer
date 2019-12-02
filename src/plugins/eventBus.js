import Vue from 'vue'
const EventBus = new Vue

const EventBusPlugin = {
  install (Vue) {
    Vue.prototype.$bus = EventBus
  }
}
export { EventBusPlugin as default, EventBus }
