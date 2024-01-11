export interface AreaDTO {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  Title: string;
  Arrangement: LayoutArrangement;
  Type: LayoutType;
  TextLayout?: TextLayoutDTO;
  ImageTextLayout?: ImageTextLayoutDTO;
  ListLayout?: ListLayoutDTO;
  KeyValueListLayout?: KeyValueListLayoutDTO;
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
  Image: ImageDTO;
}
export interface ImageDTO {
  Id: string;
  Content: string;
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

export interface TagDTO {
  Id: string;
  Name: string;
  Type: string;
}

export enum LayoutArrangement {
  "TEXT" = "TEXT",
  "IMAGETEXT" = "IMAGETEXT",
  "LIST" = "LIST",
  "KEYVALUELIST" = "KEYVALUELIST",
  "ICONTEXT" = "ICONTEXT",
}

export enum LayoutType {
  "CUSTOM" = "CUSTOM",
  "USER" = "USER",
  "COMPANY" = "COMPANY",
}
