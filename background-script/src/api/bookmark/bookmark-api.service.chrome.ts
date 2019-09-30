import {
    IBookmarkChanges,
    IBookmarkCreate,
    IBookmarkDestination,
    IBookmarkSearchQuery,
    IBookmarkTreeNode,
} from "@api/bookmark/types/bookmark-api";
import { HelperService } from "@helpers/helper.service";

export class BookmarkApiService {
    public static get(id: string): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.get, [id]);
    }

    public static getChildren(id: string): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.getChildren, [id]);
    }

    public static getTree(): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.getTree, []);
    }

    public static getSubTree(id: string): Promise<[IBookmarkTreeNode]> {
        return HelperService.callbackToPromise(chrome.bookmarks.getSubTree, [id]);
    }

    public static search(query: string | IBookmarkSearchQuery): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.search, [query]);
    }

    public static create(bookmark: IBookmarkCreate): Promise<IBookmarkTreeNode> {
        return HelperService.callbackToPromise(chrome.bookmarks.create, [bookmark]);
    }

    public static move(id: string, destination: IBookmarkDestination): Promise<IBookmarkTreeNode> {
        return HelperService.callbackToPromise(chrome.bookmarks.move, [id, destination]);
    }

    public static update(id: string, changes: IBookmarkChanges): Promise<IBookmarkTreeNode> {
        return HelperService.callbackToPromise(chrome.bookmarks.update, [id, changes]);
    }

    public static remove(id: string): Promise<void> {
        return HelperService.callbackToPromise(chrome.bookmarks.remove, [id]);
    }

    public static removeTree(id: string): Promise<void> {
        return HelperService.callbackToPromise(chrome.bookmarks.removeTree, [id]);
    }
}
