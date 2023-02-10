<template>
  <div class="zq-chart" :style="`width: ${width}px;height: ${height}px`">
    <svg class="zq-chart-svg"  @mouseup="mouseUp">
      <g class="zq-chart-svg-container">
        <g class="zq-chart-grid-lines">
          <g class="zq-chart-grid-top" :transform="`translate(${chartAreaTransformX},${chartAreaTransformY})`">
          </g>
        </g>
        <g class="zq-chart-left"></g>
        <g class="zq-chart-area" :transform="`translate(${chartAreaTransformX},${chartAreaTransformY})`">
          <g>
            <rect v-for="bar in chartData"
                  :key="bar.index" class="wk-chart-column" :width="bar.width" x="0" :y="bar.y + bar.midPoint-partitionHeight/2/2" style="opacity: 1; fill: rgb(20, 169, 213);" :height="partitionHeight/2">
              <title>{{bar.index}}</title>
            </rect>
          </g>
        </g>
        <g class="zq-chart-interaction-area" :transform="`translate(${0},${chartAreaTransformY})`">
          <rect class="zq-chart-interaction-layer" :width="width" :height="interactionLayerHeight" style="opacity: 0;" @mousemove="mouseMove"
          @mousedown="mouseDown"></rect>
          <rect class="zq-chart-brush-control" width="100%" :height="chartBrushUpControlHeight" :y="chartBrushUpControlY"
                style="opacity:0;background-color: transparent;visibility: visible;cursor: n-resize;" @mousedown="upActionBtnDown">
          </rect>
          <rect class="zq-chart-brush-control" width="100%" :height="chartBrushDownControlHeight" :y="chartBrushDownControlY" @mousedown="downActionBtnDown"
                style="opacity:0;background-color:transparent;visibility: visible;cursor: n-resize;">
          </rect>
        </g>
        <g class="wk-chart-brush-area" :transform="`translate(${0},${chartAreaTransformY})`" :width="width" :height="height" style="visibility: visible; pointer-events: none;">
          <rect class="zq-chart-brush-line1" y="0" style="opacity: 0.6; fill: rgb(238, 238, 238);" :width="width" :height="brushLine1Height">
          </rect>
          <rect class="zq-chart-brush-line2" :y="brushLine2Y" style="opacity: 0.6; fill: rgb(238, 238, 238);" :width="width" :height="brushLine2Height">
          </rect>
          <g style="visibility: visible;">
            <rect class="zq-chart-brush-wrapping-rect" style="stroke: rgb(20, 169, 213); fill: transparent; stroke-dasharray: 2, 1; stroke-width: 1;"
                  :width="width" :height="brushWrappingRectHeight" :y="brushWrappingRectY">
            </rect>
            <g width="40" :height="moveBarHeight" :transform="`translate(${width/2 + 20},${dragUpBtnY}) rotate(180.000000)`" @mousedown="upActionBtnDown">
              <path d="M0,2.5 C0,1.11928813 1.11157715,4.4408921e-16 2.50217915,4.4408921e-16 L37.4978209,4.4408921e-16 C38.8797362,4.4408921e-16 40,1.10966206 40,2.5 L40,5 L0,5 L0,2.5 Z" transform="translate(20.000000, 2.500000) rotate(-180.000000) translate(-20.000000, -2.500000)" fill="#14A9D5"></path><path d="M0.108398438,3.07177734 L3.03393555,5.01123047 L37.0610702,5.01123047 L40.0087891,3.11230469 L0.108398438,3.07177734 Z" fill="#1190B6"></path>
            </g>
            <g @mousedown="downActionBtnDown" width="40" :height ="moveBarHeight" :transform="`translate(${width/2 - 20},${dragDownBtnY - 6})`"><path d="M0,2.5 C0,1.11928813 1.11157715,4.4408921e-16 2.50217915,4.4408921e-16 L37.4978209,4.4408921e-16 C38.8797362,4.4408921e-16 40,1.10966206 40,2.5 L40,5 L0,5 L0,2.5 Z" transform="translate(20.000000, 2.500000) rotate(-180.000000) translate(-20.000000, -2.500000)" fill="#14A9D5"></path><path d="M0.108398438,3.07177734 L3.03393555,5.01123047 L37.0610702,5.01123047 L40.0087891,3.11230469 L0.108398438,3.07177734 Z" fill="#1190B6"></path></g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
