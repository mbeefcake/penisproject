// Medische kennisbank voor UroAtlas (Anatomie, Hemodynamica, Pathologie & Kennistest)

export const ANATOMY_CATEGORIES = {
  erectile: { label: 'Erectiel weefsel & Urethra', colorVar: '--cat-erectile' },
  vascular: { label: 'Vaatstelsel (Arteriën & Venen)', colorVar: '--cat-vascular' },
  neural: { label: 'Zenuwstelsel (Innervatie)', colorVar: '--cat-neural' },
  fascia: { label: 'Fasciën, Huid & Steunweefsel', colorVar: '--cat-fascia' }
};

export const ANATOMY_STRUCTURES = [
  {
    id: 'corpus-cavernosum',
    name: 'Zwellichaam (Corpus cavernosum)',
    latin: 'Corpus cavernosum penis',
    category: 'erectile',
    views: ['sagittal', 'transverse'],
    summary: 'Gepaard dorsolateraal zwellichaam dat verantwoordelijk is voor circa 90% van de stijfheid en het volume tijdens een erectie.',
    histology: 'Sponsachtig netwerk van met endotheel beklede vasculaire ruimten (sinusoïden/lacunae), gescheiden door trabekels van glad spierweefsel, collageen (type I, III en IV) en elastische vezels.',
    physiology: 'Tijdens seksuele stimulatie ontspannen de gladde spiercellen in de trabekels onder invloed van stikstofmonoxide (NO/cGMP). De sinusoïden vullen zich met arterieel bloed onder hoge druk, waardoor expansie en stijfheid optreden.',
    neurovascular: 'Arterieel: a. profunda penis (cavernosa) en aa. helicinae. Veneus: subtunicale venulen en vv. emissariae. Innervatie: nn. cavernosi (autonoom).',
    clinical: 'Plaats van priapisme (low-flow ischemie), fibrose bij de ziekte van Peyronie en injectietherapie (alprostadil) bij erectiele disfunctie.',
    relatedPathologyId: 'erectiele-disfunctie',
    hemoFocusId: 'hemo-sinusoid'
  },
  {
    id: 'corpus-spongiosum',
    name: 'Sponslichaam (Corpus spongiosum)',
    latin: 'Corpus spongiosum penis',
    category: 'erectile',
    views: ['sagittal', 'transverse'],
    summary: 'Ongepaard ventraal zwellichaam dat de urinebuis (urethra) omhult en proximaal de bulbus penis en distaal de glans penis vormt.',
    histology: 'Bevat fijnere trabekels met een hoger aandeel elastische vezels en een veel dunnere tunica albuginea dan de corpora cavernosa.',
    physiology: 'Vult zich wel met bloed tijdens erectie maar behoudt een lagere intracorporale druk. Dit voorkomt dat de urethra wordt dichtgedrukt tijdens zaadlozing (ejaculatie).',
    neurovascular: 'Arterieel: a. bulbourethralis en takken van de a. pudenda interna. Veneus: drainage via vv. circumflexae en v. dorsalis profunda.',
    clinical: 'Beschermt de urethra tegen compressie. Trauma (bijvoorbeeld penisfractuur) kan gepaard gaan met urethraletsel (bloed uit de meatus).',
    relatedPathologyId: 'hypospadie',
    hemoFocusId: 'hemo-sinusoid'
  },
  {
    id: 'glans-penis',
    name: 'Eikel (Glans penis)',
    latin: 'Glans penis',
    category: 'erectile',
    views: ['sagittal'],
    summary: 'Het distale, kapvormige uiteinde van het corpus spongiosum dat over de stompe uiteinden van de corpora cavernosa ligt.',
    histology: 'Bedekt door niet-verhoornend (of dun verhoornend na circumcisie) plaveiselepitheel zonder talgklieren in het slijmvlies zelf, rijk aan vrije zenuwuiteinden en lichaampjes van Krause/Meissner.',
    physiology: 'Fungeert als schokdemper tijdens penetratie en als primair sensorisch orgaan voor tactiele en erogene prikkels die de ejaculatiereflex aansturen.',
    neurovascular: 'Arterieel: distale uitlopers van de aa. dorsales penis. Sensorische innervatie: eindtakken van de n. dorsalis penis.',
    clinical: 'Ontsteking van de eikel heet balanitis. De rand (corona glandis) vertoont bij 15–30% van de mannen goedaardige parelpapels (hirsuties papillaris).',
    relatedPathologyId: 'balanitis',
    hemoFocusId: 'node-para'
  },
  {
    id: 'urethra',
    name: 'Plasbuis (Urethra spongiosa)',
    latin: 'Urethra masculina (pars spongiosa)',
    category: 'erectile',
    views: ['sagittal', 'transverse'],
    summary: 'Centrale afvoergang door het corpus spongiosum voor zowel urine als sperma, uitmondend in de meatus urethrae externus.',
    histology: 'Bekleed met pseudomeerlagig cilinderepitheel, overgaand in niet-verhoornend plaveiselepitheel in de verwijde fossa navicularis vlak voor de uitmonding. Bevat klieren van Littre (slijmproductie).',
    physiology: 'Gemeenschappelijke eindweg van het urogenitale stelsel. Klieren van Cowper en Littre produceren alkalisch voorvocht dat zuurresten in de urethra neutraliseert vóór ejaculatie.',
    neurovascular: 'Gevasculariseerd door de a. urethralis binnen het corpus spongiosum; gevoelszenuwen via takken van de n. pudendus.',
    clinical: 'Aangeboren ventrale verplaatsing van de uitmonding heet hypospadie. Vernauwingen (urethrastricturen) kunnen ontstaan na infectie of kathetertrauma.',
    relatedPathologyId: 'hypospadie'
  },
  {
    id: 'fossa-navicularis-meatus',
    name: 'Fossa navicularis & Meatus',
    latin: 'Fossa navicularis urethrae et meatus urethrae externus',
    category: 'erectile',
    views: ['sagittal'],
    summary: 'De scheepvormige verbreding van de plasbuis net achter de eikeltop en de spleetvormige buitenste urinebuisopening (meatus).',
    histology: 'Bekleed met gelaagd plaveiselepitheel als overgang tussen het inwendige urethrale slijmvlies en de buitenzijde van de glans.',
    physiology: 'Door de specifieke vorm van de fossa navicularis en de verticale spleet van de meatus ontstaat een wervelende, gebundelde laminaire urinestraal.',
    neurovascular: 'Rijk gevasculariseerd en gevoelig via takjes van de n. dorsalis penis.',
    clinical: 'Vernauwing (meatusstenose) of aangeboren lagere ligging (hypospadie) verstoort de urinestraal. Ook voorkeurslocatie voor urethritis-inspectie.',
    relatedPathologyId: 'hypospadie'
  },
  {
    id: 'tunica-albuginea',
    name: 'Bindweefselkapsel (Tunica albuginea)',
    latin: 'Tunica albuginea corporum cavernosorum',
    category: 'fascia',
    views: ['sagittal', 'transverse'],
    summary: 'Zeer stevige, tweelagige bindweefselmantel rond de zwellichamen die cruciaal is voor het veno-occlusieve mechanisme en de stijfheid.',
    histology: 'Binnenste circulaire laag en buitenste longitudinale laag van dichte collageenbundels (type I) verweven met elastinevezels. Gemiddelde dikte ~2 mm in rust, ~0,5 mm bij erectie.',
    physiology: 'Begrenst de maximale expansie van de corpora cavernosa en comprimeert bij vulling de schuin doorborende veneuze afvoervaten (vv. emissariae), zodat het bloed gevangen blijft.',
    neurovascular: 'Relatief vaatarm; doorboord door emissaire venen en takken van de caverneuze zenuwen en vaten.',
    clinical: 'Littekenvorming/plaques in de tunica albuginea veroorzaken kromstand bij de ziekte van Peyronie. Plotselinge scheuring tijdens buigtrauma veroorzaakt een penisfractuur.',
    relatedPathologyId: 'ziekte-van-peyronie',
    hemoFocusId: 'hemo-tunica'
  },
  {
    id: 'septum-penis',
    name: 'Tussenschot (Septum pectiniforme)',
    latin: 'Septum penis',
    category: 'fascia',
    views: ['transverse'],
    summary: 'Mediane bindweefselplaat gevormd door de fusie van de mediale wanden van de tunica albuginea tussen beide corpora cavernosa.',
    histology: 'Sterke collagene vezelstructuur met kamvormige openingen (fenestraties), vandaar de term pectiniforme ("kamvormig").',
    physiology: 'Zorgt dat beide corpora cavernosa functioneel als één drukkamer samenwerken: bloed en intracaverneuze druk verdelen zich symmetrisch tussen links en rechts.',
    neurovascular: 'Doorlaatbaar voor kleine anastomosen tussen de linker en rechter sinusoïden.',
    clinical: 'Dankzij deze fenestraties verspreidt een enkelzijdige intracaverneuze injectie zich naar beide zwellichamen en volstaat vaak één punctie bij ischemisch priapisme.',
    relatedPathologyId: 'priapisme',
    hemoFocusId: 'hemo-sinusoid'
  },
  {
    id: 'fascia-buck',
    name: 'Diepe penisfascie (Fascia van Buck)',
    latin: 'Fascia penis profunda',
    category: 'fascia',
    views: ['sagittal', 'transverse'],
    summary: 'Stevige, niet-elastische bindweefsellaag die alle drie de zwellichamen én de diepe dorsale neurovasculaire bundel samenbindt.',
    histology: 'Dicht fibreus bindweefsel dat ventraal splitst om ook het corpus spongiosum afzonderlijk te omhullen en proximaal overgaat in het ligamentum suspensorium en de perineale fascie.',
    physiology: 'Biedt mechanische stabiliteit aan de schacht tijdens erectie en houdt de diepe dorsale bloedvaten en zenuwen op hun plaats.',
    neurovascular: 'Begrenst het compartiment van de v. dorsalis profunda, aa. dorsales en nn. dorsales.',
    clinical: 'Klinische barrière bij trauma: als de fascia van Buck intact blijft bij een penisfractuur, blijft het hematoom beperkt tot de schacht ("aubergine-teken"). Scheurt deze ook, dan verspreidt bloed/urine zich naar scrotum en buikwand.',
    relatedPathologyId: 'ziekte-van-peyronie'
  },
  {
    id: 'cutis-dartos',
    name: 'Penishuid & Tunica dartos',
    latin: 'Cutis penis et tunica dartos',
    category: 'fascia',
    views: ['sagittal', 'transverse'],
    summary: 'Dunne, extreem rekbare en vetvrije penishuid ondersteund door de oppervlakkige fascie (tunica dartos) met gladde spiervezels.',
    histology: 'Gepigmenteerd meerlagig verhoornend plaveiselepitheel zonder onderhuids vetweefsel; de tunica dartos bevat losmazig bindweefsel, elastine en gladde spiercellen doorlopend in het scrotum.',
    physiology: 'Glijdt soepel over de diepe fascia van Buck zodat de huid moeiteloos kan meebewegen bij lengte- en omtrektoename tijdens erectie. Dartos-contractie reguleert tevens temperatuur.',
    neurovascular: 'Vascularisatie via aa. pudendae externae; drainage via de oppervlakkige dorsale vene; sensoriek via takken van n. ilioinguinalis en n. dorsalis penis.',
    clinical: 'Plaats waar goedaardige Fordyce-plekjes (zichtbare talgklieren) zichtbaar zijn. Door het ontbreken van vetweefsel kunnen zwellingen en oedeem hier snel uitbreiden.',
    relatedPathologyId: 'fordyce-plekjes'
  },
  {
    id: 'preputium-frenulum',
    name: 'Voorhuid & Riempje (Preputium & Frenulum)',
    latin: 'Preputium penis et frenulum preputii',
    category: 'fascia',
    views: ['sagittal'],
    summary: 'Dubbele huidplooi die de glans beschermt, aan de onderzijde verankerd via het zeer gevoelige frenulum.',
    histology: 'Buitenzijde bestaat uit gepigmenteerde huid met gladde spiervezels (dartos); binnenzijde is vochtig, gevoelig slijmvlies met mucocutane eindorganen en veel Langerhans-cellen.',
    physiology: 'Beschermt het gevoelige glans-slijmvlies tegen wrijving en uitdroging en geeft extra huidspeling bij lengte-expansie tijdens erectie.',
    neurovascular: 'Vascularisatie via rr. preputiales van de a. dorsalis en aa. pudendae externae; zeer dichte sensorische innervatie in het frenulum.',
    clinical: 'Een te nauwe voorhuid heet fimose; een teruggeschoven, beklemmende voorhuid is een spoedgeval (parafimose). Een te kort riempje heet frenulum breve.',
    relatedPathologyId: 'fimose-parafimose'
  },
  {
    id: 'ligamentum-suspensorium',
    name: 'Ophangband (Lig. suspensorium)',
    latin: 'Ligamentum suspensorium penis',
    category: 'fascia',
    views: ['sagittal'],
    summary: 'Driehoekige bindweefselband die de basis van de corpora cavernosa verankert aan het schaambeen (os pubis).',
    histology: 'Sterke collageenbundels die uitstralen vanaf de symphysis pubica en versmelten met de fascia van Buck.',
    physiology: 'Ondersteunt de peniswortel en bepaalt de erectiehoek, waardoor de opgerichte penis stabiel blijft voor penetratie.',
    neurovascular: 'De dorsale vaat-zenuwstreng passeert direct diep of mediaal langs de aanhechting.',
    clinical: 'Chirurgische klieving (suspensory ligament release) wordt soms toegepast bij verlengingschirurgie, maar kan de stabiliteit en opwaartse erectiehoek verminderen.',
    relatedPathologyId: 'ziekte-van-peyronie'
  },
  {
    id: 'os-pubis',
    name: 'Schaambeen & Symphysis pubica',
    latin: 'Os pubis et symphysis pubica',
    category: 'fascia',
    views: ['sagittal'],
    summary: 'Voorste benige deel van het bekken waaraan de schaambeenophangband (lig. suspensorium) en de wortels van de zwellichamen zijn verankerd.',
    histology: 'Trabeculair en corticaal botweefsel verbonden in de middenlijn door een kraakbenige schijf (fibrocartilago interpubica).',
    physiology: 'Vormt het stevige mechanische ankerpunt van waaruit de erectiehoek en stabiliteit van de penisschacht worden gedragen.',
    neurovascular: 'De v. dorsalis profunda en takken van de a. pudenda interna passeren direct onder het boogje van de symfyse (arcus pubis).',
    clinical: 'Bekkenfracturen met loslating rond het os pubis zijn een bekende oorzaak van urethra-ruptuur en neurovasculaire erectiele disfunctie.',
    relatedPathologyId: 'erectiele-disfunctie'
  },
  {
    id: 'bekkenbodem-spieren',
    name: 'Bekkenbodemspieren & Bulbusbasis',
    latin: 'Mm. ischiocavernosus et bulbospongiosus',
    category: 'erectile',
    views: ['sagittal'],
    summary: 'Dwarsgestreepte bekkenbodemspieren die de wortels (crura en bulbus) van de zwellichamen omvatten en actief kunnen aanspannen.',
    histology: 'Snel-contraherende dwarsgestreepte skeletspiervezels onder willekeurige en reflexmatige controle vanuit de nervus pudendus.',
    physiology: 'Aanspanning van de m. ischiocavernosus pompt bloed uit de wortel naar de schacht en tilt de intracaverneuze druk kortstondig tot boven de systolische bloeddruk (suprasystolische rigiditeit). De m. bulbospongiosus drijft sperma en laatste urinedruppels krachtig uit.',
    neurovascular: 'Motorisch geïnnerveerd door perineale takken van de n. pudendus (S2–S4).',
    clinical: 'Bekkenfysiotherapie (Kegel-oefeningen) versterkt deze spieren bij lichte erectiele disfunctie, nadruppelen en ter verbetering van ejaculatiecontrole.',
    relatedPathologyId: 'erectiele-disfunctie',
    hemoFocusId: 'metric-icp'
  },
  {
    id: 'arteria-profunda',
    name: 'Diepe zwellichaamslagader (A. cavernosa)',
    latin: 'Arteria profunda penis',
    category: 'vascular',
    views: ['sagittal', 'transverse'],
    summary: 'De hoofdaanvoerroute van arterieel bloed naar de corpora cavernosa, centraal gelegen in elk zwellichaam.',
    histology: 'Musculaire arterie met uitgesproken gladde spierlaag en functioneel endotheel dat gevoelig is voor schuifspanning en autonome neurotransmitters.',
    physiology: 'Geeft kurkentrekkervormige zijtakjes af (arteriae helicinae) die direct uitmonden in de sinusoïden. Bij relaxatie stijgt de bloedstroom met een factor 10–20.',
    neurovascular: 'Eindtak van de arteria penis (uit de a. pudenda interna). Sympathisch in rust gecontraheerd; parasympathisch verwijd via NO/cGMP.',
    clinical: 'Atherosclerose of microvasculaire schade (diabetes, roken, hypertensie) in deze kleine arterie (diameter ~0,5–1 mm) is de meest voorkomende oorzaak van vasculogene erectiele disfunctie — vaak jaren vóór coronaire hartziekte.',
    relatedPathologyId: 'erectiele-disfunctie',
    hemoFocusId: 'hemo-artery'
  },
  {
    id: 'arteria-dorsalis',
    name: 'Dorsale penisslagader',
    latin: 'Arteria dorsalis penis',
    category: 'vascular',
    views: ['sagittal', 'transverse'],
    summary: 'Gepaarde slagader op de rugzijde van de penis binnen de fascia van Buck, lateraal van de diepe dorsale vene.',
    histology: 'Musculaire arterie ingebed in de dorsale neurovasculaire bundel, met perforerende takken naar de tunica albuginea.',
    physiology: 'Voorziet met name de glans penis, de huid, het voorhuidweefsel en via circumflexe takken het corpus spongiosum van zuurstofrijk bloed.',
    neurovascular: 'Tak van de arteria pudenda interna; loopt parallel met de n. dorsalis penis.',
    clinical: 'Belangrijk herkenningspunt bij peniele reconstructieve chirurgie en microchirurgische revascularisatie na bekkentrauma.',
    relatedPathologyId: 'priapisme',
    hemoFocusId: 'hemo-artery'
  },
  {
    id: 'vena-dorsalis-profunda',
    name: 'Diepe dorsale penisvene',
    latin: 'Vena dorsalis profunda penis',
    category: 'vascular',
    views: ['sagittal', 'transverse'],
    summary: 'Ongepaarde centrale afvoerader onder de fascia van Buck die bloed uit de glans en via emissaire venen uit de corpora cavernosa afvoert.',
    histology: 'Dunwandige vene met kleppen die retrogradestroom voorkomen, gelegen in de groeve tussen beide corpora cavernosa.',
    physiology: 'Draineert het grootste deel van het caverneuze bloed naar de plexus venosus prostaticus (plexus van Santorini).',
    neurovascular: 'Ontvangt bloed van de vv. emissariae (via vv. circumflexae). Wordt indirect ontlast tijdens veno-occlusie wanneer de emissaire venen dichtgedrukt worden.',
    clinical: 'Schade aan het veno-occlusieve systeem leidt tot veneuze lekkage. Bij penisfractuur of diepe shunting bij priapisme is dit vat chirurgisch relevant.',
    relatedPathologyId: 'erectiele-disfunctie',
    hemoFocusId: 'hemo-venule'
  },
  {
    id: 'vena-dorsalis-superficialis',
    name: 'Oppervlakkige dorsale penisvene',
    latin: 'Vena dorsalis penis superficialis',
    category: 'vascular',
    views: ['sagittal', 'transverse'],
    summary: 'Oppervlakkig gelegen ader in de tunica dartos (buiten de fascia van Buck) die het bloed van de penishuid en voorhuid afvoert.',
    histology: 'Subcutane vene met dunne wand, goed zichtbaar onder de dunne schachthuid bij verhoogde doorbloeding.',
    physiology: 'Draineert via de vv. pudendae externae naar de vena saphena magna (lies) en staat los van het diepe intracaverneuze veno-occlusieve systeem.',
    neurovascular: 'Ligt in de oppervlakkige fascieruimte dorsaal in de middenlijn.',
    clinical: 'Tromboflebitis van deze ader staat bekend als de ziekte van Mondor van de penis: een plotselinge, harde maar onschuldige onderhuidse streng die spontaan herstelt.',
    relatedPathologyId: 'balanitis'
  },
  {
    id: 'venae-emissariae',
    name: 'Emissaire & Circumflexe venen',
    latin: 'Venae emissariae et circumflexae penis',
    category: 'vascular',
    views: ['sagittal', 'transverse'],
    summary: 'Kleine afvoeraders die schuin door de dikke tunica albuginea heen boren en het caverneuze bloed afvoeren richting de diepe dorsale vene.',
    histology: 'Dunwandige veneuze takjes zonder eigen stevige spierlaag, schuin ingebed tussen de bindweefsellagen van de tunica albuginea.',
    physiology: 'Kern van het veno-occlusieve mechanisme: zodra de caverneuze sinusoïden opzwellen, worden deze schuin lopende venen dichtgeknepen tegen de stugge tunica albuginea.',
    neurovascular: 'Verbinden het subtunicale veneuze netwerk binnen de corpora cavernosa met de vv. circumflexae en v. dorsalis profunda.',
    clinical: 'Als verouderd of fibrotisch weefsel deze venen niet goed afsluit, ontstaat veneuze lekkage waarbij een erectie snel wegzakt.',
    relatedPathologyId: 'erectiele-disfunctie',
    hemoFocusId: 'hemo-venule'
  },
  {
    id: 'nervus-dorsalis',
    name: 'Dorsale peniszenuw (Somatisch)',
    latin: 'Nervus dorsalis penis',
    category: 'neural',
    views: ['sagittal', 'transverse'],
    summary: 'Gepaarde somatische gevoelszenuw, eindtak van de nervus pudendus, gelegen aan de buitenzijde van de dorsale vaat-zenuwstreng.',
    histology: 'Gemyeliniseerde (A-beta/A-delta) en ongemyeliniseerde (C) sensorische axonen omgeven door perineurium.',
    physiology: 'Geleidt tast-, druk-, temperatuur- en pijnprikkels vanuit de schachthuid, voorhuid en vooral de glans naar het sacrale ruggenmerg (S2–S4) en de hersenschors. Essentieel voor reflexogene erectie en het orgasme.',
    neurovascular: 'Loopt meest lateraal naast de aa. dorsales penis onder de fascia van Buck (op de "10- en 2-uur posities").',
    clinical: 'Moet strikt gespaard worden bij chirurgische correcties van de ziekte van Peyronie (mobilisatie neurovasculaire bundel) om gevoelsverlies in de eikel te voorkomen.',
    relatedPathologyId: 'ziekte-van-peyronie',
    hemoFocusId: 'node-para'
  },
  {
    id: 'nervi-cavernosi',
    name: 'Caverneuze zenuwen (Autonoom)',
    latin: 'Nervi cavernosi penis',
    category: 'neural',
    views: ['sagittal'],
    summary: 'Fijne autonome zenuwvezels uit de plexus pelvicus die de bloedstroom en erectiefysiologie rechtstreeks aansturen.',
    histology: 'Ongemyeliniseerde parasympathische (cholinerge/nitrerge met nNOS) en sympathische (noradrenerge) zenuwvezels die de trabekels en helicine arteriën innerveren.',
    physiology: 'Parasympathische vezels geven NO en acetylcholine vrij voor erectie; sympathische vezels geven noradrenaline vrij voor gladde-spiercontractie (flaccide toestand en detumescentie na ejaculatie).',
    neurovascular: 'Lopen posterolateraal langs de prostaat en membraanurethra voordat ze het corpus cavernosum binnendringen nabij de hilus.',
    clinical: 'Kwetsbaar tijdens radicale prostatectomie of bekkenchirurgie; beschadiging veroorzaakt neurogene erectiele disfunctie ondanks intacte bloedvaten.',
    relatedPathologyId: 'erectiele-disfunctie',
    hemoFocusId: 'node-no'
  }
];

