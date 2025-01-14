import { Meta } from "@storybook/react";
import { Eye } from "@phosphor-icons/react";
// Components
import Icon from "./Icon";

export default {
  title: "Icon",
  component: Icon,
} as Meta;

const Template = ({ props }: any) => (
  <Icon size={20}>
    <Eye />
  </Icon>
);

export const Default = Template.bind({});
