import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export type Shareholder = {
  id: string;
  name: string;
  role: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), 'data');
const shareholdersFile = path.join(dataDir, 'shareholders.json');
const messagesFile = path.join(dataDir, 'messages.json');

export async function readShareholders(): Promise<Shareholder[]> {
  try {
    const raw = await readFile(shareholdersFile, 'utf8');
    const parsed = JSON.parse(raw) as Shareholder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveShareholders(shareholders: Shareholder[]) {
  await writeFile(shareholdersFile, JSON.stringify(shareholders, null, 2), 'utf8');
}

export async function readMessages(): Promise<ContactMessage[]> {
  try {
    const raw = await readFile(messagesFile, 'utf8');
    const parsed = JSON.parse(raw) as ContactMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveMessages(messages: ContactMessage[]) {
  await writeFile(messagesFile, JSON.stringify(messages, null, 2), 'utf8');
}