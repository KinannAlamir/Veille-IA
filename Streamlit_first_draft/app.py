import streamlit as st


st.set_page_config(
	page_title="Signal | CTO Advisory",
	page_icon="◈",
	layout="wide",
	initial_sidebar_state="expanded",
)


# The interface intentionally uses local mock data: this prototype validates the
# navigation and visual language before any collection or enrichment logic exists.
TOPICS = {
	"Boosting CTO": ["M&A", "Sourcing", "SmartFlow", "EA"],
	"Future of Work": ["Workplace", "Communication tools", "Modern management", "Next Gen Support"],
	"Cloud Connect": ["Quantum computing", "Automation", "Infrastructure & Architecture", "Hyperscalers"],
}

NEWS = [
	{
		"tag": "IA",
		"title": "Les agents autonomes passent du pilote à la production",
		"source": "MIT Technology Review",
		"date": "Il y a 2 h",
		"summary": "Les entreprises structurent désormais des équipes d'agents spécialisés pour accélérer les opérations complexes.",
		"score": "94",
	},
	{
		"tag": "CLOUD",
		"title": "AWS dévoile une nouvelle couche d'orchestration pour Bedrock",
		"source": "AWS News",
		"date": "Hier",
		"summary": "Une évolution qui facilite le passage de prototypes génératifs vers des workflows supervisés et traçables.",
		"score": "89",
	},
	{
		"tag": "SOUVERAINETÉ",
		"title": "Les modèles ouverts gagnent du terrain dans les environnements sensibles",
		"source": "Le Monde Informatique",
		"date": "Hier",
		"summary": "Le contrôle des données et la maîtrise des coûts renforcent l'intérêt pour les modèles déployables en propre.",
		"score": "86",
	},
	{
		"tag": "FUTURE OF WORK",
		"title": "Microsoft présente ses nouveaux copilotes métiers",
		"source": "Microsoft Blog",
		"date": "12 juin",
		"summary": "Des assistants spécialisés s'intègrent directement aux environnements de travail et aux processus d'équipe.",
		"score": "81",
	},
]


