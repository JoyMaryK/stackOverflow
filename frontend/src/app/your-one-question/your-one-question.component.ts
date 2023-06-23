import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-your-one-question',
  templateUrl: './your-one-question.component.html',
  styleUrls: ['./your-one-question.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  standalone:true
})
export class YourOneQuestionComponent {
  showComment = false
  showComment1 = false
  selectedOption='';
  invalid:string | null=null
  onSub(form:NgForm){
    if (form.valid) {
      this.invalid=null
      console.log(form.value);
     
    }else{
      this.invalid="invalid input"
    }
  }
}