export const ORIENTATION_TERMS = {
  dorsaal: {
    id: 'orient-dorsaal',
    badge: 'Anatomische oriëntatie',
    latin: 'Dorsum penis (12 uur)',
    title: 'Dorsaal (Rugzijde / Bovenzijde)',
    summary: 'In de anatomische standaardpositie (opgericht tegen de buikwand) is de rugzijde het oppervlak waar de twee grote corpora cavernosa en de diepe dorsale vaat-zenuwstreng lopen.',
    details: 'Chirurgen en urologen gebruiken op de dwarsdoorsnede vaak de klokrichting: 12 uur is dorsaal (boven), waar de diepe dorsale vene centraal ligt en de zenuwen op 10 en 2 uur passeren.'
  },
  ventraal: {
    id: 'orient-ventraal',
    badge: 'Anatomische oriëntatie',
    latin: 'Facies urethralis (6 uur)',
    title: 'Ventraal (Onderzijde / Urethrazijde)',
    summary: 'De onderzijde van de penis waar het ongepaarde corpus spongiosum, de plasbuis (urethra) en het voorhuidriempje (frenulum) zich bevinden.',
    details: 'Afwijkingen aan deze zijde zijn bijvoorbeeld hypospadie (meatusopening aan de ventrale zijde) of een te kort frenulum breve.'
  },
  proximaal: {
    id: 'orient-proximaal',
    badge: 'Anatomische oriëntatie',
    latin: 'Radix penis (Wortel)',
    title: 'Proximaal (Richting bekken / aanhechting)',
    summary: 'Het inwendige begin van de penis dat diep in het perineum verankerd zit met het schaambeen (os pubis), de bulbus penis en de twee crura.',
    details: 'Ongeveer een derde tot de helft van de totale lengte van de zwellichamen bevindt zich inwendig proximaal in het bekken.'
  },
  distaal: {
    id: 'orient-distaal',
    badge: 'Anatomische oriëntatie',
    latin: 'Pars libera (Eikelzijde)',
    title: 'Distaal (Richting uiteinde / Glans)',
    summary: 'Het vrij hangende uiteinde het verst verwijderd van het bekken, eindigend in de corona glandis, de glans penis en de meatus urethrae externus.',
    details: 'Hier vormt het sponslichaam het kapje (glans) over de stompe toppen van de twee corpora cavernosa.'
  },
  lateraal: {
    id: 'orient-lateraal',
    badge: 'Anatomische oriëntatie',
    latin: 'Latus (3 & 9 uur)',
    title: 'Lateraal (Zijkanten)',
    summary: 'De linker- en rechterflanken van de penisschacht.',
    details: 'Bij chirurgische benaderingen voor peniele injecties of shunts kiest men vaak de dorsolaterale zijden (bijv. 2 of 10 uur buiten de zenuwbundel of 3/9 uur), om zowel de dorsale zenuwen (12 uur) als de ventrale urethra (6 uur) te vermijden.'
  }
};

