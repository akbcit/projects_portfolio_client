import { Component, Input } from '@angular/core';
import Tag from '../models/tag';

@Component({
  selector: 'app-tag-chip',
  standalone: true,
  imports: [],
  templateUrl: './tag-chip.component.html',
  styleUrl: './tag-chip.component.scss'
})
export class TagChipComponent {
  @Input() tag!: string;
}
