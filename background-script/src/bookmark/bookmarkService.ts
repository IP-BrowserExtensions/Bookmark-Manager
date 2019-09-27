import { IBookmarkSearchQuery } from "./ibookmark";

export class BookmarkService {
    private _defaultBookmarkFolders: browser.bookmarks.BookmarkTreeNode[] = [];
    private _defaultUserFolder: string;

    constructor(defaultFolder = "Bookmark Manager") {
        this._defaultUserFolder = defaultFolder;
        this.getDefaultBookmarkFolders();
    }

    public get(id: string): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return browser.bookmarks.get(id);
    }

    public getTree(): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return browser.bookmarks.getTree();
    }

    public add(title: string, url: string, folderName: string): void {
        this.search({ title: folderName }).then((results) => {
            if (!!results && results.length !== 0) {
                this.create({ parentId: results[0].id, title, url });
            }
        });
    }

    public addToDefaultFolder(title: string, url: string): void {
        this.search({ title: this._defaultUserFolder }).then((results) => {
            if (!results || (!!results && results.length === 0)) {
                this.createDefaultUserFolder().then((result) => {
                    this.create({ parentId: result.id, title, url });
                });
            }
            this.create({ parentId: results[0].id, title, url });
        });
    }

    public removeByUrl(url: string) {
        this.search({ url }).then((results) => {
            this.remove(results[0].id);
        });
    }

    public search(
        query: IBookmarkSearchQuery | string
    ): Promise<browser.bookmarks.BookmarkTreeNode[]> {
        return browser.bookmarks.search(query);
    }

    private remove(id: string): Promise<void> {
        return browser.bookmarks.remove(id);
    }

    private create({
        parentId,
        title,
        url
    }: {
        parentId?: string;
        title?: string;
        url?: string;
    }): Promise<browser.bookmarks.BookmarkTreeNode> {
        return browser.bookmarks.create({
            parentId,
            title,
            url
        });
    }

    private createDefaultUserFolder(): Promise<browser.bookmarks.BookmarkTreeNode> {
        return this.create({
            parentId: (<browser.bookmarks.BookmarkTreeNode>(
                this._defaultBookmarkFolders.find((x) => x.title === "Bookmarks bar")
            )).id,
            title: this._defaultUserFolder
        });
    }

    private getDefaultBookmarkFolders(): void {
        browser.bookmarks.getTree().then((bookmarkTree) => {
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
