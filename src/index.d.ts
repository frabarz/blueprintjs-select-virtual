interface MeasureItem {
  aggregationType: string;
  caption: string;
  cube: string;
  datasetHref: string;
  datasetName: string;
  defaultGroup: string | undefined;
  details: string;
  dimNames: string[];
  hash: string;
  hideInMap: boolean;
  hideInUi: boolean;
  isCollectionFor: string | undefined;
  isLCIFor: string | undefined;
  isMOEFor: string | undefined;
  isSourceFor: string | undefined;
  isUCIFor: string | undefined;
  name: string;
  searchIndex: string;
  server: string;
  sortKey: string;
  sourceHref: string;
  sourceName: string;
  subtopic: string;
  tableId: string | undefined;
  topic: string;
  unit: string;
  uri: string;
}

interface DimensionItem {
  caption: string;
  cube: string;
  defaultHierarchy: string | undefined;
  defaultYear: number | undefined;
  hash: string;
  hideInMap: boolean;
  hideInUi: boolean;
  hierarchies: HierarchyItem[];
  isRequired: boolean;
  levelCount: number;
  name: string;
  server: string;
  type: "TIME" | "GEOGRAPHY" | "GENERIC" | string;
  uri: string;
}

interface HierarchyItem {
  caption: string;
  cube: string;
  dimension: string;
  hash: string;
  hideInMap: boolean;
  hideInUi: boolean;
  levels: LevelItem[];
  name: string;
  server: string;
  type: string;
  uri: string;
}

interface LevelItem {
  caption: string;
  cube: string;
  depth: number;
  dimension: string;
  hash: string;
  hideInMap: boolean;
  hideInUi: boolean;
  hierarchy: string;
  name: string;
  server: string;
  type: string;
  uri: string;
}
