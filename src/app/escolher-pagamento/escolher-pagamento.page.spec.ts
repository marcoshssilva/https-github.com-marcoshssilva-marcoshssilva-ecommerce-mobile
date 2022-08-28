import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscolherPagamentoPage } from './escolher-pagamento.page';

describe('EscolherPagamentoPage', () => {
    let component: EscolherPagamentoPage;
    let fixture: ComponentFixture<EscolherPagamentoPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EscolherPagamentoPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(EscolherPagamentoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
