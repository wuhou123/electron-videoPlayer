<template>
  <d-player
    :options="options"
    ref="player"
    style="width:100%;height:100%"
    v-if="showPlayer"
  ></d-player>
</template>

<script>
export default {
  name: 'play',
  data() {
    return {
      src: '',
      options: {
        video: {
          url: '',
          pic: '',
          type: 'auto'
        },
        autoplay: true
      },
      player: null,
      showPlayer: false
    }
  },
  created() {
    this.getList(this.$route.query.vid)
    this.$root.eventBus.$on('refreshPlay', () => {
      this.showPlayer = false
      this.getList(this.$route.query.vid)
    })
  },
  methods: {
    async getList(vid) {
      if (!vid) return
      try {
        let res = await this.$api.rank.getDetail({ vid: vid })
        this.switchVideo(res)
      } catch (e) {
        console.log(e)
      }
    },
    switchVideo(res) {
      setTimeout(() => {
        let url = res.data.playUrl || []
        this.options.video.url = url[Object.keys(url)[0]]
        this.options.video.pic = res.data.pic
        this.showPlayer = true
      }, 1000)
    }
  }
}
</script>
