import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonelComponent } from './edit-personel.component';

describe('EditPersonelComponent', () => {
  let component: EditPersonelComponent;
  let fixture: ComponentFixture<EditPersonelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
