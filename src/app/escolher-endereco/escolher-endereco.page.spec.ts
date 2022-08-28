import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscolherEnderecoPage } from './escolher-endereco.page';

describe('EscolherEnderecoPage', () => {
  let component: EscolherEnderecoPage;
  let fixture: ComponentFixture<EscolherEnderecoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolherEnderecoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscolherEnderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
