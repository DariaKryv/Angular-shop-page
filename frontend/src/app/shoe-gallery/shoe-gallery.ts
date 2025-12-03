import { Product } from './../services/product';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../services/product';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shoe-gallery',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './shoe-gallery.html',
  styleUrl: './shoe-gallery.css',
  standalone: true,
})
export class ShoeGalleryComponent implements OnInit {
  private productService = inject(ProductService);

  // products: Product[] = [];
  // products = toSignal<Product[]>(this.productService.getProducts(), { initialValue: [] });
  // products = toSignal(this.productService.getProducts(), { initialValue: null });
  products = signal<Product[]>([]);
  newProduct: Product = { name: '', price: 0, description: '', image_url: '' };
  editingProduct: Product | null = null;

  loading = true;

  // constructor(private productService: ProductService, http: HttpClient) {}

  constructor() {
    // Once the signal emits, we can mark loading as false
    this.products(); // triggers evaluation
    // this.loading.set(false);
  }

  ngOnInit(): void {
    // this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products').subscribe({
    // this.http.get<Product[]>('http://localhost:3000/products').subscribe({
    this.productService.getProducts().subscribe({
      next: (data) => {
        // this.products = data;
        this.products.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      // this.products = data;
      this.products.set(data);
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (addedProduct) => {
        console.log('Product added:', addedProduct);
        this.newProduct = { name: '', price: 0, description: '', image_url: '' };
        // this.loadProducts();
        // this.products = toSignal(this.productService.getProducts(), { initialValue: [] });
        this.productService.getProducts().subscribe((data) => {
          this.products.set(data);
        });
      },
      error: (err) => console.error('Error adding product:', err),
    });
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product };
  }
  saveEdit(): void {
    if (!this.editingProduct?.id) return;

    this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
      next: () => {
        console.log('Product updated');
        this.editingProduct = null;
        // this.loadProducts();
        // this.products = toSignal(this.productService.getProducts(), { initialValue: [] });
        this.productService.getProducts().subscribe((data) => {
          this.products.set(data);
        });
      },
      error: (err) => console.error('Error updating product:', err),
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      // this.loadProducts();
      // this.products = toSignal(this.productService.getProducts(), { initialValue: [] });
      this.productService.getProducts().subscribe((data) => {
        this.products.set(data);
      });
    });
  }
}
