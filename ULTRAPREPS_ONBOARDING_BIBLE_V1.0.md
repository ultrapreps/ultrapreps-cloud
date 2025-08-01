
# ULTRAPREPS_ONBOARDING_BIBLE_V1.0

**Purpose:**  
To define the **perfect system** for onboarding a **new school** and its **first student** into UltraPreps, with **living mascots, cinematic HeroCards, dynamic HUDs, staff dashboards, spaces, and email triggers** — all delivered under **$5 per first student**, built for **scaling and never drifting**.

---

## I. SYSTEM GOALS
1. **Cinematic Onboarding**:  
   - Every HeroCard, banner, poster, and avatar is **unique, ESPN-level quality**, and verified for **branding accuracy**.  
2. **Living Ecosystem**:  
   - Schools aren’t empty shells — they arrive with **prebuilt spaces, staff placeholders, dashboards, and mascots**.  
3. **Persistent Mascot Persona**:  
   - Each school mascot is a **locked, fine-tuned digital persona** that lives across posters, chats, events, and announcements.  
4. **Immediate Value**:  
   - Students see their HeroCard **within 20 seconds** of entering name/class/school.  
   - Staff and families are immediately invited to claim their spaces.  
5. **Scaling Efficiency**:  
   - Designed for **1K–1M schools** with **automated QA, regeneration, and cost-optimized hybrid AI pipelines**.

---

## II. CORE PIPELINE

### 1. Inputs (User-Facing)  
- **Student**: `name`, `class_year`, `school`.  
- **Optional**: `primary_sport`, `position`.  

### 2. SchoolUniverseBot  
- Resolves school metadata:  
  - Colors, mascot, logo (if available), leagues, city/state.  
- Generates **school stadium cover** and **school banner**.  
- Seeds **staff placeholders** (Principal, AD, coaches).  
- Creates **base spaces**:  
  - **Athletics Hub** (teams, recruiting)  
  - **Academic Hub** (clubs, honors)  
  - **Community Hub** (parents, boosters).  

### 3. Mascot Engine (Living Entity)  
- **Visual Identity**:  
  - Generate multiple mascot poses using **DALL‑E + SDXL**.  
  - Train a **custom LoRA** (≈$1.5) to lock mascot style forever.  
- **Personality Modeling**:  
  - GPT‑4o generates mascot personality JSON:  
    ```json
    {
      "name": "Mighty Mustang",
      "tone": "hype, motivational, school-pride focused",
      "catchphrases": ["Ride for the Falls!", "Mustang Pride Forever!"],
      "chat_role": "school ambassador & motivational coach"
    }
    ```
- **Outputs**:  
  - Mascot asset pack (portraits, poses).  
  - Personality profile for in-app bot (for events, HYPE messages, announcements).  

### 4. Student ProfileBot  
- Pulls:  
  - Sports data (MaxPreps/Hudl).  
  - Academic data (GPA, honors).  
  - Extracurriculars (clubs, leadership).  
- Initializes **HUD JSON**:  
  ```json
  {
    "hype_score": 75,
    "stats": {"yards": 998, "receptions": 48},
    "achievements": ["All-District 1st Team"],
    "highlight_reels": [],
    "academics": {"gpa": 3.7, "honors": ["NHS"]}
  }
  ```

### 5. Asset Generation Suite  
Each first student triggers **6–8 assets**:

- **HeroCard**:  
  - Cinematic portrait with mascot watermark, school colors, sport/action scene.  
  - Flair overlays: multi-sport icons, captain badges, academic ribbons.  
- **Profile Banner**:  
  - Stadium shot + mascot integration.  
- **Messaging Avatar**:  
  - Portrait + flair icons.  
- **Achievements Poster**:  
  - Share-ready highlight template.  
- **School Stadium Cover**:  
  - Panoramic mural with mascot & branding.

### 6. Vision QA & Regeneration Loop  
Every asset is verified with **GPT‑4o Vision**:  
- Does the mascot match the request?  
- Are the colors on-brand?  
- Is the sport and context correct?  
- Are the overlays contextually appropriate?  

**If fail → auto-regenerate with refined prompts.**  
**If 2 fails → escalate to Claude for fallback prompt engineering.**  

### 7. Spaces & Staff  
- **Staff Placeholders**: Prebuilt accounts (awaiting claim).  
- **Prebuilt Dashboards**: Admin/coach views with recruiting + NIL tools.  
- **Spaces**:  
  - Athletics: Teams, schedules, highlight sharing.  
  - Academics: Clubs, GPA tracking, honors boards.  
  - Community: Parent engagement, boosters, donations.  

