import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoeGalleryComponent } from './shoe-gallery/shoe-gallery';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShoeGalleryComponent, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
