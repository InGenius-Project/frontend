export type ResumeDTO = {
  Id: string;
  Title: string;
  TextLayouts: Array<ResumeAreaDTO<TextLayoutDTO>>;
  ImageTextLayouts: Array<ResumeAreaDTO<ImageTextLayoutDTO>>;
  ModifiedAt: string;
};

export interface ResumeAreaDTO<TLayout> {
  Layout: TLayout;
  Sequence: number;
  IsDisplayed: boolean;
}

export interface ResumeAreaPostDTO {
  ResumeId: string;
  TextLayout?: TextLayoutDTO;
  ImageTextLayout?: ImageTextLayoutDTO;
}

export interface LayoutDTO {
  Id: string;
  Type: LayoutType;
  Title: string;
  Arrangement: LayoutArrangement;
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
