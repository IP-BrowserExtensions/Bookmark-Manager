import { Bookmarks } from "../../bookmarks/bookmarks";
import { ContextMenuSerivce } from "../context-menu.service";
import { Button } from "./button";

export class AddButton extends Button {
    private _bookmarks: Bookmarks;

    public constructor(contextMenuService: ContextMenuSerivce, bookmarks: Bookmarks) {
        super(contextMenuService, AddButton.name, "★ Add Bookmark");
        this._bookmarks = bookmarks;
    }

    protected action(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        this._bookmarks.add(tab.url, info.pageUrl);
    }
}
