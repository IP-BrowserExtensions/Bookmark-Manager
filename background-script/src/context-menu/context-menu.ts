import { Bookmarks } from "./../bookmarks/bookmarks";
import { AddButton } from "./buttons/add-button";
import { AddToFolderButton } from "./buttons/add-to-folder-button";
import { RemoveButton } from "./buttons/remove-button";
import { ContextMenuService } from "./context-menu.service";

export class ContextMenu {
    private readonly _addButton: AddButton;
    private readonly _removeButton: RemoveButton;
    private readonly _addToFolderButton: AddToFolderButton;
    private readonly _contextMenuService: ContextMenuService;
    private readonly _bookmarks: Bookmarks;

    public constructor() {}

    public setRemoveState() {
        this._addButton.setInvisible();
        this._removeButton.setVisible();
        this._addToFolderButton.setVisible();
    }

    public setAddState() {
        this._addButton.setVisible();
        this._removeButton.setInvisible();
        this._addToFolderButton.setInvisible();
    }

    public toggleButtons(url?: string) {
        chrome.bookmarks.search({ url }, (results) => {
            if (results.length !== 0) {
                this.setRemoveState();
            } else {
                this.setAddState();
            }
        });
    }
}
