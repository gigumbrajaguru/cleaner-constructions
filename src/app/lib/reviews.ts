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
    id: "sample-apex-1",
    client_name: "Charlotte Evans",
    client_role: "Homeowner · Letchworth",
    service_type: "Extensions & Additions",
    rating: 5,
    review:
      "Apex completed our double-storey rear extension and new kitchen space. The build team was punctual, tidy, and transparent with every phase. Delivered on schedule with immaculate finishing.",
    is_enabled: true,
    created_at: "2026-02-14T10:00:00.000Z",
  },
  {
    id: "sample-apex-2",
    client_name: "Marcus Thornton",
    client_role: "Property Landlord · Stevenage",
    service_type: "Full Renovations & Refurbishments",
    rating: 5,
    review:
      "Superb full-property renovation. Stripped back to bare walls, re-engineered the plumbing and electrics, and replastered throughout. Great communication from the project manager.",
    is_enabled: true,
    created_at: "2026-02-02T14:30:00.000Z",
  },
  {
    id: "sample-apex-3",
    client_name: "Hannah Phillips",
    client_role: "Commercial Manager · Hitchin",
    service_type: "Commercial Construction",
    rating: 5,
    review:
      "Handled our office floor re-partitioning and retail showroom fit-out over a bank holiday weekend. Zero downtime for our staff, spotless handover, and fully certified documentation.",
    is_enabled: true,
    created_at: "2026-01-20T09:15:00.000Z",
  },
  {
    id: "sample-apex-4",
    client_name: "Oliver Davies",
    client_role: "Homeowner · Baldock",
    service_type: "Loft Conversions",
    rating: 5,
    review:
      "Transformed our awkward attic into a bright master bedroom and en-suite shower room with dormer windows. The structural woodwork and insulation quality are first class.",
    is_enabled: true,
    created_at: "2026-01-11T16:00:00.000Z",
  },
  {
    id: "sample-apex-5",
    client_name: "Gareth Morgan",
    client_role: "Resident · Welwyn",
    service_type: "Driveways & Paving",
    rating: 5,
    review:
      "Replaced our failing cracked concrete driveway with permeable charcoal block paving and reconstructed the brick boundary pier walls. Excellent craftsmanship and kerb appeal.",
    is_enabled: true,
    created_at: "2025-12-28T11:45:00.000Z",
  },
  {
    id: "sample-apex-6",
    client_name: "Sophie Bennett",
    client_role: "Property Owner · St Albans",
    service_type: "Kitchen & Bathroom Fitting",
    rating: 5,
    review:
      "Complete rip-out and luxury installation of our family bathroom and bespoke kitchen. The tile alignment, silicone seals, and under-cabinet lighting are flawless.",
    is_enabled: true,
    created_at: "2025-12-14T13:20:00.000Z",
  },
  {
    id: "sample-apex-7",
    client_name: "Liam Foster",
    client_role: "Developer Partner · Hertfordshire",
    service_type: "Post-Construction Cleanup",
    rating: 5,
    review:
      "Their handover team detailed 4 newly completed townhouses prior to estate agent photography. Fine plaster dust was completely removed, windows polished, and carpets spotless.",
    is_enabled: true,
    created_at: "2025-11-30T08:00:00.000Z",
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
