import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantListComponent } from './assistant-list.component';

describe('AssistantListComponent', () => {
  let component: AssistantListComponent;
  let fixture: ComponentFixture<AssistantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistantListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
