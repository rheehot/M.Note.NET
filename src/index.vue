<template>
  <section>
    {{msg}}
    <article class="markdown-body" v-html="md"></article>
  </section>

</template>
<script>
import mark from './markdown/sample.md'
export default {
  data() {
    return {
      msg: "This is MaSungNote.NET",
      md: "",
    }
  },
  mounted() {
    this.$data.md = mark;
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