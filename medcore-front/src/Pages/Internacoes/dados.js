const KEY_QUARTOS = "clinicavida:quartos";
const KEY_INTERNACOES = "clinicavida:internacoes";
const KEY_PROFISSIONAIS = "clinicavida:profissionais";

const seedQuartos = [
  { id: 1, numero: "101", andar: "1", capacidade: 2, tipo: "Enfermaria", observacoes: "" },
  { id: 2, numero: "102", andar: "1", capacidade: 2, tipo: "Enfermaria", observacoes: "" },
  { id: 3, numero: "103", andar: "1", capacidade: 1, tipo: "Apartamento", observacoes: "Acessível para cadeirantes" },
  { id: 4, numero: "201", andar: "2", capacidade: 3, tipo: "Enfermaria", observacoes: "" },
  { id: 5, numero: "202", andar: "2", capacidade: 1, tipo: "Apartamento", observacoes: "" },
  { id: 6, numero: "203", andar: "2", capacidade: 1, tipo: "Apartamento", observacoes: "" },
  { id: 7, numero: "301", andar: "3", capacidade: 1, tipo: "UTI", observacoes: "Monitoramento contínuo" },
  { id: 8, numero: "302", andar: "3", capacidade: 1, tipo: "UTI", observacoes: "" },
];

const seedInternacoes = [
  { id: 1, pacienteId: 2, pacienteNome: "Carlos Eduardo Lima", profissionalId: 2, profissionalNome: "Dra. Paula Andrade", quartoId: 1, quartoNumero: "101", dataEntrada: "2026-10-03", previsaoAlta: "2026-10-10", dataAlta: "", observacoes: "Pneumonia em tratamento com antibiótico venoso", status: "Em andamento" },
  { id: 2, pacienteId: 6, pacienteNome: "Rafael Nogueira", profissionalId: 2, profissionalNome: "Dra. Paula Andrade", quartoId: 1, quartoNumero: "101", dataEntrada: "2026-10-07", previsaoAlta: "2026-10-12", dataAlta: "", observacoes: "Desidratação", status: "Ativa" },
  { id: 3, pacienteId: 4, pacienteNome: "João Pedro Almeida", profissionalId: 4, profissionalNome: "Dr. Henrique Tavares", quartoId: 3, quartoNumero: "103", dataEntrada: "2026-10-05", previsaoAlta: "2026-10-09", dataAlta: "", observacoes: "Pós-operatório de apendicectomia", status: "Em andamento" },
  { id: 4, pacienteId: 1, pacienteNome: "Ana Beatriz Souza", profissionalId: 1, profissionalNome: "Dr. Ricardo Menezes", quartoId: 7, quartoNumero: "301", dataEntrada: "2026-10-08", previsaoAlta: "2026-10-14", dataAlta: "", observacoes: "Arritmia — monitoramento cardíaco", status: "Ativa" },
  { id: 5, pacienteId: 5, pacienteNome: "Fernanda Costa", profissionalId: 6, profissionalNome: "Dr. Bruno Teixeira", quartoId: 4, quartoNumero: "201", dataEntrada: "2026-09-28", previsaoAlta: "2026-10-02", dataAlta: "2026-10-02", observacoes: "Artroscopia de joelho sem intercorrências", status: "Alta registrada" },
  { id: 6, pacienteId: 3, pacienteNome: "Mariana Oliveira", profissionalId: 3, profissionalNome: "Dra. Lúcia Prado", quartoId: 5, quartoNumero: "202", dataEntrada: "2026-09-20", previsaoAlta: "2026-09-23", dataAlta: "2026-09-24", observacoes: "Celulite infecciosa", status: "Alta registrada" },
];

export const pacientes = [
  { id: 1, nome: "Ana Beatriz Souza" },
  { id: 2, nome: "Carlos Eduardo Lima" },
  { id: 3, nome: "Mariana Oliveira" },
  { id: 4, nome: "João Pedro Almeida" },
  { id: 5, nome: "Fernanda Costa" },
  { id: 6, nome: "Rafael Nogueira" },
];

const profissionaisPadrao = [
  { id: 1, nome: "Dr. Ricardo Menezes", especialidade: "Cardiologia", situacao: "Ativo" },
  { id: 2, nome: "Dra. Paula Andrade", especialidade: "Clínica geral", situacao: "Ativo" },
  { id: 3, nome: "Dra. Lúcia Prado", especialidade: "Dermatologia", situacao: "Ativo" },
  { id: 4, nome: "Dr. Henrique Tavares", especialidade: "Cirurgia geral", situacao: "Ativo" },
  { id: 5, nome: "Dra. Camila Rocha", especialidade: "Pediatria", situacao: "Ativo" },
  { id: 6, nome: "Dr. Bruno Teixeira", especialidade: "Ortopedia", situacao: "Inativo" },
];

export const tiposQuarto = ["Enfermaria", "Apartamento", "UTI"];

export const statusAtivos = ["Ativa", "Em andamento"];

function carregar(key, seed) {
  const bruto = localStorage.getItem(key);
  if (bruto) return JSON.parse(bruto);
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

export function carregarQuartos() {
  return carregar(KEY_QUARTOS, seedQuartos);
}

export function salvarQuartos(lista) {
  localStorage.setItem(KEY_QUARTOS, JSON.stringify(lista));
}

export function carregarInternacoes() {
  return carregar(KEY_INTERNACOES, seedInternacoes);
}

export function salvarInternacoes(lista) {
  localStorage.setItem(KEY_INTERNACOES, JSON.stringify(lista));
}

export function carregarProfissionais() {
  const bruto = localStorage.getItem(KEY_PROFISSIONAIS);
  return bruto ? JSON.parse(bruto) : profissionaisPadrao;
}

export function proximoId(lista) {
  return Math.max(0, ...lista.map((i) => i.id)) + 1;
}

export function ocupacao(quarto, internacoes) {
  const ocupados = internacoes.filter(
    (i) => i.quartoId === quarto.id && statusAtivos.includes(i.status)
  ).length;
  return {
    ocupados,
    livres: Math.max(0, quarto.capacidade - ocupados),
    status: ocupados >= quarto.capacidade ? "Ocupado" : "Disponível",
  };
}

export function hoje() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function formatData(d) {
  return d ? d.split("-").reverse().join("/") : "—";
}
