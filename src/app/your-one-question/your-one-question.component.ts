import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

}
