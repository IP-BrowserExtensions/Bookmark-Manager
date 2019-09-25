export class BookmarksBase {
    private _defaultFolders: chrome.bookmarks.BookmarkTreeNode[] = [];
    private _bookmarksFolder = "Bookmark Manager";

    constructor() {
        this.createBookmarksFolderIfNonExistent();
        this.getDefaultFolders();
    }

    getDefaultFolders() {
        chrome.bookmarks.getTree((bookmarkTree) => {
            if (!!bookmarkTree) {
                (<chrome.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children).forEach(
                    (element) => {
                        this._defaultFolders.push({ ...element, children: undefined });
                    }
                );
            }
        });
    }

    quickAdd(tab: chrome.tabs.Tab) {
        chrome.bookmarks.search({ title: this._bookmarksFolder }, (result) => {
            this.create(result[0].id, <string>tab.title, <string>tab.url);
        });
    }

    // add(tab: chrome.tabs.Tab) {
    //     chrome.bookmarks.search({ title: this.bookmarksFolder }, (resultValue) => {
    //         this.create(resultValue[0].id, <string>tab.title, <string>tab.url);
    //     });
    // }

    remove(id: string, callBack?: () => void): void {
        chrome.bookmarks.remove(id, callBack);
    }

    create(parentId: string, title: string, url?: string) {
        chrome.bookmarks.create({
            parentId,
            title,
            url
        });
    }

    createBookmarksFolderIfNonExistent(): void {
        chrome.bookmarks.search({ title: this._bookmarksFolder }, (result) => {
            if (!!result && result.length === 0) {
                this.create(
                    (<chrome.bookmarks.BookmarkTreeNode>(
                        this._defaultFolders.find((x) => x.title === "Bookmarks bar")
                    )).id,
                    this._bookmarksFolder
                );
            }
        });
    }
}
