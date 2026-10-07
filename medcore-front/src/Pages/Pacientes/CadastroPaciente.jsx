import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastroPaciente.module.css';

export default function CadastroPaciente() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.breadcrumb}>Início / Pacientes / <strong>Cadastro</strong></div>
            <h1>Cadastro de paciente</h1>
            <p>Campos marcados com * são obrigatórios.</p>
          </div>
          <button className={styles.btnOutline} onClick={() => navigate(-1)}>&larr; Voltar à lista</button>
        </div>
      </header>

      <div className={styles.contentGrid}>
        <aside className={styles.photoUpload}>
          <div className={styles.photoBox}>
            <span className={styles.photoIcon}>📷</span>
            <span>Adicionar foto</span>
          </div>
          <p>Formatos JPG ou PNG, até 2 MB.</p>
          <button className={styles.btnOutline}>Enviar imagem</button>
          <div className={styles.dica}>
            <strong>Dica:</strong> Confira o CPF e o e-mail antes de salvar. Eles são usados para localizar o paciente.
          </div>
        </aside>

        <section className={styles.formSection}>
          <div className={styles.formHeader}>
            <h2>Dados do paciente</h2>
            <span className={styles.badgeNovo}>Novo cadastro</span>
          </div>

          <div className={styles.formBody}>
            <h3>Dados pessoais</h3>
            <div className={styles.formGroupFull}>
              <label>Nome completo *</label>
              <input type="text" placeholder="Ex: Ana Beatriz Souza" />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>CPF *</label>
                <input type="text" placeholder="000.000.000-00" />
              </div>
              <div className={styles.formGroup}>
                <label>Data de nascimento *</label>
                <input type="date" />
              </div>
            </div>

            <h3 className={styles.sectionTitle}>Contato</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Telefone *</label>
                <input type="text" placeholder="(00) 00000-0000" />
              </div>
              <div className={styles.formGroup}>
                <label>E-mail</label>
                <input type="email" placeholder="nome@email.com" />
              </div>
            </div>

            <h3 className={styles.sectionTitle}>Endereço</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>CEP</label>
                <input type="text" placeholder="00000-000" />
              </div>
              <div className={styles.formGroup}>
                <label>Rua e número</label>
                <input type="text" placeholder="Rua das Acácias, 120" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Bairro</label>
                <input type="text" placeholder="" />
              </div>
              <div className={styles.formGroup}>
                <label>Cidade</label>
                <input type="text" placeholder="Belo Horizonte" />
              </div>
              <div className={styles.formGroup}>
                <label>Estado</label>
                <select>
                  <option>MG</option>
                  <option>SP</option>
                  <option>RJ</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formFooter}>
            <button className={styles.btnCancel} onClick={() => navigate(-1)}>Cancelar</button>
            <button className={styles.btnPrimary}>Salvar paciente</button>
          </div>
        </section>
      </div>
    </main>
  );
}