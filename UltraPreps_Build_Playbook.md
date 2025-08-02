
# ULTRAPREPS BUILD PLAYBOOK

## **Master Build Prompt (For Cursor)**
Paste this as the system prompt inside Cursor so the AI operates as the UltraPreps Build Developer:

> **You are UltraPreps Build AI.**
> You have access to the **UltraPreps Bibles**:
> - SuperBible (Core DNA + Stadium Ecosystem)
> - LifeBook Bible (Youth → Alumni → Legacy)
> - Onboarding Bible (Cinematic Instant School/Student Onboarding)
> - Prompt Bible (HeroCard, Mascot, Vision QA prompts)
> - HUD Engine Bible (Interactive HeroCards + Recruiting HUDs)
> - Scaffold Blueprint (Pages & Directory Architecture)
> - Test Matrix (Critical user flows & QA)
> - Virality Bible (Growth to $1B in 12 months)
>
> **Your mission:** Build the fully functional UltraPreps platform — every feature, page, and flow wired together — in **Next.js 15 + Tailwind + Prisma + Vercel Edge Functions**, production-ready and aligned with UltraPreps design language & virality architecture.
>
> **Principles:**
> - Always follow the Bibles’ design, flows, and AI prompts.
> - Build modular, scalable code (microservices for RivalryBot, SignalPrime, NIL, etc.).
> - Every page and API must integrate with the virality & HYPE economy systems.
> - Implement Role-Specific UX for students, parents, coaches, admins, recruiters.
> - Gamification, NIL, and RivalryBot are non-optional — build them first.
>
> **Deliverables:**
> - All pages functional & linked.
> - All APIs operational (school creation, HYPE, Rivalries, NIL).
> - All dashboards (student, parent, coach, admin, recruiter, superintendent).
> - All virality triggers live (SignalPrime, RivalryBot).
> - Integration-tested against the Test Matrix.
>
> **You are not an assistant.** You are the lead UltraPreps AI developer. Ship features like a senior engineer.

---

## **Full File & API Expansion Map**

### **Frontend Pages (src/app/)**
- `/youth/create` – Youth/rec team onboarding.
- `/club/[team]/` – Select/travel team hubs.
- `/rivalries/` – Statewide rivalries & live leaderboards.
- `/conference/[id]/` – Conference-level rivalry dashboards.
- `/district/[id]/` – Superintendent dashboards.
- `/lifebook/[id]/` – Family brag feeds & generational timelines.
- `/alumni/[id]/` – Alumni portals & memorial profiles.
- `/nil/` – NIL marketplace for verified deals.
- `/sponsors/` – Local business sponsorship dashboards.
- `/media/kits/[region]/` – Auto-generated media packages for local news.

### **APIs (src/app/api/)**
- `/api/rivalries/` – RivalryBot: create rivalries, fetch leaderboards, manage raids.
- `/api/hype/` – Earn/spend HYPE, seasonal resets, bounty rewards.
- `/api/lifebook/` – Manage family feeds, nostalgia content, generational links.
- `/api/nil/` – Create/verify NIL deals, integrate with compliance logs.
- `/api/district/` – District & superintendent-level tools.
- `/api/conference/` – Manage conference-wide leaderboards & dashboards.
- `/api/sponsors/` – Business HYPE boosts & event sponsorships.
- `/api/media/` – Generate press kits & highlight reels for regions.

### **Components (src/components/)**
- `RivalryLeaderboard.tsx` – Dynamic HYPE leaderboards.
- `RaidMode.tsx` – Gamified rival “raids.”
- `FamilyFeed.tsx` – Commentable brag feeds.
- `OnThisDayCard.tsx` – Nostalgia highlights.
- `NILDealCard.tsx` – Verified NIL offers.
- `ConferenceDashboard.tsx` – Multi-school conference views.
- `SuperintendentPanel.tsx` – District-wide admin tools.

---

## **3. Development Phases & Sprints**

**Phase 1 (Weeks 1–3):**
- RivalryBot (leaderboards, raids).
- SignalPrime cascade (share templates + brag alerts).
- Youth & club team onboarding.

**Phase 2 (Weeks 4–6):**
- District & conference dashboards.
- Lifebook feeds & nostalgia engine.
- NIL marketplace MVP.

**Phase 3 (Weeks 7–9):**
- Alumni portal & memorial mode.
- Gamified seasonal HYPE challenges.
- Regional media kit generation.

**Phase 4 (Weeks 10–12):**
- National Rivalry Weeks framework.
- Sponsor dashboards.
- Advanced recruiting features for colleges.

---

**Ready to Execute:**
- **Master Prompt** → Load into Cursor as system instruction.
- **File/API Map** → Guides directory & feature expansion.
- **Sprints** → Ensure features roll out in the right order (virality-first).
