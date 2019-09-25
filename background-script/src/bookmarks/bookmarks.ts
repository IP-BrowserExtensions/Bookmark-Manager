import { ContextMenuSerivce } from "../context-menu/context-menu.service";
import { BookmarksBase } from "./bookmarks-base";

export class Bookmarks extends BookmarksBase {
    private _contextMenuService: ContextMenuSerivce;

    public constructor(contextMenu: ContextMenuSerivce) {
        super();
        this._contextMenuService = contextMenu;
    }

    public addToContextMenu(id: string, parentId: string, title: string): void {
        this._contextMenuService.add(id, parentId, title, this._contextMenuService.openBookmark);
    }

    public removeFromContextMenu(menuItemId: string): void {
        this._contextMenuService.remove(menuItemId);
    }
}
