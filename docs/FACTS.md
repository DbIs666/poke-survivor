# PokéSurvivor — Verified Fact Sheet

> **Rule for writers:** Only state game facts that are in this file. Anything else is fan opinion and must be labeled as such, or listed under "Needs owner verification".

Verified against the sources below on 2026-10-15.

## Sources

| ID | Source |
|---|---|
| S1 | https://pokesurvivor.com/en/guide/ (official guide; Spanish version /guia/) |
| S2 | https://pokesurvivor.com/en/moves/ |
| S3 | https://pokesurvivor.com/en/legendaries/ |
| S4 | https://pokesurvivor.com/en/news/ |
| S5 | https://pokesurvivor.com/en/items/ |
| S6 | https://pokesurvivor.com/en/types/ |
| S7 | https://pokesurvivor.com/en/pokedex/ |
| S8 | https://jpter78.itch.io/pokesurvivor |
| S9 | https://github.com/JPTER78/pokesurvivor (official source: GDD.md, js/data/*.js, js/systems/*.js; commit c31715d, 2026-10-14) |
| S10 | https://pokesurvivor.com/sitemap.xml |

## About the game

- Free, non-profit fan game with "no ads or purchases". Not affiliated with Nintendo, GAME FREAK or The Pokémon Company. The only official site is pokesurvivor.com [S1][S4].
- Developer handle: jpter78 / JPTER78 [S8][S9].
- Sprites come from SpriteCollab (PMD style) under CC BY-NC 4.0 [S9].
- Game languages are English and Spanish only (no Chinese). The official sitemap lists only Spanish (x-default) and /en/ URLs [S4][S10].
- Plays like Survivor.io / Vampire Survivors: "You only move: your partner Pokémon attacks automatically." [S8]

## Roster, gacha, achievements

- 966 Pokémon from all 9 regions (Kanto to Paldea), and every one can be your partner. Shinies are 1/4096 in the wild [S1][S7].
- You get other Pokémon from a ticket gacha with 9 region banners. Tickets cannot be bought [S1].
- 127 achievements [S1].

## Controls and platforms

- **PC:** WASD or arrow keys to move. Switch moves with 1–4, Q/E or by clicking the icon. Esc pauses [S1].
- **Mobile/tablet:** landscape only. Drag a finger anywhere to move (the joystick appears where you touch). Tap a move to switch. The top-right button pauses [S1].
- **2026-10-14 update:** drag attacks, pause button, joystick anywhere, optional fixed joystick [S4].
- Can be installed with "Add to Home Screen". No download needed [S1]. Web manifest: display fullscreen, orientation landscape [S9].

## Starting a run

- On your first run, an 8-question personality quiz (Mystery Dungeon style) assigns a partner from 29 starters: the starters of all 9 generations plus Psyduck and Slowpoke. You can turn it down and pick another [S9 GDD 2.2, js/data/starters.js].
- The 29 starters are Bulbasaur, Charmander, Squirtle, Psyduck, Slowpoke, Chikorita, Cyndaquil, Totodile, Treecko, Torchic, Mudkip, Turtwig, Chimchar, Piplup, Snivy, Tepig, Oshawott, Chespin, Fennekin, Froakie, Rowlet, Litten, Popplio, Grookey, Scorbunny, Sobble, Sprigatito, Fuecoco, Quaxly [S7].

### Starting move per starter [S9 starters.js]

| Move | Starters |
|---|---|
| Vine Whip | Bulbasaur, Chikorita, Turtwig, Chespin, Grookey |
| Razor Leaf | Treecko, Snivy, Rowlet, Sprigatito |
| Ember | All 9 fire starters: Charmander, Cyndaquil, Torchic, Chimchar, Tepig, Fennekin, Litten, Scorbunny, Fuecoco |
| Water Gun | Squirtle, Totodile, Mudkip, Oshawott, Froakie, Sobble, Quaxly |
| Bubble | Piplup, Popplio |
| Confusion | Psyduck, Slowpoke |

### Starting move stats [S9 js/data/moves.js]

