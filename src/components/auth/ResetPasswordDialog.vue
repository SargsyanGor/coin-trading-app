<template>
  <v-dialog
    v-model="show"
    :width="!resetProcessConfirmed ? 600 : ''"
    max-width="726"
    content-class="gs_reset_password_dialog"
    overlay-color="#000"
    overlay-opacity="0.5"
    transition="scale-transition"
    origin="center center"
  >
    <div class="gs_header_close_btn_wrapper">
      <v-btn
        color="transparent"
        absolute
        right
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
    <transition name="fade" mode="out-in">
      <v-card
        class="gs_reset_link_form_wrapper"
        color="transparent"
        elevation="0"
        v-if="!resetProcessConfirmed"
        key="1"
      >
        <v-card-title class="justify-center">
          {{ $t("auth.forget_your_pass") }}
        </v-card-title>

        <v-card-text class="text-sm-center">
          {{ $t("auth.pass_reset_info") }}
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
      <v-card
        color="transparent"
        elevation="0"
        class="mt-0 gs_reset_link_confirmed_wrapper"
        key="2"
        v-else
      >
        <v-list-item two-line>
          <v-list-item-avatar tile size="110" class="mt-0 mb-sm-0 mb-10 mr-0 mr-sm-12">
            <v-img
              max-width="110px"
              max-height="110px"
              contain
              src="@/assets/icons/checked-green.svg"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="align-self-start pt-0 text-center text-sm-left">
            <v-list-item-title class="mb-5">
              {{ $t("auth.reset_link_sent") }}
            </v-list-item-title>
            <v-list-item-subtitle
              v-html="$t('auth.we_have_sent_password')"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </transition>
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
    resetProcessConfirmed: false,
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
        if (!value) {
          this.resetProcessConfirmed = false;
        }
        this.$emit("input", value);
      }
    }
  },
  methods: {
    validatePassReset() {
      let validationSuccess = this.$refs.form.validate();
      if (validationSuccess) {
        this.resetProcessConfirmed = true;
      }
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
  @include respond-below(xs) {
    padding: 25px 15px;
  }
  .gs_header_close_btn_wrapper {
    position: relative;
    min-height: 40px;
  }
  .v-card.gs_reset_link_form_wrapper {
    margin-top: 40px;
    .v-card__title {
      font-family: $proximaBold;
      font-style: normal;
      font-size: 26px;
      line-height: 24px;
      letter-spacing: 0.325px;
      margin-bottom: 12px;
      @include respond-below(xs) {
        font-size: 18px;
        line-height: 16px;
      }
    }
    .v-card__text {
      font-family: $proximaReg;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 32px;
      opacity: 0.5;
      margin-bottom: 40px;
      @include respond-below(xs) {
        font-size: 16px;
        line-height: 28px;
      }
    }
    .gs_reset_pass_btn {
      margin-top: 18px;
      @include greenBtn();
    }
  }
  .v-card.gs_reset_link_confirmed_wrapper {
    margin-bottom: 35px;
    @include respond-below(xs) {
      margin-bottom: 0;
    }
    .v-list-item {
      .v-list-item__title {
        font-family: $proximaBold;
        font-style: normal;
        font-weight: bold;
        font-size: 26px;
        line-height: 24px;
        letter-spacing: 0.325px;
        @include respond-below(sm) {
          font-size: 22px;
          line-height: 18px;
        }
        @include respond-below(xs) {
          font-size: 16px;
          line-height: 18px;
        }
      }
      .v-list-item__subtitle {
        font-family: $proximaReg;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 30px;
        mix-blend-mode: normal;
        opacity: 0.5;
        @include respond-below(sm) {
          font-size: 18px;
          line-height: 28px;
          white-space: initial!important;
          overflow: initial!important;
          text-overflow: initial!important;
          br {
            display: none;
          }
        }
        @include respond-below(xs) {
          font-size: 16px;
        }
      }
      @include respond-below(xs) {
        flex-direction: column;
      }
    }
  }
}
</style>
