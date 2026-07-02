"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  Activity,
  CheckCircle,
  Database,
  Languages,
  Sun,
  Moon,
  Search,
  Bell,
  User,
  Clock,
  FileText,
  Globe,
  MapPinned,
  NotebookPen,
  PlusCircle,
  Eye
} from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { BlogRichEditor } from "@/components/blog-rich-editor";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.5 9.93v-7.03h-2.5v-2.9h2.5V9.6c0-2.46 1.48-3.82 3.75-3.82 1.08 0 2.22.2 2.22.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32v7.03A10 10 0 0 0 22 12Z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.62 1.5h-8.24A4.26 4.26 0 0 0 3.85 7.75v8.24a4.26 4.26 0 0 0 4.26 4.26h8.24a4.26 4.26 0 0 0 4.26-4.26V7.75a4.26 4.26 0 0 0-4.26-4.26Zm-4.31 3.4a5.35 5.35 0 1 1 0 10.7 5.35 5.35 0 0 1 0-10.7Zm0 1.5a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm5.55-.85a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M21.8 7.3a3.03 3.03 0 0 0-2.13-2.13C17.81 4.8 12 4.8 12 4.8s-5.81 0-7.67.37A3.03 3.03 0 0 0 2.2 7.3 31.75 31.75 0 0 0 2 12a31.75 31.75 0 0 0 .2 4.7 3.03 3.03 0 0 0 2.13 2.13c1.86.37 7.67.37 7.67.37s5.81 0 7.67-.37A3.03 3.03 0 0 0 21.8 16.7 31.75 31.75 0 0 0 22 12a31.75 31.75 0 0 0-.2-4.7Zm-11 9.65V7.05l6.25 4.45-6.25 4.45Z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 0 0 2.5 6v12a2.5 2.5 0 0 0 2.48 2.5h14.04A2.5 2.5 0 0 0 21.5 18V6a2.5 2.5 0 0 0-2.48-2.5H4.98Zm1.02 5.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm.25 10.75H6V10.75h2.25V20Zm5.75 0h-2.25V10.75h2.25V12c.6-.95 1.65-1.4 2.75-1.4 2.95 0 3.5 1.95 3.5 4.5V20h-2.25v-4.2c0-1 .05-2.3-1.4-2.3-1.4 0-1.6 1.05-1.6 2.2V20Z" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M22.46 6c-.77.34-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.57 8.57 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9 12.14 12.14 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.33 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.28 4.28 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.58 8.58 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.68 8.68 0 0 0 22.46 6Z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.92 11.92 0 0 0 2.02 6.57L0 24l5.56-1.47A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.16-3.48-8.52Zm-8.52 17.05c-1.84 0-3.66-.5-5.2-1.45l-.37-.22-3.3.87.88-3.22-.24-.38A9.6 9.6 0 0 1 2.4 12C2.4 6.52 6.52 2.4 12 2.4c3.2 0 6.2 1.25 8.43 3.48A11.84 11.84 0 0 1 22.8 12c0 6.63-5.37 12-12 12Zm6.36-7.46c-.35-.18-2.06-1.01-2.38-1.12-.32-.12-.56-.18-.8.18-.24.35-.9 1.12-1.11 1.36-.2.24-.41.27-.76.09-.35-.18-1.48-.55-2.82-1.74-1.04-.93-1.74-2.08-1.95-2.43-.2-.35-.02-.54.16-.72.16-.16.35-.41.53-.62.18-.22.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.8-1.95-1.1-2.68-.29-.7-.59-.61-.8-.62-.21-.01-.45-.01-.68-.01-.24 0-.63.09-.96.45-.33.36-1.25 1.22-1.25 2.98s1.28 3.46 1.46 3.7c.18.24 2.55 3.9 6.18 5.47.86.37 1.53.59 2.05.75.86.27 1.64.23 2.26.14.69-.11 2.06-.84 2.35-1.65.29-.8.29-1.49.2-1.64-.09-.16-.33-.24-.69-.42Z" />
  </svg>
);

const COUNTRY_COORDS = {
  egypt: [29.95, 31.22],
  saudi: [45.08, 23.89],
  arabia: [45.08, 23.89],
  uae: [54.37, 24.45],
  kuwait: [47.48, 29.31],
  qatar: [51.53, 25.28],
  jordan: [36.24, 30.59],
  morocco: [-7.09, 31.79],
  tunisia: [9.56, 33.89],
  algeria: [2.63, 28.03],
  sudan: [30.21, 15.5],
  nigeria: [8.68, 9.08],
  ghana: [-1.02, 7.95],
  uk: [-3.44, 55.38],
  germany: [10.45, 51.17],
  france: [2.35, 48.86],
  spain: [-3.75, 40.46],
  italy: [12.57, 41.87],
  usa: [-98.58, 39.83],
  canada: [-106.35, 56.13],
  india: [78.96, 20.59],
  pakistan: [69.35, 30.37],
  turkey: [35.24, 39.02],
  unknown: [0, 20],
};

