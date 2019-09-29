import { IBookmarkSearchQuery } from "@wrapper/bookmark/bookmark-interface-wrapper";
import { BookmarkWrapper } from "@wrapper/bookmark/bookmark-wrapper";

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
                BookmarkWrapper.create({ parentId: results[0].id, title, url });
            }
        });
    }

    public addToDefaultFolder(title: string, url: string): void {
        this.search({ title: this._defaultUserFolder }).then((results) => {
            if (!results || (!!results && results.length === 0)) {
                this.createDefaultUserFolder().then((result) => {
                    BookmarkWrapper.create({ parentId: result.id, title, url });
                });
            }
            BookmarkWrapper.create({ parentId: results[0].id, title, url });
        });
    }

    public removeByUrl(url: string) {
        this.search({ url }).then((results) => {
            this.remove(results[0].id);
        });
    }

    public get(id: string): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return BookmarkWrapper.get(id);
    }

    public getTree(): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return BookmarkWrapper.getTree();
    }
    public search(
        query: IBookmarkSearchQuery | string
    ): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return BookmarkWrapper.search(query);
    }

    private remove(id: string): Promise<void> {
        return BookmarkWrapper.remove(id);
    }

    private createDefaultUserFolder(): Promise<browser.bookmarks.BookmarkTreeNode> {
        return BookmarkWrapper.create({
            parentId: (<browser.bookmarks.BookmarkTreeNode>(
                this._defaultBookmarkFolders.find((x) => x.title === "Bookmarks bar")
            )).id,
            title: this._defaultUserFolder
        });
    }

    private getDefaultBookmarkFolders(): void {
        BookmarkWrapper.getTree().then((bookmarkTree) => {
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
