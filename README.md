# CHRONON — The Binary Time Standard

The official chronon.org website.

**The Chronon (Ch)** is a new time unit: **1 Ch = 0.8589934592 seconds** (= 2³³ ns quantum).

- **1 Ch** = 0.8589934592 s — replaces the second (≈ 69.85 beats/min, the resting human heart rate)
- **1 s** = 1.1641532183 Ch
- **1 min** = 69.84919310 Ch
- **1 hr** = 4,190.951586 Ch
- **1 day** = 100,582.8381 Ch

## Local development / hosting with `jni`

A tiny static server (named `jni`) that serves this folder and binds to the
**current device IP** on a **port** of your choice.

```sh
chmod +x jni
./jni 8000
```

Then open:

```
http://<current-ip>:8000
```

### Custom port / root

```sh
./jni 3000 /path/to/serve
```

## Deploying to chronon.org

Point DNS `A/AAAA` for `chronon.org` at your static host and upload this
folder (or just `index.html`) as the site root. Add the `CNAME` file with
content `chronon.org` for GitHub Pages.
