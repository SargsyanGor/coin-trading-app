<template>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, vero!
  </p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Account extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Getter
  private isLoggedIn!: boolean;

  // need to be removed(fake success for UI)-------------------------
  @Auth.Mutation
  private loginSuccess!: () => void;

  mounted() {
    // need to be removed(fake success for Header UI)-------------------------
    this.loginSuccess();
    console.log(this.isLoggedIn);
  }
}
</script>

<style scoped></style>
