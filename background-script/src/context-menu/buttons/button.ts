import { ContextMenuApiService } from "@api/context-menu/context-menu-api.service";
import { IContextMenuOnClickData } from "@api/context-menu/types/context-menu-api";

import { ContextMenuService } from "../context-menu.service";

export abstract class Button {
    protected readonly _contextMenuService: ContextMenuService;
    protected readonly _contextMenuApiService: ContextMenuApiService;

    private readonly _id: string;
    private readonly _buttonName: string;

    public constructor(
        id: string,
        buttonName: string,
        contextMenuService: ContextMenuService,
        contextMenuApiService: ContextMenuApiService
    ) {
        this._id = id;
        this._buttonName = buttonName;
        this._contextMenuService = contextMenuService;
        this._contextMenuApiService = contextMenuApiService;
    }

    public createButton(parentId: string): void {
        this._contextMenuService.add(this._id, this._buttonName, parentId, this.action.bind(this));
    }

    public setVisible() {
        this._contextMenuApiService.update(this._id, { visible: true });
    }

    public setInvisible() {
        this._contextMenuApiService.update(this._id, { visible: false });
    }

    protected abstract action(info: IContextMenuOnClickData, tab: browser.tabs.Tab): void;
}
