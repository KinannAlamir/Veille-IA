/**
 * Wavestone CTO Advisory Signal - Core Web Application (v2.1)
 */

// 1. Flat List of Topics
const TOPICS_LIST = [
    { id: "arch_design", label: "Architecture & Design", desc: "API, Data platform, Event-Driven, Microservices, SASE, SAP, Archi d'entreprise" },
    { id: "infra_conn", label: "Infrastructure & Connectivity", desc: "Compute, Storage, Virtualization, SDWAN, 5G / LEO, Smart Connectivity" },
    { id: "cloud_adopt", label: "Cloud Adoption & IT Programs", desc: "Move 2 cloud, TOM Cloud, Schéma directeur, Réversibilité & Sourcing" },
    { id: "auto_ops_sre", label: "Automation, Ops & SRE", desc: "DevOps, SRE, Kubernetes, Terraform, CI/CD, Observabilité" },
    { id: "sovereignty_resilience", label: "Souveraineté & Résilience", desc: "Cloud de confiance, SecNumCloud, Cloud Security, SecOps, VMware" },
    { id: "sustech_finops", label: "Sustech & FinOps", desc: "Greenops, Finops / coûts, GreenIT, Cloud Sustainability" },
    { id: "hyperscalers", label: "Hyperscalers", desc: "Innovation et annonces AWS, Azure, GCP" },
    { id: "ai", label: "Intelligence Artificielle", desc: "GenAI, MLOps, AI Governance" },
    { id: "quantum", label: "Quantum Computing", desc: "Post-Quantum Crypto, Quantum Algorithms, QPU Infrastructure" },
    { id: "fow_modern_workplace", label: "Modern Workplace & Infra", desc: "Périmètre matériel, réseau, environnement physique/hybride et gestion de flotte" },
    { id: "fow_comm_collab", label: "Communication et Collab", desc: "Outils d'échange, visioconférence, voix, messagerie d'entreprise" },
    { id: "fow_nextgen_support", label: "Next Gen IT Support", desc: "Assistance utilisateurs, résolution incidents, automatisation des tickets" },
    { id: "fow_cyber_compliance", label: "Cyber, Identity & Compliance", desc: "Sécurité des accès, protection des données, règles légales IT" },
    { id: "fow_data_ai", label: "Data Dev & AI Capabilities", desc: "Briques techno applicatives, gestion des données et modèles de fondation" }
];

// Liste des sources de veille réellement utilisées par le scraper (miroir de src/config.py SOURCES_BY_TOPIC)
const SOURCES_LIST = [
    { name: "Hacker News (RSS)", type: "rss" },
    { name: "HackerNews Web", type: "web" },
    { name: "Martin Fowler", type: "rss" },
    { name: "The New Stack", type: "web" },
    { name: "The Register - Data Centre", type: "rss" },
    { name: "Cisco Blogs", type: "rss" },
    { name: "Cloudflare Blog", type: "web" },
    { name: "CIO.com", type: "rss" },
    { name: "The Register - Cloud", type: "rss" },
    { name: "DevOps.com", type: "rss" },
    { name: "Kubernetes Blog", type: "rss" },
    { name: "LeMagIT", type: "rss" },
    { name: "Silicon.fr", type: "rss" },
    { name: "FinOps Foundation", type: "rss" },
    { name: "GreenIT.fr", type: "rss" },
    { name: "AWS What's New", type: "rss" },
    { name: "Azure Updates", type: "rss" },
    { name: "Google Cloud Blog", type: "rss" },
    { name: "AI News", type: "rss" },
    { name: "OpenAI Blog", type: "rss" },
    { name: "Quantum Computing Report", type: "rss" },
    { name: "Petri IT Knowledgebase", type: "rss" },
    { name: "Zoom Blog", type: "rss" },
    { name: "ITSM.tools", type: "rss" },
    { name: "The Hacker News", type: "rss" },
    { name: "Krebs on Security", type: "rss" },
    { name: "Towards Data Science", type: "rss" },
    { name: "Hugging Face Blog", type: "web" }
];

// Alias des anciens identifiants de catégorie (agents historiques) vers les 14 sujets canoniques
// de "Choix des sujets", pour que les rapports plus anciens restent rattachés à un sujet affiché.
const LEGACY_TOPIC_ALIASES = {
    ea: "arch_design",
    sourcing: "cloud_adopt",
    ma: "hyperscalers",
    smartflow: "fow_nextgen_support"
};

// 2. LinkedIn Feed News Database (Supporting dual-state High & Low reading levels)
let NEWSByLevel = []; // Sera rempli par le fetch local ou API Cloud

// Fonction asynchrone pour charger les données
async function loadMockData() {
    try {
        // Remplacer "VOTRE_URL_DE_LAMBDA" par l'URL Function URL une fois déployée.
        // Pour le moment en attendant l'URL, on simule en local.
        const API_URL = 'https://puxvcvasttxwh7rkbivf2cavsm0effqy.lambda-url.eu-west-2.on.aws/';
        
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        NEWSByLevel = await response.json();
        console.log("Mock data loaded successfully!", NEWSByLevel);
        
        // Initialiser l'interface après le chargement des données
        initUI();
    } catch (e) {
        console.error("Could not load mock data. Fallback to empty array.", e);
        NEWSByLevel = [];
        initUI();
    }
}

// Global Ingestion Trigger
window.forceIngestion = async function() {
    const INGESTION_LAMBDA_URL = 'https://tzhjgpcakz7is3qa7a2zw3hu7m0zwsur.lambda-url.eu-west-2.on.aws/';
    if (!INGESTION_LAMBDA_URL) {
        showToast("Erreur : L'URL de votre fonction Lambda d'ingestion (Étape 4) n'est pas configurée dans app.js à la ligne 41.", "alert-circle", "red");
        return;
    }

    const btn = document.getElementById("btn-force-ingest");
    if(btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Traitement IA en cours...</span>`;
        lucide.createIcons();
    }

    showToast("AWS : Scraping et inférence Amazon Nova Micro en cours... Cela prend environ 10-15 secondes.", "bot", "indigo");

    try {
        const res = await fetch(INGESTION_LAMBDA_URL, { method: 'POST' });
        if(res.ok) {
            const data = await res.json();
            if (data.cooldown_active) {
                showToast(`Ingestion déjà lancée récemment. Prochain essai possible dans ${data.cooldown_remaining_minutes} min.`, "clock", "amber");
            } else {
                showToast(`Ingestion terminée avec succès ! ${data.processed} ajouts, ${data.skipped} ignorés.`, "check-circle", "emerald");
                // Reload global data matching database update
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        } else {
            showToast(`Erreur HTTP Serveur AWS : ${res.status}`, "alert-circle", "red");
        }
    } catch (e) {
        showToast("Erreur réseau requète Ingestion AWS.", "alert-circle", "red");
        console.error(e);
    } finally {
        if(btn) {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="refresh-cw" class="w-4 h-4"></i><span>Ingestion AWS IA</span>`;
            lucide.createIcons();
        }
    }
}

// 3. Application Variables & Persistent State
const state = {
    activePage: "dashboard",
    selectedTopics: [],     // Array of checked IDs in order of preference
    topicLevels: {},        // topic_id -> "high" | "low"
    topicQuotas: {},        // topic_id -> "high" | "medium" | "low"
    likesCount: {},         // news_id -> count
    likedSet: [],           // list of liked IDs
    readingLevel: "high"    // "high" or "low"
};

// 4. Initialize Elements on Document Loaded
document.addEventListener("DOMContentLoaded", () => {
    // Start the loading sequence with mock data
    loadMockData();
    lucide.createIcons();
});

// App Initialization
function initUI() {
    initDate();
    initPageState();
    initTopics();
    renderPage();
    setupEventListeners();
    
    // Refresh lucide icons
    lucide.createIcons();
}

// Set current date on French style
function initDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const systemDate = new Date(2026, 6, 24); // July 24, 2026
    document.getElementById("topbar-date").textContent = systemDate.toLocaleDateString('fr-FR', options);
}

