import React, {memo} from "react";
import {Menu, MenuItem} from "@blueprintjs/core";

/**
 * @template T
 * @typedef OwnProps
 * @property {Map<string, T[]>} items 
 * @property {(cat: string) => void} onClick
 */

/** 
 * @template T
 * @type {React.FC<OwnProps<T>>} 
 */
const ListViewCategory = memo(function(props) {
  return (
    <Menu>
      {Array.from(props.items, ([category]) => (
        <MenuItem
          key={category}
          text={category}
          onClick={() => props.onClick(category)}
        />
      ))}
    </Menu>
  );
});

export default ListViewCategory;
