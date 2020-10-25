import { BookmarkApiService } from '@api/api-services/bookmark-api.service';
import { IBookmarkTreeNode } from '@api/types/bookmark-api';

export class BookmarkService {
  private _bookmarkApiService: BookmarkApiService;
  private _rootFolders: IBookmarkTreeNode[] = [];
  private _userFolder: string;

  constructor(bookmarkApiService: BookmarkApiService, userFolder = 'Bookmark Manager') {
    this._bookmarkApiService = bookmarkApiService;
    this._userFolder = userFolder;
    this.getDefaultBookmarkFolders();
  }

  public add(title: string, url: string, folderName: string): void {
    this._bookmarkApiService.search({ title: folderName }).then((results) => {
      if (!!results && results.length !== 0) {
        this._bookmarkApiService.create({ parentId: results[0].id, title, url });
      }
    });
  }

  public addToUserFolder(title: string, url: string): void {
    this._bookmarkApiService.search({ title: this._userFolder }).then((results) => {
      if (!results || (!!results && results.length === 0)) {
        this.createUserFolder().then((result) => {
          this._bookmarkApiService.create({ parentId: result.id, title, url });
        });
      }
      this._bookmarkApiService.create({ parentId: results[0].id, title, url });
    });
  }

  public removeByUrl(url: string) {
    this._bookmarkApiService.search({ url }).then((results) => {
      this._bookmarkApiService.remove(results[0].id);
    });
  }

  private createUserFolder(): Promise<IBookmarkTreeNode> {
    return this._bookmarkApiService.create({
      parentId: (<IBookmarkTreeNode>this._rootFolders[0]).id,
      title: this._userFolder
    });
  }

  private getDefaultBookmarkFolders(): void {
    this._bookmarkApiService.getTree().then((bookmarkTree) => {
      if (!!bookmarkTree) {
        (<IBookmarkTreeNode[]>bookmarkTree[0].children).forEach((element) => {
          this._rootFolders.push({ ...element, children: undefined });
        });
      }
    });
  }
}