// Retrieve or initialize states from localStorage
function initPageState() {
    const savedTopics = localStorage.getItem("signal_selected_topics_v3");
    const savedPage = localStorage.getItem("signal_active_page_v3");
    const savedLevel = localStorage.getItem("signal_reading_level_v3");
    const savedLiked = localStorage.getItem("signal_liked_set_v3");
    const savedTopicLevels = localStorage.getItem("signal_topic_levels_v3");
    const savedTopicQuotas = localStorage.getItem("signal_topic_quotas_v3");
    
    if (savedTopics) {
        state.selectedTopics = JSON.parse(savedTopics);
    } else {
        // Default with all 12 topic IDs activated
        state.selectedTopics = TOPICS_LIST.map(topic => topic.id);
        saveState();
    }

    if (savedTopicLevels) {
        state.topicLevels = JSON.parse(savedTopicLevels);
    } else {
        state.topicLevels = {};
        TOPICS_LIST.forEach(topic => {
            state.topicLevels[topic.id] = "high";
        });
    }

    if (savedTopicQuotas) {
        state.topicQuotas = JSON.parse(savedTopicQuotas);
    } else {
        state.topicQuotas = {};
        TOPICS_LIST.forEach((topic, i) => {
            // Default quotas matching index (first 3 are high, next 3 are medium, others low)
            if (i < 3) state.topicQuotas[topic.id] = "high";
            else if (i < 6) state.topicQuotas[topic.id] = "medium";
            else state.topicQuotas[topic.id] = "low";
        });
    }

    if (savedPage) {
        state.activePage = savedPage;
    }
    
    if (savedLevel) {
        state.readingLevel = savedLevel;
    }

    if (savedLiked) {
        state.likedSet = JSON.parse(savedLiked);
    }

    // Initialize mock likes counts
    NEWSByLevel.forEach(n => {
        // Generate a small random number of likes for simulation as score is removed
        state.likesCount[n.id] = Math.floor(Math.random() * 15) + 2; 
    });

    updateBadgeCounts();
    switchReadingLevelElementStyles();
}

function saveState() {
    localStorage.setItem("signal_selected_topics_v3", JSON.stringify(state.selectedTopics));
    localStorage.setItem("signal_active_page_v3", state.activePage);
    localStorage.setItem("signal_reading_level_v3", state.readingLevel);
    localStorage.setItem("signal_liked_set_v3", JSON.stringify(state.likedSet));
    localStorage.setItem("signal_topic_levels_v3", JSON.stringify(state.topicLevels));
    localStorage.setItem("signal_topic_quotas_v3", JSON.stringify(state.topicQuotas));
}

function updateBadgeCounts() {
    const count = state.selectedTopics.length;
    // Sidebar navigation badge
    document.getElementById("badge-selected-count").textContent = count;
    // Choix des sujets total
    const totalCountEl = document.getElementById("selected-total-count");
    if (totalCountEl) totalCountEl.textContent = count;
    // Dashboard page Timeline message
    const msgEl = document.getElementById("selected-topics-msg");
    if (msgEl) msgEl.textContent = `${count} sujet${count > 1 ? 's' : ''}`;
    // Dashboard Page stats card
    const statTopicsCountEl = document.getElementById("stat-topics-count");
    const statTopicsDeltaEl = document.getElementById("stat-topics-delta");
    if (statTopicsCountEl) statTopicsCountEl.textContent = count;
    const totalTopics = TOPICS_LIST.length;
    if (statTopicsDeltaEl) statTopicsDeltaEl.textContent = count === totalTopics ? "Tous suivis" : `${count} / ${totalTopics} actifs`;

    // Signaux cette semaine : nombre réel d'articles dont la date tombe dans les 7 derniers jours
    const weeklySignals = NEWSByLevel.filter(n => getArticlePeriod(n.date) === "Cette semaine");
    const statSignalsCountEl = document.getElementById("stat-signals-count");
    const statSignalsDeltaEl = document.getElementById("stat-signals-delta");
    if (statSignalsCountEl) statSignalsCountEl.textContent = weeklySignals.length || NEWSByLevel.length;
    if (statSignalsDeltaEl) {
        const reportsCount = weeklySignals.filter(n => n.isReport).length;
        statSignalsDeltaEl.textContent = reportsCount > 0 ? `dont ${reportsCount} rapport${reportsCount > 1 ? 's' : ''} agent` : "Toutes thématiques confondues";
    }

    // Sources actives : nombre réel de flux RSS + sites suivis par le scraper
    const statSourcesCountEl = document.getElementById("stat-sources-count");
    const statSourcesDeltaEl = document.getElementById("stat-sources-delta");
    if (statSourcesCountEl) statSourcesCountEl.textContent = SOURCES_LIST.length;
    if (statSourcesDeltaEl) {
        const rssCount = SOURCES_LIST.filter(s => s.type === "rss").length;
        const webCount = SOURCES_LIST.filter(s => s.type === "web").length;
        statSourcesDeltaEl.textContent = `${rssCount} flux RSS · ${webCount} sites`;
    }

    // Dernière collecte : timestamp réel le plus récent parmi les articles ingérés (ingestedAt),
    // avec repli sur la date de l'article si l'ingestedAt n'est pas disponible (ex: jeux de test locaux)
    const statLastCollectionEl = document.getElementById("stat-last-collection");
    const statLastCollectionDeltaEl = document.getElementById("stat-last-collection-delta");
    if (statLastCollectionEl) {
        const timestamps = NEWSByLevel
            .map(n => new Date(n.ingestedAt || n.date))
            .filter(d => !isNaN(d));

        if (timestamps.length > 0) {
            const lastCollection = new Date(Math.max(...timestamps.map(d => d.getTime())));
            statLastCollectionEl.textContent = lastCollection.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
            if (statLastCollectionDeltaEl) {
                statLastCollectionDeltaEl.textContent = `${lastCollection.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} · Ingestion auto`;
            }
        } else {
            statLastCollectionEl.textContent = "--";
            if (statLastCollectionDeltaEl) statLastCollectionDeltaEl.textContent = "Aucune collecte enregistrée";
        }
    }
}

// Switch styles of Sidebar Reading Level buttons
function switchReadingLevelElementStyles() {
    const highBtn = document.getElementById("btn-level-high");
    const lowBtn = document.getElementById("btn-level-low");
    if (!highBtn || !lowBtn) return;

    if (state.readingLevel === "high") {
        highBtn.className = "text-[10px] font-bold py-1.5 text-center rounded-lg transition-all bg-brand-violet text-white shadow-sm";
        lowBtn.className = "text-[10px] font-bold py-1.5 text-center rounded-lg transition-all text-[#a9a0dc] hover:text-white";
    } else {
        lowBtn.className = "text-[10px] font-bold py-1.5 text-center rounded-lg transition-all bg-brand-violet text-white shadow-sm";
        highBtn.className = "text-[10px] font-bold py-1.5 text-center rounded-lg transition-all text-[#a9a0dc] hover:text-white";
    }

    // Refresh the reading level label on Actualités if it exists
    const badgeNews = document.getElementById("news-level-badge");
    if (badgeNews) {
        badgeNews.textContent = state.readingLevel === "high" ? "High Level (Macro)" : "Low Level (Technique)";
    }
}

// 5. Render list of 14 topics (Topics selection list on Choosing Subjects)
function initTopics() {
    const gridContainer = document.getElementById("topics-selection-grid");
    if (!gridContainer) return;

    const countLabelEl = document.getElementById("topics-count-label");
    if (countLabelEl) countLabelEl.textContent = `${TOPICS_LIST.length} thématiques d'innovation`;

    gridContainer.innerHTML = ""; // Clear
    
    TOPICS_LIST.forEach(topic => {
        const isChecked = state.selectedTopics.includes(topic.id);
        const div = document.createElement("div");
        div.className = `topic-box-card p-4 border border-slate-100 rounded-xl flex items-start gap-3 hover:bg-slate-50/50 cursor-pointer ${isChecked ? 'active' : ''}`;
        div.setAttribute("data-topic-id", topic.id);
        
        div.innerHTML = `
            <input type="checkbox" class="styled-checkbox mt-0.5" id="topic-cb-${topic.id}" ${isChecked ? 'checked' : ''}>
            <div class="flex-1">
                <label for="topic-cb-${topic.id}" class="block text-xs font-bold text-brand-ink cursor-pointer">${topic.label}</label>
                <p class="text-[11px] text-brand-muted leading-relaxed mt-0.5">${topic.desc}</p>
            </div>
        `;
        
        gridContainer.appendChild(div);
    });

    renderPreferencesList();
}

