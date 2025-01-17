import { FC } from "react";
import { Meta } from "@storybook/react";
// Components
import Grid from "./Grid";
// Utils
import { fr } from "../../utils";

export default {
  title: "Grid",
  component: Grid,
} as Meta;

export const Default: FC = () => {
  return (
    <Grid gap={3} templateColumns={8} templateRows={4} h={fr(120)} w={fr(120)}>
      <Grid.Item
        columnStart={1}
        columnEnd={3}
        rowStart={1}
        rowEnd={2}
        h={fr(10)}
        w="100%"
        bg="primary"
      ></Grid.Item>
      <Grid.Item
        columnStart={3}
        columnEnd={8}
        rowStart={1}
        rowEnd={2}
        h={fr(10)}
        w="100%"
        bg="primary"
      ></Grid.Item>
      <Grid.Item
        columnStart={2}
        columnEnd={8}
        rowStart={2}
        rowEnd={4}
        h={fr(10)}
        w="100%"
        bg="primary"
      ></Grid.Item>
    </Grid>
  );
};
