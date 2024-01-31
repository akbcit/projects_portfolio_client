import { Component, Input,EventEmitter, Output } from '@angular/core';
import Category from '../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // define an EventEmitter property with the @Output() decorator.
  @Output() selectedCategory = new EventEmitter<number>();
  // input prop that will be received from app-root
  @Input() categories!: Category[];
  // property to keep track of the selected category ID, initially null
  selectedCategoryId: number | null = null;
  
  // define an event handler function that responds to click on cat-selection in nav
  sendDataToParent(categoryId: number) {
    this.selectedCategory.emit(categoryId);
    // if selectedCategory is same as already selected, nullify
    if(categoryId===this.selectedCategoryId){
      this.selectedCategoryId = null;
    }
    else{
      this.selectedCategoryId = categoryId;
    }
  }
}
