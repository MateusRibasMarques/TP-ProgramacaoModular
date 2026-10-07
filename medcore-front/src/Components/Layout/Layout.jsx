import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

const menu = [
  {
    secao: "PACIENTES",
    itens: [
      { label: "Listagem de pacientes", to: "/pacientes" },
      { label: "Cadastro de paciente", to: "/cadastro" },
      { label: "Histórico médico", to: "/historico/1" },
    ],
  },
  {
    secao: "PROFISSIONAIS",
    itens: [
      { label: "Listagem de profissionais", to: "/profissionais" },
      { label: "Cadastro de profissional", to: "/profissionais/novo" },
    ],
  },
  {
    secao: "CONSULTAS",
    itens: [
      { label: "Gerenciar consultas", to: "/consultas" },
      { label: "Agendar consulta", to: "/consultas/agendar" },
    ],
  },
];

function ativo(path, to) {
  if (to === "/profissionais/novo") {
    return path.startsWith("/profissionais/novo") || path.startsWith("/profissionais/editar");
  }
  if (to === "/profissionais") return path === "/profissionais";
  if (to === "/consultas") return path === "/consultas";
  if (to.startsWith("/historico")) return path.startsWith("/historico");
  return path === to;
}

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <div className={styles.left}>
          <Link to="/pacientes" className={styles.logo}>
            <span className={styles.logoIcon}>+</span>
            <span>ClínicaVida</span>
          </Link>
          <input
            className={styles.busca}
            placeholder="Buscar paciente, CPF ou prontuário"
          />
        </div>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            <strong>Diego Martins</strong>
            <span>Recepção</span>
          </div>
          <div className={styles.avatar}>DM</div>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          {menu.map((bloco) => (
            <div key={bloco.secao} className={styles.bloco}>
              <div className={styles.secao}>{bloco.secao}</div>
              {bloco.itens.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    ativo(pathname, item.to)
                      ? `${styles.item} ${styles.itemAtivo}`
                      : styles.item
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </aside>
        <main className={styles.conteudo}>{children}</main>
      </div>
    </div>
  );
}