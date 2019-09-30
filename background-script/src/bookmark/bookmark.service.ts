import { BookmarkApiService } from "@api/bookmark/bookmark-api.service";
import { IBookmarkSearchQuery } from "@api/bookmark/types/bookmark-api";

export class BookmarkService {
    private _defaultBookmarkFolders: browser.bookmarks.BookmarkTreeNode[] = [];
    private _defaultUserFolder: string;

    constructor(defaultFolder = "Bookmark Manager") {
        this._defaultUserFolder = defaultFolder;
        this.getDefaultBookmarkFolders();
    }

    public add(title: string, url: string, folderName: string): void {
        this.search({ title: folderName }).then((results) => {
            if (!!results && results.length !== 0) {
                BookmarkApiService.create({ parentId: results[0].id, title, url });
            }
        });
    }

    public addToDefaultFolder(title: string, url: string): void {
        this.search({ title: this._defaultUserFolder }).then((results) => {
            if (!results || (!!results && results.length === 0)) {
                this.createDefaultUserFolder().then((result) => {
                    BookmarkApiService.create({ parentId: result.id, title, url });
                });
            }
            BookmarkApiService.create({ parentId: results[0].id, title, url });
        });
    }

    public removeByUrl(url: string) {
        this.search({ url }).then((results) => {
            this.remove(results[0].id);
        });
    }

    public get(id: string): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return BookmarkApiService.get(id);
    }

    public getTree(): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return BookmarkApiService.getTree();
    }
    public search(
        query: IBookmarkSearchQuery | string
    ): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return BookmarkApiService.search(query);
    }

    private remove(id: string): Promise<void> {
        return BookmarkApiService.remove(id);
    }

    private createDefaultUserFolder(): Promise<browser.bookmarks.BookmarkTreeNode> {
        return BookmarkApiService.create({
            parentId: (<browser.bookmarks.BookmarkTreeNode>(
                this._defaultBookmarkFolders.find((x) => x.title === "Bookmarks bar")
            )).id,
            title: this._defaultUserFolder
        });
    }

    private getDefaultBookmarkFolders(): void {
        BookmarkApiService.getTree().then((bookmarkTree) => {
            if (!!bookmarkTree) {
                (<browser.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children).forEach(
                    (element) => {
                        this._defaultBookmarkFolders.push({ ...element, children: undefined });
                    }
                );
            }
        });
    }
}
