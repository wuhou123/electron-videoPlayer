<template>
  <v-card
    class="card-div wrapper"
    :style="{ width }"
    @click="goSearch(rank.key)"
  >
    <v-img
      :src="'http://pic.tsmp4.net/api/yingshi/img.php?key=' + rank.key"
      class="white--text align-end img-wrapper"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="150px"
    >
      <div class="play-count">
        <i class="el-icon-s-custom"></i> {{ rank.rank }}
      </div>
      <i class="el-icon-search" title="查资源"></i>
      <v-card-subtitle v-text="rank.key" class="white--text"></v-card-subtitle>
    </v-img>
  </v-card>
</template>

<script>
import { VCard, VCardSubtitle, VImg } from 'vuetify/lib'
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    rank: {
      type: Object,
      required: true
    }
  },
  components: {
    VCard,
    VCardSubtitle,
    VImg
  },
  created() {},
  methods: {
    goSearch(item) {
      this.$router.push('main/')
      this.$router.replace({
        path: '/main/personalFM',
        query: { kw: item, t: +new Date() }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 36px;
  .img-wrapper {
    position: relative;
    cursor: pointer;
    font-size: 0px;
    padding-top: 100%;
    &:hover {
      .el-icon-search {
        opacity: 1;
      }
    }
    .play-count {
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 12px;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.44) 100%
      );
      padding: 2px 8px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      opacity: 1;
      transition: opacity ease 0.3s;
      .icon-earphone {
        font-size: 11px;
        margin-right: 4px;
      }
    }
    .el-icon-search {
      position: absolute;
      font-size: 16px;
      right: 5px;
      bottom: 5px;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0;
      transition: opacity ease 0.3s;
    }
  }
  .cover {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }
  .name {
    font-size: 13px;
  }
}
</style>
