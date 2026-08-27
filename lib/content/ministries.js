// Sourced from the church's own official "Groups" directory — a public
// OneChurch Software API embedded on jesushousebhm.org/ministries (fetched
// 2026-08-27), not from the church's own long-form copy for most of these,
// since several groups have no public description text there. Where the
// directory did include real copy (Ushering, Prayer, Food Bank, Women of
// Purpose) it's paraphrased/condensed here rather than quoted at length.
//
// "youth" and "mens" were already confirmed real (from internal ministry
// WhatsApp groups, see git history) before this pass; this pass replaced
// the remaining 5 invented placeholder entries with the real, official
// group names, and renamed "Women's Fellowship" to its real name.
//
// "children" is the one remaining unconfirmed entry — no children's/kids'
// group exists in the official directory, so this is still illustrative
// placeholder copy pending confirmation.
export const ministriesArePlaceholder = true;

export const ministries = [
  { id: "children", name: "Children's Church", description: "A safe, joyful space for kids to encounter God through worship, Bible stories, and play." },
  { id: "youth", name: "YAYA (Youths & Young Adults)", description: "Part of the Redeemed Christian Church of God's worldwide Young Adults and Youth Affairs network — weekly fellowship, its own choir, mentorship and leadership development, and an annual YAYA Week every April." },
  { id: "mens", name: "Kingdom Men", description: "The men's ministry — monthly meetings and prayer gatherings, plus an annual Men's Week every October." },
  { id: "womens", name: "Women of Purpose", description: "Equipping the women of Jesus House Birmingham to discover their purpose through the Word, fellowship, and service." },
  { id: "multimedia", name: "Multi-Media", description: "The team behind the visuals, sound, and streams that carry the message further." },
  { id: "ushering", name: "Ushering", description: "The church's doorkeepers — a warm greeting and a pleasant smile for every worshiper, and order kept during every service." },
  { id: "prayer", name: "Prayer", description: "Growing a culture of fervent, effective prayer — prayer school, corporate prayer gatherings, and celebrating answered prayers together." },
  { id: "food-bank", name: "Food Bank", description: "Free groceries for over 200 families and individuals each month, the first Saturday of the month — run by the church's Haggai Ministry." },
  { id: "welcome", name: "Welcome & Follow-up", description: "The first friendly face new guests meet, and the team that follows up with every visitor after service." },
];