export const HEMODYNAMIC_PHASES = [
  {
    id: 'flaccid',
    min: 0,
    max: 15,
    title: 'Fase 0: Flaccide toestand (Rustfase)',
    badge: 'Sympathisch dominant',
    icpRange: [8, 12],
    flowRange: [2, 5],
    occlusionRange: [0, 8],
    cgmpRange: [4, 12],
    sinusoidScale: 0.34,
    arteryWidth: 4,
    veinWidth: 13,
    tunicaStretch: 0,
    muscleState: 'Gecontraheerd (Noradrenaline / Ca²⁺ hoog)',
    mechanism: 'Hoge sympathische tonus houdt de gladde spiercellen van de trabekels en arteriae helicinae samengetrokken. Er stroomt slechts minimaal arterieel bloed door het zwellichaam voor weefseloxygenatie, en bloed verlaat het weefsel ongehinderd via open subtunicale venulen en emissaire venen.'
  },
  {
    id: 'latent',
    min: 16,
    max: 40,
    title: 'Fase 1: Latente / Vullingsfase',
    badge: 'NO-afgifte & vasodilatatie',
    icpRange: [15, 32],
    flowRange: [28, 52],
    occlusionRange: [15, 35],
    cgmpRange: [25, 52],
    sinusoidScale: 0.56,
    arteryWidth: 9,
    veinWidth: 10,
    tunicaStretch: 0.25,
    muscleState: 'Beginnende relaxatie (nNOS → NO → cGMP)',
    mechanism: 'Parasympathische signalen (S2–S4) stimuleren zenuwuiteinden en endotheelcellen tot aanmaak van stikstofmonoxide (NO). NO activeert guanylaatcyclase, waardoor cGMP stijgt en intracellulair calcium daalt. De helicine arteriën verwijden zich sterk: arteriële instroom schiet omhoog.'
  },
  {
    id: 'tumescence',
    min: 41,
    max: 70,
    title: 'Fase 2: Tumescentiefase',
    badge: 'Sinusoïdale expansie',
    icpRange: [35, 68],
    flowRange: [40, 58],
    occlusionRange: [45, 76],
    cgmpRange: [55, 78],
    sinusoidScale: 0.80,
    arteryWidth: 12,
    veinWidth: 6.5,
    tunicaStretch: 0.6,
    muscleState: 'Uitgesproken gladde-spierrelaxatie',
    mechanism: 'De sinusoïden vullen zich snel met arterieel bloed. De lengte en omtrek nemen zichtbaar toe. Door het toenemende volume worden de subtunicale veneuze plexussen tegen de binnenwand van de tunica albuginea gedrukt.'
  },
  {
    id: 'full-erection',
    min: 71,
    max: 95,
    title: 'Fase 3: Volledige Erectie (Veno-occlusie)',
    badge: 'CVOM actief',
    icpRange: [75, 105],
    flowRange: [12, 26],
    occlusionRange: [88, 98],
    cgmpRange: [82, 96],
    sinusoidScale: 0.96,
    arteryWidth: 13,
    veinWidth: 2.2,
    tunicaStretch: 0.92,
    muscleState: 'Maximale sinusoïdale relaxatie',
    mechanism: 'Het Corporaal Veno-Occlusief Mechanisme (CVOM) is volledig actief: uitgezette sinusoïden drukken subtunicale venulen en schuin lopende emissaire venen bijna geheel dicht tegen de stugge tunica albuginea. De intracaverneuze druk nadert de systolische bloeddruk (~90–100 mmHg), waardoor netto instroom afvlakt tot onderhoudsniveau.'
  },
  {
    id: 'rigid',
    min: 96,
    max: 100,
    title: 'Fase 4: Rigide Erectie (Suprasystolisch)',
    badge: 'm. ischiocavernosus actief',
    icpRange: [120, 165],
    flowRange: [2, 8],
    occlusionRange: [98, 100],
    cgmpRange: [96, 100],
    sinusoidScale: 1.02,
    arteryWidth: 11,
    veinWidth: 1.4,
    tunicaStretch: 1.0,
    muscleState: 'Maximale relaxatie + bekkenbodemcontractie',
    mechanism: 'Contractie van de dwarsgestreepte musculus ischiocavernosus en bulbospongiosus drukt de basis van de zwellichamen samen. Hierdoor stijgt de intracaverneuze druk tijdelijk boven de systolische bloeddruk (suprasystolisch, >120 mmHg), wat maximale stijfheid oplevert voor penetratie en ejaculatie. Daarna zorgt sympathische noradrenaline en PDE5-afbraak van cGMP voor detumescentie.'
  }
];

