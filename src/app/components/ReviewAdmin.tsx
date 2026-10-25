import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut, RefreshCcw, ShieldCheck, Star } from "lucide-react";
import {
  checkReviewAdminAccess,
  fetchAllReviews,
  getCurrentAdminSession,
  onAdminAuthChange,
  setReviewEnabled,
  signInAdmin,
  signOutAdmin,
  type ClientReview,
} from "../lib/reviews";
import { isSupabaseConfigured } from "../lib/supabase";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ReviewAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [adminError, setAdminError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [updatingReviewId, setUpdatingReviewId] = useState("");

  const loadAdminReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    setAdminError("");

    try {
      const hasAccess = await checkReviewAdminAccess();
      setIsAdmin(hasAccess);

      if (!hasAccess) {
        setReviews([]);
        setAdminError("This account is not allowed to moderate reviews.");
        return;
      }

      const rows = await fetchAllReviews();
      setReviews(rows);
    } catch (error) {
      setReviews([]);
      setIsAdmin(false);
      setAdminError(
        error instanceof Error
          ? error.message
          : "Review moderation is temporarily unavailable.",
      );
    } finally {
      setIsLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsCheckingAuth(false);
      return undefined;
    }

    let isMounted = true;

    async function loadSession() {
      try {
        const currentSession = await getCurrentAdminSession();

        if (!isMounted) {
          return;
        }

        setSession(currentSession);

        if (currentSession) {
          await loadAdminReviews();
        }
      } catch (error) {
        if (isMounted) {
          setAdminError(
            error instanceof Error
              ? error.message
              : "Could not check admin session.",
          );
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    const subscription = onAdminAuthChange((nextSession) => {
      setSession(nextSession);

      if (nextSession) {
        loadAdminReviews();
      } else {
        setIsAdmin(false);
        setReviews([]);
      }
    });

    loadSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadAdminReviews]);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    setAuthError("");
    setAdminError("");
    setIsSigningIn(true);

    try {
      const nextSession = await signInAdmin(
        authForm.email.trim(),
        authForm.password,
      );
      setSession(nextSession);
      await loadAdminReviews();
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Admin sign in failed.",
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setAdminError("");

    try {
      await signOutAdmin();
      setSession(null);
      setIsAdmin(false);
      setReviews([]);
    } catch (error) {
      setAdminError(
        error instanceof Error ? error.message : "Could not sign out.",
      );
    }
  };

  const handleVisibilityChange = async (reviewId: string, checked: boolean) => {
    setUpdatingReviewId(reviewId);
    setAdminError("");

    try {
      const updatedReview = await setReviewEnabled(reviewId, checked);
      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === reviewId ? updatedReview : review,
        ),
      );
    } catch (error) {
      setAdminError(
        error instanceof Error ? error.message : "Could not update review.",
      );
    } finally {
      setUpdatingReviewId("");
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div>
        <section className="bg-[#1C2B3A] text-white py-16 border-b-2 border-[#C8922A]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C8922A]">
              DS2 Building Solutions
            </span>
            <h1 className="mb-4 text-4xl sm:text-5xl font-bebas text-white">Review Moderation Admin</h1>
            <p className="text-base text-slate-300">
              Review moderation is currently in offline demo mode. Configure your Supabase project credentials in .env to enable live client review management.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-[#1C2B3A] text-white py-16 border-b-2 border-[#C8922A]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C8922A]">
                DS2 Building Solutions
              </p>
              <h1 className="mb-2 text-4xl sm:text-5xl font-bebas text-white">Client Review Moderation</h1>
              <p className="text-base text-slate-300">
                Approve, feature or hide client reviews across Hertfordshire and regional building projects.
              </p>
            </div>

            {session ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-2 rounded border border-white/20 bg-white/10 px-4 py-2.5 text-xs uppercase font-bold text-white transition-colors hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EF] py-16 min-h-[60vh]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {isCheckingAuth ? (
            <div className="rounded-xl border border-[#E8E2D9] bg-white p-8 text-slate-600 shadow-sm">
              Checking admin session...
            </div>
          ) : !session ? (
            <form
              onSubmit={handleSignIn}
              className="max-w-xl rounded-xl border border-[#E8E2D9] bg-white p-8 shadow-md"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1C2B3A] text-[#C8922A]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bebas text-[#1C2B3A]">Admin Sign In</h2>
                  <p className="text-xs text-slate-500">
                    Sign in to approve or hide DS2 customer reviews.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="admin-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    value={authForm.email}
                    onChange={(event) =>
                      setAuthForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    required
                    className="w-full rounded border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-[#C8922A] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={authForm.password}
                    onChange={(event) =>
                      setAuthForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    required
                    className="w-full rounded border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-[#C8922A] focus:outline-none"
                  />
                </div>

                {authError ? (
                  <div className="rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    {authError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="inline-flex w-full items-center justify-center rounded bg-[#C8922A] hover:bg-[#d8a033] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#1C2B3A] transition-colors disabled:cursor-not-allowed disabled:opacity-60 shadow-md"
                >
                  {isSigningIn ? "Signing In..." : "Sign In to Dashboard"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 rounded-xl border border-[#E8E2D9] bg-white p-6 sm:flex-row sm:items-center sm:justify-between shadow-sm">
                <div>
                  <h2 className="text-2xl font-bebas text-[#1C2B3A]">Client Reviews Moderation</h2>
                  <p className="text-xs text-slate-500">
                    Signed in as {session.user.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadAdminReviews}
                  disabled={isLoadingReviews}
                  className="inline-flex items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </button>
              </div>

              {adminError ? (
                <div className="rounded border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                  {adminError}
                </div>
              ) : null}

              {isLoadingReviews ? (
                <div className="rounded-xl border border-[#E8E2D9] bg-white p-8 text-slate-600 shadow-sm">
                  Loading reviews...
                </div>
              ) : isAdmin && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-[#E8E2D9] bg-white p-6 shadow-sm"
                    >
                      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold text-[#1C2B3A]">
                              {review.client_name}
                            </h3>
                            <Badge
                              variant={review.is_enabled ? "default" : "outline"}
                              className={
                                review.is_enabled
                                  ? "bg-emerald-600 text-white"
                                  : "border-amber-400 text-amber-800 bg-amber-50"
                              }
                            >
                              {review.is_enabled ? "Published" : "Hidden"}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {review.client_role || "Client"} &bull; {review.service_type}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Submitted {formatReviewDate(review.created_at)}
                          </p>
                        </div>

                        <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-700">
                          <span>Show on Home Page</span>
                          <Switch
                            checked={review.is_enabled}
                            disabled={updatingReviewId === review.id}
                            onCheckedChange={(checked) =>
                              handleVisibilityChange(review.id, checked)
                            }
                            className="data-[state=checked]:bg-[#C8922A]"
                            aria-label={`Toggle ${review.client_name} review visibility`}
                          />
                        </label>
                      </div>

                      <div className="mb-3 flex items-center gap-2">
                        <ReviewStars rating={review.rating} />
                        <span className="text-xs font-bold text-slate-500">
                          {review.rating}/5
                        </span>
                      </div>

                      <p className="leading-relaxed text-sm text-slate-700 bg-slate-50 p-4 rounded border border-slate-100">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : isAdmin ? (
                <div className="rounded-xl border border-dashed border-[#E8E2D9] bg-white p-8 text-center text-slate-500">
                  No client reviews submitted yet.
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
