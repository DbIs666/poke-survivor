# PR: Add Stat Cards & Leveling Strategy Guides

## 📋 Overview

This PR adds two critical missing content pages to the PokéSurvivor fan guide:

1. **`/stat-cards/` - Complete Stat Cards Guide**
2. **`/leveling-strategy/` - Level-Up & Upgrade Strategy Guide**

These pages fill a major content gap identified through user need analysis. While `/moves/` covers move evolution, players need dedicated guides for:
- Which stat cards to prioritize when leveling up
- When to choose moves vs stats vs healing cards
- Build planning and upgrade decision-making

## 🎯 Target Keywords & SEO

### Page 1: `/stat-cards/`
**Primary Keywords:**
- pokesurvivor stat cards
- pokesurvivor power card
- pokesurvivor stats guide
- best stat cards pokesurvivor

**Secondary Keywords:**
- reflexes card pokesurvivor
- vigor vs armor pokesurvivor
- stat card priority
- when to take power card

**Title:** `PokéSurvivor Stat Cards Guide: Priority & Build Optimization`
**Meta Description:** `Master all 7 stat cards in PokéSurvivor. Learn card priorities, exact bonuses, synergies with moves, and optimization strategies for early to late game builds.`

### Page 2: `/leveling-strategy/`
**Primary Keywords:**
- pokesurvivor leveling guide
- pokesurvivor upgrade strategy
- pokesurvivor card choice
- how to level up pokesurvivor

**Secondary Keywords:**
- when to evolve moves pokesurvivor
- stat card vs move card
- pokesurvivor build guide
- leveling mistakes pokesurvivor

**Title:** `PokéSurvivor Leveling Strategy: Smart Card Choices for Every Stage`
**Meta Description:** `Optimize your PokéSurvivor runs with our leveling strategy guide. Learn which cards to pick at each stage, common mistakes to avoid, and build planning from minutes 0-30.`

## 📁 File Structure

```
src/
├── pages/
│   ├── stat-cards.astro          # NEW
│   ├── leveling-strategy.astro   # NEW
│   └── zh/
│       ├── stat-cards.astro      # NEW (Chinese)
│       └── leveling-strategy.astro # NEW (Chinese)
└── public/
    └── images/
        └── content/
            ├── stat-cards-overview.svg           # Icon grid of 7 stat cards
            ├── stat-cards-priority-tier.svg      # Tier list visualization
            ├── power-card-showcase.svg           # Power card detailed view
            ├── defensive-cards-comparison.svg    # Vigor vs Armor chart
            ├── leveling-decision-tree.svg        # Flowchart for card choices
            ├── early-game-priorities.svg         # 0-10 min visual guide
            ├── mid-game-upgrade-path.svg         # 10-20 min flowchart
            └── late-game-survival-build.svg      # 20-30+ min strategy
```

## 🎨 Design Requirements

### Image Specifications

All images must follow project style from `/moves/` page:

**1. stat-cards-overview.svg** (1200×675px)
```
Description: Grid layout showing all 7 stat cards with icons
Content:
- ⚔️ Power (+10% damage)
- ❤️ Vigor (+20 max HP)
- ⚡ Reflexes (-8% cooldown)
- 🏃 Sprint (+10% move speed)
- 🌿 Synthesis (+5% heal effectiveness)
- 🛡️ Armor (+6% damage reduction, cap 70%)
- 🧲 Magnet (+30% pickup radius)

Style: Clean card design, icon + name + bonus value, subtle gradients
Colors: Use --accent-primary, --surface-elevated from global.css
```

**2. stat-cards-priority-tier.svg** (800×600px)
```
Description: Tier list showing card priority by game phase
Tiers:
- S-Tier (Always Good): Power, Reflexes, Magnet (early)
- A-Tier (Situational): Vigor, Sprint, Armor
- B-Tier (Niche): Synthesis, Magnet (late)

Visual: Horizontal tiers with cards positioned, brief annotations
```

**3. power-card-showcase.svg** (800×500px)
```
Description: Detailed Power card benefits
Content:
- Card visual center
- +10% damage multiplier badge
- Arrow pointing to "Required for most move evolutions"
- Arrow pointing to "Stacks additively"
- Example calculation: 100 base → 110 → 121 (with 2 cards)

Style: Infographic layout, use accent color for highlights
```

**4. defensive-cards-comparison.svg** (900×600px)
```
Description: Side-by-side comparison chart
Left column: Vigor card benefits
- +20 HP per card
- Good for: Long runs, boss fights, Arceus Judgment
- Scales: With multiple picks

Right column: Armor card benefits
- +6% damage reduction per card
- Cap at 70% (12 cards max)
- Good for: Diminishing returns, late game only
- Better with: High base HP

Bottom: Recommendation bar showing when to prioritize each
```

**5. leveling-decision-tree.svg** (1000×800px)
```
Description: Flowchart for "What card should I pick?"
Start: "You leveled up - 3 cards appear"
├─ Diamond: "Is your main move at level 5?"
│  ├─ No → "Upgrade main move"
│  └─ Yes → "Do you have its evolution stat card?"
│     ├─ No → "Take the stat card"
│     └─ Yes → Continue to next question
├─ Diamond: "Are you below 50% HP?"
│  ├─ Yes → "Take Sitrus Berry (45% heal)"
│  └─ No → Continue
├─ Diamond: "Do you have 2+ moves?"
│  ├─ No → "Take a second move (different pattern)"
│  └─ Yes → Continue
└─ "Choose: Stat card > Move upgrade > New move"

Style: Traditional flowchart with rounded rectangles, decision diamonds
Colors: Green for positive paths, orange for situational, red for urgent
```

