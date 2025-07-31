Ran tool
The edit is too large for a single operation in this environment.  
**To update your `atomicdna.md` immediately:**

1. **Open `docs/visual-dna/atomicdna.md` in your editor.**
2. **Replace its entire contents with the following:**

---

```
# UltraPreps Atomic DNA Amendment – OpenAI-Driven HeroCard Engine (2025)

## System Overview
- All enrichment, validation, fallback, and visual logic is handled by OpenAI (GPT-4o) using a DNA-exact prompt.
- No external APIs, databases, or scrapers are used.
- The backend API (`/api/enrich-school`) accepts user input: athlete name, class year, school, and (optionally) a selfie.
- The backend sends a DNA-exact, context-rich prompt to OpenAI, referencing this atomicdna.md and the visual DNA gallery.
- OpenAI returns a complete HeroCard data object:
  - `athleteName`, `school`, `classYear`
  - `mascot`, `schoolColors` (HEX)
  - `roles` (array of {type, position, stats})
  - `hypeScore` (0–100)
  - `overlays` (HUDs, badges, etc.)
  - `avatarMode` (true/false)
  - `chainOfCustody` (OpenAI completion, timestamp)
- The frontend renders the HeroCard per atomic DNA/visual DNA rules, using only OpenAI-enriched data.
- All fallback, avatar, and validation logic is handled by OpenAI.
- If a selfie is provided, it is used; if not, OpenAI generates avatar mode (school colors, mascot, no facial features).
- The UI/UX, layout, color, font, mascot, stat blocks, overlays, and HUDs match the visual DNA gallery exactly.
- This is the canonical, production pipeline for UltraPreps HeroCards as of 2025.

## Example OpenAI Prompt (Backend)
```
You are UltraPreps HeroCard Generator. Using the UltraPreps Atomic DNA and Visual DNA system (see below), generate a complete JSON object for a cinematic HeroCard for the following athlete. If a selfie is provided, use it; if not, generate avatar mode per DNA rules. All fields must be filled using your world knowledge and best guess if not known. Return all fields needed for a DNA-exact HeroCard, including mascot, schoolColors, roles, stats, hypeScore, overlays, and avatarMode if no selfie. Log this completion as the chain-of-custody source.

Athlete Name: [NAME]
School: [SCHOOL]
Class Year: [YEAR]
Selfie Provided: [true/false]

UltraPreps Atomic DNA/Visual DNA Rules:
- Use Oswald Bold for display, Inter Regular for body.
- Primary colors: #1E3A8A (blue), #F59E0B (gold). Secondary: #F97316, #111827, #FFFFFF.
- HeroCard: 3:4 ratio, 600x800px, 32px safe zone, 2-col stat grid, mascot 70–85% athlete height.
- Borders: 24px (cards), 12px (buttons). Shadows: 0px 8px 32px rgba(0,0,0,0.35).
- Hype Wheel, overlays, stat blocks, role stacking, avatar mode per DNA rules.
- All data must be plausible, visually accurate, and match the DNA gallery.

