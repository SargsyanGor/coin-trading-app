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

<script>
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

export default {
  name: "Home",
  components: { LoginForm, SignUpForm },
  data: () => ({
    accountExists: true
  }),
  methods: {
    activateSignUpComponent() {
      this.accountExists = false;
    },
    activateLoginComponent() {
      this.accountExists = true;
    }
  }
};
</script>
