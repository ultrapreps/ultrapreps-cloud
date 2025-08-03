
# UltraPreps Visual System v1.0 (Presentation-Ready)
This document combines the **Prompt Bible v4.0**, **Visual DNA Amendment v2.0**, and **Visual Explainer Deck** into a single expanded reference for developers, designers, and stakeholders, now with embedded placeholders for visual examples.

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

**Example HeroCard (Right):**
![Correct HeroCard Example](images/hero_correct.png)

**Example HeroCard (Wrong):**
![Incorrect HeroCard Example](images/hero_wrong.png)

## Role-Specific Logic (HeroCards)
*(Includes visuals for each role)*

### Football
![Football Example](images/football_card.png)
- Props: Helmets, gloves, stadium environments, trophies for championships.
- Environment: Friday Night Lights stadium lighting, game-day victory or action poses.

### Cheer
![Cheer Example](images/cheer_card.png)
- Props: Pom-poms, megaphones, team banners.
- Environment: Pep rally stage, competition floor, sideline performances.

### Band
![Band Example](images/band_card.png)
- Props: Instruments, conducting sticks.
- Environment: Marching field, halftime performance, competition stage.

### Esports
![Esports Example](images/esports_card.png)
- Props: Gaming rigs, headsets, branded jerseys.
- Environment: Esports arena with vibrant LED lighting (purple/blue accents).

## Mascot Prompts
![Mascot Example](images/mascot_example.png)
**Style:** Realistic, persona-driven representations of mascots.  
**Integration:** Subtle background or banner presence.  
**LoRA-Locked:** Each mascot has a LoRA model for consistency.  

## HUD Prompts
![HUD Example](images/hud_example.png)
**Style:** ESPN dashboard overlays matching HeroCard DNA.  
**Dynamic Content:** Live HYPE bar, achievements, events, role-specific data.  
**Role-Aware:** Dashboard widgets adapt to student role.

---

# Part 2: UltraPreps Visual DNA Amendment v2.0 (Expanded)

## Core Visual Identity
- **Style:** ESPN-cover realism only. No Marvel/artistic drift.
- **Lighting:** HDR stadium lighting for athletics; role-specific lighting for others.
- **Color Grading:** Cool whites, accurate vibrant school colors.

## HeroCard Grid Standards
![Grid Overlay Example](images/grid_overlay.png)
- Fixed layout for names, stats, HYPE rings, and ribbons.
- Typography: Bold sans-serif (ESPN-style), uppercase for names.
- Safe zones: 5% margin for overlays to prevent text cutoff.

---

# Part 3: UltraPreps Visual Explainer Deck

## Why This Matters
![Immortalization Example](images/immortalization.png)
- HeroCards are students' first UltraPreps experience.
- Must feel real, inspiring, and school-specific.
- Consistency: Every card, mascot, and HUD must share ESPN-grade DNA.

## Wrong vs Right
**Wrong:**  
![Wrong Example](images/wrong_example.png)

**Right:**  
![Right Example](images/right_example.png)

## Process
1. Generate: Role-aware HeroCards & mascots.
2. Curate: Human-in-the-loop QA.
3. Enhance: Poster-grade sharpening, ESPN color grading.
4. Integrate: Sync HeroCards into HUDs.

---

# Impact
- Students feel immortalized.
- Schools receive branded, consistent ESPN-grade media.
- UltraPreps becomes polished and inspiring for all users.
