import { BookmarkApiService } from '@api/bookmark/bookmark-api.service';
import { ContextMenuApiService } from '@api/context-menu/context-menu-api.service';
import { IContextMenuOnClickData } from '@api/context-menu/types/context-menu-api';

import { ContextMenuService } from '../context-menu.service';
import { BookmarkService } from './../../bookmark/bookmark.service';
import { Button } from './button';

export class AddToFolderButton extends Button {
  private readonly _bookmarkApiService: BookmarkApiService;
  private readonly _bookmarkService: BookmarkService;

  public constructor(
    contextMenuService: ContextMenuService,
    contextMenuApiService: ContextMenuApiService,
    bookmarkApiService: BookmarkApiService,
    bookmarkService: BookmarkService
  ) {
    super(AddToFolderButton.name, 'Add To', contextMenuService, contextMenuApiService);
    this._bookmarkApiService = bookmarkApiService;
    this._bookmarkService = bookmarkService;
  }

  protected action(info: IContextMenuOnClickData, tab: browser.tabs.Tab): void {
    this._bookmarkApiService.get(`${info.menuItemId}`).then((results) => {
      if (!!tab && !!tab.url && !!tab.title) {
        this._bookmarkService.add(tab.title, tab.url, results[0].title);
      }
    });
  }
}
