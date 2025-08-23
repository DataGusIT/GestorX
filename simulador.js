document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS ESTÁTICOS (MOCK DATA) ---
    // Baseado na sua imagem de "Controle de Estoque"
    const mockStockData = [
        { codigo: '795924541340', nome: 'Arroz 12', categoria: 'Papelaria', estoque: 172, precoVenda: 158.58, validade: '2025-08-05', localizacao: 'Corredor A' },
        { codigo: '1254227349374', nome: 'Arroz 13', categoria: 'Papelaria', estoque: 381, precoVenda: 389.64, validade: '2026-03-14', localizacao: 'Corredor 1' },
        { codigo: '6502998901648', nome: 'Arroz 16', categoria: 'Bebidas', estoque: 382, precoVenda: 121.11, validade: '2026-04-27', localizacao: 'Estante A' },
        { codigo: '3581104127757', nome: 'Arroz 18', categoria: 'Limpeza', estoque: 224, precoVenda: 52.72, validade: '2025-12-19', localizacao: 'Estante A' },
        { codigo: '958094587083', nome: 'Arroz 19', categoria: 'Bebidas', estoque: 411, precoVenda: 37.69, validade: '2025-08-05', localizacao: 'Corredor 1' },
        { codigo: '8701856294758', nome: 'Arroz 23', categoria: 'Papelaria', estoque: 267, precoVenda: 365.10, validade: '2025-08-23', localizacao: 'Estante A' },
        { codigo: '5731285457066', nome: 'Arroz 32', categoria: 'Higiene', estoque: 174, precoVenda: 351.28, validade: '2025-09-18', localizacao: 'Estante B' },
        { codigo: '5690989035090', nome: 'Arroz 35', categoria: 'Papelaria', estoque: 371, precoVenda: 394.03, validade: '2025-08-07', localizacao: 'Estante A' }
    ];

    // --- LÓGICA DE NAVEGAÇÃO ENTRE PÁGINAS ---
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');

            // Atualiza o item ativo na navegação
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Mostra a página correspondente
            pages.forEach(page => {
                if (page.id === `${targetId}-page`) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });

    // --- LÓGICA DA PÁGINA DE ESTOQUE ---
    const stockTableBody = document.getElementById('stock-table-body');
    const stockSearchInput = document.getElementById('stock-search');

    function populateStockTable(data) {
        stockTableBody.innerHTML = ''; // Limpa a tabela
        if (data.length === 0) {
            stockTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Nenhum produto encontrado.</td></tr>`;
            return;
        }

        data.forEach(product => {
            const row = document.createElement('tr');
            const isExpired = new Date(product.validade) < new Date();

            row.innerHTML = `
                <td>${product.codigo}</td>
                <td>${product.nome}</td>
                <td>${product.estoque}</td>
                <td>R$ ${product.precoVenda.toFixed(2)}</td>
                <td style="color: ${isExpired ? '#e53935' : 'inherit'};">${product.validade}</td>
                <td>${product.localizacao}</td>
                <td class="action-icons">
                    <i class="fas fa-pencil-alt" title="Editar (Simulação)"></i>
                    <i class="fas fa-trash" title="Excluir (Simulação)"></i>
                </td>
            `;
            // Simulação de exclusão
            row.querySelector('.fa-trash').addEventListener('click', (e) => {
                e.target.closest('tr').remove();
                alert('Produto removido da visualização. A alteração não é salva nesta simulação.');
            });

            stockTableBody.appendChild(row);
        });
    }

    // Filtro de busca de estoque
    stockSearchInput.addEventListener('input', () => {
        const searchTerm = stockSearchInput.value.toLowerCase();
        const filteredData = mockStockData.filter(p =>
            p.nome.toLowerCase().includes(searchTerm) ||
            p.codigo.includes(searchTerm)
        );
        populateStockTable(filteredData);
    });

    // Popula a tabela de estoque inicialmente
    populateStockTable(mockStockData);

    // --- LÓGICA SIMPLES PARA O CAIXA (PDV) ---
    const pdvAddItemBtn = document.getElementById('pdv-add-item');
    const pdvItemsBody = document.getElementById('pdv-items-body');
    const pdvTotalValue = document.getElementById('pdv-total-value');
    let pdvTotal = 0;

    pdvAddItemBtn.addEventListener('click', () => {
        // Pega um produto aleatório para adicionar
        const product = mockStockData[Math.floor(Math.random() * mockStockData.length)];
        const quantity = parseInt(document.getElementById('pdv-quantity').value) || 1;
        const subtotal = product.precoVenda * quantity;

        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td>${product.nome}</td>
            <td>${quantity}</td>
            <td>R$ ${product.precoVenda.toFixed(2)}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
        `;
        pdvItemsBody.appendChild(itemRow);

        pdvTotal += subtotal;
        pdvTotalValue.innerText = `R$ ${pdvTotal.toFixed(2)}`;
    });

    document.getElementById('pdv-clear').addEventListener('click', () => {
        pdvItemsBody.innerHTML = '';
        pdvTotal = 0;
        pdvTotalValue.innerText = 'R$ 0,00';
    });

    document.getElementById('pdv-finalize').addEventListener('click', () => {
        if (pdvTotal > 0) {
            alert(`Venda finalizada no valor de R$ ${pdvTotal.toFixed(2)}!\n\n(Esta é uma simulação, nenhum dado foi salvo.)`);
            // Limpa após finalizar
            pdvItemsBody.innerHTML = '';
            pdvTotal = 0;
            pdvTotalValue.innerText = 'R$ 0,00';
        } else {
            alert('Adicione itens à venda primeiro.');
        }
    });

});