| Move | Pattern | Cooldown | Damage | Notes |
|---|---|---|---|---|
| Ember | projectile | 0.52 s | 18 | burns |
| Water Gun | piercing projectile | 0.44 s | 14 | pierce 1, "reliable at any distance" |
| Bubble | nova, 8 bubbles | 1.00 s | 9 | slows |
| Vine Whip | melee wide arc | 0.62 s | 16 | radius 68, knockback |
| Razor Leaf | boomerang, 2 leaves out and back | 0.90 s | 10 | |
| Confusion | homing projectile | 0.58 s | 13 | |

### Starter in-game stats (HP / speed / attack multiplier) [S9 js/data/pokedex.js]

| Starter | HP | Speed | Atk × |
|---|---|---|---|
| Bulbasaur | 90 | 97 | 1.06 |
| Charmander | 88 | 105 | 1.03 |
| Squirtle | 90 | 96 | 0.97 |
| Chikorita | 90 | 97 | 0.97 |
| Cyndaquil | 88 | 105 | 1.03 |
| Totodile | 92 | 96 | 1.06 |
| Treecko | 88 | 107 | 1.06 |
| Torchic | 90 | 97 | 1.08 |
| Mudkip | 92 | 95 | 1.08 |
| Turtwig | 95 | 91 | 1.07 |
| Chimchar | 90 | 104 | 1.02 |
| Piplup | 94 | 95 | 1.04 |
| Snivy | 90 | 104 | 0.95 |
| Tepig | 99 | 97 | 1.05 |
| Oshawott | 95 | 97 | 1.05 |
| Chespin | 95 | 94 | 1.04 |
| Fennekin | 88 | 103 | 1.04 |
| Froakie | 88 | 108 | 1.04 |
| Rowlet | 101 | 96 | 1.00 |
| Litten | 90 | 107 | 1.06 |
| Popplio | 92 | 95 | 1.06 |
| Grookey | 92 | 105 | 1.06 |
| Scorbunny | 92 | 107 | 1.09 |
| Sobble | 92 | 107 | 1.08 |
| Sprigatito | 88 | 105 | 1.04 |
| Fuecoco | 100 | 93 | 1.05 |
| Quaxly | 95 | 99 | 1.06 |
| Psyduck | 92 | 101 | 1.06 |
| Slowpoke | 110 | 84 | 1.06 |

## Leveling and moves

- On level up you pick 1 of 3 cards: a new move, an upgrade to a move you own, or a stat boost [S1]. A reroll option exists [S9].
- Up to 4 move slots. Only the ACTIVE move fires [S9 GDD 3].
- Moves level up to 5 [S2].
- Stat cards [S9 js/systems/levelup.js]: Vigor +20 max HP; Power +10% damage; Sprint +7% move speed; Reflexes −8% cooldown; Armor +6% damage reduction (cap 70%); Synthesis +0.9 HP/s regen; Magnet +30% pickup radius; Learning +12% XP; Sitrus Berry heals 45% immediately.
- Permanent per-Pokémon upgrades are bought with PokéCoins, including "Repertoire" = start with 2 moves [S9 GDD 7.2].

### Move evolution [S2]

- Reach max level plus take the required upgrade card in that run, and a golden evolution card appears.
- 64 moves, 59 of them evolve. Non-evolving buffs: Swords Dance, Agility, Harden, Aqua Ring, Dragon Dance.
- Starter move evolutions: Ember → Fire Blast (Power); Water Gun → Scald (Power); Bubble → Surf (Sprint); Vine Whip → Power Whip (Power); Razor Leaf → Leaf Storm (Reflexes); Confusion → Psyshock (Reflexes).
- Full evolution table: https://pokesurvivor.com/en/moves/ (not copied here).

## Enemies

- Four "personality" enemy kinds were added 2026-10-08: "enemies that heal, shield, summon or explode" [S4].
- Detail [S9 GDD 5.1]:
  - **Healer** (Chansey, Blissey, Audino, Clefairy…): heals 15% to nearby allies every 3.5 s. The heal scales with your damage, capped [S4].
  - **Shielder** (Shuckle, Bronzong, Mr. Mime, Bastiodon…): shields 35% HP onto 6 allies.
  - **Summoner** (Nidoqueen, Vespiquen, Golbat, Gyarados…): calls 2 of its pack.
  - **Kamikaze / bomber** (Voltorb, Electrode, Koffing, Geodude…): approaches and explodes after a 1 s warning.
  - Also telegraphed attackers: beam, zones, fan, jumper.
