// Seed data for the Phase 3 admin console demo. This is sample/placeholder
// content for exercising the CRUD UI — it is a separate, in-memory-only
// dataset from the real content in lib/content/*.js that powers the public
// site, and editing it here has no effect on the public pages (no backend
// wiring exists in this concept build).

export const demoEvents = [
  { id: "evt-1", title: "Community Outreach Day", month: 3, description: "Neighborhood service and food distribution." },
  { id: "evt-2", title: "Youth Conference", month: 7, description: "Annual gathering for the youth ministry." },
  { id: "evt-3", title: "Thanksgiving Service", month: 11, description: "Special combined thanksgiving service." },
];

export const demoAnnouncements = [
  { id: "ann-1", title: "New Members Class starts Sunday", body: "Sign up at the welcome desk after service.", date: "2026-09-06" },
  { id: "ann-2", title: "Choir rehearsal moved to Thursdays", body: "Starting next week, choir practice moves to 7pm Thursdays.", date: "2026-08-28" },
];

export const demoGalleryItems = [
  { id: "gal-1", caption: "Sunday Worship", photographer: "Fallon Michael", imageUrl: "/gallery/worship.jpg" },
  { id: "gal-2", caption: "Community Fellowship", photographer: "Danique Godwin", imageUrl: "/gallery/community.jpg" },
];

export const demoBlogPosts = [
  {
    id: "blog-1",
    title: "Welcome to Our New Website (Concept)",
    excerpt: "A look at what's new in this redesign concept.",
    body: "This is placeholder blog body copy for the Phase 3 admin console demo.",
    publishedDate: "2026-08-01",
  },
];

export const demoPrayerRequests = [
  { id: "pr-1", name: "Anonymous", message: "Please pray for healing for my mother.", submittedAt: "2026-08-20", prayedFor: false },
  { id: "pr-2", name: "J.O.", message: "Praying for a new job opportunity.", submittedAt: "2026-08-22", prayedFor: true },
  { id: "pr-3", name: "Anonymous", message: "Traveling mercies for my family this week.", submittedAt: "2026-08-24", prayedFor: false },
];

export const demoNewsletterSubscribers = [
  { id: "sub-1", email: "demo.subscriber1@example.com", subscribedAt: "2026-07-15" },
  { id: "sub-2", email: "demo.subscriber2@example.com", subscribedAt: "2026-08-02" },
  { id: "sub-3", email: "demo.subscriber3@example.com", subscribedAt: "2026-08-10" },
];
