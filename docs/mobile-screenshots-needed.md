# Mobile Screenshots Requirements

**Generated:** 2026-10-17  
**Status:** Requirements documentation (no code changes)  
**Purpose:** Define screenshot needs for mobile.astro (en & zh) pages to address audit gap

---

## Background

The mobile page audit identified missing real device screenshots. Currently, the page uses only a diagram (`pokesurvivor-mobile-controls.webp`) but lacks actual gameplay and installation process screenshots.

## Existing Image Assets

Current images in `public/images/`:
- `pokesurvivor-mobile-controls.webp` (diagram, already in use)
- `gameplay.webp` (general gameplay, not mobile-specific)
- Various co-op, menu, and tier list images

**Gap:** No real mobile device screenshots showing Add to Home Screen flow, actual touch controls in action, or Settings → Controls interface.

---

## Required Screenshots

### 1. iOS Add to Home Screen Flow (3 images)

**Purpose:** Illustrate the iOS installation process mentioned in lines 154-158 (en) / 155-159 (zh)

| Filename | Description | Suggested Size | Use |
|----------|-------------|----------------|-----|
| `ios-add-to-home-1.webp` | Safari showing pokesurvivor.com with Share button highlighted | 750×1334 (portrait) | Step 1: Viewing the site |
| `ios-add-to-home-2.webp` | Share menu scrolled to "Add to Home Screen" option | 750×1334 (portrait) | Step 2: Finding the option |
| `ios-add-to-home-3.webp` | "Add to Home Screen" dialog with name field and Add button | 750×1334 (portrait) | Step 3: Confirmation |

**Insertion location:**
- After line 158 (en) or line 159 (zh)
- Within `.step-card` for iOS section

---

### 2. Android Chrome Install Prompt (1-2 images)

**Purpose:** Illustrate the Android installation process mentioned in lines 165-169 (en) / 166-170 (zh)

| Filename | Description | Suggested Size | Use |
|----------|-------------|----------------|-----|
| `android-add-to-home-1.webp` | Chrome menu (⋮) expanded showing "Add to Home screen" or "Install app" | 1080×1920 (portrait) | Menu navigation |
| `android-add-to-home-2.webp` | (Optional) Install confirmation dialog | 1080×1920 (portrait) | Confirmation step |

**Insertion location:**
- After line 169 (en) or line 170 (zh)
- Within `.step-card` for Android section

---

### 3. Landscape Gameplay with Touch Controls (1 image)

**Purpose:** Show real in-game UI with virtual joystick and move buttons visible

| Filename | Description | Suggested Size | Use |
|----------|-------------|----------------|-----|
| `mobile-gameplay-landscape.webp` | Actual gameplay screenshot in landscape showing:<br>- Virtual joystick position (bottom-left)<br>- Move/skill buttons (right side)<br>- Pause button (top-right)<br>- Player character and enemies visible | 2436×1125 or 2340×1080 (landscape) | Demonstrate actual touch UI |

**Insertion location:**
- After line 135 (en) or line 136 (zh)
- Between "Touch Controls" section and "Custom Button Placement" section
- Or after the controls-cards grid as supplementary visual

**Alt text suggestion:** "PokeSurvivor gameplay on mobile showing virtual joystick, move buttons, and pause control in landscape orientation"

---

### 4. Settings → Controls → Place the Buttons (1 image)

**Purpose:** Show the custom button placement feature mentioned in lines 138-141 (en) / 139-142 (zh)

| Filename | Description | Suggested Size | Use |
|----------|-------------|----------------|-----|
| `settings-place-buttons.webp` | Settings screen showing:<br>- Controls menu<br>- "Place the buttons" option or interface<br>- Draggable button elements<br>- Fixed joystick toggle | 2436×1125 or 2340×1080 (landscape) | Illustrate customization feature |

**Insertion location:**
- After line 141 (en) or line 142 (zh)
- Within the "Custom Button Placement" section

