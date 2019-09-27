import { IContextMenuCreateProperties, IContextMenuUpdateProperties } from "./icontext-menu";

export class ContextMenuService {
    public add(
        id: string,
        title: string,
        parentId?: string,
        onclick?: (info: browser.menus.OnClickData, tab: browser.tabs.Tab) => void,
        type: browser.menus.ItemType = "normal",
        contexts: browser.menus.ContextType[] = ["all"]
    ): Promise<void> {
        return this.create({
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
        return this.create({
            parentId,
            type: "separator",
            contexts
        });
    }

    public remove(menuItemId: string): Promise<void> {
        return browser.menus.remove(menuItemId);
    }

    public update(id: string, changeInfo: IContextMenuUpdateProperties): Promise<void> {
        return browser.menus.update(id, changeInfo);
    }

    private create(createProperties: IContextMenuCreateProperties): Promise<void> {
        return new Promise((resolve, reject) => {
            browser.menus.create(createProperties, () => {
                resolve();
            });
        });
    }
}
