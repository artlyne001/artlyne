export const SITE_CONFIG = {
    name: "Animetrix",
    theme: {
        primary: "#000000", // Vibrant Indigo
        primaryHover: "#6246ea", // Deeper Indigo
        secondary: "#FF8E91", // Soft Coral/Pink
        gradient: "bg-linear-to-r from-brand-pink to-brand-secondary",
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
        copyright: `© ${new Date().getFullYear()} Animetrix. All right reserved`,
        bottomLinks: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Sitemap", href: "#" },
        ]
    }
};
