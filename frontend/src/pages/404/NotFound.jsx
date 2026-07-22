import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookOpen,
  FaHome,
  FaRobot,
} from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-2 py-12">
      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Error card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="relative mx-auto mb-7 flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10 text-4xl text-cyan-400">
              <FaBookOpen />
            </div>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Page not found
          </p>

          <h1 className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-7xl font-black text-transparent sm:text-9xl">
            404
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            The page you are looking for may have been removed, renamed, or
            moved to another location. Let&apos;s get you back to learning.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-indigo-500/40"
            >
              <FaHome />
              Back to Home
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <FaArrowLeft />
              Previous Page
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default NotFound;
