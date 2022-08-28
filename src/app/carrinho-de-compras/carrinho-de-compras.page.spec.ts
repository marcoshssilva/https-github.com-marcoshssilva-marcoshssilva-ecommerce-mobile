import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarrinhoDeComprasPage } from './carrinho-de-compras.page';

describe('CarrinhoDeComprasPage', () => {
  let component: CarrinhoDeComprasPage;
  let fixture: ComponentFixture<CarrinhoDeComprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoDeComprasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrinhoDeComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
