<template>
  <section>
    <header-vue></header-vue>
    {{msg}}<br />
    LIST
    --------------------------------------------------------------<br />
    <div v-for="(mdCate , idx) in markdownList" v-bind:key="idx">
      {{mdCate.category}}
      <button v-for="(md, mdIdx) in mdCate.mdList" v-bind:key="mdIdx" v-on:click="mdChange" v-bind:value="md.category + '/' + md.filename">{{md.filename}}</button>
    </div>
    <br />--------------------------------------------------------------<br />
    <div v-show="isLoading"> loading... </div></br>
    <article v-show="!isLoading" class="markdown-body" v-html="md"></article>
    <footer-vue></footer-vue>
  </section>
</template>
<script>
import headerVue from 'View/header.vue'
import footerVue from 'View/footer.vue'
export default {
  components: {
    "header-vue": headerVue,
    "footer-vue": footerVue,
  },
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
      var targetMd = `./markdown/${e.target.value}`;
      var _this = this;
      _this.$data.isLoading = true;
      this.$nextTick(() => {

        this.importMardkdownn(targetMd).then(target => {
          _this.$data.md = target
          _this.$data.isLoading = false;
        })

      })
    },
    async importMardkdownn(targetMd) {
      var result = await import( /* webpackChunkName: "청크네임" */ `${targetMd}`)
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