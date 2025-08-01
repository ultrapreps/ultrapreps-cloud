
# ULTRAPREPS_PROMPT_BIBLE_V3.0

**Purpose:**  
This Bible defines the **final, production-ready prompts, schemas, and rules** for UltraPreps AI systems.  
It ensures **no drift**, **photo-realistic ESPN-grade outputs**, and **consistency across all athlete and mascot assets** — starting with **Gage Coleman, UltraPreps Founder**.

---

## I. FOUNDER-GRADE FIRST PROMPTS

These are the non-negotiable **seed prompts** for mascots, student personas, and HeroCards. They **must be run before any asset generation**.

### A. Student Persona Creation (LoRA + SDXL)
**Goal:** Build a **photo-realistic, consistent portrait** of the athlete.
```
Take the uploaded selfies of [STUDENT NAME], Class of [YEAR], athlete at [SCHOOL NAME], and generate a cinematic sports portrait:
- Maintain facial accuracy and proportions (no exaggeration)
- Style: ESPN x Marvel x Nike hybrid, photorealistic
- Pose: Confident, dynamic 3/4 angle
- Clothing: [TEAM COLORS] authentic uniform with number [JERSEY NUMBER]
- Background: Friday Night Lights stadium with subtle crowd depth and school branding
- Output: 4K portrait, HeroCard-ready
```
**Integration:**  
- Train as LoRA: `student_[name]_lora_v1`.  
- Store as Student DNA for reuse across all future renders.

---

### B. Mascot Creation (LoRA + Pose Library)
**Goal:** Lock the school mascot as a **persistent, cinematic character**.
```
Create a high-resolution, cinematic illustration of [MASCOT NAME] for [SCHOOL NAME]:
- Style: Marvel x ESPN x Nike, semi-realistic
- Colors: [PRIMARY COLOR], [SECONDARY COLOR]
- Pose: Dynamic action matching [SPORT CONTEXT] (e.g., WR catch, cheer rally)
- Lighting: Stadium under Friday Night Lights
- Scale: Slightly smaller than the athlete when layered together
- Output: 8K portrait, layered for integration
```
**Integration:**  
- Train as LoRA: `mascot_[school]_lora_v1`.
- Prebuild pose library: celebration, action, cheer, sideline.

---

### C. HeroCard Composition
**Goal:** Use a **locked UltraPreps grid** based on the approved reference card.
```
Create a HeroCard for [STUDENT NAME], Class of [YEAR], [SPORT], at [SCHOOL NAME]:
- Use the UltraPreps Founder grid for composition
- Name & class: Bold ESPN-style typography
- HYPE ring bottom right, metallic sheen
- Stats block: Receptions, yards, TDs
- Founder ribbon: Metallic gold "UltraPreps Founder" below name
- Mascot: Integrated, dynamic, positioned behind athlete with depth
- Lighting: Cinematic, print-grade
- Output: 4K portrait, poster-quality
```

---

## II. DNA SCHEMAS

### Student DNA Template
```json
{
  "student_name": "Gage Coleman",
  "class_year": 2027,
  "school": "Marble Falls High School",
  "sport": "Football",
  "jersey_number": 6,
  "colors": ["#4B0082", "#FFD700"],
  "lora_model": "student_gage_coleman_lora_v1",
  "flair": ["UltraPreps Founder"]
}
```

### Mascot DNA Template
```json
{
  "mascot_name": "Mustang",
  "school": "Marble Falls High School",
  "colors": ["#4B0082", "#FFD700"],
  "lora_model": "mascot_marble_falls_lora_v1",
  "pose_library": ["wr_catch", "sideline_cheer", "celebration"],
  "persona": {
    "tone": "competitive, fierce, motivational",
    "catchphrases": [
      "Ride On, Mustangs!",
      "Friday Night Lights Forever!",
      "Protect the Herd!"
    ]
  }
}
```

---

## III. VISION QA PROMPTS

```
Analyze this generated HeroCard for [STUDENT NAME], [SCHOOL NAME]. Confirm:
1. Jersey matches [JERSEY NUMBER].
2. Colors match [PRIMARY] & [SECONDARY].
3. Mascot matches [MASCOT NAME] and is in a dynamic action pose.
4. Composition matches the UltraPreps Founder grid.
5. Founder ribbon is present and legible.
Respond PASS/FAIL for each. Suggest fixes for any FAIL.
```

---

## IV. COPYWRITING PROMPTS

### Recruiting Bio
```
Write a 150-word recruiting bio for [STUDENT NAME], [SPORT], Class of [YEAR] at [SCHOOL NAME]. Highlight key stats, achievements, leadership roles. Tone: ESPN scouting report.
```

### HUD Blurb
```
Write a 1–2 sentence motivational HUD blurb for [STUDENT NAME]. Include hype for recent stats and a CTA to boost HYPE.
```

### Founder Caption
```
Write a 1–2 sentence proud announcement of [STUDENT NAME] as UltraPreps Founder. Tone: inspiring, ESPN + community-driven.
```

---

## V. FAILOVER STRATEGY

1. **1st Fail:** Refine prompts with GPT‑4o recommendations.  
2. **2nd Fail:** Escalate to Claude for advanced creative repair prompts.  
3. **3rd Fail:** Queue for manual review by design ops.

---

## VI. INTEGRATION FLOW

1. Run First Prompts → Train LoRA for student & mascot.  
2. Save as DNA (JSON).  
3. Generate HeroCard → Refine via SDXL + ControlNet.  
4. Run Vision QA → Auto-regenerate if FAIL.  
5. Deploy clean HeroCard + HUD-enhanced version.  

---

**This Prompt Bible is the single source of truth for generating Founder-grade UltraPreps HeroCards and personas.**