export const SCENARIO_MODIFIERS = {
  normal: {
    id: 'normal',
    label: 'Fysiologisch normaal',
    description: 'Intacte endotheliale NO-productie, normale arteriële compliantie en volledig veno-occlusief mechanisme.',
    icpFactor: 1.0,
    flowFactor: 1.0,
    occlusionCap: 100,
    cgmpFactor: 1.0,
    pde5Blocked: false
  },
  pde5i: {
    id: 'pde5i',
    label: 'PDE5-remmer (bijv. Sildenafil / Tadalafil)',
    description: 'Blokkeert het enzym PDE5 dat cGMP afbreekt naar 5\'-GMP. Seksuele prikkel (NO) blijft nodig als startsignaal, maar cGMP blijft hoger en houdt sinusoïden langer ontspannen.',
    icpFactor: 1.08,
    flowFactor: 1.15,
    occlusionCap: 100,
    cgmpFactor: 1.35,
    pde5Blocked: true
  },
  endothelial: {
    id: 'endothelial',
    label: 'Arteriële / Endotheeldisfunctie',
    description: 'Verminderde NO-beschikbaarheid en vernauwde arteriae helicinae (bijv. door diabetes of atherosclerose) beperken de instroom en vertragen de vulling.',
    icpFactor: 0.52,
    flowFactor: 0.42,
    occlusionCap: 68,
    cgmpFactor: 0.48,
    pde5Blocked: false
  },
  venousLeak: {
    id: 'venousLeak',
    label: 'Veno-occlusieve disfunctie ("Veneuze lekkage")',
    description: 'Ondanks normale arteriële aanvoer sluiten de subtunicale venulen onvoldoende tegen de tunica albuginea (bijv. door trabekelfibrose), waardoor druk weglekt.',
    icpFactor: 0.45,
    flowFactor: 1.12,
    occlusionCap: 48,
    cgmpFactor: 0.85,
    pde5Blocked: false
  }
};

