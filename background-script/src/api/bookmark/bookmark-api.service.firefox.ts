import {
    IBookmarkChanges,
    IBookmarkCreate,
    IBookmarkDestination,
    IBookmarkSearchQuery,
    IBookmarkTreeNode,
} from "@api/bookmark/types/bookmark-api";

export class BookmarkApiService {
    public static get(id: string): Promise<IBookmarkTreeNode[]> {
        return browser.bookmarks.get(id);
    }

    public static getChildren(id: string): Promise<IBookmarkTreeNode[]> {
        return browser.bookmarks.getChildren(id);
    }

    public static getTree(): Promise<IBookmarkTreeNode[]> {
        return browser.bookmarks.getTree();
    }

    public static getSubTree(id: string): Promise<[IBookmarkTreeNode]> {
        return browser.bookmarks.getSubTree(id);
    }

    public static search(query: IBookmarkSearchQuery | string): Promise<IBookmarkTreeNode[]> {
        return browser.bookmarks.search(query);
    }

    public static create(bookmark: IBookmarkCreate): Promise<IBookmarkTreeNode> {
        return browser.bookmarks.create(bookmark);
    }

    public static move(id: string, destination: IBookmarkDestination): Promise<IBookmarkTreeNode> {
        return browser.bookmarks.move(id, destination);
    }

    public static update(id: string, changes: IBookmarkChanges): Promise<IBookmarkTreeNode> {
        return browser.bookmarks.update(id, changes);
    }

    public static remove(id: string): Promise<void> {
        return browser.bookmarks.remove(id);
    }

    public static removeTree(id: string): Promise<void> {
        return browser.bookmarks.removeTree(id);
    }
}
