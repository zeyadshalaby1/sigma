"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Calendar,
  Globe,
  Award,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Send,
  Heart,
  Play,
  FileText,
  Settings,
  Flame,
  Activity,
  Droplet,
  Cpu,
  Truck,
  Gauge,
  Layers,
  Maximize,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import MenaMap from "@/components/mena-map";

const HERO_PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 16) + 8,
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
  delay: Math.random() * 6,
  duration: Math.random() * 18 + 12,
  colorClass: i % 3 === 0 
    ? "bg-[#E61C24]/30 border border-[#E61C24]/40 text-[#E61C24] shadow-[0_0_15px_rgba(230,28,36,0.4)]" 
    : i % 3 === 1 
      ? "bg-[#003366]/30 border border-[#003366]/40 text-[#003366] shadow-[0_0_15px_rgba(0,51,102,0.4)] dark:bg-blue-500/20 dark:border-blue-400/30 dark:text-blue-400 dark:shadow-[0_0_15px_rgba(96,165,250,0.4)]" 
      : "bg-orange-500/30 border border-orange-500/40 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]",
}));

const getServiceIcon = (index) => {
  switch (index) {
    case 0: return <Layers className="h-5 w-5 text-[#E61C24]" />;
    case 1: return <Flame className="h-5 w-5 text-[#003366] dark:text-blue-400" />;
    case 2: return <Activity className="h-5 w-5 text-[#E61C24]" />;
    case 3: return <Droplet className="h-5 w-5 text-[#003366] dark:text-blue-400" />;
    case 4: return <Gauge className="h-5 w-5 text-[#E61C24]" />;
    case 5: return <Flame className="h-5 w-5 text-orange-500" />;
    case 6: return <Zap className="h-5 w-5 text-[#E61C24]" />;
    case 7: return <Settings className="h-5 w-5 text-[#003366] dark:text-blue-400" />;
    case 8: return <Truck className="h-5 w-5 text-orange-500" />;
    case 9: return <Gauge className="h-5 w-5 text-[#E61C24]" />;
    default: return <Briefcase className="h-5 w-5 text-[#E61C24]" />;
  }
};

const MAP_COUNTRIES = [
  { 
    name: "Egypt", 
    nameAr: "مصر", 
    flag: "🇪🇬", 
    x: "53%", 
    y: "35%", 
    offices: [
      { 
        name: "Egypt Headquarters", 
        nameAr: "المقر الرئيسي - مصر", 
        city: "Alexandria, Egypt", 
        cityAr: "الإسكندرية، مصر", 
        addr: "Sigma Petroleum Services, General Free Zone, Amreya, Alexandria, Egypt", 
        addrAr: "سيجما للخدمات البترولية، المنطقة الحرة العامة، العامرية، الإسكندرية، مصر", 
        phone: "+20 3 481 2620" 
      },
      { 
        name: "Cairo Office", 
        nameAr: "مكتب القاهرة", 
        city: "Cairo, Egypt", 
        cityAr: "القاهرة، مصر", 
        addr: "Sigma Petroleum Services, 40 Palestine Street Extension, New Maadi, Cairo, Egypt", 
        addrAr: "سيجما للخدمات البترولية، ٤٠ امتداد شارع فلسطين، المعادي الجديدة، القاهرة، مصر", 
        phone: "+20 2 25176177" 
      }
    ]
  },
  { 
    name: "Saudi Arabia", 
    nameAr: "السعودية", 
    flag: "🇸🇦", 
    x: "69%", 
    y: "48%", 
    offices: [
      { 
        name: "Saudi Arabia Branch", 
        nameAr: "فرع المملكة العربية السعودية", 
        city: "Al Khobar, Saudi Arabia", 
        cityAr: "الخبر، المملكة العربية السعودية", 
        addr: "Sigma Petroleum Services, 4992 11A Street, Al Jisr District, Al Khobar 34714, Kingdom of Saudi Arabia", 
        addrAr: "سيجما للخدمات البترولية، ٤٩٩٢ شارع ١١أ، حي الجسر، الخبر ٣٤٧١٤، الخبر، المملكة العربية السعودية", 
        phone: "+966 50 028 1522" 
      }
    ]
  },
  { 
    name: "Oman", 
    nameAr: "عُمان", 
    flag: "🇴🇲", 
    x: "82%", 
    y: "56%", 
    offices: [
      { 
        name: "Oman Branch", 
        nameAr: "فرع سلطنة عمان", 
        city: "Ruwi, Oman", 
        cityAr: "روي، سلطنة عمان", 
        addr: "Sigma Petroleum Services Oman, 52 Al Iskan Street, Ruwi, P.O. Box 676, Sultanate of Oman", 
        addrAr: "سيجما للخدمات البترولية عمان، ٥٢ شارع الإسكان، روي، ص.ب ٦٧٦، سلطنة عمان", 
        phone: "+968 24 780 071" 
      }
    ]
  },
  { 
    name: "Libya", 
    nameAr: "ليبيا", 
    flag: "🇱🇾", 
    x: "38%", 
    y: "38%", 
    offices: [
      { 
        name: "Libya Branch", 
        nameAr: "فرع ليبيا", 
        city: "Benghazi, Libya", 
        cityAr: "بنغازي، ليبيا", 
        addr: "Sigma Petroleum Services, Second Floor, Rashid City Street, Baloun Land, Benghazi, Libya", 
        addrAr: "سيجما للخدمات البترولية، الطابق الثاني، شارع مدينة الرشيد، أرض بلعون، بنغازي، ليبيا", 
        phone: "+218 92 179 5363" 
      }
    ]
  },
  { 
    name: "Syria", 
    nameAr: "سوريا", 
    flag: "🇸🇾", 
    x: "58%", 
    y: "22%", 
    offices: [
      { 
        name: "Syria Branch", 
        nameAr: "فرع سوريا", 
        city: "Damascus, Syria", 
        cityAr: "دمشق، سوريا", 
        addr: "Sigma Petroleum Services, Building 16, Al Andalus Sector, Airport Street, Damascus, Syria", 
        addrAr: "سيجما للخدمات البترولية، بناء ١٦، قطاع الأندلس، طريق المطار، دمشق، سوريا", 
        phone: "+963 968077581" 
      }
    ]
  }
];

