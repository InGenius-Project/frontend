export interface TagDTO {
  Id: string;
  Name: string;
  Type: TagTypeDTO;
}

export interface TagTypeDTO {
  Id: number;
  Name: string;
  Value: string;
  Color: string;
}
