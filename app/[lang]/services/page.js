"use client";

import React, { useState, useEffect } from "react";
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
import { useParams } from "next/navigation";
import { mergeContent } from "@/lib/merge-content";

const serviceIcons = {
  "epf": FolderSync,
  "gas-treatment": Flame,
  "well-testing": Activity,
  "water-treatment": Droplet,
  "gas-compression": Cpu,
  "flare-recovery": Flame,
  "gas-to-power": Zap,
  "pulling-units": Wrench,
  "metering": Settings2
};

export default function ServicesPage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const [activeTab, setActiveTab] = useState(0);
  const [dbContent, setDbContent] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/page-content?key=services`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data[lang]) {
          setDbContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error loading services page content:", err));
  }, [lang]);

  const fallbackContent = {
    ar: {
      title: "خدماتنا وخبراتنا الفنية",
      subtitle: "حلول نفطية متكاملة لزيادة الأداء والكفاءة - من المنشآت المؤقتة إلى معالجة الغاز وتحسين الآبار.",
      services: [
        {
          id: "epf",
          title: "مرافق الإنتاج المبكر (EPF)",
          desc: "مرافق إنتاج مبكر سريعة التتبع ومرنة لتبدأ التدفقات النقدية والإنتاج بسرعة.",
          img: "/Sigma%20website/Photos/Early%20Production%20Facilities/3.png",
          details: {
            headline: "تسريع نجاح حقول النفط الخاصة بك",
            content1: "في سيجما للخدمات البترولية، نعيد تعريف حلول مرافق الإنتاج منذ عام 2001. كشريك موثوق لتقديم أنظمة سريعة التتبع وفعالة من حيث التكلفة، نقدم حلول تسليم المفتاح على أساس التأجير والتشغيل والصيانة (Lease, Operate & Maintain) المصممة للمشاريع قصيرة وطويلة الأجل.",
            stats: [
              { val: "7–21 Days", label: "نشر وتجهيز مرافق النفط" },
              { val: "4 Months", label: "نشر وتجهيز مرافق الغاز" },
              { val: "تأجير وتشغيل وصيانة", label: "نموذج التعاقد" }
            ],
            benefits: [
              "تدفق نقدي مبكر: تتبع سريع لتوليد الإيرادات الخاصة بك.",
              "الحد الأدنى من التكاليف المسبقة: الحفاظ على رأس المال الخاص بك مع خيارات التأجير الفعالة.",
              "سرعة وموثوقية لا مثيل لها: مشاريع يتم تسليمها بسجل حافل من الجداول الزمنية المنافسة.",
              "مرونة معيارية: تضمن التصميمات مسبقة الصنع إمكانية التعديل والتطوير مع تغير متطلباتك التشغيلية."
            ]
          }
        },
        {
          id: "gas-treatment",
          title: "أنظمة معالجة الغاز",
          desc: "معالجة تدفقات الغاز بكفاءة عالية لتلبية أصعب شروط الجودة والمواصفات.",
          img: "/Sigma%20website/Photos/Gas%20Treatment%20Systems/3.png",
          details: {
            headline: "غاز بمواصفات مطابقة للشروط في الوقت المحدد",
            content1: "تتمتع سيجما بخبرة واسعة في التسليم الكامل لمحطات معالجة الغاز المعيارية من الهندسة والتوريد إلى التركيب والتشغيل والصيانة لحقول النفط والغاز. تم تصميم حلولنا هندسيًا لمعالجة غاز الضغط العالي، التراكيب المتغيرة، المحتويات العالية من CO₂ وغيرها.",
            stats: [
              { val: "10 MMSCFD", label: "الإنتاج المبكر / الصغير" },
              { val: "60-120 MMSCFD", label: "المعالجة متوسطة المدى" },
              { val: "180-360 MMSCFD", label: "المعالجة الكبيرة المركزية" }
            ],
            benefits: [
              "نشر سريع مع حد أدنى من البصمة المساحية في الموقع.",
              "سهولة النقل إلى المواقع البعيدة أو المقيدة.",
              "تقليل الأعمال المدنية وسرعة التعبئة والنشر.",
              "توسيع الطاقة الاستيعابية تدريجياً مع تطور الحقل."
            ]
          }
        },
        {
          id: "well-testing",
          title: "خدمات اختبار الآبار",
          desc: "فهم سلوك المكامن وتحسين أداء الإنتاج باستخدام أحدث وحدات الاختبار.",
          img: "/Sigma%20website/Photos/Wel%20Testing%20Services/3.png",
          details: {
            headline: "بيانات دقيقة .. قرارات أذكى .. أداء مثبت",
            content1: "اختبار الآبار في سيجما هو أداة بالغة الأهمية لفهم سلوك المكامن وتحسين أداء الإنتاج. مع أكثر من 24 عاماً من الخبرة التشغيلية، نقدم خدمات اختبار متكاملة للأحمال العالية والظروف الصعبة والمواقع البعيدة.",
            stats: [
              { val: "20+", label: "وحدات اختبار متنقلة" },
              { val: "24+ Years", label: "خبرة تشغيلية" },
              { val: "SCADA / Real-time", label: "نظام البيانات والمراقبة" }
            ],
            benefits: [
              "دقة وسرعة اختبار عالية باستخدام أحدث الأجهزة والمعدات.",
              "أسطول معدات متقدم يتحمل الضغط العالي والخدمات الحامضية.",
              "مراقبة فورا من خلال بوابات إلكترونية آمنة وتكامل مع أنظمة SCADA.",
              "فريق عمل متعدد التخصصات يقدم استشارات وحلولاً مصممة لكل حقل."
            ]
          }
        },
        {
          id: "water-treatment",
          title: "معالجة وإعادة حقن المياه",
          desc: "تحويل تحدي المياه المنتجة إلى أصل استراتيجي لدعم ضغط المكامن وتعزيز استخراج النفط.",
          img: "/Sigma%20website/Photos/Water%20Treatment/2.png",
          details: {
            headline: "تحويل المياه المنتجة إلى قيمة استدامة للمكمن",
            content1: "نحول المياه المنتجة من تحد تشغيلي وبيئي إلى أصل استراتيجي من خلال أنظمة المعالجة وإعادة الحقن المتقدمة لتعزيز استخلاص النفط (EOR). أنظمتنا المعيارية مصممة لمعالجة ما يصل إلى 10,000 برميل يومياً بكفاءة تتجاوز 95%.",
            stats: [
              { val: "Up to 10k BBL/d", label: "الطاقة الاستيعابية للمعالجة" },
              { val: ">95%", label: "كفاءة المعالجة" },
              { val: "3 Weeks", label: "وقت التركيب والتشغيل" }
            ],
            benefits: [
              "زيادة كفاءة إعادة الاستخدام وحقن المياه لتعزيز الضغط.",
              "تقليل التكاليف التشغيلية وتقليل الاعتماد على المياه العذبة.",
              "تقليل انبعاثات الكربون بما يعادل 3,500 طن سنوياً لكل مشروع.",
              "نظام معياري سهل النشر والنقل وسريع الاستجابة للظروف المتغيرة."
            ]
          }
        },
        {
          id: "gas-compression",
          title: "حلول ضغط الغاز",
          desc: "التقليل من فترات توقف الضواغط وحماية الأرباح من خلال أسطول متاح فورا.",
          img: "/Sigma%20website/Photos/Gas%20Compression/4.png",
          details: {
            headline: "استمرارية التشغيل تضمن استقرار الأرباح",
            content1: "نحن نوفر حلول ضغط غاز سريعة التعبئة مصممة لضمان استمرارية الإنتاج وتدفق المكامن بأقصى كفاءة. نمتلك أحد أكبر الأساطيل المتاحة فوراً في المنطقة بقدرات تتراوح بين 500 و 2,000 حصان من أشهر الماركات العالمية.",
            stats: [
              { val: ">98%", label: "جاهزية تشغيلية مستمرة" },
              { val: "500-2,000 HP", label: "نطاق قوة المحركات" },
              { val: "40+ VRUs", label: "وحدات استعادة البخار في المخزن" }
            ],
            benefits: [
              "تسريع بدء الإنتاج من خلال التوفر الفوري للمعدات والضواغط.",
              "إلغاء أوقات التوريد الطويلة والانتظار للاستيراد.",
              "إمكانية زيادة القدرة التشغيلية تدريجياً مع تطور الحقل.",
              "تقليل المخاطر وفترات التعطل بدعم فني متاح على مدار الساعة."
            ]
          }
        },
        {
          id: "flare-recovery",
          title: "استعادة الغاز المحترق",
          desc: "تقليل الحرق الروتيني للغاز وتحويل الانبعاثات إلى قيمة استثمارية وحماية للبيئة.",
          img: "/Sigma%20website/Photos/Flared%20Gas/1.png",
          details: {
            headline: "تحويل الغاز المهدر إلى طاقة وقيمة بيئية",
            content1: "تساعد سيجما المشغلين على تقليل الحرق الروتيني للغاز من خلال حلول استعادة ومعالجة متكاملة. يساهم ذلك في خفض انبعاثات الكربون وتقليل استهلاك وقود الديزل في الموقع، بالإضافة إلى استخلاص السوائل القيمة والمكثفات.",
            stats: [
              { val: "Up to 30 MMSCFD", label: "سعة الموقع الواحد" },
              { val: "180k tons CO₂e", label: "تقليل الانبعاثات (مشروع 3 سنوات)" },
              { val: "EPC + O&M", label: "نموذج التسليم الكامل" }
            ],
            benefits: [
              "التقاط ومعالجة وضغط غاز الشعلة بأمان تام.",
              "التكامل السلس مع العمليات القائمة بأقل قدر من التدخل التشغيلي.",
              "استخدامات مرنة: توليد الكهرباء، أو معالجة الغاز، أو التصدير للشبكة.",
              "نجاح مثبت: تقليل انبعاثات شركة خالدة للبترول بمقدار 180 ألف طن CO₂."
            ]
          }
        },
        {
          id: "gas-power",
          title: "حلول تحويل الغاز إلى كهرباء",
          desc: "تحويل الغاز المصاحب أو غاز الشعلة إلى طاقة كهربائية مستدامة لتغذية الحقول.",
          img: "/Sigma%20website/Photos/Gas%20to%20Power/1.png",
          details: {
            headline: "من الغاز المهدر إلى طاقة يعتمد عليها",
            content1: "نحن نقوم بتحويل الغاز المصاحب والشعلة إلى طاقة كهربائية تدعم الحقول والعمليات وتلغي تماماً الاعتماد على الديزل المكلف والملوث للبيئة. يشمل ذلك مرحلة المعالجة المسبقة للغاز لضمان مطابقته لمواصفات المولدات.",
            stats: [
              { val: "540 MMSCFD Nidoco", label: "المشروع الرائد للغاز" },
              { val: "CAT Gas Generators", label: "نوع المولدات المستخدمة" },
              { val: "NGL Recovery", label: "عوائد إضافية من استخلاص السوائل" }
            ],
            benefits: [
              "توفير أنظمة معالجة وتهيئة الغاز المسبقة لحماية المولدات.",
              "توليد طاقة كهربائية عالية الكفاءة للمرافق ومحطات المعالجة.",
              "استخلاص سوائل الغاز الطبيعي (NGL) كعائد مادي إضافي للمشروع.",
              "الحد من الحرق الروتيني وخفض الغازات الدفيئة بشكل ملحوظ."
            ]
          }
        },
        {
          id: "pulling-units",
          title: "خدمات التدخل ووحدات السحب",
          desc: "تنفيذ عمليات صيانة الآبار والتدخل السريع لتعزيز الإنتاج بأعلى درجات المرونة.",
          img: "/Sigma%20website/Photos/Flash%20By%20&%20Puling%20Unit/1.png",
          details: {
            headline: "مصممة للتدخل السريع ومرونة الحركة",
            content1: "توفر سيجما خدمات متكاملة لوحدات السحب والتدخل السريع في صيانة الآبار وتحسين الإنتاج عبر جميع مراحل دورة حياة البئر. نعتمد على حفارات صيانة الآبار المحمولة على شاحنات ثقيلة فائقة الحركة في البيئات الصحراوية والصعبة.",
            stats: [
              { val: "Single/Double-Drum", label: "أنواع وحدات السحب" },
              { val: "API Compliant", label: "مطابقة المعايير العالمية" },
              { val: "Heavy-Duty Chassis", label: "قاعدة الشاحنات للصحراء" }
            ],
            benefits: [
              "تعبئة ونشر سريع عبر المواقع الصحراوية والبعيدة.",
              "قدرات سحب ورفع متباينة لتناسب متطلبات كل بئر.",
              "تجهيز كامل بمعدات التحكم في الضغط وصمامات الأمان والمانيفولد.",
              "مطابقة كاملة لتوصيات المعهد الأمريكي للبترول API."
            ]
          }
        },
        {
          id: "metering",
          title: "أنظمة القياس ونقل الملكية",
          desc: "ضمان النزاهة التجارية وحماية الإيرادات من خلال دقة قياس معتمدة ومطابقة للمواصفات.",
          img: "/Sigma%20website/Photos/Metering%20Systems/1.png",
          details: {
            headline: "دقة معتمدة .. ثقة تجارية .. حماية الإيرادات",
            content1: "أنظمة القياس ونقل الملكية (Custody Transfer) من سيجما مصممة هندسياً لتقديم الدقة والشفافية التامة في المعاملات المالية للنفط والغاز. تتميز أنظمتنا بالدقة الفائقة وقابليتها للتكرار والمطابقة مع الشروط التنظيمية والبيئات القاسية.",
            stats: [
              { val: "6-path, 3-level", label: "مسارات قياس الموجات فوق الصوتية" },
              { val: "TR G13, OIML, TR G7", label: "الشهادات والاعتمادات" },
              { val: "ERZ 2000", label: "كمبيوتر التدفق الذكي" }
            ],
            benefits: [
              "القدرة على القياس بدقة عند ضغط تشغيل يبدأ من 1 بار مطلق.",
              "حساسات متطورة من التيتانيوم المقاوم للأوساخ وقابل للاستبدال دون إعادة معايرة.",
              "كمبيوتر تدفق ERZ 2000 مدمج لتصحيح القراءة ومراقبة البيانات الفورية.",
              "معايرة كاملة واعتماد رسمي لعمليات نقل الملكية والبيع التجاري."
            ]
          }
        }
      ]
    },
    en: {
      title: "Our Services & Expertise",
      subtitle: "End-to-End Oilfield Solutions engineered for results — from early production facilities to energy efficiency.",
      services: [
        {
          id: "epf",
          title: "Early Production Facilities",
          desc: "Fast-track and flexible production facilities to accelerate early cash flow and fields monetization.",
          img: "/Sigma%20website/Photos/Early%20Production%20Facilities/3.png",
          details: {
            headline: "Accelerating Your Oilfield Success",
            content1: "At Sigma Petroleum Services, we've been redefining production facility solutions since 2001. As a trusted leader in delivering fast-track, cost-efficient systems, we offer turnkey solutions on a lease, operate, and maintain basis tailored to short- and long-term projects.",
            stats: [
              { val: "7–21 Days", label: "Oil Facilities Deployment" },
              { val: "4 Months", label: "Gas Facilities Deployment" },
              { val: "Lease, Operate & Maintain", label: "Contract Model" }
            ],
            benefits: [
              "Early Cash Flow: Fast-track your revenue generation.",
              "Minimal Upfront Costs: Preserve your capital with efficient leasing options.",
              "Unmatched Speed and Reliability: Projects delivered with a track record of unrivaled timelines.",
              "Modular Flexibility: Prefabricated designs ensure production optimization as needs evolve."
            ]
          }
        },
        {
          id: "gas-treatment",
          title: "Gas Treatment Systems",
          desc: "Process associated and non-associated gas streams to meet strict pipeline-quality specifications.",
          img: "/Sigma%20website/Photos/Gas%20Treatment%20Systems/3.png",
          details: {
            headline: "Pipeline-Quality Gas On Time .. Every Time.",
            content1: "Sigma Petroleum Services brings extensive experience in the end-to-end delivery of modular gas treatment plants from engineering and supply to installation, commissioning, and operation. Our solutions are engineered to reliably process both associated and non-associated gas streams across the most demanding conditions.",
            stats: [
              { val: "10 MMSCFD", label: "Small-Scale / Early Production" },
              { val: "60-120 MMSCFD", label: "Mid-Range Processing" },
              { val: "180-360 MMSCFD", label: "Large-Scale Central Processing" }
            ],
            benefits: [
              "Rapid deployment with minimal site footprint.",
              "Easy transportation to remote or constrained locations.",
              "Reduced civil works and faster mobilization.",
              "Flexible, phased capacity expansion as your field evolves."
            ]
          }
        },
        {
          id: "well-testing",
          title: "Well Testing Services",
          desc: "Understand reservoir behavior and optimize production performance using state-of-the-art mobile units.",
          img: "/Sigma%20website/Photos/Wel%20Testing%20Services/3.png",
          details: {
            headline: "Precision Data .. Smarter Decisions .. Proven Performance.",
            content1: "At SIGMA, well testing is more than a service — it is a critical tool for understanding reservoir behavior, optimizing production performance, and enabling smarter field development decisions. With over 24 years of operational experience.",
            stats: [
              { val: "20+", label: "Mobile Test Units" },
              { val: "24+ Years", label: "Operational Experience" },
              { val: "SCADA / Real-time", label: "Data & Monitoring System" }
            ],
            benefits: [
              "Efficient & Accurate Testing — Advanced methodologies and proven field practices.",
              "Advanced Equipment Fleet — High-pressure and sour service systems to trailer-mounted testing units.",
              "Real-Time Data Access — Secure online portals, advanced SCADA integration.",
              "Expertise You Can Trust — Multidisciplinary specialists develop tailored testing solutions."
            ]
          }
        },
        {
          id: "water-treatment",
          title: "Water Treatment & Reinjection",
          desc: "Transform produced water into a strategic reservoir asset for pressure support and enhanced oil recovery.",
          img: "/Sigma%20website/Photos/Water%20Treatment/2.png",
          details: {
            headline: "Transforming Produced Water into Sustainable Reservoir Value",
            content1: "SIGMA transforms produced water from an operational challenge into a strategic reservoir asset through advanced Produced Water Treatment and Reinjection Systems engineered for Enhanced Oil Recovery (EOR). Our modular systems process up to 10,000 BBL/day with efficiencies >95%.",
            stats: [
              { val: "Up to 10k BBL/d", label: "Processing Capacity" },
              { val: ">95%", label: "Treatment Efficiency" },
              { val: "3 Weeks", label: "Installation & Commissioning" }
            ],
            benefits: [
              "Maximize water reuse and injection efficiency.",
              "Enhance reservoir pressure support and recovery factors.",
              "Reduce operational costs and freshwater dependency.",
              "Reduce CO₂ equivalent emissions by ~3,500 tons/year per project."
            ]
          }
        },
        {
          id: "gas-compression",
          title: "Gas Compression Solutions",
          desc: "Maximize uptime and protect revenue with one of the region's largest readily available compressor fleets.",
          img: "/Sigma%20website/Photos/Gas%20Compression/4.png",
          details: {
            headline: "Uptime Drives Production. Reliability Protects Revenue.",
            content1: "SIGMA provides rapid-deployment Gas Compression Solutions engineered to maximize uptime and optimize production performance. Backed by one of the region's largest readily available compression equipment fleets (500–2,000 HP).",
            stats: [
              { val: ">98%", label: "Operational Availability" },
              { val: "500-2,000 HP", label: "Power Range" },
              { val: "40+ VRUs", label: "VRU Packages in Stock" }
            ],
            benefits: [
              "Accelerate production startup through immediate equipment availability.",
              "Eliminate lengthy manufacturing and procurement lead times.",
              "Scale compression capacity as reservoir conditions evolve.",
              "Minimize downtime risk with dedicated field service teams."
            ]
          }
        },
        {
          id: "flare-recovery",
          title: "Flared Gas Recovery",
          desc: "Minimize routine flaring and convert wasted gases into valuable, monetizable production streams.",
          img: "/Sigma%20website/Photos/Flared%20Gas/1.png",
          details: {
            headline: "Turning Wasted Gas into Revenue and Environmental Value",
            content1: "At SIGMA, we deliver integrated Flared Gas Recovery Solutions that enable operators to minimize routine flaring and transform wasted gas into valuable, monetizable production streams, preventing emissions and reducing costs.",
            stats: [
              { val: "Up to 30 MMSCFD", label: "Per-Site Handling Capacity" },
              { val: "180k tons CO₂e", label: "CO₂ Reduction (3yr project)" },
              { val: "EPC + O&M", label: "Delivery Model" }
            ],
            benefits: [
              "Safely capture, compress, and manage flare gas.",
              "Seamless integration into existing operations with minimal disruption.",
              "Flexible utilization pathways: power generation, gas processing, or export.",
              "Proven performance: 180,000 tons CO₂e prevented at Khalda Petroleum project."
            ]
          }
        },
        {
          id: "gas-power",
          title: "Gas-to-Power Solutions",
          desc: "Convert underutilized associated or flared gas into a reliable on-site electrical power source.",
          img: "/Sigma%20website/Photos/Gas%20to%20Power/1.png",
          details: {
            headline: "From Stranded Gas to Reliable Power.",
            content1: "At SIGMA, we transform associated and flared gas into dependable electrical power, enabling operators to unlock greater value from existing resources while reducing operating costs and diesel dependency.",
            stats: [
              { val: "540 MMSCFD Nidoco", label: "Flagship Gas Feed Project" },
              { val: "CAT Gas Generators", label: "Generator Type" },
              { val: "NGL Recovery", label: "NGL Recovery Revenue Stream" }
            ],
            benefits: [
              "Gas pre-conditioning ensuring compliance with generator fuel specifications.",
              "High-efficiency gas generators for on-site production.",
              "NGL recovery during conditioning for additional revenue streams.",
              "Reduces routine flaring and lowers greenhouse gas emissions."
            ]
          }
        },
        {
          id: "pulling-units",
          title: "Flash-By & Pulling Unit Services",
          desc: "Rapid, safe, and efficient well intervention and workover operations with mobile pulling units.",
          img: "/Sigma%20website/Photos/Flash%20By%20&%20Puling%20Unit/1.png",
          details: {
            headline: "Engineered for Well Intervention. Built for Operational Agility.",
            content1: "When production performance depends on fast, safe, and efficient well intervention, SIGMA's Flash-By and Pulling Unit Services deliver a comprehensive solution across the full well lifecycle using heavy-duty mobile rigs.",
            stats: [
              { val: "Single/Double-Drum", label: "Unit Types" },
              { val: "API Compliant", label: "Standards Compliance" },
              { val: "Heavy-Duty Chassis", label: "Chassis Build" }
            ],
            benefits: [
              "Rapid mobilization and deployment across desert and remote locations.",
              "Single & double-drum pulling units with varying capacities.",
              "Mast and drawworks systems, hydraulic winches, and weight indicators.",
              "Meets or exceeds applicable API recommendations."
            ]
          }
        },
        {
          id: "metering",
          title: "Metering Systems & Custody Transfer",
          desc: "Ensure commercial integrity and revenue protection through certified, highly accurate metering systems.",
          img: "/Sigma%20website/Photos/Metering%20Systems/1.png",
          details: {
            headline: "Certified Accuracy.. Commercial Confidence.. Revenue Protection.",
            content1: "SIGMA's Metering Systems & Custody Transfer Solutions are engineered to deliver the precision, transparency, and confidence required for critical fiscal and operational custody transfer applications.",
            stats: [
              { val: "6-path, 3-level", label: "Ultrasonic Measurement Paths" },
              { val: "TR G13, OIML, TR G7", label: "Certifications" },
              { val: "ERZ 2000", label: "Flow Computer Platform" }
            ],
            benefits: [
              "Operates at absolute pressure levels as low as 1 bar.",
              "Advanced multi-path ultrasonic measurement (6 paths across 3 levels).",
              "Robust dirt-repellent titanium sensors exchangeable without recalibration.",
              "Certified TR G13 / OIML for custody transfer applications."
            ]
          }
        }
      ]
    }
  }[lang] || { ar: {}, en: {} };

  const content = mergeContent(fallbackContent, dbContent);
  const services = content.services;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        {/* Pulsing glow blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "خدمات هندسية" : "OUR EXPERTISE"}</span>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {content.subtitle}
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
                const Icon = serviceIcons[service.id] || Wrench;
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
                  src={services[activeTab].img} 
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
                    {React.createElement(serviceIcons[services[activeTab].id] || Wrench, { className: "h-5 w-5" })}
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
