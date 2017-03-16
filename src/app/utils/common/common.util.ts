import { Favourite } from '../../components/favourites/favourites.component'

/**
 * Common Util that has multiple pure functions that make clear and immutable operations
 */
export class CommonUtil {

  /**
   * Returns a new instance of the favourites array with the new favourite already added and sorted from most favourited to minus
   * @param  {Favourite[]} favouritesOld
   * @param  {string} favouriteName
   * @returns Favourite
   */
  public static addFavourite(favouritesOld: Favourite[], favouriteName: string): Favourite[] {

    // Creates a copy of the favourites old preserving our concept of immutability data.
    let favouritesNew: Favourite[] = favouritesOld.slice();

    // find for favourite
    let fav = favouritesNew.find(
      (value: Favourite) => {
        if(value.name === favouriteName) {
          return true;
        }
        return false;
      }
    )

    // Sum +1 or add a new fav
    if(fav) {
      fav.nFavs++;
    } else {
      favouritesNew.push({name: favouriteName, nFavs: 1} as Favourite);
    }

    // sort favourites. Note: this could be improbable if needed
    favouritesNew.sort(
      (a: Favourite, b:Favourite) => {
        return b.nFavs - a.nFavs;
      }
    )

    // We return completelly new array of Favourites with the new favourite added.
    return favouritesNew;
  }


}
