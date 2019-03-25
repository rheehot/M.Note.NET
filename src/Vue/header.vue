<template>
  <section>
    <ul class="nav nav-tabs">
      <li v-for="(head,idx) in headerList" v-bind:key="idx" v-bind:class="{active : (head.name == NowRouted)}">
        <router-link v-bind:to="head.path" v-bind:class="{title : (head.name == NowRouted)}">{{head.name}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import vueRouter from "VueConfig/router.js"
export default {
  name: "VueHeader",
  data() {
    return {
      headerList: vueRouter
    }
  },
  mounted() {
    console.log(this.$data.headerList);
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

  }

}
</script>
<style>
.title {
  font-family: Georgia, serif;
  /* font-size: 24px; */
  letter-spacing: -2px;
  word-spacing: 6px;
  color: #000000;
  font-weight: 700;
  /* text-decoration: none solid rgb(68, 68, 68); */
  font-style: italic;
  font-variant: normal;
  text-transform: capitalize;
}
</style>