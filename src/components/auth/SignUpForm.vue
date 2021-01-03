<template>
  <v-container fluid class="gs_sign_up_container">
    <v-row class="justify-center">
      <v-col cols="6">
        <h2>{{ $t("auth.sign_up") }}</h2>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="6" class="pa-0">
        <v-form ref="form" v-model="validSignUp" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <h5>{{ $t("global.name") }}</h5>
                <v-text-field
                  v-model="name"
                  :rules="[nameRules.required]"
                  :placeholder="$t('auth.write_name')"
                  height="68"
                  solo
                  flat
                  aria-required="true"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <h5>{{ $t("global.email") }}</h5>
                <v-text-field
                  v-model="email"
                  :rules="[emailRules.required, emailRules.validEmail]"
                  :placeholder="$t('auth.write_email')"
                  type="email"
                  height="68"
                  solo
                  flat
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <h5>{{ $t("global.phone_number") }}</h5>
                <v-text-field
                  v-model="phoneNumber"
                  :rules="[phoneNumberRules.required]"
                  :placeholder="$t('auth.input_phone_number')"
                  type="number"
                  height="68"
                  solo
                  flat
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <h5>{{ $t("global.password") }}</h5>
                <v-text-field
                  v-model="password"
                  :append-icon="
                    showPassword ? $t('auth.hide') : $t('auth.view')
                  "
                  :rules="[passwordRules.required, passwordRules.min]"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('auth.input_pass_2')"
                  @click:append="showPassword = !showPassword"
                  hint="At least 8 characters"
                  class="gs_sign_up_password"
                  height="68"
                  flat
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  class="gs_id_uploader_input"
                  :rules="[idRules.required]"
                  :placeholder="$t('auth.upload_id')"
                  prepend-icon=""
                  outlined
                  flat
                  solo
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h5>{{ $t("auth.referral_code") }}</h5>
                <v-text-field
                  v-model="referral_code"
                  :placeholder="$t('auth.input_code')"
                  height="68"
                  solo
                  flat
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="justify-center d-flex">
                <v-btn
                  width="100%"
                  height="70"
                  max-width="473px"
                  class="gs_sign_up_btn"
                  @click="validateSignUp()"
                >
                  {{ $t("auth.sign_up") }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="justify-center d-flex align-center gs_account_exists_bottom_info"
              >
                <p class="mb-0">{{ $t("auth.have_account") }}</p>
                <v-btn
                  depressed
                  color="transparent"
                  class="pa-1"
                  plain
                  @click="$emit('showLoginForm')"
                >
                  {{ $t("auth.log_in") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { formValidationRules } from "../../mixins/formValidationRules";

export default {
  name: "SignUpForm",
  mixins: [formValidationRules],
  data: () => ({
    validSignUp: true,
    name: "",
    email: "",
    phoneNumber: "",
    showPassword: false,
    referral_code: "",
    password: ""
  }),
  methods: {
    validateSignUp() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss" scoped>
.gs_sign_up_container {
  margin-top: 125px;
  h2 {
    font-family: $proximaBold;
    font-style: normal;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0.4px;
    margin-bottom: 25px;
  }
  h5 {
    font-family: $proximaReg;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 22px;
    mix-blend-mode: normal;
    opacity: 0.5;
    margin-bottom: 18px;
  }
  .gs_sign_up_password {
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
          font-size: 20px;
          line-height: 22px;
          text-transform: capitalize;
          color: $mainBlue !important;
        }
      }
    }
  }
  .gs_id_uploader_input {
    ::v-deep .v-input__slot {
      border: 1px solid $mainBlue;
      .v-file-input__text {
        font-family: $proximaBold;
        font-style: normal;
        font-size: 20px;
        line-height: 22px;
        justify-content: center;
        color: #ffffff;
      }
    }
  }
  .v-btn.gs_sign_up_btn {
    margin-top: 18px;
    @include greenBtn();
  }
  .gs_account_exists_bottom_info {
    p {
      font-family: $proximaReg;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 18px;
    }
    .v-btn {
      font-family: $proximaBold;
      font-style: normal;
      font-size: 18px;
      line-height: 18px;
      color: $greenBtn;
      margin-left: 5px;
      letter-spacing: 0.1px;
    }
  }
}
</style>
