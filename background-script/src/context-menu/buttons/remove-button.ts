import { Bookmarks } from "../../bookmarks/bookmarks";
import { ContextMenuSerivce } from "../context-menu.service";
import { Button } from "./button";

export class RemoveButton extends Button {
    private _bookmarks: Bookmarks;

    public constructor(contextMenuService: ContextMenuSerivce, bookmarks: Bookmarks) {
        super(contextMenuService, RemoveButton.name, "☆ Remove Bookmark");
        this._bookmarks = bookmarks;
    }

    protected action(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        this._bookmarks.remove(info.menuItemId);
    }
}
