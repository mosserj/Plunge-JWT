import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'plunge-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;
  isNew:boolean;

  constructor(private securityService: SecurityService,
  private route: ActivatedRoute,
  private router: Router) { 
    this.isNew = true;
  }

  login(){
    this.user.isNew = true;
    if(this.isNew){
      this.securityService.register(this.user).subscribe(
            resp => {
            this.securityObject = resp;
              if(this.returnUrl) {
                //if returnUrl is true then goto page else redirect to login
                this.router.navigateByUrl(this.returnUrl);
              }
            },
            () => {
              this.securityObject = new AppUserAuth();
            }
          );
    }else{
      this.securityService.login(this.user).subscribe(
        resp => {
        this.securityObject = resp;
          if(this.returnUrl) {
            //if returnUrl is true then goto page else redirect to login
            this.router.navigateByUrl(this.returnUrl);
          }
        },
        () => {
          this.securityObject = new AppUserAuth();
        }
      );
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

}
