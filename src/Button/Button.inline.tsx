import type { CSSProperties } from "react";
import { forwardRef, useRef } from "react";

import type { ButtonProps } from "./ButtonTypes";
import {
  colorBlack,
  colorDarkBlue,
  colorMidGray,
  colorNavy,
  colorSilver,
  colorWhite,
  spaceExtraSmall,
  spaceLarge,
  spaceMedium,
  spaceSmall,
} from "../utilities/constants";
import { useFocus } from "../utilities/useFocus";
import { useHover } from "../utilities/useHover";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { fluid, disabled, size = "small", style, variant = "secondary", ...rest },
    ref1
  ) => {
    const ref2 = useRef<HTMLButtonElement>();
    const isFocused = useFocus(ref2);
    const isHovered = useHover(ref2);

    const buttonStyle: CSSProperties = {
      borderRadius: ".125rem",
      borderStyle: "solid",
      borderWidth: "1px",
      display: "inline-block",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, helvetica, 'helvetica neue', ubuntu, roboto, noto, 'segoe ui', arial, sans-serif",
      lineHeight: 1,
      margin: 0,
      textAlign: "center",
    };

    if (!disabled) {
      buttonStyle.cursor = "pointer";
    }

    if (fluid) {
      buttonStyle.width = "100%";
    }

    if (size === "large") {
      buttonStyle.fontSize = "1.25rem";
      buttonStyle.padding = `${spaceMedium} ${spaceLarge}`;
    } else if (size === "medium") {
      buttonStyle.fontSize = "1rem";
      buttonStyle.padding = `${spaceSmall} ${spaceMedium}`;
    } else {
      buttonStyle.fontSize = ".875rem";
      buttonStyle.padding = `${spaceExtraSmall} ${spaceSmall}`;
    }

    if (variant === "primary") {
      buttonStyle.background = disabled
        ? colorSilver
        : isFocused || isHovered
        ? colorNavy
        : colorDarkBlue;
      buttonStyle.borderColor = disabled
        ? colorSilver
        : isFocused || isHovered
        ? colorNavy
        : colorDarkBlue;
      buttonStyle.color = colorWhite;
      buttonStyle.fontWeight = 700;
    } else if (variant === "tertiary") {
      buttonStyle.background = colorWhite;
      buttonStyle.borderColor = colorWhite;
      buttonStyle.color = disabled
        ? colorSilver
        : isFocused || isHovered
        ? colorBlack
        : colorMidGray;
      buttonStyle.fontWeight = 400;
    } else {
      buttonStyle.background = colorWhite;
      buttonStyle.borderColor = disabled
        ? colorSilver
        : isFocused || isHovered
        ? colorBlack
        : colorMidGray;
      buttonStyle.color = disabled
        ? colorSilver
        : isFocused || isHovered
        ? colorBlack
        : colorMidGray;
      buttonStyle.fontWeight = 700;
    }

    return (
      <button
        disabled={disabled}
        style={{ ...buttonStyle, ...style }}
        ref={(element) => {
          if (typeof ref1 === "function") {
            ref1(element);
          } else if (ref1) {
            ref1.current = element;
          }

          ref2.current = element;
        }}
        type="button"
        {...rest}
      />
    );
  }
);
