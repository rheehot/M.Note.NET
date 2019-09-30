<template>
  <section>
    <div class="btn-group btn-block" role="group">
      <button type="button" class="btn btn-secondary" v-for="(mdCate , idx) in markdownCateList" v-bind:key="idx" v-bind:value="mdCate.category" v-on:click="onCateClick">
        {{mdCate.category}}
      </button>
    </div>
    <div class="card text-left">
              <ul  class="list-group list-group-flush" v-for="(mdCate , idx) in markdownCateList" v-bind:key="idx" v-show="clickedCateId == mdCate.category">
<li class="list-group-item" v-bind:class="{'list-group-item-secondary' : md.name==selectedMarkdown }" v-for="(md, mdIdx) in mdCate.mdList" v-on:click="CallGetMarkdown(md,mdCate.category)" v-bind:key="mdIdx">◆ {{md.name.replace(".md","")}}</li>
        </ul>
      <transition name="fade">

        
      </transition>
    </div>
    <loader v-bind:isLoading="isLoading"></loader>
    <post></post>
  </section>
</template>


<script>

import postVue from './blog/post.vue'
import loaderVue from './component/loader.vue'
export default {
  components: {
    post: postVue,
    loader: loaderVue,
  },
  data() {
    return {
      markdownit: require('markdown-it'),
      markdownCateList: [],
      isLoading: false,
      clickedCateId: "",
      selectedMarkdown: "",
    }
  },
  mounted() {
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
        var selected = localStorage.getItem("markdownCate:selected")
        var isExist = this.$data.markdownCateList.find(function (item, i) {
          if (item.category === selected) return true;
        });
        if (isExist) this.$data.clickedCateId = selected
      }
    }
  },
  methods: {
    onCateClick(e) {
      console.log(e)
      this.$data.clickedCateId = e.target.value
      //localStorage.setItem("markdownCate:selected", this.$data.clickedCateId);
    },
    CallGetMarkdown(markdownData, category) {
      var _this = this;
      this.$data.selectedMarkdown = markdownData.name;
      this.$router.push({
        name: "Blog", params: {
          post: `${this.$data.clickedCateId}_${this.$data.selectedMarkdown}`
        }
      })
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
.styleNav {
  padding: 7px 15px !important;
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
} */
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>