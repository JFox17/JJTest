<template>
  <div id="app">
    <div class="container">
      <window :onForm="onForm" />
    </div>
  </div>
</template>
<script>
import Window from './components/Window.vue';
export default  {
  name: 'app',
  components: { Window },
  data() {
    return {
      newCard: '',
    }
  },
  methods: {
    onForm(date) {
      this.newCard = date
      console.log(this.newCard)
    }
  }
}
</script>
<style lang="scss">
body {
  background: antiquewhite;
}
.container {
  margin: 0 auto;
}
</style>