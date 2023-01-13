import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationsPanelComponent } from './observations-panel.component';

describe('ObservationsPanelComponent', () => {
  let component: ObservationsPanelComponent;
  let fixture: ComponentFixture<ObservationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
