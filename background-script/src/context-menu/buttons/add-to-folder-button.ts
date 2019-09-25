import { BookmarkService } from "../../bookmark/bookmarkService";
import { ContextMenuService } from "../context-menu.service";
import { Button } from "./button";

export class AddToFolderButton extends Button {
    private _bookmarkService: BookmarkService;

    public constructor(contextMenuService: ContextMenuService, bookmarkService: BookmarkService) {
        super(contextMenuService, AddToFolderButton.name, "Add To");
        this._bookmarkService = bookmarkService;
    }

    protected action(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        if (!!tab && tab.url && tab.title) {
            this._bookmarkService.add(tab.title, tab.url, info.menuItemId);
        }
    }
}
