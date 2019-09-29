import { HelperService } from "@helpers/helper.service";
import {
    IContextMenuCreateProperties,
    IContextMenuUpdateProperties,
} from "@wrapper/context-menu/context-menu-interface-wrapper";

export class ContextMenuWrapper {
    public static create(createProperties: IContextMenuCreateProperties): Promise<void> {
        return HelperService.callbackToPromise(browser.menus.create, [createProperties]);
    }

    public static update(id: string, changeInfo: IContextMenuUpdateProperties): Promise<void> {
        return browser.menus.update(id, changeInfo);
    }

    public static remove(menuItemId: string): Promise<void> {
        return browser.menus.remove(menuItemId);
    }

    public static removeAll(menuItemId: string): Promise<void> {
        return browser.menus.remove(menuItemId);
    }
}
