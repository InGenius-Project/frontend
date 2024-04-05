import { ITag, ITagType } from '@/types/interfaces/ITag';
import { LayoutType } from '@/types/enums/LayoutType';
import { UserRole } from '@/types/enums/UserRole';

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

export interface IImageTextLayoutPostDTO {
  AreaId: string;
  TextContent: string;
  AltContent: string;
  Image: FormData;
}

export interface IImageInfo {
  Id: string;
  Uri: string;
  ContentType: string;
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
