import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acc1Detail1Component } from './acc1-detail1.component';

describe('Acc1Detail1Component', () => {
  let component: Acc1Detail1Component;
  let fixture: ComponentFixture<Acc1Detail1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acc1Detail1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Acc1Detail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
