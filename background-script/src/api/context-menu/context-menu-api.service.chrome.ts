import { IContextMenuCreateProperties, IContextMenuUpdateProperties } from "@api/context-menu/types/context-menu-api";
import { HelperService } from "@helpers/helper.service";

export class ContextMenuApiService {
    public static create(createProperties: IContextMenuCreateProperties): Promise<void> {
        return HelperService.callbackToPromise(chrome.contextMenus.create, [createProperties]);
    }

    public static update(id: string, changeInfo: IContextMenuUpdateProperties): Promise<void> {
        return HelperService.callbackToPromise(chrome.contextMenus.update, [id, changeInfo]);
    }

    public static remove(menuItemId: string): Promise<void> {
        return HelperService.callbackToPromise(chrome.contextMenus.remove, [menuItemId]);
    }

    public static removeAll(menuItemId: string): Promise<void> {
        return HelperService.callbackToPromise(chrome.contextMenus.remove, [menuItemId]);
    }
}
