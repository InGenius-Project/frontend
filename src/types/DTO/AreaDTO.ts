export interface AreaDTO {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  TextLayout?: TextLayoutDTO;
  ImageTextLayout?: ImageTextLayoutDTO;
  ListLayout?: ListLayoutDTO;
}

export interface AreaPostDTO {
  ResumeId?: string;
  Id?: string;
  Sequence: number;
  IsDisplayed: boolean;
  TextLayout?: TextLayoutDTO;
  ImageTextLayout?: ImageTextLayoutDTO;
  ListLayoutDTO?: ListLayoutDTO;
}

export interface LayoutDTO {
  Id: string;
  Title: string;
  Arrangement: LayoutArrangement;
  Type: LayoutType;
}

export interface TextLayoutDTO extends LayoutDTO {
  Arrangement: LayoutArrangement.TEXT;
  Content: string;
}
export interface ImageTextLayoutDTO extends LayoutDTO {
  Arrangement: LayoutArrangement.IMAGETEXT;
  Content: string;
  Image: ImageDTO;
}
export interface ImageDTO {
  Id: string;
  Content: string;
}

export interface ListLayoutDTO extends LayoutDTO {
  Arrangement: LayoutArrangement.LIST;
  Items?: Array<TagDTO>;
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
