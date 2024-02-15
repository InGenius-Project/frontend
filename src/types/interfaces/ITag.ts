export interface ITag {
  Id: string;
  Name: string;
  Type: ITagType;
}

export interface ITagType {
  Id: number;
  Name: string;
  Value: string;
  Color: string;
}
