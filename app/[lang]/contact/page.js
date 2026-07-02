"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send, Globe } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { mergeContent } from "@/lib/merge-content";
import { useEffect } from "react";

export default function ContactPage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const [dbContent, setDbContent] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/page-content?key=contact`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data[lang]) {
          setDbContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error loading contact page content:", err));
  }, [lang]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fallbackContent = {
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا لمساعدتك. تواصل معنا لمناقشة أهدافك التشغيلية وتوريد احتياجات حقولك.",
      formTitle: "أرسل لنا رسالة",
      formDesc: "املأ الاستمارة أدناه وسيتواصل معك فريق الاستشارات البترولية لدينا في أقرب وقت.",
      nameLabel: "الاسم الكامل",
      emailLabel: "البريد الإلكتروني",
      companyLabel: "اسم الشركة / الجهة",
      messageLabel: "الرسالة",
      submitBtn: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      contactInfoTitle: "معلومات الاتصال المباشر",
      addressLabel: "العنوان الرئيسي",
      addressVal: "المنطقة الحرة العامة، العامرية، الإسكندرية، مصر",
      phoneLabel: "الهاتف",
      emailLabelField: "البريد الإلكتروني",
      coverageTitle: "عملياتنا الإقليمية",
      coverageDesc: "مصر · المملكة العربية السعودية · سلطنة عمان · ليبيا · سوريا",
      successMsg: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
    },
    en: {
      title: "Contact Us",
      subtitle: "Ready to elevate your projects? Get in touch with our petroleum specialists today.",
      formTitle: "Send Us a Message",
      formDesc: "Fill out the form below and our consulting team will get back to you shortly.",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      companyLabel: "Company / Organization",
      messageLabel: "Message",
      submitBtn: "Send Message",
      sending: "Sending...",
      contactInfoTitle: "Direct Contact Information",
      addressLabel: "General Headquarters",
      addressVal: "General Free Zone, Amreya, Alexandria, Egypt",
      phoneLabel: "Phone",
      emailLabelField: "Email",
      coverageTitle: "Regional Coverage",
      coverageDesc: "Egypt · Saudi Arabia · Oman · Libya · Syria",
      successMsg: "Your message has been sent successfully! We will contact you soon."
    }
  }[lang] || { ar: {}, en: {} };

  const content = mergeContent(fallbackContent, dbContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(content.successMsg);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)]" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "اتصل بنا" : "GET IN TOUCH"}</span>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Contact Details Column (2/5 size) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/30 shadow-xl overflow-hidden rounded-[28px] bg-card">
              <CardHeader className="pb-4.5 px-6 pt-6 border-b border-border/10 bg-muted/30">
                <CardTitle className="text-lg font-extrabold text-[#003366] dark:text-white">
                  {content.contactInfoTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 text-sm">

                {/* Address */}
                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 h-fit">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-extrabold text-foreground text-xs md:text-sm">{content.addressLabel}</span>
                    <span className="block text-muted-foreground leading-relaxed font-medium">{content.addressVal}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 h-fit">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-extrabold text-foreground text-xs md:text-sm">{content.phoneLabel}</span>
                    <span className="block text-muted-foreground font-semibold text-xs md:text-sm" dir="ltr">+20 3 481 2620</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 h-fit">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-extrabold text-foreground text-xs md:text-sm">{content.emailLabelField}</span>
                    <a href="mailto:conact@sigmapetroleum.com" className="block text-muted-foreground hover:text-primary transition-colors font-medium text-xs md:text-sm">
                      conact@sigmapetroleum.com
                    </a>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Regional Coverage info card */}
            <Card className="border-border/30 bg-[#003366] text-white rounded-[28px] overflow-hidden shadow-lg">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/10 text-[#E61C24]">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-extrabold text-xs uppercase tracking-widest">{content.coverageTitle}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {content.coverageDesc}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Form Column (3/5 size) */}
          <div className="lg:col-span-3">
            <Card className="border-border/30 rounded-[28px] shadow-xl overflow-hidden bg-card p-6 md:p-8">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-lg md:text-2xl font-extrabold text-[#003366] dark:text-white leading-tight">
                  {content.formTitle}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm font-medium mt-1">
                  {content.formDesc}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="p-0 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold text-muted-foreground">{content.nameLabel}</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-start focus-visible:ring-primary focus-visible:border-primary rounded-xl focus:bg-muted/40 transition-colors bg-muted/20 border-border/40"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold text-muted-foreground">{content.emailLabel}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-start focus-visible:ring-primary focus-visible:border-primary rounded-xl focus:bg-muted/40 transition-colors bg-muted/20 border-border/40"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs font-bold text-muted-foreground">{content.companyLabel}</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="text-start focus-visible:ring-primary focus-visible:border-primary rounded-xl focus:bg-muted/40 transition-colors bg-muted/20 border-border/40"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-bold text-muted-foreground">{content.messageLabel}</Label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-start focus:bg-muted/40 transition-colors font-medium text-foreground"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="p-0 pt-6">
                  <Button type="submit" disabled={loading} className="w-full bg-[#E61C24] hover:bg-[#E61C24]/95 text-white font-extrabold cursor-pointer gap-2 h-12 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all rounded-xl text-xs">
                    {loading ? content.sending : (
                      <>
                        <Send className="h-4 w-4" />
                        {content.submitBtn}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
