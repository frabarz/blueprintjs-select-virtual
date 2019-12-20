import React from "react";
import {Classes, Icon, Text} from "@blueprintjs/core";
import classNames from "classnames";

const DISABLED_PROPS: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
  href: undefined,
  onClick: undefined,
  onMouseDown: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  tabIndex: -1
};

function MenuItem({
  active,
  children,
  className,
  disabled,
  icon,
  intent,
  labelClassName,
  labelElement,
  multiline,
  popoverProps,
  ref,
  rightIcon,
  tagName = "a",
  text,
  textClassName,
  ...htmlProps
}) {
  const intentClass = Classes.intentClass(intent);

  const anchorProps = {
    ...htmlProps,
    ...(disabled ? DISABLED_PROPS : {}),
    className: classNames(
      Classes.MENU_ITEM,
      intentClass,
      {
        [Classes.ACTIVE]: active,
        [Classes.INTENT_PRIMARY]: active && intentClass == null,
        [Classes.DISABLED]: disabled
      },
      className
    )
  };

  return (
    <li ref={ref}>
      <a {...anchorProps}>
        {icon && <Icon icon={icon} />}
        <Text className={classNames(Classes.FILL, textClassName)} ellipsize={!multiline}>
          {text}
        </Text>
        {rightIcon && <Icon icon="caret-right" />}
      </a>
    </li>
  );
}

export default MenuItem;
