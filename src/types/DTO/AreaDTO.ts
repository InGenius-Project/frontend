export interface AreaDTO {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  TextLayout: TextLayoutDTO;
  ImageTextLayout: ImageTextLayoutDTO;
}

export interface LayoutDTO {
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

export enum LayoutArrangement {
  "TEXT" = "TEXT",
  "IMAGETEXT" = "IMAGETEXT",
}

export enum LayoutType {
  "CUSTOM" = "CUSTOM",
  "USER" = "USER",
  "COMPANY" = "COMPANY",
}