def inject_styles() -> None:
	st.markdown(
		"""
		<style>
		@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

		:root {
			--ink: #21145f;
			--violet: #4a20d1;
			--violet-dark: #29126d;
			--violet-soft: #ede9ff;
			--green: #00df80;
			--mint: #ddfff0;
			--paper: #fbfbfd;
			--line: #d9d4ef;
			--muted: #6e6b7d;
		}

		html, body, [class*="css"] { font-family: 'DM Sans', sans-serif; }
		h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif !important; color: var(--ink); letter-spacing: 0 !important; }
		.stApp { background: var(--paper); color: #262333; }
		[data-testid="stHeader"] { background: transparent; }
		[data-testid="stSidebar"] { background: var(--violet-dark); border-right: 0; }
		[data-testid="stSidebar"] * { color: white; }
		[data-testid="stSidebar"] .stButton > button { background: transparent; color: #d8d0ff; border: 0; text-align: left; justify-content: flex-start; border-radius: 8px; font-weight: 600; }
		[data-testid="stSidebar"] .stButton > button:hover { background: rgba(255,255,255,.12); color: white; border: 0; }
		[data-testid="stSidebar"] .active-nav .stButton > button { background: white; color: var(--violet-dark); }
		.block-container { padding: 2rem 3.5rem 3rem; max-width: 1500px; }
		.brand { display: flex; align-items: center; gap: 10px; margin: 0 0 3rem 0; }
		.brand-mark { width: 36px; height: 36px; display: grid; place-items: center; background: var(--green); color: var(--violet-dark); font-size: 24px; font-weight: 800; border-radius: 9px; }
		.brand-name { font-family: 'Space Grotesk'; font-size: 22px; font-weight: 700; letter-spacing: -.5px; }
		.brand-name span { color: var(--green); }
		.side-label { color: #a9a0dc; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; margin: 0 0 8px 4px; }
		.side-footer { border-top: 1px solid rgba(255,255,255,.18); padding-top: 18px; margin-top: 4rem; color: #bdb6e3; font-size: 12px; }
		.eyebrow { color: var(--violet); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
		.hero-title { font-family: 'Space Grotesk'; font-size: clamp(2rem, 4vw, 3.8rem); line-height: 1.05; font-weight: 700; letter-spacing: -2px; color: var(--ink); margin: 0; }
		.hero-title span { color: var(--violet); }
		.hero-copy { color: var(--muted); max-width: 620px; font-size: 16px; line-height: 1.6; margin: 16px 0 0; }
		.topline { display:flex; justify-content: space-between; align-items:center; margin-bottom: 2.2rem; }
		.topline-date { color: var(--muted); font-size: 13px; }
		.pill { display:inline-block; padding: 5px 10px; border-radius: 99px; background: var(--violet-soft); color: var(--violet); font-size: 11px; font-weight: 700; }
		.pill.green { background: var(--mint); color: #087c4b; }
		.panel { background: white; border: 1px solid var(--line); border-radius: 14px; padding: 22px; box-shadow: 0 8px 30px rgba(42, 21, 109, .04); }
		.panel h3 { margin: 0 0 18px; font-size: 19px; }
		.metric { background: var(--violet-dark); border-radius: 12px; padding: 18px 20px; color:white; min-height: 116px; }
		.metric.light { background: var(--violet-soft); color: var(--ink); }
		.metric.green { background: var(--green); color: var(--violet-dark); }
		.metric-label { font-size: 12px; opacity: .78; font-weight: 600; }
		.metric-value { font-family: 'Space Grotesk'; font-size: 31px; font-weight: 700; margin-top: 10px; }
		.metric-delta { font-size: 11px; margin-top: 3px; opacity: .75; }
		.section-title { display:flex; align-items:baseline; justify-content:space-between; margin: 2.2rem 0 1rem; }
		.section-title h2 { font-size: 23px; margin: 0; }
		.section-title p { color: var(--muted); font-size: 13px; margin: 0; }
		.news-card { border-top: 3px solid var(--violet); padding: 17px 0 15px; }
		.news-card:first-child { padding-top: 0; }
		.news-title { color: var(--ink); font-family: 'Space Grotesk'; font-size: 17px; font-weight: 600; line-height: 1.25; margin: 9px 0 6px; }
		.news-summary { color: var(--muted); font-size: 13px; line-height: 1.45; }
		.news-meta { color: #9995a5; font-size: 11px; }
		.score { float:right; color: #08a85f; font-size: 13px; font-weight: 700; }
		.topic-card { padding: 2px 0 0; background: transparent; }
		.topic-card.selected { border: 0; }
		.topic-card h4 { font-size: 18px; margin: 12px 0 5px; }
		.topic-card p { color: var(--muted); font-size: 12px; margin: 0; }
		.topic-icon { color: var(--violet); font-size: 25px; }
		.topic-caption { color: var(--muted); font-size: 11px; font-weight: 700; letter-spacing: .7px; text-transform: uppercase; margin: 20px 0 8px; }
		[data-testid="stMultiSelect"] > div > div { border-color: var(--line); border-radius: 8px; background: white; min-height: 48px; }
		[data-testid="stMultiSelect"] [data-baseweb="tag"] { background: var(--violet-soft); border-radius: 5px; color: var(--violet); }
		[data-testid="stMultiSelect"] [data-baseweb="tag"] span { color: var(--violet); }
		.workflow { display:flex; align-items: center; gap: 0; margin: 12px 0; }
		.workflow-step { flex: 1; text-align:center; position:relative; }
		.workflow-step:not(:last-child):after { content:''; height: 2px; background: var(--green); position:absolute; width: 100%; top: 20px; left: 50%; z-index: 0; }
		.workflow-dot { position:relative; z-index:1; margin: 0 auto 9px; width: 40px; height: 40px; border-radius: 50%; display:grid; place-items:center; background: var(--violet); color:white; font-weight:700; font-size: 13px; }
		.workflow-step.done .workflow-dot { background: var(--green); color: var(--violet-dark); }
		.workflow-label { color: var(--ink); font-size: 12px; font-weight: 700; }
		.stButton > button { border-radius: 8px; border: 1px solid var(--violet); color: var(--violet); font-weight: 700; min-height: 42px; }
		.stButton > button:hover { border-color: var(--violet-dark); color: var(--violet-dark); }
		.primary-button .stButton > button { background: var(--violet); color: white; }
		.primary-button .stButton > button:hover { background: var(--violet-dark); color: white; }
		.stCheckbox label p { font-size: 13px; }
		@media (max-width: 800px) { .block-container { padding: 1.2rem 1rem 2rem; } .topline { margin-bottom: 1.5rem; } .hero-title { font-size: 2.5rem; } .workflow-label { font-size: 10px; } }
		</style>
		""",
		unsafe_allow_html=True,
	)


def navigate(page: str) -> None:
	st.session_state.page = page


