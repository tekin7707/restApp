import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementTypeEditComponent } from './movement-type-edit.component';

describe('MovementTypeEditComponent', () => {
  let component: MovementTypeEditComponent;
  let fixture: ComponentFixture<MovementTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
