<template>
  <d-player
    :options="options"
    ref="player"
    style="width:100%;height:100%"
    v-if="showPlayer"
  ></d-player>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
  name: 'play',
  components: {
    'd-player': VueDPlayer
  },
  data() {
    return {
      src: '',
      options: {
        video: {
          url: '',
          pic: '',
          type: 'auto',
          quality: [],
          defaultQuality: 0
        },
        autoplay: true,
        logo: 'https://wuhou123.cn/18-12-10/39834318.jpg',
        highlight: [
          {
            time: 100,
            text: '资源仅用于学习和测试！'
          }
        ]
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
        let srcList = []
        for (let i in url) {
          srcList.push({
            name: i,
            url: url[i],
            type: 'auto'
          })
        }
        this.options.video.quality = srcList
        this.options.video.pic = res.data.pic
        this.showPlayer = true
      }, 1000)
    }
    // sendDanmaku() {
    //   setTimeout(() => {
    //     this.showPlayer = this.$refs.player.dp
    //     this.showPlayer.danmaku.draw({
    //       text: 'DIYgod is amazing',
    //       color: '#fff',
    //       type: 'top'
    //     })
    //   })
    // }
  }
}
</script>

<style lang="scss">
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-list {
  height: 200px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
