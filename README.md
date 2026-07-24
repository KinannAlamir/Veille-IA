# Advisory Signal Watch Portal — Interactive Web Prototype

An interactive and lightweight web template designed for technology and modern consultancy watch operations. 
Built with responsive HTML5, modern Tailwind CSS, and vanilla ES6 JavaScript to deliver a responsive, zero-latency experience with offline-first client persistence.

---

## 🎨 Features & Capabilities

- **Elegant Corporate Design** : High-contrast typography featuring `DM Sans` and `Space Grotesk`, with smooth transitions, custom scrollbars, and fluid components.
- **Micro-Frontend Architecture** : Highly optimised single-page web environment requiring no heavy frameworks or modern bundlers.
- **End-to-End Watch Journey** :
  - **Dashboard Overview** : Consolidates key pipeline metrics, lists the top active signals, and shows a timeline tracker of the automated workflow.
  - **Preferences & Priorities** : Drag, swap, or reorder active topics to adjust crawler priority weights. Manage collection quotas (`MAX / MODERATE / RESTRICTED`) dynamically.
  - **Interactive Social Feed** : A LinkedIn-style scrolling experience with contextual posts. Instantly switch reading depths (`HIGH level` for executive digests vs `LOW level` for deep technical mechanics) on the fly.
  - **Publishing & Brand Booster** : Instantly draft curated content ready-to-copy, with templates covering LinkedIn posts, newsletters, and briefing notes.
- **State Persistence** : Seamlessly preserves user preferences and selected topics locally inside the browser's `localStorage`.

---

## 🚀 How to Run the Application

You can open the portal instantly using any of the options below:

### Option 1 : Direct Launch (Offline)

1. Navigate to the root directory folder.
2. Double-click the [index.html](index.html) file to open and run it directly in your favorite web browser (Chrome, Edge, Safari, Firefox). No installation or network connection is required.

---

### Option 2 : Local Server Launch (Recommended)

Running a local HTTP server is recommended to enable developer logs or external testing:

```bash
# Using Python
python -m http.server 8000
```
Then, point your browser to : [http://localhost:8000](http://localhost:8000)

---

## 📂 Project Structure

```
WatchPortal/
├── index.html     # Semantic responsive markup, CDN bindings, and layout structure
├── styles.css     # Premium UX custom style sheets, card animation triggers, and scroll settings
├── app.js         # Reactive state-management, search engines, and mock news database
└── README.md      # This public documentation file
```

