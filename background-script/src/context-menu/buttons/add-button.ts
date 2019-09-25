import { BookmarkService } from "../../bookmark/bookmarkService";
import { ContextMenuService } from "../context-menu.service";
import { Button } from "./button";

export class AddButton extends Button {
    private _bookmarkService: BookmarkService;

    public constructor(contextMenuService: ContextMenuService, bookmarkService: BookmarkService) {
        super(contextMenuService, AddButton.name, "★ Add Bookmark");
        this._bookmarkService = bookmarkService;
    }

    protected action(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        if (!!tab && tab.url && tab.title) {
            this._bookmarkService.addToDefaultFolder(tab.title, info.pageUrl);
        }
    }
}