### 8. Email & Claiming  
- **Student**: “Your HeroCard is live! Claim your profile.”  
- **Staff**: “Your school’s UltraPreps dashboards are ready to claim.”  
- **Parents**: Invitation to join family HYPE economy.  

---

## III. COST ALLOCATION (Per New School + First Student)

| Component                         | Cost   |
|-----------------------------------|--------|
| SchoolUniverseBot (data + text)   | $0.05  |
| Staff/Spaces Setup                | $0.02  |
| Mascot Generation + LoRA          | $1.50  |
| Mascot Persona (text modeling)    | $0.05  |
| DALL‑E HeroCard background        | $0.04  |
| 3–4 SDXL renders (local)          | $0.00  |
| Vision QA (8–10 GPT‑4o passes)    | $0.60  |
| Student Profile & HUD text        | $0.06  |
| Emails (student, staff, parents)  | $0.02  |
| **Buffer (retries, caching)**     | **$2.50** |
| **Total**                         | **≈ $4.84** |

**Budget target:** **$5.00** → leaves ~$0.16 for scaling & retries.

---

## IV. UX FLOW
1. **Student Input:** Name + class + school.  
2. **20s** → **Instant HeroCard Preview**.  
3. **Progress Indicator:** “We’re building your stadium…” while banners, avatars, posters generate in background.  
4. **Mascot Persona** becomes visible in school chat (welcomes new student).  
5. **Emails Sent**: Students, staff, and parents invited to claim profiles.  

---

## V. SCALING STRATEGY
- **Hybrid AI:**  
  - Use **DALL‑E** only for initial cinematic backgrounds.  
  - Use **local SDXL** + **ControlNet** for all flair/mascot overlays.  
- **Caching:**  
  - Pre-generate mascot packs & base school assets.  
- **Batch QA:**  
  - Queue Vision QA for low-traffic hours to cut peak costs.  

---

## VI. OUTPUTS PER NEW SCHOOL
- **1x Living Mascot Package** (visual + LoRA + personality).  
- **1x School Stadium Cover**.  
- **1x School Banner**.  
- **Prebuilt Staff Accounts** + dashboards.  
- **Prebuilt Spaces** (athletics, academics, community).  
- **1x Student HeroCard**.  
- **1x Student Banner**.  
- **1x Student Avatar**.  
- **1x Achievements Poster**.  
- **Email suite** (student, staff, parents).  

---

## VII. DIFFERENTIATORS
- **Mascot as a Living Entity**: Style-locked LoRA + personality JSON ensures **no drift** across time or assets.  
- **Vision-Verified Branding**: Every visual asset passes **multi-step GPT‑4o Vision QA**.  
- **Spaces + Staff Pre-Provisioned**: Schools arrive **alive**, ready to engage.  
- **Cinematic Onboarding**: The first experience is **instant gratification + long-tail background generation**.  

---

## VIII. PIPELINE DIAGRAM

**Flow:**  
**Inputs** → **SchoolUniverseBot** → **Mascot Engine** → **ProfileBot** → **HeroCard & Assets** → **Vision QA** → **Spaces & Staff** → **Emails & Claiming**.

---

## IX. CLAUDE-READY TASKS FOR IMPLEMENTATION

### **Task 1:**  
Create a Next.js API route `/api/create-school` that:  
- Accepts `school_name`, `city`, `state`.  
- Calls SchoolUniverseBot to fetch data and generate assets.  
- Initializes staff placeholders and spaces.

### **Task 2:**  
Implement Mascot Engine:  
- Generate mascot visuals (DALL‑E + SDXL).  
- Train LoRA for style-lock.  
- Build mascot personality JSON.  
- Store as Mascot Identity Package.

### **Task 3:**  
Create `/api/create-student` that:  
- Accepts `name`, `class_year`, `school_id`.  
- Builds profile via ProfileBot.  
- Generates HeroCard + assets.  
- Runs Vision QA (regeneration loop).  

### **Task 4:**  
Build Vision QA Service:  
- Wrapper for GPT‑4o Vision.  
- Validates mascot, colors, context.  
- Triggers regeneration if fail.

### **Task 5:**  
Integrate Email Service:  
- Student: HeroCard live email.  
- Staff: Dashboard claim link.  
- Parents: HYPE economy invite.

---

## X. FLAIR RULES ENGINE (JSON)

```json
{
  "flair": {
    "sports": ["football", "basketball"],
    "academic": ["NHS", "Honor Roll"],
    "leadership": ["Team Captain"]
  },
  "overlays": {
    "icons": ["football_helmet.png", "track_spikes.png"],
    "ribbons": ["honor_roll_badge.png"]
  }
}
```