export const HEMO_HOTSPOTS = {
  'hemo-tunica': {
    id: 'hemo-tunica',
    title: 'Tunica albuginea (Drukbarrière)',
    subtitle: 'Micro-vasculair CVOM',
    detail: 'Deze taaie, nauwelijks rekbare tweelagige bindweefselkapsel vormt de tegendruk voor het veno-occlusieve mechanisme. Zonder deze stevige buitenwand zou het bloed niet onder druk blijven staan.',
    clinicalTip: 'Kliniek: Littekenplaque in de tunica veroorzaakt kromstand (Ziekte van Peyronie); te veel elasticiteitsverlies veroorzaakt veneuze lekkage.',
    actionLabel: 'Bekijk in Anatomie Atlas',
    actionType: 'anatomy',
    actionPayload: 'tunica-albuginea'
  },
  'hemo-venule': {
    id: 'hemo-venule',
    title: 'Subtunicale venulen & Vena emissaria',
    subtitle: 'Veneuze afvoer & occlusie',
    detail: 'In rusttoestand voeren deze venen bloed vrijuit af. Naarmate de caverneuze sinusoïde opzwelt, worden de venulen platgedrukt tegen de tunica albuginea en de schuin doorborende vena emissaria afgekneld.',
    clinicalTip: 'Kliniek: Werkt de compressie onvoldoende, dan daalt de stijfheid ondanks normale slagaderlijke doorbloeding ("veneuze lekkage").',
    actionLabel: 'Simuleer veneuze lekkage',
    actionType: 'scenario',
    actionPayload: 'venousLeak'
  },
  'hemo-trabecula': {
    id: 'hemo-trabecula',
    title: 'Trabekulair glad spierweefsel',
    subtitle: 'Mechanische schakelaar van de erectie',
    detail: 'In rust zorgen noradrenaline en hoge intracellulaire Ca²⁺-spiegels voor samentrekking van deze spierbundels. Ontspanning onder invloed van cGMP opent de sponsachtige bloedkamers.',
    clinicalTip: 'Kliniek: Stress en koude geven sympathische adrenaline-afgifte, waardoor deze spiertjes direct samentrekken en een erectie afneemt.',
    actionLabel: 'Simuleer sympathische stress-puls',
    actionType: 'stress',
    actionPayload: null
  },
  'hemo-sinusoid': {
    id: 'hemo-sinusoid',
    title: 'Caverneuze sinusoïde (Lacuna)',
    subtitle: 'Endotheelbeklede bloedkamer',
    detail: 'Duizenden van deze met elkaar verbonden holten vullen zich met arterieel bloed zodra de gladde spieren ontspannen. De oplopende vulling drukt het weefsel naar buiten tegen de tunica.',
    clinicalTip: 'Kliniek: Bij ischemisch priapisme stagneert zuurstofarm bloed langer dan 4 uur in deze sinusoïden, wat leidt tot weefselschade.',
    actionLabel: 'Bekijk Corpus cavernosum in Atlas',
    actionType: 'anatomy',
    actionPayload: 'corpus-cavernosum'
  },
  'hemo-artery': {
    id: 'hemo-artery',
    title: 'Arteria helicina (Krulslagader)',
    subtitle: 'Arteriële aanvoer',
    detail: 'In slappe toestand liggen deze zijtakken van de arteria profunda penis gekruld en vernauwd. NO/cGMP doet het vat strekken en verwijden, waardoor de arteriële flow met factor 10–20 kan toenemen.',
    clinicalTip: 'Kliniek: Endotheelschade door roken, diabetes of hoge bloeddruk vernauwt deze haarvaten vaak jaren vóór coronaire hartklachten.',
    actionLabel: 'Simuleer endotheeldisfunctie',
    actionType: 'scenario',
    actionPayload: 'endothelial'
  },
  'node-para': {
    id: 'node-para',
    title: '1. Parasympathicus (S2–S4) & Endotheel',
    subtitle: 'Neurale & schuispannings-trigger',
    detail: 'Zowel psychogene prikkels vanuit de hersenen als directe tastprikkels vanuit de glans (via n. dorsalis naar sacraal ruggenmerg S2–S4) activeren parasympathische caverneuze zenuwen (nNOS) en endotheelcellen (eNOS).',
    clinicalTip: 'Kliniek: Schade aan bekkenzenuwen (bijv. na prostaatoperatie) verstoort deze allereerste schakel.',
    actionLabel: 'Start volledige erectiecyclus',
    actionType: 'cycle',
    actionPayload: null
  },
  'node-no': {
    id: 'node-no',
    title: '2. Stikstofmonoxide (NO) → sGC',
    subtitle: 'Gasvormige boodschapper',
    detail: 'nNOS en eNOS zetten het aminozuur L-arginine om in stikstofmonoxide (NO). NO diffundeert direct naar naburige gladde spiercellen en activeert oplosbaar guanylaatcyclase (sGC).',
    clinicalTip: 'Kliniek: PDE5-remmers werken alleen als er eerst NO vrijkomt door seksuele stimulatie; zonder NO wordt geen cGMP aangemaakt.',
    actionLabel: 'Bekijk Nn. cavernosi in Atlas',
    actionType: 'anatomy',
    actionPayload: 'nervi-cavernosi'
  },
  'node-cgmp': {
    id: 'node-cgmp',
    title: '3. GTP → cGMP (Second messenger)',
    subtitle: 'Intracellulaire signaalversterker',
    detail: 'Geactiveerd guanylaatcyclase zet GTP om in cyclisch GMP (cGMP). Hoe hoger de concentratie cGMP, hoe sterker en langduriger de ontspanning van het caverneuze spierweefsel.',
    clinicalTip: 'Kliniek: De balans tussen aanmaak door sGC en afbraak door PDE5 bepaalt de concentratie cGMP.',
    actionLabel: 'Zet tumescentie naar Veno-occlusie (86%)',
    actionType: 'arousal',
    actionPayload: 86
  },
  'node-pde5': {
    id: 'node-pde5',
    title: 'PDE5-enzym (Fosfodiësterase type 5)',
    subtitle: 'Afbraak van cGMP naar 5\'-GMP',
    detail: 'PDE5 is een lichaamseigen enzym in het zwellichaam dat cGMP continu afbreekt naar inactief 5\'-GMP om de erectie uiteindelijk weer te kunnen beëindigen.',
    clinicalTip: 'Farmacologie: PDE5-remmers (sildenafil, tadalafil) blokkeren deze stap, zodat cGMP hoog blijft bij seksuele prikkeling. Gecontra-indiceerd bij nitraatgebruik!',
    actionLabel: 'Schakel PDE5-remmer aan / uit',
    actionType: 'toggle-pde5',
    actionPayload: null
  },
  'node-ca': {
    id: 'node-ca',
    title: '4. PKG-activatie → Ca²⁺-daling',
    subtitle: 'Ionkanaal-regulatie',
    detail: 'cGMP activeert proteïnekinase G (PKG). Dit opent kaliumkanalen en sluit calciumkanalen, waardoor de intracellulaire calciumconcentratie (Ca²⁺) daalt en het contractiele actine-myosinecomplex loslaat.',
    clinicalTip: 'Fysiologie: Calciumdaling is de directe biochemische oorzaak van gladde-spierontspanning.',
    actionLabel: 'Reset naar fysiologisch normaal',
    actionType: 'scenario',
    actionPayload: 'normal'
  },
  'node-relax': {
    id: 'node-relax',
    title: '5. Gladde spierrelaxatie & Vasodilatatie',
    subtitle: 'Vulling & veno-occlusie',
    detail: 'Door relaxatie van zowel de arteriae helicinae als de trabekelspieren stroomt arterieel bloed onder hoge druk naar binnen, zwellen de sinusoïden en start de mechanische compressie van de afvoeraderen.',
    clinicalTip: 'Kliniek: Ook bij maximale relaxatie levert de bekkenbodem (m. ischiocavernosus) nog de laatste stijfheidssprong.',
    actionLabel: 'Simuleer rigide piek (100%)',
    actionType: 'arousal',
    actionPayload: 100
  },
  'metric-icp': {
    id: 'metric-icp',
    title: 'Telemetrie: Intracaverneuze Druk (ICP)',
    subtitle: 'Normaal: ~10 mmHg (rust) → 90–160 mmHg (erectie)',
    detail: 'De druk binnen de corpora cavernosa bepaalt de axiale stijfheid. Rond 90–100 mmHg bereikt de druk het niveau van de systolische bloeddruk; contractie van de m. ischiocavernosus duwt de druk suprasystolisch (>120 mmHg).',
    clinicalTip: 'Diagnostiek: Wordt experimenteel gemeten via cavernosometrie. Voor voldoende stijfheid voor penetratie is doorgaans >70–80 mmHg nodig.',
    actionLabel: 'Bekijk bekkenbodemspieren in Atlas',
    actionType: 'anatomy',
    actionPayload: 'bekkenbodem-spieren'
  },
  'metric-flow': {
    id: 'metric-flow',
    title: 'Telemetrie: Cavernosa Arteriële Flow',
    subtitle: 'Piek tijdens vulling, daalt zodra kamer vol is',
    detail: 'Opvallend fysiologisch detail: de hoogste instroomsnelheid (40–60 mL/min) treedt op tijdens de latente en vroege tumescentiefase! Zodra de druk stijgt naar de systolische druk, daalt de netto flow naar een onderhoudsniveau.',
    clinicalTip: 'Diagnostiek: Bij kleuren-Duplex echografie geldt een Peak Systolic Velocity (PSV) >30–35 cm/s in de a. profunda als arteriële normaalwaarde.',
    actionLabel: 'Bekijk A. profunda in Atlas',
    actionType: 'anatomy',
    actionPayload: 'arteria-profunda'
  },
  'metric-occlusion': {
    id: 'metric-occlusion',
    title: 'Telemetrie: Veneuze Occlusie (CVOM)',
    subtitle: 'Doel tijdens erectie: >90% compressie',
    detail: 'Meet welk percentage van de subtunicale en emissaire afvoer is dichtgedrukt tussen de gezwollen sinusoïden en de tunica albuginea.',
    clinicalTip: 'Diagnostiek: Bij kleuren-Duplex echo wijst een aanhoudend hoge End-Diastolic Velocity (EDV >5 cm/s) tijdens maximale stimulatie op veneuze lekkage.',
    actionLabel: 'Bekijk Emissaire venen in Atlas',
    actionType: 'anatomy',
    actionPayload: 'venae-emissariae'
  },
  'metric-cgmp': {
    id: 'metric-cgmp',
    title: 'Telemetrie: Intracellulair cGMP-niveau',
    subtitle: 'Balans tussen sGC (aanmaak) en PDE5 (afbraak)',
    detail: 'Geeft de relatieve intracellulaire concentratie van cyclisch GMP weer. Zolang cGMP hoog blijft en sympathische noradrenaline laag blijft, blijft de sinusoïde ontspannen.',
    clinicalTip: 'Farmacologie: PDE5-remmers verhogen dit signaal aanzienlijk zodra er seksuele prikkeling aanwezig is.',
    actionLabel: 'Schakel PDE5-remmer aan / uit',
    actionType: 'toggle-pde5',
    actionPayload: null
  }
};

