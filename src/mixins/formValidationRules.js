export const formValidationRules = {
  data() {
    return {
      emailRules: {
        required: v => !!v || "E-mail is required",
        validEmail: v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      },
      passwordRules: {
        required: value => !!value || "Password is required",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      nameRules: {
        required: value => !!value || "Name is required"
      },
      phoneNumberRules: {
        required: value => !!value || "Phone number is required"
      },
      idRules: {
        required: value => !!value || "ID is required"
      }
    };
  }
};