// 6. Preferences Priorities Ranking list renderer with Up/Down buttons + Dynamic Quota selector + Visual Crawler Badges
function renderPreferencesList() {
    const container = document.getElementById("preferences-ranking-list");
    if (!container) return;
    
    if (state.selectedTopics.length === 0) {
        container.innerHTML = `
            <div class="py-10 text-center text-xs text-brand-muted flex flex-col items-center justify-center gap-2">
                <i data-lucide="info" class="w-8 h-8 text-slate-300"></i>
                <p class="font-semibold text-slate-600">Aucune thématique active</p>
                <p class="max-w-xs mt-0.5">Activez des thématiques dans la liste de gauche pour configurer votre ordre de préférence.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = "";
    
    state.selectedTopics.forEach((topicId, index) => {
        const topic = TOPICS_LIST.find(t => t.id === topicId);
        if (!topic) return;

        // Custom weight limits preference is now adjustable by the user via interactive selection
        const topicQuota = state.topicQuotas[topicId] || "high";

        // Dynamic visual quota badge rendering matching customizable choice
        let visualPriorityHtml = "";
        if (topicQuota === "high") {
            visualPriorityHtml = `
                <div class="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full select-none">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Quota Max (3-5 Art.)</span>
                </div>
            `;
        } else if (topicQuota === "medium") {
            visualPriorityHtml = `
                <div class="flex items-center gap-1 text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full select-none">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>Quota Modéré (2 Art.)</span>
                </div>
            `;
        } else {
            visualPriorityHtml = `
                <div class="flex items-center gap-1 text-[10px] text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded-full select-none">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span>Quota Restreint (1 Art.)</span>
                </div>
            `;
        }

        const topicLevel = state.topicLevels[topicId] || "high";
        
        // High vs Low inline toggle buttons
        const levelSelectorHtml = `
            <div class="flex items-center bg-white border border-slate-200 rounded-md p-0.5 shadow-sm divide-x divide-slate-100 text-[10px] font-bold">
                <button class="px-2 py-0.5 rounded transition-all ${topicLevel === 'high' ? 'bg-brand-violet text-white font-extrabold shadow-sm' : 'text-slate-500 hover:text-brand-ink'}" onclick="setTopicLevel('${topicId}', 'high')">
                    HIGH
                </button>
                <button class="px-2 py-0.5 rounded transition-all ${topicLevel === 'low' ? 'bg-brand-violet text-white font-extrabold shadow-sm' : 'text-slate-500 hover:text-brand-ink'}" onclick="setTopicLevel('${topicId}', 'low')">
                    LOW
                </button>
            </div>
        `;

        // Interactive customizable Quota level select dropdown
        const quotaSelectorHtml = `
            <select class="bg-white border border-slate-200 hover:border-brand-line rounded px-1.5 py-0.5 text-[9px] font-bold focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all text-slate-700" onchange="setTopicQuota('${topicId}', this.value)">
                <option value="high" ${topicQuota === 'high' ? 'selected' : ''}>MAX (3-5 Art.)</option>
                <option value="medium" ${topicQuota === 'medium' ? 'selected' : ''}>MODÉRÉ (2 Art.)</option>
                <option value="low" ${topicQuota === 'low' ? 'selected' : ''}>RESTREINT (1 Art.)</option>
            </select>
        `;

        const div = document.createElement("div");
        div.className = "flex flex-col gap-2 p-3.5 bg-slate-50 border border-slate-100 rounded-xl transition-all hover:border-slate-200 shadow-xs";
        div.innerHTML = `
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                    <span class="text-xs font-display font-bold text-brand-violet select-none">#${index + 1}</span>
                    <div>
                        <h4 class="text-xs font-bold text-brand-ink select-none">${topic.label}</h4>
                    </div>
                </div>
                <!-- Reordering arrows with active indicators -->
                <div class="flex items-center bg-white border border-slate-200 rounded-md shadow-sm divide-x divide-slate-100 select-none">
                    <button class="px-2 py-0.5 text-slate-400 hover:text-brand-violet transition-colors text-xs font-bold" onclick="movePriority('${topicId}', -1)" ${index === 0 ? 'disabled style="opacity:0.3"' : ''}>▲</button>
                    <button class="px-2 py-0.5 text-slate-400 hover:text-brand-violet transition-colors text-xs font-bold" onclick="movePriority('${topicId}', 1)" ${index === state.selectedTopics.length - 1 ? 'disabled style="opacity:0.3"' : ''}>▼</button>
                </div>
            </div>
            
            <p class="text-[10px] text-slate-400 select-none leading-relaxed">${topic.desc}</p>
            
            <!-- Second row: Quota Indicator AND Reading Level Selector (Surface/Profondeur) -->
            <div class="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-2 border-t border-slate-200/50 mt-1 select-none">
                <div class="flex items-center gap-1.5">
                    ${quotaSelectorHtml}
                    ${visualPriorityHtml}
                </div>
                
                <div class="flex items-center gap-1.5">
                    <span class="text-[9px] font-bold text-slate-400 uppercase">Profondeur :</span>
                    ${levelSelectorHtml}
                </div>
            </div>
        `;
        
        container.appendChild(div);
    });

    lucide.createIcons();
}

// Set individual level callback
window.setTopicLevel = function(topicId, level) {
    state.topicLevels[topicId] = level;
    saveState();
    renderPreferencesList();
    renderPage();
    
    const txt = level === "high" ? "HIGH level (De surface)" : "LOW level (En profondeur)";
    showToast(`Niveau ${txt} configuré pour ${TOPICS_LIST.find(t => t.id === topicId).label} !`, "settings", "emerald");
};

// Set individual quota callback
window.setTopicQuota = function(topicId, quota) {
    state.topicQuotas[topicId] = quota;
    saveState();
    renderPreferencesList();
    renderPage();
    
    let quotaText = "Maximisé";
    if (quota === "medium") quotaText = "Modéré";
    if (quota === "low") quotaText = "Restreint";
    
    showToast(`Quota configuré sur "${quotaText}" pour ${TOPICS_LIST.find(t => t.id === topicId).label} !`, "sliders", "emerald");
};

// Priorities array shifter triggered by arrow clicks
window.movePriority = function(topicId, direction) {
    const idx = state.selectedTopics.indexOf(topicId);
    if (idx === -1) return;

    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= state.selectedTopics.length) return;

    // Swap items inside state
    const temp = state.selectedTopics[idx];
    state.selectedTopics[idx] = state.selectedTopics[newIdx];
    state.selectedTopics[newIdx] = temp;

    saveState();
    updateBadgeCounts();
    renderPreferencesList();
    populateCompactReports();
    
    // Alert nicely
    showToast(`Priorité ajustée pour ${TOPICS_LIST.find(t => t.id === topicId).label} !`, "arrow-down-up", "indigo");
};

// 5. Setup Action Listner binds
function setupEventListeners() {
    // Menu navigation click
    document.querySelectorAll(".nav-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const targetPage = e.currentTarget.getAttribute("data-target");
            switchPage(targetPage);
            
            // Close mobile menu if open
            const sidebar = document.getElementById("sidebar");
            const overlay = document.getElementById("sidebar-overlay");
            sidebar.classList.add("-translate-x-full");
            overlay.classList.add("hidden");
        });
    });

    // Mobile Hamburger
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (mobileBtn && sidebar && overlay) {
        mobileBtn.addEventListener("click", () => {
            sidebar.classList.remove("-translate-x-full");
            overlay.classList.remove("hidden");
        });
        overlay.addEventListener("click", () => {
            sidebar.classList.add("-translate-x-full");
            overlay.classList.add("hidden");
        });
    }

    // High Level / Low Level buttons listeners
    const highBtn = document.getElementById("btn-level-high");
    const lowBtn = document.getElementById("btn-level-low");
    if (highBtn && lowBtn) {
        highBtn.addEventListener("click", () => {
            changeReadingLevel("high");
        });
        lowBtn.addEventListener("click", () => {
            changeReadingLevel("low");
        });
    }

    // Toggle subjects checkboxes via Event Delegation
    const gridContainer = document.getElementById("topics-selection-grid");
    if (gridContainer) {
        gridContainer.addEventListener("click", (e) => {
            const card = e.target.closest(".topic-box-card");
            if (!card) return;
            
            const topicId = card.getAttribute("data-topic-id");
            const checkbox = card.querySelector(".styled-checkbox");
            
            if (e.target !== checkbox && !e.target.closest("label")) {
                checkbox.checked = !checkbox.checked;
            }
            
            if (checkbox.checked) {
                if (!state.selectedTopics.includes(topicId)) {
                    state.selectedTopics.push(topicId); // Apppend at end
                }
                card.classList.add("active");
            } else {
                state.selectedTopics = state.selectedTopics.filter(id => id !== topicId);
                card.classList.remove("active");
            }
            
            saveState();
            updateBadgeCounts();
            renderPreferencesList();
            renderPage();
        });
    }

    // Filter changes inside News Feed Page
    const filterTopic = document.getElementById("filter-topic");
    const filterPeriod = document.getElementById("filter-period");
    if (filterTopic) filterTopic.addEventListener("change", populateNewsFeed);
    if (filterPeriod) filterPeriod.addEventListener("change", populateNewsFeed);

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("keyup", populateNewsFeed);
    }

    // Publishing panel draft trigger
    const btnGenDraft = document.getElementById("btn-generate-draft");
    if (btnGenDraft) {
        btnGenDraft.addEventListener("click", () => {
            generateDraftText();
        });
    }

    // Copy to clipboard actions
    const btnCopyDraft = document.getElementById("btn-copy-draft");
    if (btnCopyDraft) {
        btnCopyDraft.addEventListener("click", () => {
            const bodyText = document.getElementById("draft-prev-body").textContent.trim();
            navigator.clipboard.writeText(bodyText).then(() => {
                showToast("Brouillon copié de manière sécurisée !", "check-circle", "emerald");
            }).catch(err => {
                showToast("Erreur d'accès presse-papier.", "alert-circle", "red");
            });
        });
    }
}

// Global router switcher
function switchPage(pageName) {
    state.activePage = pageName;
    saveState();
    
    document.querySelectorAll(".nav-item").forEach(item => {
        if (item.getAttribute("data-target") === pageName) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    document.querySelectorAll(".page-section").forEach(pSection => {
        if (pSection.id === `page-${pageName}`) {
            pSection.classList.remove("hidden");
            pSection.classList.add("active");
        } else {
            pSection.classList.add("hidden");
            pSection.classList.remove("active");
        }
    });

    renderPage();
}

// Global reading level changer
function changeReadingLevel(level) {
    state.readingLevel = level;
    
    // Set all topics to this level as a bulk sync action
    TOPICS_LIST.forEach(topic => {
        state.topicLevels[topic.id] = level;
    });
    
    saveState();
    switchReadingLevelElementStyles();
    renderPage();
    
    // Elegant system-wide alert
    const txt = level === "high" ? "Globale : HIGH level (Surface)" : "Globale : LOW level (Profondeur)";
    showToast(`Niveaux synchronisés : ${txt}`, "eye", "emerald");
}

// Synchronize all dynamic sections depending on state updates
function renderPage() {
    updateBadgeCounts();
    
    if (state.activePage === "dashboard") {
        populateDashboardSignals();
    } else if (state.activePage === "topics") {
        // Redraw check states matching localstorage if opened
        const gridContainer = document.getElementById("topics-selection-grid");
        if (gridContainer) {
            gridContainer.querySelectorAll(".topic-box-card").forEach(card => {
                const id = card.getAttribute("data-topic-id");
                const checkbox = card.querySelector(".styled-checkbox");
                const isSelected = state.selectedTopics.includes(id);
                
                checkbox.checked = isSelected;
                if (isSelected) {
                    card.classList.add("active");
                } else {
                    card.classList.remove("active");
                }
            });
        }
        renderPreferencesList();
    } else if (state.activePage === "news") {
        populateFilterTopics();
        populateNewsFeed();
    } else if (state.activePage === "publish") {
        populatePublishSignalsPicker();
        generateDraftText(true);
    } else if (state.activePage === "reports") {
        populateReportFilters();
        populateReports();
        populateCompactReports();
        renderPreferencesList();
        switchReportsTab(reportsActiveTab);
    }
}

// --- NEW FEATURE: REPORTS VIEW ---

// Onglet actif de la page Rapports d'Agents IA ("compact" par défaut, ou "grouped")
let reportsActiveTab = "compact";

// Bascule entre la Vue Compacte (onglet 1, par défaut) et la Vue par Sujet (onglet 2)
window.switchReportsTab = function(tab) {
    reportsActiveTab = tab;

    const activeCls = "px-4 py-2.5 text-sm font-bold border-b-2 border-brand-violet text-brand-violet flex items-center gap-1.5 transition-all";
    const inactiveCls = "px-4 py-2.5 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-brand-ink flex items-center gap-1.5 transition-all";

    const compactBtn = document.getElementById("reports-tab-btn-compact");
    const groupedBtn = document.getElementById("reports-tab-btn-grouped");
    const compactPanel = document.getElementById("reports-tab-compact");
    const groupedPanel = document.getElementById("reports-tab-grouped");

    if (compactBtn) compactBtn.className = tab === "compact" ? activeCls : inactiveCls;
    if (groupedBtn) groupedBtn.className = tab === "grouped" ? activeCls : inactiveCls;
    if (compactPanel) compactPanel.classList.toggle("hidden", tab !== "compact");
    if (groupedPanel) groupedPanel.classList.toggle("hidden", tab !== "grouped");

    lucide.createIcons();
};

function populateReportFilters() {
    const filterSelect = document.getElementById("report-topic-filter");
    if (!filterSelect) return;

    const currentVal = filterSelect.value || "all";
    filterSelect.innerHTML = `<option value="all">Tous les sujets</option>`;

    // Synchronisé avec la sélection faite dans "Choix des sujets" (même liste, même ordre)
    TOPICS_LIST.forEach(topic => {
        if (!state.selectedTopics.includes(topic.id)) return;
        filterSelect.innerHTML += `<option value="${topic.id}">${topic.label}</option>`;
    });

    filterSelect.value = [...filterSelect.options].some(o => o.value === currentVal) ? currentVal : "all";
}

// Résume un rapport en une phrase courte pour l'aperçu du toggle de sujet
function getOneLineSummary(report) {
    const raw = (report.reportContent || report.title || "")
        .replace(/[#*_`>]/g, "")
        .replace(/\n+/g, " ")
        .trim();

    if (!raw) return report.title || "Résumé indisponible.";

    const sentences = raw.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 20);
    let sentence = (sentences[0] || raw).trim();

    if (sentence.length > 150) {
        sentence = sentence.slice(0, 147).trim() + "…";
    }
    return sentence;
}

