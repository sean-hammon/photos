import { SessionStore } from '@app/store/session.store';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  pageTitle: string;

  constructor(
    private session: SessionStore
  ) { }

  ngOnInit(): void {
    this.session.photo$
    .pipe(filter(photo => !!photo))
    .subscribe(p => {
      this.pageTitle = p.title;
    });
  }

}
