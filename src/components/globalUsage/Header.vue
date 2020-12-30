<template>
  <v-app-bar
    color="transparent"
    height="50"
    elevation="0"
    class="gs_main_app_bar"
  >
    <v-container fluid class="pa-0">
      <v-row justify="space-between">
        <v-col class="d-flex flex-grow-0 align-center gs_left_content">
          <router-link to="/" class="gs_logo">
            <v-img
              max-height="28"
              max-width="120"
              contain
              src="@/assets/icons/LOGO.svg"
            ></v-img>
          </router-link>
          <v-btn depressed height="50" min-width="90">
            <v-img
              max-height="38"
              max-width="38"
              contain
              src="@/assets/icons/Path.svg"
            ></v-img>
          </v-btn>
          <v-btn depressed height="50" min-width="210">
            {{ $t("buttons.trading_portal") }}
          </v-btn>
        </v-col>
        <v-col class="d-flex align-center justify-end gs_right_content">
          <v-card
            class="gs_balance_card"
            max-width="344"
            color="transparent"
            elevation="0"
          >
            <v-list-item two-line>
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
          <v-btn class="gs_bell" depressed height="50" min-width="56">
            <v-img
              max-height="38"
              max-width="38"
              contain
              src="@/assets/icons/bell.svg"
            ></v-img>
          </v-btn>
          <v-menu
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
                  cover
                  src="https://picsum.photos/seed/picsum/200/300"
                ></v-img>
              </v-btn>
            </template>
            <v-list>
              <v-list-item link v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  })
};
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
