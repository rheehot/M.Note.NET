<template>
  <section>
    <div id="myD3PlayGround" class="container"></div>
  </section>

</template>


<script>
import * as d3 from 'd3'
import d3Cloud from 'd3-cloud'
export default {
  data() {
    return {
      d3Layer: null,
      d3Svg: null,
      defaultWordHeight: 40,
      d3Size: {
        margin: { top: 30, right: 10, bottom: 10, left: 10 },
        width: 500,
        height: 500
      },
      d3Words: [
        { word: "MaSungmin", size: "35", dark: true },
        { word: "1993.10.30", size: "20" },
        { word: "Male", size: "20" },
        { word: "masungmin.dev@gmail.com", size: "20" },
        { word: "Republic of Korea", size: "20" },
        { word: "Gyeong-gi", size: "20" },
        { word: "Web-Developer", size: "20" },
        { word: "SkillSet", size: "20", dark: true },
        { word: "Javascript", size: "20" },
        { word: "C#", size: "20" },
        { word: "Java", size: "20" },
        { word: ".Net Framework", size: "20" },
        { word: "Spring Framework", size: "20" },
        { word: "Vue.js", size: "20" },
        { word: "React", size: "20" },]
    }
  },
  mounted() {
    console.log(this.$data.d3Size)
    this.$data.d3Size.width = ((window.innerWidth / 10 * 9) - this.$data.d3Size.margin.left - this.$data.d3Size.margin.right)
    this.$data.d3Size.height = ((this.$data.d3Words.length * (this.$data.defaultWordHeight + 20)) - this.$data.d3Size.margin.top - this.$data.d3Size.margin.bottom)
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
        .attr("width", (width + margin.left + margin.right))
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
      // Constructs a new cloud layout instance. It run an algorythm to find the position of words that suits your requirements
      // Wordcloud features that are different from one word to the other must be here
      this.$data.d3Layer = d3Cloud()
        .size([width, height])
        .words(myWords.map(function (d) { console.log(d); return { text: d.word, size: d.size, dark: d.dark }; }))
        .padding(5)        //space between words
        // .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .fontSize(function (d) { return d.size; })      // font size of words
        .on("end", this.d3LayerDraw)
      this.$data.d3Layer.start();
    },
    d3LayerDraw(words) {
      console.log('0--------')
      console.log(words)
      var _this = this;
      var defaultY = this.$data.defaultWordHeight;
      var transY = defaultY - (this.$data.d3Size.height / 2);
      this.$data.d3Svg
        .append("g")
        .attr("transform", "translate(" + this.$data.d3Layer.size()[0] * 0.5 + "," + this.$data.d3Layer.size()[1] * 0.5 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size",
          function (d) {
            if (d.dark) return 35;
            else return d.size;
          })
        .style("fill", function (d) {
          if (d.dark)
            return "#000"
          else
            return (Math.random() >= 0.3 ? "#9579DB" : "#B9B8ED");
        })
        .attr("text-anchor", "middle")
        .style("font-family", "Georgia, serif")
        .style("font-variant", "normal")
        .transition()
        .duration(600)
        .attr("transform", function (d) {
          console.log(d)
          if (d.text.indexOf("MaSungmin") > -1)
            return "translate(" + [d.x, defaultY - (_this.$data.d3Size.height / 2)] + ")";
          else
            return "translate(" + [d.x, (transY += 50)] + ")";
        })
        .text(function (d) { return d.text; })
    },
  }
}
</script>

