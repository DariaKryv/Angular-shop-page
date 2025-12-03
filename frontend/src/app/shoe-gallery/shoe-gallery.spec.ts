// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ShoeGalleryComponent } from './shoe-gallery';

// describe('ShoeGallery', () => {
//   let component: ShoeGalleryComponent;
//   let fixture: ComponentFixture<ShoeGalleryComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ShoeGalleryComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ShoeGalleryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoeGalleryComponent } from './shoe-gallery';
import { ProductService, Product } from '../services/product';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock ProductService
class MockProductService {
  getProducts() {
    return of([
      { id: 1, name: 'Shoe A', price: 100 },
      { id: 2, name: 'Shoe B', price: 150 },
    ] as Product[]);
  }

  addProduct(product: Product) {
    return of({ ...product, id: 3 });
  }

  updateProduct(id: number, product: Product) {
    return of(product);
  }

  deleteProduct(id: number) {
    return of({});
  }
}

describe('ShoeGalleryComponent', () => {
  let component: ShoeGalleryComponent;
  let fixture: ComponentFixture<ShoeGalleryComponent>;
  let mockService: MockProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoeGalleryComponent, HttpClientTestingModule],
      providers: [{ provide: ProductService, useClass: MockProductService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoeGalleryComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(ProductService) as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const products = component.products();
    expect(products!.length).toBe(2);
    expect(products![0].name).toBe('Shoe A');
  });

  it('should add a product', () => {
    component.newProduct = {
      name: 'New Shoe',
      price: 200,
      description: 'Nice shoe',
      image_url: '',
    };

    const spy = spyOn(mockService, 'addProduct').and.callThrough();

    component.addProduct();

    expect(spy).toHaveBeenCalled();
  });

  it('should start editing a product', () => {
    const item = { id: 1, name: 'Test Shoe', price: 100 };
    component.startEdit(item);

    expect(component.editingProduct).toEqual(item);
  });

  it('should delete a product', () => {
    const spy = spyOn(mockService, 'deleteProduct').and.callThrough();

    component.deleteProduct(1);

    expect(spy).toHaveBeenCalledWith(1);
  });
});
