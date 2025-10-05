// server/biostar.ts
import type { RequestHandler } from "express";

// ===== ENV =====
export const BASE  = (process.env.BIOSTAR_SERVER_URL ?? "").replace(/\/+$/,"");
export const USER  = process.env.BIOSTAR_USERNAME ?? "";
export const PASS  = process.env.BIOSTAR_PASSWORD ?? "";
export const DEFAULT_DOOR_ID =
  Number(process.env.BIOSTAR_DOOR_ID ?? 0) || undefined;

function requireEnv(): string | null {
  if (!BASE) return "BIOSTAR_SERVER_URL missing";
  if (!USER) return "BIOSTAR_USERNAME missing";
  if (!PASS) return "BIOSTAR_PASSWORD missing";
  return null;
}

function commonHeaders() {
  return {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "TanCo/Server",
  };
}

function apiHeadersWithSID(sid: string) {
  const cookie = `be-session-id=${sid}; bs-session-id=${sid}`;
  return {
    ...commonHeaders(),
    "be-session-id": sid,
    "bs-session-id": sid,
    Cookie: cookie,
  };
}

function sidFromHeaders(h: Headers): string | null {
  const d = h.get("be-session-id") || h.get("bs-session-id");
  if (d) return d;
  const sc = h.get("set-cookie");
  if (sc) {
    const m = sc.match(
      /(?:^|;|\s)(?:be-session-id|bs-session-id)=([^;]+)/i
    );
    if (m) return m[1];
  }
  return null;
}

// ---- LOGIN (v1 -> v2 fallback) ----
async function loginV1(): Promise<string> {
  const url = `${BASE}/api/login`;
  const body = JSON.stringify({ User: { login_id: USER, password: PASS } });
  const r = await fetch(url, {
    method: "POST",
    headers: { ...commonHeaders(), "Content-Type": "application/json" },
    body,
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`login(v1) HTTP ${r.status}: ${t}`);
  const sid = sidFromHeaders(r.headers);
  if (!sid) throw new Error(`login(v1) no SID in headers`);
  return sid;
}

async function loginV2(): Promise<string> {
  const url = `${BASE}/api/v2/login`;
  const pair = Buffer.from(`${USER}:${PASS}`).toString("base64");
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Basic ${pair}`, ...commonHeaders() },
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`login(v2) HTTP ${r.status}: ${t}`);
  const sid = sidFromHeaders(r.headers);
  if (!sid) throw new Error(`login(v2) no SID in headers`);
  return sid;
}

async function login(): Promise<string> {
  try {
    return await loginV1();
  } catch (e1: any) {
    try {
      return await loginV2();
    } catch (e2: any) {
      throw new Error(`Login failed: ${e1?.message} | ${e2?.message}`);
    }
  }
}

async function whoami(sid: string): Promise<any | null> {
  const H = apiHeadersWithSID(sid);
  const paths = [
    "/api/users/me",
    "/api/v2/users/me",
    "/be/api/users/me",
    "/bs/api/users/me",
  ];
  for (const p of paths) {
    try {
      const r = await fetch(`${BASE}${p}`, { headers: H });
      if (r.ok) return await r.json();
    } catch {}
  }
  return null;
}

async function openDoorInternal(
  doorId: number,
  sid: string
): Promise<{ ok: boolean; endpoint?: string | null; status?: number; body?: string }> {
  const H = apiHeadersWithSID(sid);
  const candidates = [
    { url: `/api/doors/${doorId}/open`, json: false, body: "" },
    { url: `/api/v2/doors/${doorId}/open`, json: false, body: "" },
    { url: `/be/api/doors/${doorId}/open`, json: false, body: "" },
    { url: `/bs/api/doors/${doorId}/open`, json: false, body: "" },

    { url: `/api/doors/open`, json: true, body: JSON.stringify({ ids: [doorId] }) },
    { url: `/api/v2/doors/open`, json: true, body: JSON.stringify({ ids: [doorId] }) },
    { url: `/be/api/doors/open`, json: true, body: JSON.stringify({ ids: [doorId] }) },
    { url: `/bs/api/doors/open`, json: true, body: JSON.stringify({ ids: [doorId] }) },
  ];

  for (const c of candidates) {
    const headers: Record<string, string> = { ...H };
    if (c.json) headers["Content-Type"] = "application/json";
    try {
      const r = await fetch(`${BASE}${c.url}`, {
        method: "POST",
        headers,
        body: c.body,
      });
      const txt = await r.text();
      if (r.ok) return { ok: true, endpoint: c.url, status: r.status, body: txt };
    } catch {}
  }
  return { ok: false, endpoint: null, status: 500, body: "all endpoints failed" };
}

// ===== Express Handlers =====
export const doorHealthHandler: RequestHandler = (req, res) => {
  const err = requireEnv();
  res.json({
    ok: !err,
    error: err ?? null,
    base: BASE,
    hasUser: Boolean(USER),
    hasPass: Boolean(PASS),
    defaultDoorId: DEFAULT_DOOR_ID ?? null,
  });
};

export const doorOpenHandler: RequestHandler = async (req, res) => {
  const envErr = requireEnv();
  if (envErr) return res.status(500).json({ ok: false, error: envErr });

  const q = (req.query.doorId as string) ?? "";
  const doorId = Number(q || DEFAULT_DOOR_ID);
  if (!doorId)
    return res.status(400).json({ ok: false, error: "doorId missing (query ?doorId= or env BIOSTAR_DOOR_ID)" });

  try {
    const sid = await login();
    const me = await whoami(sid);
    const out = await openDoorInternal(doorId, sid);
    return res.status(out.ok ? 200 : 500).json({
      ...out,
      user: me?.User?.login_id,
      role: me?.User?.role?.name,
    });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
};
