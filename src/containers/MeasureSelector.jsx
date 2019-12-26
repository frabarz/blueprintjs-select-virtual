import {Button, Tag} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import escapeRegExp from "lodash/escapeRegExp";
import React, {Component} from "react";
import FilterList from "../components/FilterList";
import {MenuItem} from "../components/Menu";
import NavigationList from "../components/NavigationList";

/** @type {React.FC<{name: string}>} */
const MeasureOption = function(props) {
  return (
    <span className="measure-label">
      <span className="name">{props.name}</span>
      {props.children}
    </span>
  );
};

class MainMeasureSelect extends Component {
  /** @type {Partial<import("@blueprintjs/core").IPopoverProps>} */
  popoverProps = {
    fill: true,
    minimal: true
  };

  render() {
    const {items, selectedItem, onItemSelect} = this.props;

    return (
      <Select
        itemListPredicate={itemListPredicate}
        itemListRenderer={renderItemList}
        itemRenderer={renderItem}
        items={items}
        onItemSelect={onItemSelect}
        popoverProps={this.popoverProps}
      >
        <Button
          alignText="left"
          className="measure-select select-option active"
          fill={true}
          rightIcon="double-caret-vertical"
          title={selectedItem.name}
        >
          <MeasureOption name={selectedItem.name}>
            <span className="source">{selectedItem.sourceName}</span>
          </MeasureOption>
        </Button>
      </Select>
    );
  }
}

/** @type {import("@blueprintjs/select").ItemListPredicate<MeasureItem>} */
function itemListPredicate(query, items) {
  query = query.trim();
  query = escapeRegExp(query).replace(/\s+/g, "[^|]+");
  const queryTester = RegExp(query || ".", "i");
  return items.filter(item => queryTester.test(item.searchIndex));
}

/** @type {import("@blueprintjs/select").ItemRenderer<MeasureItem>} */
function renderItem(item, {modifiers, handleClick}) {
  const dimNamesToRender = item.dimNames.slice(0, 4);
  if (item.dimNames.length > 4) {
    dimNamesToRender.push(`+${item.dimNames.length - 4} more`);
  }

  const content = (
    <MeasureOption name={item.name}>
      <span className="dimNames">
        {dimNamesToRender.map(dim => <Tag key={dim}>{dim}</Tag>)}
      </span>
    </MeasureOption>
  );

  return (
    <MenuItem
      active={modifiers.active}
      className="measure-select option"
      disabled={modifiers.disabled}
      key={item.uri}
      multiline={true}
      onClick={handleClick}
      text={content}
      title={item.name}
    />
  );
}

const levelGetter = [d => d.topic, d => d.subtopic];

/** @type {import("@blueprintjs/select").ItemListRenderer<MeasureItem>} */
function renderItemList(itemListProps) {
  return itemListProps.query ? (
    <FilterList {...itemListProps} levels={levelGetter} />
  ) : (
    <NavigationList {...itemListProps} levels={levelGetter} />
  );
}

export default MainMeasureSelect;