//inspired by https://github.com/djaxho/pure-vue-chart but doesn't required external libs
export default {
  props: {
    points: { type: Array, default: () => [] },
    labels: { type: Array, default: () => [] },
    parentCssId: { type: String, default: () => undefined },
    maxCaseCount:{type: Number, default: 100},
    width:{type: Number, default: 300},
    height:{type: Number, default: 500}
  },
  data() {
    return {
      selectedIndex:0,
      previousMoveIndex:0,
      moveIndex:0,

      startY:undefined,
      preDrag:false,

      upActionBtnMovePending:false,
      downActionBtnMovePending:false,
      moveBarHeight:6,
      leftSpace:60,
      rightSpace:60,
      topSpace:30,
      bottomSpace:30
    };
  },
  watch: {
  },
  computed: {
    chartAreaTransformX(){
      return this.width * 0.2;
    },
    chartAreaTransformY(){
      return this.height * 0.06;
    },
    graphWidth() {
      return this.width * 0.6;
    },
    partitionHeight() {
      return (this.height- this.topSpace - this.bottomSpace) / this.points.length;
    },
    brushAreaHeight(){
      return this.height - this.topSpace - this.bottomSpace
    },
    interactionLayerHeight(){
      return (this.chartData.length) * this.partitionHeight
    },
    maxDomain() {
      return Math.max(...this.points);
    },
    chartData() {
      return this.points.map((value, index) => {
        return {
          index,
          value,
          y: index * this.partitionHeight,
          width: this.x(value),
          midPoint: this.partitionHeight / 2,
        };
      });
    },
    brushLine1Height(){
      if (this.moveIndex <= this.selectedIndex){
        return this.moveIndex  * this.partitionHeight
      }else{
        return this.partitionHeight * (this.selectedIndex)
      }
    },
    brushLine2Y(){
      if (this.moveIndex >= this.selectedIndex){
        return this.chartData[this.moveIndex].y + this.partitionHeight
      }else{
        return this.chartData[this.selectedIndex].y + this.partitionHeight
      }
    },
    brushLine2Height(){
      if (this.moveIndex >= this.selectedIndex){
        return (Math.abs(this.moveIndex - (this.chartData.length - 1)) + 1) * this.partitionHeight
      }else{
        return (Math.abs(this.selectedIndex - (this.chartData.length - 1)) + 1) * this.partitionHeight
      }
    },
    brushWrappingRectY(){
      if(this.moveIndex >= this.selectedIndex){
        return this.chartData[this.selectedIndex].y
      }else if(this.moveIndex < this.selectedIndex){
        return this.chartData[this.moveIndex].y
      }
    },
    brushWrappingRectHeight(){
      return (Math.abs(this.moveIndex - this.selectedIndex) + 1) * this.partitionHeight
    },
    dragUpBtnY(){
      if (this.moveIndex >= this.selectedIndex){
        return this.chartData[this.selectedIndex].y
      }else{
        return this.chartData[this.moveIndex].y
      }
    },
    dragDownBtnY(){
      if (this.moveIndex >= this.selectedIndex){
        return this.chartData[this.moveIndex].y + this.partitionHeight + this.moveBarHeight
      }else{
        return this.chartData[this.selectedIndex].y + this.partitionHeight + this.moveBarHeight
      }
    },
    chartBrushUpControlY(){
      if (this.moveIndex >= this.selectedIndex){
        return this.chartData[this.selectedIndex].y - 0.5 * this.chartBrushUpControlHeight
      }else{
        return this.chartData[this.moveIndex].y - 0.5 * this.chartBrushUpControlHeight
      }
    },
    chartBrushUpControlHeight(){
      return 0.2 * this.partitionHeight
    },
    chartBrushDownControlY(){
      if (this.moveIndex >= this.selectedIndex){
        return this.chartData[this.moveIndex].y + this.partitionHeight -5
      }else{
        return this.chartData[this.selectedIndex].y + this.partitionHeight - 5
      }
    },
    chartBrushDownControlHeight(){
      return 0.2 * this.partitionHeight
    },
  },
  mounted() {
  },
  methods: {
    x(val){
      return this.xWithMax(val,this.maxDomain)
    },
    xWithMax(val, max) {
      return (val / max) * this.graphWidth;
    },
    mouseMove(e){
      let moveY = e.layerY - this.chartAreaTransformY;
      let tmpSelectedIndex = -1
      let tmpChartData = this.chartData
      for(let tmpData of tmpChartData) {
        let startY = tmpData.y;
        let endY = startY + this.partitionHeight;
        if (moveY >= startY && moveY <= endY){
          tmpSelectedIndex = tmpData.index
          break;
        }
      }
      if (this.previousMoveIndex === tmpSelectedIndex) return ;
      this.previousMoveIndex = tmpSelectedIndex;
      if (this.preDrag){
        if (tmpSelectedIndex >= 0){
          this.moveIndex = tmpSelectedIndex
          if (this.moveIndex !== this.previousMoveIndex){
            this.previousMoveIndex = this.moveIndex
          }
        }
      }else if(this.upActionBtnMovePending){
        if (tmpSelectedIndex > this.selectedIndex){
          if (this.moveIndex === this.selectedIndex){
            this.selectedIndex = this.moveIndex = tmpSelectedIndex
          }else{
            this.selectedIndex= tmpSelectedIndex
          }
        }else if(tmpSelectedIndex < this.selectedIndex){
          this.moveIndex = tmpSelectedIndex;
        }else{
          this.moveIndex = tmpSelectedIndex
        }
      }else if(this.downActionBtnMovePending){
        if (tmpSelectedIndex > this.selectedIndex){
          this.moveIndex = tmpSelectedIndex;
        }else if(tmpSelectedIndex < this.selectedIndex){
          if (this.moveIndex === this.selectedIndex){
            this.selectedIndex = this.moveIndex = tmpSelectedIndex
          }else{
            this.selectedIndex= tmpSelectedIndex
          }
        }else{
          this.moveIndex = tmpSelectedIndex
        }
      }
    },
    mouseDown(e){
      console.dir(this.$parent.$el)
      let layerY = e.layerY - this.chartAreaTransformY;
      let tmpChartData = this.chartData
      for(let tmpData of tmpChartData) {
        let startY = tmpData.y;
        let endY = startY + this.partitionHeight;
        if (layerY >= startY && layerY <= endY){
          this.preDrag = true;
          this.upActionBtnMovePending = false;
          this.downActionBtnMovePending = false

          this.selectedIndex  = tmpData.index
          this.moveIndex = this.selectedIndex
          this.previousMoveIndex = this.moveIndex
          this.startY=layerY;

          break;
        }
      }
    },
    upActionBtnDown(e){
      this.preDrag = false;
      this.upActionBtnMovePending = true;
      this.downActionBtnMovePending = false

    },
    downActionBtnDown(e){
      this.preDrag = false;
      this.upActionBtnMovePending = false;
      this.downActionBtnMovePending = true

    },
    mouseUp(e){
      this.preDrag = false;
      this.upActionBtnMovePending = false;
      this.downActionBtnMovePending = false
      let startIndex = this.selectedIndex >= this.moveIndex ? this.moveIndex:this.selectedIndex
      let endIndex = this.selectedIndex >= this.moveIndex ? this.selectedIndex:this.moveIndex
    },
  }
};
</script>

<style lang="css">
.zq-chart{
  font-size: 10px;
  position: relative;
  border: 1px dashed rebeccapurple;
}
.zq-chart-svg{
  font-size: 10px;
  position: relative;
  width: 100%;
  height: 100%;
}
.zq-chart-svg-container{

}
.zq-chart-area{
}
.zq-chart-interaction-area{
}
.zq-chart-interaction-layer{
}
.zq-chart-brush-line1 {
  opacity: 1 !important;
  fill: rgba(255,255,255,0.65) !important;
}
.zq-chart-brush-line2 {
  opacity: 1 !important;
  fill: rgba(255,255,255,0.65) !important;
}
.zq-chart-brush-wrapping-rect {
}
.zq-chart-brush-control{
}
.zq-chart-left{

}
.zq-chart-grid-lines{

}
.zq-chart-grid-top{

}

.chart rect {
  fill: #42b883;
}
.chart text {
  font: 12px sans-serif;
  color: #35495e;
}
</style>
