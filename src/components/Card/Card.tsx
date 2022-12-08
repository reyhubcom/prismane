import React, { FC, ReactNode } from "react";
// Component
import Paper from "../Paper/Paper";
// Types
import { PrismaneComponent } from "../../types";

export interface CardProps extends PrismaneComponent {
  children: ReactNode;
  width?: string;
  height?: string;
  shadow?: boolean;
  header?: ReactNode;
  actions?: ReactNode;
}

/**
 * Card Props
 * @param {Object} props
 * @param {string=} props.heading The heading of the card if there is any
 * @param {ReactElement | HTMLElement | ReactElement[] | HTMLElement[]} props.children The children of the card
 * @param {string=} props.width The width of the card
 * @param {string=} props.height The height of the card
 * @param {string=} props.className The additional classes for the component
 * @returns Element
 */

const Card: FC<CardProps> = ({
  children,
  width,
  height,
  className,
  style,
  shadow,
  header,
  actions,
}) => {
  return (
    <Paper
      className={`p-2 min-w-[300px] flex flex-col gap-5 ${className}`}
      style={style}
      width={width}
      height={height}
      shadow={shadow}
    >
      {header && (
        <div className="flex overflow-hidden rounded-md max-h-[200px]">
          {header}
        </div>
      )}
      {children}
      {actions && <div className="flex overflow-x-hidden gap-3">{actions}</div>}
    </Paper>
  );
};

export default Card;