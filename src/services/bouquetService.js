// src/services/bouquetService.js
import { myFetch } from "../comm/myFetch";

export async function getLikes() {
  return await myFetch("/api/likes");
}

export async function getAllBouquets() {
  return await myFetch("/api/bouquets");
}

export async function likeBouquet(data) {
  return await myFetch("/api/like", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


