import { BookmarkService } from "./bookmarks/bookmarkService";
import { ContextMenu } from "./context-menu/context-menu";

export class BackgroundService {
    public activeTabInfo: chrome.tabs.TabActiveInfo;

    private _bookmarkService: BookmarkService;
    private _contextMenu: ContextMenu;

    public constructor() {
        this._contextMenu = new ContextMenu();
        this._bookmarkService = new BookmarkService();
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
        chrome.tabs.getCurrent((tab) => {
            if (!!tab && !!tab.id) {
                this.activeTabInfo = { tabId: tab.id, windowId: tab.windowId };
            }
        });
    }
}
