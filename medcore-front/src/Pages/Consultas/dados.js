const KEY = "clinicavida:consultas";

const seed = [
  { id: 1, pacienteId: 1, pacienteNome: "Ana Beatriz Souza", profissionalId: 1, profissionalNome: "Dr. Ricardo Menezes", especialidade: "Cardiologia", data: "2026-10-15", hora: "09:30", motivo: "Retorno cardiológico", observacoes: "", status: "Agendada" },
  { id: 2, pacienteId: 2, pacienteNome: "Carlos Eduardo Lima", profissionalId: 2, profissionalNome: "Dra. Paula Andrade", especialidade: "Clínica geral", data: "2026-10-08", hora: "14:00", motivo: "Avaliação pós-internação", observacoes: "Paciente em recuperação", status: "Agendada" },
  { id: 3, pacienteId: 3, pacienteNome: "Mariana Oliveira", profissionalId: 3, profissionalNome: "Dra. Lúcia Prado", especialidade: "Dermatologia", data: "2026-10-09", hora: "10:30", motivo: "Manchas na pele", observacoes: "", status: "Agendada" },
  { id: 4, pacienteId: 4, pacienteNome: "João Pedro Almeida", profissionalId: 4, profissionalNome: "Dr. Henrique Tavares", especialidade: "Cirurgia geral", data: "2026-10-06", hora: "08:30", motivo: "Revisão pós-operatória", observacoes: "Cicatrização dentro do esperado", status: "Realizada" },
  { id: 5, pacienteId: 5, pacienteNome: "Fernanda Costa", profissionalId: 6, profissionalNome: "Dr. Bruno Teixeira", especialidade: "Ortopedia", data: "2026-10-05", hora: "16:00", motivo: "Dor no joelho", observacoes: "", status: "Realizada" },
  { id: 6, pacienteId: 6, pacienteNome: "Rafael Nogueira", profissionalId: 2, profissionalNome: "Dra. Paula Andrade", especialidade: "Clínica geral", data: "2026-10-02", hora: "11:00", motivo: "Exames de rotina", observacoes: "", status: "Cancelada" },
  { id: 7, pacienteId: 1, pacienteNome: "Ana Beatriz Souza", profissionalId: 1, profissionalNome: "Dr. Ricardo Menezes", especialidade: "Cardiologia", data: "2026-09-12", hora: "09:30", motivo: "Avaliação de rotina", observacoes: "Pressão controlada", status: "Realizada" },
];

export function carregarConsultas() {
  const bruto = localStorage.getItem(KEY);
  if (bruto) return JSON.parse(bruto);
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

export function salvarConsultas(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista));
}
