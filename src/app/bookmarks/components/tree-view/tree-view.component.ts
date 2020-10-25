import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { IBookmarkTreeNode } from '@api/types/bookmark-api';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit, OnChanges {
  @Input() bookmarksTree: IBookmarkTreeNode[] = [];
  treeControl = new NestedTreeControl<IBookmarkTreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<IBookmarkTreeNode>();
  constructor() {}

  public ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bookmarksTree) {
      this.dataSource.data = this.bookmarksTree;
    }
  }

  hasChild = (_: number, node: IBookmarkTreeNode) => !!node.children && node.children.length > 0;
}
