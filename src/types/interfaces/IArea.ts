import { ITag, ITagType } from '@/types/interfaces/ITag';
import { LayoutType } from '@/types/enums/LayoutType';
import { UserRole } from '@/types/enums/UserRole';
import { internalCreateRangeSelection } from 'lexical/LexicalSelection';
import { AvatarPostFormData } from './IUser';
import { TagType } from '@/types/enums/TagType';

export interface IWithAreas {
  Id: string;
  Areas?: IArea[];
}

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

export enum AreaGenType {
  Resume,
  Recruitment,
}

export interface IGenerateAreaPost {
  TitleOnly: boolean;
  AreaNum: number;
  Title: string;
  Type: AreaGenType;
}

export interface IGenerateAreaByTitlePost {
  Title: string;
  AreaTitles: Array<string>;
  Type: AreaGenType;
}

export interface ILayout {
  Id: string;
}

export interface ITextLayout extends ILayout {
  Content: string;
}

export interface ITextLayoutPost extends Omit<ITextLayout, 'Id'> {
  AreaId: string;
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
  AltContent: string;
  TextContent: string;
  Image?: Blob;
  Uri?: string;
}

export interface IImageSource {
  Raw: string;
  Full: string;
  Regular: string;
  Small: string;
  Thumb: string;
  Download: string;
}

export interface IImageInfo {
  Id: string;
  Uri?: string;
  Urls?: IImageSource;
  DownloadUri?: string;
  AltContent?: string;
  ContentType?: string;
}

export interface IListLayout extends ILayout {
  Items?: Array<ITag>;
}

export interface IListLayoutPost {
  AreaId: string;
  Items?: Array<IListItemPost>;
}

export interface IListItemPost {
  Id: string;
  Name: string;
  TagTypeId: number;
}

export interface IKeyValueListLayout extends ILayout {
  Items?: Array<IKeyValueItem>;
}

export interface IKeyValueListLayoutPost {
  AreaId: string;
  Items?: Array<IKeyValueItemPostDTO>;
}

export interface IKeyValueItem {
  Id: string;
  Key?: ITag[];
  Value: string;
}

export interface IInnerKeyValueItem extends Omit<IKeyValueItem, 'Id'> {
  Id: string | number;
}

export interface IKeyValueItemPostDTO {
  // Id?: string;
  TagIds?: string[];
  Value: string;
}
