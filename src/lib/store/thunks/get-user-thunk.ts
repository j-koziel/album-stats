import { createAsyncThunk } from "@reduxjs/toolkit"

import { createClient } from "@/lib/supabase/client"

export const getUserThunk = createAsyncThunk<any, void>("auth/getUser", async (_, { rejectWithValue }) => {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      throw Error("You are not authenticated")
    }

    const { data: profile } = await supabase.from("profiles").select("*");
    console.log(profile)
    return profile && profile[0]
  } catch (err) {
    return rejectWithValue(err)
  }
})