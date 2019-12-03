<template>
  <v-container v-loading="loading">
    <v-row dense>
      <v-col
        v-for="(card, index) in cardList"
        cols="3"
        :key="index"
        @click="goDetail(card.vid)"
      >
        <v-card class="card-div">
          <v-img
            :src="card.pic"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <i class="iconfont icon-play_fill"></i>
            <v-card-title v-text="card.name"></v-card-title>
            <v-card-subtitle v-text="card.label"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-alert
      :value="!cardList || cardList.length === 0"
      type="warning"
      transition="scale-transition"
      dark
      outlined
      border="left"
      prominent
      @click.native="$router.push('/')"
    >
      暂无资源，快去热点视频看看吧！
    </v-alert>
  </v-container>
</template>

<script>
import {
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText,
  VCardActions,
  VImg,
  VAlert
} from 'vuetify/lib'
export default {
  name: 'searchList',
  data() {
    return {
      cardList: [],
      loading: true
    }
  },
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VCardActions,
    VImg,
    VAlert
  },
  activated() {
    this.getList(this.$route.query.kw || '')
  },
  methods: {
    async getList(kw) {
      if (!kw) return (this.loading = false)
      this.loading = true
      let res = await this.$api.rank.getSeach({ kw: kw })
      this.loading = false
      this.cardList = res.data.data || []
    },
    goDetail(vid) {
      this.$router.push({ path: '/main/play/index', query: { vid: vid } })
      this.$root.eventBus.$emit('refreshPlay')
    }
  }
}
</script>

<style lang="scss" scoped>
.card-div {
  display: relative;
  cursor: pointer;
  .icon-play_fill {
    position: absolute;
    font-size: 16px;
    left: calc(50% - 13px);
    top: calc(50% - 13px);
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.7);
    opacity: 1;
    transition: opacity ease 0.3s;
  }
}
</style>
