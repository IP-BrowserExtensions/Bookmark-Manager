import { BookmarkApiService } from '@api/api-services/bookmark-api.service';
import { IActiveTabInfo } from '@api/types/tabs-api';

import { BookmarkService } from './bookmark/bookmark.service';
import { ContextMenu } from './context-menu/context-menu';

export class BackgroundService {
  public activeTabInfo: IActiveTabInfo;
  private _bookmarkService: BookmarkService;
  private _contextMenu: ContextMenu;

  public constructor() {
    this._contextMenu = new ContextMenu();
    const bookmarkApiService = new BookmarkApiService(); //TODO remove and add dependency injection
    this._bookmarkService = new BookmarkService(bookmarkApiService);
    this.activeTabInfo = { tabId: -1, windowId: -1 };
    this.initializeActiveTabInfo();
  }

  public get bookmarks() {
    return this._bookmarkService;
  }

  public get contextMenu() {
    return this._contextMenu;
  }

  private initializeActiveTabInfo() {
    browser.tabs.getCurrent().then((tab) => {
      if (!!tab && !!tab.id && !!tab.windowId) {
        this.activeTabInfo = { tabId: tab.id, windowId: tab.windowId };
      }
    });
  }
}
