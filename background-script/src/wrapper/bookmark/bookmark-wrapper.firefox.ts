import { IBookmarkTreeNode } from "./bookmark-interface-wrapper.firefox";

export class BookmarkWrapper {
    public get(id: string): Promise<IBookmarkTreeNode[]> {
        return browser.bookmarks.get(id);
    }

    public getTree(callback: (results: browser.bookmarks.BookmarkTreeNode[]) => void): void {
        browser.bookmarks.getTree(callback);
    }

    private remove(id: string, callback?: () => void): void {
        browser.bookmarks.remove(id, callback);
    }

    private create(
        { parentId, title, url }: { parentId?: string; title?: string; url?: string },
        callback?: (result: browser.bookmarks.BookmarkTreeNode) => void
    ): void {
        browser.bookmarks.create(
            {
                parentId,
                title,
                url
            },
            callback
        );
    }

    private search(
        query: browser.bookmarks.BookmarkSearchQuery,
        callback: (results: browser.bookmarks.BookmarkTreeNode[]) => void
    ) {
        browser.bookmarks.search(query, callback);
    }
}
