function FormatPrice({ value }) {
  const formattedValue = Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return <span>{formattedValue}</span>;
}

export default FormatPrice;
