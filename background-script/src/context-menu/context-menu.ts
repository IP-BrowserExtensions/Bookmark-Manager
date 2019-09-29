import { BookmarkService } from "./../bookmark/bookmark.service";
import { AddButton } from "./buttons/add-button";
import { AddToFolderButton } from "./buttons/add-to-folder-button";
import { RemoveButton } from "./buttons/remove-button";
import { ContextMenuService } from "./context-menu.service";
import { IContextMenuUpdateProperties } from "./icontext-menu";

export class ContextMenu {
    private readonly _rootFolderName = "Bookmarks";
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
        this._bookmarkService.getTree().then((bookmarkTree) => {
            if (!!bookmarkTree) {
                this._contextMenuService.add(bookmarkTree[0].id, this._rootFolderName).then(() => {
                    this._addButton.createButton(bookmarkTree[0].id);
                    this._removeButton.createButton(bookmarkTree[0].id);
                    this._addToFolderButton.createButton(bookmarkTree[0].id);
                    this._contextMenuService.addSeparator(bookmarkTree[0].id);
                    this.setAddState();
                    this.createBookmarkTree(<browser.bookmarks.BookmarkTreeNode[]>(
                        bookmarkTree[0].children
                    ));
                });
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
        this._bookmarkService.search({ url }).then((results) => {
            if (results.length !== 0) {
                this.setRemoveState();
            } else {
                this.setAddState();
            }
        });
    }

    public add(id: string, parentId: string, title: string): void {
        this._contextMenuService.add(id, title, parentId, this.open.bind(this));
    }

    public remove(menuItemId: string): void {
        this._contextMenuService.remove(menuItemId);
    }

    public update(id: string, changeInfo: IContextMenuUpdateProperties) {
        this._contextMenuService.update(id, changeInfo);
    }

    public createBookmarkTree(bookmarkTreeNode: browser.bookmarks.BookmarkTreeNode[]): void {
        bookmarkTreeNode.forEach((node) => {
            this.add(node.id, <string>node.parentId, node.title);
            if (!!node.children) {
                this.createBookmarkTree(node.children);
            }
        });
    }

    private open(info: browser.menus.OnClickData, tab: browser.tabs.Tab): void {
        console.log(info, tab);
        this._bookmarkService.get(<string>info.menuItemId).then((results) => {
            const url = results[0].url;
            console.log(url);
            browser.tabs.create({ active: true, url, windowId: tab.windowId });
            // window.open(url, "_blank");
        });
    }
}
