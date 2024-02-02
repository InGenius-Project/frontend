export interface TagDTO {
  Id: string;
  Name: string;
  Type: TagTypeDTO;
}

export interface TagTypeDTO {
  Id: string;
  Name: string;
  Value: string;
  Color: string;
}
