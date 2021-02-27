import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleFavoriteComponent } from './handle-favorite.component';

describe('HandleFavoriteComponent', () => {
  let component: HandleFavoriteComponent;
  let fixture: ComponentFixture<HandleFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleFavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
