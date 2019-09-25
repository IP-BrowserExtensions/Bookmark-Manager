export class BookmarkService {
    private _defaultBookmarkFolders: chrome.bookmarks.BookmarkTreeNode[] = [];
    private _defaultUserFolder: string;

    constructor(defaultFolder = "Bookmark Manager") {
        this._defaultUserFolder = defaultFolder;
        this.getDefaultBookmarkFolders();
    }

    public get(id: string, callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void): void {
        chrome.bookmarks.get(id, callback);
    }

    public getTree(callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void): void {
        chrome.bookmarks.getTree(callback);
    }

    public add(title: string, url: string, folderName: string): void {
        this.search({ title: folderName }, (results) => {
            if (!!results && results.length !== 0) {
                this.create({ parentId: results[0].id, title, url });
            }
        });
    }

    public addToDefaultFolder(title: string, url: string): void {
        this.search({ title: this._defaultUserFolder }, (results) => {
            if (!results || (!!results && results.length === 0)) {
                this.createDefaultUserFolder((result) => {
                    this.create({ parentId: result.id, title, url });
                });
            }
            this.create({ parentId: results[0].id, title, url });
        });
    }

    public removeByUrl(url: string) {
        this.search({ url }, (results) => {
            this.remove(results[0].id);
        });
    }

    private remove(id: string, callback?: () => void): void {
        chrome.bookmarks.remove(id, callback);
    }

    private create(
        { parentId, title, url }: { parentId?: string; title?: string; url?: string },
        callback?: (result: chrome.bookmarks.BookmarkTreeNode) => void
    ): void {
        chrome.bookmarks.create(
            {
                parentId,
                title,
                url
            },
            callback
        );
    }

    private search(
        query: chrome.bookmarks.BookmarkSearchQuery,
        callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void
    ) {
        chrome.bookmarks.search(query, callback);
    }

    private createDefaultUserFolder(
        callback: (result: chrome.bookmarks.BookmarkTreeNode) => void
    ): void {
        this.create(
            {
                parentId: (<chrome.bookmarks.BookmarkTreeNode>(
                    this._defaultBookmarkFolders.find((x) => x.title === "Bookmarks bar")
                )).id,
                title: this._defaultUserFolder
            },
            callback
        );
    }

    private getDefaultBookmarkFolders(): void {
        chrome.bookmarks.getTree((bookmarkTree) => {
            if (!!bookmarkTree) {
                (<chrome.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children).forEach(
                    (element) => {
                        this._defaultBookmarkFolders.push({ ...element, children: undefined });
                    }
                );
            }
        });
    }
}
