import { HttpClient } from '@angular/common/http';
import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginObj={
  username:'',
  password:''
}

constructor(private router:Router,

  
){}
http=inject(HttpClient)

onLogin(){
 this.http.post('http://localhost:5000/api/user/login',this.loginObj).subscribe((res:any)=>{
  if(res.success){
    alert('Login Success')
    sessionStorage.setItem('token',res.token);
    this.router.navigateByUrl('/layout/dashboard')
  }
  
})
}
}