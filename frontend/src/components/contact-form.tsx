'use client';

import { FormEvent, useState, useTransition } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function ContactForm() {
  const [status, setStatus] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      });

      if (!response.ok) {
        setStatus('No se pudo enviar el mensaje.');
        return;
      }

      event.currentTarget.reset();
      setStatus('Mensaje enviado correctamente.');
    });
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="name" placeholder="Tu nombre" required />
      </label>
      <label>
        Correo
        <input name="email" type="email" placeholder="correo@ejemplo.com" required />
      </label>
      <label>
        Mensaje
        <textarea name="message" placeholder="Cuéntanos qué necesitas para KROMA" rows={5} required />
      </label>
      <button className="button button--primary" type="submit" disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar mensaje'}
      </button>
      <p>{status}</p>
    </form>
  );
}