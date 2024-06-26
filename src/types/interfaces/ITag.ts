export interface ITag {
  Id: string;
  Name: string;
  Type: ITagType;
}

export interface ITagPost {
  Id: string;
  Name: string;
  TagTypeId: number;
}

export interface IInnerTag {
  Id: string | number;
  Name: string;
  Type: ITagType;
}

export interface ITagType {
  Id: number;
  Name: string;
  Value: string;
  Color: string;
}

export interface ITagTypeDetail extends ITagType {
  Tags?: ITag[];
}
