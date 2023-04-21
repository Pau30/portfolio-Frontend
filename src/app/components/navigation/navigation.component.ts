import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})


export class NavigationComponent {

  loggedIn = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  onLogout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
