import List from "../src/components/List.vue";
import ListItem from "../src/components/ListItem.vue";
export default { title: "List" };
export const Normal = () => ({
  components: { List, ListItem },
  template: `
<list>
    <list-item button>List Item 1(Button)</list-item>
    <list-item>List Item 2</list-item>
    <list-item>List Item 3</list-item>
    <list-item header>Header</list-item>
    <list-item><span class="icon-usb"></span>List Item 4</list-item>
</list>
`,
});

export const Inset = () => ({
  components: { List, ListItem },
  template: `
<list inset>
    <list-item button>List Item 1(Button)</list-item>
    <list-item>List Item 2</list-item>
    <list-item>List Item 3</list-item>
    <list-item header>Header</list-item>
    <list-item><span class="icon-usb"></span>List Item 4</list-item>
</list>
`,
});
