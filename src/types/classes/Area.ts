import { LayoutType } from "types/enums/LayoutType";
import {
  IArea,
  IAreaType,
  IImageTextLayout,
  IKeyValueListLayout,
  IListLayout,
  ITextLayout,
} from "types/interfaces/IArea";

export class Area {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  Title: string;
  LayoutType?: LayoutType;
  AreaType?: IAreaType;
  TextLayout?: ITextLayout;
  ImageTextLayout?: IImageTextLayout;
  ListLayout?: IListLayout;
  KeyValueListLayout?: IKeyValueListLayout;
  constructor(area: IArea) {
    this.Id = area.Id;
    this.Sequence = area.Sequence;
    this.IsDisplayed = area.IsDisplayed;
    this.Title = area.Title;
    this.LayoutType = area.LayoutType;
    this.AreaType = area.AreaType;
    this.TextLayout = area.TextLayout;
    this.ImageTextLayout = area.ImageTextLayout;
    this.ListLayout = area.ListLayout;
    this.KeyValueListLayout = area.KeyValueListLayout;
  }
  /**
   * getAraTitle
   */
  public getAreaTitle(): string {
    return this.AreaType ? this.AreaType.Name : this.Title;
  }

  /**
   * isLayourType
   */
  public isLayoutType(type: LayoutType): boolean {
    if (this.AreaType) {
      return this.AreaType.LayoutType === type;
    } else {
      return this.LayoutType === type;
    }
  }
}
