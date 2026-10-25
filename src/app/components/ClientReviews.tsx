import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, Send, Star, MapPin, Quote } from "lucide-react";
import {
  fetchPublishedReviews,
  reviewServiceTypes,
  submitClientReview,
  type ClientReview,
  type ClientReviewInput,
} from "../lib/reviews";
import { isSupabaseConfigured } from "../lib/supabase";

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const emptyForm: ClientReviewInput = {
  client_name: "",
  client_role: "",
  service_type: reviewServiceTypes[0],
  rating: 5,
  review: "",
};

function RatingStars({
  rating,
  onChange,
}: {
  rating: number;
  onChange?: (rating: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;

        if (onChange) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="rounded p-1 text-amber-500 transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={`Set ${star} star rating`}
            >
              <Star
                className={`h-5 w-5 ${
                  filled ? "fill-[#C8922A] text-[#C8922A]" : "text-gray-300"
                }`}
              />
            </button>
          );
        }

        return (
          <Star
            key={star}
            className={`h-5 w-5 ${
              filled ? "fill-[#C8922A] text-[#C8922A]" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function ClientReviews() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewError, setReviewError] = useState("");
  const [form, setForm] = useState<ClientReviewInput>(emptyForm);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const lastSubmitTime = useRef(0);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const publishedReviews = await fetchPublishedReviews();

        if (!isMounted) return;

        setReviews(publishedReviews);
        setReviewError("");
      } catch (error) {
        if (!isMounted) return;

        setReviews([]);
        setReviewError(
          error instanceof Error
            ? error.message
            : "Client reviews are temporarily unavailable.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % reviews.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const activeReview = reviews[activeIndex];
  const hasMultipleReviews = reviews.length > 1;

  const showPreviousReview = () => {
    if (!hasMultipleReviews) return;
    setActiveIndex((index) => (index - 1 + reviews.length) % reviews.length);
  };

  const showNextReview = () => {
    if (!hasMultipleReviews) return;
    setActiveIndex((index) => (index + 1) % reviews.length);
  };

  const updateForm = (
    field: keyof ClientReviewInput,
    value: string | number,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      setSubmitState({
        status: "error",
        message: "Review submissions are temporarily unavailable.",
      });
      return;
    }

    // Rate limiting — prevent rapid repeated submissions
    const now = Date.now();
    if (now - lastSubmitTime.current < 15_000) {
      setSubmitState({
        status: "error",
        message: "Please wait a moment before submitting another review.",
      });
      return;
    }

    const clientName = form.client_name.trim();
    const reviewText = form.review.trim();

    if (clientName.length < 2) {
      setSubmitState({
        status: "error",
        message: "Please enter your name with at least 2 characters.",
      });
      return;
    }

    if (reviewText.length < 10) {
      setSubmitState({
        status: "error",
        message: "Please write a review with at least 10 characters.",
      });
      return;
    }

    setSubmitState({ status: "submitting", message: "" });

    try {
      await submitClientReview(form);
      lastSubmitTime.current = Date.now();
      setForm(emptyForm);
      setSubmitState({
        status: "success",
        message: "Thank you! Your review has been submitted for admin moderation.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your review could not be submitted.",
      });
    }
  };

  return (
    <section id="reviews" className="bg-[#F7F4EF] py-20 border-t border-[#E8E2D9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
            Customer Reviews
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-[#1C2B3A] mt-2 mb-3">
            What Our Clients Say
          </h2>
          <div className="w-16 h-1 bg-[#C8922A] mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg">
            Don't just take our word for it. Here's what homeowners and businesses across
            Hertfordshire, Bedfordshire, and Cambridgeshire think of DS2 Building Solutions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] items-start">
          {/* Review Slider Box */}
          <div className="rounded-xl border border-[#E8E2D9] bg-white p-7 sm:p-9 shadow-md flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Quote className="w-5 h-5 text-[#C8922A]" />
                  <span className="font-bebas text-xl text-[#1C2B3A] tracking-wider uppercase">
                    Verified Customer Feedback
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousReview}
                    disabled={!hasMultipleReviews}
                    className="inline-flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous client review"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextReview}
                    disabled={!hasMultipleReviews}
                    className="inline-flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next client review"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="min-h-[220px] rounded-lg border border-dashed border-gray-300 bg-slate-50 p-8 text-gray-500 text-center flex items-center justify-center">
                  Loading verified reviews...
                </div>
              ) : activeReview ? (
                <div className="min-h-[220px]">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <RatingStars rating={activeReview.rating} />
                    <span className="rounded bg-[#1C2B3A] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C8922A]">
                      {activeReview.service_type}
                    </span>
                  </div>

                  <blockquote className="mb-6 text-lg sm:text-xl font-normal leading-relaxed text-slate-800 italic">
                    "{activeReview.review}"
                  </blockquote>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-[#1C2B3A] text-[#C8922A] font-bebas text-lg flex items-center justify-center font-bold tracking-wider shrink-0 shadow-sm">
                      {getInitials(activeReview.client_name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#1C2B3A]">
                        {activeReview.client_name}
                      </h3>
                      {activeReview.client_role ? (
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C8922A]" />
                          {activeReview.client_role}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-h-[220px] rounded-lg border border-dashed border-gray-300 bg-slate-50 p-6 text-gray-600">
                  {reviewError || "No client reviews are published yet."}
                </div>
              )}
            </div>

            {reviews.length > 0 ? (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Review {activeIndex + 1} of {reviews.length}
                </span>
                <div className="flex flex-wrap gap-1.5" aria-label="Review slides">
                  {reviews.map((review, index) => (
                    <button
                      key={review.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === activeIndex
                          ? "w-7 bg-[#C8922A]"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Show review ${index + 1}`}
                      aria-current={index === activeIndex}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Submit Review Card */}
          <div
            id="submit-review"
            className="scroll-mt-32 rounded-xl border border-[#E8E2D9] bg-white p-7 sm:p-9 shadow-md"
          >
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8922A]">
                Share Your Experience
              </span>
              <h3 className="font-bebas text-3xl text-[#1C2B3A] mt-1 mb-1">
                Leave a Client Review
              </h3>
              <p className="text-slate-500 text-xs">
                We value your feedback. All reviews are checked by our team before publishing.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="review-client-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Name *
                </label>
                <input
                  id="review-client-name"
                  type="text"
                  value={form.client_name}
                  onChange={(event) => updateForm("client_name", event.target.value)}
                  minLength={2}
                  required
                  placeholder="e.g. David M."
                  className="w-full rounded border-2 border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#C8922A] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="review-client-role" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Town / Location *
                </label>
                <input
                  id="review-client-role"
                  type="text"
                  value={form.client_role}
                  onChange={(event) => updateForm("client_role", event.target.value)}
                  placeholder="e.g. Letchworth Garden City"
                  className="w-full rounded border-2 border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#C8922A] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="review-service-type" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Service Completed *
                </label>
                <select
                  id="review-service-type"
                  value={form.service_type}
                  onChange={(event) => updateForm("service_type", event.target.value)}
                  required
                  className="w-full rounded border-2 border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:border-[#C8922A] focus:outline-none"
                >
                  {reviewServiceTypes.map((serviceType) => (
                    <option key={serviceType} value={serviceType}>
                      {serviceType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Rating *
                </span>
                <RatingStars
                  rating={form.rating}
                  onChange={(rating) => updateForm("rating", rating)}
                />
              </div>

              <div>
                <label htmlFor="review-message" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Review *
                </label>
                <textarea
                  id="review-message"
                  value={form.review}
                  onChange={(event) => updateForm("review", event.target.value)}
                  rows={4}
                  minLength={10}
                  required
                  placeholder="Tell others about the workmanship, punctuality, and final quality..."
                  className="w-full resize-none rounded border-2 border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#C8922A] focus:outline-none"
                />
              </div>

              {submitState.message ? (
                <div
                  className={`rounded border p-3 text-xs ${
                    submitState.status === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {submitState.message}
                </div>
              ) : null}

              {!isSupabaseConfigured ? (
                <div className="rounded border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800">
                  Demo mode: Reviews are stored securely when Supabase is connected.
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitState.status === "submitting" || !isSupabaseConfigured}
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#C8922A] hover:bg-[#d8a033] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#1C2B3A] transition-colors disabled:cursor-not-allowed disabled:opacity-60 shadow-md"
              >
                <Send className="h-4 w-4" />
                {submitState.status === "submitting"
                  ? "Submitting..."
                  : "Submit My Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