export default function AdminPage({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  const isRTL = lang === "ar";
  
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [visitorAnalytics, setVisitorAnalytics] = useState(null);
  const [visitorLoading, setVisitorLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogMessage, setBlogMessage] = useState("");
  const [blogForm, setBlogForm] = useState({
    titleEn: "",
    titleAr: "",
    slug: "",
    excerptEn: "",
    excerptAr: "",
    contentEn: "",
    contentAr: "",
    published: true,
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    twitter: "",
    whatsapp: "",
  });
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialMessage, setSocialMessage] = useState("");
  const [socialForm, setSocialForm] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    twitter: "",
    whatsapp: "",
  });
  const [legalPages, setLegalPages] = useState([]);
  const [legalLoading, setLegalLoading] = useState(false);
  const [legalSaving, setLegalSaving] = useState(false);
  const [legalMessage, setLegalMessage] = useState("");
  const [legalForm, setLegalForm] = useState({
    id: null,
    slug: "",
    titleEn: "",
    titleAr: "",
    subtitleEn: "",
    subtitleAr: "",
    contentEn: "",
    contentAr: "",
    published: true,
  });

  // Check login on load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("admin_logged_in");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadVisitorAnalytics = async () => {
      setVisitorLoading(true);
      try {
        const res = await fetch("/api/admin/visitors");
        const data = await res.json();
        if (data.summary) {
          setVisitorAnalytics(data);
        }
      } catch (error) {
        console.error("Failed to load visitor analytics", error);
      } finally {
        setVisitorLoading(false);
      }
    };

    loadVisitorAnalytics();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn || activeTab !== "blog") return;

    const loadBlogPosts = async () => {
      setBlogLoading(true);
      try {
        const res = await fetch("/api/blog/posts?mode=admin");
        const data = await res.json();
        setBlogPosts(data.posts || []);
      } catch (error) {
        console.error("Failed to load blog posts", error);
      } finally {
        setBlogLoading(false);
      }
    };

    loadBlogPosts();
  }, [isLoggedIn, activeTab]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadSocialLinks = async () => {
      setSocialLoading(true);
      try {
        const res = await fetch("/api/admin/social-links");
        const data = await res.json();
        if (data.socialLinks) {
          setSocialLinks(data.socialLinks);
          setSocialForm(data.socialLinks);
        }
      } catch (error) {
        console.error("Failed to load social links", error);
      } finally {
        setSocialLoading(false);
      }
    };

    loadSocialLinks();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn || activeTab !== "legal") return;

    const loadLegalPages = async () => {
      setLegalLoading(true);
      try {
        const res = await fetch("/api/admin/legal-pages");
        const data = await res.json();
        setLegalPages(data.pages || []);
      } catch (error) {
        console.error("Failed to load legal pages", error);
      } finally {
        setLegalLoading(false);
      }
    };

    loadLegalPages();
  }, [isLoggedIn, activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@sigma.com" && password === "admin123") {
      localStorage.setItem("admin_logged_in", "true");
      setIsLoggedIn(true);
      toast.success(isRTL ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
      setError("");
    } else {
      toast.error(isRTL ? "فشل تسجيل الدخول!" : "Login failed!");
      setError(
        isRTL
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
          : "Invalid email or password"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
  };

  const resetBlogForm = () => {
    setBlogForm({
      titleEn: "",
      titleAr: "",
      slug: "",
      excerptEn: "",
      excerptAr: "",
      contentEn: "",
      contentAr: "",
      published: true,
    });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogSaving(true);
    setBlogMessage("");

    try {
      const res = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save post");
      }

      setBlogMessage(isRTL ? "تم حفظ التدوينة بنجاح." : "Blog post saved successfully.");
      resetBlogForm();
      const refreshed = await fetch("/api/blog/posts?mode=admin");
      const refreshedData = await refreshed.json();
      setBlogPosts(refreshedData.posts || []);
    } catch (error) {
      setBlogMessage(error.message || "Unable to save post");
    } finally {
      setBlogSaving(false);
    }
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    setSocialSaving(true);
    setSocialMessage("");

    try {
      const res = await fetch("/api/admin/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(socialForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save social links");
      }

      setSocialLinks(data.socialLinks || socialForm);
      setSocialMessage(isRTL ? "تم حفظ روابط التواصل الاجتماعي بنجاح." : "Social links saved successfully.");
    } catch (error) {
      setSocialMessage(error.message || "Unable to save social links");
    } finally {
      setSocialSaving(false);
    }
  };

  const handleLegalSubmit = async (e) => {
    e.preventDefault();
    setLegalSaving(true);
    setLegalMessage("");

    try {
      const res = await fetch("/api/admin/legal-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(legalForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save legal page");
      }

      setLegalMessage(isRTL ? "تم حفظ الصفحة القانونية بنجاح." : "Legal page saved successfully.");
      setLegalForm({
        id: null,
        slug: "",
        titleEn: "",
        titleAr: "",
        subtitleEn: "",
        subtitleAr: "",
        contentEn: "",
        contentAr: "",
        published: true,
      });
      const refreshed = await fetch("/api/admin/legal-pages");
      const refreshedData = await refreshed.json();
      setLegalPages(refreshedData.pages || []);
    } catch (error) {
      setLegalMessage(error.message || "Unable to save legal page");
    } finally {
      setLegalSaving(false);
    }
  };

  const handleLegalEdit = (page) => {
    setLegalForm({
      id: page.id,
      slug: page.slug,
      titleEn: page.title_en || "",
      titleAr: page.title_ar || "",
      subtitleEn: page.subtitle_en || "",
      subtitleAr: page.subtitle_ar || "",
      contentEn: page.content_en || "",
      contentAr: page.content_ar || "",
      published: page.published,
    });
    setLegalMessage("");
  };

  const handleLegalDelete = async (pageId) => {
    setLegalSaving(true);
    setLegalMessage("");

    try {
      const res = await fetch("/api/admin/legal-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delete: true, id: pageId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete legal page");
      }

      setLegalMessage(isRTL ? "تم حذف الصفحة القانونية بنجاح." : "Legal page deleted successfully.");
      const refreshed = await fetch("/api/admin/legal-pages");
      const refreshedData = await refreshed.json();
      setLegalPages(refreshedData.pages || []);
    } catch (error) {
      setLegalMessage(error.message || "Unable to delete legal page");
    } finally {
      setLegalSaving(false);
    }
  };

  const toggleLanguage = () => {
    const newLocale = lang === "ar" ? "en" : "ar";
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  // Translations
  const t = {
    ar: {
      loginTitle: "تسجيل دخول المسؤول",
      loginDesc: "أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم.",
      emailLabel: "البريد الإلكتروني",
      passLabel: "كلمة المرور",
      loginBtn: "تسجيل الدخول",
      hint: "بيانات الدخول التجريبية: admin@sigma.com / admin123",
      sidebarTitle: "لوحة تحكم سيجما",
      overview: "نظرة عامة",
      blog: "المدونة",
      legal: "القانون",
      social: "السوشيال",
      legal: "القانون",
      legalTitle: "صفحات القانون",
      legalDesc: "إدارة صفحات القانون الخاصة بالموقع، حرر العناوين والعناوين الفرعية والمحتوى بالعربية والإنجليزية.",
      legalSlug: "رابط الصفحة",
      legalTitleEn: "العنوان بالإنجليزية",
      legalTitleAr: "العنوان بالعربية",
      legalSubtitleEn: "العنوان الفرعي بالإنجليزية",
      legalSubtitleAr: "العنوان الفرعي بالعربية",
      legalContentEn: "المحتوى بالإنجليزية",
      legalContentAr: "المحتوى بالعربية",
      legalPublished: "منشورة",
      legalSave: "حفظ الصفحة",
      legalEdit: "تعديل",
      legalDelete: "حذف",
      legalList: "الصفحات القانونية الحالية",
      legalEmpty: "لا توجد صفحات قانونية بعد.",
      services: "الخدمات",
      users: "المستخدمين",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      welcome: "مرحباً، مدير النظام",
      socialTitle: "روابط التواصل الاجتماعي",
      socialDesc: "حرّر روابط فيسبوك، انستجرام، يوتيوب، لينكدإن، تويتر، وواتساب للموقع كامل.",
      facebookLabel: "رابط فيسبوك",
      instagramLabel: "رابط انستجرام",
      youtubeLabel: "رابط يوتيوب",
      linkedinLabel: "رابط لينكدإن",
      twitterLabel: "رابط تويتر",
      whatsappLabel: "رابط واتساب",
      socialSave: "حفظ الروابط",
      socialSaved: "تم حفظ روابط التواصل الاجتماعي بنجاح.",
      socialPreview: "معاينة الروابط",
      statusTitle: "حالة النظام",
      uptime: "وقت العمل",
      uptimeVal: "99.98% نشط",
      requests: "الطلبات الحالية",
      activeUsers: "المستخدمين النشطين",
      serviceName: "اسم الخدمة",
      status: "الحالة",
      updated: "آخر تحديث",
      actions: "الإجراءات",
      active: "نشط",
      maintenance: "صيانة",
      stopped: "متوقف",
      dbStatus: "قاعدة البيانات",
      dbVal: "متصلة (0.8ms استجابة)"
    },
    en: {
      loginTitle: "Admin Login",
      loginDesc: "Enter your credentials to access the admin dashboard.",
      emailLabel: "Email Address",
      passLabel: "Password",
      loginBtn: "Sign In",
      hint: "Demo Creds: admin@sigma.com / admin123",
      sidebarTitle: "Sigma Dashboard",
      overview: "Overview",
      blog: "Blog",
      legal: "Legal",
      social: "Social",
      legal: "Legal",
      legalTitle: "Legal Pages",
      legalDesc: "Manage website legal pages, edit titles, subtitles and content in both languages.",
      legalSlug: "Page Slug",
      legalTitleEn: "English Title",
      legalTitleAr: "Arabic Title",
      legalSubtitleEn: "English Subtitle",
      legalSubtitleAr: "Arabic Subtitle",
      legalContentEn: "English Content",
      legalContentAr: "Arabic Content",
      legalPublished: "Published",
      legalSave: "Save Page",
      legalEdit: "Edit",
      legalDelete: "Delete",
      legalList: "Existing Legal Pages",
      legalEmpty: "No legal pages found yet.",
      services: "Services",
      users: "Users",
      settings: "Settings",
      logout: "Log Out",
      welcome: "Welcome back, Admin",
      socialTitle: "Social Media Links",
      socialDesc: "Edit Facebook, Instagram, YouTube, LinkedIn, Twitter and WhatsApp links for the whole website.",
      facebookLabel: "Facebook URL",
      instagramLabel: "Instagram URL",
      youtubeLabel: "YouTube URL",
      linkedinLabel: "LinkedIn URL",
      twitterLabel: "Twitter URL",
      whatsappLabel: "WhatsApp URL",
      socialSave: "Save Links",
      socialSaved: "Social links saved successfully.",
      socialPreview: "Preview Links",
      statusTitle: "System Status",
      uptime: "Uptime",
      uptimeVal: "99.98% Active",
      requests: "Current Requests",
      activeUsers: "Active Users",
      serviceName: "Service Name",
      status: "Status",
      updated: "Last Updated",
      actions: "Actions",
      active: "Active",
      maintenance: "Maintenance",
      stopped: "Stopped",
      dbStatus: "Database",
      dbVal: "Connected (0.8ms lag)"
    }
  }[lang] || {
    loginTitle: "Admin Login",
    loginDesc: "Enter your credentials to access the admin dashboard.",
    emailLabel: "Email Address",
    passLabel: "Password",
    loginBtn: "Sign In",
    hint: "Demo Creds: admin@sigma.com / admin123",
    sidebarTitle: "Sigma Dashboard",
    overview: "Overview",
    blog: "Blog",
    social: "Social",
    services: "Services",
    users: "Users",
    settings: "Settings",
    logout: "Log Out",
    welcome: "Welcome back, Admin",
    socialTitle: "Social Media Links",
    socialDesc: "Edit Facebook, Instagram, YouTube, LinkedIn, Twitter and WhatsApp links for the whole website.",
    facebookLabel: "Facebook URL",
    instagramLabel: "Instagram URL",
    youtubeLabel: "YouTube URL",
    linkedinLabel: "LinkedIn URL",
    twitterLabel: "Twitter URL",
    whatsappLabel: "WhatsApp URL",
    socialSave: "Save Links",
    socialSaved: "Social links saved successfully.",
    socialPreview: "Preview Links",
    statusTitle: "System Status",
    uptime: "Uptime",
    uptimeVal: "99.98% Active",
    requests: "Current Requests",
    activeUsers: "Active Users",
    serviceName: "Service Name",
    status: "Status",
    updated: "Last Updated",
    actions: "Actions",
    active: "Active",
    maintenance: "Maintenance",
    stopped: "Stopped",
    dbStatus: "Database",
    dbVal: "Connected (0.8ms lag)"
  };

  const visitorMarkers = (visitorAnalytics?.countries || []).map((country, index) => {
    const key = country.name?.toLowerCase();
    const coords = COUNTRY_COORDS[key] || COUNTRY_COORDS[country.name?.toLowerCase?.().replace(/\s+/g, "")];

    return {
      name: country.name,
      value: country.value,
      coordinates: coords || COUNTRY_COORDS.unknown,
      color: ["#0f766e", "#2563eb", "#7c3aed", "#dc2626", "#ea580c", "#ca8a04"][index % 6],
    };
  });

  const servicesData = [
    { id: 1, name: lang === "ar" ? "بوابة الدفع الإلكتروني" : "Payment Gateway", status: t.active, color: "text-green-500", updated: "2 mins ago" },
    { id: 2, name: lang === "ar" ? "محرك البحث والفلترة" : "Search Engine & Filter", status: t.active, color: "text-green-500", updated: "10 mins ago" },
    { id: 3, name: lang === "ar" ? "نظام تتبع الشحنات" : "Shipment Tracking System", status: t.maintenance, color: "text-yellow-500", updated: "1 hour ago" },
    { id: 4, name: lang === "ar" ? "إرسال الإشعارات البريدية" : "Email Notification API", status: t.stopped, color: "text-red-500", updated: "Yesterday" }
  ];

  const usersData = [
    { id: 1, name: "Ahmed Mansour", email: "ahmed@example.com", role: "Developer", date: "2026-06-28" },
    { id: 2, name: "Sarah Smith", email: "sarah.s@example.com", role: "Manager", date: "2026-06-25" },
    { id: 3, name: "Omar Farooq", email: "omar@example.com", role: "Editor", date: "2026-06-15" }
  ];
  const getStatusBadge = (status) => {
    const isAr = lang === "ar";
    const activeLabel = isAr ? "نشط" : "Active";
    const maintenanceLabel = isAr ? "صيانة" : "Maintenance";

    if (status === activeLabel) {
      return (
        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500 border border-green-500/20">
          <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
          {status}
        </span>
      );
    }
    if (status === maintenanceLabel) {
      return (
        <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500 border border-yellow-500/20">
          <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-500 border border-red-500/20">
        <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>
        {status}
      </span>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#002244]/10 via-background to-primary/10 px-4">
        <div className="absolute top-4 end-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleLanguage} className="cursor-pointer border-primary/20 text-primary hover:bg-primary/5 rounded-xl">
            <Languages className="h-4 w-4 me-2" />
            {lang === "ar" ? "English" : "العربية"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="cursor-pointer border-primary/20 text-primary hover:bg-primary/5 rounded-xl">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        <Card className="w-full max-w-md shadow-2xl border-border/30 bg-card/85 backdrop-blur-md rounded-[28px] overflow-hidden">
          <CardHeader className="space-y-2 text-center pt-8">
            <CardTitle className="text-2xl font-black tracking-tight text-primary">{t.loginTitle}</CardTitle>
            <CardDescription className="text-xs font-semibold">{t.loginDesc}</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 px-6 md:px-8">
              {error && (
                <div className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive font-bold border border-destructive/20 text-center">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-muted-foreground">{t.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-start focus-visible:ring-primary rounded-xl focus:bg-muted/30 transition-colors border-border/40"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-muted-foreground">{t.passLabel}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-start focus-visible:ring-primary rounded-xl focus:bg-muted/30 transition-colors border-border/40"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-8 px-6 md:px-8 pt-4">
              <Button type="submit" className="w-full bg-[#E61C24] hover:bg-[#E61C24]/95 text-white font-extrabold cursor-pointer shadow-lg shadow-primary/10 rounded-xl h-11 text-xs">
                {t.loginBtn}
              </Button>
              <p className="text-[10px] text-muted-foreground bg-muted/60 p-3 rounded-xl border border-border/30 text-center w-full font-semibold leading-relaxed">
                {t.hint}
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#003366]/5 via-background to-primary/5 font-sans">
      {/* Sidebar */}
      <aside className={`w-64 bg-[#002244] dark:bg-[#080d16] text-white hidden md:flex flex-col justify-between p-5 sticky top-0 h-screen border-r border-white/5 shadow-xl z-20`}>
        <div className="space-y-8">
          <div className="flex items-center gap-2 py-1 px-1.5">
            <span className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-primary text-2xl font-black">Σ</span>
              <span className="tracking-wide">Sigma Admin</span>
            </span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex w-full items-center gap-3 rounded-xl px-4.5 py-3 text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-4.5 w-4.5" />
              {t.overview}
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex w-full items-center gap-3 rounded-xl px-4.5 py-3 text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "blog"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <NotebookPen className="h-4.5 w-4.5" />
              {t.blog}
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`flex w-full items-center gap-3 rounded-xl px-4.5 py-3 text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "social"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Globe className="h-4.5 w-4.5" />
              {t.social}
            </button>
            <button
              onClick={() => setActiveTab("legal")}
              className={`flex w-full items-center gap-3 rounded-xl px-4.5 py-3 text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "legal"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FileText className="h-4.5 w-4.5" />
              {t.legal}
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex w-full items-center gap-3 rounded-xl px-4.5 py-3 text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "services"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Activity className="h-4.5 w-4.5" />
              {t.services}
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex w-full items-center gap-3 rounded-xl px-4.5 py-3 text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "users"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Users className="h-4.5 w-4.5" />
              {t.users}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex w-full items-center gap-3 rounded-xl px-4.5 py-3 text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Settings className="h-4.5 w-4.5" />
              {t.settings}
            </button>
          </nav>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start cursor-pointer border-white/10 text-white bg-transparent hover:bg-white/5 hover:text-white rounded-xl h-10 text-xs font-semibold"
            onClick={toggleLanguage}
          >
            <Languages className="h-4 w-4 me-2" />
            {lang === "ar" ? "English" : "العربية"}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start cursor-pointer border-white/10 text-white bg-transparent hover:bg-white/5 hover:text-white rounded-xl h-10 text-xs font-semibold"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 me-2" /> : <Moon className="h-4 w-4 me-2" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4.5 py-2.5 text-xs md:text-sm font-extrabold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            {t.logout}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile / header */}
        <header className="h-16 border-b border-border/10 bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 gap-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-xl font-bold text-primary md:hidden">Σ</span>
            <h1 className="text-sm md:text-base font-black text-foreground hidden sm:block">{t.welcome}</h1>

            {/* Console Search Bar */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute start-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isRTL ? "بحث..." : "Search..."}
                className="ps-9 text-xs focus-visible:ring-primary/40 focus-visible:ring-offset-0 h-9 rounded-xl border-border/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Go to Website Button */}
            <a href={`/${lang}`}>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-2 h-9 text-xs font-bold border-primary/20 text-primary hover:bg-primary/5 hidden sm:flex rounded-xl"
              >
                <Globe className="h-3.5 w-3.5" />
                {isRTL ? "الموقع الرئيسي" : "Go to Web"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer h-9 w-9 border-primary/20 text-primary hover:bg-primary/5 sm:hidden rounded-xl"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </a>
            {/* System Notifications */}
            <Button variant="ghost" size="icon" className="relative cursor-pointer h-9 w-9 rounded-xl">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2.5 end-2.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E61C24]"></span>
              </span>
            </Button>

            {/* Profile Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full cursor-pointer border border-primary/10 p-0 flex items-center justify-center bg-primary/5 hover:bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 rounded-xl">
                <div className="flex items-center justify-start gap-2 p-2.5 border-b border-border/50">
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-bold text-sm text-foreground">Admin User</p>
                    <p className="text-[10px] font-medium text-muted-foreground">admin@sigma.com</p>
                  </div>
                </div>
                <DropdownMenuItem className="cursor-pointer font-bold text-xs" onClick={() => setActiveTab("settings")}>
                  {isRTL ? "إعدادات الحساب" : "Account Settings"}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500 font-bold text-xs focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20" onClick={handleLogout}>
                  {isRTL ? "تسجيل الخروج" : "Log Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile toggles */}
            <Button variant="ghost" size="icon" className="md:hidden cursor-pointer h-9 w-9 rounded-xl" onClick={toggleLanguage}>
              <Languages className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden cursor-pointer h-9 w-9 rounded-xl" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden cursor-pointer text-red-500 h-9 w-9 rounded-xl" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Dashboard Panels */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {activeTab === "overview" && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-[24px] bg-card overflow-hidden transform hover:-translate-y-0.5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-6 pt-6">
                    <CardTitle className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">{isRTL ? "الزوار" : "Visitors"}</CardTitle>
                    <Users className="h-4.5 w-4.5 text-[#003366] dark:text-zinc-200" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-2">
                    <div className="text-2xl font-black text-foreground">{visitorLoading ? "..." : visitorAnalytics?.summary?.total_visitors ?? 0}</div>
                    <p className="text-[10px] text-green-500 font-bold mt-1">
                      {isRTL ? "📈 سجل رحلات المستخدمين" : "📈 Tracked visitor journeys"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-[24px] bg-card overflow-hidden transform hover:-translate-y-0.5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-6 pt-6">
                    <CardTitle className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">{isRTL ? "الدول" : "Countries"}</CardTitle>
                    <Globe className="h-4.5 w-4.5 text-blue-500" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-2">
                    <div className="text-2xl font-black text-foreground">{visitorLoading ? "..." : visitorAnalytics?.summary?.countries_count ?? 0}</div>
                    <p className="text-[10px] text-blue-500 font-bold mt-1">
                      {isRTL ? "🌍 تغطية جغرافية" : "🌍 Geographic reach"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-[24px] bg-card overflow-hidden transform hover:-translate-y-0.5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-6 pt-6">
                    <CardTitle className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">{isRTL ? "المدن" : "Cities"}</CardTitle>
                    <MapPinned className="h-4.5 w-4.5 text-primary" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-2">
                    <div className="text-2xl font-black text-foreground">{visitorLoading ? "..." : visitorAnalytics?.summary?.cities_count ?? 0}</div>
                    <p className="text-[10px] text-amber-500 font-bold mt-1">
                      {isRTL ? "📍 نقاط الزيارة" : "📍 Visit hotspots"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-[24px] bg-card overflow-hidden transform hover:-translate-y-0.5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-6 pt-6">
                    <CardTitle className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">{isRTL ? "المناطق" : "Regions"}</CardTitle>
                    <TrendingUp className="h-4.5 w-4.5 text-green-500" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-2">
                    <div className="text-2xl font-black text-foreground">{visitorLoading ? "..." : visitorAnalytics?.summary?.regions_count ?? 0}</div>
                    <p className="text-[10px] text-green-500 font-bold mt-1">
                      {isRTL ? "🧭 توزيع المناطق" : "🧭 Regional distribution"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card xl:col-span-2">
                  <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                    <CardTitle className="text-base font-extrabold text-foreground">{isRTL ? "المسار اليومي للزوار" : "Daily Visitor Trend"}</CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {isRTL ? "توزيع الزيارات خلال آخر 14 يومًا" : "Last 14 days of visitor activity"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={visitorAnalytics?.daily || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          { (visitorAnalytics?.daily || []).map((entry, index) => (
                            <Cell key={`${entry.day}-${index}`} fill={index % 2 === 0 ? "#0f766e" : "#2563eb"} />
                          )) }
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
                  <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                    <CardTitle className="text-base font-extrabold text-foreground">{isRTL ? "أعلى الدول" : "Top Countries"}</CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {isRTL ? "أكثر المناطق زيارة من خلال الكوكيز والـ IP" : "Most active visitor locations"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    {(visitorAnalytics?.countries || []).length === 0 ? (
                      <p className="text-sm text-muted-foreground">{isRTL ? "لا توجد بيانات بعد" : "No analytics yet"}</p>
                    ) : (
                      visitorAnalytics?.countries?.map((country) => (
                        <div key={country.name} className="flex items-center justify-between rounded-xl border border-border/30 bg-muted/20 px-3 py-2">
                          <span className="text-sm font-semibold text-foreground">{country.name}</span>
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{country.value}</span>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card xl:col-span-2">
                  <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                    <CardTitle className="text-base font-extrabold text-foreground">{isRTL ? "خريطة الزوار" : "Visitor Map"}</CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {isRTL ? "خريطة مبسطة لتمثيل كثافة الزيارات حسب الدولة" : "Simple map view of visitor density by country"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[320px] w-full rounded-2xl border border-border/20 bg-slate-50 p-3 dark:bg-slate-950/40">
                      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
                        <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                          {({ geographies }) =>
                            geographies.map((geo) => (
                              <Geography key={geo.rsmKey} geography={geo} fill="#dbeafe" stroke="#cbd5e1" />
                            ))
                          }
                        </Geographies>
                        {visitorMarkers.map((marker) => (
                          <Marker key={marker.name} coordinates={marker.coordinates}>
                            <circle r={Math.max(5, Math.min(16, marker.value))} fill={marker.color} opacity="0.8" />
                            <circle r={Math.max(7, Math.min(18, marker.value + 2))} fill={marker.color} opacity="0.25" />
                          </Marker>
                        ))}
                      </ComposableMap>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
                  <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                    <CardTitle className="text-base font-extrabold text-foreground">{isRTL ? "أحدث الزوار" : "Latest Visitors"}</CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {isRTL ? "آخر السجلات المحفوظة في Neon" : "Latest consent records from Neon"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    {(visitorAnalytics?.recent || []).length === 0 ? (
                      <p className="text-sm text-muted-foreground">{isRTL ? "لا توجد سجلات بعد" : "No records yet"}</p>
                    ) : (
                      visitorAnalytics?.recent?.map((entry) => (
                        <div key={entry.id} className="rounded-xl border border-border/30 bg-muted/20 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground">{entry.country}</span>
                            <span className="text-[10px] text-muted-foreground">{new Date(entry.accepted_at).toLocaleDateString()}</span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{entry.city} • {entry.region}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-[28px] border border-border/20 bg-card/70 px-4 py-3 text-center text-xs font-semibold text-muted-foreground shadow-sm">
                {isRTL ? "تم الإنشاء والبرمجة بواسطة زياد شلبيط" : "Created and developed by Ziyad Shalaby"}
              </div>

              {/* Grid Layout: Services & Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Services Table */}
                <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card lg:col-span-2">
                  <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                    <CardTitle className="text-base font-extrabold text-foreground">{t.services}</CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {lang === "ar" ? "قائمة بجميع الخدمات التقنية وحالتها الفورية." : "Overview of live background integrations."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className={isRTL ? "text-right" : "text-left"}>{t.serviceName}</TableHead>
                          <TableHead className={isRTL ? "text-right" : "text-left"}>{t.status}</TableHead>
                          <TableHead className={isRTL ? "text-right" : "text-left"}>{t.updated}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servicesData.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-extrabold text-foreground text-sm">{service.name}</TableCell>
                            <TableCell>{getStatusBadge(service.status)}</TableCell>
                            <TableCell className="text-muted-foreground text-xs font-semibold">{service.updated}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
                  <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                    <CardTitle className="text-base font-extrabold text-foreground">
                      {isRTL ? "سجل النشاطات الأخير" : "Recent System Activity"}
                    </CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {isRTL ? "آخر العمليات المسجلة بالنظام" : "Latest updates from operations"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-foreground font-extrabold leading-tight">
                          {isRTL ? "أعاد أحمد منصور تشغيل بوابة الدفع" : "Ahmed Mansour restarted Payment Gateway"}
                        </p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                          <Clock className="h-2.5 w-2.5" /> 2 mins ago
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-foreground font-extrabold leading-tight">
                          {isRTL ? "تم تحديث إعدادات النظام" : "System settings updated"}
                        </p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                          <Clock className="h-2.5 w-2.5" /> 45 mins ago
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        <Activity className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-foreground font-extrabold leading-tight">
                          {isRTL ? "تحديث مجدول لقاعدة البيانات" : "Database backup completed"}
                        </p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                          <Clock className="h-2.5 w-2.5" /> 2 hours ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "blog" && (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
                <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                  <CardTitle className="text-base font-extrabold text-foreground">{isRTL ? "إدارة المدونة" : "Blog Manager"}</CardTitle>
                  <CardDescription className="text-xs font-medium">
                    {isRTL ? "أنشئ تدوينات بالعربية والإنجليزية، ثم انشرها مباشرة في الموقع." : "Create Arabic and English posts and publish them directly to the website."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleBlogSubmit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{isRTL ? "العنوان بالإنجليزية" : "English title"}</Label>
                        <Input value={blogForm.titleEn} onChange={(e) => setBlogForm({ ...blogForm, titleEn: e.target.value })} placeholder={isRTL ? "Example: New Energy Solutions" : "Example: New Energy Solutions"} className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{isRTL ? "العنوان بالعربية" : "Arabic title"}</Label>
                        <Input value={blogForm.titleAr} onChange={(e) => setBlogForm({ ...blogForm, titleAr: e.target.value })} placeholder={isRTL ? "مثال: حلول طاقة جديدة" : "Example: New Energy Solutions"} className="rounded-xl" dir="rtl" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{isRTL ? "الاختصار بالإنجليزية" : "English excerpt"}</Label>
                        <Input value={blogForm.excerptEn} onChange={(e) => setBlogForm({ ...blogForm, excerptEn: e.target.value })} placeholder={isRTL ? "ملخص مختصر" : "Short summary"} className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{isRTL ? "الاختصار بالعربية" : "Arabic excerpt"}</Label>
                        <Input value={blogForm.excerptAr} onChange={(e) => setBlogForm({ ...blogForm, excerptAr: e.target.value })} placeholder={isRTL ? "ملخص مختصر" : "Short summary"} className="rounded-xl" dir="rtl" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-muted-foreground">{isRTL ? "رابط المقال" : "Post slug"}</Label>
                      <Input value={blogForm.slug} onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} placeholder="energy-solutions" className="rounded-xl" />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{isRTL ? "المحتوى بالإنجليزية" : "English content"}</Label>
                        <BlogRichEditor value={blogForm.contentEn} onChange={(value) => setBlogForm({ ...blogForm, contentEn: value })} placeholder={isRTL ? "اكتب المحتوى بالإنجليزية هنا..." : "Write the English content here..."} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{isRTL ? "المحتوى بالعربية" : "Arabic content"}</Label>
                        <BlogRichEditor value={blogForm.contentAr} onChange={(value) => setBlogForm({ ...blogForm, contentAr: value })} placeholder={isRTL ? "اكتب المحتوى بالعربية هنا..." : "Write the Arabic content here..."} dir="rtl" />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/30 bg-muted/20 p-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <input type="checkbox" checked={blogForm.published} onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })} className="h-4 w-4 rounded border-border" />
                        {isRTL ? "نشر مباشرة" : "Publish immediately"}
                      </label>
                      <Button type="submit" disabled={blogSaving} className="rounded-xl bg-[#E61C24] px-5 text-xs font-extrabold text-white hover:bg-[#E61C24]/90">
                        <PlusCircle className="me-2 h-4 w-4" />
                        {blogSaving ? (isRTL ? "جاري الحفظ..." : "Saving...") : (isRTL ? "حفظ التدوينة" : "Save post")}
                      </Button>
                    </div>

                    {blogMessage && (
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm font-semibold text-primary">
                        {blogMessage}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
                <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                  <CardTitle className="text-base font-extrabold text-foreground">{isRTL ? "تدوينات المنشورة" : "Published posts"}</CardTitle>
                  <CardDescription className="text-xs font-medium">
                    {isRTL ? "عرض آخر التدوينات التي أضفتها إلى الموقع." : "Review the latest posts added to your site."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {blogLoading ? (
                    <p className="text-sm text-muted-foreground">{isRTL ? "جاري تحميل التدوينات..." : "Loading posts..."}</p>
                  ) : blogPosts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{isRTL ? "لا توجد تدوينات بعد." : "No blog posts yet."}</p>
                  ) : (
                    blogPosts.map((post) => (
                      <div key={post.id} className="rounded-2xl border border-border/30 bg-muted/20 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-extrabold text-foreground">{isRTL ? (post.title_ar || post.title_en) : (post.title_en || post.title_ar)}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{post.published ? (isRTL ? "منشور" : "Published") : (isRTL ? "مسودة" : "Draft")}</p>
                          </div>
                          <a href={`/${lang}/blog/${post.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            <Eye className="h-3.5 w-3.5" />
                            {isRTL ? "عرض" : "View"}
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "social" && (
            <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
              <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                <CardTitle className="text-base font-extrabold text-foreground">{t.socialTitle}</CardTitle>
                <CardDescription className="text-xs font-medium">
                  {t.socialDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSocialSubmit} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-muted-foreground">{t.facebookLabel}</Label>
                      <Input
                        value={socialForm.facebook}
                        onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                        placeholder="https://facebook.com/your-page"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-muted-foreground">{t.instagramLabel}</Label>
                      <Input
                        value={socialForm.instagram}
                        onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                        placeholder="https://instagram.com/your-page"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-muted-foreground">{t.youtubeLabel}</Label>
                      <Input
                        value={socialForm.youtube}
                        onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                        placeholder="https://youtube.com/channel/your-channel"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-muted-foreground">{t.linkedinLabel}</Label>
                      <Input
                        value={socialForm.linkedin}
                        onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/company/your-company"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-muted-foreground">{t.twitterLabel}</Label>
                      <Input
                        value={socialForm.twitter}
                        onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                        placeholder="https://twitter.com/your-handle"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-muted-foreground">{t.whatsappLabel}</Label>
                      <Input
                        value={socialForm.whatsapp}
                        onChange={(e) => setSocialForm({ ...socialForm, whatsapp: e.target.value })}
                        placeholder="https://wa.me/your-number"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/30 bg-muted/20 p-3">
                    <Button type="submit" disabled={socialSaving} className="rounded-xl bg-[#E61C24] px-5 text-xs font-extrabold text-white hover:bg-[#E61C24]/90">
                      {socialSaving ? (isRTL ? "جاري الحفظ..." : "Saving...") : t.socialSave}
                    </Button>
                    <span className="text-xs text-muted-foreground">{socialLoading ? (isRTL ? "تحميل الروابط..." : "Loading links...") : ""}</span>
                  </div>

                  {socialMessage && (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm font-semibold text-primary">
                      {socialMessage}
                    </div>
                  )}
                </form>

                <div className="rounded-2xl border border-border/30 bg-muted/20 p-6 mt-6">
                  <p className="text-sm font-bold text-foreground">{t.socialPreview}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {[
                      { label: "Facebook", url: socialLinks.facebook, Icon: FacebookIcon },
                      { label: "Instagram", url: socialLinks.instagram, Icon: InstagramIcon },
                      { label: "YouTube", url: socialLinks.youtube, Icon: YoutubeIcon },
                      { label: "LinkedIn", url: socialLinks.linkedin, Icon: LinkedinIcon },
                      { label: "Twitter", url: socialLinks.twitter, Icon: TwitterIcon },
                      { label: "WhatsApp", url: socialLinks.whatsapp, Icon: WhatsAppIcon },
                    ]
                      .filter((item) => item.url)
                      .map((item) => {
                        const Icon = item.Icon;
                        return (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-white/5 px-4 py-3 text-xs font-semibold text-foreground transition hover:border-primary/30 hover:bg-primary/10"
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </a>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "legal" && (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
                <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                  <CardTitle className="text-base font-extrabold text-foreground">{t.legalTitle}</CardTitle>
                  <CardDescription className="text-xs font-medium">{t.legalDesc}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleLegalSubmit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalSlug}</Label>
                        <Input
                          value={legalForm.slug}
                          onChange={(e) => setLegalForm({ ...legalForm, slug: e.target.value })}
                          placeholder="privacy"
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalPublished}</Label>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={legalForm.published}
                            onChange={(e) => setLegalForm({ ...legalForm, published: e.target.checked })}
                            className="h-4 w-4 rounded border-border"
                          />
                          <span className="text-xs text-muted-foreground">{isRTL ? "منشورة" : "Published"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalTitleEn}</Label>
                        <Input
                          value={legalForm.titleEn}
                          onChange={(e) => setLegalForm({ ...legalForm, titleEn: e.target.value })}
                          placeholder="Privacy Policy"
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalTitleAr}</Label>
                        <Input
                          value={legalForm.titleAr}
                          onChange={(e) => setLegalForm({ ...legalForm, titleAr: e.target.value })}
                          placeholder="سياسة الخصوصية"
                          className="rounded-xl"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalSubtitleEn}</Label>
                        <Input
                          value={legalForm.subtitleEn}
                          onChange={(e) => setLegalForm({ ...legalForm, subtitleEn: e.target.value })}
                          placeholder="Brief summary for English page"
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalSubtitleAr}</Label>
                        <Input
                          value={legalForm.subtitleAr}
                          onChange={(e) => setLegalForm({ ...legalForm, subtitleAr: e.target.value })}
                          placeholder="ملخص قصير للصفحة العربية"
                          className="rounded-xl"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalContentEn}</Label>
                        <textarea
                          value={legalForm.contentEn}
                          onChange={(e) => setLegalForm({ ...legalForm, contentEn: e.target.value })}
                          placeholder="Full English content"
                          rows={8}
                          className="w-full rounded-xl border border-border/30 bg-background/80 p-3 text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">{t.legalContentAr}</Label>
                        <textarea
                          value={legalForm.contentAr}
                          onChange={(e) => setLegalForm({ ...legalForm, contentAr: e.target.value })}
                          placeholder="المحتوى الكامل بالعربية"
                          rows={8}
                          dir="rtl"
                          className="w-full rounded-xl border border-border/30 bg-background/80 p-3 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/30 bg-muted/20 p-3">
                      <Button type="submit" disabled={legalSaving} className="rounded-xl bg-[#E61C24] px-5 text-xs font-extrabold text-white hover:bg-[#E61C24]/90">
                        {legalSaving ? (isRTL ? "جاري الحفظ..." : "Saving...") : t.legalSave}
                      </Button>
                      <span className="text-xs text-muted-foreground">{legalLoading ? (isRTL ? "تحميل الصفحات..." : "Loading pages...") : ""}</span>
                    </div>

                    {legalMessage && (
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm font-semibold text-primary">
                        {legalMessage}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
                <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                  <CardTitle className="text-base font-extrabold text-foreground">{t.legalList}</CardTitle>
                  <CardDescription className="text-xs font-medium">
                    {isRTL ? "تحكم في صفحات القانون الحالية وقم بالتعديل أو الحذف." : "Manage current legal pages, edit or delete them."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {legalLoading ? (
                    <p className="text-sm text-muted-foreground">{isRTL ? "جاري تحميل الصفحات..." : "Loading legal pages..."}</p>
                  ) : legalPages.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.legalEmpty}</p>
                  ) : (
                    legalPages.map((page) => (
                      <div key={page.id} className="rounded-2xl border border-border/30 bg-muted/20 p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-extrabold text-foreground">{page.slug}</p>
                            <p className="text-[10px] text-muted-foreground">{lang === "ar" ? (page.title_ar || page.title_en) : (page.title_en || page.title_ar)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="sm" className="rounded-xl text-xs" onClick={() => handleLegalEdit(page)}>
                              {t.legalEdit}
                            </Button>
                            <Button type="button" variant="destructive" size="sm" className="rounded-xl text-xs" onClick={() => handleLegalDelete(page.id)}>
                              {t.legalDelete}
                            </Button>
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{page.published ? (isRTL ? "منشورة" : "Published") : (isRTL ? "غير منشورة" : "Draft")}</p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "services" && (
            <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
              <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                <CardTitle className="text-base font-extrabold text-foreground">{t.services}</CardTitle>
                <CardDescription className="text-xs font-medium">
                  {lang === "ar" ? "تحكم في تشغيل وإيقاف خدمات النظام." : "Manage system microservices integrations."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>{t.serviceName}</TableHead>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>{t.status}</TableHead>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>{t.updated}</TableHead>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {servicesData.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-extrabold text-foreground text-sm">{service.name}</TableCell>
                        <TableCell>{getStatusBadge(service.status)}</TableCell>
                        <TableCell className="text-muted-foreground text-xs font-semibold">{service.updated}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="cursor-pointer rounded-xl font-bold h-8.5 text-xs">
                            {lang === "ar" ? "إعادة تشغيل" : "Restart"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "users" && (
            <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
              <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                <CardTitle className="text-base font-extrabold text-foreground">{t.users}</CardTitle>
                <CardDescription className="text-xs font-medium">
                  {lang === "ar" ? "إدارة حسابات المسؤولين والموظفين." : "Manage internal workspace access permissions."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>Name</TableHead>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>Email</TableHead>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>Role</TableHead>
                      <TableHead className={isRTL ? "text-right" : "text-left"}>Joined Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-extrabold">{user.name}</TableCell>
                        <TableCell className="font-medium text-xs text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="text-primary font-extrabold text-xs">{user.role}</TableCell>
                        <TableCell className="text-xs text-muted-foreground font-semibold">{user.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card">
              <CardHeader className="pb-3 border-b border-border/10 px-6 pt-6 bg-muted/20">
                <CardTitle className="text-base font-extrabold text-foreground">{t.settings}</CardTitle>
                <CardDescription className="text-xs font-medium">
                  {lang === "ar" ? "تعديل إعدادات الحساب والنظام الأساسية." : "Configure core account and portal options."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-xs font-bold text-muted-foreground">Admin Email Address</Label>
                  <Input id="admin-email" defaultValue="admin@sigma.com" className="text-start rounded-xl focus-visible:ring-primary border-border/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-env" className="text-xs font-bold text-muted-foreground">System Environment</Label>
                  <Input id="system-env" defaultValue="Production" className="text-start rounded-xl border-border/40 bg-muted/30" readOnly />
                </div>
                <Button className="bg-[#E61C24] hover:bg-[#E61C24]/90 text-white cursor-pointer font-extrabold rounded-xl h-11 px-6 text-xs">
                  {lang === "ar" ? "حفظ التغييرات" : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          )}
        </main>

        {/* Admin Dashboard Footer */}
        <footer className="border-t border-border/10 py-4 px-6 bg-card/25 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2 font-medium">
          <div>
            © {new Date().getFullYear()} Sigma Admin. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              {lang === "ar" ? "البيئة: الإنتاج" : "Environment: Production"}
            </span>
            <span className="text-muted-foreground/30">|</span>
            <span className="text-[10px] font-semibold">{lang === "ar" ? "الاستجابة: 0.8ms" : "Latency: 0.8ms"}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
