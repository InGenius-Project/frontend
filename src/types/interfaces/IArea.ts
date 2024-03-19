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

export interface IAreaPost extends Omit<IArea, 'Id'> {
  Id: string;
}

export interface ILayout {
  Id: string;
}

export interface ITextLayout extends ILayout {
  Content: string;
}
export interface IImageTextLayout extends ILayout {
  Content: string;
  Image?: IImage;
}
export interface IImage {
  Id: string;
  Filename: string;
  Content: string;
  ContentType: string;
}

export interface IListLayout extends ILayout {
  Items?: Array<ITag>;
}

export interface IKeyValueListLayout extends ILayout {
  Items?: Array<IKeyValueItem>;
}

export interface IKeyValueItem {
  Id: string;
  Key: ITag;
  Value: string;
}
