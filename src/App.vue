<template>
  <v-app>
    <Header />
    <v-main> </v-main>
  </v-app>
</template>

<script>
import Header from "./components/globalUsage/Header";

export default {
  name: "App",

  components: {
    Header
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
.v-application {
}
</style>
