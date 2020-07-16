import { useChannel } from "./Channel";
import { h, Fragment } from "preact";

interface Props {
  name: string;
  children?: any;
}

export default ({ name, children }: Props) => {
  const channel: any = useChannel();
  console.log(channel, name);
  if (channel.name == name) {
    return children;
  } else {
    return <Fragment />;
  }
};
