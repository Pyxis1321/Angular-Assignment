import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBoxComponent } from './contract-box.component';

describe('ContractBoxComponent', () => {
  let component: ContractBoxComponent;
  let fixture: ComponentFixture<ContractBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
