import { Component, OnInit } from '@angular/core';

import { NetflixService, NetflixApiResponse } from '../services';

import { Favourite } from '../components/favourites/favourites.component';
import { FavButtonState } from '../components/search-bar/search-bar.component';
import { SearchListItem } from '../components/search-list/search-list.component';

//import CommonUtil
import { CommonUtil } from '../utils'

//Rxjs
import { Subscription } from 'Rxjs'

@Component({
  // This has no selector, it will be created dinamically with the router
  styleUrls: [ './search-page.component.css' ],
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent implements OnInit {

  // stores all array of netlix api response. Maybe this would go on exeternal service in a real application
  searchResults: NetflixApiResponse[] = [];

  //Search list items to show on the ListComponent
  searchResultsList: SearchListItem[] = [];

  // stores all array of favourites. Maybe this would go on exeternal service in a real application
  favourites: Favourite[] = [];

  // stores the top 3 favourites
  top3Favourites: Favourite[] = [];

  // stores the current item selected from the list
  currentItem: NetflixApiResponse;

  //save the search subscription in order to cancel it if neede
  lastSubscription: Subscription;

  // controls the fav button state that we have to represent
  favButtonState: FavButtonState = FavButtonState.Default;

  constructor(
    private netflixService: NetflixService
   ) {}

  public ngOnInit() {

  }

  public doSearch(value: string) {
    // unsubscribe last subscription if present
    if(this.lastSubscription && !this.lastSubscription.closed) { this.lastSubscription.unsubscribe() }
    // disable fav button when searching on api
    this.favButtonState = FavButtonState.Disabled;
    // remove detail item
    this.currentItem = undefined;
    // search for actor/actress & stores last subscription
    this.lastSubscription = this.netflixService.searchActor(value).subscribe(
      (data: NetflixApiResponse[]) => {
        console.log('netflix data', data);
        this.searchResults = data;
        this.searchResultsList = data.map(x => {return {title: x.show_title, subtitle: x.release_year+''} });
        if(this.searchResults.length > 0) {
          // if the search input matches with one of our three favourties just highlight
          let favMatch = this.top3Favourites.find(
            (fav: Favourite) => {
              if(fav.name === value) {
                return true;
              }
              return false;
            }
          );

          if(favMatch) {
            // set fav button highlihted
            this.favButtonState = FavButtonState.Highlighted;
            // set +1 on favourites
            favMatch.nFavs++;
            // Sort
            this.top3Favourites.sort( (a: Favourite, b:Favourite) => { return b.nFavs - a.nFavs; } );
            // Fire change detection
            this.top3Favourites = this.top3Favourites.slice();
        } else {
            this.favButtonState = FavButtonState.Default;
          }
        }
      }
    );
  }

  public addFavourite(favourite: string) {
    if(!favourite || favourite.length === 0) {
      return;
    }
    //set favButton state
    this.favButtonState = FavButtonState.Highlighted;
    // adds tha favourite with a pure funciton addFavourite
    this.favourites = CommonUtil.addFavourite(this.favourites, favourite);
    // get the 3 first favourites
    this.top3Favourites = this.favourites.slice(0, 3);
  }

  /**
   * Fired when an item from the list is clicked. Saves the reference of the new currentItem
   * @param  {number} index
   * @returns void
   */
  public onListItemClicked(index: number): void {
    this.currentItem = this.searchResults[index];
  }
}