// Nombre maximal d'articles affichés au total dans la Vue Compacte (1-2 pages)
const COMPACT_REPORTS_MAX = 15;

// Convertit le quota qualitatif choisi dans "Ordre de préférence" en plafond numérique d'articles.
// Le quota est un plafond strict : s'il y a moins d'articles disponibles que le quota, on affiche
// uniquement les articles disponibles (jamais de remplissage/duplication artificiel).
function getTopicQuotaLimit(topicId) {
    const quota = state.topicQuotas[topicId] || "high";
    if (quota === "high") return 5;
    if (quota === "medium") return 2;
    return 1; // low
}

// Résumé très concis (3 lignes maximum à l'affichage) pour la Vue Compacte
function getCompactSummary(report) {
    const raw = (report.reportContent || report.title || "")
        .replace(/[#*_`>]/g, "")
        .replace(/\n+/g, " ")
        .trim();

    if (!raw) return "Résumé indisponible.";
    return raw.length > 280 ? raw.slice(0, 277).trim() + "…" : raw;
}

// Onglet 1 "Vue Compacte" : max 15 articles au total, plafonnés par sujet selon le quota choisi
// dans "Ordre de préférence", et respectant l'ordre de priorité des sujets suivis.
function populateCompactReports() {
    const container = document.getElementById("reports-compact-container");
    const counterEl = document.getElementById("compact-reports-count");
    if (!container) return;

    const allReports = NEWSByLevel.filter(news => news.isReport);
    const picked = [];

    for (const topicId of state.selectedTopics) {
        if (picked.length >= COMPACT_REPORTS_MAX) break;

        const quotaLimit = getTopicQuotaLimit(topicId);
        const topicReports = allReports
            .filter(r => getNewsTopics(r).includes(topicId))
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        // Le quota est un plafond : on ne prend jamais plus que ce qui est réellement disponible
        const remainingSlots = COMPACT_REPORTS_MAX - picked.length;
        const take = Math.min(quotaLimit, topicReports.length, remainingSlots);

        for (let i = 0; i < take; i++) {
            picked.push(topicReports[i]);
        }
    }

    if (counterEl) counterEl.textContent = `${picked.length} / ${COMPACT_REPORTS_MAX} articles`;

    if (picked.length === 0) {
        container.innerHTML = `
            <div class="py-12 text-center text-xs text-brand-muted flex flex-col items-center justify-center gap-2">
                <i data-lucide="ghost" class="w-10 h-10 text-slate-200"></i>
                <p class="font-bold text-slate-700 text-sm">Aucun rapport texte disponible</p>
                <p class="max-w-md mt-0.5">Aucun sujet suivi n'a encore généré de rapport cette semaine. Activez d'autres thématiques ou déclenchez l'ingestion.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = picked.map(report => {
        const dateObj = new Date(report.date);
        const dateStr = isNaN(dateObj)
            ? report.date
            : dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

        return `
            <div class="py-4 first:pt-0 last:pb-0">
                <div class="flex items-center gap-2 mb-1">
                    <span class="inline-block px-2 py-0.5 bg-brand-violetSoft text-brand-violetDark text-[9px] font-extrabold rounded uppercase tracking-wider">${report.tag}</span>
                    <span class="text-[10px] text-slate-400 font-medium">${dateStr}</span>
                </div>
                <h3 class="font-display font-bold text-sm text-slate-900">${report.title}</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-3">${getCompactSummary(report)}</p>
            </div>
        `;
    }).join("");

    lucide.createIcons();
}

// Génère le HTML d'une carte de rapport individuelle (avec Deep-dive dépliable)
function renderReportCard(report) {
    let dateObj = new Date(report.date);
    let dateStr = isNaN(dateObj)
        ? report.date // Use raw string like "Aujourd'hui"
        : dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    // Basic Markdown-to-HTML parser for the report text
    let htmlContent = report.reportContent
        .replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/^#+ (.*$)/gim, '<h3 class="font-display font-bold text-lg text-brand-ink mt-4 mb-2">$1</h3>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-slate-800">$1</strong>')
        .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc list-outside">$1</li>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');

    const contentId = `report-content-${report.id.replace(/[^a-zA-Z0-9]/g, '')}`;

    return `
        <div class="p-6 bg-white hover:bg-slate-50/50 transition-colors group">
            <div class="flex items-start justify-between cursor-pointer select-none" onclick="toggleDeepDive('${contentId}')">
                <div class="flex-1 pr-6">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="inline-block px-2 py-0.5 bg-brand-violetSoft text-brand-violetDark text-[9px] font-extrabold rounded uppercase tracking-wider">${report.tag}</span>
                        <span class="text-[10px] text-slate-400 font-medium">${dateStr}</span>
                    </div>
                    <h3 class="font-display font-bold text-[17px] text-slate-900 group-hover:text-brand-violet transition-colors">${report.title}</h3>
                    <p class="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed whitespace-pre-line">${report.reportContent.substring(0, 200).replace(/#/g, "").replace(/\*/g, "").trim()}...</p>
                </div>
                <div class="flex-shrink-0 mt-2 flex flex-col gap-2">
                    <button class="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-all" onclick="event.stopPropagation(); window.open('${report.url || '#'}', '_blank')">
                        <i data-lucide="globe" class="w-3.5 h-3.5"></i> Site officiel
                    </button>
                    <button class="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-brand-violet hover:bg-brand-violet hover:text-white transition-all">
                        <i data-lucide="search" class="w-3.5 h-3.5"></i> Deep-dive
                    </button>
                </div>
            </div>
            <div id="${contentId}" class="hidden mt-4 pt-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed font-sans overflow-hidden">
                ${htmlContent}
            </div>
        </div>
    `;
}

function populateReports() {
    const container = document.getElementById("reports-container");
    const filterSelect = document.getElementById("report-topic-filter");
    if (!container) return;

    const selectedTopic = filterSelect ? filterSelect.value : "all";
    const allReports = NEWSByLevel.filter(news => news.isReport);

    // Liste des sujets à afficher : synchronisée avec "Choix des sujets" (ordre de préférence)
    const topicsToDisplay = TOPICS_LIST.filter(topic =>
        state.selectedTopics.includes(topic.id) &&
        (selectedTopic === "all" || selectedTopic === topic.id)
    );

    // Regroupe les rapports par sujet
    const groups = topicsToDisplay.map(topic => {
        const reports = allReports
            .filter(r => getNewsTopics(r).includes(topic.id))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        return { topic, reports };
    }).filter(g => g.reports.length > 0);

    if (groups.length === 0) {
        container.innerHTML = `
            <div class="py-12 text-center text-xs text-brand-muted flex flex-col items-center justify-center gap-2">
                <i data-lucide="ghost" class="w-10 h-10 text-slate-200"></i>
                <p class="font-bold text-slate-700 text-sm">Aucun rapport texte disponible</p>
                <p class="max-w-md mt-0.5">Aucun sujet suivi n'a encore généré de rapport cette semaine. Activez d'autres thématiques dans "Choix des sujets" ou déclenchez l'ingestion.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // Un seul sujet filtré : on déplie directement le groupe
    const autoExpand = groups.length === 1;

    container.innerHTML = groups.map(({ topic, reports }) => {
        const groupId = `report-group-${topic.id}`;
        const bulletsHtml = reports.map(r =>
            `<li class="leading-relaxed">${getOneLineSummary(r)}</li>`
        ).join("");

        return `
            <div class="rounded-2xl border border-slate-200 overflow-hidden">
                <button type="button" class="w-full flex items-start gap-3 p-5 bg-slate-50/60 hover:bg-slate-100 transition-colors text-left" onclick="toggleReportGroup('${groupId}')">
                    <i data-lucide="chevron-right" class="w-4 h-4 text-brand-violet mt-1 flex-shrink-0 transition-transform ${autoExpand ? 'rotate-90' : ''}" id="chevron-${topic.id}"></i>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <h3 class="font-display font-bold text-base text-brand-ink">${topic.label}</h3>
                            <span class="text-[10px] font-bold text-brand-violetDark bg-brand-violetSoft rounded-full px-2 py-0.5">${reports.length} article${reports.length > 1 ? 's' : ''}</span>
                        </div>
                        <ul class="mt-2 space-y-1 pl-4 list-disc list-outside text-xs text-slate-600">
                            ${bulletsHtml}
                        </ul>
                    </div>
                </button>
                <div id="${groupId}" class="${autoExpand ? '' : 'hidden'} border-t border-slate-100 divide-y divide-slate-100">
                    ${reports.map(r => renderReportCard(r)).join("")}
                </div>
            </div>
        `;
    }).join("");

    lucide.createIcons();
}

// Fonction utilitaire pour le toggle du Deep-dive d'un rapport
window.toggleDeepDive = function(contentId) {
    const el = document.getElementById(contentId);
    if (!el) return;
    el.classList.toggle("hidden");
};

// Fonction utilitaire pour le toggle d'un groupe de sujet (accordéon)
window.toggleReportGroup = function(groupId) {
    const el = document.getElementById(groupId);
    if (!el) return;
    el.classList.toggle("hidden");

    const topicId = groupId.replace("report-group-", "");
    const chevron = document.getElementById(`chevron-${topicId}`);
    if (chevron) chevron.classList.toggle("rotate-90");
};

// Helper function to handle both string and array for topicId, normalized against the canonical 14 topics
function getNewsTopics(news) {
    if (!news.topicId) return [];
    const raw = Array.isArray(news.topicId) ? news.topicId : [news.topicId];
    return raw.map(id => LEGACY_TOPIC_ALIASES[id] || id);
}

// Dérive le vrai statut temporel ("Cette semaine" / "Ce mois-ci" / "Plus ancien") depuis la date réelle
// de l'article plutôt que de se fier au champ "period" figé une fois pour toutes à l'ingestion.
function getArticlePeriod(dateStr) {
    if (!dateStr || dateStr === "Aujourd'hui") return "Cette semaine";

    const parsed = new Date(dateStr);
    if (isNaN(parsed)) return "Cette semaine"; // Format de date inconnu : on suppose un ajout récent

    const diffDays = (Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays < 0) return "Cette semaine"; // Date future (fuseau horaire) : on la traite comme récente
    if (diffDays <= 7) return "Cette semaine";
    if (diffDays <= 30) return "Ce mois-ci";
    return "Plus ancien";
}

// Helper to get the best priority index among all topics of an article
function getBestPriorityRank(news) {
    const topics = getNewsTopics(news);
    let best = 9999;
    topics.forEach(t => {
        const idx = state.selectedTopics.indexOf(t);
        if (idx !== -1 && idx < best) best = idx;
    });
    return best === 9999 ? -1 : best;
}

// 8. Dynamic populating of active filter selections on the LinkedIn Feed Page
function populateFilterTopics() {
    const filterSelect = document.getElementById("filter-topic");
    if (!filterSelect) return;

    // Cache current value to avoid overwrites
    const currentVal = filterSelect.value || "Tous";
    
    filterSelect.innerHTML = `<option value="Tous">Tous les sujets actifs (${state.selectedTopics.length})</option>`;
    
    state.selectedTopics.forEach((topicId, i) => {
        const topic = TOPICS_LIST.find(t => t.id === topicId);
        if (topic) {
            filterSelect.innerHTML += `<option value="${topicId}">#${i+1} ${topic.label}</option>`;
        }
    });

    filterSelect.value = currentVal;
}

// 9. Dashboard limited recent news list (respects priority, showing highest prioritised topics first)
function populateDashboardSignals() {
    const container = document.getElementById("recent-signals-container");
    if (!container) return;

    // Get current sort mode from UI toggle
    const sortToggle = document.getElementById("dashboard-sort-toggle");
    const sortMode = sortToggle ? sortToggle.value : "priority";
    
    // Track how many articles we've displayed per topic
    const topicCounts = {};
    const finalNews = [];
    
    // Sort all matching articles by algorithm
    // We iterate through them and only keep up to 2 per topicId to ensure variety
    const preferredNews = NEWSByLevel
        .filter(news => getNewsTopics(news).some(t => state.selectedTopics.includes(t)))
        .sort((a, b) => {
            let dA = new Date(a.date).getTime();
            let dB = new Date(b.date).getTime();
            
            // Fallback for invalid dates
            if (isNaN(dA)) dA = 0;
            if (isNaN(dB)) dB = 0;

            if (sortMode === "priority") {
                const indexA = getBestPriorityRank(a);
                const indexB = getBestPriorityRank(b);
                // If same priority, fallback to newest
                if (indexA === indexB) {
                    return dB - dA;
                }
                return indexA - indexB; // First priority wins
            } else {
                // Return newest first
                return dB - dA;
            }
        });
        
    for (const news of preferredNews) {
        // Find the most relevant topic to track the count limits
        let primaryTopic = getNewsTopics(news)[0];
        let bestIdx = 999;
        getNewsTopics(news).forEach(t => {
            let idx = state.selectedTopics.indexOf(t);
            if (idx !== -1 && idx < bestIdx) {
                bestIdx = idx;
                primaryTopic = t;
            }
        });

        if (!topicCounts[primaryTopic]) {
            topicCounts[primaryTopic] = 0;
        }
        
        if (topicCounts[primaryTopic] < 2) {
            finalNews.push({ ...news, displayTopic: primaryTopic, displayRank: bestIdx + 1 });
            topicCounts[primaryTopic]++;
        }
        
        // Stop once we have reached 7 diverse tools
        if (finalNews.length >= 7) {
            break;
        }
    }
    
    const activeNews = finalNews;
    
    if (activeNews.length === 0) {
        container.innerHTML = `
            <div class="py-8 text-center text-xs text-brand-muted flex flex-col items-center justify-center gap-2">
                <i data-lucide="inbox" class="w-8 h-8 text-slate-300"></i>
                <p class="font-bold text-slate-700">Aucun signal à afficher</p>
                <p>Cocher des thématiques d'innovation dans "Choix des sujets" pour alimenter votre veille active.</p>
                <button onclick="switchPage('topics')" class="text-brand-violet hover:underline font-bold mt-1 text-xs">Configurer mes sujets maintenant →</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = "";
    activeNews.forEach((news, idx) => {
        const priorityIndex = news.displayRank || 1;
        const mappedTopic = TOPICS_LIST.find(t => t.id === news.displayTopic);
        const lName = mappedTopic ? mappedTopic.label : "Sujet";
        const lvl = state.readingLevel === "low" ? "lowLevel" : "highLevel";
        
        const itemDiv = document.createElement("div");
        itemDiv.className = `py-4 ${idx === 0 ? 'pt-0' : ''} ${idx === activeNews.length - 1 ? 'pb-0' : ''} group transition-all`;
        itemDiv.innerHTML = `
            <div class="flex items-center justify-between gap-1.5 mb-1.5">
                <span class="pill select-none">${news.tag}</span>
                <div class="flex items-center gap-1">
                    <span class="text-[10px] text-brand-violet font-bold select-none bg-brand-violetSoft px-2 py-0.5 rounded-full">#${priorityIndex} ${lName}</span>
                </div>
            </div>
            <h4 class="font-display font-semibold text-slate-900 group-hover:text-brand-violet transition-colors text-sm leading-snug cursor-pointer" onclick="openArticle('${news.url}')" title="Lire l'article source">${news.title}</h4>
            <p class="text-xs text-brand-muted leading-relaxed mt-1 line-clamp-2">${news[lvl].summary}</p>
            <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-2 select-none">
                <span>${news.source}</span>
                <span>•</span>
                <span>${news.date}</span>
            </div>
        `;
        container.appendChild(itemDiv);
    });
    
    lucide.createIcons();
}

// Redirect router shadow
window.shadowSwitchNews = function() {
    switchPage("news");
};

// 10. Populates the Feed with full "LinkedIn Post Style Scroll experience" (No tabs, continuous text with likes count interactivity)
function populateNewsFeed() {
    const feedContainer = document.getElementById("articles-feed-container");
    if (!feedContainer) return;

    const selTopic = document.getElementById("filter-topic") ? document.getElementById("filter-topic").value : "Tous";
    const selPeriod = document.getElementById("filter-period") ? document.getElementById("filter-period").value : "Tout";
    const query = document.getElementById("search-input").value.toLowerCase().trim();
    const lvl = state.readingLevel === "low" || state.readingLevel === "lowLevel" ? "lowLevel" : "highLevel";

    // Simulation ou filtrage des cards classiques qui ne sont pas des longs rapports textes
    let filtered = NEWSByLevel.filter(news => !news.isReport && getNewsTopics(news).some(t => state.selectedTopics.includes(t)));

    // Sort matching order of topics priority
    filtered.sort((a, b) => {
        const indexA = getBestPriorityRank(a);
        const indexB = getBestPriorityRank(b);
        return indexA - indexB;
    });

    // Simulate different article quantities depending on topic preference rank
    // Filter out articles that have a priority too low to not overflow the feed.
    filtered = filtered.filter(news => {
        const rank = getBestPriorityRank(news) + 1; // 1-based rank
        return rank <= 12; // Adjusted to show top 12 topics
    });

    // Sub-topic mapping filtering
    if (selTopic !== "Tous") {
        filtered = filtered.filter(news => getNewsTopics(news).includes(selTopic));
    }

    // Period mapping filtering (basé sur la date réelle de l'article, pas un champ figé)
    if (selPeriod !== "Tout") {
        filtered = filtered.filter(news => getArticlePeriod(news.date) === selPeriod);
    }

    // Word search filtering
    if (query) {
        filtered = filtered.filter(news => 
            news.title.toLowerCase().includes(query) || 
            news[lvl].summary.toLowerCase().includes(query) || 
            news[lvl].linkedinHook.toLowerCase().includes(query) ||
            news.tag.toLowerCase().includes(query) ||
            (news.keywords || ["CTO", "Tech", "Wavestone"]).some(kw => kw.toLowerCase().includes(query))
        );
    }

    if (filtered.length === 0) {
        feedContainer.innerHTML = `
            <div class="bg-white border border-brand-line rounded-2xl p-10 text-center text-xs text-brand-muted flex flex-col items-center justify-center gap-2">
                <i data-lucide="newspaper" class="w-10 h-10 text-slate-200"></i>
                <p class="font-bold text-slate-700 text-sm">Aucun post de veille à afficher</p>
                <p class="max-w-md mt-0.5">La priorité ou vos filtres ont restreint le flux. Ajustez votre Ordre de Préférence ou activez d'autres sujets pour étoffer votre fil d'actu.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    feedContainer.innerHTML = "";
    filtered.forEach(news => {
        let bestTopic = getNewsTopics(news)[0];
        let bestRank = 999;
        getNewsTopics(news).forEach(t => {
            let idx = state.selectedTopics.indexOf(t);
            if (idx !== -1 && idx < bestRank) {
                bestRank = idx;
                bestTopic = t;
            }
        });

        const topicObj = TOPICS_LIST.find(t => t.id === bestTopic);
        const topicLabel = topicObj ? topicObj.label : "Sujet";
        const priorityRank = bestRank + 1;

        // Visual badges reflecting priorities in backend matching
        let limitCollectMsg = "";
        if (priorityRank <= 3) {
            limitCollectMsg = `<span class="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wide">🔥 Flux Prioritaire</span>`;
        } else if (priorityRank <= 6) {
            limitCollectMsg = `<span class="bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wide">⚡ Flux Modéré</span>`;
        } else {
            limitCollectMsg = `<span class="bg-slate-50 text-slate-500 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wide">📝 Flux Restreint</span>`;
        }

        const isLiked = state.likedSet.includes(news.id);
        const likesCountNum = state.likesCount[news.id] || 0;

        const postCard = document.createElement("article");
        postCard.className = "bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden max-w-full hover:shadow-md transition-all";
        
        let hashDivHtml = "";
        const keywordsList = news.keywords || ["CTO", "TechAdvisory", "Wavestone"];
        keywordsList.forEach(kw => {
            hashDivHtml += `<span class="text-brand-violet hover:underline cursor-pointer font-semibold mr-1">#${kw}</span>`;
        });

        let factsListHtml = "";
        news[lvl].facts.forEach(fact => {
            factsListHtml += `
                <li class="flex items-start gap-2.5">
                    <span class="text-brand-green font-bold select-none text-sm mt-0.5">•</span>
                    <span class="text-[11px] text-slate-600 leading-relaxed">${fact}</span>
                </li>
            `;
        });

        // Exact formatting of actual high quality LinkedIn post
        postCard.innerHTML = `
            <!-- LinkedIn Card Body -->
            <div class="p-4">
                
                <!-- Card Header (Author: Wavestone CTO Advisory) -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-violetDark to-brand-violet text-brand-green flex items-center justify-center font-bold text-xl font-display select-none">
                            W
                        </div>
                        <div>
                            <div class="flex items-center gap-1.5">
                                <span class="font-bold text-brand-ink text-xs hover:text-brand-violet cursor-pointer">Wavestone CTO Advisory</span>
                                <span class="text-[10px] text-brand-violet font-bold text-[#bdb6e3]">• 1er</span>
                            </div>
                            <span class="block text-[10px] text-slate-500 leading-none">Intelligence de Veille automatisée • ${news.date}</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-3 select-none">
                        ${limitCollectMsg}
                        <button class="text-slate-400 hover:text-slate-600"><i data-lucide="more-horizontal" class="w-4 h-4"></i></button>
                    </div>
                </div>

                <!-- Conversational written hook representing LLM style -->
                <div class="text-[11px] text-slate-800 leading-relaxed text-justify break-words whitespace-pre-line mb-4">
                    ${news[lvl].linkedinHook}
                </div>

                <!-- Enclosed Attachment Frame mapping the actual scanned article -->
                <div class="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer" onclick="shareDirectly('${news.id}')">
                    
                    <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-white text-[10px] font-bold tracking-wider uppercase select-none">
                        <div class="flex items-center gap-2">
                            <span class="bg-brand-violet text-white px-2 py-0.5 rounded">${news.tag}</span>
                            <span class="text-brand-muted">#${priorityRank} ${topicLabel}</span>
                        </div>
                    </div>

                    <div class="p-4 space-y-3">
                        <h4 class="font-display font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-violet transition-all" onclick="event.stopPropagation(); openArticle('${news.url}')" title="Lire l'article source">${news.title}</h4>
                        <p class="text-[11px] text-brand-muted leading-relaxed">${news[lvl].summary}</p>
                        
                        <!-- Mini bullet-list for easy reading -->
                        <div class="pt-2 border-t border-slate-100/65">
                            <span class="block text-[9px] uppercase font-bold text-brand-violet tracking-wider mb-2 select-none font-sans">Points clés sous filtre (${lvl === "highLevel" ? "Impacts" : "Mécaniques"})</span>
                            <ul class="space-y-1.5 pl-0.5">
                                ${factsListHtml}
                            </ul>
                        </div>
                    </div>

                    <div class="px-4 py-2 border-t border-slate-100 bg-white flex items-center justify-between text-[10px] text-slate-400 select-none hover:bg-slate-50 transition-colors" onclick="event.stopPropagation(); openArticle('${news.url}')">
                        <span class="flex items-center gap-1"><i data-lucide="globe" class="w-3 h-3"></i> Source: ${news.source}</span>
                        <span class="hover:underline text-brand-violet font-bold flex items-center gap-1">Lire l'article complet <i data-lucide="external-link" class="w-2.5 h-2.5"></i></span>
                    </div>

                </div>

                <!-- Engagement counts footer metrics -->
                <div class="flex items-center justify-between text-[10px] text-slate-400 mt-4.5 pt-2 border-t border-slate-100 select-none">
                    <span class="hover:underline flex items-center gap-1 cursor-pointer">
                        <span>👍</span> <span id="likes-text-${news.id}">${likesCountNum} j'aimes</span>
                    </span>
                    <div class="flex items-center gap-3">
                        <span class="hover:underline cursor-pointer">${news.comments} commentaires</span>
                        <span>•</span>
                        <span class="hover:underline cursor-pointer">${news.shares} partages</span>
                    </div>
                </div>

            </div>

            <!-- Interative Action Buttons bar -->
            <div class="bg-slate-50 border-t border-slate-100 divide-x divide-slate-100 grid grid-cols-3 text-center text-[10px] font-bold select-none text-slate-500">
                <button class="py-3 hover:bg-slate-100 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 ${isLiked ? 'text-brand-violet' : ''}" onclick="toggleLike('${news.id}')">
                    <i data-lucide="thumbs-up" class="w-3.5 h-3.5 ${isLiked ? 'fill-brand-violet stroke-brand-violet text-brand-violet' : ''}"></i>
                    <span>J'aime</span>
                </button>
                <button class="py-3 hover:bg-slate-100 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5" onclick="shareDirectly('${news.id}')">
                    <i data-lucide="repeat" class="w-3.5 h-3.5"></i>
                    <span>Republier</span>
                </button>
                <button class="py-3 hover:bg-slate-100 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 focus:outline-none" onclick="sendMockPost('${news.id}')">
                    <i data-lucide="send" class="w-3.5 h-3.5"></i>
                    <span>Envoyer</span>
                </button>
            </div>
        `;

        feedContainer.appendChild(postCard);
    });

    lucide.createIcons();
}

// Interactive callback for Like animations
window.toggleLike = function(newsId) {
    const idx = state.likedSet.indexOf(newsId);
    if (idx === -1) {
        state.likedSet.push(newsId);
        state.likesCount[newsId] = (state.likesCount[newsId] || 0) + 1;
        showToast("Post rajouté à vos favoris !", "thumbs-up", "green");
    } else {
        state.likedSet = state.likedSet.filter(id => id !== newsId);
        state.likesCount[newsId] = Math.max(0, (state.likesCount[newsId] || 0) - 1);
    }
    saveState();
    
    // Quick update text in DOM to avoid full re-draw flickering
    const textEl = document.getElementById(`likes-text-${newsId}`);
    if (textEl) textEl.textContent = `${state.likesCount[newsId]} j'aimes`;
    
    // Quick redraw element styles to keep it seamless
    populateNewsFeed();
};

window.sendMockPost = function(newsId) {
    showToast("Post partagé par rapport aux e-mails de routine !", "send", "indigo");
};

// 11. Populate source elements inside Publishing generator tab
function populatePublishSignalsPicker() {
    const container = document.getElementById("publish-signals-picker");
    if (!container) return;

    // Load matching monitored ones
    const activeNews = NEWSByLevel.filter(news => getNewsTopics(news).some(t => state.selectedTopics.includes(t)));

    if (activeNews.length === 0) {
        container.innerHTML = `<p class="text-xs text-brand-muted text-center py-4">Aucun signal actif à inclure. Veuillez re-sélectionner des sujets.</p>`;
        return;
    }

    container.innerHTML = "";
    activeNews.forEach((news, idx) => {
        const label = document.createElement("label");
        label.className = "flex items-start gap-2.5 p-2 rounded hover:bg-slate-100/50 cursor-pointer text-xs leading-snug class-picker-lbl";
        const isChecked = idx < 2; // Auto-check first two
        label.innerHTML = `
            <input type="checkbox" class="styled-checkbox mt-0.5 flex-shrink-0" value="${news.id}" ${isChecked ? 'checked' : ''} data-title="${news.title}">
            <span class="text-slate-700 font-medium select-none">${news.title}</span>
        `;
        container.appendChild(label);
    });
}

// 12. Generates draft text respecting Reading Level (Executive vs Technical configuration)
function generateDraftText(isLoadDefault = false) {
    const format = document.getElementById("publish-format").value;
    const angle = document.getElementById("publish-angle").value;
    const promptInput = document.getElementById("publish-prompt").value;
    
    const checkedInputs = document.getElementById("publish-signals-picker") 
        ? document.getElementById("publish-signals-picker").querySelectorAll("input:checked") 
        : [];
    
    const selectedArticles = [];
    checkedInputs.forEach(input => {
        const art = NEWSByLevel.find(n => n.id === input.value);
        if (art) selectedArticles.push(art);
    });

    const titleEl = document.getElementById("draft-prev-title");
    const bodyEl = document.getElementById("draft-prev-body");
    const badgeEl = document.getElementById("draft-prev-badge");
    const charcountEl = document.getElementById("draft-prev-charcount");

    if (selectedArticles.length === 0) {
        bodyEl.innerHTML = `<span class="text-red-500 font-semibold flex items-center gap-1.5 select-none">
            <i data-lucide="alert-circle" class="w-4 h-4"></i> Veuillez cocher au moins un signal d'actualité dans les thématiques de gauche pour servir de source.
        </span>`;
        if (titleEl) titleEl.textContent = "Aucune source selectionnée";
        if (charcountEl) charcountEl.textContent = "0 caractère";
        lucide.createIcons();
        return;
    }

    let titleText = "";
    let draftHtml = "";

    if (format === "linkedin") {
        titleText = selectedArticles[0].title;
        badgeEl.textContent = `Post LinkedIn • Personal Branding (${state.readingLevel === "high" ? "C-Suite" : "Architecte"})`;
        
        if (state.readingLevel === "high") {
            // Strategic executive tone
            if (angle === "trends") {
                draftHtml = `🚀 [Veille CTO] Comment articuler croissance technologique et pragmatisme de coût ?\n\nLe gaspillage d’allocations de mémoire cloud pèse lourdement sur les bilans (jusqu'à 35% de surcoût sur le Serverless). Nos analyses montrent qu'ajuster dynamiquement vos ressources représente un gisement de performance immediat.\n\nLes tendances structurantes relevées par nos consultants :\n`;
                selectedArticles.forEach(art => {
                    draftHtml += `• ${art.title} : ${art.highLevel.summary}\n`;
                });
                draftHtml += `\nUn enjeu majeur de notre accompagnement chez Wavestone. Débattons-en !\n\n#FinOps #CTOStrategy #CloudPlanning #Management`;
            } else if (angle === "cto_view") {
                draftHtml = `💡 [Avis de l'expert IT] - Les agents autonomes s'invitent dans vos chaines opérationnelles.\n\nL'important n'est plus l'originalité de l'IA, mais l'efficacité de sa gouvernance. En réduisant de 6h le fardeau administratif des équipes de support, la productivité repart à la hausse.\n\nPoints clés de notre note stratégique :\n`;
                selectedArticles.forEach(art => {
                    draftHtml += `- ${art.title}\n`;
                });
                draftHtml += `\nQuelles sont vos priorités de transformation d'ici la fin d'année ?\n\n#AIAtScale #PlatformEngineering #ConseilDSI #Innovation`;
            } else {
                draftHtml = `⚠️ [Tendances Macro] Le tournant de la conformité européenne.\n\nLa souveraineté n'est plus une option mais une arme d'aide à la décision. Gagner l'indépendance de ses modèles ouverts en local limite les risques auprès de la CNIL.\n\nAxe d'attention de nos équipes :\n`;
                selectedArticles.forEach(art => {
                    draftHtml += `• ${art.title}\n`;
                });
                draftHtml += `\nNos experts restent à votre disposition pour vos analyses d'urbanisation.\n\n#Souveraineté #RGPD #GovernanceIT #Wavestone`;
            }
        } else {
            // Technical developer / architect tone
            if (angle === "trends") {
                draftHtml = `🛠️ [Deep Dive DevOps] Optimiser AWS Lambda : provisionnement et cold starts.\n\nAjuster le Provisioned Concurrency via des appels EventBridge et des tables DynamoDB streams permet de réduire les latences de démarrage à froid de 98%.\n\nConfiguration des metrics techniques collectées :\n`;
                selectedArticles.forEach(art => {
                    draftHtml += `• ${art.title} : ${art.lowLevel.summary}\n`;
                });
                draftHtml += `\nRetrouvez le code IaC Terraform prêt au deploiement dans notre dépôt de Golden Paths.\n\n#Serverless #IaC #Terraform #AWSLambda #Automation`;
            } else if (angle === "cto_view") {
                draftHtml = `💻 [Pattern d'Architecture] Routage asynchrone multi-agents.\n\nL'interfaçage de l'IA de production reposera en 2026 sur des architectures orientées événements (Event-driven). C'est le seul moyen technique d'ingérer l'état des sessions sans saturation SQL de cache.\n\nArchitecture d'interception à déployer :\n`;
                selectedArticles.forEach(art => {
                    draftHtml += `- ${art.title}\n`;
                });
                draftHtml += `\n#Azure #Python #DevOps #Microservices #SoftwareArchitecture`;
            } else {
                draftHtml = `🐋 [Eco-Conception Technique] Middlewares dynamiques d'intensité carbone.\n\nLe calcul du Software Carbon Intensity (SCI) nécessite d'adapter le dispatching de vos fonctions asynchrones de traitement via l'API d'Electricity Map.\n\nMise en œuvre recommandée d'après notre guide :\n`;
                selectedArticles.forEach(art => {
                    draftHtml += `• ${art.title}\n`;
                });
                draftHtml += `\n#GreenSoftware #APIDev #GitOps #SustainabilityEngineering`;
            }
        }
    } else if (format === "newsletter") {
        titleText = `Lettre Mensuelle CTO Advisory  - ${state.readingLevel === "high" ? "Décideurs" : "Technique"}`;
        badgeEl.textContent = "Newsletter hebdomadaire • Email Client";
        
        draftHtml = `Chers partenaires,\n\nRetrouvez votre capsule de veille technologique active en mode ${state.readingLevel === "high" ? "Macro-Décideur" : "Détails d'Architecture"}.\n\n`;
        selectedArticles.forEach((art, idx) => {
            draftHtml += `### [#${idx+1}] ${art.title}\n`;
            draftHtml += `${state.readingLevel === "high" ? art.highLevel.summary : art.lowLevel.summary}\n`;
            draftHtml += `*Source : ${art.source}*\n\n`;
        });
        draftHtml += `\n© Wavestone CTO Advisory - Rédigé d'après vos consignes (${promptInput}).`;
    } else {
        titleText = `Note Opérationnelle — Cadrage ${state.readingLevel === "high" ? "Stratégique" : "Technique"}`;
        badgeEl.textContent = "Note de Synthèse • Format Livrable";
        
        draftHtml = `NOTE DE SYNTHÈSE CTO ADVISORY\n\nFiltre retenu : ${state.readingLevel === "high" ? "Macro / Impacts Métier" : "Micro / Spécifications d'Ingénierie"}\nConsigne : ${promptInput}\n\n1. Faits critiques identifiés :\n`;
        selectedArticles.forEach(art => {
            const listObj = state.readingLevel === "high" ? art.highLevel.facts : art.lowLevel.facts;
            draftHtml += `- "${art.title}" (Source : ${art.source})\n`;
            listObj.forEach(f => draftHtml += `  • ${f}\n`);
            draftHtml += `\n`;
        });
        draftHtml += `2. Recommandations technologiques préconisées par le cabinet :\n  - Valider l'urbanisation orientée événements.\n  - Déployer l'anonymisation locale.`;
    }

    if (titleEl) titleEl.textContent = titleText;
    bodyEl.textContent = draftHtml;
    if (charcountEl) charcountEl.textContent = `${draftHtml.length} caractères`;

    if (!isLoadDefault) {
        showToast("Brouillon généré par Gemini !", "sparkles", "emerald");
    }
}

// Open article safely
window.openArticle = function(url) {
    if (!url || url === "undefined" || url === "null" || url === "#" || url === "") {
        showToast("L'URL source n'est pas disponible pour cet ancien article.", "link-2", "red");
        return;
    }
    window.open(url, '_blank');
};

// Share helper
window.shareDirectly = function(newsId) {
    const art = NEWSByLevel.find(n => n.id === newsId);
    if (!art) return;
    
    switchPage("publish");
    
    const publishForm = document.getElementById("publish-format");
    if (publishForm) publishForm.value = "linkedin";
    
    const picker = document.getElementById("publish-signals-picker");
    if (picker) {
        picker.querySelectorAll("input").forEach(input => {
            input.checked = (input.value === newsId);
        });
    }

    generateDraftText(true);
    showToast("Signal chargé dans le générateur !", "share-2", "emerald");
};

// 13. System Toasts Utility
function showToast(message, iconName = "info", color = "indigo") {
    const toastWrapper = document.getElementById("toast-wrapper");
    if (!toastWrapper) return;
    
    const toast = document.createElement("div");
    toast.className = `toast-msg flex items-center gap-3 bg-white text-slate-800 font-medium px-4 py-3 rounded-xl border border-[#d9d4ef] shadow-lg pointer-events-auto transition-all select-none text-xs border-l-4 border-l-brand-violet`;
    
    if (color === "emerald" || color === "green") {
        toast.style.borderLeftColor = "#00df80";
    } else if (color === "red") {
        toast.style.borderLeftColor = "#ef4444";
    } else if (color === "amber") {
        toast.style.borderLeftColor = "#f59e0b";
    }

    toast.innerHTML = `
        <div class="text-[#4a20d1] flex-shrink-0"><i data-lucide="${iconName}" class="w-4 h-4"></i></div>
        <p class="flex-1">${message}</p>
        <button class="text-slate-400 hover:text-slate-600 ml-1.5 focus:outline-none" onclick="this.parentElement.remove()">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
    `;

    toastWrapper.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => toast.remove(), 250);
    }, 4500);
}
