/**
 * Wavestone CTO Advisory Signal - Core Web Application (v2.1)
 */

// 1. Flat List of 12 Topics (Sub-sections only - Groups removed of main hierarchy)
const TOPICS_LIST = [
    { id: "ma", label: "M&A", desc: "Suivi des fusions-acquisitions technologiques, consolidations et opportunités de marché." },
    { id: "sourcing", label: "Sourcing", desc: "Stratégies d'achat IT, relations contractuelles avec les éditeurs et gouvernance cloud." },
    { id: "smartflow", label: "SmartFlow", desc: "Optimisation des processus opérationnels par l'automatisation et l'analyse de valeur." },
    { id: "ea", label: "EA (Enterprise Architecture)", desc: "Cartographie du système d'information, urbanisation et alignement applicatif moderne." },
    { id: "workplace", label: "Workplace", desc: "Révolution des environnements de travail, poste client hybride et productivité." },
    { id: "comm_tools", label: "Communication tools", desc: "Flux de collaboration en temps réel : Teams, Slack, Zoom et intégrations tierces." },
    { id: "mod_management", label: "Modern management", desc: "Méthodologies agiles à l'échelle, management visuel et frameworks hybrides." },
    { id: "next_gen_support", label: "Next Gen Support", desc: "Modèles de support utilisateur disruptés par l'IA de niveau N1 / N2." },
    { id: "quantum", label: "Quantum computing", desc: "R&D quantique assistée, algorithmes novateurs et cas d'usage business émergents." },
    { id: "automation", label: "Automation", desc: "Kubernetes, orchestration de conteneurs, provisionnement IaC (Terraform) et GitOps." },
    { id: "infra_arch", label: "Infrastructure & Architecture", desc: "Serverless scaling, conception asynchrone, API Management et Edge architectures." },
    { id: "hyperscalers", label: "Hyperscalers", desc: "Suivi technologique des roadmap techniques de cloud public (AWS, Azure, Google Cloud)." }
];

