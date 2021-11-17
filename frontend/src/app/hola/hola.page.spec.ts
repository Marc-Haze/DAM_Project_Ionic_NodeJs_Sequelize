import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HolaPage } from './hola.page';

describe('HolaPage', () => {
  let component: HolaPage;
  let fixture: ComponentFixture<HolaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
