import React, {memo} from "react";

/**
 * @template T
 * @typedef OwnProps
 * @property {T[]} items
 * @property {(item: T, index: number) => JSX.Element | null} itemRenderer
 */

/** 
 * @template T
 * @type {React.FC<OwnProps<T>>} 
 */
const ListViewItems = memo(({items, itemRenderer}) => {
  return <div>{items.map(itemRenderer)}</div>;
});

export default ListViewItems;
