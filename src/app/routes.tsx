import { createHashRouter, useRouteError } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { ReviewAdmin } from "./components/ReviewAdmin";

function RootErrorBoundary() {
  const error = useRouteError();
  console.error("Route error caught by RootErrorBoundary:", error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-bebas tracking-wide">
          Page Notice
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          We encountered an issue while loading this section. Click below to return to the homepage.
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.hash = "#/";
            window.location.reload();
          }}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-sm shadow-md"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
      { path: "admin/reviews", Component: ReviewAdmin },
      { path: "*", Component: Home },
    ],
  },
]);
