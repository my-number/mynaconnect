import TooltipItem from "../src/components/TooltipItem.vue";
export default { title: "TooltipItem" };
export const Normal = () => ({
  components: { TooltipItem },
  template: `<center><tooltip-item tooltip="ツールチップだよ">ほばーみー</tooltip-item></center>`,
});
