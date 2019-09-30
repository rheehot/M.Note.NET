<template>
  <article class="markdown-body" v-html="markdownContents"></article>
</template>


<script>   
import historyMD from './history/history.md'
export default {
    data(){
      return {
        markdownContents:"",
        markdownit:null,
      }
    },
    mounted(){
      this.$data.markdownit = require('markdown-it')({
        html: true
      });
      this.$data.markdownContents = this.$data.markdownit.render(historyMD)
    }
}
</script>

<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>