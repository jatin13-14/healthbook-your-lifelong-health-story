const AUTH_TOKEN_KEY = "healthbook_token";

export function getAuthToken(): string | null {
  return typeof localStorage !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
}

export function setAuthToken(token: string): void {
  if (typeof localStorage !== "undefined") localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  if (typeof localStorage !== "undefined") localStorage.removeItem(AUTH_TOKEN_KEY);
}

export interface LoginResult {
  token: string;
  user_id: string;
  email: string;
  full_name: string;
  role: string;
}

/** POST /api/auth/login/ — returns token and user info */
export async function login(email: string, password: string): Promise<LoginResult> {
  const base = getApiBase();
  const res = await fetch(`${base}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((data.detail as string) || res.statusText) as Error & { status?: number; body?: ApiError };
    e.status = res.status;
    e.body = data as ApiError;
    throw e;
  }
  return data as LoginResult;
}

export interface MeResult {
  user_id: string;
  email: string;
  full_name: string;
  role: string;
}

/** GET /api/auth/me/ — requires Authorization: Token */
export async function me(token: string): Promise<MeResult> {
  const base = getApiBase();
  const res = await fetch(`${base}/api/auth/me/`, {
    headers: { Authorization: `Token ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((data.detail as string) || res.statusText) as Error & { status?: number };
    e.status = res.status;
    throw e;
  }
  return data as MeResult;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name?: string;
}

export interface RegisterResult {
  ok: boolean;
}

export interface ApiError {
  detail: string;
  errors?: Record<string, string>;
}

/**
 * POST /api/auth/register/
 * Returns { ok: true } on success. Throws on non-2xx or returns error body.
 */
export async function register(payload: RegisterPayload): Promise<RegisterResult> {
  const url = `${getApiBase()}/api/auth/register/`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email.trim(),
      password: payload.password,
      full_name: (payload.full_name || "").trim(),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((data.detail as string) || res.statusText) as Error & { status?: number; body?: ApiError };
    e.status = res.status;
    e.body = data as ApiError;
    throw e;
  }
  return data as RegisterResult;
}

/** OTP: request a 6-digit code sent to email (via backend SMTP) */
export async function otpRequest(email: string): Promise<{ ok: boolean }> {
  const url = `${getApiBase()}/api/auth/otp/request/`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((data.detail as string) || res.statusText) as Error & { status?: number; body?: ApiError };
    e.status = res.status;
    e.body = data as ApiError;
    throw e;
  }
  return data as { ok: boolean };
}

/** OTP: verify 6-digit code; returns action_link to complete Supabase sign-in if configured */
export async function otpVerify(
  email: string,
  token: string,
  redirectTo?: string
): Promise<{ ok: boolean; action_link?: string }> {
  const url = `${getApiBase()}/api/auth/otp/verify/`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      token: token.trim(),
      redirect_to: redirectTo || `${window.location.origin}/dashboard`,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((data.detail as string) || res.statusText) as Error & { status?: number; body?: ApiError };
    e.status = res.status;
    e.body = data as ApiError;
    throw e;
  }
  return data as { ok: boolean; action_link?: string };
}

export interface CreatePatientAccountPayload {
  /** When omitted, API creates Supabase user and then saves to DB (API-first signup). */
  user_id?: string;
  first_name: string;
  last_name: string;
  contact: string;
  email: string;
  /** Required for API-first signup (when user_id is not sent). */
  password?: string;
}

const API_UNREACHABLE_MSG =
  "Cannot reach the backend. Start it in a terminal: cd backend && python manage.py runserver 8000";

function getApiBase(): string {
  // In dev (browser), always use same origin so Vite proxy forwards /api to backend (8000) — no CORS or connection issues
  if (import.meta.env.DEV && typeof window !== "undefined") return window.location.origin;
  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  if (base) return base;
  throw new Error("VITE_API_BASE_URL is not set. Add it to .env (e.g. http://127.0.0.1:8000).");
}

/** Build headers for data API calls; uses Token auth (X-User-Id kept for compatibility) */
function dataApiHeaders(userId: string, contentType = true): Record<string, string> {
  const h: Record<string, string> = { "X-User-Id": userId };
  const token = getAuthToken();
  if (token) h["Authorization"] = `Token ${token}`;
  if (contentType) h["Content-Type"] = "application/json";
  return h;
}

/** Generic request to data API; throws on non-2xx with status and body */
async function dataApiRequest<T>(
  method: string,
  path: string,
  userId: string,
  body?: unknown
): Promise<T> {
  const url = `${getApiBase()}${path.startsWith("/") ? path : `/${path}`}`;
  const options: RequestInit = {
    method,
    headers: dataApiHeaders(userId),
  };
  if (body !== undefined && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(body);
  }
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch";
    if (message === "Failed to fetch" || message.toLowerCase().includes("network"))
      throw new Error(API_UNREACHABLE_MSG);
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((data.detail as string) || res.statusText) as Error & { status?: number; body?: ApiError };
    e.status = res.status;
    e.body = data as ApiError;
    throw e;
  }
  return data as T;
}

