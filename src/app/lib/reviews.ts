import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, publicSupabase, supabase } from "./supabase";

export type ClientReview = {
  id: string;
  client_name: string;
  client_role: string | null;
  service_type: string;
  rating: number;
  review: string;
  is_enabled: boolean;
  created_at: string;
};

export type ClientReviewInput = {
  client_name: string;
  client_role: string;
  service_type: string;
  rating: number;
  review: string;
};

export const reviewServiceTypes = [
  "Extensions & Additions",
  "Full Renovations & Refurbishments",
  "Loft Conversions",
  "Kitchen & Bathroom Fitting",
  "Brickwork & Masonry",
  "Carpentry & Joinery",
  "Electrical & Plumbing",
  "Plastering & Decorating",
  "Roofing & Guttering",
  "New Build & Groundworks",
  "Driveways & Paving",
  "Commercial Construction",
  "Post-Construction Cleanup",
  "Residential Cleaning",
  "Commercial Cleaning",
  "Property Maintenance",
] as const;

const reviewColumns =
  "id, client_name, client_role, service_type, rating, review, is_enabled, created_at";

export const sampleClientReviews: ClientReview[] = [
  {
    id: "sample-ds2-1",
    client_name: "Sarah H.",
    client_role: "Homeowner · Letchworth Garden City",
    service_type: "Extensions & Additions",
    rating: 5,
    review:
      "DS2 did a complete rear extension and kitchen refit for us. The quality of the work is outstanding — you'd never know it wasn't part of the original house. Finished on time, clean site every day, and the lads were always polite. Highly recommended.",
    is_enabled: true,
    created_at: "2026-02-10T10:00:00.000Z",
  },
  {
    id: "sample-ds2-2",
    client_name: "Mark K.",
    client_role: "Property Owner · Stevenage",
    service_type: "Loft Conversions",
    rating: 5,
    review:
      "Used DS2 for a full bathroom renovation and loft conversion. Both projects were handled brilliantly — great communication throughout, honest pricing, and the finished result is beyond what we hoped for. Will definitely use again.",
    is_enabled: true,
    created_at: "2026-01-28T14:30:00.000Z",
  },
  {
    id: "sample-ds2-3",
    client_name: "Priya B.",
    client_role: "Business Director · Hitchin",
    service_type: "Commercial Construction",
    rating: 5,
    review:
      "Absolutely professional from start to finish. They handled our commercial shop fit on a tight deadline and delivered on every promise. The team were tidy, respectful, and the end result looks fantastic. Five stars without hesitation.",
    is_enabled: true,
    created_at: "2026-01-18T09:15:00.000Z",
  },
  {
    id: "sample-ds2-4",
    client_name: "Tom W.",
    client_role: "Homeowner · Baldock",
    service_type: "Driveways & Paving",
    rating: 5,
    review:
      "DS2 rebuilt our driveway and garden wall — the attention to detail in the brickwork is exceptional. Quoted fairly, started when they said they would, and the workmanship is second to none. Our neighbours keep asking who did it!",
    is_enabled: true,
    created_at: "2026-01-05T16:00:00.000Z",
  },
  {
    id: "sample-ds2-5",
    client_name: "Linda R.",
    client_role: "Resident · Welwyn Garden City",
    service_type: "Electrical & Plumbing",
    rating: 5,
    review:
      "Had DS2 rewire our house and install a new consumer unit. Brilliant job — tidy workers, thorough testing and all certificates provided. Also sorted some plastering where they'd had to chase walls. Everything perfect. Great value for money.",
    is_enabled: true,
    created_at: "2025-12-20T11:45:00.000Z",
  },
  {
    id: "sample-ds2-6",
    client_name: "James D.",
    client_role: "Homeowner · Luton",
    service_type: "Full Renovations & Refurbishments",
    rating: 5,
    review:
      "We used DS2 for a side extension and they managed the whole project brilliantly — planning, building regs, structural engineers, the lot. Kept us in the loop at every stage. The build quality is superb and the price was fair and transparent.",
    is_enabled: true,
    created_at: "2025-12-10T13:20:00.000Z",
  },
  {
    id: "sample-ds2-7",
    client_name: "N. Perera",
    client_role: "Homeowner · Hertfordshire",
    service_type: "Post-Construction Cleanup",
    rating: 5,
    review:
      "The team handled dust, debris, and final detailing after our renovation. The house was ready to move back into the same day.",
    is_enabled: true,
    created_at: "2025-11-24T08:00:00.000Z",
  },
];

