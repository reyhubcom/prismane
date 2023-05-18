import { forwardRef, ReactNode } from "react";
// Components
import Paper, { PaperProps } from "../Paper/Paper";
import Animation, { AnimationProps } from "../Animation/Animation";
import Backdrop from "../Backdrop/Backdrop";
import Portal from "../Portal/Portal";
// Hooks
import useAnimation from "../../hooks/useAnimation";
import usePresence from "../../hooks/usePresence";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
// Context
import { DrawerContextProvider } from "./DrawerContext";
// Types
import { PrismaneWithInternal, PrismaneBreakpoints } from "../../types";
// Utils
import { strip, variants, fr } from "../../utils";
// Internal Components
import DrawerHeader, { DrawerHeaderProps } from "./DrawerHeader/DrawerHeader";
import DrawerFooter, { DrawerFooterProps } from "./DrawerFooter/DrawerFooter";

export { type DrawerHeaderProps };
export { type DrawerFooterProps };

export type DrawerProps = {
  position?: "right" | "left" | "top" | "bottom";
  size?: PrismaneBreakpoints | string | number;
  open?: boolean;
  closable?: boolean;
  onClose?: Function;
  shadow?: boolean;
} & AnimationProps<"div"> &
  PaperProps<"div">;

const Drawer: PrismaneWithInternal<
  DrawerProps,
  { Header: DrawerHeaderProps; Footer: DrawerFooterProps }
> = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      position = "left",
      size = "base",
      open,
      closable,
      onClose = () => {},
      shadow,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { animate, animating, duration, timing } = useAnimation(
      open as boolean
    );

    const presence = usePresence(open as boolean, duration, animate);

    useKeyboardShortcut(["escape"], onClose, open);

    return (
      <Portal>
        {presence && (
          <Animation
            as={Backdrop}
            justify={variants(position, {
              left: "start",
              top: "start",
              right: "end",
              bottom: "end",
            })}
            direction={variants(position, {
              left: "row",
              top: "column",
              right: "row",
              bottom: "column",
            })}
            animation="fade"
            animated={animating}
            duration={duration}
            timing={timing}
            onClick={onClose}
          >
            <Animation
              as={Paper}
              p={fr(5)}
              bs="border-box"
              br="0!important"
              h={variants(position, {
                left: "100%",
                top: variants(size, {
                  xs: fr(60),
                  sm: fr(72),
                  base: fr(84),
                  md: fr(96),
                  lg: fr(108),
                }),
                right: "100%",
                bottom: variants(size, {
                  xs: fr(60),
                  sm: fr(72),
                  base: fr(84),
                  md: fr(96),
                  lg: fr(108),
                }),
              })}
              w={variants(position, {
                left: variants(size, {
                  xs: fr(60),
                  sm: fr(72),
                  base: fr(84),
                  md: fr(96),
                  lg: fr(108),
                }),
                top: "100%",
                right: variants(size, {
                  xs: fr(60),
                  sm: fr(72),
                  base: fr(84),
                  md: fr(96),
                  lg: fr(108),
                }),
                bottom: "100%",
              })}
              animation={variants(position, {
                left: "slide-left",
                top: "slide-top",
                right: "slide-right",
                bottom: "slide-bottom",
              })}
              shadow={shadow}
              animated={animating}
              duration={duration}
              timing={timing}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              className={strip(
                `${className ? className : ""} PrismaneDrawer-root`
              )}
              ref={ref}
              {...props}
            >
              <DrawerContextProvider value={{ open, closable, onClose }}>
                {children}
              </DrawerContextProvider>
            </Animation>
          </Animation>
        )}
      </Portal>
    );
  }
);

Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;

export default Drawer;