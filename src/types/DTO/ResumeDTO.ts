export type ResumeDTO = {
  Id: string;
  Title: string;
  TextLayouts: Array<ResumeAreaDTO<TextLayoutDTO>>;
  ImageTextLayouts: Array<ResumeAreaDTO<ImageTextLayoutDTO>>;
};

export interface ResumeAreaDTO<TLayout> {
  Layout: TLayout;
  Sequence: number;
}

export interface LayoutDTO {
  Type: string;
  Title: string;
  Name: string;
}

export interface TextLayoutDTO extends LayoutDTO {
  Content: string;
}
export interface ImageDTO {
  Id: string;
  Content: string;
}

export interface ImageTextLayoutDTO extends LayoutDTO {
  Content: string;
  Image: ImageDTO;
}
