function FormatPrice({ value }) {
  if (isNaN(value)) {
    console.error("O valor fornecido não é um número:", value);
    return <span>Valor inválido</span>; // Tratamento de erro para valores inválidos
  }

  // Corrigir precisão antes de formatar
  const formattedValue = Number(Number(value).toFixed(2)).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return <span>{formattedValue}</span>;
}

export default FormatPrice;
