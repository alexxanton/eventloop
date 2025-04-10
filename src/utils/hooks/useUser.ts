import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { User } from "@supabase/supabase-js";

export const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
};
