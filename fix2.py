import re
with open("public/app.js", "r", encoding="utf-8") as f:
    text = f.read()

new_func = """function populateReports() {
    const container = document.getElementById("reports-container");
    const filterSelect = document.getElementById("report-topic-filter");
    if (!container) return;

    const selectedTopic = filterSelect ? filterSelect.value : "all";
    
    // 1. Filtrer les rapports
    let reports = NEWSByLevel.filter(news => news.isReport && getNewsTopics(news).some(t => state.selectedTopics.includes(t)));
    
    if (selectedTopic !== "all") {
        reports = reports.filter(news => getNewsTopics(news).includes(selectedTopic));
    }
    
    if (reports.length === 0) {
        container.innerHTML = `
            <div class="py-12 text-center text-xs text-brand-muted flex flex-col items-center justify-center gap-2">
                <i data-lucide="ghost" class="w-10 h-10 text-slate-200"></i>
                <p class="font-bold text-slate-700 text-sm">Aucun rapport texte disponible</p>
                <p class="max-w-md mt-0.5">Ajustez votre Ordre de Préférence.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = "";
    
    // 2. Grouper les rapports par Thématique
    const groupedReports = {};
    reports.forEach(report => {
        let bestTopic = getNewsTopics(report)[0];
        let bestRank = 999;
        getNewsTopics(report).forEach(t => {
            let idx = state.selectedTopics.indexOf(t);
            if (idx !== -1 && idx < bestRank) {
                bestRank = idx;
                bestTopic = t;
            }
        });

        if (!groupedReports[bestTopic]) groupedReports[bestTopic] = [];
        groupedReports[bestTopic].push(report);
    });

    // 3. Trier les thématiques
    const sortedTopics = Object.keys(groupedReports).sort((a, b) => {
        return state.selectedTopics.indexOf(a) - state.selectedTopics.indexOf(b);
    });

    // 4. Générer l'UX
    sortedTopics.forEach(topicId => {
        const topicObj = TOPICS_LIST.find(t => t.id === topicId);
        const topicLabel = topicObj ? topicObj.label : topicId;
        const topicReports = groupedReports[topicId];
        
        topicReports.sort((a, b) => {
            let dA = new Date(a.date).getTime();
            let dB = new Date(b.date).getTime();
            if(isNaN(dA)) dA = 0;
            if(isNaN(dB)) dB = 0;
            return dB - dA;
        });

        let summaryBulletsHtml = "";
        topicReports.forEach((r) => {
            let cleanText = r.reportContent.replace(/#/g, '').replace(/\\*/g, '').trim().split('\\n')[0];
            if (cleanText.length > 110) cleanText = cleanText.substring(0, 110) + '...';
            summaryBulletsHtml += `<li class="text-[11px] text-slate-500 truncate mb-1" style="max-width: 90%;"><span class="font-bold text-brand-ink">${r.title}</span> : ${cleanText}</li>`;
        });

        const topicAccordionId = `accordion-body-${topicId.replace(/[^a-zA-Z0-9]/g, '')}`;
        const topicIconId = `accordion-icon-${topicId.replace(/[^a-zA-Z0-9]/g, '')}`;

        const groupDiv = document.createElement("div");
        groupDiv.className = "mb-6 rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden";
        
        let htmlInner = `
            <div class="p-5 cursor-pointer hover:bg-slate-50 transition-colors select-none" onclick="toggleTopicAccordion('${topicAccordionId}', '${topicIconId}')">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <span class="flex items-center justify-center px-2 py-0.5 rounded bg-brand-violetSoft text-brand-violet font-bold text-xs">
                            ${topicReports.length} Actus
                        </span>
                        <h2 class="font-display font-bold text-[17px] text-brand-ink">${topicLabel}</h2>
                    </div>
                    <i id="${topicIconId}" data-lucide="chevron-down" class="w-5 h-5 text-slate-400 transition-transform"></i>
                </div>
                <ul class="list-disc list-inside ml-2">
                    ${summaryBulletsHtml}
                </ul>
            </div>
            <div id="${topicAccordionId}" class="hidden p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
        `;

        topicReports.forEach(report => {
            let dateStr = "";
            let dateObj = new Date(report.date);
            if (isNaN(dateObj)) dateStr = report.date;
            else dateStr = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
            
            let htmlContent = report.reportContent
                .replace(/</g, "&lt;").replace(/>/g, "&gt;")
                .replace(/^#+ (.*$)/gim, '<h3 class="font-display font-bold text-lg text-brand-ink mt-4 mb-2">$1</h3>')
                .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong class="text-slate-800">$1</strong>')
                .replace(/^\\- (.*$)/gim, '<li class="ml-4 list-disc list-outside">$1</li>')
                .replace(/\\n\\n/g, '<br><br>')
                .replace(/\\n/g, '<br>');
                
            const contentId = `report-content-${report.id.replace(/[^a-zA-Z0-9]/g, '')}`;
            
            // Le petit snippet pour la vue fermée
            let miniSnippet = report.reportContent.replace(/#/g, '').replace(/\\*/g, '').trim().split('\\n')[0];
            if (miniSnippet.length > 200) miniSnippet = miniSnippet.substring(0, 200) + "...";

            htmlInner += `
                <div class="p-5 rounded-xl border border-slate-200 bg-white hover:border-brand-violet/50 transition-colors shadow-xs group">
                    <div class="flex items-start justify-between cursor-pointer select-none" onclick="toggleDeepDive('${contentId}')">
                        <div class="flex-1 pr-6">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="inline-block px-2 py-0.5 bg-brand-violetSoft text-brand-violetDark text-[9px] font-extrabold rounded uppercase tracking-wider">${report.tag}</span>
                                <span class="text-[10px] text-slate-400 font-medium">${dateStr}</span>
                            </div>
                            <h3 class="font-display font-bold text-[17px] text-slate-900 group-hover:text-brand-violet transition-colors">${report.title}</h3>
                            <p class="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed whitespace-pre-line">${miniSnippet}</p>
                        </div>
                        <div class="flex-shrink-0 mt-2 flex flex-col gap-2">
                            <button class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-all" onclick="event.stopPropagation(); window.open('${report.url || '#'}', '_blank')" title="Site Officiel">
                                <i data-lucide="globe" class="w-3.5 h-3.5"></i> Source
                            </button>
                            <button class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-brand-violet hover:bg-brand-violet hover:text-white transition-all">
                                <i data-lucide="search" class="w-3.5 h-3.5"></i> Deep-dive
                            </button>
                        </div>
                    </div>
                    <div id="${contentId}" class="hidden mt-4 pt-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed font-sans overflow-hidden">
                        ${htmlContent}
                    </div>
                </div>
            `;
        });

        htmlInner += `</div>`;
        groupDiv.innerHTML = htmlInner;
        container.appendChild(groupDiv);
    });
    
    lucide.createIcons();
}

window.toggleTopicAccordion = function(bodyId, iconId) {
    const el = document.getElementById(bodyId);
    const ic = document.getElementById(iconId);
    if (!el) return;
    if (el.classList.contains("hidden")) {
        el.classList.remove("hidden");
        if(ic) ic.classList.add("rotate-180");
    } else {
        el.classList.add("hidden");
        if(ic) ic.classList.remove("rotate-180");
    }
}
"""

text = re.sub(r'function populateReports\(\) \{.*?(?=// Helper function)', new_func + '\n\n', text, flags=re.DOTALL)

with open("public/app.js", "w", encoding="utf-8") as f:
    f.write(text)
print("Done")
