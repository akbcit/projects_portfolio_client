import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// import HttpClientModule to enable HTTP requests
import { HttpClientModule } from '@angular/common/http';
// import HttpClient for making HTTP requests
import { HttpClient } from '@angular/common/http';
import Project from "./models/project"
import Category from './models/category';
import Tag from './models/tag';
// import project-card component
import { ProjectCardComponent } from './project-card/project-card.component';
// import header
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, CommonModule, HttpClientModule, ProjectCardComponent, HeaderComponent,FooterComponent]
})

export class AppComponent {
  // event listener that lists for emitting from child
  onCategorySelected(categoryId: number) {
    // if emitted category is same as existing category, nullify
    if (this.filteredCategory && this.filteredCategory === categoryId) {
      this.filteredCategory = null;
      this.filterProjects();
    }
    else {
      this.filteredCategory = categoryId;
      this.filterProjects();
    }
  }

  onTagSelected(tag: string) {
    console.log(tag);
    if (this.filteredTags?.includes(tag)) {
      this.filteredTags.splice(this.filteredTags.indexOf(tag),1);
      this.filterProjects();
    }
    else {
      this.filteredTags?.push(tag);
      this.filterProjects();
    }
  }

  // function that filters projects based on category and tags
  filterProjects() {
    // start with all projects
    this.projects = this.allProjects;
  
    // filter by category if a category is selected
    if (this.filteredCategory) {
      this.projects = this.projects.filter(project => project.category_id === this.filteredCategory);
    }
  
    // Further filter by tags if any tags are selected
    if (this.filteredTags && this.filteredTags.length > 0) {
      this.projects = this.projects.filter(project => 
        // Check if every selected tag is included in the project's tags
        this.filteredTags.every(tag => project.tags.includes(tag))
      );
    }
  }

  title: string = 'Portfolio';
  allProjects: Project[] = [];
  projects: Project[] = [];
  tags: Tag[] = [];
  categories: Category[] = [];
  filteredCategory!: number | null;
  filteredTags!: string[];
  date!:Date;
  author!:String;
  // inject HttpClient to make HTTP requests
  constructor(private http: HttpClient) {
    this.filteredTags=[];
    this.date = new Date();
    this.author = "Aditya Kumar"
  }

  ngOnInit() {
    // initiate project data loading on component initialization
    this.loadProjects();
    // initiate tags data loading on component initialization
    this.loadTags();
    // initiate categories data loading on component initialization
    this.loadCategories();
  }

  loadProjects() {
    // use HttpClient to fetch project data from '/api/projects'
    this.http.get<any>('https://portfolio.kumaraditya.tech/api/projects').subscribe({
      next: (data) => {
        // on successful fetch, assign the projects to the component's projects array
        this.allProjects = data.projects;
        this.projects = this.allProjects;
      },
      error: (error) => {
        // if there's an error during fetch, log it to the console
        console.error('Failed to fetch projects', error);
      }
    });
  }

  loadTags() {
    // use HttpClient to fetch tags data from '/api/projects'
    this.http.get<any>('https://portfolio.kumaraditya.tech/api/tags').subscribe(
      {
        next: (data) => {
          // on successful fetch, assign the tags to the component's tags array
          this.tags = data.tags;
        },
        error: (error) => {
          // if there's an error during fetch, log it to the console
          console.error('Failed to fetch tags', error);
        }
      }
    )
  }

  loadCategories() {
    this.http.get<any>('https://portfolio.kumaraditya.tech/api/categories').subscribe({
      next: (data) => {
        // on successful fetch, assign the tags to the component's tags array
        this.categories = data.categories;
      },
      error: (error) => {
        // if there's an error during fetch, log it to the console
        console.error("Failed to fetch categories", error);
      },
    })
  }

}
