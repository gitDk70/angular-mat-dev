import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteConfirmationComponent } from './boite-confirmation.component';

describe('BoiteConfirmationComponent', () => {
  let component: BoiteConfirmationComponent;
  let fixture: ComponentFixture<BoiteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoiteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
