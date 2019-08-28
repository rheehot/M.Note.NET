<template>
  <section>
    <loader v-bind:isLoading="isContentLoading"></loader>
    <transition name="bounce">
      <article class="markdown-body" v-if="!isContentLoading" v-html="markdownContents"></article>
    </transition>
  </section>
</template>

<script>
import 'highlight.js/styles/github-gist.css';
import loaderVue from '../component/loader.vue'
export default {
  components: {
    loader: loaderVue
  },
  data() {
    return {
      isContentLoading: false,
      markdownContents: "",
      markdownit: null,
    }
  },
  mounted() {
    var hljs = require('highlight.js');
    this.$data.markdownit = require('markdown-it')({
      html: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) { }
        }
        return '';
      }
    });
    var post = this.$route.params.post.split('_')
    this.GetMarkdown(post[0], post[1])
  },
  watch: {
    $route: function () {
      console.log("route", this.$route);
      var post = this.$route.params.post.split('_')
      this.GetMarkdown(post[0], post[1])
    }
  },
  methods: {
    GetMarkdown(category, markdownname) {
      if (typeof category === 'undefined' || category == '' || category == null)
        return;
      if (typeof markdownname === 'undefined' || markdownname == '' || markdownname == null)
        return;
      var _this = this;
      _this.$data.isContentLoading = true;
      var url = `https://api.github.com/repos/DevMaSung/M.Note/contents/${category}/${markdownname}?ref=master`
      console.log(url);
      var myRequest = new Request(url, { headers: new Headers({ 'accept': 'application/vnd.github.v3.raw' }), cache: "reload" });
      fetch(myRequest)
        .then(function (response) {
          _this.$data.isContentLoading = false;
          if (!response.ok) return alert('페이지에 문제가 있습니다.')
          return response.text()
        })
        .then(function (response) {
          _this.$data.isContentLoading = false;
          _this.$data.markdownContents = _this.$data.markdownit.render(response).replace(/.\/img/gi, `https://raw.githubusercontent.com/masungDEV/Note/master/${category}/img`);
        });
    },
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
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-in 0.8s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>