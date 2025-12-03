// import { TestBed } from '@angular/core/testing';

// import { Product } from './product';

// describe('Product', () => {
//   let service: Product;

//   beforeEach(() => {
//     // Product is a type (interface or model), not an injectable service; create a value instead
//     service = {} as Product;
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product } from './product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all products', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Test A', price: 100 },
      { id: 2, name: 'Test B', price: 200 },
    ];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch a single product', () => {
    const mockProduct: Product = { id: 1, name: 'Test A', price: 100 };

    service.getProduct(1).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should add a product', () => {
    const newProduct: Product = { name: 'New', price: 50 };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product.id).toBeDefined();
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 3, ...newProduct });
  });
});
