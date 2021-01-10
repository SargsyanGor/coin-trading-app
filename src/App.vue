<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "./components/globalUsage/Header.vue";

@Component({
  components: { Header }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.theme--dark.v-application {
  background-color: $mainBg !important;
  .v-application--wrap {
    padding: 50px 97px;
    @include respond-below(sm) {
      padding: 50px 70px;
    }
    @include respond-below(xs) {
      padding: 50px 35px;
    }
  }
}
</style>