export default function HomeClient({ params, dbContent }) {
  const lang = params?.lang || "en";
  const isRTL = lang === "ar";

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Egypt");

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        isRTL
          ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
          : "Your message has been sent successfully! We will contact you soon."
      );
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    }, 1200);
  };

  const clientLogos = [
    1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53
  ].map(num => `/Sigma website/Client list logos/${num}.png`);

  const fallbackContent = {
    ar: {
      hero_badge: "عضو فخور في مجموعة سيجما — تأسست عام 1959",
      hero_title: "بنيت على الإرث ..\nيقودها الأداء",
      hero_subtitle: "حلول متكاملة لحقول النفط والغاز عبر منطقة الشرق الأوسط وشمال إفريقيا وأفريقيا — سريعة، موثوقة، ومصممة للأداء.",
      cta_primary: "استكشف خدماتنا",
      cta_watch_video: "شاهد الفيديو",
      cta_profile: "ملف الشركة PDF",
      stats_legacy_num: "60+",
      stats_legacy_lbl: "سنوات من الإرث العريق",
      stats_countries_num: "+8",
      stats_countries_lbl: "دول العمليات الإقليمية",
      stats_uptime_num: "%98",
      stats_uptime_lbl: "معدل استمرار التشغيل",
      stats_capacity_num: "360",
      stats_capacity_lbl: "مليون قدم مكعب سعة المعالجة",
      marquee_title: "شركاء النجاح والعملاء الدوليين",
      who_we_are_title: "من نحن",
      who_we_are_subtitle: "منارة التميز في خدمات النفط والغاز",
      who_we_are_text1: "تأسست شركة سيجما للخدمات البترولية كذراع مخصصة للخدمات النفطية لمجموعة سيجما (Sigma Group)، وتقدم حلولاً متكاملة وموجهة نحو النتائج ومصممة لتعزيز إنتاجية الآبار وزيادة قيمة الأصول.",
      who_we_are_text2: "بدعم من شركاتنا الشقيقة سيجما للتوريدات وسيجما للابتكار، نضمن تنفيذًا أسرع وعمليات أكثر أمانًا وتسليمًا موثوقًا في كل مشروع. واليوم، مع أكثر من 290 مشروعًا مكتملًا، نحن معترف بنا كأحد الرواد في توفير مرافق الإنتاج سريعة التتبع وفعالة من حيث التكلفة في مصر والشرق الأوسط وأفريقيا.",
      who_we_are_text3: "كجزء من مجموعة سيجما - وهي تكتل متنوع تأسس في عام 1959 مع إرث يمتد إلى التطوير العقاري وتجارة الصلب والمواد الكيميائية الصناعية والمعدات البحرية - تجسد سيجما للخدمات البترولية الابتكار والجودة والموثوقية. اليوم، مع أكثر من 290 مشروعاً مكتملاً، نحن معترف بنا كأحد الرواد في توفير مرافق الإنتاج سريعة التتبع وفعالة من حيث التكلفة في مصر والشرق الأوسط وأفريقيا.",
      stat_founded_lbl: "تأسست عام 2001",
      stat_founded_desc: "ذراع الخدمات البترولية",
      stat_group_lbl: "مجموعة سيجما 1959",
      stat_group_desc: "ستة عقود من الإرث العريق",
      stat_countries_lbl2: "أكثر من 8 دول",
      stat_countries_desc2: "الشرق الأوسط وأفريقيا",
      stat_certified_lbl: "شهادات الأيزو العالمية",
      stat_certified_desc: "9001 · 14001 · 18001",
      services_title: "خدماتنا وخبراتنا الفنية",
      services_subtitle: "حلول نفطية متكاملة لزيادة الأداء والكفاءة",
      services: [
        {
                "title": "مرافق الإنتاج المبكر (EPF)",
                "desc": "حلول جاهزة لمرافق الإنتاج المبكر على أساس التأجير والتشغيل والصيانة - يتم نشرها في غضون 15-21 يوماً للنفط و 4 أشهر للغاز.",
                "img": "/Sigma website/Photos/Early Production Facilities/4.png"
        },
        {
                "title": "أنظمة معالجة الغاز",
                "desc": "محطات معالجة غاز تركيبية متكاملة تماماً - من الهندسة والتوريد إلى التشغيل التجريبي والتشغيل الفعلي. أول إنتاج للغاز خلال 4 أشهر.",
                "img": "/Sigma website/Photos/Gas Treatment Systems/18.png"
        },
        {
                "title": "خدمات اختبار الآبار",
                "desc": "خدمات اختبار آبار متميزة مع أكثر من 25 عاماً من الخبرة في مصر والشرق الأوسط وأفريقيا - بيانات دقيقة لقرارات أكثر ذكاءً.",
                "img": "/Sigma website/Photos/Wel Testing Services/1.png"
        },
        {
                "title": "معالجة المياه وإعادة حقنها",
                "desc": "تحويل المياه المصاحبة للإنتاج إلى أصل استراتيجي للخزان - أنظمة معالجة متقدمة لتعزيز استخلاص النفط (EOR).",
                "img": "/new/3/water tretment.png"
        },
        {
                "title": "حلول ضغط الغاز",
                "desc": "أنظمة ضغط سريعة النشر بمعدل توفر تشغيلي يتجاوز 98% - بتهيئة تتراوح من 500 حصان إلى 2000 حصان.",
                "img": "/new/3/gas compression 1.png"
        },
        {
                "title": "استعادة الغاز المحروق",
                "desc": "حلول متكاملة لتقليل عمليات الحرق الروتينية للغاز - تحويل الغاز المهدر إلى تدفقات إنتاجية قابلة للتحقيق المالي.",
                "img": "/new/3/flaerd gas.png"
        },
        {
                "title": "حلول الغاز للطاقة",
                "desc": "تحويل الغاز المصاحب والمحروق إلى طاقة كهربائية موثوقة - تقليل الاعتماد على الديزل وتكاليف التشغيل.",
                "img": "/new/3/gas to power1.png"
        },
        {
                "title": "حلول المانيفولد منعدم الضغط",
                "desc": "مجمعات تدفق ذات ضغط منخفض للغاية مصممة لتوزيع التدفق متعدد الأطوار بأمان وكفاءة وبأقل خسارة للضغط.",
                "img": "/new/3/Zero Pressure Manifold1.png"
        },
        {
                "title": "وحدات التدخل السريع وجذب الأنابيب (Flash-By)",
                "desc": "حفارات صيانة وحفر متطورة محمولة على شاحنات للتدخل السريع والآمن في الآبار في البيئات الصعبة.",
                "img": "/new/3/flash by1.png"
        },
        {
                "title": "أنظمة القياس ونقل الملكية",
                "desc": "دقة معتمدة لنقل الملكية، والقياس المالي، ومعاملات الغاز التجارية - ثقة في كل متر مكعب يتم قياسه.",
                "img": "/new/3/metering1.png"
        }
],
      timeline_title: "مسيرة نمونا عبر السنوات",
      timeline_subtitle: "25 عاماً من التوسع الإقليمي والنجاح المتواصل",
      timeline_preview_text: "بدأنا العمل في مصر عام 2001، وخلال ربع قرن قمنا بالتوسع في سلطنة عُمان وسوريا والسعودية والمغرب وليبيا وكينيا والجزائر، مع إدخال أحدث التقنيات مثل وحدات معالجة الغاز ومكافحة حرق الغاز صفر (Zero-flare).",
      timeline_btn: "تصفح المخطط الزمني الكامل",
      presence_title: "تواجدنا الجغرافي الإقليمي",
      presence_subtitle: "مكاتبنا وعملياتنا في الشرق الأوسط وأفريقيا",
      presence_text: "تنتشر مكاتب سيجما البترولية في مصر (المركز الرئيسي بالإسكندرية والقاهرة)، والمملكة العربية السعودية، وسلطنة عمان، وليبيا، وسوريا، مع إدارة مشاريع حيوية للمشغلين الدوليين في الجزائر والمغرب وكينيا.",
      presence_btn: "تفاصيل المكاتب والعناوين",
      certs_title: "الشهادات العالمية للجودة",
      certs_subtitle: "نلتزم بأعلى معايير السلامة والجودة والبيئة",
      certs: [
        { code: "ISO 9001", label: "إدارة الجودة الشاملة" },
        { code: "ISO 14001", label: "الإدارة البيئية المستدامة" },
        { code: "OHSAS 18001", label: "السلامة والصحة المهنية" }
      ],
      contact_title: "تواصل معنا اليوم",
      contact_subtitle: "جاهز لتطوير وتأمين مشروعاتك البترولية؟ تفضل بمراسلتنا وسيتم الرد فوراً.",
      form_name: "الاسم الكامل",
      form_email: "البريد الإلكتروني",
      form_company: "الشركة / المؤسسة",
      form_message: "نص الرسالة",
      form_submit: "إرسال الرسالة",
      direct_info: "معلومات الاتصال",
      direct_phone: "+20 3 481 2620",
      why_title: "لماذا سيجما للخدمات البترولية",
      why_subtitle: "Your Partner in Operational Excellence",
      why_subtitle_ar: "شريكك في التميز التشغيلي",
      why_desc: "اكتسبت سيجما للخدمات البترولية سمعة طيبة من خلال تقديم نتائج استثنائية باستمرار في الوقت المحدد وبجودة لا تقبل المساومة. وسواء كنا نعمل على تحسين أداء الآبار أو إدارة العمليات الميدانية المتكاملة أو مواجهة التحديات المعقدة، فنحن الاسم الذي يثق به العملاء لإنجاز العمل بسلاسة وكفاءة.",
      why_quote: "دع سيجما للخدمات البترولية تكون شريكك في تحقيق التميز التشغيلي. معاً، سنقود مستقبل الطاقة.",
      why_points: [
        { title: "تنفيذ سريع للغاية", desc: "تسليم المشاريع في الوقت المحدد حتى تحت أصعب الجداول الزمنية والظروف التشغيلية." },
        { title: "خبرة مثبتة وموثقة", desc: "سجل قوي وحافل بالمشاريع الناجحة التي تم تنفيذها بامتياز في الشرق الأوسط وأفريقيا." },
        { title: "مخزون ومعدات متنوعة", desc: "توافر كامل للمعدات والمواد الأساسية لضمان سرعة التحرك والانتشار الفوري بأي مقياس." },
        { title: "عمليات تشغيل متكاملة", desc: "دعم سلس ومستمر لعمليات التشغيل والصيانة (O&M) بالتوافق مع الأطر التعاقدية." },
        { title: "مرونة وقدرة على التوسع", desc: "توسيع نطاق المشاريع والعمليات بسلاسة مع تطور الاحتياجات التشغيلية للمشروع." },
        { title: "عقود مرنة ومخصصة", desc: "حلول تعاقدية قصيرة وطويلة الأجل مصممة لتلبية متطلبات وأهداف العملاء بدقة." },
        { title: "التزام بيئي وصارم", desc: "دمج السلامة والصحة المهنية والمسؤولية البيئية كركيزة أساسية في كافة الأنشطة والمشاريع." },
        { title: "شراكة موثوقة ومستدامة", desc: "الاسم الأول الذي يثق به قادة قطاع الطاقة لإنجاز المهام - بسلاسة وكفاءة تشغيلية." }
      ],
    projects_badge: "أثبتت جدارتها على نطاق واسع",
    projects_title: "مشاريع رائدة موثوقة من قادة الصناعة",
    projects_desc: "مشاريع كبرى تعكس سرعتنا وحجم أعمالنا وموثوقيتنا العالية عبر كبار المشغلين الدوليين والمشروعات المشتركة.",
    projects_list: [
      {
        title: "مرفق نيدوكو للإنتاج المبكر — المرحلة الأولى",
        subtitle: "Petrobel (ENI / EGPC) | هندسة: ENPPI",
        tagline: "واحدة من أسرع منشآت الغاز التي تم بناؤها في مصر على الإطلاق",
        img: "/new/2/nidoco1.png",
        stats: [
          { num: "180", unit: "مليون قدم³", label: "معالجة الغاز" },
          { num: "800", unit: "برميل/يوم", label: "متكثفات" },
          { num: "3", unit: "أشهر", label: "مدة التنفيذ" }
        ]
      },
      {
        title: "مرفق نيدوكو للإنتاج المبكر — المرحلة الثانية",
        subtitle: "Petrobel (ENI / EGPC) | هندسة: ENPPI",
        tagline: "تغذي وتدعم أكبر محطة لتوليد الكهرباء في مصر",
        img: "/new/2/nidoco2.png",
        stats: [
          { num: "360", unit: "مليون قدم³", label: "سعة معالجة الغاز" },
          { num: "1,600", unit: "برميل/يوم", label: "متكثفات" },
          { num: "6", unit: "أشهر", label: "مدة التنفيذ" }
        ]
      },
      {
        title: "منشأة إنتاج ومعالجة الغاز",
        subtitle: "SUCO (RWE / EGPC)",
        tagline: "إنتاج موثوق متوسط المدى مع الحفاظ على التميز التشغيلي المستمر",
        img: "/new/2/3.png",
        stats: [
          { num: "60", unit: "مليون قدم³", label: "معالجة الغاز" },
          { num: "شامل", unit: "طويل الأجل", label: "تشغيل وصيانة سيجما" },
          { num: "+98%", unit: "استمرارية", label: "معدل استمرار التشغيل" }
        ]
      }
    ],
    certs_badge: "الريادة المعتمدة",
    certs_section_title: "قيمنا وشهاداتنا العالمية",
    certs_section_desc: "الجودة ليست مجرد وعد — بل هي أساس عملنا. شهاداتنا تعكس التزامنا الراسخ بتقديم الأفضل دائماً.",
    certs_list_new: [
      { code: "ISO 9001", title: "إدارة الجودة الشاملة", desc: "منتجات عالية الجودة باستمرار تلبي جميع متتبعات العملاء والمعايير التنظيمية." },
      { code: "ISO 14001", title: "الإدارة البيئية المستدامة", desc: "عمليات تشغيلية مستدامة مدعومة بنظام إدارة بيئي فعال وصديق للبيئة." },
      { code: "OHSAS 18001", title: "السلامة والصحة المهنية", desc: "إعطاء الأولوية القصوى لسلامة الكوادر البشرية وفق معايير السلامة المهنية المعترف بها دولياً." }
    ],
    values_list: [
      { title: "بنيت على مدار 50 عاماً", desc: "ثقة مكتسبة من خلال خمسة عقود من الدقة والالتزام بالعهود والشراكات الموثوقة." },
      { title: "تخطي الحدود والعقبات", desc: "مسترشدون بالأخلاقيات والمسؤولية، لتقديم حلول تدفع النجاح وتحمي البيئة." },
      { title: "الابتكار يلتقي بالفرص", desc: "الجمع بين الانتشار العالمي والخبرة المحلية من خلال فريق من المتخصصين المهرة حول العالم." },
      { title: "السرعة تلتقي بالكمال", desc: "نعمل بمرونة تامة مدعومة بخبرات رائدة في قطاع الطاقة — سرعة، كفاءة، وبلا تأخير." }
    ]
  },
    en: {
      hero_badge: "A Proud Member of Sigma Group — Est. 1959",
      hero_title: "Built on Legacy .. Driven\nBy Performance",
      hero_subtitle: "End-to-end oilfield solutions across the MENA region and Africa — fast, reliable, and built to perform.",
      cta_primary: "Explore Our Services",
      cta_watch_video: "Watch Video",
      cta_profile: "Company Profile PDF",
      stats_legacy_num: "60+",
      stats_legacy_lbl: "Years of Legacy",
      stats_countries_num: "8+",
      stats_countries_lbl: "Countries",
      stats_uptime_num: "98%",
      stats_uptime_lbl: "Uptime Rate",
      stats_capacity_num: "360",
      stats_capacity_lbl: "MMSCFD Capacity",
      marquee_title: "Trusted by Global Energy Leaders",
      who_we_are_title: "Who We Are",
      who_we_are_subtitle: "A Beacon of\nExcellence in Oil\n& Gas",
      who_we_are_text1: "Founded in 2001 as the dedicated oilfield services arm of Sigma Group, Sigma Petroleum Services delivers integrated, results-driven solutions designed to enhance well productivity and maximize asset value.",
      who_we_are_text2: "Supported by our sister companies Sigma Supplies and Sigma Innovation, we ensure faster execution, safer operations, and dependable delivery across every project. Today, with over 290 completed projects, we are recognized as a leader in the provision of fast-track and cost-effective production facilities.",
      who_we_are_text3: "As part of Sigma Group — a diversified conglomerate established in 1959 with a legacy spanning real estate development, steel trading, industrial chemicals, and marine equipment — Sigma Petroleum Services embodies innovation, quality, and reliability. Today, with over 290 completed projects, we are recognized as one of the leaders in the provision of fast-track and cost-effective production facilities across Egypt, the Middle East, and Africa.",
      stat_founded_lbl: "2001",
      stat_founded_desc: "Founded Oilfield Services",
      stat_group_lbl: "1959",
      stat_group_desc: "Sigma Group Legacy",
      stat_countries_lbl2: "8+",
      stat_countries_desc2: "MENA & Africa Countries",
      stat_certified_lbl: "ISO Certified",
      stat_certified_desc: "9001 · 14001 · 18001",
      services_title: "Technical Services & Expertise",
      services_subtitle: "Integrated Oilfield Solutions Engineered for Results",
      services: [
        {
                "title": "Early Production Facilities",
                "desc": "Turnkey EPF solutions on a lease, operate, and maintain basis — deployed in as little as 15–21 days for oil and 4 months for gas.",
                "img": "/Sigma website/Photos/Early Production Facilities/4.png"
        },
        {
                "title": "Gas Treatment Systems",
                "desc": "Fully integrated modular gas treatment plants — from engineering and supply to commissioning and operation. From first gas in 4 months.",
                "img": "/Sigma website/Photos/Gas Treatment Systems/18.png"
        },
        {
                "title": "Well Testing Services",
                "desc": "Premium well testing with 25+ years of experience across Egypt, the Middle East, and Africa — precision data for smarter decisions.",
                "img": "/Sigma website/Photos/Wel Testing Services/1.png"
        },
        {
                "title": "Water Treatment & Reinjection",
                "desc": "Transform produced water into a strategic reservoir asset — advanced treatment systems for Enhanced Oil Recovery (EOR).",
                "img": "/new/3/water tretment.png"
        },
        {
                "title": "Gas Compression Solutions",
                "desc": "Rapid-deployment compression systems with 98%+ operational availability — from 500 HP to 2,000 HP configurations.",
                "img": "/new/3/gas compression 1.png"
        },
        {
                "title": "Flared Gas Recovery",
                "desc": "Integrated solutions to minimize routine flaring — turning wasted gas into monetizable production streams.",
                "img": "/new/3/flaerd gas.png"
        },
        {
                "title": "Gas-to-Power Solutions",
                "desc": "Convert associated and flared gas into dependable electrical power — reducing diesel dependency and operating costs.",
                "img": "/new/3/gas to power1.png"
        },
        {
                "title": "Zero-Pressure Manifold Solutions",
                "desc": "Ultra-low-pressure manifolds engineered for safe, efficient multiphase flow distribution and minimized pressure losses.",
                "img": "/new/3/Zero Pressure Manifold1.png"
        },
        {
                "title": "Flash-By & Pulling Rigs",
                "desc": "Advanced truck-mounted drilling and workover rigs for fast, safe well intervention in challenging environments.",
                "img": "/new/3/flash by1.png"
        },
        {
                "title": "Metering Systems & Custody Transfer",
                "desc": "Certified accuracy for custody transfer, fiscal measurement, and commercial gas transactions — confidence in every cubic meter.",
                "img": "/new/3/metering1.png"
        }
],
      timeline_title: "Our Milestone Journey",
      timeline_subtitle: "25 Years of Continuous Growth & Expansion",
      timeline_preview_text: "Founded in Egypt in 2001, Sigma has spent 25 years establishing footprints in Oman, Saudi Arabia, Libya, Syria, Morocco, Algeria, and Kenya, while pioneering green technologies like Zero Gas Flaring.",
      timeline_btn: "View Full Growth Timeline",
      presence_title: "Our Regional Presence",
      presence_subtitle: "Headquarters & Branches Across MENA and Africa",
      presence_text: "Sigma maintains major corporate offices in Egypt (Alexandria HQ & Cairo), Saudi Arabia, Oman, Libya, and Syria, supporting active field projects across Algeria, Morocco, and Kenya.",
      presence_btn: "View All Office Details",
      certs_title: "Certified to Lead",
      certs_subtitle: "Committed to Unwavering Quality and Field Safety Standards",
      certs: [
        { code: "ISO 9001", label: "Quality Management" },
        { code: "ISO 14001", label: "Environmental Management" },
        { code: "OHSAS 18001", label: "Occupational Health & Safety" }
      ],
      contact_title: "Ready to Elevate Your Projects?",
      contact_subtitle: "Contact us today to discuss your production optimization and field asset goals.",
      form_name: "Full Name",
      form_email: "Email Address",
      form_company: "Company / Organization",
      form_message: "Message",
      form_submit: "Send Message",
      direct_info: "Direct Contact",
      direct_phone: "+20 3 481 2620",
      why_title: "Why Sigma Petroleum Services",
      why_subtitle: "Your Partner in Operational Excellence",
      why_desc: "Sigma Petroleum Services has earned a stellar reputation by consistently delivering exceptional results, on time and with stubborn quality. Whether optimizing well performance, managing end-to-end oilfield operations, or navigating complex challenges — we are the name clients trust to get the job done seamlessly and efficiently.",
      why_quote: "Let Sigma Petroleum Services be your partner in achieving operational excellence. Together, we'll power the future of energy.",
      why_points: [
        { title: "Fast-Track Execution", desc: "Timely project delivery even under the most demanding schedules." },
        { title: "Proven Expertise", desc: "A strong record of successfully executed projects across MENA and Africa." },
        { title: "Diverse Inventory", desc: "Extensive equipment and materials for immediate mobilization at any scale." },
        { title: "Integrated Operations", desc: "Seamless O&M support aligned with contractual frameworks." },
        { title: "Rapid Scalability", desc: "Smooth expansion of project scope as operational needs evolve." },
        { title: "Flexible Contracts", desc: "Short- and long-term solutions tailored to client requirements." },
        { title: "Environmental Commitment", desc: "Quality, safety, and environmental responsibility embedded across all activities." },
        { title: "Trusted Partnership", desc: "The name clients trust to get the job done — seamlessly and efficiently." }
      ],
      projects_badge: "Proven at Scale",
      projects_title: "Proven at Scale, Trusted by Industry Leaders",
      projects_desc: "Landmark projects demonstrating our speed, scale, and reliability across major international operators and joint ventures.",
      projects_list: [
        {
          title: "Nidoco EPF — Phase I",
          subtitle: "ENI / EGPC | Operator: Petrobel | Engineering: ENPPI",
          tagline: "One of the fastest gas facilities ever built in Egypt",
          img: "/new/2/nidoco1.png",
          stats: [
            { num: "180", unit: "MMSCFD", label: "Gas Processing" },
            { num: "800", unit: "BBL/day", label: "Condensate" },
            { num: "3", unit: "Months", label: "Completion Time" }
          ]
        },
        {
          title: "Nidoco EPF — Phase II",
          subtitle: "ENI / EGPC | Operator: Petrobel | Engineering: ENPPI",
          tagline: "Supplies Egypt's largest power generation plant",
          img: "/new/2/nidoco2.png",
          stats: [
            { num: "360", unit: "MMSCFD", label: "Gas Capacity" },
            { num: "1,600", unit: "BBL/day", label: "Condensate" },
            { num: "6", unit: "Months", label: "Completion Time" }
          ]
        },
        {
          title: "Gas Production Facility",
          subtitle: "RWE / EGPC | Operator: SUCO",
          tagline: "Reliable mid-scale production with sustained excellence",
          img: "/new/2/3.png",
          stats: [
            { num: "60", unit: "MMSCFD", label: "Gas Processing" },
            { num: "Long-term", unit: "O&M", label: "O&M by Sigma" },
            { num: "98%+", unit: "Uptime", label: "Uptime Rate" }
          ]
        }
      ],
      certs_badge: "Certified to Lead",
      certs_section_title: "Our Values & Certifications",
      certs_section_desc: "Quality isn't just a promise — it's our foundation. Our certifications showcase our unwavering commitment to delivering the best.",
      certs_list_new: [
        { code: "ISO 9001", title: "Quality Management", desc: "Consistently high-quality products that meet all customer and regulatory standards." },
        { code: "ISO 14001", title: "Environmental Management", desc: "Sustainable processes powered by an effective environmental management system." },
        { code: "OHSAS 18001", title: "Occupational Health & Safety", desc: "Prioritizing safety with internationally recognized health and safety standards." }
      ],
      values_list: [
        { title: "Built Over 50 Years", desc: "Trust earned through five decades of precision, promise-keeping, and reliable partnerships." },
        { title: "Pushing Boundaries", desc: "Guided by ethics and responsibility, delivering solutions that drive success and protect the environment." },
        { title: "Innovation Meets Opportunity", desc: "Combining global reach with local expertise through a team of skilled specialists worldwide." },
        { title: "Speed Meets Perfection", desc: "Operating with start-up agility backed by industry-leader expertise — fast, efficient, no delays." }
      ]
    }
  }[lang] || { ar: {}, en: {} };

  // Deep merge function to merge Neon database content with hardcoded fallbackContent
  const mergeContent = (fallback, db) => {
    if (!db) return fallback;
    const merged = { ...fallback };
    for (const key in db) {
      if (db[key] !== null && db[key] !== undefined) {
        if (Array.isArray(db[key]) && Array.isArray(fallback[key])) {
          merged[key] = fallback[key].map((fallbackItem, idx) => {
            const dbItem = db[key][idx];
            if (dbItem !== undefined && dbItem !== null) {
              if (typeof dbItem === "object" && typeof fallbackItem === "object") {
                return mergeContent(fallbackItem, dbItem);
              }
              return dbItem;
            }
            return fallbackItem;
          });
          // If the DB has more items than the fallback, append them
          if (db[key].length > fallback[key].length) {
            merged[key] = [...merged[key], ...db[key].slice(fallback[key].length)];
          }
        } else if (typeof db[key] === "object" && typeof fallback[key] === "object" && fallback[key] !== null) {
          merged[key] = mergeContent(fallback[key], db[key]);
        } else {
          merged[key] = db[key];
        }
      }
    }
    return merged;
  };

  const content = mergeContent(fallbackContent, dbContent);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      
      {/* 1. HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="relative isolate pt-24 pb-28 md:py-36 flex flex-col items-center justify-center text-center px-6 min-h-[90vh] overflow-hidden border-b border-border/10">
        
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-20"
          src="/Sigma%20website/sigma%20video.mp4"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 -z-[15]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80 -z-[14]" />
        
        {/* Pulsing petroleum glow blobs in the background */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1],
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/10 start-1/10 w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-[120px] -z-10 opacity-70 dark:opacity-40"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1.15, 1],
            x: [0, -30, 20, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/10 end-1/10 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-[#003366]/20 via-[#003366]/5 to-transparent blur-[140px] -z-10 opacity-70 dark:opacity-45"
        />

        {/* Floating Oil Droplets (Particles) */}
        {HERO_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.colorClass} blur-[1px]`}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.sin(p.id) * 30, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4.5 py-2 text-xs md:text-sm font-bold text-white mb-8 shadow-sm backdrop-blur-md hover:border-primary/20 transition-all duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {content.hero_badge}
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight max-w-5xl leading-[1.1] text-white drop-shadow-lg whitespace-pre-line"
        >
          {content.hero_title}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mt-8 font-medium drop-shadow"
        >
          {content.hero_subtitle}
        </motion.p>

        {/* Three CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full sm:w-auto px-4"
        >
          <a href={`/${lang}/services`} className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-[#E61C24] hover:bg-[#E61C24]/95 text-white font-bold cursor-pointer gap-2 h-12 px-8 shadow-lg shadow-primary/10 hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-200 rounded-xl">
              {content.cta_primary}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Button>
          </a>
          
          <Button
            size="lg"
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md font-bold cursor-pointer gap-2 h-12 px-8 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 rounded-xl"
          >
            <Play className="h-4 w-4 fill-current text-white" />
            {content.cta_watch_video}
          </Button>

          <a href="/new/4/Sigma's%20Company%20Profile.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full cursor-pointer h-12 px-8 border-white/20 text-white bg-white/10 hover:bg-white/20 gap-2 transform hover:-translate-y-0.5 transition-all duration-200 rounded-xl">
              <FileText className="h-4 w-4 text-white" />
              {content.cta_profile}
            </Button>
          </a>
        </motion.div>

        {/* Hero Stats Glassmorphic Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl px-4"
        >
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center space-y-2 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
            <span className="block text-3xl md:text-4xl font-black text-[#FF4D54]">{content.stats_legacy_num}</span>
            <span className="block text-[10px] md:text-xs text-white/70 font-extrabold uppercase tracking-widest">{content.stats_legacy_lbl}</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center space-y-2 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
            <span className="block text-3xl md:text-4xl font-black text-[#5BA3FF]">{content.stats_countries_num}</span>
            <span className="block text-[10px] md:text-xs text-white/70 font-extrabold uppercase tracking-widest">{content.stats_countries_lbl}</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center space-y-2 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
            <span className="block text-3xl md:text-4xl font-black text-white">{content.stats_uptime_num}</span>
            <span className="block text-[10px] md:text-xs text-white/70 font-extrabold uppercase tracking-widest">{content.stats_uptime_lbl}</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center space-y-2 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
            <span className="block text-3xl md:text-4xl font-black text-[#FF4D54]">{content.stats_capacity_num}</span>
            <span className="block text-[10px] md:text-xs text-white/70 font-extrabold uppercase tracking-widest">{content.stats_capacity_lbl}</span>
          </div>
        </motion.div>
      </section>

      {/* 2. INFINITE LOGO MARQUEE (PARTNERS) */}
      <section className="py-10 bg-muted/20 border-y border-border/20 overflow-hidden relative" dir="ltr">
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest text-center md:text-start">
            {content.marquee_title}
          </h3>
        </div>

        {/* Endless Marquee wrapper using Framer Motion */}
        <div className="flex w-full relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-28 shrink-0 items-center justify-around py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 280,
              repeat: Infinity
            }}
          >
            {/* Render logos twice for seamless loop */}
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="h-20 w-44 shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-108 opacity-80 hover:opacity-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={`Client Logo ${i}`}
                  className="max-h-full max-w-full object-contain filter grayscale dark:invert dark:grayscale-0 dark:brightness-120 dark:hover:grayscale-0 hover:grayscale-0 cursor-pointer"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
      <section className="py-20 md:py-28 container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Biography texts */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{content.who_we_are_title}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white leading-tight whitespace-pre-line">
              {content.who_we_are_subtitle}
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
              <p>{content.who_we_are_text1}</p>
              <p>{content.who_we_are_text2}</p>
              <p className="border-l-4 border-l-primary pl-4 text-xs md:text-sm italic text-foreground font-semibold bg-muted/40 p-4 rounded-r-2xl rtl:border-l-0 rtl:border-r-4 rtl:border-r-primary rtl:pr-4 rtl:pl-0 rtl:rounded-r-none rtl:rounded-l-2xl">
                {content.who_we_are_text3}
              </p>
            </div>
          </div>
          
          {/* Right Column: Asymmetric Image Collage (Bento Grid) */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-3xl border border-border/30 shadow-md group relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/new/1/1.png"
                  alt="Sigma Facility 1"
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="overflow-hidden rounded-3xl border border-border/30 shadow-md group relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/new/1/18.png"
                  alt="Sigma Facility 18"
                  className="w-full h-32 md:h-44 object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="overflow-hidden rounded-3xl border border-border/30 shadow-md group relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/new/1/5.png"
                  alt="Sigma Facility 5"
                  className="w-full h-32 md:h-44 object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="overflow-hidden rounded-3xl border border-border/30 shadow-md group relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/new/5/IMG_1180.PNG"
                  alt="Sigma Facility 20"
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 border-t border-border/20 pt-12">
          <div className="p-6 rounded-3xl bg-card border border-border/30 text-center space-y-1.5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
            <span className="block text-3xl font-black text-primary">2001</span>
            <span className="block text-xs font-extrabold text-foreground">{content.stat_founded_lbl}</span>
            <span className="block text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">{content.stat_founded_desc}</span>
          </div>
          <div className="p-6 rounded-3xl bg-card border border-border/30 text-center space-y-1.5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
            <span className="block text-3xl font-black text-[#003366] dark:text-[#FF3B43]">1959</span>
            <span className="block text-xs font-extrabold text-foreground">{content.stat_group_lbl}</span>
            <span className="block text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">{content.stat_group_desc}</span>
          </div>
          <div className="p-6 rounded-3xl bg-card border border-border/30 text-center space-y-1.5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
            <span className="block text-3xl font-black text-primary">8+</span>
            <span className="block text-xs font-extrabold text-foreground">{content.stat_countries_lbl2}</span>
            <span className="block text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">{content.stat_countries_desc2}</span>
          </div>
          <div className="p-6 rounded-3xl bg-card border border-border/30 text-center space-y-1.5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
            <span className="block text-3xl font-black text-[#003366] dark:text-[#FF3B43]">ISO</span>
            <span className="block text-xs font-extrabold text-foreground">{content.stat_certified_lbl}</span>
            <span className="block text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">{content.stat_certified_desc}</span>
          </div>
        </div>
      </section>

      {/* 4. GROWTH & EXPANSION TIMELINE PREVIEW */}
      <section className="py-20 bg-muted/30 text-foreground border-y border-border/20 overflow-hidden relative">
        <div className="container mx-auto max-w-5xl px-6 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {isRTL ? "25 عاماً من النمو والتوسع" : "25 Years of Growth"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white tracking-tight">
              {isRTL ? "مخطط مسيرتنا الزمنية" : "Growth & Expansion Timeline"}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              {isRTL 
                ? "بناء القدرات، توسيع نطاق الوصول، تقديم النتائج - محطات بارزة تحدد نجاح سيجما المتواصل." 
                : "Building capability, expanding reach, delivering results — milestones that define our success."}
            </p>
          </div>

          {/* Timeline Image Container */}
          <div className="my-10 overflow-hidden rounded-3xl bg-white border border-border/30 p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 max-w-4xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Sigma%20website/time%20line.png"
              alt="Growth Timeline Chart"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>

          <div className="pt-2">
            <a href={`/${lang}/timeline`}>
              <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white font-bold cursor-pointer h-12 px-8 rounded-xl text-xs shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
                {isRTL ? "تصفح المخطط الزمني التفاعلي بالكامل" : "View Full Growth Timeline"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 5. KEY SERVICES SUMMARY */}
      <section className="py-20 md:py-28 bg-background border-b border-border/10">
        <div className="container mx-auto max-w-5xl px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "مرافق وخدمات فنية" : "Our Services & Expertise"}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white">
              {isRTL ? "حلول متكاملة لحقول النفط" : "End-to-End Oilfield Solutions"}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-medium">
              {isRTL
                ? "مصممة لتحقيق النتائج - بدءاً من مرافق الإنتاج المبكر واختبار الآبار إلى التحسين، وكفاءة الطاقة، وتعزيز الإنتاج."
                : "Engineered for results — from early production facilities and well testing to optimization, energy efficiency, and production enhancement."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((srv, i) => (
              <Card key={i} className="border-border/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden rounded-3xl bg-card transform hover:-translate-y-1">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={srv.img}
                      alt={srv.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                    
                    {/* Floating overlapping icon badge */}
                    <div className="absolute top-4 start-4 h-10 w-10 rounded-full bg-card border border-border/40 shadow-lg flex items-center justify-center z-10">
                      {getServiceIcon(i)}
                    </div>
                  </div>
                  <CardContent className="pt-5 space-y-3 px-6">
                    <h3 className="font-extrabold text-base text-[#003366] dark:text-white leading-snug">{srv.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed min-h-[72px] font-medium">{srv.desc}</p>
                  </CardContent>
                </div>
                <CardFooter className="pb-5 px-6 pt-2">
                  <a href={`/${lang}/services`} className="w-full">
                    <Button variant="ghost" className="w-full justify-between p-0 hover:bg-transparent text-[#E61C24] font-bold group cursor-pointer text-xs">
                      <span>{isRTL ? "اقرأ المزيد" : "Learn More"}</span>
                      {isRTL ? (
                        <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1.5 transition-transform" />
                      ) : (
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                      )}
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center pt-4">
            <a href={`/${lang}/services`}>
              <Button className="bg-[#003366] hover:bg-[#003366]/95 text-white font-bold cursor-pointer h-12 px-8 rounded-xl text-xs shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
                {isRTL ? "عرض جميع الخدمات الفنية بالتفصيل" : "View All Technical Services"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 6. WHY SIGMA SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#080d16] dark:to-[#02050a] text-white border-y border-white/5 relative overflow-hidden">
        {/* Abstract floating glowing background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
        
        <div className="container mx-auto max-w-5xl px-6 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {isRTL ? "التميز التشغيلي للخدمات البترولية" : "Why Choose Us"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {content.why_title}
            </h2>
            <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
              {isRTL ? content.why_subtitle_ar : content.why_subtitle}
            </p>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light">
              {content.why_desc}
            </p>
          </div>

          {/* Grid of 8 Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.why_points.map((pt, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-primary/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-white/5 w-fit border border-white/10 text-primary">
                    {i === 0 ? <Zap className="h-5 w-5" /> :
                     i === 1 ? <Award className="h-5 w-5" /> :
                     i === 2 ? <Layers className="h-5 w-5" /> :
                     i === 3 ? <Briefcase className="h-5 w-5" /> :
                     i === 4 ? <Maximize className="h-5 w-5" /> :
                     i === 5 ? <FileText className="h-5 w-5" /> :
                     i === 6 ? <ShieldCheck className="h-5 w-5" /> :
                     <Heart className="h-5 w-5" />}
                  </div>
                  <h3 className="font-extrabold text-sm md:text-base text-white leading-snug">{pt.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Callout Quote */}
          <div className="relative p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm max-w-3xl mx-auto text-center border-l-4 border-l-primary shadow-lg rtl:border-l-0 rtl:border-r-4 rtl:border-r-primary">
            <p className="text-sm md:text-base font-semibold italic text-zinc-100 leading-relaxed">
              "{content.why_quote}"
            </p>
          </div>

        </div>
      </section>

      {/* 7. LANDMARK PROJECTS SECTION */}
      <section className="py-24 bg-background border-b border-border/10 overflow-hidden relative">
        <div className="container mx-auto max-w-5xl px-6 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{content.projects_badge}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white leading-tight">
              {isRTL ? "مشاريع كبرى موثوقة من قادة الصناعة" : "Landmark Projects & Case Studies"}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-medium">
              {content.projects_desc}
            </p>
          </div>

          {/* Cards Container */}
          <div className="space-y-8">
            {/* Top row: 2 cards side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.projects_list.slice(0, 2).map((proj, i) => (
                <Card key={i} className="border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 overflow-hidden rounded-3xl bg-card flex flex-col justify-between transform hover:-translate-y-1">
                  <div>
                    <div className="relative h-60 w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proj.img}
                        alt={proj.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 start-4 text-white">
                        <span className="text-[10px] font-black uppercase bg-primary px-3 py-1 rounded-full">{isRTL ? "منشأة رئيسية" : "Landmark Project"}</span>
                      </div>
                    </div>
                    <CardContent className="pt-6 space-y-5 px-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-muted-foreground tracking-wider uppercase">{proj.subtitle}</span>
                        <h3 className="font-extrabold text-lg md:text-xl text-[#003366] dark:text-white leading-snug">{proj.title}</h3>
                      </div>
                      
                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-2 border-t border-border/10 pt-4 text-center">
                        {proj.stats.map((st, j) => (
                          <div key={j} className="space-y-1">
                            <span className="block text-base md:text-lg font-black text-primary leading-none">{st.num}</span>
                            <span className="block text-[9px] font-extrabold text-foreground leading-none">{st.unit}</span>
                            <span className="block text-[8px] text-muted-foreground font-semibold uppercase tracking-wider">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                  
                  <CardFooter className="pb-6 px-6 pt-0">
                    <p className="text-xs text-muted-foreground italic border-t border-border/10 pt-3.5 w-full text-center">
                      {proj.tagline}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Bottom row: 1 card centered */}
            <div className="flex justify-center">
              <div className="w-full md:w-1/2">
                {content.projects_list.slice(2, 3).map((proj, i) => (
                  <Card key={i} className="border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 overflow-hidden rounded-3xl bg-card flex flex-col justify-between transform hover:-translate-y-1">
                    <div>
                      <div className="relative h-60 w-full overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={proj.img}
                          alt={proj.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 start-4 text-white">
                          <span className="text-[10px] font-black uppercase bg-primary px-3 py-1 rounded-full">{isRTL ? "تشغيل وصيانة" : "Long-term O&M"}</span>
                        </div>
                      </div>
                      <CardContent className="pt-6 space-y-5 px-6">
                        <div className="space-y-1">
                          <span className="text-[10px] font-extrabold text-muted-foreground tracking-wider uppercase">{proj.subtitle}</span>
                          <h3 className="font-extrabold text-lg md:text-xl text-[#003366] dark:text-white leading-snug">{proj.title}</h3>
                        </div>
                        
                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-2 border-t border-border/10 pt-4 text-center">
                          {proj.stats.map((st, j) => (
                            <div key={j} className="space-y-1">
                              <span className="block text-base md:text-lg font-black text-primary leading-none">{st.num}</span>
                              <span className="block text-[9px] font-extrabold text-foreground leading-none">{st.unit}</span>
                              <span className="block text-[8px] text-muted-foreground font-semibold uppercase tracking-wider">{st.label}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                    
                    <CardFooter className="pb-6 px-6 pt-0">
                      <p className="text-xs text-muted-foreground italic border-t border-border/10 pt-3.5 w-full text-center">
                        {proj.tagline}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. VALUES & CERTIFICATIONS SECTION */}
      <section className="py-24 bg-muted/20 border-t border-border/20 overflow-hidden relative">
        <div className="container mx-auto max-w-5xl px-6 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{content.certs_badge}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white leading-tight">
              {content.certs_section_title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-medium">
              {content.certs_section_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Certifications Stack (2/5 Columns) */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-extrabold text-sm text-[#003366] dark:text-white uppercase tracking-wider border-b border-border/20 pb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {isRTL ? "الشهادات والاعتمادات العالمية" : "Global ISO Certifications"}
              </h3>
              <div className="space-y-4">
                {content.certs_list_new.map((cert, i) => (
                  <Card key={i} className="border-border/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-2xl bg-card overflow-hidden">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs border border-primary/20 shadow-sm">
                        ISO
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-primary uppercase tracking-wider">{cert.code}</span>
                        <h4 className="font-extrabold text-sm text-[#003366] dark:text-white leading-none">{cert.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed pt-1 font-medium">{cert.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Our Values Grid (3/5 Columns) */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="font-extrabold text-sm text-[#003366] dark:text-white uppercase tracking-wider border-b border-border/20 pb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {isRTL ? "مبادئنا وقيمنا الأساسية" : "Our Core Operating Values"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.values_list.map((val, i) => (
                  <Card key={i} className="border-border/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-2xl bg-card">
                    <CardContent className="p-6 space-y-4">
                      <div className="p-2.5 rounded-xl bg-muted/65 w-fit text-primary border border-border/20 shadow-sm">
                        {i === 0 ? <Clock className="h-4.5 w-4.5" /> :
                         i === 1 ? <Sparkles className="h-4.5 w-4.5" /> :
                         i === 2 ? <Globe className="h-4.5 w-4.5" /> :
                         <Zap className="h-4.5 w-4.5" />}
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-extrabold text-sm text-[#003366] dark:text-white leading-snug">{val.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">{val.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* Full Certifications Detail Button */}
          <div className="text-center pt-4">
            <a href={`/${lang}/certifications`}>
              <Button className="bg-[#003366] hover:bg-[#003366]/95 text-white font-bold cursor-pointer h-12 px-8 rounded-xl text-xs shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
                {isRTL ? "تصفح الجودة والامتثال بالكامل" : "View ISO Certifications"}
              </Button>
            </a>
          </div>

        </div>
      </section>

      {/* 8. GLOBAL PRESENCE QUICK SECTION */}
      <section className="py-24 bg-background border-b border-border/10">
        <div className="container mx-auto max-w-5xl px-6 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "التواجد الجغرافي العالمي" : "Global Presence"}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white leading-tight">
              {isRTL ? "مواقعنا وتغطيتنا في الأسواق المتنوعة" : "Proven Delivery Across Diverse Markets"}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-medium">
              {isRTL 
                ? "تتمتع سيجما بحضور تشغيلي قوي في منطقة الشرق الأوسط وأفريقيا، وتقدم حلولاً مخصصة في ظل ظروف تعاقدية وبيئية وتشريعية متنوعة."
                : "With a strong operational presence across the MENA region and Africa, delivering under diverse conditions, regulatory frameworks, and project scales."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Interactive Real MENA Map (3/5 Columns) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="p-4 rounded-2xl bg-card border border-border/30 flex items-center justify-between shadow-sm">
                <span className="text-xs font-extrabold text-[#003366] dark:text-white">
                  {isRTL ? "خريطة التواجد الإقليمي لسيجما" : "Sigma Petroleum Services — Regional Presence Map"}
                </span>
                <div className="flex gap-1">
                  {MAP_COUNTRIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCountry(c.name)}
                      className={`h-7 w-7 rounded-full text-sm flex items-center justify-center border transition-all duration-200 cursor-pointer ${selectedCountry === c.name ? "bg-primary border-primary text-white scale-110 shadow-sm" : "bg-muted/50 border-border/40 hover:bg-muted text-foreground"}`}
                      title={isRTL ? c.nameAr : c.name}
                    >
                      {c.flag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real MENA Map */}
              <div className="relative overflow-hidden rounded-[32px] border border-border/30 bg-[#f0f4f8] dark:bg-[#0a1628] w-full h-[380px] md:h-[440px] shadow-inner">
                <MenaMap
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                  isRTL={isRTL}
                />
                {/* Legend overlay */}
                <div className="absolute bottom-4 end-4 bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border/30 text-[9px] font-black text-muted-foreground flex items-center gap-4 select-none pointer-events-none shadow-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#003366]" />
                    {isRTL ? "فروع سيجما" : "Sigma Offices"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#E61C24]" />
                    {isRTL ? "الدولة المحددة" : "Selected"}
                  </span>
                  <span className="text-muted-foreground/50">|</span>
                  <span>{isRTL ? "اضغط على الدولة · سكرول للتكبير" : "Click Country · Scroll to Zoom"}</span>
                </div>
              </div>
            </div>

            {/* Offices & Operations Info Panel (2/5 Columns) */}
            <div className="lg:col-span-2 space-y-6">
              {(() => {
                const activeCountryObj = MAP_COUNTRIES.find((c) => c.name === selectedCountry) || MAP_COUNTRIES[0];
                return (
                  <div className="p-6 rounded-[32px] border border-border/30 bg-card space-y-5 shadow-lg">
                    <div className="flex items-center gap-3 border-b border-border/10 pb-4.5">
                      <span className="text-3xl">{activeCountryObj.flag}</span>
                      <div>
                        <h4 className="font-extrabold text-lg text-[#003366] dark:text-white leading-none">
                          {isRTL ? activeCountryObj.nameAr : activeCountryObj.name}
                        </h4>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mt-1">
                          {isRTL ? "المكاتب والعمليات المحلية" : "Local Offices & Operations"}
                        </span>
                      </div>
                    </div>

                    {activeCountryObj.offices.length > 0 ? (
                      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                        {activeCountryObj.offices.map((off, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-muted/40 border border-border/20 space-y-3.5 transition-all hover:bg-muted/60">
                            <div>
                              <span className="text-[9px] font-black text-primary tracking-wider uppercase">{isRTL ? off.cityAr : off.city}</span>
                              <h5 className="font-extrabold text-sm text-[#003366] dark:text-white">{isRTL ? off.nameAr : off.name}</h5>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2 font-medium">
                              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{isRTL ? off.addrAr : off.addr}</span>
                            </p>
                            <p className="text-xs font-bold text-foreground flex items-center gap-2 border-t border-border/10 pt-2.5">
                              <Phone className="h-4 w-4 text-primary" />
                              <a href={`tel:${off.phone}`} className="hover:underline hover:text-primary transition-colors" dir="ltr">{off.phone}</a>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 rounded-2xl border border-dashed border-border/40 text-center space-y-3 bg-muted/10">
                        <Sparkles className="h-6 w-6 text-[#E61C24] mx-auto opacity-80" />
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto font-medium">
                          {isRTL 
                            ? "تعمل سيجما في هذا السوق عبر عقود نشر مباشرة للمعدات والفرق الفنية، بالإضافة إلى شراكات مع كبار المشغلين في المنطقة."
                            : "Sigma operates in this market through direct mobilization of equipment and technical teams under field contracts and operator partnerships."}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

          </div>
        </div>
      </section>

            {/* 9.5 OUR CLIENTS SECTION */}
      <section className="py-20 bg-background border-t border-border/30 relative">
        <div className="container mx-auto max-w-5xl px-6 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {isRTL ? "عملائنا" : "OUR CLIENTS"}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
              {isRTL ? "شركاء النجاح في قطاع الطاقة" : "Our Trusted Energy Partners"}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-light">
              {isRTL 
                ? "نفخر بخدمة كبار مشغلي النفط والغاز والمشروعات المشتركة والشركات الوطنية."
                : "Proudly serving leading oil & gas operators, joint ventures, and national energy corporations."}
            </p>
          </div>

          {/* Logo List Image Frame */}
          <div className="bg-card p-6 md:p-8 rounded-[32px] border border-border/30 shadow-xl max-w-4xl mx-auto flex items-center justify-center bg-white dark:bg-zinc-950/20">
            <div className="relative overflow-hidden rounded-2xl border border-border/10 w-full max-w-3xl mx-auto bg-white p-4 md:p-6 flex items-center justify-center shadow-inner group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/Sigma website/Client list logos/Client list logos copy.png" 
                alt="Sigma Clients List" 
                className="max-h-[380px] w-full object-contain rounded-xl hover:scale-102 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </section>


      {/* 10. CONTACT US FORM SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#080d16] dark:to-[#02050a] text-white border-t border-white/5 relative overflow-hidden">
        {/* Floating background glowing blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E61C24]/5 blur-[130px] pointer-events-none -z-10" />
        
        <div className="container mx-auto max-w-5xl px-6 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "اتصل بنا" : "Contact Us"}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {isRTL ? "جاهز للارتقاء بمشروعاتك؟" : "Ready to Elevate Your Projects?"}
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-xl mx-auto font-light">
              {isRTL 
                ? "انضم إلينا واختبر فرق سيجما - الابتكار والثقة والتميز في الخدمة."
                : "Join us and experience the Sigma difference — innovation, trust, and excellence delivered."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Info Card (2/5 size) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">{isRTL ? "تواصل معنا" : "Get in Touch"}</h3>
                <span className="text-xs text-zinc-400 block">{isRTL ? "معلومات الاتصال المباشر" : "Direct Contact Channels"}</span>
              </div>

              <div className="space-y-5 text-xs md:text-sm font-light">
                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-black text-white text-[10px] uppercase tracking-wider">{isRTL ? "المقر الرئيسي" : "Alexandria Headquarters"}</span>
                    <span className="block text-zinc-300 leading-relaxed font-medium">{isRTL ? "المنطقة الحرة العامة، العامرية، الإسكندرية، مصر" : "General Free Zone, Amreya, Alexandria, Egypt"}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-black text-white text-[10px] uppercase tracking-wider">{isRTL ? "رقم الهاتف" : "Telephone"}</span>
                    <a href="tel:+2034812620" className="block text-zinc-300 hover:text-white transition-colors font-medium" dir="ltr">+20 3 481 2620</a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary shrink-0">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-black text-white text-[10px] uppercase tracking-wider">{isRTL ? "الموقع الإلكتروني" : "Website"}</span>
                    <a href="https://sigmagroupegypt.com" target="_blank" rel="noopener noreferrer" className="block text-zinc-300 hover:text-white transition-colors font-medium">
                      sigmagroupegypt.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Geographical Presence Area info */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">{isRTL ? "العمليات عبر الشرق الأوسط وأفريقيا" : "Operations Across MENA & Africa"}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {isRTL
                    ? "مصر · المملكة العربية السعودية · سلطنة عمان · ليبيا · سوريا"
                    : "Egypt · Saudi Arabia · Oman · Libya · Syria"}
                </p>
              </div>
            </div>

            {/* Form Card (3/5 size) */}
            <div className="lg:col-span-3">
              <Card className="border-white/10 bg-white/[0.02] backdrop-blur-sm text-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="text-xs font-bold text-zinc-300">{isRTL ? "الاسم الكامل" : "Full Name"}</label>
                      <input
                        id="form-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isRTL ? "اسمك الكريم" : "Your name"}
                        className="flex w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm shadow-inner placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-start text-white transition-all focus:bg-white/10"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="text-xs font-bold text-zinc-300">{isRTL ? "البريد الإلكتروني" : "Email"}</label>
                      <input
                        id="form-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="flex w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm shadow-inner placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-start text-white transition-all focus:bg-white/10"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label htmlFor="form-company" className="text-xs font-bold text-zinc-300">{isRTL ? "الشركة" : "Company"}</label>
                    <input
                      id="form-company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={isRTL ? "اسم شركتك" : "Your company"}
                      className="flex w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm shadow-inner placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-start text-white transition-all focus:bg-white/10"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="text-xs font-bold text-zinc-300">{isRTL ? "نص الرسالة" : "Message"}</label>
                    <textarea
                      id="form-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isRTL ? "أخبرنا عن تفاصيل مشروعك أو استفسارك..." : "Tell us about your project or inquiry..."}
                      className="flex w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm shadow-inner placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-start text-white transition-all focus:bg-white/10"
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-[#E61C24] hover:bg-[#E61C24]/90 text-white font-extrabold cursor-pointer gap-2 h-12 rounded-xl shadow-lg transition-all duration-200 text-xs">
                    {loading ? (isRTL ? "جاري الإرسال..." : "Sending...") : (
                      <>
                        <Send className="h-4 w-4" />
                        {isRTL ? "إرسال الرسالة" : "Send Message"}
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop Close */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsVideoModalOpen(false)} />
          
          <div className="relative w-full max-w-4xl bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/40" dir="ltr">
              <span className="font-bold text-xs md:text-sm text-foreground">
                {content.cta_watch_video}
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="h-7 w-7 rounded-full bg-muted border border-border/40 hover:bg-muted/80 flex items-center justify-center cursor-pointer text-foreground font-bold"
              >
                ✕
              </button>
            </div>
            
            {/* Video container */}
            <div className="aspect-video bg-black flex items-center justify-center">
              <video src="/Sigma%20website/sigma%20video.mp4" controls autoPlay className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
