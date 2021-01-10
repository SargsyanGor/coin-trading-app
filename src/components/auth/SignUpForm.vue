<template>
  <v-container fluid class="gs_sign_up_container">
    <v-row class="justify-center">
      <v-col sm="9" md="9" lg="6">
        <h2 class="text-md-left text-center pl-3">{{ $t("auth.sign_up") }}</h2>
        <v-form ref="form" v-model="validSignUp" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
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
                <transition name="fade" mode="out-in">
                  <v-file-input
                    accept="image/x-png,image/gif,image/jpeg"
                    class="gs_id_uploader_input"
                    :rules="[idRules.required]"
                    :placeholder="$t('auth.upload_id')"
                    prepend-icon=""
                    outlined
                    flat
                    solo
                    @change="onChangeId"
                    v-if="idDataSource === null"
                  ></v-file-input>
                  <v-card
                    class="gs_uploaded_id_scope_wrapper mb-4"
                    color="transparent"
                    elevation="0"
                    v-else
                  >
                    <v-list-item
                      three-line
                      class="pa-0 flex-column flex-md-row"
                    >
                      <v-list-item-avatar
                        tile
                        width="207"
                        height="143"
                        color="transparent"
                      >
                        <v-img
                          :src="idDataSource"
                          width="100%"
                          height="100%"
                          cover
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <div class="text-h6">
                          {{ $t("auth.your_id") }}
                        </div>
                        <v-list-item-title class="headline mb-1">
                          {{ uploadedIdName }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <v-btn
                            depressed
                            plain
                            color="transparent"
                            class="pa-0"
                            @click="idDataSource = null"
                          >
                            {{ $t("auth.upload_again") }}</v-btn
                          >
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </transition>
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
    <!-- File upload error dialog -->
    <v-dialog v-model="fileLoadErrorDialog" max-width="500">
      <v-card class="pt-10 pa-5" outlined>
        <v-alert class="text-center" dense outlined type="error">
          {{ $t("auth.upload_error") }}
        </v-alert>
        <v-card-actions class="justify-center">
          <v-btn
            color="white darken-1"
            text
            @click="fileLoadErrorDialog = false"
          >
            {{ $t("global.ok") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import FormValidationRules from "@/mixins/FormValidationRules";

@Component
export default class SignUpForm extends Mixins(FormValidationRules) {
  validSignUp: boolean = true;
  name: string = "";
  email: string = "";
  phoneNumber: any = "";
  showPassword: boolean = false;
  referral_code: string = "";
  password: string = "";
  idDataSource: any = null;
  fileLoadErrorDialog: boolean = false;
  uploadedIdName: string = "";

  validateSignUp() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  onChangeId(event: any) {
    if (!event) {
      this.fileLoadErrorDialog = true;
    }
    this.uploadedIdName = event.name;
    let reader = new FileReader();
    // Use the javascript reader object to load the contents
    reader.readAsDataURL(event);

    reader.onerror = () => {
      this.fileLoadErrorDialog = true;
    };

    reader.onload = () => {
      this.idDataSource = reader.result;
    };
  }
}
</script>

<style lang="scss" scoped>
.gs_sign_up_container {
  margin-top: 100px;
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
    font-size: 18px;
    line-height: 20px;
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
          font-size: 18px;
          line-height: 20px;
          text-transform: capitalize;
          color: $mainBlue !important;
        }
      }
    }
  }
  .gs_id_uploader_input {
    ::v-deep .v-input__slot {
      border: 1px solid $mainBlue !important;
      .v-file-input__text {
        font-family: $proximaBold;
        font-style: normal;
        font-size: 18px;
        line-height: 20px;
        justify-content: center;
        color: #ffffff;
        @include respond-below(xs) {
          font-size: 16px;
          line-height: 16px;
        }
      }
      .v-input__append-inner {
        display: none;
      }
    }
  }
  .gs_uploaded_id_scope_wrapper {
    .v-list-item {
      .v-avatar {
        margin-top: 0;
        margin-bottom: 0;
        margin-right: 30px;
        border-radius: 29px !important;
        @include respond-below(sm) {
          margin-right: 0;
          width: 100% !important;
          height: 250px !important;
        }
      }
      .v-list-item__content {
        .text-h6 {
          font-family: $proximaReg;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 20px;
          opacity: 0.5;
          margin-top: 17px;
        }
        .headline {
          font-family: $proximaReg !important;
          font-style: normal;
          font-weight: normal;
          font-size: 18px !important;
          line-height: 20px;
          margin-top: 15px;
          margin-bottom: 12px !important;
        }
        .v-btn {
          font-family: $proximaReg;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 20px;
          color: $blueBtn;
          ::v-deep .v-btn__content {
            opacity: 1 !important;
          }
        }
      }
      @include respond-below(sm) {
        &::after {
          height: initial !important;
        }
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
      font-size: 16px;
      line-height: 16px;
      @include respond-below(xs) {
        font-size: 16px;
        line-height: 16px;
        flex: 0 0 auto;
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
