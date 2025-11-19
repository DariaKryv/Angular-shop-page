import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeGallery } from './shoe-gallery';

describe('ShoeGallery', () => {
  let component: ShoeGallery;
  let fixture: ComponentFixture<ShoeGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoeGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoeGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
