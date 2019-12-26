import {Button} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import escapeRegExp from "lodash/escapeRegExp";
import React, {Component} from "react";
import FilterList from "../components/FilterList";
import {MenuItem} from "../components/Menu";
import NavigationList from "../components/NavigationList";

class LevelSelect extends Component {
  state = {};

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
          className="level-select select-option active"
          fill={true}
          rightIcon="double-caret-vertical"
          title={selectedItem.name}
        >
          {selectedItem.name}
        </Button>
      </Select>
    );
  }
}

/** @type {import("@blueprintjs/select").ItemListPredicate<LevelItem>} */
function itemListPredicate(query, items) {
  query = query.trim();
  query = escapeRegExp(query).replace(/\s+/g, "[^|]+");
  const queryTester = RegExp(query || ".", "i");
  return items.filter(item => queryTester.test(item.caption));
}

/** @type {import("@blueprintjs/select").ItemRenderer<LevelItem>} */
function renderItem(item, {modifiers, handleClick}) {
  return (
    <MenuItem
      active={modifiers.active}
      className="level-select option"
      disabled={modifiers.disabled}
      key={item.uri}
      onClick={handleClick}
      text={item.name}
      title={item.name}
    />
  );
}

const levelGetter = [d => d.dimension, d => d.hierarchy];

/** @type {import("@blueprintjs/select").ItemListRenderer<LevelItem>} */
function renderItemList(itemListProps) {
  return itemListProps.query ? (
    <FilterList {...itemListProps} levels={levelGetter} />
  ) : (
    <NavigationList {...itemListProps} levels={levelGetter} />
  );
}

export default LevelSelect;
