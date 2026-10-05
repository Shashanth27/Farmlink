"""
Central path resolution for files the backend reads or writes.

In normal (non-frozen) execution, paths resolve relative to the source
tree exactly as they always have. When running as a PyInstaller-frozen
executable, bundled read-only assets (e.g. crop_knowledge_base.json)
live under the temporary extraction dir (sys._MEIPASS), which is wiped
between runs — so writable data (SQLite databases) instead goes to a
persistent per-user app-data directory that survives across launches.
"""

import sys
from pathlib import Path

APP_NAME = "FarmLink"


def is_frozen() -> bool:
    return getattr(sys, "frozen", False)


def bundle_dir() -> Path:
    """
    Read-only assets bundled into the executable (or the source tree).

    In dev mode this is the repo root (backend/'s parent), matching where
    crop_database/ actually lives; the frozen build copies crop_database/
    into the PyInstaller bundle root to mirror that layout.
    """
    if is_frozen():
        return Path(sys._MEIPASS)
    return Path(__file__).resolve().parent.parent.parent


def user_data_dir() -> Path:
    """Persistent, writable per-user directory for databases and logs."""
    if not is_frozen():
        return Path(__file__).resolve().parent.parent / "app" / "database"

    if sys.platform == "win32":
        base = Path.home() / "AppData" / "Local" / APP_NAME
    elif sys.platform == "darwin":
        base = Path.home() / "Library" / "Application Support" / APP_NAME
    else:
        base = Path.home() / ".local" / "share" / APP_NAME

    base.mkdir(parents=True, exist_ok=True)
    return base


def seed_if_missing(dest: Path, seed_name: str) -> Path:
    """
    First run of the frozen app: copy a bundled starter DB into the
    persistent user-data dir so the app ships with real historical data
    instead of an empty table. Later runs reuse the already-copied,
    already-synced copy. In dev mode, dest already points at the
    checked-in database, so this is a no-op.
    """
    if is_frozen() and not dest.exists():
        seed = bundle_dir() / "app" / "database" / seed_name
        if seed.exists():
            import shutil

            shutil.copy2(seed, dest)
    return dest
