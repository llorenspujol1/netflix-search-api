import { Component, OnInit, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { NetflixApiResponse } from '../../services';

export interface Favourite {
  name: string;
  nFavs: number;
}

@Component({
  selector: 'detail',
  styleUrls: [ './detail.component.css' ],
  templateUrl: './detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

  /**
   * Input recieving the list of favourites to represent as an Immutable data because we work
   * with change detection strategy OnPush
   */
  @Input() data: NetflixApiResponse;

  constructor() { }

  public ngOnInit() {
    console.log('detail data', this.data);
  }


}
