<template>
  <section>
    <div class="btn-group btn-block" role="group">
      <button type="button" class="btn btn-secondary" v-for="(mdCate , idx) in markdownCateList" v-bind:key="idx" v-bind:value="'collapse'+idx" v-on:click="onCateClick">
        {{mdCate.category}}
      </button>
    </div>
    <div class="card text-center">
      <transition-group tag="ul" name="fade" class="list-group list-group-flush" v-for="(mdCate , idx) in markdownCateList" v-bind:key="idx" v-show="clickedCateId == ('collapse'+idx)">
        <li class="list-group-item" v-for="(md, mdIdx) in mdCate.mdList" v-on:click="GetMarkdown(md,mdCate.category)" v-bind:key="mdIdx">◆ {{md.name.replace(".md","")}}</li>
      </transition-group>
    </div>
    <div class="d-flex justify-content-center" v-if="isLoading || isContentLoading">
      <div class="spinner-grow" style="width: 4rem; height: 4rem;margin-top:5rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <transition name="bounce">
      <article class="markdown-body" v-if="!isContentLoading" v-html="markdownContents"></article>
    </transition>
  </section>
</template>


<script>
export default {
  data() {
    return {
      markdownit: require('markdown-it'),
      markdownCateList: [],
      markdownContents: "",
      isLoading: false,
      isContentLoading: false,
      clickedCateId: "",
    }
  },
  mounted() {
    this.$data.markdownit = require('markdown-it')({
      html: true,
    });
    var data = JSON.parse(localStorage.getItem("markdownCateList"))
    if (typeof data === 'undefined' || !data) {
      this.GetMardownList();
    } else {
      if (data.timestamp <= (new Date().getTime() - 120000)) {
        console.log('updated')
        this.GetMardownList();
      } else {
        console.log('use before')
        this.$data.markdownCateList = data.markdownCateList
      }
    }
  },
  methods: {
    onCateClick(e) {
      console.log(e)
      this.$data.clickedCateId = e.target.value
    },
    GetMarkdown(markdownData, category) {
      var _this = this;
      _this.$data.isContentLoading = true;
      var url = markdownData.url
      console.log(url);
      var myRequest = new Request(url, { headers: new Headers({ 'accept': 'application/vnd.github.v3.raw' }) });
      fetch(myRequest)
        .then(function (response) {
          _this.$data.isContentLoading = false;
          if (!response.ok) return alert('페이지에 문제가 있습니다.')
          return response.text()
        })
        .then(function (response) {
          console.log(response)
          _this.$data.markdownContents = _this.$data.markdownit.render(response).replace(/.\/img/gi, `https://raw.githubusercontent.com/masungDEV/Note/master/${category}/img`);
        });
    },
    GetMardownList() {
      this.$data.isLoading = true;
      var _this = this;
      var url = "https://api.github.com/repos/masungDev/Note/contents/"
      var myRequest = new Request(url, { headers: new Headers({ 'accept': 'application/vnd.github.v3.raw' }) });
      fetch(myRequest)
        .then(function (response) {
          if (!response.ok) return alert('페이지에 문제가 있습니다.')
          return response.text()
        })
        .then(function (response) {
          JSON.parse(response).forEach(data => {
            if (data.type == 'dir') {
              console.log('ok - ' + data.name)
              _this.GetMarkdownsByCate(data)
            }
          })
        });
    },
    GetMarkdownsByCate(targetMarkdownCate) {
      var _this = this;
      var url = `https://api.github.com/repos/masungDev/Note/contents/${targetMarkdownCate.name}`
      var myRequest = new Request(url, { headers: new Headers({ 'accept': 'application/vnd.github.v3.raw' }) });
      fetch(myRequest)
        .then(function (response) {
          _this.$data.isLoading = false;
          if (!response.ok) return alert('페이지에 문제가 있습니다.')
          return response.text()
        })
        .then(function (response) {
          var mdList = [];
          JSON.parse(response).forEach(data => {
            if (data.type == 'file') {
              mdList.push(data)
            }
          })
          _this.$data.markdownCateList.push({
            category: targetMarkdownCate.name,
            mdList: mdList,
          });
          console.log(_this.$data.markdownCateList)
          localStorage.setItem("markdownCateList", JSON.stringify({
            markdownCateList: _this.$data.markdownCateList,
            timestamp: new Date().getTime(),
          }));
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
.styleNav {
  padding: 7px 15px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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