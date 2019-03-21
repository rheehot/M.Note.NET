<template>
  <section>
    {{msg}}<br />
    LIST
    --------------------------------------------------------------<br />
    <button v-for="(md , idx) in mdlist" v-bind:key="idx" v-on:click="mdChange" v-bind:value="md.filename">{{md.filename}}</button>
    <br />
    --------------------------------------------------------------<br />
    <article class="markdown-body" v-html="md"></article>
  </section>

</template>
<script>
import mark from './markdown/sample.md'

export default {
  data() {
    return {
      msg: "This is MaSungNote.NET",
      mdlist: "",
      md: "",
    }
  },
  mounted() {

    console.log(__markdownList__)
    this.$data.mdlist = __markdownList__
    this.$data.md = mark;
  },
  methods: {
    mdChange(e) {
      var _this = this;
      console.log(e.target.value);
      var targetMd = `./markdown/${e.target.value}`;
      import(targetMd).then(target => {
        console.log(target)
        _this.$data.md = target
      })

    }

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