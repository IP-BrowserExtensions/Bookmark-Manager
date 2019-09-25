import { Bookmarks } from "./bookmarks";
import { ContextMenu } from "./context-menu";

export class AddOrRemoveButton {
    private readonly _states: { [state: string]: string } = {
        add: "★ Add Bookmark",
        remove: "☆ Remove Bookmark"
    };
    private _className: string = AddOrRemoveButton.name;
    private _currentState: string = this._states.add;

    private _contextMenu: ContextMenu;
    private _bookmarks: Bookmarks;

    public constructor(contextMenu: ContextMenu, bookmarks: Bookmarks) {
        this._contextMenu = contextMenu;
        this._bookmarks = bookmarks;
    }

    public createButton(parentId: string): void {
        this._contextMenu.add(this._className, parentId, this._states.add, this.action.bind(this));
        this._contextMenu.addSeparator(parentId);
    }

    public setRemoveState() {
        chrome.contextMenus.update(this._className, {
            title: this._states.remove
        });
        this._currentState = this._states.remove;
    }

    public setAddState() {
        chrome.contextMenus.update(this._className, {
            title: this._states.add
        });
        this._currentState = this._states.add;
    }

    public toggleButton(url?: string): void {
        chrome.bookmarks.search({ url }, (foundBookmarks) => {
            if (foundBookmarks.length !== 0 && this._currentState === this._states.add) {
                this.setRemoveState();
            } else {
                if (foundBookmarks.length === 0 && this._currentState === this._states.remove) {
                    this.setAddState();
                }
            }
        });
    }

    private action(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        chrome.tabs.get(<number>tab.id, (result) => {
            if (this._currentState === this._states.add) {
                this._bookmarks.quickAdd(result);
            } else {
                chrome.bookmarks.search({ url: result.url }, (results) => {
                    this._bookmarks.remove(results[0].id);
                });
            }
        });
    }
}
