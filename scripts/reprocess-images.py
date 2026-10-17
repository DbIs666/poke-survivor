#!/usr/bin/env python3
"""
Reprocess images to avoid duplicate detection by search engines.
Applies subtle transformations while maintaining visual quality.
"""
import os
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter
import random

def add_subtle_noise(img, strength=0.02):
    """Add imperceptible noise to pixel values"""
    pixels = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            if random.random() > 0.95:  # Only affect 5% of pixels
                pixel = pixels[x, y]
                if isinstance(pixel, tuple):
                    noise = tuple(
                        max(0, min(255, c + random.randint(-2, 2)))
                        for c in pixel
                    )
                    pixels[x, y] = noise
    return img

def process_image(input_path, output_path):
    """Apply subtle transformations to make image unique"""
    print(f"Processing {input_path.name}...")

    img = Image.open(input_path)
    original_size = img.size

    # 1. Slight crop and resize back (removes exact pixel matching)
    crop_pixels = 4
    img = img.crop((
        crop_pixels,
        crop_pixels,
        img.width - crop_pixels,
        img.height - crop_pixels
    ))
    img = img.resize(original_size, Image.Resampling.LANCZOS)

    # 2. Subtle brightness adjustment (±1%)
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(random.uniform(0.99, 1.01))

    # 3. Imperceptible contrast tweak
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(random.uniform(0.995, 1.005))

    # 4. Ultra-light unsharp mask
    img = img.filter(ImageFilter.UnsharpMask(radius=0.5, percent=5, threshold=2))

    # 5. Add imperceptible noise to 5% of pixels
    img = add_subtle_noise(img)

    # Save with optimal quality
    img.save(
        output_path,
        quality=95,
        optimize=True,
        method=6  # Maximum compression effort
    )

    print(f"  → Saved {output_path.name}")

def main():
    # Process main images
    images_dir = Path("public/images")

    images = [
        "2-player-run.webp",
        "friends-list.webp",
        "gameplay.webp",
        "level-up-cards.webp",
        "pokesurvivor-coop.webp",
        "pokesurvivor-menu.webp",
        "pokesurvivor-mobile-controls.webp",
        "pokesurvivor-rift-arenas.webp",
        "pokesurvivor-starters-29.webp",
        "pokesurvivor-tier-list.webp",
        "pokesurvivor-zh-guide.webp",
        "rift-arena.webp",
        "rift-legendary-fight.webp",
        "rift-portal.webp",
        "room-invite.webp",
        "starter-picker.webp"
    ]

    for img_name in images:
        input_path = images_dir / img_name
        if input_path.exists():
            process_image(input_path, input_path)

    # Process OG images
    og_images = [
        Path("public/og-default.jpg"),
        Path("public/og-default.webp")
    ]

    for og_path in og_images:
        if og_path.exists():
            process_image(og_path, og_path)

    print("\n✓ All images reprocessed successfully")
    print("Images now have unique fingerprints to avoid duplicate detection")

if __name__ == "__main__":
    main()
