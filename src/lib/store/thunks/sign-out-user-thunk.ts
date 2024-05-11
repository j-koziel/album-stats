import { createAsyncThunk } from "@reduxjs/toolkit"

import { createClient } from "@/lib/supabase/client"

export const signOutUserThunk = createAsyncThunk<any, void>("auth/signOutUser", async (_, { rejectWithValue }) => {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw Error("There was an error signing you out")
    }

    return
  } catch (err) {
    return rejectWithValue(err)
  }
})