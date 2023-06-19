import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-your-questions',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './your-questions.component.html',
  styleUrls: ['./your-questions.component.css']
})
export class YourQuestionsComponent {
 
}
