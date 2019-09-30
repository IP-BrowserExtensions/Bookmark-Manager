import { ContextMenuApiService } from "@api/context-menu/context-menu-api.service";
import { IContextMenuOnClickData } from "@api/context-menu/types/context-menu-api";

import { BookmarkService } from "../../bookmark/bookmark.service";
import { ContextMenuService } from "../context-menu.service";
import { Button } from "./button";

export class AddButton extends Button {
    private readonly _bookmarkService: BookmarkService;

    public constructor(
        contextMenuService: ContextMenuService,
        contextMenuApiService: ContextMenuApiService,
        bookmarkService: BookmarkService
    ) {
        super(AddButton.name, "★ Add Bookmark", contextMenuService, contextMenuApiService);
        this._bookmarkService = bookmarkService;
    }

    protected action(info: IContextMenuOnClickData, tab: browser.tabs.Tab): void {
        if (!!tab && tab.url && tab.title) {
            this._bookmarkService.addToUserFolder(tab.title, tab.url);
        }
    }
}