// --- Health records (Django API) ---
export interface HealthRecordApi {
  id: string;
  user_id: string;
  type: string;
  title: string;
  description: string | null;
  record_date: string;
  file_url: string | null;
  created_at: string;
}

export async function apiHealthRecordsList(userId: string): Promise<HealthRecordApi[]> {
  return dataApiRequest<HealthRecordApi[]>("GET", `/api/health-records/?user_id=${userId}`, userId);
}

export async function apiHealthRecordCreate(
  userId: string,
  payload: { type: string; title: string; description?: string; record_date: string; file_url?: string }
): Promise<HealthRecordApi> {
  return dataApiRequest<HealthRecordApi>("POST", "/api/health-records/", userId, { ...payload, user_id: userId });
}

export async function apiHealthRecordDelete(userId: string, id: string): Promise<void> {
  await dataApiRequest<void>("DELETE", `/api/health-records/${id}/`, userId);
}

// --- Medications (Django API) ---
export interface MedicationApi {
  id: string;
  user_id: string;
  name: string;
  prescriber: string | null;
  frequency: string | null;
  purpose: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  refills_left: number | null;
  created_at: string;
}

export async function apiMedicationsList(userId: string): Promise<MedicationApi[]> {
  return dataApiRequest<MedicationApi[]>("GET", `/api/medications/?user_id=${userId}`, userId);
}

export async function apiMedicationCreate(
  userId: string,
  payload: Omit<MedicationApi, "id" | "user_id" | "created_at">
): Promise<MedicationApi> {
  return dataApiRequest<MedicationApi>("POST", "/api/medications/", userId, { ...payload, user_id: userId });
}

export async function apiMedicationUpdate(
  userId: string,
  id: string,
  updates: Partial<Omit<MedicationApi, "id" | "user_id" | "created_at">>
): Promise<MedicationApi> {
  return dataApiRequest<MedicationApi>("PATCH", `/api/medications/${id}/`, userId, updates);
}

export async function apiMedicationDelete(userId: string, id: string): Promise<void> {
  await dataApiRequest<void>("DELETE", `/api/medications/${id}/`, userId);
}

// --- Emergency profile (Django API; one per user, lookup by user_id) ---
export interface EmergencyProfileApi {
  id: string;
  user_id: string;
  blood_group: string | null;
  allergies: string[];
  chronic_conditions: string[];
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export async function apiEmergencyProfileGet(userId: string): Promise<EmergencyProfileApi | null> {
  try {
    return await dataApiRequest<EmergencyProfileApi>("GET", `/api/emergency-profiles/${userId}/`, userId);
  } catch (e) {
    const err = e as { status?: number };
    if (err.status === 404) return null;
    throw e;
  }
}

export async function apiEmergencyProfileCreate(
  userId: string,
  payload: Partial<Omit<EmergencyProfileApi, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<EmergencyProfileApi> {
  return dataApiRequest<EmergencyProfileApi>("POST", "/api/emergency-profiles/", userId, { ...payload, user_id: userId });
}

export async function apiEmergencyProfileUpdate(
  userId: string,
  payload: Partial<Omit<EmergencyProfileApi, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<EmergencyProfileApi> {
  return dataApiRequest<EmergencyProfileApi>("PATCH", `/api/emergency-profiles/${userId}/`, userId, payload);
}

/** POST /api/create-patient-account/ — create User + Patient in DB */
export async function createPatientAccount(payload: CreatePatientAccountPayload): Promise<{ ok: boolean; user_id?: string }> {
  const url = `${getApiBase()}/api/create-patient-account/`;
  const body: Record<string, string> = {
    first_name: (payload.first_name || "").trim(),
    last_name: (payload.last_name || "").trim(),
    contact: (payload.contact || "").trim(),
    email: (payload.email || "").trim().toLowerCase(),
  };
  if (payload.user_id) body.user_id = payload.user_id;
  // Always send password when present (required for API-first signup when no user_id)
  if (payload.password != null && payload.password !== "") body.password = payload.password;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch";
    if (message === "Failed to fetch" || message.toLowerCase().includes("network"))
      throw new Error(API_UNREACHABLE_MSG);
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error((data.detail as string) || res.statusText) as Error & { status?: number; body?: ApiError };
    e.status = res.status;
    e.body = data as ApiError;
    throw e;
  }
  return data as { ok: boolean; user_id?: string };
}
