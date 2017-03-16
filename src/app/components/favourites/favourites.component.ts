import { Component, OnInit, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

export interface Favourite {
  name: string;
  nFavs: number;
}

@Component({
  selector: 'favourites',
  styleUrls: [ './favourites.component.css' ],
  templateUrl: './favourites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesComponent implements OnInit {

  /**
   * Title of favourites component default set to 'Favourites'
   */
  @Input() title: string = 'Favourites';

  /**
   * Input recieving the list of favourites to represent as an Immutable data because we work
   * with change detection strategy OnPush
   */
  @Input() favourites: Favourite[];

  constructor() { }

  public ngOnInit() {

  }


}
