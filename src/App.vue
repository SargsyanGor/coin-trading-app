<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
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
  background: $mainBg !important;
  .v-application--wrap {
    padding: 50px 97px;
  }
}
</style>
