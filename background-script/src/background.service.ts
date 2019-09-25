import { Bookmarks } from "./bookmarks/bookmarks";
import { ContextMenuSerivce } from "./context-menu/context-menu.service";

// import { AddOrRemoveButton } from "./ToDelete/add-or-remove-button";
export class BackgroundService {
    public activeTabInfo: chrome.tabs.TabActiveInfo;

    //private _addOrRemoveButton: AddOrRemoveButton;
    private _bookmarks: Bookmarks;
    private _contextMenuService: ContextMenuSerivce;

    public constructor() {
        this._contextMenuService = new ContextMenuSerivce();
        this._bookmarks = new Bookmarks(this._contextMenuService);
        //this._addOrRemoveButton = new AddOrRemoveButton(this._contextMenuService, this._bookmarks);
        this.activeTabInfo = { tabId: -1, windowId: -1 };
        this.initializeActiveTabInfo();
    }

    // public get addOrRemoveButton() {
    //     // return this._addOrRemoveButton;
    // }

    public get bookmarks() {
        return this._bookmarks;
    }

    public get contextMenu() {
        return this._contextMenuService;
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
                        //this._addOrRemoveButton.createButton(bookmarkTree[0].id);

                        this._contextMenuService.addSeparator(bookmarkTree[0].id);
                        this._contextMenuService.createBookmarkTree(<
                            chrome.bookmarks.BookmarkTreeNode[]
                        >bookmarkTree[0].children);
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
