<template>
  <section>
    {{msg}}<br />
    LIST
    --------------------------------------------------------------<br />
    <div v-for="(mdCate , idx) in markdownList" v-bind:key="idx">
      {{mdCate.category}}
      <button v-for="(md, mdIdx) in mdCate.mdList" v-bind:key="mdIdx" v-on:click="mdChange" v-bind:value="md.category + '/' + md.filename">{{md.filename}}</button>
    </div>
    <br />--------------------------------------------------------------<br />
    <article class="markdown-body" v-html="md"></article>
  </section>

</template>
<script>
export default {
  data() {
    return {
      msg: "This is MaSungNote.NET",
      markdownList: [],
      md: "",
    }
  },
  mounted() {

    console.log(__markdownList__)
     this.$data.markdownList = __markdownList__
    // this.$data.md = mark;
  },
  methods: {
    mdChange(e) {
      var _this = this;
      console.log(e.target.value);
      var targetMd = `./markdown/${e.target.value}`;
      import( /* webpackChunkName: "[request]" */ `${targetMd}`).then(target => {
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