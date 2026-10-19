# SpectreHub

Unified FRC **Scouting** & **Driver Station Dashboard** platform for **Spectre Robotics**.

- **Landing Screen**: Displays the **SpectreHub** work-in-progress home screen when opened.
- **Scouting Tab**: Currently an empty placeholder tab ready for integration from the cloned [`pinkscout/`](./pinkscout) repository (`RTMBE/Pinkscout`).
- **Dashboard (Reflect) Tab**: Full fork of the [2702 Rebels Reflect](https://github.com/2702rebels/reflect) FRC Driver Station dashboard.

---

## Running on Windows (Driver Station & Local Dev)

### Option 1: Quick Windows App Window (`Start-SpectreHub.bat`)
Double-click `Start-SpectreHub.bat` (or run `npm run dev` and open `http://localhost:1420`). It launches SpectreHub in a standalone Windows app window (`msedge --app=http://localhost:1420`).

### Option 2: Native Windows `.exe` (Tauri)
Because SpectreHub is built on Tauri (`src-tauri/`), you can build a native Windows installer and standalone `.exe` (requires [Rust](https://rustup.rs/)):
```bash
npm run build-app
```
Or trigger the GitHub Actions release workflow (`.github/workflows/release.yml`) to automatically build `win-x64` and `win-arm64` executables.

---

## Deploying to Cloudflare Pages (For Scouters & Web Access)

### Option A: Connect GitHub Repo in Cloudflare Dashboard
1. Push this repository to [`https://github.com/SpectreRobotics/SpectreHub.git`](https://github.com/SpectreRobotics/SpectreHub.git).
2. In the **Cloudflare Dashboard**, go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git** and select `SpectreRobotics/SpectreHub`.
3. Use these build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: `NODE_VERSION` = `22`

### Option B: Direct CLI Deploy with Wrangler
```bash
npm run build
npx wrangler pages deploy dist --project-name=spectrehub
```
