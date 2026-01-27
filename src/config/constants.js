export const SITE_CONFIG = {
    name: "Artlyne",
    theme: {
        primary: "#4F46E5", // Professional Indigo
        primaryHover: "#4338CA", 
        secondary: "#0EA5E9", // Sky Blue
        gradient: "bg-linear-to-r from-blue-700 to-indigo-600",
    },
    description: "The world's largest library of free and premium Lottie animations. Bring your websites and apps to life with lightweight, scalable animations.",
    trustedBy: [
        { name: "Google" },
        { name: "Nike" },
        { name: "Microsoft" },
        { name: "Duolingo" },
        { name: "Swiggy" },
        { name: "Airbnb" },
    ],
    navLinks: [
        { label: "Lottie", href: "/collections" },
        { label: "Png", href: "/png" },
        { label: "Illustration", href: "/illustration" },
        { label: "Icon", href: "/icon" },
    ],
    hero: {
        titleLine1: "Motion That",
        titleLine2: "Captivates Stories",
        titleLine3: "That Connect.",
        cta: "Get Started",
    },
    auth: {
        login: "Login",
    },
    social: [
        { platform: "Twitter", href: "#" },
        { platform: "Instagram", href: "#" },
        { platform: "Github", href: "#" },
        { platform: "Linkedin", href: "#" },
    ],
    footer: {
        copyright: `© ${new Date().getFullYear()} Artlyne. All right reserved`,
        bottomLinks: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Sitemap", href: "#" },
        ]
    }
};
