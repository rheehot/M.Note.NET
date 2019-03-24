<template>
  <section>
    <header-vue></header-vue>
    <router-view></router-view>
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
    }
  },
}

</script>
