import cors from 'cors';
import express from 'express';
import { randomUUID } from 'crypto';
import path from 'path';
import { readMessages, readShareholders, saveMessages, saveShareholders } from './lib/store.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const allowedOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ ok: true, service: 'kroma-backend' });
});

app.get('/api/shareholders', async (_request, response) => {
  const shareholders = await readShareholders();
  response.json({ shareholders });
});

app.post('/api/shareholders', async (request, response) => {
  const name = String(request.body?.name ?? '').trim();
  const role = String(request.body?.role ?? '').trim();

  if (!name || !role) {
    response.status(400).json({ error: 'Missing name or role' });
    return;
  }

  const shareholders = await readShareholders();
  const shareholder = { id: randomUUID(), name, role };

  shareholders.unshift(shareholder);
  await saveShareholders(shareholders);

  response.status(201).json({ shareholder });
});

app.delete('/api/shareholders', async (request, response) => {
  const id = String(request.body?.id ?? '').trim();

  if (!id) {
    response.status(400).json({ error: 'Missing id' });
    return;
  }

  const shareholders = await readShareholders();
  const nextShareholders = shareholders.filter((shareholder) => shareholder.id !== id);
  await saveShareholders(nextShareholders);

  response.json({ ok: true });
});

app.post('/api/contact', async (request, response) => {
  const name = String(request.body?.name ?? '').trim();
  const email = String(request.body?.email ?? '').trim();
  const message = String(request.body?.message ?? '').trim();

  if (!name || !email || !message) {
    response.status(400).json({ error: 'Missing fields' });
    return;
  }

  const messages = await readMessages();
  const entry = { name, email, message, createdAt: new Date().toISOString() };

  messages.unshift(entry);
  await saveMessages(messages);

  response.status(201).json({ ok: true, entry });
});

// Servir archivos estáticos del frontend en producción
const frontendDistPath = path.join(process.cwd(), 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// Soporte para enrutamiento SPA en el cliente
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
    return next();
  }
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`KROMA backend running on http://localhost:${port}`);
});