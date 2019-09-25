import { BookmarksBase } from "./bookmarks-base";
import { ContextMenu } from "./context-menu";

export class Bookmarks extends BookmarksBase {
    private _contextMenu: ContextMenu;

    public constructor(contextMenu: ContextMenu) {
        super();
        this._contextMenu = contextMenu;
    }

    public addToContextMenu(id: string, parentId: string, title: string): void {
        this._contextMenu.add(id, parentId, title, this._contextMenu.openBookmark);
    }

    public removeFromContextMenu(menuItemId: string): void {
        this._contextMenu.remove(menuItemId);
    }
}
