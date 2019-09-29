import { BookmarkService } from "../../bookmark/bookmark.service";
import { ContextMenuService } from "../context-menu.service";
import { Button } from "./button";

export class AddToFolderButton extends Button {
    private _bookmarkService: BookmarkService;

    public constructor(contextMenuService: ContextMenuService, bookmarkService: BookmarkService) {
        super(contextMenuService, AddToFolderButton.name, "Add To");
        this._bookmarkService = bookmarkService;
    }

    protected action(info: browser.menus.OnClickData, tab: browser.tabs.Tab): void {
        this._bookmarkService.get(`${info.menuItemId}`).then((results) => {
            if (!!tab && !!tab.url && !!tab.title) {
                this._bookmarkService.add(tab.title, tab.url, results[0].title);
            }
        });
    }
}
