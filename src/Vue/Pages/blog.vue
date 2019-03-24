<template>
    <section>
        <div v-for="(mdCate , idx) in markdownList" v-bind:key="idx">
        {{mdCate.category}}
        <button v-for="(md, mdIdx) in mdCate.mdList" v-bind:key="mdIdx" v-on:click="mdChange" v-bind:value="md.category + '/' + md.filename">{{md.filename}}</button>
        </div>
        <br />--------------------------------------------------------------<br />
        <div v-show="isLoading"> loading... </div><br/>
        <article v-show="!isLoading" class="markdown-body" v-html="md"></article>
    </section>
</template>


<script>
export default {
     data() {
    return {
      msg: "This is MaSungNote.NET",
      markdownList: [],
      md: "",
      isLoading: false,
    }
  },
  mounted() {

    console.log(__markdownList__)
    this.$data.markdownList = __markdownList__
    // this.$data.md = mark;
  },
  methods: {
    mdChange(e) {
      console.log(e.target.value);
      var targetMd = `./md/${e.target.value}`;
      var _this = this;
      this.$data.isLoading = true;
      this.importMardkdownn(targetMd).then(target => {
        _this.$data.md = target
        _this.$data.isLoading = false;
      })
    },
    async importMardkdownn(targetMd) {
      var result = await import(`${targetMd}`)
      return result;
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