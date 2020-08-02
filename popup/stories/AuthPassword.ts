import AuthPassword from "../src/components/AuthPassword.vue";
export default {
  title: "AuthPassword",
};
export const Normal = () => ({
  components: {
    AuthPassword,
  },
  template: `<auth-password></auth-password>`,
});
