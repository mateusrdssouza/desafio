export function moneyFormat(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getInitials(name: string) {
  const partes = name.split(" ");

  if (partes.length > 1) {
    const iniciais = partes.map(nome => nome.charAt(0).toUpperCase());
    return iniciais.slice(0, 2).join("");
  } else {
    return name.substring(0, 2).toUpperCase();
  }
}
