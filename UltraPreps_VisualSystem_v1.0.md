
# UltraPreps Visual System v1.0
This document combines the **Prompt Bible v4.0**, **Visual DNA Amendment v2.0**, and **Visual Explainer Deck** into a single expanded reference for developers, designers, and AI agents.

---

# Part 1: UltraPreps Prompt Bible v4.0 (Expanded)

## Purpose
Defines the locked generation pipeline for HeroCards, Mascots, and HUD assets in UltraPreps. Ensures photorealistic, ESPN-grade outputs that are role-specific, school-branded, and grid-consistent.

## Universal HeroCard Prompts
**Style:** Photorealistic ESPN cover-style sports photography.  
**Camera:** Canon 1DX DSLR simulation, f/2.8, 70-200mm lens, HDR lighting.  
**Output:** Poster-grade 8K resolution.  
**Composition:** Heroic framing, slightly low angle.  
**Overlay:** Pixel-perfect ESPN grid: name, school, role, class year, Founder ribbon, HYPE ring, stats.  
**Props:** Must match role (see Role-Specific Logic).  
**Mascot:** Subtle, realistic, LoRA-trained background presence.

## Role-Specific Logic (HeroCards)
### Football
- Props: Helmets, gloves, stadium environments, trophies for championships.
- Environment: Friday Night Lights stadium lighting, game-day victory or action poses.
- Mascot: School LoRA model subtly integrated.

### Cheer
- Props: Pom-poms, megaphones, team banners.
- Environment: Pep rally stage, competition floor, sideline performances.
- Pose: Energetic, team-oriented.

### Band
- Props: Instruments (e.g., drums, batons), conducting sticks.
- Environment: Marching field, halftime performance, competition stage.

### Esports
- Props: Gaming rigs, headsets, branded jerseys.
- Environment: Esports arena with vibrant LED lighting (purple/blue accents).

### Performing Arts
- Props: Costumes, stage props.
- Environment: Theater stage lighting with dramatic spotlights.

### Academic/Clubs
- Props: Books, robotics gear, STEM equipment.
- Environment: Classroom or competition stage settings.

## Mascot Prompts
**Style:** Realistic, persona-driven representations of mascots.  
**Integration:** Subtle background or banner presence.  
**LoRA-Locked:** Each mascot has a LoRA model for consistency.  
**Persona JSON Template:**
```json
{
  "name": "Elgin Owl",
  "tone": "Spirited, wise, supportive",
  "catchphrases": ["Go Owls!", "Wisdom and Strength!"],
  "colors": ["#6B0AC9", "#FFFFFF"]
}
```

## HUD Prompts
**Style:** ESPN dashboard overlays matching HeroCard DNA.  
**Dynamic Content:** Live HYPE bar, achievements, events, role-specific data.  
**Role-Aware:** Dashboard widgets adapt to student role.

## Sample HeroCard JSON Payload
```json
{
  "student_name": "Haleigh Coleman",
  "class_year": 2023,
  "school": "Elgin High School",
  "role": "Cheer Captain",
  "jersey_number": null,
  "height": null,
  "weight": null,
  "hype_score": 88,
  "mascot": "Elgin Owl",
  "colors": ["#6B0AC9", "#FFFFFF"]
}
```

## QA Pipeline
1. **Vision QA:** Automatic checks for role-appropriate props, branding, likeness.
2. **Human-in-the-Loop:** Manual selection of top-tier outputs; discard 90%.
3. **Enhancement:** Poster-grade sharpening, ESPN color grading.

---

# Part 2: UltraPreps Visual DNA Amendment v2.0 (Expanded)

## Core Visual Identity
- **Style:** ESPN-cover realism only. No Marvel/artistic drift.
- **Lighting:** HDR stadium lighting for athletics; role-specific lighting for others.
- **Color Grading:** Cool whites, accurate vibrant school colors.

## HeroCard Grid Standards
- Fixed layout for names, stats, HYPE rings, and ribbons.
- Typography: Bold sans-serif (ESPN-style), uppercase for names.
- Safe zones: 5% margin for overlays to prevent text cutoff.

## HUD Standards
- Role-specific modules (football = stats, cheer = routines, etc.).
- Mascots, colors, branding auto-pulled from SchoolUniverseBot.

---

# Part 3: UltraPreps Visual Explainer Deck

## Why This Matters
- HeroCards are students' first UltraPreps experience.
- Must feel real, inspiring, and school-specific.
- Consistency: Every card, mascot, and HUD must share ESPN-grade DNA.

## Locked Visual DNA
- **Style:** ESPN-cover realism.
- **Lighting:** HDR broadcast or role-appropriate.
- **Props:** Role-specific.
- **Mascots:** Realistic, persona-driven.
- **Grid:** Pixel-perfect ESPN layout.

## Wrong vs Right
**Wrong:** Cartoonish, Marvel-style, cross-role props, cluttered grids.  
**Right:** Photorealistic DSLR portraits, proper stadium lighting, role-matched props, clean ESPN overlay.

## Process
1. Generate: Role-aware HeroCards & mascots.
2. Curate: Human-in-the-loop QA.
3. Enhance: Poster-grade sharpening, ESPN color grading.
4. Integrate: Sync HeroCards into HUDs.

## Impact
- Students feel immortalized.
- Schools receive branded, consistent ESPN-grade media.
- UltraPreps becomes polished and inspiring for all users.
