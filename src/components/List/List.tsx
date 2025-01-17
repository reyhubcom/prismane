import { forwardRef, ForwardedRef } from "react";
// Components
import Flex, { FlexProps } from "../Flex/Flex";
// Types
import {
  PrismaneWithInternal,
  Versatile,
  PrismaneVersatile,
  PrismaneVersatileRef,
} from "../../types";
// Utils
import { strip } from "../../utils";

// Internal Components
import ListUnordered, {
  ListUnorderedProps,
} from "./ListUnordered/ListUnordered";
import ListOrdered, { ListOrderedProps } from "./ListOrdered/ListOrdered";
import ListItem, { ListItemProps } from "./ListItem/ListItem";
import ListIcon, { ListIconProps } from "./ListIcon/ListIcon";

export {
  type ListUnorderedProps,
  type ListOrderedProps,
  type ListItemProps,
  type ListIconProps,
};

export type ListProps<E extends Versatile = "ul"> = PrismaneVersatile<
  E,
  FlexProps<E>
>;

const List = forwardRef(
  <E extends Versatile = "ul">(
    { gap = 0, as, children, className, sx, ...props }: ListProps<E>,
    ref: PrismaneVersatileRef<E>
  ) => {
    const Component = as || "ul";

    return (
      <Flex
        as={Component}
        direction="column"
        gap={gap}
        className={strip(`${className ? className : ""} PrismaneList-root`)}
        sx={{ listStyleType: "none", ...sx }}
        data-testid="prismane-list"
        ref={ref}
        {...props}
      >
        {children}
      </Flex>
    );
  }
) as PrismaneWithInternal<
  ListProps<Versatile>,
  {
    Unordered: ListUnorderedProps;
    Ordered: ListOrderedProps;
    Item: ListItemProps;
    Icon: ListIconProps;
  }
>;

List.Unordered = ListUnordered;
List.Ordered = ListOrdered;
List.Item = ListItem;
List.Icon = ListIcon;

export default List;
