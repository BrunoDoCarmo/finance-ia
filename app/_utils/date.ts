export const dateNumeric = (date: Date) => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "Data inválida";
  return parsed.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
};

export const dateShort = (date: Date) => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "Data inválida";
  return parsed.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const dateLong = (date: Date) => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "Data inválida";
  return parsed.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
