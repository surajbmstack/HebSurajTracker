import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-singup',
  imports: [FormsModule,RouterLink],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {
loginObj={
  username:'',
  password:''
}
constructor(private router:Router){}
http=inject(HttpClient)
signup(){
  this.http.post('https://hebsurajtracker.onrender.com/api/user/register',this.loginObj).subscribe((res:any)=>{
    if(res.success){
      alert('Signup Success')
      this.router.navigateByUrl('/login')
    }
 
  })
}

}
