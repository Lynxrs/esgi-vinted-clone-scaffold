const STORAGE_KEY = "vinted-clone-userId";

export function getUserId(): string {
  let userId = "550e8400-e29b-41d4-a716-446655440001"; //localStorage.getItem(STORAGE_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, userId); //550e8400-e29b-41d4-a716-446655440001
  }
  return userId;
}
