import { LayoutType } from '@/types/enums/LayoutType';
import { IArea, IImageTextLayout, IKeyValueListLayout, IListLayout, ITextLayout } from '@/types/interfaces/IArea';

export class Area {
  Id: string;
  Sequence: number;
  IsDisplayed: boolean;
  Title: string;
  LayoutType?: LayoutType;
  AreaType?: number;
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
    this.AreaType = area.AreaTypeId;
    this.TextLayout = area.TextLayout;
    this.ImageTextLayout = area.ImageTextLayout;
    this.ListLayout = area.ListLayout;
    this.KeyValueListLayout = area.KeyValueListLayout;
  }
  public getAreaTitle(): string {
    return this.Title;
  }

  public isLayoutType(type: LayoutType): boolean {
    return this.LayoutType === type;
  }
}
