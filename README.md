<p align="center">
  <img width="300px" height="950px" src="https://github.com/user-attachments/assets/e3551d8c-dce3-4b38-be46-631013c78e06"/>  
</p>

<p align="center"><em>Taking automation to new heights!</em></p>

# Drop Zone Ops

**A client-side M3U playlist builder for DIY broadcasters.**

Drop Zone Ops is a single-file web app that makes building `.m3u` playlists accessible to anyone — no server, no installation, no command line. Open the file in a browser and start building.

It was created to support the DIY broadcast workflows behind [schwwaaa](https://schwwaaa.net/) and [subcarrier.tv](https://subcarrier.tv/) — two community-run streaming channels that needed a simple way to assemble custom playlists with interstitial breaks, commercial bumpers, and mixed local/remote content, then hand them off to OBS with VLC as a source.

---

## Why does this exist?

Building an `.m3u` playlist by hand in a text editor is confusing, error-prone, and inaccessible to collaborators who aren't comfortable with file paths and formatting. At the same time, most playlist tools are either bloated, server-dependent, or don't support the mixed local + remote file workflows that DIY streaming actually requires.

Drop Zone Ops solves that. It's a drag-and-drop playlist builder that outputs a clean, correctly formatted `.m3u` file that works in both VLC and OBS's VLC source plugin — no trailing newline issues, no path headaches.

---

## How it works

### 1. Open the app

Just open `index.html` in any modern browser. No server needed. No install. Works on Mac, Windows, and Linux.

### 2. Set your local base path
<p align="left">
  <img width="50%" height="50%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-localbasepath.png?raw=true"/>  
</p>

If you're using local video files, set your **Base Path** at the top of the left panel before adding files.

This is the folder where your video files live on your machine:

- **Mac / Linux:** `/Users/yourname/Videos/content/`
- **Windows:** `C:\Users\yourname\Videos\content\`

Every local file you drop in will automatically be prefixed with this path in the exported `.m3u`. If you add files before setting the path, hit **APPLY ALL** to apply it retroactively.

> Remote URLs (Dropbox, S3, HTTP links) are never affected by the base path — they pass through exactly as-is.

### 3. Add files to your playlist
<p align="left">
  <img width="40%" height="40%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-dropfiles.png?raw=true"/>  
</p>

Three ways to add content:

**Drop files** — Drag video files directly from your file manager into the drop zone. They'll appear in the playlist list immediately.

**Browse** — Click **Browse Local Files** to open a file picker.

**Paste a URL** — For remote files, paste any HTTP/HTTPS URL into the URL field, give it a display name, and click **+ ADD** or hit Enter.

### 4. Arrange your playlist
<p align="left">
  <img width="50%" height="50%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-playlist.png?raw=true"/>  
</p>

Drag items up and down by the **⠿** handle on the left side of each row. This is where Drop Zone Ops earns its keep — you can build a custom broadcast block with interstitials, ad breaks, and bumpers exactly where you want them.

### 5. Tag your content
<p align="left">
  <img width="50%" height="50%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-modifycategory.png?raw=true"/>  
</p>

Each item has a **tag** that categorizes its role in the playlist:

| Tag | Use case |
|---|---|
| `content` | Main programming — episodes, films, features |
| `commercial` | Ad spots |
| `bumper` | Short intro/outro clips, station IDs |
| `interstitial` | Transitions, filler, between-segment content |

Click the colored tag badge on any item to cycle through tags. Use **Sort by Tag** to group your playlist by type when needed.

### 6. Edit item details
<p align="left">
  <img width="55%" height="55%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-edititem.png?raw=true"/>  
</p>

Click any item's **title** to open the edit modal. From there you can update:

- **Display name** — what appears in the `#EXTINF` line of the `.m3u`
- **File path / URL** — the actual path or link to the file
- **Duration** — enter in `MM:SS` or `H:MM:SS` format (e.g. `22:30`, `1:04:15`)
- **Tag** — content type
- **Group / Block** — optional label for grouping (e.g. `block-1`, `ad-break-2`)

### 7. Import from CSV or JSON
<p align="left">
  <img width="35%" height="35%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-csvjsonimport.png?raw=true"/>  
</p>

If you have a list of files already organized in a spreadsheet or data file, click **Import CSV / JSON** to load them in bulk.

**CSV format:**
```
path,name,duration,tag,group
/Users/yourname/Videos/episode-01.mp4,Episode 01,22:30,content,block-1
https://your-bucket.s3.amazonaws.com/ad.mp4,Soda Ad,0:30,commercial,ad-break-1
```

**JSON format:**
```json
[
  {
    "path": "/Users/yourname/Videos/episode-01.mp4",
    "name": "Episode 01",
    "duration": "22:30",
    "tag": "content",
    "group": "block-1"
  },
  {
    "path": "https://your-bucket.s3.amazonaws.com/ad.mp4",
    "name": "Soda Ad",
    "duration": "0:30",
    "tag": "commercial",
    "group": "ad-break-1"
  }
]
```

Template files for both formats are included in the repo: `playlist-template.csv` and `playlist-template.json`.

### 8. Name and export your playlist

<p align="left">
  <img width="30%" height="30%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-exportnamedm3u.png?raw=true"/>  
</p>

Type a name for your playlist in the **Playlist Name** field (e.g. `saturday-night-block`). Then click **Export .M3U Playlist** — the file downloads directly to your machine as `saturday-night-block.m3u`.

The exported file is compatible with both **VLC** and **OBS VLC Source**.

---

## Commercial Injection

The **💉 Commercial Injection** panel lets you automatically weave commercials, bumpers, and breaks into your content playlist using a reusable JSON template — no manual rearranging required.

Click the **💉 Commercial Injection** button at the bottom of the Operations panel. It slides in from the right over the existing UI.

### How it works

The injector takes your content playlist and a set of rules, then outputs a fully merged playlist back into Drop Zone Ops — ready to export as a single `.m3u`.

The panel has three columns:

**1. Commercial Library** — your pool of ad clips. Add clips by filename (combined with the library base path) or full remote URL. 

<p align="left">
  <img width="50%" height="50%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-comminjection-comlibrary.png?raw=true"/> 
</p>

Each clip gets a display name and optional duration. Any clip in the library can also be assigned as a pre or post break bumper.

**2. Injection Rules** — where you define when and how breaks fire:

<p align="left">
  <img width="50%" height="50%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-comminjectiondetail-rules.png?raw=true"/> 
</p>

- **Default Rule** — fires automatically every N content items. Set the interval, min/max ads per break, and selection mode
- **Position Overrides** — fire a different rule at a specific item number, overriding the default for that break only
- **Bumpers** — optionally assign a pre-break and/or post-break clip per rule (e.g. "After these messages..." / "And we're back...")

**Selection modes:**

| Mode | Behavior |
|---|---|
| `random` | Picks ads randomly from the library each time |
| `sequential` | Cycles through the library in order across all breaks |
| `specific` | Uses exact clips you name in the template |

**3. JSON Template + Preview** — the live template JSON updates as you configure. 

<p align="left">
  <img width="50%" height="50%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-comminjectiondetail-jsontemplate.png?raw=true"/> 
</p>

You can:
- **Edit** the JSON directly (click **Edit** to unlock, **Lock** to validate and snap back)
- **↓ Save** the template as a `.json` file to reuse across sessions
- **Import Template JSON** to load a previously saved template
- See a **Merged Preview** of the final injected playlist in real time, color-coded by type

### Content source

The injector auto-reads your current Drop Zone playlist. You can also import a separate `.m3u` or `.json` file as the content source if you want to work independently of the live playlist.

### Generating the output

Click **💉 INJECT & UPDATE PLAYLIST** — the injector merges your content and commercials according to the rules and replaces the Drop Zone playlist in place. Then export your `.m3u` as normal.

### Template format reference

The injection template is a plain JSON file you can save, share, and reuse:

```json
{
  "name": "saturday-night-block",
  "commercial_library": {
    "source": "/Users/yourname/Videos/commercials/",
    "files": [
      { "name": "Soda Ad", "path": "soda-ad.mp4", "duration": "0:30" },
      { "name": "Car Ad", "path": "car-ad.mp4", "duration": "0:30" },
      { "name": "And We're Back", "path": "back-bumper.mp4", "duration": "0:08" }
    ]
  },
  "breaks": {
    "default_interval": 2,
    "min_ads": 1,
    "max_ads": 2,
    "selection": "random",
    "default_bumpers": {
      "post": "/Users/yourname/Videos/commercials/back-bumper.mp4"
    },
    "overrides": [
      {
        "after_item": 1,
        "min_ads": 2,
        "max_ads": 2,
        "selection": "sequential",
        "bumpers": {
          "pre": "/Users/yourname/Videos/commercials/into-break.mp4",
          "post": "/Users/yourname/Videos/commercials/back-bumper.mp4"
        }
      }
    ]
  }
}
```

---

## Using the playlist in OBS

<p align="left">
  <img width="50%" height="50%" src="https://github.com/schwwaaa/drop-zone-ops/blob/v2/assets/dropzoneops-obs.png?raw=true"/>  
</p>

1. In OBS, add a new source → **VLC Video Source**
2. Click the **+** button under the playlist and select **Add Path/URL**
3. Point it at your exported `.m3u` file
4. OBS will load and play through the playlist in order

> **Note:** OBS's VLC source is strict about file formatting. Drop Zone Ops handles this automatically — paths are written correctly and the file ends without a trailing newline, which is required for OBS compatibility.

---

## The M3U format

An exported playlist looks like this:

```
#EXTM3U
#EXTINF:1350 group-title="block-1" tvg-type="content",Episode 01
/Users/yourname/Videos/episode-01.mp4
#EXTINF:30 group-title="ad-break-1" tvg-type="commercial",Soda Ad
https://your-bucket.s3.amazonaws.com/ad.mp4
#EXTINF:8 group-title="ad-break-1" tvg-type="bumper",And We're Back
/Users/yourname/Videos/back-bumper.mp4
```

Each entry is two lines: a `#EXTINF` metadata line followed by the file path or URL.

---

## Playlist stats

The right panel shows a live count of items by tag and a **Total Time** display. Total time calculates automatically from any duration values you've entered on your items.

---

## Tested on

- macOS (Apple Silicon)
- Windows 10 / 11
- Linux (Ubuntu 24.04)

Works in Chrome, Firefox, Safari, and Edge.

---

## Attributions

- Influenced by [obs_scheduler by cyberboy666](https://github.com/cyberboy666/obs_scheduler?tab=readme-ov-file)
- Built for [schwwaaa](https://schwwaaa.net/) & [subcarrier.tv](https://subcarrier.tv/)
