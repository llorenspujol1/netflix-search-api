import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface SearchListItem {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'search-list',
  styleUrls: [ './search-list.component.css' ],
  templateUrl: './search-list.component.html'
})
export class SearchListComponent implements OnInit {

  /**
   * Title to show on the list
   */
  @Input() title: string;

  /**
   * data to show in the list
   */
  @Input() listItems: SearchListItem[] = [];

  /**
   * Output eventEmitter that emits events when a list item is clicked
   */
  @Output() itemIndex: EventEmitter<number> = new EventEmitter<number>();

  constructor(
  ) {}

  public ngOnInit() {
  }

  itemClicked(itemIndex: number) {
    // propague item index to parent
    this.itemIndex.next(itemIndex);
  }

}
