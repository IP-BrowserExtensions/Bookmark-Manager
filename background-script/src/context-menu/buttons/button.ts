import { ContextMenuService } from "../context-menu.service";

export abstract class Button {
    protected _id: string;
    protected _buttonName: string;
    protected _contextMenuService: ContextMenuService;

    public constructor(contextMenuService: ContextMenuService, id: string, buttonName: string) {
        this._contextMenuService = contextMenuService;
        this._id = id;
        this._buttonName = buttonName;
    }

    public createButton(parentId: string): void {
        this._contextMenuService.add(this._id, this._buttonName, parentId, this.action.bind(this));
    }

    public setVisible() {
        this._contextMenuService.update(this._id, { visible: true });
    }

    public setInvisible() {
        this._contextMenuService.update(this._id, { visible: false });
    }

    protected abstract action(info: browser.menus.OnClickData, tab: browser.tabs.Tab): void;
}