def sidebar() -> None:
	with st.sidebar:
		st.markdown('<div class="brand"><div class="brand-mark">◈</div><div class="brand-name">signal<span>.</span></div></div>', unsafe_allow_html=True)
		st.markdown('<div class="side-label">Espace de travail</div>', unsafe_allow_html=True)
		pages = [("Vue d'ensemble", "⌂"), ("Choix des sujets", "◎"), ("Actualités", "◫"), ("Contenu & diffusion", "↗")]
		for label, icon in pages:
			is_active = st.session_state.page == label
			wrapper = 'active-nav' if is_active else ''
			st.markdown(f'<div class="{wrapper}">', unsafe_allow_html=True)
			if st.button(f"{icon}   {label}", key=f"nav-{label}", use_container_width=True):
				navigate(label)
				st.rerun()
			st.markdown('</div>', unsafe_allow_html=True)
		st.markdown('<div class="side-footer"><strong>CTO ADVISORY</strong><br><br>Veille technologique<br>Version prototype · 01</div>', unsafe_allow_html=True)


def header(title: str, description: str) -> None:
	st.markdown(f'<div class="eyebrow">Portail de veille · CTO Advisory</div><h1 class="hero-title">{title}</h1><p class="hero-copy">{description}</p>', unsafe_allow_html=True)


def dashboard() -> None:
	header("Le signal, au bon moment.", "Une lecture claire des tendances technologiques qui peuvent faire bouger les offres, les métiers et les conversations de demain.")
	st.markdown('<div style="height:24px"></div>', unsafe_allow_html=True)
	metric_cols = st.columns(4)
	metrics = [("Sujets surveillés", "12", "+ 3 ce mois", ""), ("Signaux cette semaine", "48", "+ 18% vs semaine dernière", "light"), ("Sources actives", "26", "Toutes synchronisées", "green"), ("Prochaine diffusion", "Jeudi", "Newsletter hebdomadaire", "")]
	for column, (label, value, delta, theme) in zip(metric_cols, metrics):
		with column:
			st.markdown(f'<div class="metric {theme}"><div class="metric-label">{label}</div><div class="metric-value">{value}</div><div class="metric-delta">{delta}</div></div>', unsafe_allow_html=True)

	st.markdown('<div class="section-title"><h2>Les derniers signaux</h2><p>Mis à jour aujourd’hui à 09:42</p></div>', unsafe_allow_html=True)
	left, right = st.columns([1.55, 1], gap="large")
	with left:
		st.markdown('<div class="panel">', unsafe_allow_html=True)
		for news in NEWS[:3]:
			st.markdown(f'<div class="news-card"><span class="pill">{news["tag"]}</span><span class="score">{news["score"]}% pertinent</span><div class="news-title">{news["title"]}</div><div class="news-summary">{news["summary"]}</div><div class="news-meta">{news["source"]} · {news["date"]}</div></div>', unsafe_allow_html=True)
		st.markdown('</div>', unsafe_allow_html=True)
	with right:
		st.markdown('<div class="panel"><h3>Votre parcours de veille</h3><div class="workflow"><div class="workflow-step done"><div class="workflow-dot">1</div><div class="workflow-label">Sélection</div></div><div class="workflow-step done"><div class="workflow-dot">2</div><div class="workflow-label">Collecte</div></div><div class="workflow-step done"><div class="workflow-dot">3</div><div class="workflow-label">Synthèse</div></div><div class="workflow-step"><div class="workflow-dot">4</div><div class="workflow-label">Diffusion</div></div></div><hr style="border:0;border-top:1px solid #eee;margin:20px 0"><p style="color:#6e6b7d;font-size:13px;line-height:1.5">Votre prochaine newsletter est presque prête. 8 signaux ont été retenus pour votre sélection.</p></div>', unsafe_allow_html=True)
		st.markdown('<div style="height:14px"></div>', unsafe_allow_html=True)
		st.markdown('<div class="panel"><span class="pill green">RECOMMANDATION</span><h3 style="margin-top:13px">Explorer la souveraineté</h3><p style="color:#6e6b7d;font-size:13px;line-height:1.5">Un sujet en forte progression dans vos sources ce mois-ci.</p></div>', unsafe_allow_html=True)