function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured for this deployment.");
  }

  return supabase;
}

function requirePublicSupabase() {
  if (!publicSupabase) {
    throw new Error("Supabase is not configured for this deployment.");
  }

  return publicSupabase;
}

/** Strip HTML tags from user input to prevent stored XSS. */
function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Enforce a maximum length on user input strings. */
function enforceMaxLength(input: string, max: number): string {
  return input.length > max ? input.slice(0, max) : input;
}

function cleanInput(input: ClientReviewInput) {
  return {
    client_name: enforceMaxLength(stripHtml(input.client_name.trim()), 100),
    client_role: enforceMaxLength(stripHtml(input.client_role.trim()), 100) || null,
    service_type: enforceMaxLength(stripHtml(input.service_type.trim()), 100),
    rating: Math.max(1, Math.min(5, Math.round(input.rating))),
    review: enforceMaxLength(stripHtml(input.review.trim()), 2000),
    is_enabled: false,
  };
}

export async function fetchPublishedReviews() {
  if (!isSupabaseConfigured || !publicSupabase) {
    return sampleClientReviews;
  }

  const { data, error } = await publicSupabase
    .from("client_reviews")
    .select(reviewColumns)
    .eq("is_enabled", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ClientReview[];
}

export async function submitClientReview(input: ClientReviewInput) {
  const client = requirePublicSupabase();
  const payload = cleanInput(input);

  const { error } = await client.from("client_reviews").insert(payload);

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("client_reviews")) {
      throw new Error(
        "Review database table is missing. Run supabase/client_reviews.sql in this Supabase project.",
      );
    }

    throw error;
  }
}

export async function fetchAllReviews() {
  const client = requireSupabase();

  const { data, error } = await client
    .from("client_reviews")
    .select(reviewColumns)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ClientReview[];
}

export async function setReviewEnabled(id: string, isEnabled: boolean) {
  const client = requireSupabase();

  const { data, error } = await client
    .from("client_reviews")
    .update({ is_enabled: isEnabled })
    .eq("id", id)
    .select(reviewColumns)
    .single();

  if (error) {
    throw error;
  }

  return data as ClientReview;
}

export async function getCurrentAdminSession() {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function checkReviewAdminAccess() {
  const client = requireSupabase();
  const { data, error } = await client.rpc("is_review_admin");

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export function onAdminAuthChange(callback: (session: Session | null) => void) {
  if (!supabase) {
    return { unsubscribe: () => undefined };
  }

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return data.subscription;
}

export async function signInAdmin(email: string, password: string) {
  const client = requireSupabase();

  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    const message = error.message.toLowerCase();

    if (message.includes("email not confirmed")) {
      throw new Error(
        "This admin email is not confirmed in Supabase Auth. Confirm the user or enable auto-confirm for this user.",
      );
    }

    if (
      message.includes("invalid login credentials") ||
      message.includes("invalid credentials")
    ) {
      throw new Error(
        "Admin login failed. Make sure this email exists in Supabase Auth and the password is exactly correct.",
      );
    }

    if (message.includes("email provider") || message.includes("provider")) {
      throw new Error(
        "Email/password login is not enabled in Supabase Auth settings.",
      );
    }

    throw new Error(error.message || "Admin sign in failed.");
  }

  return data.session;
}

export async function signOutAdmin() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();

  if (error) {
    throw error;
  }
}
