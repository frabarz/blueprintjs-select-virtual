import {Classes, H6, Menu} from "@blueprintjs/core";
import {rollup} from "d3-array";
import React, {useCallback, useMemo} from "react";
// import List from "react-viewport-list";
import List from "./ViewportList";

/**
 * @typedef MenuHeader
 * @property {boolean} isOptgroup 
 * @property {string[]} headers
 */

/** @returns {item is MenuHeader} */
function isMenuHeader(item) {
  return item && item.isOptgroup;
}
/** 
 * @template T
 * @type {React.FC<import("@blueprintjs/select").IItemListRendererProps<T> & {levels: ((d: T) => string)[]}>} 
 */
const FilterList = function({activeItem, filteredItems, levels, renderItem}) {
  const [groupedItems, stickyIndices] = useMemo(
    () => {
      const groupedItems = [];
      const stickyIndices = [];
      const groupComposer = group => {
        const firstObj = group[0];
        const headers = levels
          .map(fn => fn(firstObj))
          .filter((token, index, list) => list.indexOf(token) === index);
        stickyIndices.push(groupedItems.length);
        groupedItems.push({isOptgroup: true, headers}, ...group);
      };
      rollup(filteredItems, groupComposer, ...levels);
      return [groupedItems, stickyIndices];
    },
    [filteredItems, levels]
  );

  const listRenderer = useCallback(
    ({innerRef, index, style}) => {
      const item = groupedItems[index];
      if (isMenuHeader(item)) {
        const key = item.headers.join("-");
        return (
          // <Fragment>
          //   <li className="positioner" key={`position-${key}`} style={style} ref={innerRef} />
          <li
            className={`${Classes.MENU_HEADER} filter-list-optgroup`}
            key={`header-${key}`}
            style={style}
          >
            <H6>{item.headers.join("\n")}</H6>
          </li>
          // </Fragment>
        );
      }
      else {
        return (
          <li key={`item-${index}`} ref={innerRef} style={style}>
            {renderItem(item, index)}
          </li>
        );
      }
    },
    [groupedItems]
  );

  const activeIndex = groupedItems.indexOf(activeItem);

  return (
    <Menu className="filter-list-content">
      <List
        itemMinHeight={50}
        listLength={groupedItems.length}
        overscan={6}
        scrollToIndex={activeIndex}
        stickyIndexes={stickyIndices}
      >
        {listRenderer}
      </List>
    </Menu>
  );
};

export default FilterList;
