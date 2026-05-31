'use client';

import { FormEvent, useEffect, useState, useTransition } from 'react';

type Shareholder = {
  id: string;
  name: string;
  role: string;
};

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const initialForm = { name: '', role: '' };

export function ShareholderManager() {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    async function loadShareholders() {
      const response = await fetch(`${apiBaseUrl}/api/shareholders`, { cache: 'no-store' });
      const data = (await response.json()) as { shareholders: Shareholder[] };

      if (!cancelled) {
        setShareholders(data.shareholders);
      }
    }

    loadShareholders().catch(() => {
      if (!cancelled) {
        setStatus('No se pudieron cargar los accionistas.');
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshShareholders() {
    const response = await fetch(`${apiBaseUrl}/api/shareholders`, { cache: 'no-store' });
    const data = (await response.json()) as { shareholders: Shareholder[] };
    setShareholders(data.shareholders);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');

    if (!form.name.trim() || !form.role.trim()) {
      setStatus('Completa nombre y rol antes de guardar.');
      return;
    }

    startTransition(async () => {
      const response = await fetch(`${apiBaseUrl}/api/shareholders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        setStatus('No se pudo guardar el accionista.');
        return;
      }

      setForm(initialForm);
      setStatus('Accionista agregado correctamente.');
      await refreshShareholders();
    });
  }

  async function removeShareholder(id: string) {
    startTransition(async () => {
      const response = await fetch(`${apiBaseUrl}/api/shareholders`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        setStatus('No se pudo eliminar el accionista.');
        return;
      }

      setStatus('Accionista eliminado.');
      await refreshShareholders();
    });
  }

  return (
    <div className="shareholder-layout">
      <form className="shareholder-form" onSubmit={handleSubmit}>
        <label>
          Nombre del accionista
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Ej. Stefania Salgado"
          />
        </label>
        <label>
          Rol o participación
          <input
            value={form.role}
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            placeholder="Ej. Socia fundadora / CEO"
          />
        </label>
        <button className="button button--primary" type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Agregar accionista'}
        </button>
        <p>{status || 'Puedes editar la lista desde este mismo panel. Los datos se guardan en el backend local.'}</p>
      </form>

      <div className="shareholder-list">
        <h3>Listado actual</h3>
        {shareholders.length === 0 ? (
          <p className="shareholder-empty">Aún no hay accionistas registrados.</p>
        ) : (
          <ul>
            {shareholders.map((shareholder) => (
              <li key={shareholder.id}>
                <div>
                  <strong>{shareholder.name}</strong>
                  <span>{shareholder.role}</span>
                </div>
                <button type="button" onClick={() => removeShareholder(shareholder.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}