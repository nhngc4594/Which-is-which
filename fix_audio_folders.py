# ============================================================
#  FIX AUDIO FOLDERS
#  Moves all subfolders from audio/audio/ up into audio/
#  then deletes the now-empty inner audio/ folder.
#
#  Run this from your main game folder:
#  e.g. C:\Users\user\Documents\GitHub\phonetic-flow\
# ============================================================

import os
import shutil

# The folder where the files ended up by mistake
wrong_place = os.path.join("audio", "audio")

# The folder where they should be
right_place = "audio"

# ── Check that the wrong folder actually exists ──────────────
if not os.path.exists(wrong_place):
    print("Hmm — couldn't find an 'audio/audio' folder.")
    print("Maybe it's already been fixed? Check your audio/ folder.")
    input("\nPress Enter to close.")
    exit()

# ── Move each subfolder up one level ────────────────────────
print("Moving folders...")
print()

moved = 0
for folder_name in os.listdir(wrong_place):
    source      = os.path.join(wrong_place, folder_name)
    destination = os.path.join(right_place, folder_name)

    if os.path.isdir(source):
        if os.path.exists(destination):
            # Folder already exists — merge the files into it
            print(f"  Merging into existing folder: {folder_name}/")
            for filename in os.listdir(source):
                src_file  = os.path.join(source, filename)
                dest_file = os.path.join(destination, filename)
                if not os.path.exists(dest_file):
                    shutil.move(src_file, dest_file)
                    print(f"    Moved: {filename}")
                else:
                    print(f"    Skipped (already exists): {filename}")
        else:
            # Folder doesn't exist yet — move it wholesale
            shutil.move(source, destination)
            print(f"  Moved folder: {folder_name}/")
        moved += 1

# ── Delete the now-empty inner audio/ folder ────────────────
try:
    os.rmdir(wrong_place)
    print()
    print(f"  Deleted empty folder: {wrong_place}")
except OSError:
    print()
    print(f"  Note: couldn't delete {wrong_place} — it may not be empty yet.")
    print(f"  You can delete it manually in File Explorer.")

# ── Done ────────────────────────────────────────────────────
print()
print("=" * 45)
print(f"  Done! {moved} folders moved to audio/")
print("  Your audio files are now in the right place.")
print("=" * 45)
input("\nPress Enter to close.")