// 2. LinkedIn Feed News Database (Supporting dual-state High & Low reading levels)
const NEWSByLevel = [
    {
        id: "news_1",
        tag: "IA",
        topicId: "next_gen_support",
        title: "Les agents autonomes passent du pilote à la production",
        source: "MIT Technology Review",
        date: "Il y a 2 h",
        score: "94",
        period: "Cette semaine",
        comments: "14",
        shares: "8",
        highLevel: {
            linkedinHook: "🤖 **Les agents autonomes franchissent un cap stratégique historique !** Fini les simples prototypes isolés, la tendance en conseil est à l'intégration d'architectures d'agents multi-rôles pour piloter les fonctions de support en entreprise.\n\nPour les décideurs, la valeur ajoutée se traduit par un gain moyen de **6 heures par semaine** sur les tâches administratives des POs et une réduction majeure du fardeau cognitif global des collaborateurs. Une transition indispensable vers l'entreprise augmentée.\n\nQu'en pensez-vous ? #IAgénérative #Productivité #Wavestone #ConseilIT",
            facts: [
                "Diminution drastique des goulots d'étranglement administratifs sur les plateformes de ticketing.",
                "Orchestration transversale transparente des processus d'équipe sans micro-management.",
                "Réinstallation de l'humain sur la relation d'aide et les décisions complexes."
            ],
            summary: "L'automatisation du support client passe un cap grâce à des agents supervisés capables d'analyser le sentiment et d'agir sur le SI."
        },
        lowLevel: {
            linkedinHook: "⚙️ **[Deep Dive Technique] Comment bâtir une architecture multi-agents résiliente en production en 2026 ?**\n\nLe passage à l'échelle repose sur des routeurs d'invites asynchrones orchestrés via **DynamoDB Streams** et asscociés à des brokers de messages. La réduction des temps de traitement d'API et la maîtrise des metrics de consommation de jetons (Token quotas) s'imposent comme les véritables priorités de l'ingénieur.\n\nUn pattern clé à tester d'urgence : l'intégration via des files EventBridge.\n\n#SoftwareArchitecture #Serverless #Bedrock #DevOps #TechAdvisory",
            facts: [
                "Appels d'API légers via Gemini 3.5 Flash s'insérant dans des cloud-webhooks sans surcharge de ressources.",
                "Utilisation de frameworks d'orchestration autonomes gérant la mémoire de session par clé unique.",
                "Garde-fous d'anonymisation locale gérant les PII avant transmission au LLM d'affaires."
            ],
            summary: "Implémentation d'un pipeline serverless via Amazon EventBridge, orchestrant des fonctions Lambda asynchrones pour le routage de prompts."
        }
    },
    {
        id: "news_2",
        tag: "CLOUD",
        topicId: "hyperscalers",
        title: "AWS dévoile une nouvelle couche d'orchestration pour Bedrock",
        source: "AWS News",
        date: "Hier",
        score: "89",
        period: "Cette semaine",
        comments: "9",
        shares: "4",
        highLevel: {
            linkedinHook: "☁️ **AWS structure l'ère industrielle de l'IA Générative !** En lançant sa nouvelle couche d'orchestration pour Amazon Bedrock, le géant du Cloud résout le défi numéro un des DSI : la **gouvernance**. \n\nLes entreprises peuvent enfin faire passer leurs démonstrateurs (PoC) en production avec un cadre de supervision et de souveraineté optimal. C'est l'assurance d'une conformité totale sans couper l'élan d'innovation commerciale.\n\nUn must-know pour nos directions générales IT et nos comités d'architecture.\n\n#CloudSouverain #AWSBedrock #Gouvernance #AIAtScale #Wavestone",
            facts: [
                "Amélioration des indicateurs de conformité réglementaire (RGPD/Act) par limitation des risques de fuite.",
                "Rapports d'audits analytiques centralisés du coût consolidé de l'IA en temps réel.",
                "Barrières et politiques de sécurité modulaires (Guardrails) configurables en quelques clics."
            ],
            summary: "Sécurisation et scalabilité des modèles LLM commerciaux grâce à un contrôle centralisé du transit d'informations sensibles."
        },
        lowLevel: {
            linkedinHook: "🛠️ **[Architecture Cloud] Bedrock Orchestration : gestion de l'état applicatif et des Guardrails en temps réel.**\n\nL'implémentation de la nouvelle couche d'AWS résout la complexité de l'état asynchrone des appels. Grâce à un couplage fin avec **DynamoDB**, les architectures gèrent les workflows complexes en moins de 100ms de latence de transit tout en appliquant les expressions de filtrage PII localement.\n\nConsultez les schémas d'urbanisation correspondants. \n\n#AWSArchitecture #Microservices #DynamoDB #SecurityEngineering",
            facts: [
                "Intégration d'un middleware asynchrone de sécurité qui filtre les PII sans re-dimensionnement de VM.",
                "Optimisation du cycle de vie des sessions utilisateurs via cache Redis et réduction de 30% des instances SQL.",
                "Utilisation des files EventBridge SQS pour garantir l'ingestion d'événements sans perte en pic de charge."
            ],
            summary: "Intégration technique d'AWS Bedrock Guardrails couplée aux tables DynamoDB streamées pour le contrôle d'anonymisation."
        }
    },
    {
        id: "news_3",
        tag: "SOUVERAINETÉ",
        topicId: "ea",
        title: "Les modèles ouverts gagnent du terrain dans les environnements sensibles",
        source: "Le Monde Informatique",
        date: "Hier",
        score: "86",
        period: "Cette semaine",
        comments: "11",
        shares: "5",
        highLevel: {
            linkedinHook: "🛡️ **Conformité & Maîtrise : L'irrésistible montée des modèles ouverts en environnements sensibles !**\n\nPour 32% des DSI interrogeantes, le risque de fuite de données d'affaires sur des clouds tiers constitue le premier frein à l'adoption de l'IA. La parade ? Déployer des modèles ouverts hautement optimisés au sein même du cloud privé ou souverain de l'entreprise.\n\nY voyez-vous un levier d'accélération durable ou une contrainte opérationnelle ? Discutons-en !\n\n#SouverainetéNumérique #RGPD #StrategicIT #DSIInsights #Wavestone",
            facts: [
                "Contrôle absolu et auditabilité totale du code source et de l'ingestion de données.",
                "Réduction du fardeau d'évaluation d'impact RGPD auprès de la CNIL.",
                "Gain d'indépendance commerciale vis-à-vis des hausses de prix de licences d'acteurs tiers."
            ],
            summary: "Les modèles ouverts hébergés localement permettent d'allier conformité maximale et maîtrise budgétaire pérenne."
        },
        lowLevel: {
            linkedinHook: "🐳 **[DevOps / Infrastructure] Déploiement et auto-hébergement de modèles LLM ouverts.**\n\nL'optimisation des architectures d'inférence en local passe par un dimensionnement optimal des infrastructures matérielles (VRAM). À l'aide de conteneurs standardisés orchestrés sous **Kubernetes**, nous pouvons moduler les requêtes pour maximiser le taux d'utilisation des processeurs graphiques et réduire l'empreinte SCI globale.\n\n#Kubernetes #EcoConception #OpenSourceCode #GPUInfrastructure",
            facts: [
                "Quantification fine des poids de modèles (4-bit/8-bit precision) réduisant l'empreinte mémoire de 60%.",
                "Gestion du scaling dynamique via KEDA basé sur la file d'attente réseau des requêtes d'inférence.",
                "Middleware d'audit et pipeline d'anonymisation branché en local sur l'image Docker applicative."
            ],
            summary: "Urbanisation d'infrastructure conteneurisée gérant le load balancing de requêtes d'inférence sur clusters locaux."
        }
    },
    {
        id: "news_4",
        tag: "FUTURE OF WORK",
        topicId: "workplace",
        title: "Microsoft présente ses nouveaux copilotes métiers",
        source: "Microsoft Blog",
        date: "12 juin",
        score: "81",
        period: "Ce mois-ci",
        comments: "5",
        shares: "1",
        highLevel: {
            linkedinHook: "💼 **Travail Hybride : L'adoption des copilotes métiers s'installe au quotidien !**\n\nL'intégration d'assistants intelligents directement dans les suites bureautiques permet enfin de s'attaquer au fardeau administratif récurrent. En résumant les sprints complexes ou en rédigeant les posts d'aide au personal branding, cette nouvelle routine de veille redonne de la disponibilité aux consultants pour s'investir sur le client.\n\nQuelle est l'adoption de ces routines chez vos équipes ? \n\n#Collaboratif #M365 #CoctoAdvisory #RoutineHebdomadaire #Innovation",
            facts: [
                "Gain de temps substantiel sur la rédaction de synthèses de rapports complexes.",
                "Fluidification de l'onboarding de nouveaux consultants sur des dossiers techniques.",
                "Réduction de 15% des anomalies d'alignement projet via le résumé automatique de réunions."
            ],
            summary: "Les outils collaboratifs intègrent l'IA pour automatiser la synthèse administrative et libérer du potentiel d'analyse."
        },
        lowLevel: {
            linkedinHook: "💻 **[Workplace Integration] Interfaçage d'assistant intelligent via Azure OpenAI et Teams Webhooks.**\n\nIntégrer des services de copilotes requiert un interfaçage optimal pour garantir l'anonymisation des flux. À l'aide d'**Azure API Management** et de configurations asynchrones, nous capturons les métadonnées de discussion de manière standardisée tout en assurant l'audit légal exigé par les DSI.\n\n#Azure #TeamsIntegration #APIManagement #Cybersecurity",
            facts: [
                "Configuration de routeurs de requêtes via API de proxification Azure limitant l'accès direct aux serveurs.",
                "Application de jetons d'authentification temporaires et d'identités gérées pour l'accès aux logs.",
                "Formatage de flux asynchrones via API proxies pour décharger le réseau local."
            ],
            summary: "Développement d'un pipeline d'API sécurisé acheminant l'information des suites collaboratives vers un routeur d'inférence local."
        }
    },
    {
        id: "news_5",
        tag: "FINOPS",
        topicId: "infra_arch",
        title: "Optimisation des coûts AWS Lambda : Stratégies avancées",
        source: "AWS Tech Blog",
        date: "Il y a 3 jours",
        score: "92",
        period: "Cette semaine",
        comments: "19",
        shares: "12",
        highLevel: {
            linkedinHook: "💰 **[FinOps Strategy] Réduire sa facture AWS Lambda de 42% sans dégradation applicative ? C'est possible.**\n\nLa sous-optimisation budgétaire est le principal fléau des initiatives Cloud modernes. Nos dernières études de cadrage révèlent que 35% des investissements Serverless sont gaspillés par une mauvaise configuration des allocations de mémoire.\n\nUn sujet hautement prioritaire pour aligner performance et sobriété économique.\n\n#FinOps #CloudBudget #Serverless #CostOptimization #CTOMindset",
            facts: [
                "Le provisionnement prédictif (Provisioned Concurrency dynamique) supprime les pics de latence des démarrages à froid.",
                "Gain budgétaire immédiat transposable de manière transverse sur l'ensemble de l'urbanisation Cloud.",
                "Utilisation de modèles d'analyse automatiques pour proposer des corrections de ressources."
            ],
            summary: "L'ajustement dynamique de la puissance allouée aux architectures serverless permet de concilier réactivité technique et efficience budgétaire."
        },
        lowLevel: {
            linkedinHook: "📉 **[FinOps Deep Dive] Ajustement prédictif de provisionnement de Concurrence sur AWS Lambda.**\n\nConfigurer le **Provisioned Concurrency** dynamique nécessite de coupler l'analyse des logs CloudWatch avec des algorithmes d'ajustement de charge applicative. Ce pattern d'ingénierie limite les cold starts de 98% en calquant l'activation de mémoire sur la saisonnalité précise des appels d'API.\n\n#AWSLambda #PerformanceEngineering #CloudWatchMetric #ServerlessCompute",
            facts: [
                "Analyse des logs JSON CloudWatch par parsing rapide permettant des alertes automatisées de dépassement de quota.",
                "Configuration de scripts Terraform incluant le scaling asynchrone des fonctions AWS Lambda.",
                "Réduction de 42% de la facture brute serverless en éliminant les instances réservées inactives."
            ],
            summary: "Création d'un pipeline d'Infrastructure-as-Code Terraform configurant l'Auto-scaling dynamique des ressources cloud."
        }
    },
    {
        id: "news_6",
        tag: "ECO-CONCEPTION",
        topicId: "smartflow",
        title: "Eco-conception logicielle : Mesurer le coût carbone de vos APIS en temps réel",
        source: "Tech Eco Journal",
        date: "Il y a 5 jours",
        score: "88",
        period: "Cette semaine",
        comments: "8",
        shares: "3",
        highLevel: {
            linkedinHook: "🌱 **L'éco-conception logicielle passe de la théorie à l'implémentation opérationnelle !** \n\nLes entreprises adoptent désormais des middlewares capables de mesurer en temps réel l'intensité carbone de l'énergie consommée par leurs serveurs informatiques. En décalant intelligemment des tâches asynchrones, nous parvenons à réduire l'empreinte environnementale de **65%**, à budget constant.\n\nUne démarche pragmatique vers un numérique responsable.\n\n#GreenIT #NumériqueResponsable #Sustainability #EcoConception #Wavestone",
            facts: [
                "Généralisation de l'évaluation standardisée 'Software Carbon Intensity' chez les donneurs d'ordre.",
                "Valorisation éco-responsable des architectures s'inscrivant dans la notation RSE globale du cabinet.",
                "Alignement de l'efficacité carbone avec de substantielles économies de coût d'alimentation cloud."
            ],
            summary: "La synchronisation dynamique des traitements informatiques lourds sur les heures d'énergie propre réduit l'impact écologique des SI."
        },
        lowLevel: {
            linkedinHook: "🐍 **[Green Architecture] Implémentation d'un middleware d'interrogation horaire d'intensité carbone.**\n\nL'algorithme de routage interroge l'API asynchrone d'**Electricity Map** au déclenchement d'un job. Si l'intensité carbone de la grille réseau locale dépasse le seuil paramétré (gCO2eq/kWh), la file de message met en attente les processus non critiques pour les exécuter durant la période de plus forte charge verte.\n\n#GreenSoftware #APIsDevelopment #ElectricityMap #SoftwareCarbonIntensity #NoSQL",
            facts: [
                "Création d'un middleware d'interception asynchrone branché sur les requêtes d'ingestion lourdes.",
                "Requêtage asynchrone sans impact sur le temps de réponse utilisateur final par stockage temporaire en cache.",
                "Diminution de 65% de l'empreinte carbone calculée par rapport à une exécution synchrone uniforme."
            ],
            summary: "Développement d'un décorateur d'API régulant le traitement des files d'attente à l'aide de DynamoDB et de clés de statut."
        }
    }
];

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
    initDate();
    initPageState();
    initTopics();
    renderPage();
    setupEventListeners();
    
    // Refresh lucide icons
    lucide.createIcons();
});

