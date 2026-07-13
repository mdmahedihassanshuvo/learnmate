import {
    FiArrowLeft,
    FiAward,
    FiBookOpen,
    FiCheckCircle,
    FiCompass,
    FiMail,
    FiPhone,
    FiShield,
    FiTarget,
    FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAuth } from "../../../auth/authStorage";

const Profile = () => {
    const auth = getAuth();
    const user = auth?.user ?? {};
    const displayName = user.username || "LearnMate user";
    const roleLabel = user.is_teacher ? "Teacher" : "Student";
    const initials = displayName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    const completedFields = [user.username, user.email, user.phone].filter(Boolean).length;
    const profileCompletion = Math.round((completedFields / 3) * 100);
    const learningHighlights = user.is_teacher
        ? [
            {
                icon: FiBookOpen,
                title: "Shape every lesson",
                description: "Organize course content and give learners a clear path forward.",
                accent: "bg-violet-50 text-violet-600",
            },
            {
                icon: FiTarget,
                title: "Measure progress",
                description: "Use quizzes and assignments to understand how learners are doing.",
                accent: "bg-cyan-50 text-cyan-600",
            },
            {
                icon: FiAward,
                title: "Celebrate growth",
                description: "Review results and recognize meaningful learning milestones.",
                accent: "bg-amber-50 text-amber-600",
            },
        ]
        : [
            {
                icon: FiBookOpen,
                title: "Learn at your pace",
                description: "Keep lessons, course materials, and progress in one focused place.",
                accent: "bg-violet-50 text-violet-600",
            },
            {
                icon: FiTarget,
                title: "Stay on track",
                description: "Use quizzes and assignments to turn each topic into real progress.",
                accent: "bg-cyan-50 text-cyan-600",
            },
            {
                icon: FiAward,
                title: "See your growth",
                description: "Follow your results and celebrate every completed milestone.",
                accent: "bg-amber-50 text-amber-600",
            },
        ];

    return (
        <section className="space-y-6" aria-labelledby="profile-heading">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 px-5 py-7 text-white shadow-xl shadow-violet-900/10 sm:px-8 sm:py-9">
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-500/30 blur-3xl" />

                <div className="relative">
                    <Link
                        to="/dashboard/"
                        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                        <FiArrowLeft aria-hidden="true" />
                        Back to dashboard
                    </Link>

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-violet-500 text-2xl font-extrabold shadow-lg shadow-slate-950/30 ring-4 ring-white/10 sm:h-24 sm:w-24 sm:text-3xl">
                                {initials || "LM"}
                            </div>

                            <div>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                                        {roleLabel} account
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                        Active
                                    </span>
                                </div>
                                <h1 id="profile-heading" className="text-2xl font-extrabold tracking-tight sm:text-4xl">
                                    {displayName}
                                </h1>
                                <p className="mt-1 text-sm text-slate-300 sm:text-base">
                                    Your LearnMate identity and learning account
                                </p>
                            </div>
                        </div>

                        {user.id && (
                            <p className="text-sm text-slate-400">
                                Account ID <span className="font-semibold text-slate-200">#{user.id}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
                <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                                Personal details
                            </p>
                            <h2 className="mt-2 text-xl font-bold text-slate-900">
                                Account information
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Information connected to your LearnMate account.
                            </p>
                        </div>
                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 sm:flex">
                            <FiUser className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </div>

                    <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                        <DetailItem icon={FiUser} label="Username" value={displayName} />
                        <DetailItem icon={FiMail} label="Email address" value={user.email || "Not added"} />
                        <DetailItem icon={FiPhone} label="Phone number" value={user.phone || "Not added"} />
                        <DetailItem icon={FiShield} label="Account role" value={roleLabel} />
                    </dl>
                </article>

                <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
                                Profile strength
                            </p>
                            <h2 className="mt-2 text-xl font-bold text-slate-900">
                                {profileCompletion}% complete
                            </h2>
                        </div>
                        <div
                            className="radial-progress bg-slate-100 text-violet-600"
                            style={{ "--value": profileCompletion, "--size": "4.5rem", "--thickness": "0.4rem" }}
                            role="progressbar"
                            aria-label="Profile completion"
                            aria-valuenow={profileCompletion}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            <span className="text-sm font-extrabold">{profileCompletion}%</span>
                        </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-slate-500">
                        A complete profile helps keep your learning account easy to identify and contact.
                    </p>

                    <div className="mt-5 space-y-3">
                        <CompletionRow label="Username added" complete={Boolean(user.username)} />
                        <CompletionRow label="Email added" complete={Boolean(user.email)} />
                        <CompletionRow label="Phone number added" complete={Boolean(user.phone)} />
                    </div>
                </aside>
            </div>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                            Learning workspace
                        </p>
                        <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                            Built around your progress
                        </h2>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-slate-500">
                        Your {roleLabel.toLowerCase()} profile keeps the tools that matter to your LearnMate journey connected.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {learningHighlights.map((highlight) => (
                        <HighlightCard key={highlight.title} {...highlight} />
                    ))}
                </div>
            </article>

            <div className="flex flex-col gap-4 rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 to-cyan-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
                        <FiCompass className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900">Ready to keep learning?</h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Return to your dashboard to continue where you left off.
                        </p>
                    </div>
                </div>
                <Link
                    to="/dashboard/"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                >
                    Open dashboard
                </Link>
            </div>
        </section>
    );
};

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-violet-100 hover:bg-violet-50/40">
        <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Icon className="h-4 w-4 text-violet-500" aria-hidden="true" />
            {label}
        </dt>
        <dd className="mt-2 break-words text-sm font-bold text-slate-800 sm:text-base">
            {value}
        </dd>
    </div>
);

const CompletionRow = ({ label, complete }) => (
    <div className="flex items-center gap-3 text-sm">
        <FiCheckCircle
            className={`h-5 w-5 shrink-0 ${complete ? "text-emerald-500" : "text-slate-300"}`}
            aria-hidden="true"
        />
        <span className={complete ? "font-medium text-slate-700" : "text-slate-400"}>
            {label}
        </span>
    </div>
);

const HighlightCard = ({ icon: Icon, title, description, accent }) => (
    <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
);

export default Profile;