- Official tips: kill healers and shielders first. Ground markers (filling circles and lines) are incoming attacks, so step out [S1 Spanish /guia/].

## Bosses and Arceus

- 5 bosses at minutes 3, 6, 9, 12 and 15: strong non-legendary Pokémon. Each drops a ×10 ticket [S9 GDD 5, enemies.js].
- Bosses and legendaries have 4 telegraphed attacks and enrage at half HP [S4].
- At minute 30, "Arceus descends from the sky and takes you to the Ruins of Judgment". Arceus is invincible and speeds up. Every 5 s a legendary joins with twice the HP and damage of the previous one [S4].
- Runs are endless since 2026-10-12 [S4].

## Weather and types [S6][S9 GDD 4.1]

- Rain: Water up, Fire down. Harsh sun: Fire up, Water down. Sandstorm: Rock/Ground/Steel up, others take chip damage. Snow: Ice up, others take chip damage and are slowed. Fog: Ghost/Fairy/Psychic up.
- Code values: sun Fire ×1.5, Water ×0.5; rain Water ×1.5, Electric ×1.2, Fire ×0.5.
- From minute 2 there is an 18%/min chance of weather, lasting about 1 minute.
- Softened type chart: super effective ×1.6, not very effective ×0.6, immunity ×0.3, dual-type cap ×2.4. Applies both ways (to you and to enemies) [S6].

## Held items [S5]

- Only one at a time; it lasts the whole run. Found in chests and dropped by bosses.
- 11 items:

| Item | Effect |
|---|---|
| Leftovers | 1.5% HP/s |
| Choice Band | +40% damage, but you can't switch moves |
| Quick Claw | −20% cooldown |
| Focus Sash | survive at 1 HP (every 60 s) |
| Shell Bell | heal from damage dealt |
| Amulet Coin | +50% PokéCoins |
| Lucky Egg | +30% XP |
| Life Orb | +30% damage, attacks cost HP |
| Choice Scarf | +35% speed |
| Rocky Helmet | melee attackers take damage |
| Assault Vest | +20% damage reduction |

## Rifts and legendaries [S3][S4][S9 js/systems/rift.js]

- A mysterious rift opens on the map. Walk in to fight a legendary in an arena of its type (18 arenas), each with its own terrain and weather. In a group, everyone enters together.
- Code: rift checks every 30 s from 1:15, with an escalating chance of 20/40/60/80/100% (rifts "show up at least every 2.5 minutes" [S4]). Legendaries you're missing appear more often [S4]. A rift stays open 45 s. The arena fight lasts 2 minutes. No new rifts from 28:00.
- Win: ×10 gacha ticket (+3 tickets and coins per GDD). Lose (all down or time out): back to the map with 30% HP, no prize.
- Dual-type legendaries pick one of their types at random [S3].
- Terrain: "lava burns, ice is slippery, water slows you down" [S3]. Terrain immunities: Fire to lava, Poison/Steel to poison, Electric/Ground to shock puddles, Ice to ice. The legendary isn't hurt by its own arena [S9 GDD 4.0].
- Bonds: each legendary beaten grants a bond that links two moves to fire at once from one slot, up to 4 bonds [S4].
- The official heading says "87 legendaries" but only 85 are listed (needs owner verification).

### 18 arenas

Type → arena → terrain → weather [S9 GDD 4.0] → legendaries eligible by type [S3]. The legendary list is derived by type, so label it "eligible by type".

