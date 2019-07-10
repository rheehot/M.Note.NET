<template>
  <div class="container">
    <header class="blog-header py-3">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <!-- <div class="col-4 pt-1">
          <a class="text-muted" href="#">Subscribe</a>
        </div> -->
        <div class="col-8 text-left">
          <a class="blog-header-logo text-dark" href="#">Masung.Note</a>
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center">
          <!-- <a class="text-muted" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24" focusable="false">
              <title>Search</title>
              <circle cx="10.5" cy="10.5" r="7.5"></circle>
              <path d="M21 21l-5.2-5.2"></path>
            </svg>
          </a> -->
          <!-- <a class="btn btn-sm btn-outline-secondary" href="#">Contact</a> -->
        </div>
      </div>
    </header>
    <div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-between">
        <router-link class="p-2 text-muted" v-bind:to="head.path" v-for="(head,idx) in headerList" v-bind:key="idx" v-bind:class="{active : (head.name == NowRouted)}">{{head.name}}</router-link>
      </nav>
    </div>
    <!-- <ul class="nav flex-column custom-header">
      <li v-for="(head,idx) in headerList" v-bind:key="idx" class="nav-item" v-bind:class="{active : (head.name == NowRouted)}">
        <router-link v-bind:to="head.path" v-bind:class="{title : (head.name == NowRouted)}">{{head.name}}</router-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
import vueRouter from "VueConfig/router.js"
export default {
  name: "VueHeader",
  data() {
    return {
      headerList: vueRouter,
      // scrollEffect
      hasScroll: false,
      navBarTop: 0,
      location: 10,
      navbarHeight: 50
    }
  },
  mounted() {
    console.log(this.$data.headerList);
    this.SetHeaderMoveControll();
  },
  watch: {
    $route() {
      console.log(this.$route)
    }
  },
  computed: {
    NowRouted() {
      return this.$route.name;
    }
  },
  methods: {
    SetHeaderMoveControll() {
      var _this = this;
      window.document.body.onscroll = function () {
        _this.$data.hasScroll = true;
      }
      setInterval(function () {
        if (_this.$data.hasScroll) {
          // 접근하기 쉽게 현재 스크롤의 위치를 저장한다. 
          var st = $(this).scrollTop(); // 설정한 delta 값보다 더 스크롤되었는지를 확인한다. 
          if (Math.abs(_this.$data.navBarTop - st) <= location) return; // 헤더의 높이보다 더 스크롤되었는지 확인하고 스크롤의 방향이 위인지 아래인지를 확인한다. 
          // If current position > last position AND scrolled past navbar... 
          if (st > _this.$data.navBarTop && st > _this.$data.navbarHeight) {
            // Scroll Down 
            $(".custom-header").removeClass('nav-down').addClass('nav-up');
          } else {
            $(".custom-header").removeClass('nav-up').addClass('nav-down');
          } // this.$data.navBarTop 에 현재 스크롤위치를 지정한다. 
          _this.$data.navBarTop = st;
          _this.$data.hasScroll = false;
        }
      }, 250);
    }
  }

}
</script>
<style>
.blog-header-logo {
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  font-size: 2.25rem;
}
.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: top 0.2s ease-in-out;
  background-color: #fff;
  z-index: 999;
}
.nav-up {
  top: -50px;
}
a {
  color: #9579db;
  font-family: Georgia, serif;
  font-size: 1.1em;
}
.title {
  font-family: Georgia, serif;
  /* font-size: 24px; */
  color: #000000;
  font-size: 1.1em;
  font-weight: 700;
  font-variant: normal;

  /* text-decoration: none solid rgb(68, 68, 68); */
  /* font-style: italic;
  
  text-transform: capitalize; */
}
</style>