import { Bookmarks } from './bookmarks';
import { ContextMenu } from './context-menu';

export class AddOrRemoveButton {
    private _contextMenu: ContextMenu;
    private _bookmarks: Bookmarks;
    private readonly _states: { [state: string]: string } = {
        add: "★ Add Bookmark",
        remove: "☆ Remove Bookmark"
    };
    private _className: string = AddOrRemoveButton.name;
    private _currentState: string = this._states.add;

    public constructor(contextMenu: ContextMenu, bookmarks: Bookmarks) {
        this._contextMenu = contextMenu;
        this._bookmarks = bookmarks;
    }

    public createButton(parentId: string): void {
        this._contextMenu.add(this._className, parentId, this._states.add, this.action.bind(this));
        this._contextMenu.addSeparator(parentId);
    }

    public toggleButton(url?: string): void {
        chrome.bookmarks.search({ url: url }, (foundBookmarks) => {
            if (foundBookmarks.length != 0 && this._currentState == this._states.add) {
                this.setRemoveState();
            } else {
                if (foundBookmarks.length == 0 && this._currentState == this._states.remove) {
                    this.setAddState();
                }
            }
        });
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

    private action(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        chrome.tabs.get(<number>tab.id, (result) => {
            if (this._currentState == this._states.add) {
                this._bookmarks.quickAdd(result);
            } else {
                chrome.bookmarks.search({ url: result.url }, (result) => {
                    this._bookmarks.remove(result[0].id);
                });
            }
        });
    }
}
