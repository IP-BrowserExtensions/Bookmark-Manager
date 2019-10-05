import {
    IBookmarkChanges,
    IBookmarkCreate,
    IBookmarkDestination,
    IBookmarkSearchQuery,
    IBookmarkTreeNode,
} from "@api/bookmark/types/bookmark-api";
import { HelperService } from "@helpers/helper.service";

export class TabsApiService {
    public get(id: string): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.get, [id]);
    }

    public getChildren(id: string): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.getChildren, [id]);
    }

    public getTree(): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.getTree, []);
    }

    public getSubTree(id: string): Promise<[IBookmarkTreeNode]> {
        return HelperService.callbackToPromise(chrome.bookmarks.getSubTree, [id]);
    }

    public search(query: string | IBookmarkSearchQuery): Promise<IBookmarkTreeNode[]> {
        return HelperService.callbackToPromise(chrome.bookmarks.search, [query]);
    }

    public create(bookmark: IBookmarkCreate): Promise<IBookmarkTreeNode> {
        return HelperService.callbackToPromise(chrome.bookmarks.create, [bookmark]);
    }

    public move(id: string, destination: IBookmarkDestination): Promise<IBookmarkTreeNode> {
        return HelperService.callbackToPromise(chrome.bookmarks.move, [id, destination]);
    }

    public update(id: string, changes: IBookmarkChanges): Promise<IBookmarkTreeNode> {
        return HelperService.callbackToPromise(chrome.bookmarks.update, [id, changes]);
    }

    public remove(id: string): Promise<void> {
        return HelperService.callbackToPromise(chrome.bookmarks.remove, [id]);
    }

    public removeTree(id: string): Promise<void> {
        return HelperService.callbackToPromise(chrome.bookmarks.removeTree, [id]);
    }
}