export const PATHOLOGIES = [
  {
    id: 'priapisme',
    name: 'Priapisme (Ischemisch vs. Non-ischemisch)',
    category: 'urgent',
    badge: 'Medisch spoedgeval (>4 uur)',
    visualType: 'priapism',
    relatedAnatomyId: 'corpus-cavernosum',
    shortDesc: 'Langdurige, ongewenste erectie (>4 uur) zonder seksuele prikkel. Ischemische vorm leidt zonder spoedbehandeling tot blijvende fibrose.',
    pathophysiology: 'Bij ischemisch (low-flow) priapisme (95% van de gevallen) is de veneuze afvoer volledig geblokkeerd: de corpora cavernosa zijn keihard en pijnlijk terwijl de glans slap blijft, met zuurstoftekort en acidose tot gevolg. Non-ischemisch (high-flow) priapisme ontstaat meestal na perineaal trauma met een arteriële fistel en is pijnloos.',
    symptoms: [
      'Aanhoudende erectie langer dan 4 uur onafhankelijk van seksuele stimulatie',
      'Ischemisch: diepe, toenemende pijn, keiharde schacht maar zachte glans',
      'Non-ischemisch: pijnloze, deels elastische erectie na stomp perineaal trauma'
    ],
    diagnostics: 'Caverneuze bloedgasanalyse (pO₂ < 30 mmHg, pCO₂ > 60 mmHg, pH < 7.25 wijst op ischemie) en kleuren-Doppler echografie van de peniele arteriën.',
    treatment: 'Ischemisch priapisme vereist directe spoedzorg: aspiratie van zuurstofarm bloed uit de corpora cavernosa, spoeling en intracaverneuze injectie van een alfa-agonist (fenylefrine). Bij uitblijven van effect is chirurgische shuntvorming nodig.',
    redFlags: 'Elke pijnlijke erectie die langer dan 4 uur aanhoudt is een urologisch spoedgeval (risico op irreversibele erectiele disfunctie na 24–48 uur).'
  },
  {
    id: 'fimose-parafimose',
    name: 'Fimose & Parafimose',
    category: 'urgent',
    badge: 'Parafimose = Spoedgeval',
    visualType: 'phimosis',
    relatedAnatomyId: 'preputium-frenulum',
    shortDesc: 'Fimose is een te nauwe voorhuidopening; parafimose is een achter de eikel beklemde voorhuid met afknelling van de bloedstroom.',
    pathophysiology: 'Fysiologische fimose bij jonge jongens verdwijnt meestal spontaan. Pathologische fimose ontstaat door littekenvorming (bijv. lichen sclerosus of chronische balanitis). Als een nauwe voorhuid achter de corona wordt geschoven en niet terugkomt, ontstaat een snoerende ring (parafimose) met lymfe- en veneuze stuwing.',
    symptoms: [
      'Fimose: voorhuid kan niet over de glans worden teruggetrokken, soms "ballooning" tijdens plassen',
      'Parafimose: pijnlijke gezwollen glans en oedemateuze kraag achter de eikel',
      'Kans op lokale ontsteking (balanoposthitis) door ophoping van smegma'
    ],
    diagnostics: 'Klinisch lichamelijk onderzoek zonder pijnlijke manipulatie; bij littekenring inspectie op lichen sclerosus.',
    treatment: 'Fimose: lokale corticosteroïdzalf (bijv. clobetasol/betamethason) gedurende 4–8 weken met voorzichtig oprekken; bij falen circumcisie of preputioplastiek. Parafimose: directe manuele compressie van oedeem en repositie (evt. onder peniele blokverdoving) of dorsale incisie.',
    redFlags: 'Bij een achter de eikel vastzittende voorhuid met toenemende zwelling, pijn of blauwverkleuring direct spoedhulp zoeken.'
  },
  {
    id: 'ziekte-van-peyronie',
    name: 'Ziekte van Peyronie (Induratio penis plastica)',
    category: 'condition',
    badge: 'Bindweefselaandoening',
    visualType: 'peyronie',
    relatedAnatomyId: 'tunica-albuginea',
    shortDesc: 'Vorming van fibreuze bindweefselplaques in de tunica albuginea, leidend tot verkromming, verkorting of pijn bij erectie.',
    pathophysiology: 'Vermoedelijk veroorzaakt door herhaald microtrauma van de tunica albuginea met afwijkende wondgenezing en myofibroblast-activatie (TGF-β1). Het stugge littekenweefsel rekt bij erectie niet mee, waardoor de penis naar de zijde van de plaque kromtrekt.',
    symptoms: [
      'Voelbare verharding (plaque) in de schacht, meestal aan de dorsale zijde',
      'Kromstand (curvatuur), zandlopervorming of scharnierinstabiliteit tijdens erectie',
      'Pijn tijdens erectie in de acute inflammatoire fase (eerste 6–12 maanden)'
    ],
    diagnostics: 'Palpatie in slappe toestand, meting van krommingshoek na opgewekte erectie (of foto thuis in 2 richtingen) en echografie voor verkalkingen.',
    treatment: 'Acute fase: pijnstilling, eventueel tractietherapie. Stabiele chronische fase (na >3–6 mnd zonder progressie): intralesionale injecties (bijv. collagenase waar beschikbaar), chirurgische plicatie (Nesbit) of plaque-incisie met transplantaat bij ernstige kromstand (>30–60°).',
    redFlags: 'Acuut ontstaan van een knakgeluid gevolgd door direct verlies van erectie en snel groeiende bloeduitstorting is géén Peyronie maar een acute penisfractuur (spoedoperatie).'
  },
  {
    id: 'erectiele-disfunctie',
    name: 'Erectiele Disfunctie (ED)',
    category: 'condition',
    badge: 'Vaak vasculair signaal',
    visualType: 'ed',
    relatedAnatomyId: 'arteria-profunda',
    shortDesc: 'Aanhoudend onvermogen (>3–6 mnd) om een erectie te krijgen of te behouden die voldoende is voor bevredigende seksuele activiteit.',
    pathophysiology: 'Meestal multifactorieel: vasculogeen (endotheeldisfunctie en atherosclerose van de kleine aa. cavernosae), neurogeen (diabetes, bekkenchirurgie), hormonaal (hypogonadisme), medicamenteus (bètablokkers, SSRI\'s) of psychogeen (prestatieangst).',
    symptoms: [
      'Verminderde rigiditeit of voortijdig wegzakken van de erectie',
      'Afwezigheid van ochtend- en nachtelijke erecties wijst vaker op een organische (vaat/zenuw) oorzaak',
      'Behouden ochtenderecties duiden vaker op een situationele of psychogene component'
    ],
    diagnostics: 'Uitgebreide anamnese (IIEF-5 score), cardiovasculaire risicoprofilering (bloeddruk, glucose/HbA1c, lipiden, ochtendtestosteron), zonodig peniele Duplex-echografie.',
    treatment: 'Leefstijlaanpassing (stoppen met roken, beweging), orale PDE5-remmers (sildenafil, tadalafil — gecontra-indiceerd bij nitraatgebruik!), vacuümpomp, intracaverneuze injecties (alprostadil) of penisprothese bij therapieresistente ED.',
    redFlags: 'Vasculogene ED bij mannen van 40–60 jaar gaat gemiddeld 3 tot 5 jaar vooraf aan symptomatische hart- en vaatziekten ("kanarie in de kolenmijn").'
  },
  {
    id: 'balanitis',
    name: 'Balanitis & Balanoposthitis',
    category: 'condition',
    badge: 'Ontsteking',
    visualType: 'balanitis',
    relatedAnatomyId: 'glans-penis',
    shortDesc: 'Ontsteking van de glans penis (balanitis) en vaak ook het binnenblad van de voorhuid (balanoposthitis).',
    pathophysiology: 'Ontstaat vaak door ophoping van vocht/smegma, overgroei van schimmels (Candida albicans), bacteriële infecties, irritatie door agressieve zepen of een onderliggende huidaandoening zoals lichen sclerosus of diabetes mellitus.',
    symptoms: [
      'Roodheid, zwelling, jeuk of branderig gevoel van de eikel en voorhuid',
      'Witte of gelige afscheiding en onaangename geur',
      'Pijnlijk plassen of microscheurtjes in de voorhuid'
    ],
    diagnostics: 'Klinische beoordeling; bij recidieven kweek afnemen en bloedsuiker bepalen (diabetesuitsluiting). Bij hardnekkige plaques biopsie om premaligne afwijkingen (zoals erythroplasie van Queyrat) uit te sluiten.',
    treatment: 'Milde vormen: spoelen met lauw water zonder zeep en goed droogdeppen. Candida: lokale antimycoticumcrème (miconazol/clotrimazol). Lichen sclerosus: sterk werkende lokale steroïden.',
    redFlags: 'Niet-genezende zweertjes, bloedende wratachtige laesies of een verharde zweer (ulcus) langer dan 3 weken vereisen beoordeling door arts/dermatoloog.'
  },
  {
    id: 'hypospadie',
    name: 'Hypospadie (Aangeboren aanlegvariatie)',
    category: 'condition',
    badge: 'Congenitaal',
    visualType: 'hypospadias',
    relatedAnatomyId: 'urethra',
    shortDesc: 'Aangeboren anatomische variatie waarbij de plasbuisopening (meatus) niet op de top, maar aan de onderzijde (ventraal) uitmondt.',
    pathophysiology: 'Onvolledige sluiting van de urethrale groeve tijdens de foetale ontwikkeling (week 8–14). Vaak gecombineerd met een aan de onderzijde ontbrekende voorhuid ("dorsale kap") en soms een ventrale verkromming (chordee).',
    symptoms: [
      'Meatusopening op de onderkant van de glans, schacht of zelden perineaal',
      'Afbuigende urinestraal naar beneden',
      'Typische gespleten voorhuid aan de ventrale zijde'
    ],
    diagnostics: 'Vastgesteld bij lichamelijk onderzoek direct na geboorte. Bij ernstige proximale vormen met niet-ingedaalde testikels genetisch/endocrinologisch onderzoek.',
    treatment: 'Lichte glandulaire vormen zonder functionele hinder hoeven niet altijd geopereerd te worden. Indien gewenst of bij schachthypospadie vindt chirurgische reconstructie (urethroplastiek) bij voorkeur plaats tussen 6 en 18 maanden leeftijd. Belangrijk: voorhuid niet voortijdig besnijden want die wordt gebruikt voor reconstructie!',
    redFlags: 'Bij een pasgeborene met hypospadie altijd eerst uroloog laten beoordelen vóór eventuele circumcisie.'
  },
  {
    id: 'parelpapels',
    name: 'Parelpapels (Hirsuties papillaris genitalis)',
    category: 'variant',
    badge: 'Goedaardige variant',
    visualType: 'pearly',
    relatedAnatomyId: 'glans-penis',
    shortDesc: 'Volledig onschuldige, symmetrische rijtjes kleine witte of huidkleurige bultjes langs de rand van de eikel (corona glandis).',
    pathophysiology: 'Normale anatomische angiofibromen die voorkomen bij circa 15% tot 30% van alle mannen, meestal zichtbaar vanaf de puberteit. Het is GEEN seksueel overdraagbare aandoening (geen HPV/genitale wratten) en is niet besmettelijk.',
    symptoms: [
      'Uniforme, gladde, koepelvormige papeltjes van 1–2 mm in één of meerdere rijen langs de coronarand',
      'Volledig pijnloos en zonder jeuk, bloeding of verandering over de tijd',
      'Vaak verward met condylomata (genitale wratten), die echter onregelmatig en bloemkoolachtig verspreid liggen'
    ],
    diagnostics: 'Klinische inspectie (evt. met dermatoscoop); er is geen labtest of biopsie nodig.',
    treatment: 'Geen behandeling nodig of medisch geïndiceerd — geruststelling volstaat. Alleen bij extreme cosmetische last is CO₂-laserablatie mogelijk.',
    redFlags: 'Niet uitknijpen of behandelen met agressieve wrattenmiddelen; dit veroorzaakt littekens.'
  },
  {
    id: 'fordyce-plekjes',
    name: 'Fordyce-plekjes & Zichtbare talgkliertjes',
    category: 'variant',
    badge: 'Goedaardige variant',
    visualType: 'fordyce',
    relatedAnatomyId: 'cutis-dartos',
    shortDesc: 'Kleine (1–3 mm) lichtgele of witachtige bultjes op de schachthuid of het scrotum: volkomen normale, ectopische talgklieren.',
    pathophysiology: 'Normaal aanwezige talgklieren die direct onder het oppervlakkige epitheel liggen zonder haarfollikel. Komen voor bij meer dan 70% van de volwassenen (ook in de mondslijmvliezen) en worden door androgenen vanaf de puberteit beter zichtbaar.',
    symptoms: [
      'Vlakke tot licht verheven witgele speldeknopjes op de penisschacht',
      'Worden duidelijker wanneer de huid strakgetrokken wordt',
      'Geven geen klachten, pijn of besmetting'
    ],
    diagnostics: 'Visuele herkenning; volstrekt fysiologisch verschijnsel.',
    treatment: 'Geen medische behandeling vereist.',
    redFlags: 'Alleen bij ontsteking, snelle groei of ulceratie laten beoordelen.'
  }
];

