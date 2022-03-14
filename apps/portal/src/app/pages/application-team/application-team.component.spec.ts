import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTeamComponent } from './application-team.component';

describe('ApplicationTeamComponent', () => {
  let component: ApplicationTeamComponent;
  let fixture: ComponentFixture<ApplicationTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
