import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIServiceComponent } from './apiservice.component';

describe('APIServiceComponent', () => {
  let component: APIServiceComponent;
  let fixture: ComponentFixture<APIServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [APIServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(APIServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