**6. early-game-priorities.svg** (800×600px)
```
Description: 0-10 minute visual roadmap
Timeline bar with key decisions:
- 0:00 - Start with 1 move
- 1:00 - Magnet card (if offered)
- 2:00 - Evolution stat card for starter
- 3:00 - Main move level 3-4 before boss
- 5:00 - Main move level 5 + golden evolution
- 8:00 - Second move added
- 10:00 - Focus on stat cards

Icons: Move cards, stat cards, boss skull at minute 3
Style: Horizontal timeline with branching priorities
```

**7. mid-game-upgrade-path.svg** (800×600px)
```
Description: 10-20 minute strategy flowchart
Shows 3 build paths:

Path A: Aggressive (Speed clear)
- Power → Power → Reflexes
- 3-4 moves maxed
- Minimal defense

Path B: Balanced (Recommended)
- Power → Reflexes → Vigor
- 3 moves + 1 utility
- Mixed stats

Path C: Survival (Safe scaling)
- Vigor → Armor → Sprint
- 2-3 moves, heavy defense
- Prep for Judgment

Visual: 3 parallel lanes with card sequences, pros/cons boxes
```

**8. late-game-survival-build.svg** (900×600px)
```
Description: 20-30+ minute optimization
Center: Character surrounded by stat distribution pie chart
Segments:
- 40% Defensive (Vigor, Armor)
- 30% Utility (Sprint, healing)
- 30% Offense (Power, Reflexes)

Arrows pointing to key decisions:
- "Stop taking new moves"
- "Focus HP and speed"
- "Keep 1-2 damage moves maxed"
- "Utility > raw damage"

Bottom panel: Arceus Judgment prep checklist
✓ 2+ evolved damage moves
✓ Vigor stack (150+ bonus HP)
✓ Sprint for dodging
✓ Healing move or Sitrus Berry ready
```

## 📝 Content Structure

### Page 1: `/stat-cards.astro`

