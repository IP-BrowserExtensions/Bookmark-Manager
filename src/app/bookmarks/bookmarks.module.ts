import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarksComponent } from './bookmarks.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';

@NgModule({
  declarations: [BookmarksComponent, TreeViewComponent],
  imports: [CommonModule, BookmarksRoutingModule, MatTreeModule, MatIconModule]
})
export class BookmarksModule {}
