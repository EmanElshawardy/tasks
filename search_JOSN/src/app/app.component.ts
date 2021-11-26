import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'session13';
  fname:string ="Marwa"
  lname: string ="Radwan"
  imgLoc = "assets/test.jpg"
  itemId = "eng.marwa.radwan"
  user = {
    name:"marwa",
    age:36,
    job: "developer"
  }
  test = "<h2> hello</h2>"
  val=""
  myvar = "marwa"
  myFun(){
    return "hello from ts function";
  }
  handleClick(){
    console.log(this.myvar)
  }
  handleInput(e:any){
    console.log(e.target.value)
    this.val = e.target.value
  }
}
