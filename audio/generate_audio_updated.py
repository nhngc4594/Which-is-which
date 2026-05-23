# ============================================================
#  FULL AUDIO GENERATION SCRIPT — Edge TTS
#  Updated to match levels_revised.js word list.
#
#  Safe to run even if you already have audio files —
#  any file that already exists will be skipped.
#
#  Run with:  python generate_audio_updated.py
# ============================================================

import asyncio
import os
import sys
import time

try:
    import edge_tts
except ImportError:
    print("ERROR: The 'edge-tts' library is not installed.")
    print("Please run:  pip install edge-tts")
    sys.exit(1)

# ============================================================
#  VOICES
# ============================================================
MALE_VOICE   = "en-US-GuyNeural"
FEMALE_VOICE = "en-US-JennyNeural"

# ============================================================
#  OUTPUT FOLDER
#  All audio files will be saved inside an 'audio' folder
#  in the same directory as this script.
# ============================================================
OUTPUT_DIR = "audio"

# ============================================================
#  WORD LIST — matches levels_revised.js exactly
# ============================================================
word_list = [

    # ── LEVEL 1 ── S vs SH ───────────────────────────────────────────────
    {
        "id": "S_vs_SH",
        "words": {
            "S": [
                {"word": "sea",     "position": "initial"},
                {"word": "sail",    "position": "initial"},
                {"word": "song",    "position": "initial"},
                {"word": "muscle",  "position": "medial"},   # 🎙 NEW
                {"word": "pencil",  "position": "medial"},   # 🎙 NEW
                {"word": "basin",   "position": "medial"},
                {"word": "bus",     "position": "final"},
                {"word": "face",    "position": "final"},
                {"word": "nice",    "position": "final"},
            ],
            "SH": [
                {"word": "she",     "position": "initial"},
                {"word": "shake",   "position": "initial"},
                {"word": "show",    "position": "initial"},
                {"word": "nation",  "position": "medial"},
                {"word": "fashion", "position": "medial"},
                {"word": "ocean",   "position": "medial"},   # 🎙 NEW
                {"word": "bush",    "position": "final"},
                {"word": "fish",    "position": "final"},
                {"word": "rush",    "position": "final"},
            ],
        },
    },

    # ── LEVEL 2 ── S vs TH (voiceless) ──────────────────────────────────
    {
        "id": "S_vs_TH_voiceless",
        "words": {
            "S": [
                {"word": "sea",     "position": "initial"},
                {"word": "sir",     "position": "initial"},  # 🎙 NEW
                {"word": "soap",    "position": "initial"},
                {"word": "fossil",  "position": "medial"},   # 🎙 NEW
                {"word": "basin",   "position": "medial"},
                {"word": "lesson",  "position": "medial"},
                {"word": "class",   "position": "final"},    # 🎙 NEW
                {"word": "peace",   "position": "final"},
                {"word": "bus",     "position": "final"},
            ],
            "TH": [
                {"word": "thin",    "position": "initial"},
                {"word": "think",   "position": "initial"},
                {"word": "three",   "position": "initial"},
                {"word": "author",  "position": "medial"},
                {"word": "nothing", "position": "medial"},
                {"word": "method",  "position": "medial"},
                {"word": "bath",    "position": "final"},
                {"word": "math",    "position": "final"},
                {"word": "teeth",   "position": "final"},
            ],
        },
    },

    # ── LEVEL 3 ── F vs P ────────────────────────────────────────────────
    {
        "id": "F_vs_P",
        "words": {
            "F": [
                {"word": "fan",     "position": "initial"},
                {"word": "feel",    "position": "initial"},
                {"word": "photo",   "position": "initial"},
                {"word": "after",   "position": "medial"},
                {"word": "offer",   "position": "medial"},
                {"word": "sofa",    "position": "medial"},
                {"word": "effort",  "position": "medial"},   # 🎙 NEW
                {"word": "leaf",    "position": "final"},
                {"word": "roof",    "position": "final"},
                {"word": "safe",    "position": "final"},
            ],
            "P": [
                {"word": "pan",     "position": "initial"},
                {"word": "peel",    "position": "initial"},
                {"word": "pot",     "position": "initial"},
                {"word": "paper",   "position": "medial"},
                {"word": "open",    "position": "medial"},
                {"word": "topic",   "position": "medial"},
                {"word": "leap",    "position": "final"},
                {"word": "rope",    "position": "final"},
                {"word": "tape",    "position": "final"},
            ],
        },
    },

    # ── LEVEL 4 ── L vs R ────────────────────────────────────────────────
    {
        "id": "L_vs_R",
        "words": {
            "L": [
                {"word": "lake",    "position": "initial"},
                {"word": "lane",    "position": "initial"},  # 🎙 NEW
                {"word": "low",     "position": "initial"},
                {"word": "lock",    "position": "initial"},  # 🎙 NEW
                {"word": "alive",   "position": "medial"},
                {"word": "balloon", "position": "medial"},
                {"word": "below",   "position": "medial"},
                {"word": "collect", "position": "medial"},   # 🎙 NEW
                {"word": "bell",    "position": "final"},
                {"word": "hill",    "position": "final"},    # 🎙 NEW
                {"word": "tall",    "position": "final"},
            ],
            "R": [
                {"word": "rain",    "position": "initial"},
                {"word": "rake",    "position": "initial"},  # 🎙 NEW
                {"word": "rice",    "position": "initial"},
                {"word": "rock",    "position": "initial"},  # 🎙 NEW
                {"word": "carrot",  "position": "medial"},
                {"word": "correct", "position": "medial"},   # 🎙 NEW
                {"word": "mirror",  "position": "medial"},   # 🎙 NEW
                {"word": "river",   "position": "medial"},   # 🎙 NEW
                {"word": "star",    "position": "final"},
                {"word": "door",    "position": "final"},
                {"word": "far",     "position": "final"},
            ],
        },
    },

    # ── LEVEL 5 ── Z vs TH (voiced) ──────────────────────────────────────
    {
        "id": "Z_vs_TH_voiced",
        "words": {
            "Z": [
                {"word": "zoo",     "position": "initial"},
                {"word": "zone",    "position": "initial"},
                {"word": "zero",    "position": "initial"},
                {"word": "frozen",  "position": "medial"},
                {"word": "razor",   "position": "medial"},
                {"word": "season",  "position": "medial"},
                {"word": "bees",    "position": "final"},
                {"word": "nose",    "position": "final"},
                {"word": "phase",   "position": "final"},
            ],
            "TH": [
                {"word": "they",    "position": "initial"},  # 🎙 NEW (replaced "the")
                {"word": "this",    "position": "initial"},
                {"word": "those",   "position": "initial"},
                {"word": "father",  "position": "medial"},
                {"word": "mother",  "position": "medial"},
                {"word": "other",   "position": "medial"},
                {"word": "bathe",   "position": "final"},
                {"word": "breathe", "position": "final"},
                {"word": "soothe",  "position": "final"},
            ],
        },
    },

    # ── LEVEL 6 ── CH vs TS ──────────────────────────────────────────────
    {
        "id": "CH_vs_TS",
        "words": {
            "CH": [
                {"word": "chain",   "position": "initial"},
                {"word": "chip",    "position": "initial"},
                {"word": "choose",  "position": "initial"},
                {"word": "teacher", "position": "medial"},
                {"word": "kitchen", "position": "medial"},
                {"word": "nature",  "position": "medial"},
                {"word": "beach",   "position": "final"},
                {"word": "catch",   "position": "final"},
                {"word": "coach",   "position": "final"},
            ],
            "TS": [
                {"word": "outside", "position": "medial"},   # 🎙 NEW
                {"word": "itself",  "position": "medial"},   # 🎙 NEW
                {"word": "streets", "position": "medial"},   # 🎙 NEW
                {"word": "boats",   "position": "final"},
                {"word": "cats",    "position": "final"},
                {"word": "roots",   "position": "final"},
                {"word": "beats",   "position": "final"},    # 🎙 NEW
                {"word": "seats",   "position": "final"},    # 🎙 NEW
                {"word": "treats",  "position": "final"},    # 🎙 NEW
            ],
        },
    },

    # ── LEVEL 7 ── N vs NG ───────────────────────────────────────────────
    {
        "id": "N_vs_NG",
        "words": {
            "N": [
                {"word": "nail",    "position": "initial"},
                {"word": "night",   "position": "initial"},
                {"word": "nose",    "position": "initial"},
                {"word": "animal",  "position": "medial"},
                {"word": "dinner",  "position": "medial"},
                {"word": "money",   "position": "medial"},
                {"word": "bone",    "position": "final"},
                {"word": "moon",    "position": "final"},
                {"word": "train",   "position": "final"},
            ],
            "NG": [
                {"word": "anger",   "position": "medial"},
                {"word": "finger",  "position": "medial"},
                {"word": "longer",  "position": "medial"},
                {"word": "single",  "position": "medial"},   # 🎙 NEW
                {"word": "king",    "position": "final"},
                {"word": "long",    "position": "final"},
                {"word": "song",    "position": "final"},
                {"word": "spring",  "position": "final"},    # 🎙 NEW
                {"word": "strong",  "position": "final"},    # 🎙 NEW
            ],
        },
    },

    # ── LEVEL 8 ── V vs B ────────────────────────────────────────────────
    {
        "id": "V_vs_B",
        "words": {
            "V": [
                {"word": "van",     "position": "initial"},
                {"word": "voice",   "position": "initial"},  # 🎙 NEW
                {"word": "vote",    "position": "initial"},
                {"word": "clever",  "position": "medial"},
                {"word": "oven",    "position": "medial"},
                {"word": "river",   "position": "medial"},
                {"word": "cave",    "position": "final"},
                {"word": "live",    "position": "final"},
                {"word": "stove",   "position": "final"},
            ],
            "B": [
                {"word": "ban",     "position": "initial"},
                {"word": "bone",    "position": "initial"},
                {"word": "boat",    "position": "initial"},
                {"word": "table",   "position": "medial"},
                {"word": "number",  "position": "medial"},   # 🎙 NEW
                {"word": "robot",   "position": "medial"},
                {"word": "web",     "position": "final"},    # 🎙 NEW
                {"word": "robe",    "position": "final"},
                {"word": "tube",    "position": "final"},
            ],
        },
    },

]