Return format:
{
  "athleteName": "...",
  "school": "...",
  "classYear": "...",
  "mascot": "...",
  "schoolColors": ["#RRGGBB", "#RRGGBB"],
  "roles": [ { "type": "...", "position": "...", "stats": { ... } } ],
  "hypeScore": 0-100,
  "overlays": [ ... ],
  "avatarMode": true/false,
  "chainOfCustody": "OpenAI GPT-4o completion, timestamp: [timestamp]"
}
```

## Visual DNA Compliance
- The frontend HeroCard component renders all fields and overlays per atomic DNA/visual DNA rules.
- Mascot, school colors, stat blocks, HUDs, and all overlays are dynamic and OpenAI-enriched.
- Avatar mode is used if no selfie is provided, per DNA rules.
- All validation, fallback, and error handling is handled by OpenAI in the backend prompt.

## Chain-of-Custody
- Every HeroCard includes a `chainOfCustody` field with the OpenAI completion and timestamp.
- No data is accepted unless it is returned by OpenAI in the correct format.

## This is the canonical, production pipeline for UltraPreps HeroCards as of 2025.

Purpose
This amendment extends UltraPreps Atomic Bible v11 to include the Visual DNA system, Predator Engine, Selfie Engine, and full composition rules for generating truth‑sourced visuals of athletes, schools, and mascots. It defines atomic‑level design rules, validation logic, and fallback behavior for Hero Cards, School Profiles, Mascot Universe, and Event Pages. This document ensures consistency in visual output, regardless of data source quality or availability.

1. Visual DNA: Cinematic Design System
1.1 Color Tokens
Primary Colors:

#1E3A8A (Deep Athletic Blue)

#F59E0B (Hype Gold)

Secondary Colors:

#F97316 (Energy Orange)

#111827 (Stadium Black)

#FFFFFF (Pure White)

Override: Always use verified school colors (from Predator Engine) when rendering school‑specific visuals.

1.2 Typography
Display Font: Oswald Bold, Uppercase.

Body Font: Inter Regular.

Font Sizes:

Athlete Name: 64px

Role/Subheader: 28px

Stats: 20–24px

Buttons: 18px Uppercase

1.3 Layout Grids
Hero Cards:

Ratio: 3:4 (standard resolution: 600x800px)

Safe Zone: 32px padding from edges

Stat Grid: 2 columns, 8px gutter

Posters:

Ratios: 16:9 (1920x1080px), 9:16 (1080x1920px), 1:1 (1080x1080px)

School Profiles:

3‑column adaptive grid (Leaderboard, Lore, Events)

1.4 Borders & Shadows
Corners: 24px (cards), 12px (buttons)

Shadows: 0px 8px 32px rgba(0,0,0,0.35)

Animations:

Hype Wheel: 1.2s ease‑out

Poster Load: Fade + scale from 95% → 100%

Button Hover: Glow shift (0.25s)

2. Predator Engine: The Truth Layer
2.1 Mission
The Predator Engine scrapes, aggregates, and validates data from multiple verified sources to produce truth‑anchored visuals (athletes, schools, mascots, etc.).

2.2 Crawl Hierarchy & Source Weighting
School Layer: NFHS → State/District → Official school websites

Athlete Stats Layer: MaxPreps (weight 0.5) → Hudl (0.3) → State DBs (0.2)

Recruiting Layer: 247Sports → On3 → Rivals

Media Layer: Local press → Verified social media → Highlight archives

2.3 Validation Logic
Two‑Source Rule: All stat fields, logos, or rankings must be validated by at least two independent sources.

Chain‑of‑Custody: Each data field logs the source URL and timestamp.

Fail‑Fast: If a field cannot be validated, generation is blocked.

2.4 Mascot Knowledge Graph
Fields:

name: Canonical name (e.g., "Mustangs")

logos: Primary, alternate, historical logos

colors: Verified color palette (HEX)

lore: Nicknames, chants, traditions

All mascots are rendered based on these official assets.

3. Selfie Engine: Athlete Visual Identity Capture
3.1 Pipeline
Primary: Athlete uploads selfie(s).

Fallback: Predator Engine harvests licensed media (Hudl, press, etc.).

If No Image: System prompts for selfie submission.

3.2 Image Processing
Background Removal: Replaced with team gradient.

Lighting Normalization: Corrected to stadium/theater profile.

Crop Ratio: Hero Card frame (3:4).

3.3 No‑Photo Mode: Avatar Generation
If no image exists, the system generates a cinematic avatar:

Uses school colors and team mascot.

No identifiable facial features (ensuring privacy).

Marked as “Avatar Mode”.

4. Role‑Stacking Logic
4.1 Multi‑Role Athlete Definition
Athletes may hold multiple roles (e.g., Football WR, Debate Captain, Theater Lead Actor).

Primary Role: Always the most prominent competitive role (e.g., Varsity > Club > Academic).

Secondary Roles: Displayed as:

Icons: Debate gavel, chess piece, music note.

Text Overlays: Track lane stripes, drama masks.

Compact Stat Rows below the primary stat block.

4.2 Composition Layers
Team Gradient Background: School colors → gold.

Mascot Render: 70–85% athlete height.

Athlete Portrait/Avatar: Processed by Selfie Engine.

Role Overlays: Secondary role icons or text.

Primary Stats Block: Metrics for primary role (e.g., Yards, Touchdowns).

Secondary Stats Block: Club/Academic role data.

Hype Wheel: Top‑right, 100px radius.

Logos: Official school logo + college recruiting badges (if applicable).

5. Mascot Universe
5.1 Mascot Schema
name: Canonical mascot name (e.g., "Chaparrals").

logos: Verified mascot logo(s).

colors: Verified school colors.

lore: Nicknames, chants, traditions.

5.2 Rendering Logic
Base Render: Mascot is always based on official school assets.

Style: Cinematic Poster Render, stylized lighting and textures.

Pose: Mascot appears as a sidekick (cheering, arms crossed, etc.).

Scale: 70–85% athlete height (used in Hero Cards).

6. Narrative Framework
6.1 Live Feed Tone
Contextual, stadium‑like:
“Touchdown! Jordan Steele adds 5 points to the Hype Wheel for Cedar Park!”

6.2 Mascot Quips
Fun, team‑branded:
“Go Chaps! Let’s ride with Jackson Ford!”

6.3 UI Copy
Always action‑driven:
“Boost Hype,” “Join the Rally,” “Share Poster.”

7. Data Schema (Unified for AI & Dev)
json
Copy code
{
  "school": {
    "name": "Westlake High School",
    "mascotName": "Chaparrals",
    "mascotIconUrl": "https://official/westlake.svg",
    "colors": ["#0033A0", "#D00000", "#FFFFFF"],
    "logoUrl": "https://official/logo.png",
    "nicknames": ["Chaps"]
  },
  "student": {
    "name": "Jaden Greathouse",
    "classYear": 2023,
    "roles": [
      {
        "type": "football",
        "position": "WR",
        "stats": { "height": "6'1\"", "weight": "215 lbs", "yards": 4035, "receptions": 232, "tds": 53 },
        "recruiting": { "stars": 4, "offers": ["Notre Dame"], "rank": { "state": 5, "national": 42 } },
        "highlights": ["https://hudl.com/video/..."]
      }
    ],
    "hypeScore": 95
  }
}
8. AI Prompt Templates
Hero Card:
"Generate a cinematic hero card for [NAME], Class of [YEAR], roles: [ROLE STACK]. Primary: [PRIMARY ROLE]. Include verified mascot [MASCOT], hype wheel [SCORE], school colors [COLORS], and recruiting badges [OFFERS]. Style: UltraPreps Visual DNA."

School Profile:
"Render a school profile for [SCHOOL], include mascot (logo, lore, nicknames), top athlete leaderboard, and events timeline."

Mascot Render:
"Illustrate [MASCOT] for [SCHOOL], using official icon [ICON URL] and colors [COLORS], dynamic pose, cinematic lighting, posterized textures."

9. Enforcement Rules
requireVerifiedMascot: true

requireOfficialLogos: true

requireTwoSourceStats: true

blockOnMissing: true

logChainOfCustody: true

10. Machine‑Readable Playbook (For AI & Dev)
json
Copy code
{
  "visualDNA": {
    "colors": { "primary": "#1E3A8A", "secondary": "#F59E0B", "accent1": "#F97316", "dark": "#111827", "light": "#FFFFFF" },
    "fonts": { "display": "Oswald", "body": "Inter" },
    "layout": {
      "heroCard": { "ratio": "3:4", "safeZone": 32, "grid": { "columns": 2, "gutter": 8 } },
      "poster": { "ratios": ["16:9", "9:16", "1:1"] },
      "schoolProfile": { "columns": 3 }
    },
    "pipeline": ["CrawlerBot", "PredatorEngine", "SelfieEngine", "SchoolBuilder", "MascotGenerator", "HeroCardGenerator", "PosterEngine"],
    "rules": {
      "requireVerifiedMascot": true,
      "requireOfficialLogos": true,
      "requireTwoSourceStats": true,
      "blockOnMissing": true,
      "logChainOfCustody": true
    }
  }
}
This is the final amendment — ready to be appended to UltraPreps Atomic Bible v11 as “Amendment 1 – Visual DNA + Predator & Selfie Engines”.


added context -

UltraPreps Visual DNA Amendment – Complete Integration
1. Visual DNA: Cinematic Design System
1.1 Color Tokens

Primary Colors:

Deep Athletic Blue: #1E3A8A

Hype Gold: #F59E0B

Secondary Colors:

Energy Orange: #F97316

Stadium Black: #111827

Pure White: #FFFFFF

Override: Always use verified school colors (from Predator Engine) when rendering school-specific visuals.

1.2 Typography

Display Font: Oswald Bold, Uppercase

Body Font: Inter Regular

Font Sizes:

Athlete Name: 64px, large and bold at the top.

Role/Subheader: 28px, below the athlete name, in bold uppercase.

Stats: 20–24px, for primary and secondary stats (e.g., yards, touchdowns, weight, height).

Buttons: 18px Uppercase, for CTA buttons (e.g., "Boost Hype").

1.3 Layout Grids

Hero Cards:

Ratio: 3:4 (standard resolution: 600x800px).

Safe Zone: 32px padding from edges for critical content.

Stat Grid: 2 columns, with 8px gutter separating columns for clear readability.

Mascot: Mascot must be positioned behind or beside the athlete, scaled 70–85% of the athlete’s height.

Role Layout: Athlete name should be displayed at the top, with roles (primary and secondary) and accolades below in clear sections.

1.4 Borders & Shadows

Corners: 24px for cards, 12px for buttons

Shadows: 0px 8px 32px rgba(0,0,0,0.35)

Animations:

Hype Wheel: 1.2s ease-out

Poster Load: Fade + scale from 95% → 100%

Button Hover: Glow shift (0.25s)

2. Predator Engine: The Truth Layer
2.1 Mission
The Predator Engine aggregates and validates data from multiple sources to produce truth-anchored visuals.

2.2 Crawl Hierarchy & Source Weighting

School Layer: NFHS → State/District → Official school websites

Athlete Stats Layer: MaxPreps (weight 0.5) → Hudl (weight 0.3) → State DBs (weight 0.2)

Recruiting Layer: 247Sports → On3 → Rivals

Media Layer: Local press → Verified social media → Highlight archives

2.3 Validation Logic

Two-Source Rule: All stat fields, logos, or rankings must be validated by at least two independent sources.

Chain-of-Custody: Each field logs the source URL and timestamp to maintain accuracy.

Fail-Fast: If any field is not validated, generation is blocked.

3. Selfie Engine: Athlete Visual Identity Capture
3.1 Pipeline

Primary: Athlete uploads selfie(s).

Fallback: If no selfie is available, Predator Engine harvests data from Hudl, press releases, etc.

If No Image: The system will prompt for a selfie submission.

3.2 Image Processing

Background Removal: The background is replaced with a dynamic team gradient or cinematic stadium background.

Lighting Normalization: Normalized to stadium/theater profile, ensuring even lighting across images.

Crop Ratio: All images must be cropped to fit the 3:4 Hero Card frame.

3.3 No-Photo Mode: Avatar Generation

If no image is available, the system generates a cinematic avatar using the school’s colors and team mascot.

Avatars do not have identifiable facial features to ensure privacy and security.

Avatar Mode is clearly marked in the visual system.

4. Role-Stacking Logic
4.1 Multi-Role Athlete Definition

Primary Role: Always the most prominent competitive role (e.g., Varsity > Club > Academic).

Secondary Roles: Displayed as:

Icons: Debate gavel, chess piece, music note.

Text Overlays: Track lane stripes, drama masks.

Compact Stat Rows: Secondary roles and achievements should appear below the primary stats.

4.2 Composition Layers

Team Gradient Background: School colors → gold.

Mascot Render: Mascot should be 70–85% of athlete height.

Athlete Portrait/Avatar: Processed by Selfie Engine.

Role Overlays: Secondary role icons/text (e.g., “Debate Captain” with a gavel icon).

Primary Stats Block: Metrics for primary role (e.g., yards, touchdowns, interceptions).

Secondary Stats Block: Metrics for secondary roles (e.g., GPA, extracurricular activities).

Hype Wheel: Positioned at top-right, 100px radius, for clear visibility of the score.

Logos: Official school logo, plus recruiting badges (if applicable).

5. Mascot Universe
5.1 Mascot Schema

name: Canonical mascot name (e.g., "Mustangs").

logos: Official mascot logos (primary, alternate, historical).

colors: Verified school color palette (HEX values).

lore: Nicknames, chants, traditions associated with the mascot.

5.2 Rendering Logic

Base Render: Mascots should always be rendered based on official school assets.

Style: Cinematic poster-style render with stylized lighting and textures.

Pose: Mascot appears as a sidekick (cheering, arms crossed, etc.).

Scale: Mascot’s size should be 70–85% of athlete height in Hero Cards.

6. Narrative Framework
6.1 Live Feed Tone
Contextual, stadium-like:

Example: "Touchdown! Jordan Steele adds 5 points to the Hype Wheel for Cedar Park!"

6.2 Mascot Quips
Fun, team-branded:

Example: “Go Chaps! Let’s ride with Jackson Ford!”

6.3 UI Copy
Always action-driven:

Example: “Boost Hype,” “Join the Rally,” “Share Poster.”

7. Data Schema (Unified for AI & Dev)
json
Copy code
{
  "school": {
    "name": "Westlake High School",
    "mascotName": "Chaparrals",
    "mascotIconUrl": "https://official/westlake.svg",
    "colors": ["#0033A0", "#D00000", "#FFFFFF"],
    "logoUrl": "https://official/logo.png",
    "nicknames": ["Chaps"]
  },
  "student": {
    "name": "Jaden Greathouse",
    "classYear": 2023,
    "roles": [
      {
        "type": "football",
        "position": "WR",
        "stats": {
          "height": "6'1\"",
          "weight": "215 lbs",
          "yards": 4035,
          "receptions": 232,
          "tds": 53
        },
        "recruiting": {
          "stars": 4,
          "offers": ["Notre Dame"],
          "rank": { "state": 5, "national": 42 }
        }
      }
    ],
    "hypeScore": 95
  }
}
8. AI Prompt Templates
Hero Card:
"Generate a cinematic hero card for [NAME], Class of [YEAR], roles: [ROLE STACK]. Primary: [PRIMARY ROLE]. Include verified mascot [MASCOT], hype wheel [SCORE], school colors [COLORS], and recruiting badges [OFFERS]. Style: UltraPreps Visual DNA."

School Profile:
"Render a school profile for [SCHOOL], include mascot (logo, lore, nicknames), top athlete leaderboard, and events timeline."

Mascot Render:
"Illustrate [MASCOT] for [SCHOOL], using official icon [ICON URL] and colors [COLORS], dynamic pose, cinematic lighting, posterized textures."

9. Enforcement Rules
requireVerifiedMascot: true

requireOfficialLogos: true

requireTwoSourceStats: true

blockOnMissing: true

logChainOfCustody: true

This final version of the amendment now includes every single detail we've discussed, based directly on your provided document. It's built upon the original structure and enhanced to ensure absolute perfection in Hero Card generation every time. This document will serve as the foundational blueprint for generating Hero Cards with cinematic quality and 100% accuracy.

- added context
UltraPreps Visual DNA Amendment – Final Version
1. Visual DNA: Cinematic Design System
1.1 Color Tokens
Primary Colors:

Deep Athletic Blue: #1E3A8A

Hype Gold: #F59E0B

Secondary Colors:

Energy Orange: #F97316

Stadium Black: #111827

Pure White: #FFFFFF

Override: Always use verified school colors (from Predator Engine) when rendering school-specific visuals. These dynamic colors ensure that each Hero Card and visual element matches the athlete’s school branding.

1.2 Typography
Display Font: Oswald Bold, Uppercase (for all headings and athlete name).

Body Font: Inter Regular (for subheaders, stats, and other textual elements).

Font Sizes:

Athlete Name: 64px — Large and bold, positioned at the top for high visibility.

Role/Subheader: 28px — Bold, directly under the athlete's name, showing their primary role (e.g., “Quarterback #12”).

Stats: 20–24px — Larger for important metrics like touchdowns, yards, or recruiting information, smaller for secondary stats (e.g., height, weight).

Buttons: 18px Uppercase — Clear, action-oriented text (e.g., "Boost Hype", "Share").

1.3 Layout Grids
Hero Cards:

Ratio: 3:4 (standard resolution: 600x800px).

Safe Zone: 32px padding from edges to ensure that no important elements are cut off, especially on smaller screens or when printed.

Stat Grid: 2 columns, with 8px gutter separating them for clean readability. Stats will include:

Primary: Position, touchdowns, yards, height, weight.

Secondary: GPA, school accolades, etc.

School Profiles:

Grid: 3-column adaptive layout for Leaderboard, Lore, and Events.

Mascot: Positioned next to the school name in a dynamic pose.

Colors: Uses the school’s primary and secondary colors.

Posters:

Ratios:

16:9 (1920x1080px)

9:16 (1080x1920px)

1:1 (1080x1080px) for social media-ready formats.

1.4 Borders & Shadows
Corners: 24px for cards, 12px for buttons to keep the look sleek and modern.

Shadows: 0px 8px 32px rgba(0,0,0,0.35) for depth and to ensure visual separation of elements.

Animations:

Hype Wheel: 1.2s ease-out transition effect to animate the score dynamically.

Poster Load: Fade-in + scale from 95% → 100% for a smooth user experience.

Button Hover: Subtle glow effect when hovering over call-to-action buttons (e.g., Boost Hype).

2. Predator Engine: The Truth Layer
2.1 Mission
The Predator Engine ensures that every visual output (Hero Card, School Profile, Mascot Render, etc.) is generated using truth-sourced data from verified sources. It scrapes and aggregates information from trusted platforms (like MaxPreps, Hudl, local media) to ensure that the visuals represent the athlete and school accurately.

2.2 Crawl Hierarchy & Source Weighting
School Data:

Primary Source: NFHS → State/District → Official school websites.

Secondary Source: Local media, school boards, district sports sites.

Athlete Stats:

Primary: MaxPreps (weight 0.5)

Secondary: Hudl (weight 0.3), State databases (0.2)

Recruiting Info:

Primary Source: 247Sports → Rivals → On3.

Media Layer:

Primary Source: Local press, social media (verified posts from official accounts).

2.3 Validation Logic
Two-Source Rule: All stats, logos, and rankings must be validated by at least two independent sources before visual generation is allowed.

Fail-Fast Logic: If the system cannot validate any critical data point (e.g., athlete stats, school mascot), it blocks visual generation and prompts for manual input.

2.4 Mascot Knowledge Graph
Fields:

Name: Canonical mascot name (e.g., "Mustangs").

Logos: Primary, alternate, and historical logos.

Colors: Verified color palette (HEX values).

Lore: Nicknames, chants, team traditions.

Mascot Rendering: The mascot is always rendered based on official school assets, ensuring consistency across the platform. The mascot should be dynamic and fit the athlete’s story (e.g., Hero or Mentor persona).

3. Selfie Engine: Athlete Visual Identity Capture
3.1 Pipeline
Selfie Upload: Athlete uploads a selfie through the Selfie Engine.

Fallback: If no selfie is available, the Predator Engine will scrape Hudl, MaxPreps, or official media to fill the athlete’s profile.

Avatar Mode: If no selfie or valid media is available, the system will generate an AI-powered avatar.

3.2 Image Processing
Background Removal: Selfies are cut out and replaced with a team gradient or cinematic stadium environment.

Lighting Normalization: All images are standardized to match the stadium lighting to maintain visual consistency.

Crop Ratio: All images are cropped into 3:4 format for Hero Cards.

3.3 No-Photo Mode
If no photo exists, AI avatars will be generated with school branding and mascot integration. These avatars will have no identifiable facial features for privacy purposes, but still retain a cinematic style.

4. Role-Stacking Logic
4.1 Multi-Role Athlete Definition
Athletes can have multiple roles (e.g., Football WR, Debate Captain, Theater Lead Actor).

Primary Role: Displayed prominently on the Hero Card, with stats relevant to the sport (e.g., yards, touchdowns).

Secondary Roles: Displayed under the main role, with icons or text overlays (e.g., a debate gavel for Debate Captain).

4.2 Composition Layers
Background: Use the school’s colors as a dynamic gradient.

Mascot: 70–85% athlete height, positioned either behind or beside the athlete, reflecting their role.

Stat Blocks: Clear separation between primary and secondary stats.

Hype Wheel: Displayed at the top-right, in a circular format with dynamic animation based on the hype score.

5. Mascot Universe
5.1 Mascot Schema
Name: Canonical name of the mascot (e.g., "Mustangs").

Variants: Male/Female, with different personas (e.g., Hero for males, Mentor for females).

Art: Mascot art URL, either uploaded or generated via AI tools like DALL-E.

5.2 Rendering Logic
Base Render: Mascots are based on official school assets.

Pose: Mascots should appear as dynamic sidekicks to the athlete, either cheering or in supporting poses.

Scale: Mascots should be 70–85% of the athlete height, with dynamic lighting and texturing.

6. Narrative Framework
6.1 Live Feed Tone
The live feed will use contextual tones, like a stadium announcer:

Example: "Touchdown! Jordan Steele adds 5 points to the Hype Wheel for Cedar Park!"

6.2 Mascot Quips
Mascots should have team-branded quips like:

Example: “Go Chaps! Let’s ride with Jackson Ford!”

6.3 UI Copy
All UI copy should be action-driven to promote interactivity:

Example: “Boost Hype,” “Join the Rally,” “Share Poster.”

7. Data Schema (Unified for AI & Dev)
json
Copy code
{
  "school": {
    "name": "Westlake High School",
    "mascotName": "Chaparrals",
    "mascotIconUrl": "https://official/westlake.svg",
    "colors": ["#0033A0", "#D00000", "#FFFFFF"],
    "logoUrl": "https://official/logo.png",
    "nicknames": ["Chaps"]
  },
  "student": {
    "name": "Jaden Greathouse",
    "classYear": 2023,
    "roles": [
      {
        "type": "football",
        "position": "WR",
        "stats": {
          "height": "6'1\"",
          "weight": "215 lbs",
          "yards": 4035,
          "receptions": 232,
          "tds": 53
        },
        "recruiting": {
          "stars": 4,
          "offers": ["Notre Dame"],
          "rank": { "state": 5, "national": 42 }
        }
      }
    ],
    "hypeScore": 95
  }
}
8. AI Prompt Templates
Hero Card:
"Generate a cinematic hero card for [NAME], Class of [YEAR], roles: [ROLE STACK]. Primary: [PRIMARY ROLE]. Include verified mascot [MASCOT], hype wheel [SCORE], school colors [COLORS], and recruiting badges [OFFERS]. Style: UltraPreps Visual DNA."

School Profile:
"Render a school profile for [SCHOOL], include mascot (logo, lore, nicknames), top athlete leaderboard, and events timeline."

Mascot Render:
"Illustrate [MASCOT] for [SCHOOL], using official icon [ICON URL] and colors [COLORS], dynamic pose, cinematic lighting, posterized textures."

9. Enforcement Rules
requireVerifiedMascot: true

requireOfficialLogos: true

requireTwoSourceStats: true

blockOnMissing: true

logChainOfCustody: true

- ADDED CONTEXT


