module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        data: `@import "@/assets/scss/core/_variables.scss";
              @import "@/assets/scss/helpers/_functions.scss";
              @import "@/assets/scss/helpers/_mixins.scss";
              @import "@/assets/scss/helpers/_mediaQueries.scss";     
              @import "@/assets/scss/core/_globalStyles.scss";
              @import "@/assets/scss/core/_fonts.scss";         
        `
      }
    }
  }
};
