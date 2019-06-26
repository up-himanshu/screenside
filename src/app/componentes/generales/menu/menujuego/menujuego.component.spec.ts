import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenujuegoComponent } from './menujuego.component';

describe('MenujuegoComponent', () => {
  let component: MenujuegoComponent;
  let fixture: ComponentFixture<MenujuegoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenujuegoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenujuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
