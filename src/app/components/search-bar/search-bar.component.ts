import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

export enum FavButtonState {
  Disabled,
  Highlighted,
  Default
}

@Component({
  selector: 'search-bar',
  styleUrls: [ './search-bar.component.css' ],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit {

  /**
   * Represents the fav button actual state
   */
  @Input() favState: FavButtonState = FavButtonState.Default;

  /**
   * Output event emitter for input search changes
   */
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Output event emitter for input search changes
   */
  @Output() favourite: EventEmitter<string> = new EventEmitter<string>();

  private currentValue: string;

  // We do this in order to use it on the template
  public favButtonsState = FavButtonState;

  constructor() { }

  public ngOnInit() { }

  /**
   * Propagues changes from input to parent component
   * @param  {string} value
   */
  public onInputChange(value: string) {
    // keep current input value on currentValue variable
    this.currentValue = value;
    // just propagates the input change to parent
    this.inputChange.next(value);
  }

  /**
   * Propagues current input value when favourite button is clicked
   */
  public favouriteClicked() {
    this.favourite.next(this.currentValue);
  }
}