// Set current date on French style
function initDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const systemDate = new Date(2026, 6, 24); // July 24, 2026
    document.getElementById("topbar-date").textContent = systemDate.toLocaleDateString('fr-FR', options);
}

// Retrieve or initialize states from localStorage
function initPageState() {
    const savedTopics = localStorage.getItem("signal_selected_topics_v2");
    const savedPage = localStorage.getItem("signal_active_page_v2");
    const savedLevel = localStorage.getItem("signal_reading_level_v2");
    const savedLiked = localStorage.getItem("signal_liked_set_v2");
    const savedTopicLevels = localStorage.getItem("signal_topic_levels_v2");
    const savedTopicQuotas = localStorage.getItem("signal_topic_quotas_v2");
    
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
        state.likesCount[n.id] = parseInt(n.score) - 40; // Simulates some initial likes
    });

    updateBadgeCounts();
    switchReadingLevelElementStyles();
}

function saveState() {
    localStorage.setItem("signal_selected_topics_v2", JSON.stringify(state.selectedTopics));
    localStorage.setItem("signal_active_page_v2", state.activePage);
    localStorage.setItem("signal_reading_level_v2", state.readingLevel);
    localStorage.setItem("signal_liked_set_v2", JSON.stringify(state.likedSet));
    localStorage.setItem("signal_topic_levels_v2", JSON.stringify(state.topicLevels));
    localStorage.setItem("signal_topic_quotas_v2", JSON.stringify(state.topicQuotas));
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
    if (statTopicsDeltaEl) statTopicsDeltaEl.textContent = count === 12 ? "Tous suivis" : `${count} / 12 actifs`;
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

// 5. Render list of 12 topics (Topics selection list on Choosing Subjects)
function initTopics() {
    const gridContainer = document.getElementById("topics-selection-grid");
    if (!gridContainer) return;
    
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
    }
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
    
    // Sort feed articles based on exact order of state.selectedTopics
    const activeNews = NEWSByLevel.filter(news => state.selectedTopics.includes(news.topicId))
        .sort((a, b) => {
            const indexA = state.selectedTopics.indexOf(a.topicId);
            const indexB = state.selectedTopics.indexOf(b.topicId);
            return indexA - indexB; // First priority wins
        })
        .slice(0, 3);
    
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
        const priorityIndex = state.selectedTopics.indexOf(news.topicId) + 1;
        const mappedTopic = TOPICS_LIST.find(t => t.id === news.topicId);
        const lName = mappedTopic ? mappedTopic.label : "Sujet";
        const lvl = state.readingLevel === "low" ? "lowLevel" : "highLevel";
        
        const itemDiv = document.createElement("div");
        itemDiv.className = `py-4 ${idx === 0 ? 'pt-0' : ''} ${idx === activeNews.length - 1 ? 'pb-0' : ''} group transition-all`;
        itemDiv.innerHTML = `
            <div class="flex items-center justify-between gap-1.5 mb-1.5">
                <span class="pill select-none">${news.tag}</span>
                <div class="flex items-center gap-1">
                    <span class="text-[10px] text-brand-violet font-bold select-none bg-brand-violetSoft px-2 py-0.5 rounded-full">#${priorityIndex} ${lName}</span>
                    <span class="text-xs text-green-600 font-bold select-none">${news.score}% pertinent</span>
                </div>
            </div>
            <h4 class="font-display font-semibold text-slate-900 group-hover:text-brand-violet transition-colors text-sm leading-snug cursor-pointer" onclick="shadowSwitchNews()">${news.title}</h4>
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

    // Match selected topics criteria
    let filtered = NEWSByLevel.filter(news => state.selectedTopics.includes(news.topicId));

    // Sort matching order of topics priority
    filtered.sort((a, b) => {
        const indexA = state.selectedTopics.indexOf(a.topicId);
        const indexB = state.selectedTopics.indexOf(b.topicId);
        return indexA - indexB;
    });

    // Simulate different article quantities depending on topic preference rank
    // Rule: items with poor rank (7 or lower) are displayed only if their matching score is very high (>90)
    // This perfectly simulates prioritisation weights on feed quantities
    filtered = filtered.filter(news => {
        const rank = state.selectedTopics.indexOf(news.topicId) + 1; // 1-based rank
        if (rank > 6) {
            return parseInt(news.score) >= 90;
        }
        return true;
    });

    // Sub-topic mapping filtering
    if (selTopic !== "Tous") {
        filtered = filtered.filter(news => news.topicId === selTopic);
    }

    // Period mapping filtering
    if (selPeriod !== "Tout") {
        filtered = filtered.filter(news => news.period === selPeriod);
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
        const topicObj = TOPICS_LIST.find(t => t.id === news.topicId);
        const topicLabel = topicObj ? topicObj.label : "Sujet";
        const priorityRank = state.selectedTopics.indexOf(news.topicId) + 1;

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
                        <span class="text-[#087c4b]">${news.score}% de pertinence IA</span>
                    </div>

                    <div class="p-4 space-y-3">
                        <h4 class="font-display font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-violet transition-all">${news.title}</h4>
                        <p class="text-[11px] text-brand-muted leading-relaxed">${news[lvl].summary}</p>
                        
                        <!-- Mini bullet-list for easy reading -->
                        <div class="pt-2 border-t border-slate-100/65">
                            <span class="block text-[9px] uppercase font-bold text-brand-violet tracking-wider mb-2 select-none font-sans">Points clés sous filtre (${lvl === "highLevel" ? "Impacts" : "Mécaniques"})</span>
                            <ul class="space-y-1.5 pl-0.5">
                                ${factsListHtml}
                            </ul>
                        </div>
                    </div>

                    <div class="px-4 py-2 border-t border-slate-100 bg-white flex items-center justify-between text-[10px] text-slate-400 select-none">
                        <span class="flex items-center gap-1"><i data-lucide="globe" class="w-3 h-3"></i> Source: ${news.source}</span>
                        <span class="hover:underline text-brand-violet font-bold flex items-center gap-1">Prendre le contrôle <i data-lucide="chevron-right" class="w-2.5 h-2.5"></i></span>
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
    const activeNews = NEWSByLevel.filter(news => state.selectedTopics.includes(news.topicId));

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
            draftHtml += `*Source : ${art.source} - Pertinence IA : ${art.score}%*\n\n`;
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
