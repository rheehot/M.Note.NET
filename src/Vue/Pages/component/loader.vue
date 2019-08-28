<template>
  <div class="d-flex justify-content-center" v-if="isLoading">
    <div class="spinner-grow" style="width: 4rem; height: 4rem;margin-top:5rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isLoading"]
}
</script>

<style>
</style>