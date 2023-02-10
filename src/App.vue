<template>
  <div id="app">
    <div ref="testDiv" style="width: 100px;height: 500px">
      <bar-graph v-if="showChart"
              :points="dataPoints"
              :labels="dataLabels"
                 :width="this.chartWidth"
                 :height="this.chartHeight"
      />
    </div>
    <button @click="test">测试按钮</button>
  </div>
</template>

<script>
import BarGraph from "./components/bar";
export default {
  name: "app",
  components: {
    BarGraph
  },
  data() {
    return {
      dataPoints: [42, 8, 15,20,22,42, 8, 15,20,2],
      dataLabels: [
        "Label 1",
        "Label 2",
        "Label 3",
        "Label 4",
        "Label 5",
        "Label 6",
        "Label 7",
        "Label 8",
        "Label 9"
      ],
      showChart:true,
      chartWidth:300,
      chartHeight:500
    };
  },
  created: function() {
    //window.setInterval(this.changeData, 5000);
  },
  mounted() {
  },
  methods: {
    changeData() {
      this.dataPoints = this.dataPoints.map(() => {
        return Math.floor(Math.random() * Math.max(180)) + 1;
      });
    },
    test(){
      this.chartWidth = this.$refs.testDiv.clientWidth
      this.chartHeight = this.$refs.testDiv.clientHeight
      this.showChart = true
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
hr {
  margin: 4rem 8rem;
}

#custom-style-gradient-vertical {
  --color-stop-1: #00c3ff;
  --color-stop-2: #77e190;
  --color-stop-3: #42b883;
}
.custom-style .chart rect {
  fill: url(#custom-style-gradient-vertical) gray;
}
</style>
