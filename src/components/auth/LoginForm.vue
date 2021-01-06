<template>
  <v-container fluid class="gs_login_container">
    <v-row class="justify-center">
      <v-col sm="9" md="8" lg="4">
        <h2 class="text-md-left text-center">{{ $t("auth.log_in") }}</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h5>{{ $t("global.email") }}</h5>
          <v-text-field
            v-model="email"
            :rules="[emailRules.required, emailRules.validEmail]"
            :placeholder="$t('auth.input_email')"
            height="68"
            solo
            flat
          ></v-text-field>
          <h5>{{ $t("global.password") }}</h5>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? $t('auth.hide') : $t('auth.view')"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('auth.input_pass')"
            @click:append="showPassword = !showPassword"
            hint="At least 8 characters"
            class="gs_sign_in_password"
            height="68"
            flat
            solo
          ></v-text-field>
          <div class="d-flex flex-column justify-center align-center">
            <v-btn
              depressed
              color="transparent"
              class="gs_forget_btn"
              @click.stop="showResetPassDialog = true"
            >
              {{ $t("auth.forget_pass") }}
            </v-btn>
            <v-btn
              width="100%"
              height="70"
              max-width="473px"
              class="gs_login_btn"
              @click="validate()"
            >
              {{ $t("auth.log_in") }}
            </v-btn>
            <div class="d-flex align-center gs_account_missed_bottom_info">
              <p class="mb-0">{{ $t("auth.dont_have_account") }}</p>
              <v-btn
                depressed
                color="transparent"
                class="pa-1"
                plain
                @click="$emit('showSignUpForm')"
              >
                {{ $t("auth.sign_up") }}
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <!--Reset password dialog included below-->
    <ResetPasswordDialog v-model="showResetPassDialog" />
  </v-container>
</template>

<script>
import ResetPasswordDialog from "./ResetPasswordDialog";
import { formValidationRules } from "@/mixins/formValidationRules";

export default {
  name: "LoginForm",
  components: { ResetPasswordDialog },
  mixins: [formValidationRules],
  data: () => ({
    showResetPassDialog: false,
    valid: true,
    email: "",
    showPassword: false,
    password: ""
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss" scoped>
.gs_login_container {
  margin-top: 100px;
  h2 {
    font-family: $proximaBold;
    font-style: normal;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0.4px;
    margin-bottom: 40px;
  }
  h5 {
    font-family: $proximaReg;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
    mix-blend-mode: normal;
    opacity: 0.5;
    margin-bottom: 20px;
  }
  .gs_sign_in_password {
    ::v-deep .v-input__slot {
      .v-text-field__slot {
        padding-right: 22px;
      }
      .v-text-field__details {
        text-align: right !important;
      }
      .v-input__append-inner {
        font-size: 50px;
        button {
          font-family: $proximaReg;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 20px;
          text-transform: capitalize;
          color: $mainBlue !important;
        }
      }
    }
  }
  .gs_forget_btn.v-btn {
    font-family: $proximaReg;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: $greenBtn;
    margin-bottom: 35px;
  }
  .gs_login_btn.v-btn {
    margin-bottom: 25px;
    @include greenBtn();
  }
  .gs_account_missed_bottom_info {
    p {
      font-family: $proximaReg;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 16px;
      @include respond-below(xs) {
        font-size: 16px;
        line-height: 16px;
      }
    }
    .v-btn {
      font-family: $proximaBold;
      font-style: normal;
      font-size: 16px;
      line-height: 16px;
      color: $greenBtn;
      margin-left: 5px;
      letter-spacing: 0.1px;
      @include respond-below(xs) {
        font-size: 16px;
        line-height: 16px;
      }
    }
  }
}
</style>
