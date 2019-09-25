import { BookmarkService } from "../bookmark/bookmarkService";
import { AddButton } from "./buttons/add-button";
import { AddToFolderButton } from "./buttons/add-to-folder-button";
import { RemoveButton } from "./buttons/remove-button";
import { ContextMenuService } from "./context-menu.service";
import { IContextMenuUpdateProperties } from "./icontext-menu";

export class ContextMenu {
    private readonly _addButton: AddButton;
    private readonly _removeButton: RemoveButton;
    private readonly _addToFolderButton: AddToFolderButton;
    private readonly _contextMenuService: ContextMenuService;
    private readonly _bookmarkService: BookmarkService;

    public constructor(
        contextMenuService = new ContextMenuService(),
        bookmarkService = new BookmarkService()
    ) {
        this._contextMenuService = contextMenuService;
        this._bookmarkService = bookmarkService;

        this._addButton = new AddButton(contextMenuService, bookmarkService);
        this._removeButton = new RemoveButton(contextMenuService, bookmarkService);
        this._addToFolderButton = new AddToFolderButton(contextMenuService, bookmarkService);
    }

    public initialize() {
        this._bookmarkService.getTree((bookmarkTree) => {
            if (!!bookmarkTree) {
                chrome.contextMenus.create(
                    {
                        id: bookmarkTree[0].id,
                        title: "Bookmarks",
                        contexts: ["all"]
                    },
                    () => {
                        this._addButton.createButton(bookmarkTree[0].id);
                        this._removeButton.createButton(bookmarkTree[0].id);
                        this._addToFolderButton.createButton(bookmarkTree[0].id);
                        this._contextMenuService.addSeparator(bookmarkTree[0].id);
                        this.setAddState();

                        this.createBookmarkTree(<chrome.bookmarks.BookmarkTreeNode[]>(
                            bookmarkTree[0].children
                        ));
                    }
                );
            }
        });
    }

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

    public add(id: string, parentId: string, title: string): void {
        this._contextMenuService.add(id, parentId, title, this.open.bind(this));
    }

    public remove(menuItemId: string): void {
        this._contextMenuService.remove(menuItemId);
    }

    public update(id: string, changeInfo: IContextMenuUpdateProperties) {
        this._contextMenuService.update(id, changeInfo);
    }

    public createBookmarkTree(bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode[]): void {
        bookmarkTreeNode.forEach((node) => {
            this.add(node.id, <string>node.parentId, node.title);
            if (!!node.children) {
                this.createBookmarkTree(node.children);
            }
        });
    }

    private open(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        this._bookmarkService.get(info.menuItemId, (results) => {
            const url = results[0].url;
            window.open(url, "_blank");
        });
    }
}