export const SYMPTOM_CHECKER_TAGS = [
  { id: 'all', label: 'Alle signalen', matchIds: null },
  { id: 'pain-erection-4h', label: 'Pijnlijke erectie >4 uur', matchIds: ['priapisme'] },
  { id: 'tight-foreskin', label: 'Beklemde / nauwe voorhuid', matchIds: ['fimose-parafimose'] },
  { id: 'curvature', label: 'Kromstand / verharde schijf', matchIds: ['ziekte-van-peyronie'] },
  { id: 'soft-erection', label: 'Erectie blijft niet stijf', matchIds: ['erectiele-disfunctie'] },
  { id: 'redness', label: 'Roodheid, jeuk of schilfering eikel', matchIds: ['balanitis'] },
  { id: 'corona-bumps', label: 'Witte bultjes langs eikelrand', matchIds: ['parelpapels'] },
  { id: 'shaft-spots', label: 'Witgele plekjes op schachthuid', matchIds: ['fordyce-plekjes'] },
  { id: 'ventral-opening', label: 'Plasopening aan onderzijde', matchIds: ['hypospadie'] }
];

export const SELF_EXAM_STEPS = [
  {
    step: 1,
    zoneId: 'zone-shaft',
    anatomyId: 'cutis-dartos',
    title: 'Algemene inspectie van huid & schacht',
    detail: 'Bekijk bij goed licht de huid van de schacht en de basis. Let op nieuwe verkleuringen, wondjes die niet binnen 2–3 weken genezen, of ongebruikelijke zwellingen. Onthoud dat zichtbare haarzakjes en Fordyce-plekjes volkomen normaal zijn.'
  },
  {
    step: 2,
    zoneId: 'zone-glans',
    anatomyId: 'preputium-frenulum',
    title: 'Voorhuid & Eikel (Glans en Corona)',
    detail: 'Schuif (indien onbesneden) de voorhuid rustig en zonder forceren terug. Spoel de ruimte onder de voorhuid dagelijks met lauw water (zonder geparfumeerde zeep) om smegma-ophoping en balanitis te voorkomen. Controleer het frenulum en de coronarand (parelpapels zijn normaal).'
  },
  {
    step: 3,
    zoneId: 'zone-meatus',
    anatomyId: 'fossa-navicularis-meatus',
    title: 'Plasbuisopening (Meatus) & Urinestraal',
    detail: 'Bekijk het uiteinde van de eikel: een spleetvormige, lichtroze opening zonder korstjes, afscheiding of roodheid is gezond. Let op veranderingen zoals een gespleten straal of branderig gevoel bij het plassen.'
  },
  {
    step: 4,
    zoneId: 'zone-corpora',
    anatomyId: 'corpus-cavernosum',
    title: 'Palpatie van de schacht (Zwellichamen)',
    detail: 'Voel in slappe toestand voorzichtig langs beide corpora cavernosa. Normaal weefsel voelt egaal en zacht-elastisch aan. Harde strengen of schijfjes (plaques) kunnen wijzen op beginnende bindweefselvorming (Peyronie) of oppervlakkige flebitis.'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Welke anatomische structuur vormt een stevige bindweefselmantel rond de corpora cavernosa en maakt het veno-occlusieve mechanisme mogelijk?',
    options: [
      'Tunica dartos',
      'Tunica albuginea',
      'Fascia spermatica externa',
      'Corpus spongiosum'
    ],
    correctIndex: 1,
    explanation: 'De tweelagige tunica albuginea begrenst de zwellichamen en drukt bij toenemend volume de subtunicale venulen en emissaire venen dicht, waardoor het bloed wordt vastgehouden en hoge erectiedruk ontstaat.'
  },
  {
    id: 2,
    question: 'Welke neurotransmitter speelt de sleutelrol als directe trigger voor gladde-spierrelaxatie in de peniele trabekels en helicine arteriën?',
    options: [
      'Noradrenaline',
      'Stikstofmonoxide (NO)',
      'Endotheline-1',
      'Testosteron'
    ],
    correctIndex: 1,
    explanation: 'Parasympathische zenuwen (nNOS) en endotheelcellen (eNOS) produceren stikstofmonoxide (NO), dat via sGC en cGMP de calciumconcentratie in gladde spiercellen verlaagt en zo vasodilatatie teweegbrengt.'
  },
  {
    id: 3,
    question: 'Waarom blijft de urinebuis (urethra) tijdens een volledige erectie doorgankelijk voor ejaculatie?',
    options: [
      'De urethra ligt boven de corpora cavernosa in de fascia van Buck',
      'Het corpus spongiosum heeft een dunnere tunica albuginea en bereikt een lagere druk dan de corpora cavernosa',
      'De v. dorsalis profunda pompt actief lucht in het sponslichaam',
      'De musculus ischiocavernosus trekt de plasbuis open'
    ],
    correctIndex: 1,
    explanation: 'Het corpus spongiosum en de glans hebben een veel dunnere, elastischere tunica albuginea. Daardoor stijgt de druk daar minder hoog dan in de corpora cavernosa en wordt de urethra niet dichtgedrukt.'
  },
  {
    id: 4,
    question: 'Wat is de medische betekenis van kleine, regelmatige witte bultjes in een rijtje langs de rand van de eikel (corona glandis)?',
    options: [
      'Altijd een teken van HPV-besmetting (genitale wratten)',
      'Een voorstadium van peniskanker',
      'Goedaardige parelpapels (hirsuties papillaris genitalis), een normale anatomische variant',
      'Inwendige talgcysten die operatief verwijderd moeten worden'
    ],
    correctIndex: 2,
    explanation: 'Hirsuties papillaris genitalis (parelpapels) komt voor bij 15–30% van de mannen. Het is een volkomen onschuldige, niet-besmettelijke anatomische variant die geen behandeling nodig heeft.'
  },
  {
    id: 5,
    question: 'Welke van de volgende situaties geldt als een acuut urologisch spoedgeval waarbij directe medische hulp vereist is?',
    options: [
      'Een pijnlijke erectie die langer dan 4 uur aanhoudt zonder seksuele prikkel',
      'Een lichte kromstand die al sinds de puberteit stabiel aanwezig is',
      'Zichtbare Fordyce-plekjes op de penisschacht',
      'Een eenmalige ochtenderectie van 20 minuten'
    ],
    correctIndex: 0,
    explanation: 'Een pijnlijke erectie >4 uur (ischemisch priapisme) leidt tot ernstig zuurstoftekort en verzuring in het caverneuze weefsel. Zonder snelle decompressie ontstaat blijvende fibrose en erectiele disfunctie.'
  },
  {
    id: 6,
    question: 'Waarom is vasculogene erectiele disfunctie bij mannen van middelbare leeftijd een belangrijk klinisch waarschuwingssignaal?',
    options: [
      'Omdat de peniele arteriën een kleinere diameter (~0,5–1 mm) hebben dan kransslagaders en atherosclerose daar vaak eerder klachten geeft',
      'Omdat erectiele disfunctie altijd wijst op een acuut nierfalen',
      'Omdat de n. dorsalis penis verbonden is met de nervus vagus',
      'Omdat cGMP uitsluitend in de lever wordt aangemaakt'
    ],
    correctIndex: 0,
    explanation: 'Door de kleinere diameter van de aa. cavernosae (~0,5–1 mm vs. 3–4 mm voor coronaire arteriën) manifesteert systemische endotheeldisfunctie en atherosclerose zich vaak 3–5 jaar eerder in de penis dan in het hart.'
  }
];
