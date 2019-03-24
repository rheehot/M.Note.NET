<template>
<section>
  <ul class="nav nav-tabs">
    <li v-for="(head,idx) in headerList" v-bind:key="idx" v-bind:class="{active : (head.name == NowRouted)}">
      <router-link v-bind:to="head.path">{{head.name}}</router-link>
    </li>
  </ul>
</section>
</template>

<script>
import vueRouter from "VueConfig/router.js"
export default {
  name: "VueHeader",
  data(){
    return {
      headerList : vueRouter
    }
  },
  mounted(){
    console.log(this.$data.headerList);
  },
  watch:{
    $route(){
      console.log(this.$route)
    }
  },
  computed:{
    NowRouted(){
      return this.$route.name;
    }
  
  }

}
</script>