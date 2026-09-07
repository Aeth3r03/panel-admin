import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionCard } from './option-card';

describe('OptionCard', () => {
  let component: OptionCard;
  let fixture: ComponentFixture<OptionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
