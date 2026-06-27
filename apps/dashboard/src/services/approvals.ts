import api from "./api";

export async function getApprovals() {
  const { data } = await api.get("/approvals");
  return data.approvals;
}

export async function approve(id: string) {
  await api.post(`/approvals/${id}/approve`);
}

export async function reject(id: string) {
  await api.post(`/approvals/${id}/reject`);
}