import {
  FaArrowRight,
  FaBookOpen,
  FaBrain,
  FaCertificate,
  FaCheckCircle,
  FaChalkboardTeacher,
  FaComments,
  FaGraduationCap,
  FaLayerGroup,
  FaPlayCircle,
  FaRobot,
  FaSearch,
  FaTasks,
  FaUserGraduate,
  FaUsersCog,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/20">
              <FaGraduationCap className="text-2xl text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold">LearnMate AI</h1>
              <p className="text-xs text-slate-400">AI Learning Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NavLink to="/dashboard" className="btn btn-ghost hidden text-slate-300 hover:bg-white/10 md:flex">
              Dashboard
            </NavLink>
            <NavLink to="/login/" className="btn btn-ghost hidden text-slate-300 hover:bg-white/10 md:flex">
              Login
            </NavLink>

            <button className="btn border-none bg-gradient-to-r from-cyan-400 to-indigo-500 text-white hover:from-cyan-500 hover:to-indigo-600">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="badge badge-lg bg-white/10 border-white/10 text-cyan-300 mb-6">
                <FaRobot />
                AI-powered general education
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Learn smarter with your own{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400">
                  AI study partner
                </span>
              </h1>

              <p className="text-lg text-slate-300 mt-6 max-w-xl leading-relaxed">
                LearnMate AI helps students learn Mathematics, Science, English,
                History, and more with video lessons, quizzes, assignments,
                progress tracking, certificates, and an AI tutor for every
                course.
              </p>

              {/* Search Box */}
              <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3 max-w-xl">
                <div className="join w-full">
                  <div className="join-item flex items-center px-4 bg-white text-slate-500">
                    <FaSearch />
                  </div>

                  <input
                    type="text"
                    placeholder="Search Mathematics, Science, English, History..."
                    className="input join-item w-full bg-white text-slate-800 focus:outline-none"
                  />

                  <button className="btn join-item border-none bg-cyan-500 text-white hover:bg-cyan-600">
                    Search
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="btn btn-lg border-none bg-gradient-to-r from-cyan-400 to-indigo-500 text-white hover:from-cyan-500 hover:to-indigo-600">
                  Explore Courses
                  <FaArrowRight />
                </button>

                <button className="btn btn-lg bg-white/10 border-white/10 text-white hover:bg-white/20">
                  <FaPlayCircle />
                  Watch Demo
                </button>

                <button className="btn btn-lg bg-white/10 border-white/10 text-white hover:bg-white/20">
                  <FaBrain />
                  AI Tutor
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
                <MiniStat value="120+" label="Courses" />
                <MiniStat value="5K+" label="Students" />
                <MiniStat value="24/7" label="AI Tutor" />
              </div>
            </div>

            {/* Right Dashboard Preview */}
            <div className="relative">
              <div className="card bg-white text-slate-900 shadow-2xl rounded-[2rem] overflow-hidden border border-white/10">
                {/* Course Header */}
                <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 p-6 text-white relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"></div>

                  <div className="absolute right-10 bottom-4 h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <FaBookOpen className="text-3xl text-white/80" />
                  </div>

                  <p className="text-white/75 text-sm">Current Course</p>

                  <h2 className="text-2xl lg:text-3xl font-extrabold mt-1">
                    Mathematics for Class 10
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="badge bg-white/20 border-white/20 text-white">
                      18 Lessons
                    </span>
                    <span className="badge bg-white/20 border-white/20 text-white">
                      Class 10
                    </span>
                    <span className="badge bg-white/20 border-white/20 text-white">
                      AI Tutor
                    </span>
                  </div>
                </div>

                <div className="card-body p-5 lg:p-6">
                  {/* Progress */}
                  <div className="flex items-center gap-5 rounded-3xl bg-slate-50 p-5 border border-slate-100">
                    <div
                      className="radial-progress text-cyan-500 bg-white shadow-sm"
                      style={{
                        "--value": 72,
                        "--size": "5rem",
                        "--thickness": "8px",
                      }}
                      role="progressbar"
                    >
                      <span className="text-sm font-bold text-slate-900">
                        72%
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-xl">
                        Course Progress
                      </h3>

                      <p className="text-slate-500 text-sm mt-1">
                        12 of 18 lessons completed
                      </p>

                      <progress
                        className="progress progress-info w-48 mt-3"
                        value="72"
                        max="100"
                      ></progress>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="space-y-3 mt-5">
                    <LessonRow
                      icon={<FaCheckCircle />}
                      title="Algebra: Linear Equations"
                      status="Completed"
                      statusClass="badge-success"
                      iconClass="text-emerald-500"
                    />

                    <LessonRow
                      icon={<FaPlayCircle />}
                      title="Geometry: Triangles and Angles"
                      status="Continue"
                      statusClass="badge-info"
                      iconClass="text-cyan-500"
                    />

                    <LessonRow
                      icon={<FaTasks />}
                      title="Chapter Quiz: Algebra and Geometry"
                      status="Pending"
                      statusClass="badge-warning"
                      iconClass="text-amber-500"
                    />
                  </div>

                  <button className="btn border-none bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-600 hover:to-indigo-700 mt-4">
                    Continue Learning
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              {/* Certificate Card */}
              <div className="hidden md:flex absolute -top-7 -right-7 bg-white text-slate-900 rounded-3xl shadow-2xl p-4 items-center gap-3 border border-slate-100 z-30">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <FaCertificate className="text-2xl" />
                </div>

                <div>
                  <p className="font-extrabold">Certificate</p>
                  <p className="text-xs text-slate-500">
                    Unlock after completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-slate-900 py-16 lg:py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-cyan-600 font-semibold">Platform Features</p>

            <h2 className="text-3xl lg:text-5xl font-extrabold mt-3">
              Everything for smart online learning
            </h2>

            <p className="text-slate-500 mt-4">
              A complete learning system for students, teachers, and admins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FaLayerGroup />}
              title="Subject-Based Courses"
              text="Learn Mathematics, Science, English, History, and more."
              color="bg-cyan-50 text-cyan-600"
            />

            <FeatureCard
              icon={<FaRobot />}
              title="AI Study Tutor"
              text="Ask questions and get simple explanations anytime."
              color="bg-indigo-50 text-indigo-600"
            />

            <FeatureCard
              icon={<FaTasks />}
              title="Quizzes & Assignments"
              text="Practice lessons with quizzes, homework, and feedback."
              color="bg-emerald-50 text-emerald-600"
            />

            <FeatureCard
              icon={<FaCertificate />}
              title="Certificates"
              text="Earn certificates after completing selected courses."
              color="bg-violet-50 text-violet-600"
            />
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="bg-slate-100 text-slate-900 py-16 lg:py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-indigo-600 font-semibold">User Dashboards</p>

            <h2 className="text-3xl lg:text-5xl font-extrabold mt-3">
              Built for students, teachers, and admins
            </h2>

            <p className="text-slate-500 mt-4">
              Each user gets a focused dashboard with the right tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RoleCard
              icon={<FaUserGraduate />}
              title="Student Dashboard"
              items={[
                "Enroll in courses",
                "Watch video lessons",
                "Take quizzes",
                "Submit assignments",
                "Download certificates",
              ]}
            />

            <RoleCard
              icon={<FaChalkboardTeacher />}
              title="Teacher Dashboard"
              items={[
                "Create courses",
                "Upload lessons",
                "Create assignments",
                "Generate quizzes with AI",
                "Review student submissions",
              ]}
            />

            <RoleCard
              icon={<FaUsersCog />}
              title="Admin Dashboard"
              items={[
                "Manage students and teachers",
                "Approve courses",
                "Manage subscriptions",
                "Track payments",
                "Monitor platform activity",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-white text-slate-900 py-16 lg:py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-indigo-600 font-semibold">How it works</p>

              <h2 className="text-3xl lg:text-5xl font-extrabold mt-3">
                Simple learning workflow
              </h2>
            </div>

            <p className="text-slate-500 max-w-xl">
              From account creation to course completion, LearnMate AI gives a
              smooth step-by-step learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <StepCard number="01" title="Register" />
            <StepCard number="02" title="Choose Course" />
            <StepCard number="03" title="Start Lesson" />
            <StepCard number="04" title="Ask AI Tutor" />
            <StepCard number="05" title="Take Quiz" />
            <StepCard number="06" title="Submit Task" />
            <StepCard number="07" title="Certificate" />
          </div>
        </div>
      </section>

      {/* Discussion Section */}
      <section className="bg-slate-100 text-slate-900 py-16 lg:py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-cyan-600 font-semibold">Discussion & Comments</p>

            <h2 className="text-3xl lg:text-5xl font-extrabold mt-3">
              Learn together with classmates
            </h2>

            <p className="text-slate-500 mt-5 leading-relaxed">
              Students can ask questions under lessons, discuss topics with
              classmates, and get support from teachers. This makes learning
              more interactive and helpful.
            </p>

            <button className="btn border-none bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-600 hover:to-indigo-700 mt-7">
              Join Discussion
              <FaArrowRight />
            </button>
          </div>

          <div className="card bg-white shadow-xl rounded-3xl border border-slate-200">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-2xl">
                  <FaComments />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Lesson Discussion</h3>
                  <p className="text-sm text-slate-500">
                    Mathematics: Triangles and Angles
                  </p>
                </div>
              </div>

              <div className="chat chat-start">
                <div className="chat-header text-slate-500">Student</div>
                <div className="chat-bubble bg-slate-100 text-slate-700">
                  Why do the angles of a triangle always add up to 180°?
                </div>
              </div>

              <div className="chat chat-end">
                <div className="chat-header text-slate-500">Teacher</div>
                <div className="chat-bubble bg-indigo-600 text-white">
                  Great question! Think about drawing a straight line through
                  one corner of the triangle...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-950 px-4 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="card bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-[2rem] shadow-2xl">
            <div className="card-body p-8 lg:p-12 flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-extrabold">
                  Ready to start learning smarter?
                </h2>

                <p className="text-white/80 mt-3 max-w-2xl">
                  Join LearnMate AI and experience AI-powered online education
                  with courses, quizzes, assignments, discussions, and
                  certificates.
                </p>
              </div>

              <button className="btn btn-lg bg-white text-indigo-700 border-none hover:bg-slate-100">
                Join Now
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center bg-slate-950 text-slate-400 p-8 border-t border-white/10">
        <aside>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center">
              <FaGraduationCap className="text-xl text-white" />
            </div>

            <p className="text-white font-bold text-lg">LearnMate AI</p>
          </div>

          <p>© 2026 LearnMate AI. Smart AI Learning Platform.</p>
        </aside>
      </footer>
    </div>
  );
};

/* Components */

const MiniStat = ({ value, label }) => {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
      <h3 className="text-2xl font-bold text-cyan-300">{value}</h3>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
};

const LessonRow = ({ icon, title, status, statusClass, iconClass }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100 hover:bg-slate-100 duration-300">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`text-lg shrink-0 ${iconClass}`}>{icon}</div>
        <p className="font-semibold text-slate-800 truncate">{title}</p>
      </div>

      <span className={`badge badge-outline shrink-0 ${statusClass}`}>
        {status}
      </span>
    </div>
  );
};

const FeatureCard = ({ icon, title, text, color }) => {
  return (
    <div className="card bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 rounded-3xl">
      <div className="card-body">
        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center text-3xl ${color}`}
        >
          {icon}
        </div>

        <h3 className="card-title mt-4">{title}</h3>

        <p className="text-slate-500">{text}</p>
      </div>
    </div>
  );
};

const RoleCard = ({ icon, title, items }) => {
  return (
    <div className="card bg-white shadow-xl border border-slate-200 rounded-3xl hover:-translate-y-1 duration-300">
      <div className="card-body">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white flex items-center justify-center text-3xl mb-4">
          {icon}
        </div>

        <h3 className="card-title text-2xl">{title}</h3>

        <div className="space-y-3 mt-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-slate-600">
              <FaCheckCircle className="text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ number, title }) => {
  return (
    <div className="card bg-slate-100 border border-slate-200 hover:bg-slate-950 hover:text-white duration-300 rounded-2xl">
      <div className="card-body p-5">
        <p className="text-cyan-500 font-bold">{number}</p>
        <h3 className="font-bold">{title}</h3>
      </div>
    </div>
  );
};

export default Home;