| Type | Arena | Terrain | Weather | Eligible legendaries (by type) |
|---|---|---|---|---|
| Normal | Eternal Meadow | columns | none | Regigigas, Arceus, Meloetta, Type: Null, Silvally, Terapagos |
| Fire | Igneous Volcano | lava rivers (burn) | sun | Moltres, Entei, Ho-Oh, Heatran, Victini, Reshiram, Volcanion, Chi-Yu |
| Water | Sea Grotto | puddles (slow) | rain | Suicune, Kyogre, Palkia, Phione, Manaphy, Keldeo, Volcanion, Tapu Fini |
| Grass | Emerald Jungle | swamp (slows a lot), trees | none | Celebi, Shaymin, Virizion, Tapu Bulu, Calyrex, Ogerpon |
| Electric | Volt Plant | charged puddles | rain | Zapdos, Raikou, Thundurus, Zekrom, Tapu Koko, Zeraora, Regieleki |
| Ice | Eternal Glacier | ice plates (slippery) | snow | Articuno, Regice, Kyurem, Glastrier |
| Fighting | Ancient Dojo | many columns | none | Cobalion, Terrakion, Virizion, Keldeo, Marshadow, Zamazenta, Kubfu, Urshifu, Koraidon |
| Poison | Toxic Swamp | poison puddles | none | Eternatus, Munkidori, Fezandipiti |
| Ground | Red Desert | quicksand | sandstorm | Groudon, Landorus, Zygarde |
| Flying | Sky Peak | cloud-trees | none | Articuno, Zapdos, Moltres, Lugia, Ho-Oh, Rayquaza, Tornadus, Thundurus, Landorus, Yveltal, Enamorus |
| Psychic | Mind Temple | pink crystals, columns | none | Mewtwo, Mew, Lugia, Celebi, Latias, Latios, Jirachi, Deoxys, Uxie, Mesprit, Azelf, Cresselia, Victini, Meloetta, Hoopa, Tapu Lele, Cosmog, Cosmoem, Solgaleo, Lunala, Necrozma, Calyrex, Munkidori |
| Bug | Hive Forest | swamp, tall grass | none | Genesect |
| Rock | Ancient Quarry | columns and rocks | sandstorm | Regirock, Terrakion, Diancie |
| Ghost | Gloomy Graveyard | dead trees | fog | Giratina, Hoopa, Lunala, Marshadow, Spectrier |
| Dragon | Dragon Sanctuary | draconic flames (burn) | none | Latias, Latios, Rayquaza, Dialga, Palkia, Giratina, Reshiram, Zekrom, Kyurem, Zygarde, Eternatus, Regidrago, Koraidon |
| Dark | Dark Alley | columns | none | Darkrai, Yveltal, Urshifu, Chi-Yu |
| Steel | Steel Fortress | many columns | none | Registeel, Jirachi, Dialga, Heatran, Cobalion, Genesect, Solgaleo, Magearna, Meltan, Melmetal |
| Fairy | Enchanted Forest | pink trees, fountains | none | Xerneas, Diancie, Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini, Magearna, Zacian, Enamorus, Fezandipiti |

## Co-op [S1][S4][S8][S9 GDD 2.3]

- Online co-op for up to 4 players, using your friends list. Add friends by nickname and invite them to your room. Requires an account (cloud save); guests save nothing. The host starts the run.
- XP is shared. On level up everyone picks a card and the game waits for all players.
- A downed player is revived by a teammate staying next to them for 3 s (they return with half HP). The run ends when everyone is down.
- Difficulty scales: enemy count ×(1 + 0.75·(n−1)), enemy HP ×(1 + 0.3·(n−1)), where n = players.
- Pausing doesn't stop a group run. If the host leaves, the run ends. If the host switches tabs, the run pauses for everyone [S4].
- Connection is browser-to-browser (WebRTC, like a video call) with a Firebase relay fallback. Teammates may see your IP, so play only with people you know [official home page].
- Leaderboards: Solo and Group, ranked by survival time.
- Offline itch.io package: HTML5, "Unzip and double-click index.html". "The offline version is solo only and saves in your browser." Co-op, cloud saves and leaderboards are only online at pokesurvivor.com [S8].
- No app-store app exists in any source.

## Needs owner verification (do not state as fact)

- Real search volumes.
- "87 vs 85 legendaries".
- Any gameplay claim not listed above.
- Ownership of the site domain poke-survivors.org.

## Image credits

