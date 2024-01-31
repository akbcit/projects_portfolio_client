import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
// import the project class
import Project from '../models/project';
import Category from '../models/category';
// import tag chip component
import { TagChipComponent } from '../tag-chip/tag-chip.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [ TagChipComponent,CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})

export class ProjectCardComponent {
  // Use @Input() decorator to receive a project
  @Input() project!: Project;
  @Input() categories!: Category[];
  categoryName!: string;

  // this checks updates category names on initialization
  ngOnInit() {
    this.updateCategoryName();
  }

  ngOnChanges(changes: SimpleChanges) {
    // this checks if categories or project inputs change after the component has been initialized
    this.updateCategoryName();
  }

  navigateToProject(url: string|null): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  private updateCategoryName() {
    // Ensure categories and project are defined before attempting to access them
    if (this.categories && this.project) {
      for (let category of this.categories) {
        if (category.id === this.project.category_id) {
          this.categoryName = category.name;
        }
      }
    }
  }
}



