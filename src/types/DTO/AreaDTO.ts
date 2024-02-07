import { TagDTO } from "types/TagDTO";
import { UserRole } from "./UserDTO";

export interface AreaDTO {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  Title: string;
  LayoutType?: LayoutTypeDTO;
  AreaType?: AreaTypeDTO;
  TextLayout?: TextLayoutDTO;
  ImageTextLayout?: ImageTextLayoutDTO;
  ListLayout?: ListLayoutDTO;
  KeyValueListLayout?: KeyValueListLayoutDTO;
}

export interface AreaTypeDTO {
  Id: number;
  Name: string;
  Value: string;
  Description: string;
  LayoutType: LayoutTypeDTO;
  UserRole: Array<UserRole>;
}

export interface AreaPostDTO extends Omit<AreaDTO, "Id"> {
  Id?: string;
}

export interface LayoutDTO {
  Id: string;
}

export interface TextLayoutDTO extends LayoutDTO {
  Content: string;
}
export interface ImageTextLayoutDTO extends LayoutDTO {
  Content: string;
  Image?: ImageDTO;
}
export interface ImageDTO {
  Id: string;
  Filename: string;
  Content: string;
  ContentType: string;
}

export interface ListLayoutDTO extends LayoutDTO {
  Items?: Array<TagDTO>;
}

export interface KeyValueListLayoutDTO extends LayoutDTO {
  Items?: Array<KeyValueItemDTO>;
}

export interface KeyValueItemDTO {
  Id: string;
  Key: TagDTO;
  Value: string;
}

export enum LayoutTypeDTO {
  Text,
  ImageText,
  List,
  KeyValueList,
}

export const LayoutTypeObject = [
  {
    label: "文字",
    value: LayoutTypeDTO.Text as number,
  },
  {
    label: "圖片文字",
    value: LayoutTypeDTO.ImageText as number,
  },
  {
    label: "列表",
    value: LayoutTypeDTO.List as number,
  },
  {
    label: "鍵值列表",
    value: LayoutTypeDTO.KeyValueList as number,
  },
];
