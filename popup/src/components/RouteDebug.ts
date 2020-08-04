export default {
  beforeRouteEnter(to, from, next) {
    console.log("Enter", to, from);
    next("/request-permission");
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Update", to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("Leave", to, from);
    next();
  },
};
