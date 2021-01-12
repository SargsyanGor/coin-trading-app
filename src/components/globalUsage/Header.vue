<template>
  <div>
    <v-app-bar
      color="transparent"
      height="50"
      elevation="0"
      class="gs_main_app_bar"
    >
      <v-container fluid class="pa-0">
        <v-row justify="space-between">
          <v-col class="d-flex flex-grow-0 align-center gs_left_content">
            <v-app-bar-nav-icon
              @click="drawer = true"
              class="d-lg-none"
            ></v-app-bar-nav-icon>

            <router-link to="/" class="gs_logo d-none d-lg-inline-flex">
              <v-img
                max-height="28"
                max-width="120"
                contain
                src="@/assets/icons/LOGO.svg"
              ></v-img>
            </router-link>
            <v-btn
              depressed
              height="50"
              min-width="90"
              class="d-none d-lg-inline-flex mr-8"
            >
              <v-img
                max-height="38"
                max-width="38"
                contain
                src="@/assets/icons/Path.svg"
              ></v-img>
            </v-btn>
            <v-btn
              depressed
              height="50"
              min-width="210"
              class="d-none d-lg-inline-flex"
            >
              {{ $t("buttons.trading_portal") }}
            </v-btn>
          </v-col>
          <v-col class="d-flex align-center justify-end gs_right_content">
            <v-card
              v-if="isLoggedIn"
              class="gs_balance_card"
              max-width="344"
              color="transparent"
              elevation="0"
            >
              <v-list-item two-line class="pa-0 pa-sm-4">
                <v-list-item-content class="d-inline pa-0">
                  <v-list-item-title>{{
                    $t("global.balance")
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="d-flex align-center">
                    <span class="gs_balance_value">$0</span>
                    <v-btn width="20" height="20" fab>
                      <v-img
                        max-height="9"
                        max-width="9"
                        contain
                        src="@/assets/icons/plus.svg"
                      ></v-img> </v-btn
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-btn
              v-if="isLoggedIn"
              class="gs_bell d-none d-sm-inline-flex"
              depressed
              height="50"
              min-width="56"
            >
              <v-img
                max-height="38"
                max-width="38"
                contain
                src="@/assets/icons/bell.svg"
              ></v-img>
            </v-btn>
            <v-menu
              v-if="isLoggedIn"
              offset-y
              bottom
              left
              light
              origin="right center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="gs_menu_activator overflow-hidden"
                  fab
                  width="50"
                  height="50"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="@/assets/imgs/yanni.jpg"
                  ></v-img>
                </v-btn>
              </template>
              <v-list>
                <v-list-item link v-for="(item, index) in items" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              v-else
              class="gs_menu_activator overflow-hidden"
              fab
              width="50"
              height="50"
            >
              <v-img
                max-height="38"
                max-width="38"
                contain
                src="@/assets/icons/user-default.svg"
              ></v-img>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- On small devices showing navigation -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <div class="pt-5 pa-5 mb-3 d-flex justify-space-between align-center">
        <router-link to="/" class="gs_logo d-inline-flex">
          <v-img
            height="28"
            width="80"
            contain
            src="@/assets/icons/LOGO.svg"
          ></v-img>
        </router-link>
        <v-btn
          v-if="isLoggedIn"
          class="gs_bell d-inline-flex d-sm-none"
          depressed
          color="transparent"
          height="50"
          min-width="56"
        >
          <v-img
            max-height="38"
            max-width="38"
            contain
            src="@/assets/icons/bell.svg"
          ></v-img>
        </v-btn>
      </div>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-img
                max-height="38"
                max-width="38"
                contain
                src="@/assets/icons/Path.svg"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t("buttons.trading_portal") }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Header extends Vue {
  @Auth.State("status")
  private UserIsLoggedIn!: any;

  @Auth.Action
  private signOut!: () => void;

  @Auth.Getter
  private isLoggedIn!: boolean;

  drawer: boolean = false;
  items: Array<object> = [
    { title: "Click Me 1" },
    { title: "Click Me 2" },
    { title: "Click Me 3" },
    { title: "Click Me 4" }
  ];

  logOut() {
    this.signOut();
    this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
.gs_main_app_bar {
  flex: 0 0 auto;
  ::v-deep .v-toolbar__content {
    padding: 0;
  }
  .gs_left_content {
    .gs_logo {
      margin-right: 131px;
    }
    .v-btn {
      border-radius: 24.5px;
      background: $darkBtn;
      &:first-of-type {
        margin-right: 30px;
      }
      &:last-of-type {
        font-family: $openSans;
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 23px;
      }
    }
  }
  .gs_right_content {
    .gs_balance_card {
      margin-right: 18px;
      .v-list-item__title {
        font-family: $proximaReg;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 15px;
        mix-blend-mode: normal;
        opacity: 0.5;
        margin-bottom: 9px;
      }
      .v-list-item__subtitle {
        .gs_balance_value {
          color: #ffffff;
          font-family: $proximaBold;
          font-style: normal;
          font-size: 20px;
          line-height: 20px;
          letter-spacing: 0.416667px;
          margin-right: 8px;
        }
        .v-btn {
          background: $blueBtn;
        }
      }
    }
    .v-btn.gs_bell {
      border-radius: 24.5px;
      background: $darkBtn;
      margin-right: 34px;
    }
  }
}
</style>
