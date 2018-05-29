<template>
  <div>
    <Appbar></Appbar>
    <div>hello</div>
  </div>
</template>
<script>
  import Appbar from '../components/Appbar.vue'
  export default {
    components: {Appbar},
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('/test.php', null, r => {
          console.log(r);
        })
      }
    }
  }

</script>
