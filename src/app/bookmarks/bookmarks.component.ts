import { Component, OnInit } from '@angular/core';
import { BookmarkApiService } from '@api/api-services/bookmark-api.service';
import { IBookmarkTreeNode } from '@api/types/bookmark-api';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarksTree: IBookmarkTreeNode[] = [];
  constructor(private bookmarkApiService: BookmarkApiService) {}

  async ngOnInit(): Promise<void> {
    this.bookmarksTree = await this.bookmarkApiService.getTree();
  }
}
