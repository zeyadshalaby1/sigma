"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Flame,
  Zap,
  Gauge,
  Droplet,
  Settings2,
  FolderSync,
  Wrench,
  Clock,
  CheckCircle2,
  Cpu
} from "lucide-react";

export default function ServicesPage({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  const isRTL = lang === "ar";

  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: "epf",
      icon: FolderSync,
      title: isRTL ? "مرافق الإنتاج المبكر (EPF)" : "Early Production Facilities",
      desc: isRTL 
        ? "مرافق إنتاج مبكر سريعة التتبع ومرنة لتبدأ التدفقات النقدية والإنتاج بسرعة." 
        : "Fast-track and flexible production facilities to accelerate early cash flow and fields monetization.",
      details: {
        headline: isRTL ? "تسريع نجاح حقول النفط الخاصة بك" : "Accelerate Your Oilfield Success",
        content1: isRTL
          ? "في سيجما للخدمات البترولية، نعيد تعريف حلول مرافق الإنتاج منذ عام 2001. كشريك موثوق لتقديم أنظمة سريعة التتبع وفعالة من حيث التكلفة، نقدم حلول تسليم المفتاح على أساس التأجير والتشغيل والصيانة (Lease, Operate & Maintain) المصممة للمشاريع قصيرة وطويلة الأجل."
          : "At Sigma Petroleum Services, we've been redefining production facility solutions since 2001. As a trusted leader in delivering fast-track, cost-efficient systems, we offer turnkey solutions on a lease, operate, and maintain basis tailored to short- and long-term projects.",
        stats: [
          { val: "7–21 Days", label: isRTL ? "نشر وتجهيز مرافق النفط" : "Oil Facilities Deployment" },
          { val: "4 Months", label: isRTL ? "نشر وتجهيز مرافق الغاز" : "Gas Facilities Deployment" },
          { val: isRTL ? "تأجير وتشغيل وصيانة" : "Lease, Operate & Maintain", label: isRTL ? "نموذج التعاقد" : "Contract Model" }
        ],
        benefits: isRTL 
          ? [
              "تدفق نقدي مبكر: تتبع سريع لتوليد الإيرادات الخاصة بك.",
              "الحد الأدنى من التكاليف المسبقة: الحفاظ على رأس المال الخاص بك مع خيارات التأجير الفعالة.",
              "سرعة وموثوقية لا مثيل لها: مشاريع يتم تسليمها بسجل حافل من الجداول الزمنية المنافسة.",
              "مرونة معيارية: تضمن التصميمات مسبقة الصنع إمكانية التعديل والتطوير مع تغير متطلباتك التشغيلية."
            ]
          : [
              "Early Cash Flow: Fast-track your revenue generation.",
              "Minimal Upfront Costs: Preserve your capital with efficient leasing options.",
              "Unmatched Speed and Reliability: Projects delivered with a track record of unrivaled timelines.",
              "Modular Flexibility: Prefabricated designs ensure production optimization as needs evolve."
            ]
      }
    },
    {
      id: "gas-treatment",
      icon: Flame,
      title: isRTL ? "أنظمة معالجة الغاز" : "Gas Treatment Systems",
      desc: isRTL 
        ? "معالجة تدفقات الغاز بكفاءة عالية لتلبية أصعب شروط الجودة والمواصفات." 
        : "Process associated and non-associated gas streams to meet strict pipeline-quality specifications.",
      details: {
        headline: isRTL ? "غاز بمواصفات مطابقة للشروط في الوقت المحدد" : "Pipeline-Quality Gas On Time .. Every Time.",
        content1: isRTL
          ? "تتمتع سيجما بخبرة واسعة في التسليم الكامل لمحطات معالجة الغاز المعيارية من الهندسة والتوريد إلى التركيب والتشغيل والصيانة لحقول النفط والغاز. تم تصميم حلولنا هندسيًا لمعالجة غاز الضغط العالي، التراكيب المتغيرة، المحتويات العالية من CO₂ وغيرها."
          : "Sigma Petroleum Services brings extensive experience in the end-to-end delivery of modular gas treatment plants from engineering and supply to installation, commissioning, and operation. Our solutions are engineered to reliably process both associated and non-associated gas streams across the most demanding conditions.",
        stats: [
          { val: "10 MMSCFD", label: isRTL ? "الإنتاج المبكر / الصغير" : "Small-Scale / Early Production" },
          { val: "60-120 MMSCFD", label: isRTL ? "المعالجة متوسطة المدى" : "Mid-Range Processing" },
          { val: "180-360 MMSCFD", label: isRTL ? "المعالجة الكبيرة المركزية" : "Large-Scale Central Processing" }
        ],
        benefits: isRTL
          ? [
              "نشر سريع مع حد أدنى من البصمة المساحية في الموقع.",
              "سهولة النقل إلى المواقع البعيدة أو المقيدة.",
              "تقليل الأعمال المدنية وسرعة التعبئة والنشر.",
              "توسيع الطاقة الاستيعابية تدريجياً مع تطور الحقل."
            ]
          : [
              "Rapid deployment with minimal site footprint.",
              "Easy transportation to remote or constrained locations.",
              "Reduced civil works and faster mobilization.",
              "Flexible, phased capacity expansion as your field evolves."
            ]
      }
    },
    {
      id: "well-testing",
      icon: Activity,
      title: isRTL ? "خدمات اختبار الآبار" : "Well Testing Services",
      desc: isRTL 
        ? "فهم سلوك المكامن وتحسين أداء الإنتاج باستخدام أحدث وحدات الاختبار." 
        : "Understand reservoir behavior and optimize production performance using state-of-the-art mobile units.",
      details: {
        headline: isRTL ? "بيانات دقيقة .. قرارات أذكى .. أداء مثبت" : "Precision Data .. Smarter Decisions .. Proven Performance.",
        content1: isRTL
          ? "اختبار الآبار في سيجما هو أداة بالغة الأهمية لفهم سلوك المكامن وتحسين أداء الإنتاج. مع أكثر من 24 عاماً من الخبرة التشغيلية، نقدم خدمات اختبار متكاملة للأحمال العالية والظروف الصعبة والمواقع البعيدة."
          : "At SIGMA, well testing is more than a service — it is a critical tool for understanding reservoir behavior, optimizing production performance, and enabling smarter field development decisions. With over 24 years of operational experience.",
        stats: [
          { val: "20+", label: isRTL ? "وحدات اختبار متنقلة" : "Mobile Test Units" },
          { val: "24+ Years", label: isRTL ? "خبرة تشغيلية" : "Operational Experience" },
          { val: "SCADA / Real-time", label: isRTL ? "نظام البيانات والمراقبة" : "Data & Monitoring System" }
        ],
        benefits: isRTL
          ? [
              "دقة وسرعة اختبار عالية باستخدام أحدث الأجهزة والمعدات.",
              "أسطول معدات متقدم يتحمل الضغط العالي والخدمات الحامضية.",
              "مراقبة فورا من خلال بوابات إلكترونية آمنة وتكامل مع أنظمة SCADA.",
              "فريق عمل متعدد التخصصات يقدم استشارات وحلولاً مصممة لكل حقل."
            ]
          : [
              "Efficient & Accurate Testing — Advanced methodologies and proven field practices.",
              "Advanced Equipment Fleet — High-pressure and sour service systems to trailer-mounted testing units.",
              "Real-Time Data Access — Secure online portals, advanced SCADA integration.",
              "Expertise You Can Trust — Multidisciplinary specialists develop tailored testing solutions."
            ]
      }
    },
    {
      id: "water-treatment",
      icon: Droplet,
      title: isRTL ? "معالجة وإعادة حقن المياه" : "Water Treatment & Reinjection",
      desc: isRTL 
        ? "تحويل تحدي المياه المنتجة إلى أصل استراتيجي لدعم ضغط المكامن وتعزيز استخراج النفط." 
        : "Transform produced water into a strategic reservoir asset for pressure support and enhanced oil recovery.",
      details: {
        headline: isRTL ? "تحويل المياه المنتجة إلى قيمة استدامة للمكمن" : "Transforming Produced Water into Sustainable Reservoir Value",
        content1: isRTL
          ? "نحول المياه المنتجة من تحد تشغيلي وبيئي إلى أصل استراتيجي من خلال أنظمة المعالجة وإعادة الحقن المتقدمة لتعزيز استخلاص النفط (EOR). أنظمتنا المعيارية مصممة لمعالجة ما يصل إلى 10,000 برميل يومياً بكفاءة تتجاوز 95%."
          : "SIGMA transforms produced water from an operational challenge into a strategic reservoir asset through advanced Produced Water Treatment and Reinjection Systems engineered for Enhanced Oil Recovery (EOR). Our modular systems process up to 10,000 BBL/day with efficiencies >95%.",
        stats: [
          { val: "Up to 10k BBL/d", label: isRTL ? "الطاقة الاستيعابية للمعالجة" : "Processing Capacity" },
          { val: ">95%", label: isRTL ? "كفاءة المعالجة" : "Treatment Efficiency" },
          { val: "3 Weeks", label: isRTL ? "وقت التركيب والتشغيل" : "Installation & Commissioning" }
        ],
        benefits: isRTL
          ? [
              "زيادة كفاءة إعادة الاستخدام وحقن المياه لتعزيز الضغط.",
              "تقليل التكاليف التشغيلية وتقليل الاعتماد على المياه العذبة.",
              "تقليل انبعاثات الكربون بما يعادل 3,500 طن سنوياً لكل مشروع.",
              "نظام معياري سهل النشر والنقل وسريع الاستجابة للظروف المتغيرة."
            ]
          : [
              "Maximize water reuse and injection efficiency.",
              "Enhance reservoir pressure support and recovery factors.",
              "Reduce operational costs and freshwater dependency.",
              "Reduce CO₂ equivalent emissions by ~3,500 tons/year per project."
            ]
      }
    },
    {
      id: "gas-compression",
      icon: Settings2,
      title: isRTL ? "حلول ضغط الغاز" : "Gas Compression Solutions",
      desc: isRTL 
        ? "التقليل من فترات توقف الضواغط وحماية الأرباح من خلال أسطول متاح فورا." 
        : "Maximize uptime and protect revenue with one of the region's largest readily available compressor fleets.",
      details: {
        headline: isRTL ? "استمرارية التشغيل تضمن استقرار الأرباح" : "Uptime Drives Production. Reliability Protects Revenue.",
        content1: isRTL
          ? "نحن نوفر حلول ضغط غاز سريعة التعبئة مصممة لضمان استمرارية الإنتاج وتدفق المكامن بأقصى كفاءة. نمتلك أحد أكبر الأساطيل المتاحة فوراً في المنطقة بقدرات تتراوح بين 500 و 2,000 حصان من أشهر الماركات العالمية."
          : "SIGMA provides rapid-deployment Gas Compression Solutions engineered to maximize uptime and optimize production performance. Backed by one of the region's largest readily available compression equipment fleets (500–2,000 HP).",
        stats: [
          { val: ">98%", label: isRTL ? "جاهزية تشغيلية مستمرة" : "Operational Availability" },
          { val: "500-2,000 HP", label: isRTL ? "نطاق قوة المحركات" : "Power Range" },
          { val: "40+ VRUs", label: isRTL ? "وحدات استعادة البخار في المخزن" : "VRU Packages in Stock" }
        ],
        benefits: isRTL
          ? [
              "تسريع بدء الإنتاج من خلال التوفر الفوري للمعدات والضواغط.",
              "إلغاء أوقات التوريد الطويلة والانتظار للاستيراد.",
              "إمكانية زيادة القدرة التشغيلية تدريجياً مع تطور الحقل.",
              "تقليل المخاطر وفترات التعطل بدعم فني متاح على مدار الساعة."
            ]
          : [
              "Accelerate production startup through immediate equipment availability.",
              "Eliminate lengthy manufacturing and procurement lead times.",
              "Scale compression capacity as reservoir conditions evolve.",
              "Minimize downtime risk with dedicated field service teams."
            ]
      }
    },
    {
      id: "flare-recovery",
      icon: Flame,
      title: isRTL ? "استعادة الغاز المحترق" : "Flared Gas Recovery",
      desc: isRTL 
        ? "تقليل الحرق الروتيني للغاز وتحويل الانبعاثات إلى قيمة استثمارية وحماية للبيئة." 
        : "Minimize routine flaring and convert wasted gases into valuable, monetizable production streams.",
      details: {
        headline: isRTL ? "تحويل الغاز المهدر إلى طاقة وقيمة بيئية" : "Turning Wasted Gas into Revenue and Environmental Value",
        content1: isRTL
          ? "تساعد سيجما المشغلين على تقليل الحرق الروتيني للغاز من خلال حلول استعادة ومعالجة متكاملة. يساهم ذلك في خفض انبعاثات الكربون وتقليل استهلاك وقود الديزل في الموقع، بالإضافة إلى استخلاص السوائل القيمة والمكثفات."
          : "At SIGMA, we deliver integrated Flared Gas Recovery Solutions that enable operators to minimize routine flaring and transform wasted gas into valuable, monetizable production streams, preventing emissions and reducing costs.",
        stats: [
          { val: "Up to 30 MMSCFD", label: isRTL ? "سعة الموقع الواحد" : "Per-Site Handling Capacity" },
          { val: "180k tons CO₂e", label: isRTL ? "تقليل الانبعاثات (مشروع 3 سنوات)" : "CO₂ Reduction (3yr project)" },
          { val: "EPC + O&M", label: isRTL ? "نموذج التسليم الكامل" : "Delivery Model" }
        ],
        benefits: isRTL
          ? [
              "التقاط ومعالجة وضغط غاز الشعلة بأمان تام.",
              "التكامل السلس مع العمليات القائمة بأقل قدر من التدخل التشغيلي.",
              "استخدامات مرنة: توليد الكهرباء، أو معالجة الغاز، أو التصدير للشبكة.",
              "نجاح مثبت: تقليل انبعاثات شركة خالدة للبترول بمقدار 180 ألف طن CO₂."
            ]
          : [
              "Safely capture, compress, and manage flare gas.",
              "Seamless integration into existing operations with minimal disruption.",
              "Flexible utilization pathways: power generation, gas processing, or export.",
              "Proven performance: 180,000 tons CO₂e prevented at Khalda Petroleum project."
            ]
      }
    },
    {
      id: "gas-power",
      icon: Zap,
      title: isRTL ? "حلول تحويل الغاز إلى كهرباء" : "Gas-to-Power Solutions",
      desc: isRTL 
        ? "تحويل الغاز المصاحب أو غاز الشعلة إلى طاقة كهربائية مستدامة لتغذية الحقول." 
        : "Convert underutilized associated or flared gas into a reliable on-site electrical power source.",
      details: {
        headline: isRTL ? "من الغاز المهدر إلى طاقة يعتمد عليها" : "From Stranded Gas to Reliable Power.",
        content1: isRTL
          ? "نحن نقوم بتحويل الغاز المصاحب والشعلة إلى طاقة كهربائية تدعم الحقول والعمليات وتلغي تماماً الاعتماد على الديزل المكلف والملوث للبيئة. يشمل ذلك مرحلة المعالجة المسبقة للغاز لضمان مطابقته لمواصفات المولدات."
          : "At SIGMA, we transform associated and flared gas into dependable electrical power, enabling operators to unlock greater value from existing resources while reducing operating costs and diesel dependency.",
        stats: [
          { val: "540 MMSCFD Nidoco", label: isRTL ? "المشروع الرائد للغاز" : "Flagship Gas Feed Project" },
          { val: "CAT Gas Generators", label: isRTL ? "نوع المولدات المستخدمة" : "Generator Type" },
          { val: "NGL Recovery", label: isRTL ? "عوائد إضافية من استخلاص السوائل" : "NGL Recovery Revenue Stream" }
        ],
        benefits: isRTL
          ? [
              "توفير أنظمة معالجة وتهيئة الغاز المسبقة لحماية المولدات.",
              "توليد طاقة كهربائية عالية الكفاءة للمرافق ومحطات المعالجة.",
              "استخلاص سوائل الغاز الطبيعي (NGL) كعائد مادي إضافي للمشروع.",
              "الحد من الحرق الروتيني وخفض الغازات الدفيئة بشكل ملحوظ."
            ]
          : [
              "Gas pre-conditioning ensuring compliance with generator fuel specifications.",
              "High-efficiency gas generators for on-site production.",
              "NGL recovery during conditioning for additional revenue streams.",
              "Reduces routine flaring and lowers greenhouse gas emissions."
            ]
      }
    },
    {
      id: "pulling-units",
      icon: Wrench,
      title: isRTL ? "خدمات التدخل ووحدات السحب" : "Flash-By & Pulling Unit Services",
      desc: isRTL 
        ? "تنفيذ عمليات صيانة الآبار والتدخل السريع لتعزيز الإنتاج بأعلى درجات المرونة." 
        : "Rapid, safe, and efficient well intervention and workover operations with mobile pulling units.",
      details: {
        headline: isRTL ? "مصممة للتدخل السريع ومرونة الحركة" : "Engineered for Well Intervention. Built for Operational Agility.",
        content1: isRTL
          ? "توفر سيجما خدمات متكاملة لوحدات السحب والتدخل السريع في صيانة الآبار وتحسين الإنتاج عبر جميع مراحل دورة حياة البئر. نعتمد على حفارات صيانة الآبار المحمولة على شاحنات ثقيلة فائقة الحركة في البيئات الصحراوية والصعبة."
          : "When production performance depends on fast, safe, and efficient well intervention, SIGMA's Flash-By and Pulling Unit Services deliver a comprehensive solution across the full well lifecycle using heavy-duty mobile rigs.",
        stats: [
          { val: "Single/Double-Drum", label: isRTL ? "أنواع وحدات السحب" : "Unit Types" },
          { val: "API Compliant", label: isRTL ? "مطابقة المعايير العالمية" : "Standards Compliance" },
          { val: "Heavy-Duty Chassis", label: isRTL ? "قاعدة الشاحنات للصحراء" : "Chassis Build" }
        ],
        benefits: isRTL
          ? [
              "تعبئة ونشر سريع عبر المواقع الصحراوية والبعيدة.",
              "قدرات سحب ورفع متباينة لتناسب متطلبات كل بئر.",
              "تجهيز كامل بمعدات التحكم في الضغط وصمامات الأمان والمانيفولد.",
              "مطابقة كاملة لتوصيات المعهد الأمريكي للبترول API."
            ]
          : [
              "Rapid mobilization and deployment across desert and remote locations.",
              "Single & double-drum pulling units with varying capacities.",
              "Mast and drawworks systems, hydraulic winches, and weight indicators.",
              "Meets or exceeds applicable API recommendations."
            ]
      }
    },
    {
      id: "metering",
      icon: Gauge,
      title: isRTL ? "أنظمة القياس ونقل الملكية" : "Metering Systems & Custody Transfer",
      desc: isRTL 
        ? "ضمان النزاهة التجارية وحماية الإيرادات من خلال دقة قياس معتمدة ومطابقة للمواصفات." 
        : "Ensure commercial integrity and revenue protection through certified, highly accurate metering systems.",
      details: {
        headline: isRTL ? "دقة معتمدة .. ثقة تجارية .. حماية الإيرادات" : "Certified Accuracy.. Commercial Confidence.. Revenue Protection.",
        content1: isRTL
          ? "أنظمة القياس ونقل الملكية (Custody Transfer) من سيجما مصممة هندسياً لتقديم الدقة والشفافية التامة في المعاملات المالية للنفط والغاز. تتميز أنظمتنا بالدقة الفائقة وقابليتها للتكرار والمطابقة مع الشروط التنظيمية والبيئات القاسية."
          : "SIGMA's Metering Systems & Custody Transfer Solutions are engineered to deliver the precision, transparency, and confidence required for critical fiscal and operational custody transfer applications.",
        stats: [
          { val: "6-path, 3-level", label: isRTL ? "مسارات قياس الموجات فوق الصوتية" : "Ultrasonic Measurement Paths" },
          { val: "TR G13, OIML, TR G7", label: isRTL ? "الشهادات والاعتمادات" : "Certifications" },
          { val: "ERZ 2000", label: isRTL ? "كمبيوتر التدفق الذكي" : "Flow Computer Platform" }
        ],
        benefits: isRTL
          ? [
              "القدرة على القياس بدقة عند ضغط تشغيل يبدأ من 1 بار مطلق.",
              "حساسات متطورة من التيتانيوم المقاوم للأوساخ وقابل للاستبدال دون إعادة معايرة.",
              "كمبيوتر تدفق ERZ 2000 مدمج لتصحيح القراءة ومراقبة البيانات الفورية.",
              "معايرة كاملة واعتماد رسمي لعمليات نقل الملكية والبيع التجاري."
            ]
          : [
              "Operates at absolute pressure levels as low as 1 bar.",
              "Advanced multi-path ultrasonic measurement (6 paths across 3 levels).",
              "Robust dirt-repellent titanium sensors exchangeable without recalibration.",
              "Certified TR G13 / OIML for custody transfer applications."
            ]
      }
    }
  ];

  const serviceImages = {
    epf: "/Sigma%20website/Photos/Early%20Production%20Facilities/3.png",
    "gas-treatment": "/Sigma%20website/Photos/Gas%20Treatment%20Systems/3.png",
    "well-testing": "/Sigma%20website/Photos/Wel%20Testing%20Services/3.png",
    "water-treatment": "/Sigma%20website/Photos/Water%20Treatment/2.png",
    "gas-compression": "/Sigma%20website/Photos/Gas%20Compression/4.png",
    "flare-recovery": "/Sigma%20website/Photos/Flared%20Gas/1.png",
    "gas-to-power": "/Sigma%20website/Photos/Gas%20to%20Power/1.png",
    "pulling-unit": "/Sigma%20website/Photos/Flash%20By%20&%20Puling%20Unit/1.png",
    metering: "/Sigma%20website/Photos/Metering%20Systems/1.png"
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        {/* Pulsing glow blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "خدمات هندسية" : "OUR EXPERTISE"}</span>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
            {isRTL ? "خدماتنا وخبراتنا" : "Our Services & Expertise"}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {isRTL 
              ? "حلول متكاملة لهندسة وتشغيل حقول النفط والغاز - من المنشآت المؤقتة إلى معالجة الغاز وتحسين الآبار."
              : "End-to-End Oilfield Solutions engineered for results — from early production facilities to energy efficiency."}
          </p>
        </div>
      </div>

      {/* Main Container: 2-Column Tabs Layout */}
      <div className="container mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Sidebar Tabs */}
          <div className="space-y-2 lg:col-span-1">
            <h2 className="text-sm font-black text-muted-foreground uppercase tracking-wider px-3 mb-4">
              {isRTL ? "الخدمات التقنية" : "Technical Services"}
            </h2>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-3 lg:pb-0 scrollbar-none">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-3 rounded-full lg:rounded-2xl px-5 py-3.5 text-xs md:text-sm font-extrabold transition-all duration-300 cursor-pointer whitespace-nowrap lg:whitespace-normal text-start w-fit lg:w-full border ${
                      activeTab === index
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-card text-muted-foreground border-border/30 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${activeTab === index ? "text-white" : "text-primary"}`} />
                    <span className="truncate">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Tab Details */}
          <div className="lg:col-span-2">
            <Card className="border-border/30 shadow-xl overflow-hidden rounded-[32px] bg-card">
              {/* Cover Image of active service */}
              <div className="relative h-60 md:h-80 w-full overflow-hidden bg-muted group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={serviceImages[services[activeTab].id]} 
                  alt={services[activeTab].title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-4 start-4 text-[9px] font-black text-white bg-primary px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm select-none">
                  {isRTL ? "تشغيل معتمد" : "OPERATIONAL FIELD RECORD"}
                </span>
              </div>

              <CardHeader className="border-b border-border/20 bg-muted/30 p-6 md:p-8">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                    {React.createElement(services[activeTab].icon, { className: "h-5 w-5" })}
                  </div>
                  <CardTitle className="text-xl md:text-3xl font-extrabold text-[#003366] dark:text-white leading-tight">
                    {services[activeTab].title}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm font-bold text-muted-foreground">
                  {services[activeTab].details.headline}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-8 space-y-6">
                {/* Description */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
                  {services[activeTab].details.content1}
                </p>

                {/* Stat Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {services[activeTab].details.stats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-muted/40 border border-border/30 text-center space-y-1 hover:border-primary/20 transition-colors">
                      <span className="block text-base font-black text-primary truncate" title={stat.val}>
                        {stat.val}
                      </span>
                      <span className="block text-[10px] md:text-xs text-muted-foreground leading-normal font-semibold">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Benefits */}
                <div className="space-y-3 pt-5 border-t border-border/20">
                  <h3 className="text-xs font-bold text-[#003366] dark:text-white uppercase tracking-widest">
                    {isRTL ? "المزايا والفوائد الرئيسية" : "Key Benefits"}
                  </h3>
                  <ul className="space-y-3">
                    {services[activeTab].details.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground font-medium">
                        <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
