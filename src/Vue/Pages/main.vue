<template>
  <div id="myD3PlayGround"></div>
</template>


<script>
import * as d3 from 'd3'
import d3Cloud from 'd3-cloud'
export default {
  data() {
    return {
      d3Layer: null,
      d3Svg: null,
      d3Size: {
        margin: { top: 30, right: 10, bottom: 10, left: 10 },
        width: 500,
        height: 500
      },
      d3Words: [{ word: "MaSungNote", size: "35" },
      { word: "Developer", size: "30" },
      { word: ".Net Framework", size: "30" },
      { word: "Vue.JS", size: "30" },
      { word: "JAVA", size: "20" },
      { word: "SpringBoot", size: "30" },
      { word: "Spring Framework", size: "20" },
      { word: "Kinect SDK", size: "10" },
      { word: "Android SDK", size: "20" },
      { word: "Unity", size: "20" },
      { word: "jQuery", size: "30" }, { word: "Javascript", size: "30" }, { word: "Ajax", size: "20" }, { word: "Node.js", size: "20" },]
    }
  },
  mounted() {
    console.log(this.$data.d3Size)
    this.$data.d3Size.width = ((document.getElementById("myD3PlayGround").offsetWidth / 10 * 9) - this.$data.d3Size.margin.left - this.$data.d3Size.margin.right)
    this.$data.d3Size.height = ((window.innerHeight / 5 * 4) - this.$data.d3Size.margin.top - this.$data.d3Size.margin.bottom)
    this.d3Contents()
  },
  methods: {
    d3Contents() {
      // List of words
      var myWords = this.$data.d3Words

      // set the dimensions and margins of the graph
      var margin = this.$data.d3Size.margin
      var height = this.$data.d3Size.height
      var width = this.$data.d3Size.width

      // append the svg object to the body of the page
      this.$data.d3Svg = d3.select("#myD3PlayGround").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
      // Constructs a new cloud layout instance. It run an algorythm to find the position of words that suits your requirements
      // Wordcloud features that are different from one word to the other must be here
      this.$data.d3Layer = d3Cloud()
        .size([width, height])
        .words(myWords.map(function (d) { return { text: d.word, size: d.size }; }))
        .padding(5)        //space between words
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .fontSize(function (d) { return d.size; })      // font size of words
        .on("end", this.d3LayerDraw)
      this.$data.d3Layer.start();
    },
    d3LayerDraw(words) {
      this.$data.d3Svg
        .append("g")
        .attr("transform", "translate(" + this.$data.d3Layer.size()[0] / 2 + "," + this.$data.d3Layer.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) { return d.size; })
        // .style("fill", "#967BDC")
        .style("fill", function (d) {
          if (d.text.indexOf("MaSung") > -1) return "#000"
          return (Math.random() >= 0.3 ? "#696969" : "#808080");
        })
        .attr("text-anchor", "middle")
        .style("font-family", "Georgia, serif")
        .style("font-variant", "normal")
        .transition()
        .duration(600)
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"        })
        .text(function (d) { return d.text; })
    },
  }
}
</script>
