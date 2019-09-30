import { ContextMenuWrapper } from "@api/context-menu/context-menu-wrapper";

export class ContextMenuService {
    public add(
        id: string,
        title: string,
        parentId?: string,
        onclick?: (info: browser.menus.OnClickData, tab: browser.tabs.Tab) => void,
        type: browser.menus.ItemType = "normal",
        contexts: browser.menus.ContextType[] = ["all"]
    ): Promise<void> {
        return ContextMenuWrapper.create({
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
        return ContextMenuWrapper.create({
            parentId,
            type: "separator",
            contexts
        });
    }
}
