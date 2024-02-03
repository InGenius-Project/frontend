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
  UserRole: UserRole;
  Areas: AreaDTO[];
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
