import { 
    PenTool, Music, Video, BarChart2, Brain, Laptop, 
    Code, Smartphone, Layers, Image as ImageIcon, Briefcase, 
    Gift, ShoppingCart, Activity, Zap, CreditCard, Box,
    Database, Globe, Shield, Terminal, Settings, FlaskConical,
    Search // Added Search as fallback
} from "lucide-react";

export const IconMap = {
    PenTool, Music, Video, BarChart2, Brain, Laptop, 
    Code, Smartphone, Layers, ImageIcon, Briefcase, 
    Gift, ShoppingCart, Activity, Zap, CreditCard, Box,
    Database, Globe, Shield, Terminal, Settings, FlaskConical,
    Search
};

export const getIcon = (name) => {
    return IconMap[name] || Box;
};
