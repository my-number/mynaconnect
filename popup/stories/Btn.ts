import Btn from "../src/components/Btn.vue";
export default { title: "Btn" };
export const Normal = () => ({
  components: { Btn },
  template: `<btn>Hello!</btn>`,
});
export const Transparent = () => ({
  components: { Btn },
  template: `<btn transparent>Hello!</btn>`,
});

export const TransparentCaution = () => ({
  components: { Btn },
  template: `<btn transparent caution>Hello!</btn>`,
});
export const Inline = () => ({
  components: { Btn },
  template: `<btn inline>Hello!</btn>`,
});
export const PermissionButtons = () => ({
  components: { Btn },
  template: `<div><btn>許可</btn><btn transparent caution>キャンセル</btn></div>`,
});
