export class ContextMenu {
    public add(
        id: string,
        parentId: string,
        title: string,
        onClickFunction: (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void,
        type: string = "normal",
        contexts: string[] = ["all"]
    ): void {
        chrome.contextMenus.create({
            title,
            id,
            parentId,
            type,
            contexts,
            onclick: onClickFunction
        });
    }

    public addSeparator(parentId: string, contexts: string[] = ["all"]): void {
        chrome.contextMenus.create({
            parentId,
            type: "separator",
            contexts
        });
    }

    public remove(menuItemId: string): void {
        chrome.contextMenus.remove(menuItemId);
    }

    public update(id: string, changeInfo: chrome.bookmarks.BookmarkChangeInfo) {
        chrome.contextMenus.update(id, { title: changeInfo.title });
    }

    public openBookmark(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
        chrome.bookmarks.get(info.menuItemId, (foundBookmark) => {
            const url = foundBookmark[0].url;
            window.open(url, "_blank");
        });
    }

    public createBookmarkTree(bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode[]): void {
        bookmarkTreeNode.forEach((node) => {
            this.add(node.id, <string>node.parentId, node.title, this.openBookmark);
            if (!!node.children) {
                this.createBookmarkTree(node.children);
            }
        });
    }
}
