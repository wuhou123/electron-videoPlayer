<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-tabs dark background-color="transparent" show-arrows @change="change">
        <v-tab v-for="(item, index) in rankList" :key="index">{{
          item.name
        }}</v-tab>
      </v-tabs>
    </v-row>

    <v-container fluid>
      <card-item :rankList="rankList[itemIndex]" v-if="rankList[itemIndex]" />
    </v-container>
  </v-container>
</template>

<script>
import cardItem from './index'
export default {
  data() {
    return {
      rankList: [],
      itemIndex: 0
    }
  },
  components: { cardItem },
  created() {
    this.getList()
  },
  methods: {
    change(val) {
      this.itemIndex = val
    },
    async getList() {
      try {
        let res = await this.$api.rank.getRankList()
        this.loading = false
        this.rankList = res.data || []
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  border-bottom: 1px solid #202226;
}
.active {
  background-color: red;
}
</style>
