export class BookmarkWrapper {
    public get(id: string, callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void): void {
        chrome.bookmarks.get(id, callback);
    }

    public getTree(callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void): void {
        chrome.bookmarks.getTree(callback);
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
}