**Alt text suggestion:** "Settings interface showing custom button placement options for touch controls"

---

## Summary of Missing Assets

| Category | Count | Priority |
|----------|-------|----------|
| iOS installation flow | 3 | High |
| Android installation | 1-2 | High |
| Real gameplay (landscape) | 1 | Medium |
| Settings/Controls UI | 1 | Medium |

**Total: 6-7 screenshots needed**

---

## Implementation Template

Once screenshots are captured and placed in `public/images/`, use these templates to insert them:

### Template 1: Single Image with Caption

```html
<figure class="screenshot-figure">
  <img
    src="/images/FILENAME.webp"
    width="WIDTH"
    height="HEIGHT"
    loading="lazy"
    decoding="async"
    alt="ALT_TEXT_HERE"
  />
  <figcaption>Caption text here</figcaption>
</figure>
```

### Template 2: Image Gallery (for multi-step flows)

```html
<div class="screenshot-gallery">
  <figure class="screenshot-item">
    <img
      src="/images/ios-add-to-home-1.webp"
      width="375"
      height="667"
      loading="lazy"
      decoding="async"
      alt="Safari showing PokeSurvivor with Share button"
    />
    <figcaption>Step 1: Tap Share</figcaption>
  </figure>
  <figure class="screenshot-item">
    <img
      src="/images/ios-add-to-home-2.webp"
      width="375"
      height="667"
      loading="lazy"
      decoding="async"
      alt="Share menu with Add to Home Screen option"
    />
    <figcaption>Step 2: Select Add to Home Screen</figcaption>
  </figure>
  <figure class="screenshot-item">
    <img
      src="/images/ios-add-to-home-3.webp"
      width="375"
      height="667"
      loading="lazy"
      decoding="async"
      alt="Add to Home Screen confirmation dialog"
    />
    <figcaption>Step 3: Confirm</figcaption>
  </figure>
</div>
```

### Template 3: Inline Image Within Text Section

```html
<section>
  <h2>Section Title</h2>
  <p>Introductory paragraph...</p>
  
  <img
    src="/images/FILENAME.webp"
    width="WIDTH"
    height="HEIGHT"
    loading="lazy"
    decoding="async"
    alt="ALT_TEXT_HERE"
    style="max-width: 100%; height: auto; border-radius: var(--radius-md); margin: var(--space-md) 0;"
  />
  
  <p>Follow-up paragraph...</p>
</section>
```

---

## CSS Additions (Optional)

If using gallery layout, add these styles to the `<style>` block:

```css
.screenshot-figure {
  margin: var(--space-md) 0;
  text-align: center;
}

.screenshot-figure img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  margin: 0 auto;
}

.screenshot-figure figcaption {
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
}

.screenshot-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
  margin: var(--space-md) 0;
}

.screenshot-item {
  text-align: center;
}

.screenshot-item img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  margin: 0 auto var(--space-2);
}

.screenshot-item figcaption {
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-semibold);
}
```

---

## Image Optimization Guidelines

1. **Format:** WebP preferred (fallback JPG already exists for social sharing)
2. **Compression:** Aim for <200KB per screenshot
3. **Dimensions:**
   - Portrait (iOS/Android menus): 750×1334 or 1080×1920
   - Landscape (gameplay): 2436×1125 or 2340×1080
4. **Naming:** Kebab-case with descriptive names
5. **Alt text:** Descriptive, mentions key UI elements visible

---

## Next Steps

1. **User action required:** Capture screenshots on real devices
2. Save images to `public/images/` with filenames as specified
3. Choose appropriate template from above
4. Insert images at specified line locations
5. Add CSS if using gallery layout
6. Test responsive behavior on mobile/tablet/desktop
7. Verify alt text for accessibility

---

**Note:** This document defines requirements only. No `.astro` files have been modified. Implementation requires user-provided screenshots.
