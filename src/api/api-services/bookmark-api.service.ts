import {
    IBookmarkChanges,
    IBookmarkCreate,
    IBookmarkDestination,
    IBookmarkSearchQuery,
    IBookmarkTreeNode
} from '@api/bookmark/types/bookmark-api';

export class BookmarkApiService {
  public get(id: string): Promise<IBookmarkTreeNode[]> {
    return browser.bookmarks.get(id);
  }

  public getChildren(id: string): Promise<IBookmarkTreeNode[]> {
    return browser.bookmarks.getChildren(id);
  }

  public getTree(): Promise<IBookmarkTreeNode[]> {
    return browser.bookmarks.getTree();
  }

  public getSubTree(id: string): Promise<IBookmarkTreeNode[]> {
    return browser.bookmarks.getSubTree(id);
  }

  public search(query: IBookmarkSearchQuery | string): Promise<IBookmarkTreeNode[]> {
    return browser.bookmarks.search(query);
  }

  public create(bookmark: IBookmarkCreate): Promise<IBookmarkTreeNode> {
    return browser.bookmarks.create(bookmark);
  }

  public move(id: string, destination: IBookmarkDestination): Promise<IBookmarkTreeNode> {
    return browser.bookmarks.move(id, destination);
  }

  public update(id: string, changes: IBookmarkChanges): Promise<IBookmarkTreeNode> {
    return browser.bookmarks.update(id, changes);
  }

  public remove(id: string): Promise<void> {
    return browser.bookmarks.remove(id);
  }

  public removeTree(id: string): Promise<void> {
    return browser.bookmarks.removeTree(id);
  }
}
