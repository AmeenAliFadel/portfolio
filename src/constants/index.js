import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    next,
    bootstrap,
    laravel,
    git,
    php,
    sql,
    firebase,
    EstateinRealEstate,
    dashboard,
    blog,
    LittleLearners,
    crud,
    focalX,
    yourbank
} from "../assets";
export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Scalable Frontend Development",
        icon: web,
    },
    {
        title: "Modern React Applications",
        icon: mobile,
    },
    {
        title: "Performance Optimization",
        icon: backend,
    },
    {
        title: "Interactive UI & 3D Integration",
        icon: creator,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Next JS",
        icon: next,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Bootstrap",
        icon: bootstrap,
    },

    {
        name: "git",
        icon: git,
    },

    {
        name: "Laravel",
        icon: laravel,
    },
    {
        name: "php",
        icon: php,
    },
    {
        name: "Sql",
        icon: sql,
    },
    {
        name: "Firebase",
        icon: firebase,
    },

];

const experiences = [
    {
        title: "Front-End Level 1",
        company_name: "Focal X",
        icon: focalX,
        iconBg: "#383E56",
        date: "August 2024 - January 2025",
        points: [
            "Built responsive web interfaces using HTML, CSS, JavaScript, and Bootstrap.",
            "Managed version control workflows using Git and GitHub.",
            "Applied fundamental UI/UX principles and cross-browser compatibility practices.",
            "Gained an introduction to React and component-based architecture.",
        ],
    },
    {
        title: "Front-End Level 2 (React)",
        company_name: "Focal X",
        icon: focalX,
        iconBg: "#E6DEDD",
        date: "April 2025 - September 2025",
        points: [
            "Developed dynamic web applications using React, Hooks, and modern component patterns.",
            "Implemented CRUD operations and integrated RESTful APIs.",
            "Managed global state using Redux and Redux Toolkit.",
            "Worked with Firebase services and gained an introduction to Next.js fundamentals.",
        ],
    },
    {
        title: "Back-End Level 1 (Laravel)",
        company_name: "Focal X",
        icon: focalX,
        iconBg: "#383E56",
        date: "August 2025 - January 2026",
        points: [
            "Built server-side applications using PHP and Laravel framework.",
            "Designed and managed relational databases using MySQL.",
            "Applied object-oriented programming (OOP) principles in backend development.",
            "Implemented basic authentication systems and RESTful backend structures.",
        ],
    },
];


const projects = [
    {
        name: "Estatein Real Estate",
        description:
            "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "firebase",
                color: "green-text-gradient",
            },
            {
                name: "tailwind",
                color: "pink-text-gradient",
            },
        ],
        image: EstateinRealEstate,
        source_code_link: "https://github.com/Elin23/Estatein-GraduationProject",
        demo: "http://estatein-team-x1.netlify.app/",

    },
    {
        name: "Estatein-AdminDashboard",
        description:
            "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "redux",
                color: "green-text-gradient",
            },
            {
                name: "firebase",
                color: "pink-text-gradient",
            },
        ],
        image: dashboard,
        source_code_link: "https://github.com/Elin23/Estatein-AdminDashboard",
        demo: "http://estatein-admindashboard.netlify.app/",

    },
    {
        name: "The Blog",
        description:
            "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "redux",
                color: "green-text-gradient",
            },
            {
                name: "tailwind",
                color: "pink-text-gradient",
            },
        ],
        image: blog,
        source_code_link: "https://github.com/AmeenAliFadel/Task6-adv",
        demo: "https://ameenalifadel.github.io/Task6-adv/",
    },
    {
        name: "Little Learners",
        description:
            "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "css",
                color: "pink-text-gradient",
            },
        ],
        image: LittleLearners,
        source_code_link: "https://github.com/AmeenAliFadel/Little-Learners",
        demo: "https://ameenalifadel.github.io/Little-Learners/",
    },
    {
        name: "YourBank",
        description:
            "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "css",
                color: "pink-text-gradient",
            },
        ],
        image: yourbank,
        source_code_link: "https://github.com/Elin23/YourBank",
        demo: "https://elin23.github.io/YourBank/",
    },
    {
        name: "CRUD System",
        description:
            "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
        tags: [
            {
                name: "js",
                color: "blue-text-gradient",
            },
            {
                name: "css",
                color: "pink-text-gradient",
            },
        ],
        image: crud,
        source_code_link: "https://github.com/AmeenAliFadel/crud-system",
        demo: "https://ameenalifadel.github.io/crud-system/",
    },
];

export { services, technologies, experiences, projects };