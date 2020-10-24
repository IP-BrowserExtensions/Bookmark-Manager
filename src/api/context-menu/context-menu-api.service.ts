import { IContextMenuCreateProperties, IContextMenuUpdateProperties } from "@api/context-menu/types/context-menu-api";
import { HelperService } from "@helpers/helper.service";

export class ContextMenuApiService {
  public create(createProperties: IContextMenuCreateProperties): Promise<void> {
    return HelperService.callbackToPromise(browser.menus.create, [createProperties]);
  }

  public update(id: string, changeInfo: IContextMenuUpdateProperties): Promise<void> {
    return browser.menus.update(id, changeInfo);
  }

  public remove(menuItemId: string): Promise<void> {
    return browser.menus.remove(menuItemId);
  }

  public removeAll(menuItemId: string): Promise<void> {
    return browser.menus.remove(menuItemId);
  }
}
