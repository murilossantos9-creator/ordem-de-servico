// Classe que serve de molde para cada Ordem de Serviço
class OrdemServico {
    constructor(cliente, equipamento, valorBruto, isPagamentoVista) {
        this.cliente = cliente;
        this.equipamento = equipamento;
        this.valorBruto = parseFloat(valorBruto);
        this.isPagamentoVista = isPagamentoVista;
        this.dataCriacao = new Date().toLocaleDateString('pt-BR');
    }

    // Lógica interna: calcula o desconto automaticamente
    calcularValorFinal() {
        if (this.isPagamentoVista) {
            return this.valorBruto * 0.90; // 10% de desconto
        }
        return this.valorBruto;
    }

    // Lógica interna: gera o componente visual (HTML) da OS
    gerarCardHTML() {
        const valorFinal = this.calcularValorFinal();
        const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const badgeHtml = this.isPagamentoVista 
            ? `<span class="badge-desconto">✓ 10% Off Aplicado</span>` 
            : '';

        return `
            <div class="os-card">
                <h3>🧑‍🔧 ${this.cliente}</h3>
                <p><strong>Equipamento:</strong> ${this.equipamento}</p>
                <p><strong>Data:</strong> ${this.dataCriacao}</p>
                <p><strong>Valor Bruto:</strong> ${formatarMoeda(this.valorBruto)}</p>
                <p class="valor-final">Total a Pagar: ${formatarMoeda(valorFinal)}</p>
                ${badgeHtml}
            </div>
        `;
    }
}

const formOS = document.getElementById('form-os');
const containerOS = document.getElementById('container-os');
const mensagemVazia = document.getElementById('mensagem-vazia');

formOS.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const cliente = document.getElementById('cliente').value;
    const equipamento = document.getElementById('equipamento').value;
    const valorBruto = document.getElementById('valor').value;
    const isPagamentoVista = document.getElementById('pagamento-vista').checked;

    // Instancia um novo objeto da classe OrdemServico
    const novaOS = new OrdemServico(cliente, equipamento, valorBruto, isPagamentoVista);


    if (mensagemVazia) {
        mensagemVazia.style.display = 'none';
    }

    // Exibe o card gerado pelo próprio objeto
    containerOS.insertAdjacentHTML('afterbegin', novaOS.gerarCardHTML());

    // Reseta o formulário
    formOS.reset();
    document.getElementById('cliente').focus();
});