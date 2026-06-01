import { useState } from 'react';

type ChatMessage = {
  from: 'mascot' | 'user';
  text: string;
};

const chatResponses: Record<string, string> = {
  '¿Qué es el Helado Camaleón?':
    '¡Soy un helado mágico que cambia de color! 🎨 Estoy hecho con antocianinas naturales (un pigmento de flores y frutas). Cuando me echas limón, mi color se transforma por una reacción de pH. ¡Es ciencia deliciosa! 🧪🍦',
  '¿Cómo cambia de color?':
    '¡Es súper fácil! Solo tienes que exprimir unas gotas de limón sobre mí y ¡magia! 🍋✨ Mi color cambia instantáneamente gracias a las antocianinas que reaccionan con el ácido del limón. De morado puedo pasar a rosa, fucsia o rojo. ¡Cada mordida es una sorpresa!',
  '¿Dónde lo puedo encontrar?':
    'Por ahora estamos en Ecuador 🇪🇨 y puedes encontrarnos en ferias, eventos especiales y puntos de venta seleccionados. ¡Síguenos en redes para saber dónde estaremos! También puedes cotizar para tu evento privado. 📍',
  '¿Cómo ser accionista?':
    '¡Qué emoción que quieras ser parte del equipo! 🚀 Helado Camaleón es una empresa constituida como S.A.S. Si te interesa invertir o ser socio, contáctanos directamente por el formulario de contacto y te daremos toda la información. 💼',
  'Quiero contactarlos':
    '¡Claro! 📬 Puedes usar nuestro formulario de contacto aquí abajo en la página, o escribirnos directamente. Estamos encantados de ayudarte con cotizaciones para eventos, información de franquicias o cualquier pregunta. ¡Te esperamos! 🍦💚',
};

const questions = Object.keys(chatResponses);

const GREETING = '¡Hola! Soy Camaleón 🍦🦎\n¿En qué puedo ayudarte?';

export function ChameleonChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: 'mascot', text: GREETING },
  ]);
  const [showQuestions, setShowQuestions] = useState(true);

  function handleQuestion(question: string) {
    const answer = chatResponses[question];
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: question },
      { from: 'mascot', text: answer },
    ]);
    setShowQuestions(false);
  }

  function handleBackToMenu() {
    setShowQuestions(true);
  }

  function handleToggle() {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setMessages([{ from: 'mascot', text: GREETING }]);
      setShowQuestions(true);
    }
  }

  return (
    <>
      {isOpen && (
        <div className="chameleon-chat">
          <div className="chameleon-chat__header">
            <div className="chameleon-chat__mascot-icon">🍦</div>
            <div>
              <strong>Helado Camaleón</strong>
              <span>Tu asistente mágico</span>
            </div>
            <button
              className="chameleon-chat__close"
              onClick={handleToggle}
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          <div className="chameleon-chat__body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.from === 'mascot'
                    ? 'chameleon-chat__bubble chameleon-chat__bubble--mascot'
                    : 'chameleon-chat__bubble chameleon-chat__bubble--user'
                }
              >
                {msg.from === 'mascot' && (
                  <span className="chameleon-chat__avatar">🦎</span>
                )}
                <p>{msg.text}</p>
              </div>
            ))}

            {showQuestions && (
              <div className="chameleon-chat__questions">
                {questions.map((q) => (
                  <button
                    key={q}
                    className="chameleon-chat__question-btn"
                    onClick={() => handleQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {!showQuestions && (
              <div className="chameleon-chat__questions">
                <button
                  className="chameleon-chat__question-btn chameleon-chat__question-btn--back"
                  onClick={handleBackToMenu}
                >
                  ← Ver más preguntas
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        className="chameleon-chat__fab"
        onClick={handleToggle}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? '✕' : <img src="/helado-camaleon-logo.jpeg" alt="Chat" className="chameleon-chat__fab-logo" />}
      </button>
    </>
  );
}
