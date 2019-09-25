import { IContextMenuUpdateProperties } from "./icontext-menu";

export class ContextMenuService {
    public add(
        id: string,
        parentId: string,
        title: string,
        onClickFunction: (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void,
        type: string = "normal",
        contexts: string[] = ["all"]
    ): void {
        chrome.contextMenus.create({
            title,
            id,
            parentId,
            type,
            contexts,
            onclick: onClickFunction
        });
    }

    public addSeparator(parentId: string, contexts: string[] = ["all"]): void {
        chrome.contextMenus.create({
            parentId,
            type: "separator",
            contexts
        });
    }

    public remove(menuItemId: string): void {
        chrome.contextMenus.remove(menuItemId);
    }

    public update(id: string, changeInfo: IContextMenuUpdateProperties) {
        chrome.contextMenus.update(id, changeInfo);
    }
}
