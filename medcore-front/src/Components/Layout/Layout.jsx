import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

const menu = [
  {
    secao: "PACIENTES",
    itens: [
      { label: "Listagem de pacientes", to: "/pacientes" },
      { label: "Histórico médico", to: "/historico/00231" },
    ],
  },
  {
    secao: "PROFISSIONAIS",
    itens: [{ label: "Listagem de profissionais", to: "/profissionais" }],
  },
  {
    secao: "CONSULTAS",
    itens: [{ label: "Gerenciar consultas", to: "/consultas" }],
  },
  {
    secao: "QUARTOS E INTERNAÇÕES",
    itens: [
      { label: "Dashboard de leitos", to: "/quartos" },
      { label: "Listagem de internações", to: "/internacoes" },
    ],
  },
];

// Telas de cadastro não aparecem no menu: destacam a listagem do seu módulo.
function ativo(path, to) {
  if (to === "/pacientes") return path === "/pacientes" || path === "/cadastro";
  if (to.startsWith("/historico")) return path.startsWith("/historico");
  return path === to || path.startsWith(`${to}/`);
}

const KEY_MENU = "clinicavida:menuAberto";
const MOBILE = 860;

function menuInicial() {
  if (window.innerWidth <= MOBILE) return false;
  try {
    return localStorage.getItem(KEY_MENU) !== "0";
  } catch {
    return true;
  }
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const [menuAberto, setMenuAberto] = useState(menuInicial);

  function alternarMenu() {
    const novo = !menuAberto;
    setMenuAberto(novo);
    if (window.innerWidth > MOBILE) {
      try {
        localStorage.setItem(KEY_MENU, novo ? "1" : "0");
      } catch {
        // Preferência apenas visual; segue sem salvar.
      }
    }
  }

  function fecharNoMobile() {
    if (window.innerWidth <= MOBILE) setMenuAberto(false);
  }

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.btnMenu}
            onClick={alternarMenu}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            title={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            <span />
            <span />
            <span />
          </button>
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
        {menuAberto && (
          <div className={styles.fundoMenu} onClick={() => setMenuAberto(false)} />
        )}
        <aside
          className={
            menuAberto ? styles.sidebar : `${styles.sidebar} ${styles.sidebarFechada}`
          }
        >
          {menu.map((bloco) => (
            <div key={bloco.secao} className={styles.bloco}>
              <div className={styles.secao}>{bloco.secao}</div>
              {bloco.itens.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={fecharNoMobile}
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