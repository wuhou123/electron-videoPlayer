<template>
  <v-container>
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
  </v-container>
</template>

<script>
import {
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText,
  VCardActions,
  VImg
} from 'vuetify/lib'
export default {
  name: 'searchList',
  data() {
    return {
      cardList: []
    }
  },
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VCardActions,
    VImg
  },
  created() {
    this.getList(this.$route.query.kw || '')
  },
  methods: {
    async getList(kw) {
      if (!kw) return
      let res = await this.$api.rank.getSeach({ kw: kw })
      this.cardList = res.data.data || []
    },
    goDetail(vid) {
      console.log('jinru')
      this.$router.push({ path: '/main/play/index', query: { vid: vid } })
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
