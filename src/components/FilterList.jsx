import {Classes, Menu} from "@blueprintjs/core";
import {rollup} from "d3-array";
import React, {useMemo, useCallback} from "react";
// import List from "react-viewport-list";
import List from "./ViewportList";

/**
 * @typedef MenuHeader
 * @property {boolean} isOptgroup 
 * @property {string[]} headers
 */

/**
 * @typedef MenuHeaderProps
 * @property {string[]} headers 
 * @property {any} innerRef
 * @property {any} style
 */

/** @type {React.FC<MenuHeaderProps>} */
const MenuHeaderItem = function({headers, innerRef, style}) {
  return (
    <li
      className={`${Classes.MENU_HEADER} filter-list-optgroup`}
      key={headers.join("|")}
      ref={innerRef}
      style={style}
    >
      {headers.map(token => (
        <strong key={token} className={Classes.HEADING}>
          {token}
        </strong>
      ))}
    </li>
  );
};

/** 
 * @template T
 * @type {React.FC<import("@blueprintjs/select").IItemListRendererProps<T> & {levels: ((d: T) => string)[]}>} 
 */
const FilterList = function({activeItem, filteredItems, levels, renderItem}) {
  const groupedItems = useMemo(
    () => {
      const groupedItems = [];
      const groupComposer = group => {
        const firstObj = group[0];
        const headers = levels
          .map(fn => fn(firstObj))
          .filter((token, index, list) => list.indexOf(token) === index);
        groupedItems.push({isOptgroup: true, headers}, ...group);
      };
      rollup(filteredItems, groupComposer, ...levels);
      return groupedItems;
    },
    [filteredItems, levels]
  );

  const listRenderer = useCallback(
    ({innerRef, index, style}) => {
      const item = groupedItems[index];
      if (isOptgroup(item)) {
        return (
          <MenuHeaderItem
            headers={item.headers}
            key={`header-${item.headers.join("-")}`}
            innerRef={innerRef}
            style={style}
          />
        );
      }
      else {
        const element = renderItem(item, index);
        return element ? React.cloneElement(element, {ref: innerRef, style}) : null;
      }
    },
    [groupedItems]
  );

  const activeIndex = filteredItems.indexOf(activeItem);

  return (
    <Menu className="filter-list-content">
      <List
        itemMinHeight={50}
        listLength={groupedItems.length}
        overscan={6}
        scrollToIndex={activeIndex}
      >
        {listRenderer}
      </List>
    </Menu>
  );
};

/** @returns {item is MenuHeader} */
function isOptgroup(item) {
  return item && item.isOptgroup;
}

export default FilterList;
