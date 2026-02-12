export type Memo = {
  id: number;
  content: string;
  tags: string[];
  created_at: string;
};

export type MemoCreate = {
  content: string;
  tags?: string[];
};

export type MemoUpdate = {
  content?: string;
  tags?: string[];
};

const API_BASE = "";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function listMemos(tag?: string): Promise<Memo[]> {
  const url = new URL(`${API_BASE}/memos`, window.location.origin);
  if (tag) {
    url.searchParams.set("tag", tag);
  }
  const res = await fetch(url.toString(), {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch memos");
  }
  const data = await res.json();
  return data.items ?? [];
}

export async function createMemo(payload: MemoCreate): Promise<Memo> {
  const res = await fetch(`${API_BASE}/memos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create memo");
  }
  return res.json();
}

export async function updateMemo(id: number, payload: MemoUpdate): Promise<Memo> {
  const res = await fetch(`${API_BASE}/memos/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to update memo");
  }
  return res.json();
}

export async function deleteMemo(id: number): Promise<void> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/memos/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error("Failed to delete memo");
  }
}
