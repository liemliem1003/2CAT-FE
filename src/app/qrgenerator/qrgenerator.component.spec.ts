import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRgeneratorComponent } from './qrgenerator.component';

describe('QRgeneratorComponent', () => {
  let component: QRgeneratorComponent;
  let fixture: ComponentFixture<QRgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRgeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QRgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
