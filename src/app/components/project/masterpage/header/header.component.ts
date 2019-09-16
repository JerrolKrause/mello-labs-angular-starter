import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '$env';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public isOpen = false;
  public appName = environment.properties.appName;

  constructor(private router: Router) {}

  public ngOnInit() {
    // On route change, close nav window
    this.router.events.subscribe(() => {
      this.isOpen = false;
    });
  }
}
