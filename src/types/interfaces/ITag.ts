export interface ITag {
  Id: string;
  Name: string;
  Type: ITagType;
}

export interface IInnerTag {
  Id: string;
  Name: string;
  Type: ITagType;
  InnerId: string;
}

export interface ITagType {
  Id: number;
  Name: string;
  Value: string;
  Color: string;
}

export interface ITagTypeDetail extends ITagType {
  Tags: ITag[];
}
