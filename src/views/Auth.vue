<template>
  <div class="gs_auth_wrapper">
    <transition name="fade" mode="out-in">
      <LoginForm
        key="1"
        @showSignUpForm="activateSignUpComponent()"
        v-if="accountExists"
      />
      <SignUpForm key="2" @showLoginForm="activateLoginComponent()" v-else />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LoginForm from "../components/auth/LoginForm.vue";
import SignUpForm from "../components/auth/SignUpForm.vue";

@Component({
  components: { LoginForm, SignUpForm }
})
export default class Auth extends Vue {
  accountExists: boolean = true;

  activateSignUpComponent(): void {
    this.accountExists = false;
  }

  activateLoginComponent(): void {
    this.accountExists = true;
  }
}
</script>
