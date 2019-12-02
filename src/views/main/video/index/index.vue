<template>
  <v-container fluid class="container-1040">
    <base-title :text="rankList.name" class="text--teal" />
    <v-row class="d-flex justify-space-between">
      <v-row dense>
        <v-col v-for="(rank, key) in rankList.data" cols="2" :key="key">
          <base-rank-cover :rank="{ rank, key }" />
        </v-col>
      </v-row>
      <div :style="{ width: fillGap(rankList, 6, 15.38) }"></div>
    </v-row>
  </v-container>
</template>

<script>
import BaseTitle from '@/base/title/base-title.vue'
import BaseRankCover from '@/base/rank-cover/base-rank-cover.vue'
import fillGap from '@/mixins/fillGap'
export default {
  name: 'vedio',
  mixins: [fillGap],
  props: {
    rankList: {
      type: Object
    }
  },
  data() {
    return {}
  },
  components: {
    BaseTitle,
    BaseRankCover
  },
  created() {},
  methods: {}
}
</script>