Sprites in /public/images/ come from SpriteCollab (PMD style), CC BY-NC 4.0 (https://github.com/PMDCollab/SpriteCollab), via the official PokéSurvivor repo assets [S9]. Artists per national dex number, from the repo's CREDITS.md. Covers the starters, co-op, rift-arena, OG/icon and sample tier-list images; rerunning the tier image prints credits for any new dex numbers, which must be added here.

| Dex | Pokémon | Artists |
|---|---|---|
| 1 | Bulbasaur | CHUNSOFT, ShyStarryRain |
| 4 | Charmander | CHUNSOFT, ShyStarryRain |
| 7 | Squirtle | CHUNSOFT, ShyStarryRain, SilverDeoxys563 |
| 54 | Psyduck | CHUNSOFT, ShyStarryRain |
| 79 | Slowpoke | CHUNSOFT, ShyStarryRain |
| 144 | Articuno | CHUNSOFT, El_Pangoro_Parse, Emmuffin |
| 145 | Zapdos | CHUNSOFT, Emmuffin |
| 146 | Moltres | CHUNSOFT, Emmuffin |
| 150 | Mewtwo | CHUNSOFT, El_Pangoro_Parse, JFain |
| 152 | Chikorita | CHUNSOFT, lokatts |
| 155 | Cyndaquil | CHUNSOFT, lokatts |
| 158 | Totodile | CHUNSOFT, Moo |
| 245 | Suicune | CHUNSOFT, Lovi |
| 251 | Celebi | CHUNSOFT, Emmuffin, Smalusion |
| 252 | Treecko | CHUNSOFT, Morei, YoukaiMinori |
| 255 | Torchic | CHUNSOFT, Moo |
| 258 | Mudkip | Anonymous, CHUNSOFT |
| 377 | Regirock | Chi, CHUNSOFT |
| 379 | Registeel | Audino, CHUNSOFT |
| 380 | Latias | CHUNSOFT, Emmuffin |
| 383 | Groudon | CHUNSOFT, lokatts |
| 387 | Turtwig | Chi, CHUNSOFT |
| 390 | Chimchar | CHUNSOFT, Lovi |
| 393 | Piplup | CHUNSOFT, Lovi |
| 486 | Regigigas | CHUNSOFT, Morei |
| 487 | Giratina | CHUNSOFT, Emmuffin, G〜 |
| 491 | Darkrai | baronessfaron, Chi, CHUNSOFT, ShyStarryRain |
| 495 | Snivy | Emmuffin, G〜, NeroIntruder |
| 498 | Tepig | 3P1C, Emboarger, NeroIntruder, NikolaP |
| 501 | Oshawott | Emmuffin, ◥θ┴θ◤ |
| 638 | Cobalion | Caitemis, Deeshura, Noo, powercristal |
| 649 | Genesect | Emboarger |
| 650 | Chespin | Emmuffin, G〜, ◥θ┴θ◤ |
| 653 | Fennekin | Emmuffin, Smalusion, XModxGodX |
| 656 | Froakie | Emmuffin |
| 716 | Xerneas | baronessfaron, ShyStarryRain |
| 722 | Rowlet | Emmuffin, Reimu\_needs\_$$$, XModxGodX |
| 725 | Litten | Emboarger, Top_Kec |
| 728 | Popplio | JFain, ◥θ┴θ◤ |
| 810 | Grookey | bwappi, JFain |
| 813 | Scorbunny | Caitemis, Emmuffin, NeroIntruder |
| 816 | Sobble | baronessfaron, G〜, JFain |
| 890 | Eternatus | Emmuffin, Soulja |
| 906 | Sprigatito | baronessfaron, Emmuffin |
| 909 | Fuecoco | Caitemis, G〜, JFain, ShyStarryRain |
| 912 | Quaxly | JFain, NickOnimura, ShyStarryRain |

The menu screenshot (pokesurvivor-menu.webp) is a capture of the official game at https://pokesurvivor.com/en/.


## Added 2026-10-16 (tier list / best-pokemon writer)

### Default starting move by type [S9 js/data/moves.js, START + startFor]

- A non-starter partner starts with the move of the first of its types that has an entry: fire→Ember, water→Water Gun, grass→Vine Whip, electric→Thunder Shock, psychic→Confusion, poison→Sludge, ground→Mud Shot, flying→Gust, bug→Bug Bite, rock→Rock Throw, ice→Ice Beam, fighting→Karate Chop, ghost→Shadow Ball, dragon→Dragon Rage, fairy→Fairy Wind, steel→Metal Claw, dark→Bite, normal→Tackle. Starters use the move set in starters.js instead.
- Move pool = moves of the Pokémon's own types plus the common Normal pool (poolFor) [S9 moves.js].

### More move stats [S9 js/data/moves.js]

| Move | Pattern | Cooldown | Damage | Notes |
|---|---|---|---|---|
| Thunder Shock | projectile | 0.40 s | 13 | pierce 2 |
| Shadow Ball | projectile | 0.66 s | 19 | pierce 2 |
| Dragon Rage | beam | 1.0 s | 24 | length 230 |
| Tackle | melee arc | 0.50 s | 13 | radius 48, knockback |
| Metal Claw | melee arc | 0.5 s | 15 | radius 50 |

### Partner stats used on the tier list (HP / speed / atk ×, types) [S9 js/data/pokedex.js]

| Pokémon | Types | HP | Speed | Atk × |
|---|---|---|---|---|
| Cinderace | fire | 106 | 128 | 1.34 |
| Greninja | water, dark | 102 | 129 | 1.27 |
| Alakazam | psychic | 95 | 128 | 1.44 |
| Jolteon | electric | 99 | 133 | 1.31 |
| Gengar | ghost, poison | 97 | 124 | 1.42 |
| Haxorus | dragon | 104 | 119 | 1.51 |
| Garchomp | dragon, ground | 119 | 121 | 1.42 |
| Dragapult | dragon, ghost | 110 | 138 | 1.36 |
| Snorlax | normal | 142 | 91 | 1.31 |
| Blissey | normal | 185 | 101 | 1.11 |
| Swampert | water, ground | 115 | 103 | 1.31 |
| Metagross | steel, psychic | 106 | 107 | 1.44 |

- Pokédex comment: legendaries/singulars ("leg") only appear in the rifts [S9 pokedex.js header].

### Boss numbers [S9 js/data/enemies.js BOSS_SLOTS]

- Boss base HP by minute: 3 → 1400, 6 → 3200, 9 → 5600, 12 → 9000, 15 → 16000; since 2026-10-10 multiplied by 1.35 (HP) and 1.2 (damage). The minute-3 boss is a random non-legendary with BST 490–545.

## Added 2026-10-16 (zh writer)

- Language: "the game shows up in English or Spanish depending on your browser language, and you can change it in Settings." [S1 FAQ]
- Accounts: name+password or Google = cloud save on any device; guests play right away but nothing is saved [S1 FAQ].
- 2026-10-14: Settings > Controls > Place the buttons lets you drag the attacks, pause button and joystick anywhere, and lock the joystick in a fixed position [S4].
- 2026-10-14: name+password accounts can link Gmail for recovery. "PokéSurvivor is and always will be free"; any other site asking you to pay for tickets/coins is a copy [S4].
- 2026-10-09: touch joystick for phones/tablets, English+Spanish, install as app, new settings screen with automatic graphics quality [S4].

## Added 2026-10-16 (QA pass)

- Weather "Afecta a todos (tú y los enemigos)" [S9 GDD 4.1]. combat.js `typeK = Types.mult(type, e.types) * Weather.mult(type)`; player.js hurt() applies the same product, so type × weather stack multiplicatively both ways [S9].
- XP: defeated enemies drop experience orbs that stay put until a player is inside the Magnet radius, then fly to the player [S9 entities/pickup.js].
- ×10 tickets are not guaranteed: official guide says bosses and rift legendaries "sometimes drop ×10 tickets" [S1]. Code: normal boss 1/3, rift legendary 1/2; regular ticket drop 1/400 [S9 pickup.js].
- Boss HP: BOSS_SLOTS hp × 1.35, dmg × 1.2, then × bossScale(t) = 1 + t/600 and party scaling [S9 enemies.js, spawner.js]. No fixed "about 1,890 HP" figure.
- Terrain code [S9 world.js LIQ]: water/swamp immune: Water; lava: Fire; poison: Poison/Steel; spark: Electric/Ground; ice: Ice. Dragon Sanctuary arena liquid is `lava` in tiles.js, so Fire is likely immune there (code reading; GDD lists no flame immunity).
