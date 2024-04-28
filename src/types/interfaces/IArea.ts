import { ITag, ITagType } from '@/types/interfaces/ITag';
import { LayoutType } from '@/types/enums/LayoutType';
import { UserRole } from '@/types/enums/UserRole';
import { internalCreateRangeSelection } from 'lexical/LexicalSelection';

export interface IArea {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  Title: string;
  LayoutType?: LayoutType;
  AreaTypeId?: number;
  TextLayout?: ITextLayout;
  ImageTextLayout?: IImageTextLayout;
  ListLayout?: IListLayout;
  KeyValueListLayout?: IKeyValueListLayout;
  UserId?: string;
  RecruitmentId?: string;
  ResumeId?: string;
}

export interface IAreaSequencePost extends Pick<IArea, 'Id' | 'Sequence'> {}

export interface IAreaType {
  Id: number;
  Name: string;
  Value: string;
  Description: string;
  LayoutType: LayoutType;
  UserRole: Array<UserRole>;
  ListTagTypes: Array<ITagType>;
}

export interface IAreaTypePost extends Omit<IAreaType, 'Id'> {
  Id?: number;
}

export interface IAreaPost {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  Title: string;
  LayoutType?: LayoutType;
  AreaTypeId?: number;
  RecruitmentId?: string;
  UserId?: string;
  ResumeId?: string;
}

export enum GenerateAreaType {
  'Resume' = 'resume',
  'Recruitment' = 'recruitment',
}

export interface IGenerateAreaPost {
  TitleOnly: boolean;
  AreaNum: number;
  Title: string;
  Type: GenerateAreaType;
}

export interface IGenerateAreaByTitlePost {
  ResumeTitle: string;
  AreaTitles: Array<string>;
}

export interface ILayout {
  Id: string;
}

export interface ITextLayout extends ILayout {
  Content: string;
}

export interface ITextLayoutPost extends Omit<ITextLayout, 'Id'> {
  areaId: string;
}

export interface IImageTextLayout extends ILayout {
  TextContent: string;
  Image?: IImageInfo;
}

/**
 * Represents the interface for an image text layout post.
 */
export interface IImageTextLayoutPost {
  AreaId: string;

  /**
   * Represents the form data for the image text layout post.
   * @property {string} AltContent - The alternative content for the image.
   * @property {string} TextContent - The text content for the image.
   * @property {FormFile} Image - The image data.
   * @property {string} ImageUri - The URI of the image.
   */
  FormData: FormData;
}

export interface IImageInfo {
  Id: string;
  Uri: string;
  AltContent: string;
}

export interface IListLayout extends ILayout {
  Items?: Array<ITag>;
}

export interface IListLayoutPost {
  areaId: string;
  Items?: Array<ITag>;
}

export interface IKeyValueListLayout extends ILayout {
  Items?: Array<IKeyValueItem>;
}

export interface IKeyValueListLayoutPost {
  areaId: string;
  Items?: Array<IKeyValueItemPostDTO>;
}

export interface IKeyValueItem {
  Id: string;
  Key?: ITag;
  Value: string;
}

export interface IInnerKeyValueItem extends IKeyValueItem {
  InnerId: string;
}

export interface IKeyValueItemPostDTO {
  Id?: string;
  TagId?: string;
  Value: string;
}
