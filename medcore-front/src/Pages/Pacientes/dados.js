const KEY = 'clinicavida:pacientes';

const seed = [
  { id: '00231', nome: 'Ana Beatriz Souza', cpf: '123.456.789-00', dataNascimento: '1986-03-14', tel: '(31) 99876-5432', email: 'ana.souza@email.com', cep: '30140-110', endereco: 'Rua das Acácias, 120', bairro: 'Funcionários', cidade: 'Belo Horizonte', uf: 'MG', status: 'Ativo' },
  { id: '00232', nome: 'Carlos Eduardo Lima', cpf: '234.567.890-11', dataNascimento: '1972-08-02', tel: '(31) 98765-4321', email: 'carlos.lima@email.com', cep: '', endereco: '', bairro: '', cidade: 'Belo Horizonte', uf: 'MG', status: 'Internado' },
  { id: '00233', nome: 'Mariana Oliveira', cpf: '345.678.901-22', dataNascimento: '1995-11-21', tel: '(31) 97654-3210', email: 'mariana.o@email.com', cep: '', endereco: '', bairro: '', cidade: 'Contagem', uf: 'MG', status: 'Em atendimento' },
  { id: '00234', nome: 'João Pedro Almeida', cpf: '456.789.012-33', dataNascimento: '1988-05-09', tel: '(31) 96543-2109', email: 'joao.almeida@email.com', cep: '', endereco: '', bairro: '', cidade: 'Belo Horizonte', uf: 'MG', status: 'Inativo' },
  { id: '00235', nome: 'Fernanda Costa', cpf: '567.890.123-44', dataNascimento: '1991-01-30', tel: '(31) 95432-1098', email: 'fernanda.costa@email.com', cep: '', endereco: '', bairro: '', cidade: 'Betim', uf: 'MG', status: 'Ativo' },
  { id: '00236', nome: 'Rafael Nogueira', cpf: '678.901.234-55', dataNascimento: '1980-07-17', tel: '(31) 94321-0987', email: 'rafael.n@email.com', cep: '', endereco: '', bairro: '', cidade: 'Belo Horizonte', uf: 'MG', status: 'Internado' },
];

export const situacoes = ['Ativo', 'Em atendimento', 'Internado', 'Inativo'];

export function carregarPacientes() {
  const bruto = localStorage.getItem(KEY);
  if (bruto) return JSON.parse(bruto);
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

export function salvarPacientes(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function proximoProntuario(lista) {
  const maior = Math.max(0, ...lista.map((p) => Number(p.id)));
  return String(maior + 1).padStart(5, '0');
}
