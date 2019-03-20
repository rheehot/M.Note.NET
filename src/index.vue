<template>
  <section>
    {{msg}}
    <section v-html="md"></section>
  </section>

</template>
<script>
import mark from './markdown/sample.md'
export default {
  data() {
    return {
      msg: "This is MaSungNote.NET",
      md: "",
    }
  },
  mounted() {
    this.$data.md = mark;
  }
}

</script>