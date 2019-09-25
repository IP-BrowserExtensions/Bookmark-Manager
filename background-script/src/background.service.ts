import { AddOrRemoveButton } from "./add-or-remove-button";
import { Bookmarks } from "./bookmarks";
import { ContextMenu } from "./context-menu";

export class BackgroundService {
    private _addOrRemoveButton: AddOrRemoveButton;
    private _bookmarks: Bookmarks;
    private _contextMenu: ContextMenu;
    public activeTabInfo: chrome.tabs.TabActiveInfo;

    public constructor() {
        this._contextMenu = new ContextMenu();
        this._bookmarks = new Bookmarks(this._contextMenu);
        this._addOrRemoveButton = new AddOrRemoveButton(this._contextMenu, this._bookmarks);
        this.activeTabInfo = { tabId: -1, windowId: -1 };
        this.initializeActiveTabInfo();
    }

    public get addOrRemoveButton() {
        return this._addOrRemoveButton;
    }

    public get bookmarks() {
        return this._bookmarks;
    }

    public get contextMenu() {
        return this._contextMenu;
    }

    public initializeContextMenu() {
        chrome.bookmarks.getTree((bookmarkTree) => {
            if (!!bookmarkTree) {
                chrome.contextMenus.create(
                    {
                        id: bookmarkTree[0].id,
                        title: "Bookmarks",
                        contexts: ["all"]
                    },
                    () => {
                        this._addOrRemoveButton.createButton(bookmarkTree[0].id);
                        this._contextMenu.createBookmarkTree(<chrome.bookmarks.BookmarkTreeNode[]>(
                            bookmarkTree[0].children
                        ));
                    }
                );
            }
        });
    }

    private initializeActiveTabInfo() {
        chrome.tabs.getCurrent((tab) => {
            if (!!tab && !!tab.id) {
                this.activeTabInfo = { tabId: tab.id, windowId: tab.windowId };
            }
        });
    }
}
