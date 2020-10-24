import { BookmarkApiService } from '@api/bookmark/bookmark-api.service';
import { IBookmarkTreeNode } from '@api/bookmark/types/bookmark-api';
import { ContextMenuApiService } from '@api/context-menu/context-menu-api.service';
import { IContextMenuOnClickData, IContextMenuUpdateProperties } from '@api/context-menu/types/context-menu-api';

import { BookmarkService } from './../bookmark/bookmark.service';
import { AddButton } from './buttons/add-button';
import { AddToFolderButton } from './buttons/add-to-folder-button';
import { RemoveButton } from './buttons/remove-button';
import { ContextMenuService } from './context-menu.service';

export class ContextMenu {
  private readonly _rootFolderName = 'Bookmarks';
  private readonly _addButton: AddButton;
  private readonly _removeButton: RemoveButton;
  private readonly _addToFolderButton: AddToFolderButton;
  private readonly _contextMenuService: ContextMenuService;
  private readonly _contextMenuApiService: ContextMenuApiService;
  private readonly _bookmarkApiService: BookmarkApiService;

  public constructor(
    contextMenuApiService: ContextMenuApiService = new ContextMenuApiService(),
    contextMenuService: ContextMenuService = new ContextMenuService(contextMenuApiService),
    bookmarkApiService: BookmarkApiService = new BookmarkApiService(),
    bookmarkService: BookmarkService = new BookmarkService(bookmarkApiService)
  ) {
    this._contextMenuService = contextMenuService;
    this._contextMenuApiService = contextMenuApiService;
    this._bookmarkApiService = bookmarkApiService;

    this._addButton = new AddButton(contextMenuService, contextMenuApiService, bookmarkService);
    this._removeButton = new RemoveButton(contextMenuService, contextMenuApiService, bookmarkService);
    this._addToFolderButton = new AddToFolderButton(
      contextMenuService,
      contextMenuApiService,
      bookmarkApiService,
      bookmarkService
    );
  }

  public initialize(): void {
    this._bookmarkApiService.getTree().then((bookmarkTree) => {
      if (!!bookmarkTree) {
        this._contextMenuService.add(bookmarkTree[0].id, this._rootFolderName).then(() => {
          this._addButton.createButton(bookmarkTree[0].id);
          this._removeButton.createButton(bookmarkTree[0].id);
          this._addToFolderButton.createButton(bookmarkTree[0].id);
          this._contextMenuService.addSeparator(bookmarkTree[0].id);
          this.setAddState();
          this.createBookmarkTree(<IBookmarkTreeNode[]>bookmarkTree[0].children);
        });
      }
    });
  }

  public setRemoveState() {
    this._addButton.setInvisible();
    this._removeButton.setVisible();
    this._addToFolderButton.setVisible();
  }

  public setAddState() {
    this._addButton.setVisible();
    this._removeButton.setInvisible();
    this._addToFolderButton.setInvisible();
  }

  public toggleButtons(url?: string) {
    this._bookmarkApiService.search({ url }).then((results) => {
      if (results.length !== 0) {
        this.setRemoveState();
      } else {
        this.setAddState();
      }
    });
  }

  public add(id: string, parentId: string, title: string): void {
    this._contextMenuService.add(id, title, parentId, this.open.bind(this));
  }

  public remove(menuItemId: string): void {
    this._contextMenuApiService.remove(menuItemId);
  }

  public update(id: string, changeInfo: IContextMenuUpdateProperties) {
    this._contextMenuApiService.update(id, changeInfo);
  }

  private open(info: IContextMenuOnClickData, tab: browser.tabs.Tab): void {
    this._bookmarkApiService.get(<string>info.menuItemId).then((results) => {
      const url = results[0].url;
      browser.tabs.create({ active: true, url, windowId: tab.windowId });
    });
  }
}
