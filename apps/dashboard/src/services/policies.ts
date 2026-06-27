import api from "./api";

export const getPolicies = async () => {
  const { data } = await api.get("/policies");
  return data.policies;
};

export const createPolicy = async (policy: any) => {
  const { data } = await api.post("/policies", policy);
  return data.policy;
};

export const updatePolicy = async (
  id: string,
  policy: any
) => {
  const { data } = await api.patch(
    `/policies/${id}`,
    policy
  );

  return data.policy;
};

export const deletePolicy = async (
  id: string
) => {
  await api.delete(`/policies/${id}`);
};