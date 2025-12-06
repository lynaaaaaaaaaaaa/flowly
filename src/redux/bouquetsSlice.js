import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBouquets, likeBouquet, getLikes } from "../services/bouquetService";

export const fetchBouquets = createAsyncThunk("bouquets/fetchAll", async () => {
  return await getAllBouquets();
});

export const toggleLike = createAsyncThunk("bouquets/toggleLike", async (id) => {
  const data = await likeBouquet(id);
  return data.bouquet;
});

// 🔁 Nouveau thunk pour rafraîchir les likes sans recharger
export const refreshLikes = createAsyncThunk("bouquets/refreshLikes", async () => {
  return await getLikes();
});

const bouquetsSlice = createSlice({
  name: "bouquets",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBouquets.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((b) => b.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(refreshLikes.fulfilled, (state, action) => {
        action.payload.forEach((likeData) => {
          const bouquet = state.items.find((b) => b.id === likeData.id);
          if (bouquet) bouquet.likes = likeData.likes;
        });
      });
  },
});

export default bouquetsSlice.reducer;
