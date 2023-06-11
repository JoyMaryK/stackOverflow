import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-one-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})
export class OneQuestionComponent {
  formData = {
    answer: '',
  };
  onSubmit(){
    console.log(this.formData);
    
  }

}