def topics_page() -> None:
	header("Choisir vos angles.", "Composez votre veille selon les conversations qui comptent pour vos équipes et vos clients.")
	st.markdown('<div class="section-title"><h2>Thématiques principales</h2><p>3 familles · 12 sujets</p></div>', unsafe_allow_html=True)
	topic_cols = st.columns(3, gap="medium")
	for column, (family, topics) in zip(topic_cols, TOPICS.items()):
		with column:
			with st.container(border=True):
				st.markdown(f'<div class="topic-card selected"><div class="topic-icon">◈</div><h4>{family}</h4><p>{len(topics)} sous-sections disponibles</p><div class="topic-caption">Sous-sections suivies</div></div>', unsafe_allow_html=True)
				st.multiselect(
					f"Sous-sections de {family}",
					options=topics,
					default=topics,
					key=f"topic-{family}",
					label_visibility="collapsed",
				)
	st.markdown('<div style="height:28px"></div>', unsafe_allow_html=True)
	st.markdown('<div class="panel"><span class="pill green">CONFIGURATION ACTIVE</span><h3 style="margin-top:14px">Votre sélection</h3><div style="font-family:Space Grotesk;font-size:36px;color:#4a20d1;font-weight:700">12</div><p style="color:#6e6b7d;font-size:13px">sujets alimenteront votre prochaine synthèse.</p></div>', unsafe_allow_html=True)


def news_page() -> None:
	header("Tout ce qui mérite un signal.", "Retrouvez les actualités filtrées, classées et prêtes à être lues par votre équipe.")
	filter_cols = st.columns([1, 1, 1, 2])
	with filter_cols[0]: st.selectbox("Famille", ["Toutes", "IA", "Cloud", "Future of Work"])
	with filter_cols[1]: st.selectbox("Période", ["Cette semaine", "Ce mois-ci", "Tout"])
	with filter_cols[2]: st.selectbox("Tri", ["Pertinence", "Plus récent"])
	with filter_cols[3]: st.text_input("Rechercher", placeholder="Rechercher un signal...", label_visibility="visible")
	st.markdown('<div style="height:12px"></div>', unsafe_allow_html=True)
	for news in NEWS:
		st.markdown(f'<div class="panel" style="margin-bottom:12px;padding:18px 22px"><span class="pill">{news["tag"]}</span><span class="score">{news["score"]}% pertinent</span><div class="news-title">{news["title"]}</div><div class="news-summary">{news["summary"]}</div><div class="news-meta">{news["source"]} · {news["date"]}</div></div>', unsafe_allow_html=True)


def content_page() -> None:
	header("Donner une voix au signal.", "Transformez une sélection d’actualités en contenu directement exploitable par vos équipes.")
	left, right = st.columns([1.15, 1], gap="large")
	with left:
		st.markdown('<div class="panel"><h3>Nouvelle publication</h3>', unsafe_allow_html=True)
		st.selectbox("Format", ["Post LinkedIn", "Newsletter hebdomadaire", "Note de synthèse"])
		st.selectbox("Angle", ["Les tendances à retenir", "Point de vue CTO Advisory", "À surveiller"])
		st.multiselect("Signaux inclus", [news["title"] for news in NEWS], default=[NEWS[0]["title"], NEWS[1]["title"]])
		st.text_area("Consigne éditoriale", value="Rédiger une synthèse claire et engageante pour un public de décideurs.", height=100)
		st.markdown('<div class="primary-button">', unsafe_allow_html=True)
		st.button("Générer un brouillon", use_container_width=True)
		st.markdown('</div></div>', unsafe_allow_html=True)
	with right:
		st.markdown('<div class="panel"><span class="pill green">APERÇU DU BROUILLON</span><h3 style="margin-top:14px">Les agents autonomes arrivent</h3><p style="font-size:14px;line-height:1.65;color:#484458">Les agents autonomes passent progressivement du pilote à la production. Leur valeur ne se limite plus à l’expérimentation : ils structurent des workflows, accélèrent l’analyse et redessinent les équipes opérationnelles.</p><p style="font-size:14px;line-height:1.65;color:#484458">Pour les CTO, le sujet est désormais moins celui de la technologie que celui de l’orchestration, de la gouvernance et de la confiance.</p><hr style="border:0;border-top:1px solid #eee"><span style="color:#9995a5;font-size:11px">Brouillon · 482 caractères · Ton conseil</span></div>', unsafe_allow_html=True)


inject_styles()
if "page" not in st.session_state:
	st.session_state.page = "Vue d'ensemble"
sidebar()

st.markdown('<div class="topline"><div class="topline-date">Jeudi 19 juin 2025</div><span class="pill green">● SYSTÈME OPÉRATIONNEL</span></div>', unsafe_allow_html=True)
if st.session_state.page == "Vue d'ensemble":
	dashboard()
elif st.session_state.page == "Choix des sujets":
	topics_page()
elif st.session_state.page == "Actualités":
	news_page()
else:
	content_page()
