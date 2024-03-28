import { LayoutType } from '@/types/enums/LayoutType';
import { IArea, IImageTextLayout, IKeyValueListLayout, IListLayout, ITextLayout } from '@/types/interfaces/IArea';

export class Area implements IArea {
  Id: IArea['Id'];
  Sequence: IArea['Sequence'];
  IsDisplayed: IArea['IsDisplayed'];
  Title: IArea['Title'];
  LayoutType?: IArea['LayoutType'];
  AreaTypeId?: IArea['AreaTypeId'];
  TextLayout?: IArea['TextLayout'];
  ImageTextLayout?: IArea['ImageTextLayout'];
  ListLayout?: IArea['ListLayout'];
  KeyValueListLayout?: IArea['KeyValueListLayout'];

  constructor(area: IArea) {
    this.Id = area.Id;
    this.Sequence = area.Sequence;
    this.IsDisplayed = area.IsDisplayed;
    this.Title = area.Title;
    this.LayoutType = area.LayoutType;
    this.AreaTypeId = area.AreaTypeId;
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