```astro
---
// File structure matches /moves.astro exactly
import BaseLayout from '../layouts/BaseLayout.astro';
import FAQ from '../components/FAQ.astro';

const site = 'https://poke-survivors.org';
const title = 'PokéSurvivor Stat Cards Guide: Priority & Build Optimization';
const description = 'Master all 7 stat cards in PokéSurvivor. Learn card priorities, exact bonuses, synergies with moves, and optimization strategies for early to late game builds.';
const updated = '2026-10-22';
const gameVersion = '2026-10-13 update';

const faq = [
  {
    q: 'What do stat cards do in PokéSurvivor?',
    a: 'Stat cards permanently boost your Pokémon\'s stats for the current run. They appear as level-up choices alongside move cards. Seven types exist: Power (+10% damage), Vigor (+20 HP), Reflexes (-8% cooldown), Sprint (+10% move speed), Synthesis (+5% heal effectiveness), Armor (+6% damage reduction), and Magnet (+30% pickup radius).',
  },
  {
    q: 'Which stat card is most important?',
    a: 'Power is universally strong (+10% damage and required for most move evolutions). Early game: Magnet speeds leveling. Mid game: Reflexes increases DPS. Late game: Vigor and Sprint for survival. Context matters more than a single "best" card.',
  },
  {
    q: 'How many times can I take the same stat card?',
    a: 'Unlimited for most cards. Power, Vigor, Reflexes, Sprint, Synthesis, and Magnet stack additively with no cap. Only Armor has a cap: 70% damage reduction maximum (requires 12 Armor cards).',
  },
  {
    q: 'Do stat cards stack additively or multiplicatively?',
    a: 'Additively. Two Power cards = +20% damage total, not 1.1 × 1.1 = 1.21. Exception: damage calculations with moves may multiply differently, but stat card stacking itself is always additive.',
  },
  {
    q: 'Should I take stat cards or move cards when leveling?',
    a: 'Early: Prioritize upgrading your main move to level 5. Mid: Take stat cards for your build (Power/Reflexes for offense, Vigor for defense). Late: Stat cards > new moves, as slot limits matter. See our <a href="/leveling-strategy/">leveling strategy guide</a> for detailed decision trees.',
  },
  {
    q: 'What is the Magnet stat card pickup radius?',
    a: 'Each Magnet card adds +30% to your experience orb pickup radius. One Magnet early game significantly speeds leveling by auto-collecting orbs without walking over them. Diminishing returns after 2-3 Magnet cards.',
  },
  {
    q: 'Does Armor stack with Vigor?',
    a: 'Yes, they\'re complementary. Vigor gives you more HP to absorb hits; Armor reduces incoming damage. For maximum survivability, stack Vigor first (better early scaling), then add Armor late game when you have a large HP pool to protect.',
  },
  {
    q: 'When should I take Synthesis cards?',
    a: 'Only when running healing moves (Aqua Ring) or relying on Sitrus Berry heals. Synthesis boosts heal effectiveness by +5% per card. Skip it entirely in damage-focused builds—Power and Reflexes offer better returns.',
  },
];

const jsonLd = [
  {
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-10-22',
    dateModified: updated,
    author: { '@type': 'Organization', name: 'PokeSurvivor Fan Guide' },
    publisher: { '@type': 'Organization', name: 'PokeSurvivor Fan Guide' },
    inLanguage: 'en',
  },
  {
    '@type': 'HowTo',
    name: 'How to Prioritize Stat Cards in PokéSurvivor',
    description: 'Step-by-step guide to choosing the right stat cards at different game stages',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Early Game (0-10 min): Evolution Requirements',
        text: 'Take the stat card your starting move needs to evolve (usually Power). Add one Magnet card to speed leveling.',
      },
      {
        '@type': 'HowToStep',
        name: 'Mid Game (10-20 min): Offense Scaling',
        text: 'Stack Power and Reflexes for damage builds. Add Vigor if bosses are threatening. Avoid niche cards like Synthesis unless your build specifically needs them.',
      },
      {
        '@type': 'HowToStep',
        name: 'Late Game (20-30+ min): Survival Focus',
        text: 'Prioritize Vigor and Sprint. Stop taking new moves. Add Armor only if you already have high HP from Vigor stacks.',
      },
    ],
  },
];
---

<BaseLayout
  title={title}
  alternates={[
    { locale: 'en', href: '/stat-cards/' },
    { locale: 'zh-Hant', href: '/zh/stat-cards/' }
  ]}
  description={description}
  keywords="pokesurvivor stat cards, power card, vigor card, reflexes card, stat priority, best stats pokesurvivor, magnet card, armor cap, stat stacking"
  ogType="article"
  ogImage="/og-stat-cards.jpg"
  ogImageAlt="Complete stat cards guide for PokéSurvivor"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Stat Cards', url: '/stat-cards/' }
  ]}
  jsonLd={jsonLd}
>
  <div class="page-wrapper">
    <article class="main-content">
      <header class="article-header">
        <p class="section-label">Guide</p>
        <h1>PokéSurvivor Stat Cards: Complete Priority & Optimization Guide</h1>
        <p class="article-meta">
          Updated {updated} · Based on {gameVersion}
        </p>
      </header>

      <section>
        <h2>What are Stat Cards in PokéSurvivor?</h2>
        <p>
          Stat cards are permanent power-ups that appear when you level up. Every level-up shows 3 random cards—you pick one. Stat cards compete with move cards (learn a new move or upgrade an existing one) and healing cards (Sitrus Berry). Understanding stat card priorities is core to <a href="/leveling-strategy/">leveling strategy</a> and determines whether you survive past minute 20.
        </p>
        <p>
          <strong>Seven stat cards exist as of October 2026:</strong> Power, Vigor, Reflexes, Sprint, Synthesis, Armor, and Magnet. Each boosts a specific stat permanently for the current run. Stat cards stack additively—two Power cards give +20% damage total, not multiplicative scaling. One exception: Armor caps at 70% damage reduction (12 cards maximum).
        </p>
        <p>
          Stat cards serve two purposes: (1) evolving moves (most moves require a specific stat card to evolve—usually Power), and (2) scaling your build's strengths. Early game, stat cards unlock evolutions. Late game, they're your primary source of power since move slots are limited.
        </p>
      </section>

      <section>
        <h2>All 7 Stat Cards: Bonuses & Use Cases</h2>

        <figure class="content-image">
          <img
            src="/images/content/stat-cards-overview.svg"
            alt="Overview of all 7 stat cards in PokéSurvivor with icons and bonus values"
            width="1200"
            height="675"
            loading="eager"
          />
          <figcaption>The 7 stat cards and their exact bonuses (values from community testing)</figcaption>
        </figure>

        <div class="stat-cards-detailed">
          <!-- POWER CARD -->
          <div class="stat-card-section" id="power">
            <div class="card-header">
              <h3>⚔️ Power: +10% Damage</h3>
              <span class="card-rating">S-Tier · Universal</span>
            </div>

            <div class="card-details">
              <div class="card-bonus">
                <h4>Effect</h4>
                <p>Increases all damage dealt by <strong>+10%</strong> (additive). Stacks with itself and all moves.</p>
              </div>

              <div class="card-requirements">
                <h4>Required For</h4>
                <p>Most offensive move evolutions: Ember → Fire Blast, Water Gun → Scald, Vine Whip → Power Whip, and 60+ others. Check the <a href="/moves/">moves guide</a> for specific requirements.</p>
              </div>

              <div class="card-strategy">
                <h4>When to Take</h4>
                <ul>
                  <li><strong>First Priority:</strong> Take at least once before minute 5 if your starting move needs Power to evolve (90% of starters do)</li>
                  <li><strong>Stack 2-3 times</strong> in minutes 5-15 for mid-game damage scaling</li>
                  <li><strong>Diminishing value</strong> past 4-5 stacks—Reflexes becomes better DPS per card</li>
                </ul>
              </div>

              <div class="card-synergies">
                <h4>Synergies</h4>
                <p><strong>Best with:</strong> High base damage moves (Hyper Beam, Fire Blast), slow-firing moves (benefits more from % increases). <strong>Pairs with:</strong> Reflexes (more hits × more damage = multiplicative gains).</p>
              </div>

              <div class="card-avoid">
                <h4>When to Skip</h4>
                <p>Late game (20+ min) when you already have 4-5 Power cards. Survival stats (Vigor, Sprint) matter more for <a href="/arceus-judgment/">Arceus Judgment mode</a>.</p>
              </div>
            </div>

            <figure class="content-image">
              <img
                src="/images/content/power-card-showcase.svg"
                alt="Power card detailed breakdown showing damage stacking and evolution requirements"
                width="800"
                height="500"
                loading="lazy"
              />
              <figcaption>Power card: damage scaling and evolution requirement visual</figcaption>
            </figure>
          </div>

          <!-- VIGOR CARD -->
          <div class="stat-card-section" id="vigor">
            <div class="card-header">
              <h3>❤️ Vigor: +20 Max HP</h3>
              <span class="card-rating">A-Tier · Defensive</span>
            </div>

            <div class="card-details">
              <div class="card-bonus">
                <h4>Effect</h4>
                <p>Increases maximum HP by <strong>+20</strong> (flat, additive). Does not heal you when taken—only raises the cap.</p>
              </div>

              <div class="card-requirements">
                <h4>Required For</h4>
                <p>Few move evolutions. Some sustain moves like Leech Seed and recovery moves may require Vigor, but it's rare. Check the <a href="https://pokesurvivor.com/en/moves/" rel="noopener">official moves page</a>.</p>
              </div>

              <div class="card-strategy">
                <h4>When to Take</h4>
                <ul>
                  <li><strong>Skip early game</strong> (0-10 min)—offense matters more when enemies are weak</li>
                  <li><strong>Start stacking at minute 12-15</strong> when bosses hit harder</li>
                  <li><strong>Minimum 3 stacks</strong> recommended for late game (+60 HP total)</li>
                  <li><strong>Best for:</strong> Arceus Judgment preparation, <a href="/co-op/">co-op mode</a> tanks, slow learners</li>
                </ul>
              </div>

              <div class="card-synergies">
                <h4>Synergies</h4>
                <p><strong>Multiplies value of:</strong> Armor (% reduction better with large HP pool), healing moves (Aqua Ring), Sitrus Berry (heals 45% of max HP). <strong>Pairs with:</strong> Sprint (survive through dodging + tanking).</p>
              </div>

              <div class="card-avoid">
                <h4>When to Skip</h4>
                <p>If you're snowballing offense and killing everything before it reaches you. Vigor is insurance—unnecessary when your Power stacks are clearing waves instantly.</p>
              </div>
            </div>
          </div>

          <!-- REFLEXES CARD -->
          <div class="stat-card-section" id="reflexes">
            <div class="card-header">
              <h3>⚡ Reflexes: -8% Cooldown</h3>
              <span class="card-rating">S-Tier · Offensive</span>
            </div>

            <div class="card-details">
              <div class="card-bonus">
                <h4>Effect</h4>
                <p>Reduces all move cooldowns by <strong>-8%</strong> (additive). Example: 1.00s cooldown → 0.92s with one Reflexes card.</p>
              </div>

              <div class="card-requirements">
                <h4>Required For</h4>
                <p>Fast-attack move evolutions: Razor Leaf → Leaf Storm, Confusion → Psyshock, Quick Attack → Extreme Speed, and others. About 20-25 moves require Reflexes.</p>
              </div>

              <div class="card-strategy">
                <h4>When to Take</h4>
                <ul>
                  <li><strong>First copy:</strong> If your starting move needs Reflexes to evolve</li>
                  <li><strong>Stack 2-4 times</strong> in minutes 10-20 for DPS scaling</li>
                  <li><strong>Better than Power</strong> past 3-4 Power cards (diminishing returns on % damage)</li>
                  <li><strong>Best for:</strong> Projectile/Beam builds, multi-hit moves, horde clearing</li>
                </ul>
              </div>

              <div class="card-synergies">
                <h4>Synergies</h4>
                <p><strong>Multiplicative with Power:</strong> More hits per second × more damage per hit = exponential DPS gains. <strong>Best on:</strong> Fast moves with short cooldowns (Thunder Shock, Ember), multi-projectile moves. <strong>Weakest on:</strong> Charge moves (Hyper Beam, Solar Beam) since they have fixed charge times.</p>
              </div>

              <div class="card-avoid">
                <h4>When to Skip</h4>
                <p>If your build relies on Charge-type moves or buff moves (Swords Dance, Agility). Cooldown reduction doesn't help charge times or passive buffs.</p>
              </div>
            </div>
          </div>

          <!-- SPRINT CARD -->
          <div class="stat-card-section" id="sprint">
            <div class="card-header">
              <h3>🏃 Sprint: +10% Move Speed</h3>
              <span class="card-rating">A-Tier · Utility</span>
            </div>

            <div class="card-details">
              <div class="card-bonus">
                <h4>Effect</h4>
                <p>Increases movement speed by <strong>+10%</strong> (additive). Stacks with itself and passive speed bonuses from Pokémon stats.</p>
              </div>

              <div class="card-requirements">
                <h4>Required For</h4>
                <p>Dash and movement-based move evolutions: Bubble → Surf, Quick Attack → Extreme Speed, Flame Charge → Flare Blitz, and similar mobility moves.</p>
              </div>

              <div class="card-strategy">
                <h4>When to Take</h4>
                <ul>
                  <li><strong>One copy early</strong> if your main move needs Sprint to evolve</li>
                  <li><strong>Stack 2-3 times</strong> starting at minute 15-20 for Judgment prep</li>
                  <li><strong>Priority increases</strong> as enemy density rises—dodging > tanking past minute 25</li>
                  <li><strong>Best for:</strong> Slow-moving Pokémon (Slowpoke, Snorlax), kiting strategies, <a href="/rifts/">legendary rift</a> challenges</li>
                </ul>
              </div>

              <div class="card-synergies">
                <h4>Synergies</h4>
                <p><strong>Pairs with:</strong> Dash-type moves (repositioning while attacking), Trail-type moves (Flame Wheel damage scales with movement), Aura moves (reposition while aura damages). <strong>Less useful with:</strong> Stationary builds (Turret moves, Mines).</p>
              </div>

              <div class="card-avoid">
                <h4>When to Skip</h4>
                <p>If your Pokémon already has high base speed (Scorbunny, Froakie) and you're confidently dodging. Sprint is insurance—skip it when you don't need the safety net.</p>
              </div>
            </div>
          </div>

          <!-- SYNTHESIS CARD -->
          <div class="stat-card-section" id="synthesis">
            <div class="card-header">
              <h3>🌿 Synthesis: +5% Heal Effectiveness</h3>
              <span class="card-rating">B-Tier · Niche</span>
            </div>

            <div class="card-details">
              <div class="card-bonus">
                <h4>Effect</h4>
                <p>Increases all healing received by <strong>+5%</strong> (additive). Affects Sitrus Berry (45% base heal), Aqua Ring passive regen, and healing moves like Leech Seed.</p>
              </div>

              <div class="card-requirements">
                <h4>Required For</h4>
                <p>Healing and support move evolutions: Leech Seed → Giga Drain, Synthesis → Solar Beam (if applicable), Moonlight → Lunar Dance. Mostly Grass-type support moves.</p>
              </div>

              <div class="card-strategy">
                <h4>When to Take</h4>
                <ul>
                  <li><strong>Only if:</strong> Your build includes Aqua Ring or Leech Seed</li>
                  <li><strong>Maximum 1-2 copies</strong> total—diminishing returns are severe</li>
                  <li><strong>Skip entirely</strong> in damage-focused builds</li>
                  <li><strong>Best for:</strong> Tank co-op builds, ultra-long runs (40+ min), meme sustain builds</li>
                </ul>
              </div>

              <div class="card-synergies">
                <h4>Synergies</h4>
                <p><strong>Multiplies value of:</strong> Vigor (more HP pool × better healing efficiency), Sitrus Berry (one card = +2.25% per heal), Aqua Ring buff move. <strong>Requires commitment:</strong> Synthesis is worthless without dedicated healing sources.</p>
              </div>

              <div class="card-avoid">
                <h4>When to Skip</h4>
                <p><strong>Always skip unless:</strong> (1) You're running Aqua Ring as a move slot, (2) You have 4+ Vigor cards and rely on Sitrus Berry heals, or (3) You're deliberately building a sustain tank. Power/Reflexes offer far better returns per card in 99% of builds.</p>
              </div>
            </div>
          </div>

          <!-- ARMOR CARD -->
          <div class="stat-card-section" id="armor">
            <div class="card-header">
              <h3>🛡️ Armor: +6% Damage Reduction (Cap: 70%)</h3>
              <span class="card-rating">B-Tier · Late Game Only</span>
            </div>

            <div class="card-details">
              <div class="card-bonus">
                <h4>Effect</h4>
                <p>Reduces incoming damage by <strong>+6%</strong> (additive). Hard cap at <strong>70% damage reduction</strong> (12 Armor cards maximum). Example: 100 damage hit → 94 damage with one Armor card.</p>
              </div>

              <div class="card-requirements">
                <h4>Required For</h4>
                <p>Defensive move evolutions: Harden → Iron Defense, Protect → Wide Guard, Barrier → Light Screen. Rarely required—most defensive moves need Vigor instead.</p>
              </div>

              <div class="card-strategy">
                <h4>When to Take</h4>
                <ul>
                  <li><strong>Never take early game</strong> (0-15 min)—enemies deal trivial damage</li>
                  <li><strong>Start at minute 20+</strong> only if you already have 4+ Vigor stacks</li>
                  <li><strong>Diminishing returns</strong> hit fast—Vigor is more efficient per card until you have 100+ HP</li>
                  <li><strong>Best for:</strong> Ultra-late game (35+ min), Arceus Judgment final phase, co-op tanks</li>
                </ul>
              </div>

              <div class="card-synergies">
                <h4>Synergies</h4>
                <p><strong>Requires high HP first:</strong> Armor is % reduction—better on a 150 HP tank than a 90 HP glass cannon. <strong>Pairs with:</strong> Vigor (stack HP first, then add Armor), Sprint (reduce hits taken through dodging).</p>
              </div>

              <div class="card-avoid">
                <h4>When to Skip</h4>
                <p><strong>Skip if:</strong> (1) You have fewer than 4 Vigor cards, (2) It's before minute 20, (3) You're playing aggressive and killing enemies before they reach you. Armor is the ultimate "insurance" stat—unnecessary if your offense is strong.</p>
              </div>

            <figure class="content-image">
              <img
                src="/images/content/defensive-cards-comparison.svg"
                alt="Side-by-side comparison of Vigor vs Armor effectiveness at different HP levels"
                width="900"
                height="600"
                loading="lazy"
              />
              <figcaption>Vigor vs Armor: Which defensive stat to prioritize when</figcaption>
            </figure>
          </div>
          </div>

          <!-- MAGNET CARD -->
          <div class="stat-card-section" id="magnet">
            <div class="card-header">
              <h3>🧲 Magnet: +30% Pickup Radius</h3>
              <span class="card-rating">S-Tier Early, C-Tier Late</span>
            </div>

            <div class="card-details">
              <div class="card-bonus">
                <h4>Effect</h4>
                <p>Increases experience orb pickup radius by <strong>+30%</strong> (additive). Orbs fly to you from farther away, speeding early leveling significantly.</p>
              </div>

              <div class="card-requirements">
                <h4>Required For</h4>
                <p>Some chain and attraction move evolutions: Hex → Poltergeist, Thunderbolt → Thunder, Electro Ball → Electroweb. About 10-15 moves require Magnet.</p>
              </div>

              <div class="card-strategy">
                <h4>When to Take</h4>
                <ul>
                  <li><strong>One copy at minute 1-2</strong> if offered—massive early leveling boost</li>
                  <li><strong>Second copy optional</strong> around minute 5-8 for continued speed</li>
                  <li><strong>Never take past minute 10</strong> unless required for evolution—Combat stats matter more</li>
                  <li><strong>Best for:</strong> Slow-moving Pokémon, learning the game, maximizing early XP</li>
                </ul>
              </div>

              <div class="card-synergies">
                <h4>Synergies</h4>
                <p><strong>Enables faster:</strong> Power/Reflexes acquisition (level faster = more stat card draws), move evolution unlocks (reach level 5 sooner). <strong>Pairs with:</strong> Nothing directly—Magnet is a tempo card, not a scaling card.</p>
              </div>

              <div class="card-avoid">
                <h4>When to Skip</h4>
                <p><strong>Always skip past minute 12-15</strong> unless your move needs Magnet to evolve. One early Magnet is excellent; three Magnets is griefing your build. Combat stats scale—pickup radius doesn't.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Stat Card Priority by Game Stage</h2>

        <figure class="content-image">
          <img
            src="/images/content/stat-cards-priority-tier.svg"
            alt="Tier list showing stat card priority at different game stages"
            width="800"
            height="600"
            loading="lazy"
          />
          <figcaption>Stat card tier list by game stage (0-10, 10-20, 20-30+ minutes)</figcaption>
        </figure>

        <h3>Early Game (0-10 Minutes): Evolution Setup</h3>
        <div class="priority-list">
          <div class="priority-tier">
            <h4>Must-Take</h4>
            <ul>
              <li><strong>Your evolution stat card</strong> (usually Power) — Required before minute 5 to evolve your starter move</li>
              <li><strong>Magnet (1 copy)</strong> — If offered before minute 3, take it for faster leveling</li>
            </ul>
          </div>
          <div class="priority-tier">
            <h4>Good Picks</h4>
            <ul>
              <li><strong>Power (1-2 extra copies)</strong> — Scales damage for mid-game</li>
              <li><strong>Reflexes (1 copy)</strong> — If your second move needs it to evolve</li>
            </ul>
          </div>
          <div class="priority-tier">
            <h4>Skip Unless Desperate</h4>
            <ul>
              <li><strong>Vigor</strong> — Enemies barely hurt yet; offense matters more</li>
              <li><strong>Armor</strong> — Useless early game, scales poorly until late</li>
              <li><strong>Synthesis</strong> — No healing sources to amplify yet</li>
              <li><strong>Sprint</strong> — Your base speed is sufficient for minute 1-10 dodging</li>
            </ul>
          </div>
        </div>

        <p>
          <strong>Goal:</strong> Evolve your main move by minute 5-8. Get the stat card it needs, push it to level 5, and grab the golden evolution card. Everything else is secondary. One Magnet early is bonus—it accelerates your timeline by 1-2 minutes, which matters when the first boss spawns at minute 3.
        </p>

        <h3>Mid Game (10-20 Minutes): Damage Scaling</h3>
        <div class="priority-list">
          <div class="priority-tier">
            <h4>Must-Take</h4>
            <ul>
              <li><strong>Power (2-4 copies total)</strong> — Your primary damage multiplier</li>
              <li><strong>Reflexes (2-3 copies total)</strong> — DPS scaling, better than Power past 3-4 stacks</li>
            </ul>
          </div>
          <div class="priority-tier">
            <h4>Situational</h4>
            <ul>
              <li><strong>Vigor (1-3 copies)</strong> — If bosses are threatening or you're learning patterns</li>
              <li><strong>Sprint (1 copy)</strong> — If your Pokémon is slow and you're struggling to dodge</li>
              <li><strong>Magnet (1 more copy)</strong> — Only if needed for a move evolution (Hex, Thunderbolt, etc.)</li>
            </ul>
          </div>
          <div class="priority-tier">
            <h4>Almost Always Skip</h4>
            <ul>
              <li><strong>Armor</strong> — Still too early; Vigor is better per card</li>
              <li><strong>Synthesis</strong> — Unless you're running Aqua Ring and committed to sustain</li>
            </ul>
          </div>
        </div>

        <p>
          <strong>Goal:</strong> Maximize DPS while bosses are still manageable. Stack Power + Reflexes together for multiplicative gains (more damage × more attacks = exponential scaling). Add 1-2 Vigor as insurance if you're taking hits, but don't over-invest in defense yet—minutes 10-20 reward aggressive scaling.
        </p>

        <h3>Late Game (20-30+ Minutes): Survival Focus</h3>
        <div class="priority-list">
          <div class="priority-tier">
            <h4>Must-Take</h4>
            <ul>
              <li><strong>Vigor (4-6 copies total)</strong> — Primary defense; aim for 120-160 bonus HP</li>
              <li><strong>Sprint (2-4 copies total)</strong> — Dodging > tanking in Arceus Judgment</li>
            </ul>
          </div>
          <div class="priority-tier">
            <h4>Good Picks</h4>
            <ul>
              <li><strong>Armor (2-4 copies)</strong> — Only if you already have 4+ Vigor stacks</li>
              <li><strong>Reflexes (1-2 more copies)</strong> — If you still need DPS to clear Judgment waves</li>
            </ul>
          </div>
          <div class="priority-tier">
            <h4>Skip Entirely</h4>
            <ul>
              <li><strong>Power</strong> — Diminishing returns; you should have 4-5 already</li>
              <li><strong>Magnet</strong> — Combat stats only past minute 20</li>
              <li><strong>Synthesis</strong> — Unless you have a dedicated heal build (rare)</li>
            </ul>
          </div>
        </div>

        <p>
          <strong>Goal:</strong> Survive <a href="/arceus-judgment/">Arceus Judgment mode</a> starting at minute 30. Shift priority from offense to defense. Your 2 evolved damage moves should carry you—focus on HP, speed, and survivability. At this stage, avoiding death > maximizing kills. Sprint lets you dodge Judgment lasers; Vigor absorbs mistakes. Armor multiplies your Vigor investment.
        </p>
      </section>

      <section>
        <h2>Common Stat Card Mistakes</h2>
        
        <div class="mistakes-grid">
          <div class="mistake-card">
            <h3>❌ Mistake 1: Skipping Evolution Stat Cards</h3>
            <p><strong>Problem:</strong> You level your move to 5 but never took the required stat card. The golden evolution card never appears. Your main move stays weak.</p>
            <p><strong>Fix:</strong> Check your starting move's evolution requirement on the <a href="/moves/">moves guide</a> or <a href="https://pokesurvivor.com/en/moves/" rel="noopener">official moves page</a>. Take that stat card before minute 5, even if you'd prefer a different card.</p>
          </div>

          <div class="mistake-card">
            <h3>❌ Mistake 2: Stacking Magnet Past Minute 10</h3>
            <p><strong>Problem:</strong> You have 4 Magnet cards by minute 15. Leveling is fast, but you're weak—no Power, no Reflexes. You die to the minute 18 boss.</p>
            <p><strong>Fix:</strong> One Magnet early is excellent. Two is acceptable. Three+ is griefing. Combat stats scale infinitely; pickup radius has diminishing returns after 1-2 cards.</p>
          </div>

          <div class="mistake-card">
            <h3>❌ Mistake 3: Taking Armor Before Vigor</h3>
            <p><strong>Problem:</strong> You stack Armor early for "defense." But % reduction on a small HP pool is weak. You still die in 3-4 hits despite 30% damage reduction.</p>
            <p><strong>Fix:</strong> Vigor first, Armor second. HP is flat value; Armor multiplies that value. 90 HP + 30% reduction = 128 effective HP. 130 HP + 30% reduction = 185 effective HP. The difference compounds.</p>
          </div>

          <div class="mistake-card">
            <h3>❌ Mistake 4: Ignoring Reflexes</h3>
            <p><strong>Problem:</strong> You stack 6 Power cards. Your damage per hit is massive, but cooldowns are slow. DPS plateaus. Reflexes users are killing faster with 3 Power + 3 Reflexes.</p>
            <p><strong>Fix:</strong> Power and Reflexes multiply each other. After 3-4 Power cards, Reflexes gives better DPS gains per card. Balanced stacking > over-investing in one stat.</p>
          </div>

          <div class="mistake-card">
            <h3>❌ Mistake 5: Taking Synthesis Without Healing Moves</h3>
            <p><strong>Problem:</strong> You have 3 Synthesis cards but no Aqua Ring, no Leech Seed. Sitrus Berry heals 47.25% instead of 45%. You wasted 3 card picks for 2.25% per heal.</p>
            <p><strong>Fix:</strong> Synthesis is a multiplier, not a standalone stat. It's worthless without dedicated healing sources. Skip it entirely unless you're running Aqua Ring as a move slot or have 5+ Vigor cards and rely on Sitrus Berry.</p>
          </div>

          <div class="mistake-card">
            <h3>❌ Mistake 6: Over-Prioritizing Defense Early</h3>
            <p><strong>Problem:</strong> You take Vigor and Armor in minutes 5-12. You're tanky, but killing slowly. Enemies pile up. You get overwhelmed by volume, not damage.</p>
            <p><strong>Fix:</strong> Offense >>> defense in early/mid game. Killing enemies before they reach you is better than tanking hits. Defense scaling starts at minute 15-20, not minute 5.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Build Examples: Stat Card Distributions</h2>

        <p>
          These are three proven stat card distributions for different play styles. Numbers show total copies taken by minute 30.
        </p>

        <div class="builds-grid">
          <div class="build-card">
            <h3>🗡️ Aggressive Build: Glass Cannon</h3>
            <p class="build-tagline">Kill everything before it reaches you. High risk, high reward.</p>
            
            <div class="build-stats">
              <h4>Stat Distribution (15 total cards)</h4>
              <ul>
                <li><strong>Power:</strong> 5 copies (+50% damage)</li>
                <li><strong>Reflexes:</strong> 4 copies (-32% cooldown)</li>
                <li><strong>Vigor:</strong> 2 copies (+40 HP)</li>
                <li><strong>Sprint:</strong> 2 copies (+20% speed)</li>
                <li><strong>Magnet:</strong> 2 copies (early game only)</li>
              </ul>
            </div>

            <div class="build-pros-cons">
              <div class="pros">
                <h5>✓ Strengths</h5>
                <ul>
                  <li>Fastest clear times</li>
                  <li>One-shots trash mobs</li>
                  <li>Melts bosses in 10-15 seconds</li>
                </ul>
              </div>
              <div class="cons">
                <h5>✗ Weaknesses</h5>
                <ul>
                  <li>Dies to 2-3 mistakes</li>
                  <li>Struggles in Judgment mode</li>
                  <li>Requires perfect dodging</li>
                </ul>
              </div>
            </div>

            <p><strong>Best for:</strong> Experienced players who know enemy patterns. Scorbunny, Froakie, fast starters.</p>
          </div>

          <div class="build-card">
            <h3>⚖️ Balanced Build: Recommended</h3>
            <p class="build-tagline">Mix offense and defense. Survives Judgment while still clearing efficiently.</p>
            
            <div class="build-stats">
              <h4>Stat Distribution (15 total cards)</h4>
              <ul>
                <li><strong>Power:</strong> 4 copies (+40% damage)</li>
                <li><strong>Reflexes:</strong> 3 copies (-24% cooldown)</li>
                <li><strong>Vigor:</strong> 4 copies (+80 HP)</li>
                <li><strong>Sprint:</strong> 2 copies (+20% speed)</li>
                <li><strong>Armor:</strong> 1 copy (+6% reduction)</li>
                <li><strong>Magnet:</strong> 1 copy (minute 2 only)</li>
              </ul>
            </div>

            <div class="build-pros-cons">
              <div class="pros">
                <h5>✓ Strengths</h5>
                <ul>
                  <li>Handles all game stages</li>
                  <li>Survives Judgment mode</li>
                  <li>Forgiving learning curve</li>
                </ul>
              </div>
              <div class="cons">
                <h5>✗ Weaknesses</h5>
                <ul>
                  <li>Slower than glass cannon</li>
                  <li>Not max-optimized for any one goal</li>
                </ul>
              </div>
            </div>

            <p><strong>Best for:</strong> First-time Judgment attempts, learning new Pokémon, co-op play. Universal starter choice.</p>
          </div>

          <div class="build-card">
            <h3>🛡️ Tank Build: Maximum Survival</h3>
            <p class="build-tagline">Outlast everything. Slow clear, but nearly unkillable.</p>
            
            <div class="build-stats">
              <h4>Stat Distribution (15 total cards)</h4>
              <ul>
                <li><strong>Vigor:</strong> 6 copies (+120 HP)</li>
                <li><strong>Sprint:</strong> 3 copies (+30% speed)</li>
                <li><strong>Armor:</strong> 3 copies (+18% reduction)</li>
                <li><strong>Power:</strong> 2 copies (+20% damage)</li>
                <li><strong>Reflexes:</strong> 1 copy (-8% cooldown)</li>
              </ul>
            </div>

            <div class="build-pros-cons">
              <div class="pros">
                <h5>✓ Strengths</h5>
                <ul>
                  <li>Nearly impossible to kill</li>
                  <li>Best Judgment survival rate</li>
                  <li>Great for co-op tanking</li>
                </ul>
              </div>
              <div class="cons">
                <h5>✗ Weaknesses</h5>
                <ul>
                  <li>Slow boss kills (40+ seconds)</li>
                  <li>Can time out in rifts</li>
                  <li>Boring for aggressive players</li>
                </ul>
              </div>
            </div>

            <p><strong>Best for:</strong> Slowpoke, Snorlax, slow starters. Ultra-long runs (40+ min). Co-op support role.</p>
          </div>
        </div>

        <p>
          <strong>Note:</strong> These distributions assume ~15 stat cards taken by minute 30 (the rest of your level-ups go to move cards, move upgrades, and Sitrus Berry heals). Actual numbers vary by run based on what cards appear randomly.
        </p>
      </section>

      <FAQ heading="Common Questions" items={faq} />

      <aside class="sources" aria-labelledby="sources-title">
        <h2 id="sources-title">Sources and Updates</h2>
        <p>
          Stat card bonuses come from community testing and player observation—the official game does not publish exact values. Move evolution requirements are documented on the <a href="https://pokesurvivor.com/en/moves/" rel="noopener">official moves page</a>. Build recommendations are fan opinion based on hundreds of runs.
        </p>
        <p>
          This guide is accurate as of October 22, 2026, but stat values may change in future updates. If any information conflicts with the game, trust the game. Check <a href="https://pokesurvivor.com/en/" rel="noopener">pokesurvivor.com</a> for official updates.
        </p>
        <p class="version-info">
          <strong>Game version:</strong> October 13, 2026 update<br>
          <strong>Stat cards:</strong> 7 types (as of October 2026)<br>
          <strong>Guide last updated:</strong> October 22, 2026
        </p>
      </aside>
    </article>

    <section class="closing-cta" aria-labelledby="closing-cta-title">
      <h2 id="closing-cta-title">Ready to Optimize Your Build?</h2>
      <p>Master stat card priorities and dominate every stage of the game.</p>
      <div class="cta-actions">
        <a href="/leveling-strategy/" class="btn btn-primary btn-lg">Learn Leveling Strategy</a>
        <a href="https://pokesurvivor.com/en/" target="_blank" rel="noopener" class="btn btn-secondary btn-lg">Play PokéSurvivor</a>
      </div>
    </section>
  </div>
</BaseLayout>

<!-- Styles copied from /moves.astro, adjusted for stat cards content -->
<style>
  /* Reuse exact same styles from moves.astro */
  /* Add new styles for stat-cards-detailed, mistakes-grid, builds-grid */
  
  .stat-cards-detailed {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
    margin: var(--space-xl) 0;
  }

  .stat-card-section {
    background: var(--surface-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-md);
    border-bottom: 2px solid var(--border-subtle);
  }

  .card-header h3 {
    margin: 0;
    font-size: var(--font-size-2xl);
    color: var(--text-primary);
  }

  .card-rating {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    background: var(--accent-subtle);
    border: 1px solid var(--accent-primary);
    border-radius: var(--radius-pill);
    font-size: var(--font-size-sm);
    font-weight: var(--font-semibold);
    color: var(--accent-primary);
  }

  .card-details {
    display: grid;
    gap: var(--space-md);
  }

  .card-bonus,
  .card-requirements,
  .card-strategy,
  .card-synergies,
  .card-avoid {
    padding: var(--space-md);
    background: var(--surface-base);
    border-radius: var(--radius-md);
  }

  .card-details h4 {
    margin-top: 0;
    margin-bottom: var(--space-2);
    color: var(--accent-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .priority-list {
    display: grid;
    gap: var(--space-lg);
    margin: var(--space-lg) 0;
  }

  .priority-tier {
    padding: var(--space-md);
    background: var(--surface-elevated);
    border-left: 4px solid var(--accent-primary);
    border-radius: var(--radius-md);
  }

  .priority-tier h4 {
    margin-top: 0;
    margin-bottom: var(--space-2);
    color: var(--text-primary);
    font-size: var(--font-size-lg);
  }

  .mistakes-grid,
  .builds-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-lg);
    margin: var(--space-lg) 0;
  }

  .mistake-card,
  .build-card {
    background: var(--surface-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
  }

  .mistake-card h3 {
    margin-top: 0;
    margin-bottom: var(--space-md);
    color: var(--text-primary);
    font-size: var(--font-size-lg);
  }

  .build-card h3 {
    margin-top: 0;
    margin-bottom: var(--space-1);
    color: var(--text-primary);
    font-size: var(--font-size-xl);
  }

  .build-tagline {
    font-style: italic;
    color: var(--text-tertiary);
    margin-bottom: var(--space-md);
  }

  .build-stats {
    background: var(--surface-base);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    margin: var(--space-md) 0;
  }

  .build-stats h4 {
    margin-top: 0;
    margin-bottom: var(--space-2);
    font-size: var(--font-size-base);
    color: var(--accent-primary);
  }

  .build-pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
    margin: var(--space-md) 0;
  }

  .pros,
  .cons {
    padding: var(--space-md);
    border-radius: var(--radius-md);
  }

  .pros {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .cons {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .pros h5,
  .cons h5 {
    margin-top: 0;
    margin-bottom: var(--space-2);
    font-size: var(--font-size-sm);
    font-weight: var(--font-semibold);
  }

  @media (max-width: 768px) {
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }

    .build-pros-cons {
      grid-template-columns: 1fr;
    }

    .mistakes-grid,
    .builds-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```
