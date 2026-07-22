const StudentMenuItems = () => {
    return [
    {
        name: "Dashboard",
        path: "/dashboard/",
        end: true,
        icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3.75 3v7.5h7.5V3h-7.5zm9 0v4.5h7.5V3h-7.5zm0 6v12h7.5v-12h-7.5zm-9 3v9h7.5v-9h-7.5z"
                    />
                </svg>
            ),
        },
        {
            name: "My Courses",
            path: "/courses/",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 6.75L3.75 3v13.5L12 20.25m0-13.5L20.25 3v13.5L12 20.25m0-13.5v13.5"
                    />
                </svg>
            ),
        },
        {
            name: "Quizzes",
            path: "/student-dashboard/quizzes",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M9 5.25h6M9 9h6m-6 3.75h3.75M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25z"
                    />
                </svg>
            ),
        },
        {
            name: "Assignments",
            path: "/student-dashboard/assignments",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M9 12.75l2.25 2.25L15 10.5M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25z"
                    />
                </svg>
            ),
        },
        {
            name: "Results",
            path: "/student-dashboard/results",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M4.5 19.5v-6m5 6V9m5 10.5V4.5m5 15v-9"
                    />
                </svg>
            ),
        },
    ];
};

export default StudentMenuItems;
