import { IBookmarkTreeNode } from "@api/bookmark/types/bookmark-api";
import { ContextMenuApiService } from "@api/context-menu/context-menu-api.service";
import { IContextMenuOnClickData } from "@api/context-menu/types/context-menu-api";

export class ContextMenuService {
    private readonly _contextMenuApiService: ContextMenuApiService;

    constructor(contextMenuApiService: ContextMenuApiService) {
        this._contextMenuApiService = contextMenuApiService;
    }
    public add(
        id: string,
        title: string,
        parentId?: string,
        onclick?: (info: IContextMenuOnClickData, tab: browser.tabs.Tab) => void,
        type: browser.menus.ItemType = "normal",
        contexts: browser.menus.ContextType[] = ["all"]
    ): Promise<void> {
        return this._contextMenuApiService.create({
            id,
            title,
            parentId,
            type,
            contexts,
            onclick
        });
    }

    public addSeparator(
        parentId: string,
        contexts: browser.menus.ContextType[] = ["all"]
    ): Promise<void> {
        return this._contextMenuApiService.create({
            parentId,
            type: "separator",
            contexts
        });
    }

    public createBookmarkTree(bookmarkTreeNode: IBookmarkTreeNode[]): void {
        bookmarkTreeNode.forEach((node) => {
            this.add(node.id, <string>node.parentId, node.title);
            if (!!node.children) {
                this.createBookmarkTree(node.children);
            }
        });
    }
}
