# Image Requirements for P0 Pages

## SEO Image Strategy

Each page needs 2-3 images for optimal on-page SEO:
1. **Hero/Featured image** - top of the page
2. **Inline supporting images** - within sections
3. **OG image** - for social sharing (1200×630px)

---

## Page 1: Arceus Judgment (`/arceus-judgment/`)

### Required Images:
1. **`arceus-judgment-hero.jpg`** (1200×675px)
   - Arceus in judgment form or golden glowing appearance
   - Place: After H1 title
   - Alt: "Arceus Judgment mode in PokéSurvivor"

2. **`judgment-arena-layout.jpg`** (800×450px)
   - Arena layout showing safe zones and attack patterns
   - Place: Section "The Arena Layout"
   - Alt: "Arceus Judgment arena layout with safe zones"

3. **`og-arceus-judgment.jpg`** (1200×630px)
   - Title: "Arceus Judgment Guide"
   - Visual: Arceus silhouette with timer "35:00"
   - Already specified in frontmatter

---

## Page 2: Fusion Bonds (`/fusion-bonds/`)

### Required Images:
1. **`fusion-bonds-hero.jpg`** (1200×675px)
   - Visual representation of multiple moves fusing into one slot
   - Place: After H1 title
   - Alt: "Fusion Bonds system in PokéSurvivor"

2. **`fusion-diagram-visual.jpg`** (800×450px)
   - Visual diagram: 1 Bond → 2 moves, 4 Bonds → 5 moves
   - Place: Section "Fusion Mechanics Explained"
   - Alt: "Fusion Bonds diagram showing move combinations"

3. **`og-fusion-bonds.jpg`** (1200×630px)
   - Title: "Fusion Bonds Guide"
   - Visual: Multiple move icons merging
   - Already specified in frontmatter

---

## Page 3: Moves (`/moves/`)

### Required Images:
1. **`moves-evolution-hero.jpg`** (1200×675px)
   - Before/after evolution example (Ember → Fire Blast)
   - Place: After H1 title
   - Alt: "Move evolution system in PokéSurvivor"

2. **`attack-patterns-grid.jpg`** (800×600px)
   - Grid showing 6-8 attack pattern examples
   - Place: Section "Move Types and Attack Patterns"
   - Alt: "21 attack patterns in PokéSurvivor"

3. **`evolution-cards-example.jpg`** (800×450px)
   - Golden evolution card + stat upgrade cards
   - Place: Section "How Move Evolution Works"
   - Alt: "Evolution cards and stat upgrade requirements"

4. **`og-moves.jpg`** (1200×630px)
   - Title: "Complete Move Guide"
   - Visual: Multiple move icons
   - Already specified in frontmatter

---

## Image Source Options

### Option A: Official Game Screenshots
- Play the game and take screenshots
- Crop to focus on relevant UI elements
- Add unique borders/overlays to avoid duplicates

### Option B: Custom Illustrations
- Create simplified diagrams/infographics
- Use color palette from site design
- Copyright-free, unique content

### Option C: Placeholder + Credits
- Use placeholder images initially
- Add "Screenshot from PokéSurvivor.com" attribution
- Replace with custom graphics later

---

## Anti-Duplicate Strategy

To avoid Google duplicate image penalty:

1. **Unique Filenames**
   - Use descriptive, page-specific names
   - Include page slug: `arceus-judgment-hero.jpg`

2. **Image Modifications**
   - Add 5px colored border (site accent color)
   - Resize to exact dimensions (not standard sizes)
   - Add watermark: "pokesurvivor.wiki" in corner

3. **Unique Alt Text**
   - Page-specific descriptions
   - Include keywords naturally
   - Never duplicate alt text across images

4. **WebP + JPG Formats**
   - Serve WebP for modern browsers
   - Fallback to JPG
   - Different compression = different file hash

---

## Next Steps

1. **Immediate**: Add placeholder images with proper structure
2. **Short-term**: Take game screenshots and process them
3. **Long-term**: Create custom infographics

Run: `npm run optimize-images` after adding images.
