import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginUsuarios.css'

function LoginUsuarios() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate("/pg-user-estoque");
  }

  return (
    <div className="usuario-login">

      <main className="usuario-login-layout">

        {/* PAINEL ROXO */}
        <section className="usuario-brand-panel">

          <button
            className="usuario-logo"
            type="button"
            onClick={() => navigate('/')}
          >
            <span className="usuario-logo-mark">N</span>
            NexaStock
          </button>

          <div className="usuario-brand-message">

            <span className="usuario-eyebrow">
              Área do usuário
            </span>

            <h1>
              Seu trabalho, mais simples.
            </h1>

            <p>
              Acesse sua conta e acompanhe suas atividades
              dentro da empresa.
            </p>

          </div>

          <div className="usuario-benefit">

            <span className="usuario-benefit-icon">
              ✦
            </span>

            Acesso rápido e seguro para sua equipe

          </div>

        </section>


        {/* PAINEL DE LOGIN */}
        <section className="usuario-form-panel">

          <div className="usuario-form-container">

            <button
              className="usuario-back"
              type="button"
              onClick={() => navigate('/')}
            >
              <span>←</span>
              Voltar
            </button>

            <h2>
              Acesse sua conta
            </h2>

            <p className="usuario-description">
              Informe seus dados para entrar na plataforma.
            </p>


            <form onSubmit={handleSubmit}>

              {/* EMPRESA */}
              <div className="usuario-field">

                <label htmlFor="company-id">
                  Número de cadastro da empresa
                </label>

                <input
                  id="company-id"
                  name="company-id"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex.: 1024"
                />

              </div>


              {/* FUNCIONÁRIO */}
              <div className="usuario-field">

                <label htmlFor="employee-id">
                  Número de funcionário
                </label>

                <input
                  id="employee-id"
                  name="employee-id"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex.: 00125"
                />

              </div>


              {/* SENHA */}
              <div className="usuario-field">

                <label htmlFor="password">
                  Senha
                </label>

                <div className="usuario-password">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                  />

                  <button
                    type="button"
                    className="usuario-password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>

                </div>

              </div>


              {/* ENTRAR */}
              <button
                className="usuario-submit"
                type="submit"
              >
                Entrar
              </button>

              <p className="usuario-message">
                {message}
              </p>

            </form>


            <p className="usuario-help">
              Ainda não tem acesso? Fale com o administrador da sua empresa.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default LoginUsuarios