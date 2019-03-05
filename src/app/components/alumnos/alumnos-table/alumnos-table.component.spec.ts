import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosTableComponent } from './alumnos-table.component';

describe('AlumnosTableComponent', () => {
  let component: AlumnosTableComponent;
  let fixture: ComponentFixture<AlumnosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
