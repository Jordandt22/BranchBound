import { supabase } from "./supabase.js";

const fullBusinessSelect = `*, state:states(*), city:cities!inner(*), postal_code:postal_codes(*), primary_category:primary_categories(*), secondary_categories:business_secondary_categories!inner(secondary_categories(*)), features:business_features!inner(*), hours:business_hours!inner(*)`;

// ---- Database ----

// Businesses
// export const getTopRatedBusinesses = async () => {
//   const { data, error } = await supabase
//     .from("businesses")
//     .select("*")
//     .gte("reviews_count", 400)
//     .order("total_score", { ascending: false })
//     .limit(12);

//   if (data) {
//     return { data: formatBusinessListings(data), error };
//   }

//   return { data: null, error };
// };
