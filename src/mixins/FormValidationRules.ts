import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormValidationRules extends Vue {
  emailRules: Object = {
    required: (v: any) => !!v || "E-mail is required",
    validEmail: (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid"
  };
  passwordRules: Object = {
    required: (value: any) => !!value || "Password is required",
    min: (v: string | any[]) => v.length >= 8 || "Min 8 characters"
  };
  nameRules: Object = {
    required: (value: any) => !!value || "Name is required"
  };
  phoneNumberRules: Object = {
    required: (value: any) => !!value || "Phone number is required"
  };
  idRules: Object = {
    required: (value: any) => !!value || "ID is required"
  };
}
