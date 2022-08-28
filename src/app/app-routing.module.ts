import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'categorias',
        loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'cadastro',
        loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
    },
    {
        path: 'produtos',
        loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosPageModule)
    },
    {
        path: 'produto-detail',
        loadChildren: () => import('./produto-detail/produto-detail.module').then(m => m.ProdutoDetailPageModule)
    },
    {
        path: 'carrinho-de-compras',
        loadChildren: () => import('./carrinho-de-compras/carrinho-de-compras.module').then(m => m.CarrinhoDeComprasPageModule)
    },
    {
        path: 'escolher-endereco',
        loadChildren: () => import('./escolher-endereco/escolher-endereco.module').then(m => m.EscolherEnderecoPageModule)
    },
    {
        path: 'escolher-pagamento',
        loadChildren: () => import('./escolher-pagamento/escolher-pagamento.module').then(m => m.EscolherPagamentoPageModule)
    },
    {
        path: 'pedido-confirmado',
        loadChildren: () => import('./pedido-confirmado/pedido-confirmado.module').then(m => m.PedidoConfirmadoPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