# ============================================================
#  GENERATION FUNCTIONS
# ============================================================

async def generate_file(word, voice, path):
    """Generate a single MP3 file."""
    communicate = edge_tts.Communicate(word, voice)
    await communicate.save(path)

def sanitize(text):
    """Make text safe for use in a filename."""
    return text.replace(" ", "_").replace("/", "-")

async def generate_all():
    total  = 0
    skipped = 0
    errors = 0

    for pair in word_list:
        pair_id  = pair["id"]
        pair_dir = os.path.join(OUTPUT_DIR, pair_id)
        os.makedirs(pair_dir, exist_ok=True)

        for sound, entries in pair["words"].items():
            for entry in entries:
                word     = entry["word"]
                position = entry["position"]
                s_sound  = sanitize(sound)
                s_word   = sanitize(word)

                for gender, voice in [("male", MALE_VOICE), ("female", FEMALE_VOICE)]:
                    filename = f"{s_sound}_{position}_{s_word}_{gender}.mp3"
                    filepath = os.path.join(pair_dir, filename)

                    if os.path.exists(filepath):
                        skipped += 1
                        continue

                    try:
                        await generate_file(word, voice, filepath)
                        print(f"  OK: {pair_id}/{filename}")
                        total += 1
                    except Exception as e:
                        print(f"  ERROR: {filename} — {e}")
                        errors += 1

                    await asyncio.sleep(0.3)

    return total, skipped, errors

# ============================================================
#  MAIN
# ============================================================
print("=" * 55)
print("  FULL AUDIO GENERATION — Edge TTS")
print(f"  Male voice:    {MALE_VOICE}")
print(f"  Female voice:  {FEMALE_VOICE}")
print(f"  Output folder: {os.path.abspath(OUTPUT_DIR)}")
print("=" * 55)
print()
print("  Starting generation — existing files will be skipped.")
print()

start = time.time()
total, skipped, errors = asyncio.run(generate_all())
elapsed = time.time() - start

print()
print("=" * 55)
print(f"  Done! {total} new files generated in {elapsed:.1f} seconds.")
print(f"  {skipped} existing files skipped.")
if errors:
    print(f"  ⚠️  {errors} errors — check the output above.")
else:
    print("  No errors!")
print(f"  Files saved to: {os.path.abspath(OUTPUT_DIR)}")
print("=" * 55)
