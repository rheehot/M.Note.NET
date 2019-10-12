<template>
  <div>
    <header-vue></header-vue>
    <div class="container">
      <div class="row mb-2">
        <div class="col-md-12">
          <transition name="fade" mode="out-in" >
            <router-view></router-view>
          </transition>
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
<style>
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
