// ⚠️ TEMPLATE TEXT — written to match what THIS site actually does, but it is
// not legal advice. Before launch:
//   1. Replace every [BRACKETED] placeholder (they're highlighted on the page).
//   2. Check it against the data-protection and consumer laws where Harris
//      trades, ideally with a local lawyer.
//   3. Update LAST_UPDATED whenever you change the text.

export const LAST_UPDATED = "[DD Month YYYY]";

// A paragraph is a string; a bullet list is { list: [...] }.
export type Block = string | { list: string[] };
export type LegalSection = { id: string; title: string; body: Block[] };
export type LegalDoc = { title: string; eyebrow: string; intro: string; sections: LegalSection[] };

export const privacyPolicy: LegalDoc = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "Your privacy matters as much as your fit. This policy explains what information harris_stylist collects through this website, why we collect it, and the choices you have.",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        "This website is operated by [BUSINESS LEGAL NAME] (“harris_stylist”, “we”, “us”), a fashion design and styling business based in [CITY, COUNTRY].",
        "If you have any questions about this policy or your information, contact us at [PRIVACY EMAIL ADDRESS].",
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      body: [
        "We only collect information you choose to give us through the forms on this site:",
        {
          list: [
            "Appointment requests: your name, email address, phone or WhatsApp number (optional), the occasion and style preferences you describe, your preferred appointment format, date and time, the date of your occasion (optional) and any notes you add.",
            "Contact messages: your name, email address, phone number (optional), the topic and your message.",
            "Newsletter sign-ups: your email address.",
          ],
        },
        "Please don't include sensitive information (such as health details or payment card numbers) in these forms. Measurements are taken in person during your fitting, not through this website.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      body: [
        "We use your information only to:",
        {
          list: [
            "respond to your appointment request or message and arrange your consultation;",
            "prepare and deliver your commission, fittings and styling services;",
            "send you the newsletter, if you signed up for it;",
            "keep basic records needed to run the business and meet our legal obligations.",
          ],
        },
        "We do not sell your information, and we do not use it for automated decision-making.",
      ],
    },
    {
      id: "legal-basis",
      title: "Our reasons for using it",
      body: [
        "Depending on where you live, data-protection law may require us to explain our legal basis. We rely on: taking steps you have asked for before entering into an agreement (your appointment request); performing our agreement with you (your commission); your consent (the newsletter, which you can withdraw at any time); and our legitimate interest in running and improving the business.",
      ],
    },
    {
      id: "who-we-share-with",
      title: "Who we share it with",
      body: [
        "We share information only with trusted providers who help us run this website, and only as much as they need:",
        {
          list: [
            "Google Firebase (Google LLC) — stores form submissions and images securely.",
            "[HOSTING PROVIDER, e.g. Vercel Inc.] — hosts and delivers the website.",
            "[EMAIL / NEWSLETTER PROVIDER, if you use one] — sends our emails.",
          ],
        },
        "These providers may store data on servers outside your country. Where that happens, they use recognised safeguards to protect it. We may also disclose information if required by law.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technology",
      body: [
        "This website does not use advertising or tracking cookies. It stores one small note in your browser for the current tab only (sessionStorage) so the welcome animation isn't shown again on every page; it's deleted when you close the tab.",
        "Our fonts are served from our own website, so loading a page does not send your details to a font provider. If we add analytics in the future, we will update this policy and ask for your consent where the law requires it.",
      ],
    },
    {
      id: "how-long",
      title: "How long we keep it",
      body: [
        "We keep appointment requests and messages for as long as needed to respond and provide our services, and then for up to [NUMBER] years for our records. Newsletter emails are kept until you unsubscribe. After that, information is deleted or anonymised.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: [
        "Subject to the law where you live, you can ask us to:",
        {
          list: [
            "see the information we hold about you;",
            "correct anything that's inaccurate;",
            "delete your information;",
            "stop or limit how we use it, including unsubscribing from the newsletter at any time.",
          ],
        },
        "To make a request, email [PRIVACY EMAIL ADDRESS]. We'll reply within [NUMBER] days. You also have the right to complain to the data-protection authority in your country: [DATA PROTECTION AUTHORITY NAME].",
      ],
    },
    {
      id: "security",
      title: "Keeping it safe",
      body: [
        "Information is sent over an encrypted connection (HTTPS) and stored with access restricted to harris_stylist. No method of storage is perfectly secure, but we take reasonable steps to protect your information.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "This website is not intended for children under [AGE]. If you are booking for a child, the booking must be made by a parent or guardian.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "We may update this policy from time to time. The date at the top of this page shows when it was last changed.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  intro:
    "These terms explain how appointments, commissions and purchases with harris_stylist work. By booking with us or using this website, you agree to them.",
  sections: [
    {
      id: "about",
      title: "About us",
      body: [
        "harris_stylist is the trading name of [BUSINESS LEGAL NAME], based in [CITY, COUNTRY]. Registration number: [REGISTRATION NUMBER, if any]. Contact: [EMAIL ADDRESS] · [PHONE NUMBER].",
      ],
    },
    {
      id: "appointments",
      title: "Appointments",
      body: [
        "Submitting the appointment form is a request, not a confirmed booking. We will contact you within 48 hours to confirm a time.",
        {
          list: [
            "Consultations are [FREE / charged at AMOUNT], [deductible from your commission if you go ahead].",
            "Please give at least [NUMBER] hours' notice to reschedule or cancel an appointment.",
            "If you arrive more than [NUMBER] minutes late, we may need to shorten or rebook your appointment.",
            "Home visits are available within [AREA]; a travel fee of [AMOUNT] may apply.",
          ],
        },
      ],
    },
    {
      id: "commissions",
      title: "Bespoke commissions",
      body: [
        "After your consultation we'll send a written proposal with the design direction, fabrics, price and timeline. Your commission is confirmed once you accept the proposal and pay the deposit.",
        {
          list: [
            "A non-refundable deposit of [PERCENTAGE]% is required to begin. It covers design time and fabrics bought for your piece.",
            "The balance is due [BEFORE COLLECTION / AT THE FINAL FITTING].",
            "Typical timelines are [NUMBER–NUMBER] weeks. Rush orders may be possible for an extra fee.",
            "Changes to the agreed design after work has started may change the price and timeline.",
          ],
        },
      ],
    },
    {
      id: "fittings",
      title: "Fittings and your measurements",
      body: [
        "Bespoke pieces usually need [NUMBER] fittings. Please attend them as scheduled — missed fittings can delay your piece. If your measurements change significantly after the final fitting (for example, more than [NUMBER] cm), further alterations may be charged.",
      ],
    },
    {
      id: "cancellations",
      title: "Cancellations and refunds",
      body: [
        "Because bespoke pieces are made specifically for you, they cannot be returned or refunded once cutting has begun, except where the law requires.",
        {
          list: [
            "If you cancel before cutting begins, we'll refund payments above the deposit, minus the cost of any materials already bought.",
            "If you cancel after cutting begins, payments made are non-refundable.",
            "If we have to cancel, we'll refund everything you have paid.",
          ],
        },
      ],
    },
    {
      id: "ready-to-wear",
      title: "Ready-to-wear purchases",
      body: [
        "Unworn ready-to-wear items with their tags attached can be returned within [NUMBER] days of collection or delivery for [A REFUND / AN EXCHANGE / STORE CREDIT]. Altered items and sale items are final sale. This doesn't affect your statutory rights.",
      ],
    },
    {
      id: "collection",
      title: "Collection, delivery and care",
      body: [
        "Finished pieces can be collected from the studio or delivered for a fee of [AMOUNT]. Items not collected within [NUMBER] days of completion may incur a storage fee. Each piece comes with care instructions — damage caused by not following them isn't covered.",
      ],
    },
    {
      id: "photography",
      title: "Designs and photography",
      body: [
        "All designs, sketches, patterns, photographs and content on this website belong to harris_stylist and may not be copied or used without our written permission.",
        "We love to celebrate our clients. We'll always ask your permission before sharing photos of you wearing your piece on this website or on social media, and you can say no.",
      ],
    },
    {
      id: "liability",
      title: "Our responsibility to you",
      body: [
        "We take great care with every commission. If something isn't right with your piece because of our workmanship, tell us within [NUMBER] days and we'll repair or remake it. Our total liability for any commission is limited to the price you paid for it, except where the law does not allow this limit.",
      ],
    },
    {
      id: "website",
      title: "Using this website",
      body: [
        "We try to keep this website accurate and available, but we can't guarantee it will always be error-free. Prices and availability shown are subject to confirmation in your written proposal.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      body: ["These terms are governed by the laws of [COUNTRY], and disputes will be handled by the courts of [COUNTRY / CITY]."],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "We may update these terms from time to time. The version that applies to your commission is the one in place when you accepted your proposal.",
      ],
    },
  ],
};