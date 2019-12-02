<template>
  <div>
    <video :src="src" controls="controls" style="width:100%;height:100%">
      您的浏览器不支持 video 标签。
    </video>
  </div>
</template>

<script>
export default {
  name: 'play',
  data() {
    return {
      src: ''
    }
  },
  created() {
    this.getList(this.$route.query.vid)
  },
  methods: {
    async getList(vid) {
      if (!vid) return
      try {
        let res = await this.$api.rank.getDetail({ vid: vid })
        let url = res.data.playUrl || []
        this.src = url[Object.keys(url)[0]]
        console.log(111, this.src)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
