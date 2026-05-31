import { randomUUID } from 'crypto';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Shareholder = {
  id: string;
  name: string;
  role: string;
};

type ShareholderPayload = {
  name?: string;
  role?: string;
  id?: string;
};

const dataFile = path.join(process.cwd(), 'data', 'shareholders.json');

async function readShareholders(): Promise<Shareholder[]> {
  try {
    const raw = await readFile(dataFile, 'utf8');
    const parsed = JSON.parse(raw) as Shareholder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveShareholders(shareholders: Shareholder[]) {
  await writeFile(dataFile, JSON.stringify(shareholders, null, 2), 'utf8');
}

export async function GET() {
  const shareholders = await readShareholders();
  return NextResponse.json({ shareholders });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as ShareholderPayload;
  const name = payload.name?.trim();
  const role = payload.role?.trim();

  if (!name || !role) {
    return NextResponse.json({ error: 'Missing name or role' }, { status: 400 });
  }

  const shareholders = await readShareholders();
  const shareholder: Shareholder = {
    id: randomUUID(),
    name,
    role
  };

  shareholders.unshift(shareholder);
  await saveShareholders(shareholders);

  return NextResponse.json({ shareholder }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const payload = (await request.json()) as ShareholderPayload;

  if (!payload.id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const shareholders = await readShareholders();
  const nextShareholders = shareholders.filter((shareholder) => shareholder.id !== payload.id);
  await saveShareholders(nextShareholders);

  return NextResponse.json({ ok: true });
}