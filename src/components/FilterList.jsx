import {Menu, MenuDivider} from "@blueprintjs/core";
import {rollup} from "d3-array";
import React, {useMemo} from "react";
import List from "react-viewport-list";

/** 
 * @template T
 * @type {React.FC<import("@blueprintjs/select").IItemListRendererProps<T> & {levels: ((d: T) => string)[]}>} 
 */
const FilterList = function({activeItem, filteredItems, levels, renderItem}) {
  const groupList = useMemo(
    () => {
      const itemGroups = [];
      const groupComposer = group => {
        const firstObj = group[0];
        const header = levels
          .map(fn => fn(firstObj))
          .filter((token, index, list) => list.indexOf(token) === index);
        itemGroups.push({group, header});
      };
      rollup(filteredItems, groupComposer, ...levels);
      return itemGroups;
    },
    [filteredItems, levels]
  );

  const listElements = useMemo(
    () =>
      groupList.reduce((list, {group, header}) => {
        const activeIndex = group.indexOf(activeItem);
        const keySuffix = header.join("-");
        const listRenderer = ({innerRef, index, style}) => (
          <li key={`item-${index}`} ref={innerRef} style={style}>
            {renderItem(group[index], index)}
          </li>
        );

        return list.concat(
          <MenuDivider
            className="filter-list-optgroup"
            key={`header-${keySuffix}`}
            title={header.join("\n")}
          />,
          <List
            children={listRenderer}
            fixed={true}
            itemMinHeight={50}
            key={`list-${keySuffix}`}
            listLength={group.length}
            overscan={1}
            scrollToIndex={activeIndex}
          />
        );
      }, []),
    [activeItem, groupList]
  );

  return <Menu className="filter-list-content">{listElements}</Menu>;
};

export default FilterList;
