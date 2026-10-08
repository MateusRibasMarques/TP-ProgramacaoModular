import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import { carregarPacientes, salvarPacientes, proximoProntuario, situacoes } from './dados';
import styles from './CadastroPaciente.module.css';

const ufs = ['MG', 'SP', 'RJ', 'ES', 'BA', 'GO', 'DF', 'PR', 'RS', 'SC'];

const vazio = {
  nome: '',
  cpf: '',
  dataNascimento: '',
  tel: '',
  email: '',
  cep: '',
  endereco: '',
  bairro: '',
  cidade: '',
  uf: 'MG',
  status: 'Ativo',
};

function maskCpf(v) {
  const n = v.replace(/\D/g, '').slice(0, 11);
  return n
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskTelefone(v) {
  const n = v.replace(/\D/g, '').slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

function maskCep(v) {
  const n = v.replace(/\D/g, '').slice(0, 8);
  return n.length > 5 ? `${n.slice(0, 5)}-${n.slice(5)}` : n;
}

function iniciais(nome) {
  const partes = nome.trim().split(/\s+/);
  if (!partes[0]) return '';
  return (partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase();
}

function Campo({ label, erro, children }) {
  return (
    <label className={styles.campo}>
      <span className={styles.label}>{label}</span>
      {children}
      {erro && <span className={styles.erro}>{erro}</span>}
    </label>
  );
}

export default function CadastroPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  const [original] = useState(() =>
    editando ? carregarPacientes().find((p) => p.id === id) : null
  );
  const [form, setForm] = useState(() => (original ? { ...vazio, ...original } : vazio));
  const [erros, setErros] = useState({});

  function alterar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: '' }));
  }

  function validar() {
    const e = {};
    if (form.nome.trim().length < 5) e.nome = 'Informe o nome completo';
    if (form.cpf.length !== 14) e.cpf = 'CPF inválido';
    else if (carregarPacientes().some((p) => p.cpf === form.cpf && p.id !== id))
      e.cpf = 'Já existe um paciente com este CPF';
    if (!form.dataNascimento) e.dataNascimento = 'Informe a data';
    if (form.tel.length < 14) e.tel = 'Telefone inválido';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'E-mail inválido';
    if (form.cep && form.cep.length !== 9) e.cep = 'CEP inválido';
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function salvar(ev) {
    ev.preventDefault();
    if (!validar()) return;
    const lista = carregarPacientes();
    const dados = { ...form, nome: form.nome.trim() };
    const nova = editando
      ? lista.map((p) => (p.id === id ? { ...dados, id } : p))
      : [...lista, { ...dados, id: proximoProntuario(lista) }];
    salvarPacientes(nova);
    navigate('/pacientes');
  }

  if (editando && !original) {
    return (
      <Layout>
        <div className={styles.page}>
          <p className={styles.sub}>Paciente não encontrado.</p>
          <Link to="/pacientes">‹ Voltar para pacientes</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <Link to="/pacientes">Pacientes</Link> /{' '}
          <strong>{editando ? 'Editar' : 'Cadastro'}</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>{editando ? 'Editar paciente' : 'Cadastro de paciente'}</h1>
            <p className={styles.sub}>
              {editando
                ? `Atualize os dados de ${original.nome}. Campos marcados com * são obrigatórios.`
                : 'Campos marcados com * são obrigatórios.'}
            </p>
          </div>
          <button type="button" className={styles.btnOutline} onClick={() => navigate(-1)}>
            ‹ Voltar
          </button>
        </div>

        <div className={styles.contentGrid}>
          <aside className={styles.card}>
            <div className={styles.cardHead}>Foto</div>
            <div className={styles.foto}>
              <div className={styles.fotoBox}>
                {editando ? (
                  <span className={styles.fotoIniciais}>{iniciais(form.nome)}</span>
                ) : (
                  <>
                    <span className={styles.fotoIcone}>📷</span>
                    <span>Adicionar foto</span>
                  </>
                )}
              </div>
              <p>Formatos JPG ou PNG, até 2 MB.</p>
              <button type="button" className={styles.btnOutline}>
                {editando ? 'Alterar imagem' : 'Enviar imagem'}
              </button>
              {editando && <div className={styles.prontuario}>Prontuário #{id}</div>}
              <div className={styles.dica}>
                <strong>Dica:</strong> Confira o CPF e o e-mail antes de salvar. Eles são usados
                para localizar o paciente.
              </div>
            </div>
          </aside>

          <form className={styles.card} onSubmit={salvar} noValidate>
            <div className={`${styles.cardHead} ${styles.cardHeadFlex}`}>
              Dados pessoais
              <span className={editando ? `${styles.badgeNovo} ${styles.badgeEdicao}` : styles.badgeNovo}>
                {editando ? 'Editando cadastro' : 'Novo cadastro'}
              </span>
            </div>
            <div className={styles.grid}>
              <div className={styles.full}>
                <Campo label="Nome completo *" erro={erros.nome}>
                  <input
                    className={styles.input}
                    value={form.nome}
                    onChange={(e) => alterar('nome', e.target.value)}
                    placeholder="Ex.: Ana Beatriz Souza"
                  />
                </Campo>
              </div>
              <Campo label="CPF *" erro={erros.cpf}>
                <input
                  className={styles.input}
                  value={form.cpf}
                  onChange={(e) => alterar('cpf', maskCpf(e.target.value))}
                  placeholder="000.000.000-00"
                />
              </Campo>
              <Campo label="Data de nascimento *" erro={erros.dataNascimento}>
                <input
                  type="date"
                  className={styles.input}
                  value={form.dataNascimento}
                  onChange={(e) => alterar('dataNascimento', e.target.value)}
                />
              </Campo>
              {editando && (
                <Campo label="Situação">
                  <select
                    className={styles.input}
                    value={form.status}
                    onChange={(e) => alterar('status', e.target.value)}
                  >
                    {situacoes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Campo>
              )}
            </div>

            <div className={styles.cardHead}>Contato</div>
            <div className={styles.grid}>
              <Campo label="Telefone *" erro={erros.tel}>
                <input
                  className={styles.input}
                  value={form.tel}
                  onChange={(e) => alterar('tel', maskTelefone(e.target.value))}
                  placeholder="(00) 00000-0000"
                />
              </Campo>
              <Campo label="E-mail" erro={erros.email}>
                <input
                  type="email"
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => alterar('email', e.target.value)}
                  placeholder="nome@email.com"
                />
              </Campo>
            </div>

            <div className={styles.cardHead}>Endereço</div>
            <div className={styles.grid}>
              <Campo label="CEP" erro={erros.cep}>
                <input
                  className={styles.input}
                  value={form.cep}
                  onChange={(e) => alterar('cep', maskCep(e.target.value))}
                  placeholder="00000-000"
                />
              </Campo>
              <Campo label="Rua e número">
                <input
                  className={styles.input}
                  value={form.endereco}
                  onChange={(e) => alterar('endereco', e.target.value)}
                  placeholder="Rua das Acácias, 120"
                />
              </Campo>
              <Campo label="Bairro">
                <input
                  className={styles.input}
                  value={form.bairro}
                  onChange={(e) => alterar('bairro', e.target.value)}
                />
              </Campo>
              <div className={styles.cidadeUf}>
                <Campo label="Cidade">
                  <input
                    className={styles.input}
                    value={form.cidade}
                    onChange={(e) => alterar('cidade', e.target.value)}
                    placeholder="Belo Horizonte"
                  />
                </Campo>
                <Campo label="Estado">
                  <select
                    className={styles.input}
                    value={form.uf}
                    onChange={(e) => alterar('uf', e.target.value)}
                  >
                    {ufs.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </Campo>
              </div>
            </div>

            <div className={styles.rodape}>
              <button type="button" className={styles.btnOutline} onClick={() => navigate(-1)}>
                Cancelar
              </button>
              <button type="submit" className={styles.btnPrimary}>
                {editando ? 'Salvar alterações' : 'Salvar paciente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
