import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@prisma/client';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string | undefined;
  email: string | undefined;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.name && this.email) {
      this.userService
        .createUser({ email: this.email, name: this.name })
        .subscribe((result) => {
          if (result.hasOwnProperty('id')) {
            localStorage.setItem('authid', (result as User).id.toString());
            this.router.navigate(['/']);
          }
        });
    }
  }
}
