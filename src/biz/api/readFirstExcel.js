import { ipcRenderer } from 'electron'
import { PAYLOAD_TYPES } from '../channel/constants'
export default function readFirstExcel(callback) {
  // 定义请求参数
  const params = {
    callback: callback
  }

  // 发送请求
  ipcRenderer.send(PAYLOAD_TYPES.READ_FIRST_EXCEL, params)

  // 接受响应给callback
  ipcRenderer.once(PAYLOAD_TYPES.READ_FIRST_EXCEL, (e, res) => {
    callback(res)
  })
}