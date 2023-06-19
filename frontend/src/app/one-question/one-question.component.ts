import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-question',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})
export class OneQuestionComponent {
  showComment = false; 
  showComment1= false 
  invalid:string | null=null
  formData = {
    answer: '',
  };
  onSubmit(){
    console.log(this.formData);
    
  }
 
  onSub(form:NgForm){
    if (form.valid) {
      this.invalid=null
      console.log(form.value);
     
    }else{
      this.invalid="invalid input"
    }
  }

}
