<template>
  <v-dialog
    v-model="show"
    width="600"
    content-class="gs_reset_password_dialog"
    overlay-color="#000"
    overlay-opacity="0.5"
    transition="scale-transition"
    origin="center center"
  >
    <div class="text-sm-right">
      <v-btn
              color="transparent"
              depressed
              small
              fab
              @click.stop="show = false"
      >
        <v-img
                max-height="38"
                max-width="38"
                contain
                src="@/assets/icons/closeIcon.svg"
        ></v-img>
      </v-btn>
    </div>
    <v-card color="transparent" elevation="0">
      <v-card-title class="headline justify-center">
          {{ $t('auth.forget_your_pass') }}
      </v-card-title>

      <v-card-text class="text-sm-center">
        {{ $t('auth.pass_reset_info') }}
      </v-card-text>

      <v-form ref="form" v-model="validPassReset" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="[emailRules.required, emailRules.validEmail]"
          :placeholder="$t('auth.input_email')"
          height="68"
          solo
          flat
        ></v-text-field>
        <v-btn
          width="100%"
          height="70"
          class="gs_reset_pass_btn"
          @click="validatePassReset()"
        >
          {{ $t("auth.sent") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ResetPasswordDialog",
  props: {
    value: Boolean
  },
  data: () => ({
    validPassReset: false,
    email: "",
    emailRules: {
      required: v => !!v || "E-mail is required",
      validEmail: v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    }
  }),
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    validatePassReset() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .gs_reset_password_dialog {
  position: relative;
  border-radius: 51px;
  padding: 40px;
  background: $mainBg;
  .v-card {
    margin-top: 40px;
    .v-card__title {
      font-family:$proximaBold;
      font-style: normal;
      font-size: 26px;
      line-height: 24px;
      letter-spacing: 0.325px;
      margin-bottom: 12px;
    }
    .v-card__text {
      font-family: $proximaReg;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 32px;
      opacity: 0.5;
      margin-bottom: 40px;
    }
    .gs_reset_pass_btn {
      margin-top: 18px;
      @include greenBtn();
    }
  }
}
</style>
