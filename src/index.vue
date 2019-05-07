<template>
  <div>
    <header-vue></header-vue>
    <div class="container">
      <div class="row mb-2">
        <div class="col-md-6">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <footer-vue></footer-vue>
  </div>
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
