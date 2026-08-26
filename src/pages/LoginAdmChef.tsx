import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginAdmChef.css'

function LoginAdmChef() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

 function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  navigate('/adm-estoque')
}
  return (
    <div className="adm-login">

      <main className="adm-login-layout">

        {/* PAINEL ROXO */}
        <section className="adm-brand-panel">

          <button
            className="adm-logo"
            type="button"
            onClick={() => navigate('/')}
          >
            <span className="adm-logo-mark">N</span>
            NexaStock
          </button>

          <div className="adm-brand-message">

            <span className="adm-eyebrow">
              Área da empresa
            </span>

            <h1>
              Seu estoque, em movimento.
            </h1>

            <p>
              Acompanhe a operação da sua empresa em um só lugar,
              com clareza e agilidade.
            </p>

          </div>

          <div className="adm-benefit">
            <span className="adm-benefit-icon">
              ✦
            </span>

            Gestão inteligente para a sua operação
          </div>

        </section>


        {/* PAINEL DE LOGIN */}
        <section className="adm-form-panel">

          <div className="adm-form-container">

            <button
              className="adm-back"
              type="button"
              onClick={() => navigate('/')}
            >
              <span>←</span>
              Voltar
            </button>

            <h2>
              Acesse sua empresa
            </h2>

            <p className="adm-description">
              Informe seus dados para entrar na plataforma.
            </p>


            <form onSubmit={handleSubmit}>

              {/* ID DA EMPRESA */}
              <div className="adm-field">

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


              {/* SENHA */}
              <div className="adm-field">

                <label htmlFor="password">
                  Senha
                </label>

                <div className="adm-password">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                  />

                  <button
                    type="button"
                    className="adm-password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>

                </div>

              </div>


              {/* ENTRAR */}
              <button
                className="adm-submit"
                type="submit"
              >
                Entrar
              </button>

              <p className="adm-message">
                {message}
              </p>

            </form>

            <p className="adm-help">
              Ainda não tem acesso? Fale com o administrador da sua empresa.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default LoginAdmChef