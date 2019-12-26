import {Classes, Icon, Text} from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";

export function MenuItem({
  active,
  className = "",
  disabled = false,
  icon = false,
  intent = null,
  labelClassName = "",
  labelElement = null,
  multiline = false,
  shouldDismissPopover = true,
  rightIcon = false,
  tagName = "a",
  text,
  textClassName = "",
  ...htmlProps
}) {
  const intentClass = Classes.intentClass(intent);
  const anchorClasses = classNames(
    Classes.MENU_ITEM,
    intentClass,
    {
      [Classes.ACTIVE]: active,
      [Classes.INTENT_PRIMARY]: active && intentClass == null,
      [Classes.DISABLED]: disabled,
      // prevent popover from closing when clicking on submenu trigger or disabled item
      [Classes.POPOVER_DISMISS]: shouldDismissPopover && !disabled
    },
    className
  );

  return React.createElement(
    tagName,
    {
      ...htmlProps,
      ...(disabled ? DISABLED_PROPS : {}),
      className: anchorClasses
    },
    icon ? <Icon icon={icon} /> : undefined,
    <Text className={classNames(Classes.FILL, textClassName)} ellipsize={!multiline}>
      {text}
    </Text>,
    labelElement,
    rightIcon ? <Icon icon={rightIcon} /> : undefined
  );
}

// props to ignore when disabled
const DISABLED_PROPS = {
  href: undefined,
  onClick: undefined,
  onMouseDown: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  tabIndex: -1
};
