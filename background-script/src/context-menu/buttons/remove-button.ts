import { IContextMenuOnClickData } from "@api/context-menu/types/context-menu-api";

import { BookmarkService } from "../../bookmark/bookmark.service";
import { ContextMenuService } from "../context-menu.service";
import { Button } from "./button";

export class RemoveButton extends Button {
    private _bookmarkService: BookmarkService;

    public constructor(contextMenuService: ContextMenuService, bookmarkService: BookmarkService) {
        super(contextMenuService, RemoveButton.name, "☆ Remove Bookmark");
        this._bookmarkService = bookmarkService;
    }

    protected action(info: IContextMenuOnClickData, tab: browser.tabs.Tab): void {
        if (!!tab && !!tab.url) {
            this._bookmarkService.removeByUrl(tab.url);
        }
    }
}
