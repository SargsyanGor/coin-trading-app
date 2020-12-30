<template>
  <div class="gs_auth_wrapper">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/auth/LoginForm";
export default {
  name: "Home",
  components: { LoginForm }
};
</script>
