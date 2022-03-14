import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMainTeamComponent } from './application-main-team.component';

describe('ApplicationMainTeamComponent', () => {
  let component: ApplicationMainTeamComponent;
  let fixture: ComponentFixture<ApplicationMainTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationMainTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMainTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
