export enum LayoutType {
  Text,
  ImageText,
  List,
  KeyValueList,
}

export const LayoutTypeObject = [
  {
    label: "文字",
    value: LayoutType.Text as number,
  },
  {
    label: "圖片文字",
    value: LayoutType.ImageText as number,
  },
  {
    label: "列表",
    value: LayoutType.List as number,
  },
  {
    label: "鍵值列表",
    value: LayoutType.KeyValueList as number,
  },
];
