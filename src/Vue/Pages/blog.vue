<template>
  <section>
    <p>
      <a v-on:click="onCateClick" class="btn" data-toggle="collapse" v-bind:href="'#collapse' + idx" aria-expanded="false" v-bind:aria-controls="'collapse' + idx" v-for="(mdCate , idx) in markdownCateList" v-bind:key="idx">
        {{mdCate.category}}
      </a>
    </p>
    <div class="collapse" v-bind:id="'collapse' + idx" v-for="(mdCate , idx) in markdownCateList" v-bind:key="idx">
      <div class="card card-body">
        <a class="btn" v-for="(md, mdIdx) in mdCate.mdList" href="javascript:;" v-on:click="GetMarkdown(md)" v-bind:key="mdIdx">{{md.name.replace(".md","")}}</a>
      </div>
    </div>
    <span v-if="isLoading">Category Loading now....</span>
    <span v-if="isContentLoading">Contents Loading now....</span>
    <article class="markdown-body" v-if="!isContentLoading" v-html="markdownContents"></article>
  </section>
</template>


<script>
import markdownit from 'markdown-it';

export default {
  data() {
    return {
      markdownCateList: [],
      markdownContents: "",
      isLoading: false,
      isContentLoading: false,
    }
  },
  mounted() {
    var data = JSON.parse(localStorage.getItem("markdownCateList"))
    if (typeof data === 'undefined' || !data) {
      this.GetMardownList();
    } else {
      if (data.timestamp <= new Date().getTime()) {
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
      for (var i = 0; i < this.$data.markdownCateList.length; i++) {
        var id = 'collapse' + i;
        if (e.target.id != id) {
          document.getElementById(id).className = "collapse"
        }
      }
      console.log(e)
    },
    GetMarkdown(markdownData) {
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
          _this.$data.markdownContents = markdownit.render(response);
        });
    },
    GetMardownList() {
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
</style>