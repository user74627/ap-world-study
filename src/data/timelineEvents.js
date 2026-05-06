/* ================================================================
   AP World History — Timeline Events Data
   ~50 key events across all 4 eras with cause-effect connections.
   Each event belongs to one unit; eras group multiple units.
================================================================ */

var TIMELINE_ERAS = [
  {
    id: 'era-1',
    label: 'c. 1200\u20131450',
    unitIds: [1, 2],
    startYear: 1200,
    endYear: 1450
  },
  {
    id: 'era-2',
    label: 'c. 1450\u20131750',
    unitIds: [3, 4],
    startYear: 1450,
    endYear: 1750
  },
  {
    id: 'era-3',
    label: 'c. 1750\u20131900',
    unitIds: [5, 6],
    startYear: 1750,
    endYear: 1900
  },
  {
    id: 'era-4',
    label: 'c. 1900\u2013present',
    unitIds: [7, 8, 9],
    startYear: 1900,
    endYear: 2025
  }
];

var TIMELINE_EVENTS = [

  /* ── ERA 1: c. 1200–1450 (Units 1 & 2) ─────────────────── */

  {
    id: 'song-dynasty',
    year: 1127,
    yearLabel: 'c. 1127',
    title: 'Song Dynasty (Southern Song)',
    region: 'East Asia',
    unitId: 1,
    description: 'The Southern Song Dynasty continued in China after northern conquest, producing remarkable innovations: civil service exams based on Neo-Confucianism selected merit-based scholar-gentry, paper money was issued, and champa rice from Vietnam doubled agricultural yields.',
    ledTo: [
      'Civil service examination model spread to neighboring states',
      'Agricultural surplus supported population growth and urbanization',
      'Chinese innovations (gunpowder, compass, printing) diffused along trade routes'
    ]
  },
  {
    id: 'mongol-rise',
    year: 1206,
    yearLabel: '1206',
    title: 'Mongol Empire Founded',
    region: 'Central Asia',
    unitId: 1,
    description: 'Genghis Khan united the steppe nomad tribes and launched a campaign of conquest that would create the largest contiguous land empire in history, stretching from the Pacific to Eastern Europe.',
    ledTo: [
      'Pax Mongolica secured Silk Road trade for a century',
      'Conquest disrupted and then reconnected Eurasian trade networks',
      'Facilitated spread of the Black Death along trade routes'
    ]
  },
  {
    id: 'mali-empire',
    year: 1235,
    yearLabel: 'c. 1235',
    title: 'Mali Empire Rises Under Sundiata',
    region: 'West Africa',
    unitId: 1,
    description: 'Sundiata Keita founded the Mali Empire, which controlled the lucrative trans-Saharan gold-salt trade. Mali grew into one of the wealthiest states in the medieval world, centered on Timbuktu as a hub of Islamic scholarship.',
    ledTo: [
      'Timbuktu became a major center of Islamic learning',
      'West African gold funded Mediterranean and Indian Ocean commerce',
      'Mansa Musa\'s later pilgrimage displayed African wealth to the world'
    ]
  },
  {
    id: 'mongols-baghdad',
    year: 1258,
    yearLabel: '1258',
    title: 'Mongols Sack Baghdad',
    region: 'Middle East',
    unitId: 1,
    description: 'Hulagu Khan\'s Mongol army destroyed the Abbasid Caliphate, killing the caliph and burning the great libraries of Baghdad — an event often called the end of the Islamic Golden Age. The Tigris River reportedly ran black with ink from destroyed books.',
    ledTo: [
      'Permanent end of the Abbasid Caliphate',
      'Shift of Islamic cultural center to Cairo and Anatolia',
      'Opened path for Mongol control of Persian and Iraqi trade'
    ]
  },
  {
    id: 'marco-polo',
    year: 1271,
    yearLabel: '1271\u20131295',
    title: 'Marco Polo Travels to China',
    region: 'Eurasia',
    unitId: 2,
    description: 'Venetian merchant Marco Polo traveled across Central Asia to Kublai Khan\'s court in China, spending 17 years in the East. His account, Il Milione, described the wealth of China and Asia to an astonished European audience.',
    ledTo: [
      'Inspired European desire for direct access to Asian trade',
      'Contributed to later motivation for Columbus and da Gama\'s voyages',
      'Spread knowledge of Chinese innovations to European readers'
    ]
  },
  {
    id: 'mansa-musa-hajj',
    year: 1324,
    yearLabel: '1324',
    title: 'Mansa Musa\'s Pilgrimage to Mecca',
    region: 'Africa / Middle East',
    unitId: 2,
    description: 'Mali Emperor Mansa Musa traveled to Mecca with an entourage of 60,000 people and 80 camels loaded with gold, distributing wealth so generously that he caused gold inflation across North Africa and the Middle East for a decade.',
    ledTo: [
      'Collapsed gold prices across the Mediterranean for over a decade',
      'Placed Mali on European maps for the first time',
      'Attracted Islamic scholars to Timbuktu, expanding education'
    ]
  },
  {
    id: 'black-death',
    year: 1347,
    yearLabel: '1347\u20131353',
    title: 'Black Death Reaches Europe',
    region: 'Eurasia',
    unitId: 2,
    description: 'The bubonic plague, spreading from Central Asia along Mongol trade routes, reached the Mediterranean and swept through Europe, killing an estimated one-third of Europe\'s population. It also devastated the Middle East and reduced Eurasian population by tens of millions.',
    ledTo: [
      'Massive demographic collapse weakened feudalism as labor became scarce',
      'Peasant uprisings across Europe challenged the feudal order',
      'Survivors demanded higher wages, accelerating social change',
      'Renewed urgency to find alternative trade routes (avoiding plague-hit overland routes)'
    ]
  },
  {
    id: 'ming-dynasty',
    year: 1368,
    yearLabel: '1368',
    title: 'Ming Dynasty Founded in China',
    region: 'East Asia',
    unitId: 1,
    description: 'Chinese rebels overthrew the Mongol Yuan Dynasty and established the Ming Dynasty, restoring Han Chinese rule. The Ming rebuilt the Great Wall, moved the capital to Beijing, and built the Forbidden City. Early Ming emperors sponsored Zheng He\'s enormous treasure voyages to Southeast Asia, India, and Africa.',
    ledTo: [
      'Zheng He\'s voyages (1405\u20131433) projected Chinese power across the Indian Ocean',
      'Later isolationism limited China\'s engagement with European expansion',
      'Ming demand for silver drove the global silver trade of the 1500s\u20131600s'
    ]
  },
  {
    id: 'aztec-empire',
    year: 1428,
    yearLabel: 'c. 1428',
    title: 'Aztec Triple Alliance Dominates Mesoamerica',
    region: 'Americas',
    unitId: 1,
    description: 'The Aztec (Mexica) formed the Triple Alliance with two neighboring city-states, rapidly expanding to dominate central Mexico through a tribute system. Tenochtitlan, built on a lake island with chinampas (floating gardens), became one of the largest cities in the world.',
    ledTo: [
      'Tribute system created widespread resentment among subjugated peoples',
      'That resentment helped Cortés find allies against the Aztecs in 1519',
      'Agricultural innovation (chinampas) fed a massive urban population'
    ]
  },

  /* ── ERA 2: c. 1450–1750 (Units 3 & 4) ─────────────────── */

  {
    id: 'fall-constantinople',
    year: 1453,
    yearLabel: '1453',
    title: 'Fall of Constantinople',
    region: 'Middle East / Europe',
    unitId: 3,
    description: 'Ottoman Sultan Mehmed II used massive cannons to breach Constantinople\'s legendary walls, ending the Byzantine Empire after over a thousand years. The Ottoman Empire now controlled the Eastern Mediterranean and the main overland trade routes to Asia.',
    ledTo: [
      'Ottoman control of eastern trade routes raised costs for European merchants',
      'Incentivized Portugal and Spain to seek sea routes to Asia — directly enabling the Age of Exploration',
      'Greek scholars fleeing to Italy brought Byzantine learning and fueled the Renaissance'
    ]
  },
  {
    id: 'gutenberg-press',
    year: 1455,
    yearLabel: 'c. 1455',
    title: 'Gutenberg\'s Printing Press',
    region: 'Europe',
    unitId: 3,
    description: 'Johannes Gutenberg\'s movable-type printing press made books dramatically cheaper and faster to produce. Within 50 years, millions of books were printed across Europe, breaking the Church\'s near-monopoly on literacy and information.',
    ledTo: [
      'Protestant Reformation — Luther\'s 95 Theses spread across Europe in weeks',
      'Scientific Revolution — scientists could share findings rapidly',
      'Literacy spread to the middle class, fueling Enlightenment ideas'
    ]
  },
  {
    id: 'portuguese-exploration',
    year: 1488,
    yearLabel: '1488\u20131498',
    title: 'Portuguese Round Africa, Reach India',
    region: 'Africa / Indian Ocean',
    unitId: 4,
    description: 'Bartolomeu Dias rounded the Cape of Good Hope in 1488; Vasco da Gama reached India in 1498. Portugal established a network of fortified trading posts (feitoria) around the Indian Ocean, using superior naval artillery to dominate trade routes.',
    ledTo: [
      'Portugal broke the Arab and Venetian monopoly on spice trade',
      'Indian Ocean trade was now open to European ships',
      'Established the model of trading post empire adopted by later European powers'
    ]
  },
  {
    id: 'columbus-1492',
    year: 1492,
    yearLabel: '1492',
    title: 'Columbus Reaches the Americas',
    region: 'Americas',
    unitId: 4,
    description: 'Christopher Columbus, funded by Spain, reached the Caribbean believing it was Asia. His voyages opened the Americas to sustained European contact, beginning one of the most consequential connections in human history — and one of its greatest catastrophes for indigenous peoples.',
    ledTo: [
      'The Columbian Exchange transformed diets, agriculture, and population on both hemispheres',
      'Spanish colonization and conquest of Aztec and Inca empires',
      'Devastating epidemic disease killed an estimated 50\u201390% of indigenous Americans',
      'Atlantic slave trade emerged to replace lost indigenous labor'
    ]
  },
  {
    id: 'columbian-exchange',
    year: 1500,
    yearLabel: 'c. 1500s',
    title: 'The Columbian Exchange Transforms the World',
    region: 'Global',
    unitId: 4,
    description: 'The transfer of plants, animals, and diseases between the Eastern and Western Hemispheres fundamentally changed both. American crops (potatoes, maize, tomatoes) spread globally and supported population growth in Europe and Asia; European diseases (smallpox, measles) caused catastrophic indigenous demographic collapse.',
    ledTo: [
      'Potato and maize supported population booms in Europe, Africa, and China',
      'Indigenous population collapse created labor shortage, driving Atlantic slave trade',
      'Horses transformed life and warfare on the North American plains',
      'Sugar plantation economy in the Caribbean depended on enslaved African labor'
    ]
  },
  {
    id: 'protestant-reformation',
    year: 1517,
    yearLabel: '1517',
    title: 'Protestant Reformation Begins',
    region: 'Europe',
    unitId: 3,
    description: 'Martin Luther posted his 95 Theses challenging the Catholic Church\'s sale of indulgences. The printing press spread his ideas across Europe within weeks. The Reformation shattered Western Christianity\'s unity and sparked decades of religious wars.',
    ledTo: [
      'Thirty Years\' War (1618\u20131648) devastated Central Europe',
      'Weakening of Church authority opened space for Enlightenment scientific thinking',
      'Colonial missions became competitive — each European power sought to spread its version of Christianity'
    ]
  },
  {
    id: 'spanish-conquest',
    year: 1521,
    yearLabel: '1519\u20131533',
    title: 'Spanish Conquer Aztec and Inca Empires',
    region: 'Americas',
    unitId: 4,
    description: 'Hernán Cortés conquered the Aztec Empire by 1521 by allying with indigenous enemies of the Aztecs; Francisco Pizarro conquered the Inca by 1533. Both conquests used disease, military technology, and internal divisions. Spain established a vast colonial empire in the Americas.',
    ledTo: [
      'Encomienda and mita labor systems exploited indigenous peoples',
      'Massive silver extraction from Potosí flowed globally',
      'Casta system created racial hierarchy across Latin America',
      'Atlantic slave trade accelerated as indigenous populations collapsed'
    ]
  },
  {
    id: 'atlantic-slave-trade',
    year: 1530,
    yearLabel: 'c. 1530\u20131800s',
    title: 'Atlantic Slave Trade Expands',
    region: 'Atlantic World',
    unitId: 4,
    description: 'The systematic enslavement and transportation of Africans across the Atlantic grew into one of history\'s largest forced migrations. Over 12 million Africans were transported via the brutal Middle Passage to work on sugar, tobacco, and cotton plantations. Triangular trade connected Europe, Africa, and the Americas.',
    ledTo: [
      'Plantation economy in the Americas produced enormous wealth for European powers',
      'West African societies destabilized by constant slave raiding',
      'African diaspora communities formed, preserving cultural traditions under slavery',
      'Abolitionist movements eventually emerged in the 1700\u20131800s'
    ]
  },
  {
    id: 'potosi-silver',
    year: 1545,
    yearLabel: '1545',
    title: 'Potosí Silver Mine Opens',
    region: 'Americas',
    unitId: 4,
    description: 'The discovery of the world\'s richest silver deposit at Potosí (in modern Bolivia) transformed global trade. Worked by mita (forced indigenous labor), Potosí\'s silver flooded global markets. Spanish Manila Galleons carried silver across the Pacific to China, which needed silver to pay taxes.',
    ledTo: [
      'Global silver circuit connected the Americas, Europe, and Asia for the first time',
      'Spain grew enormously wealthy but also suffered inflation',
      'Ming China\'s demand for silver made it deeply integrated in global trade',
      'Mita labor system killed hundreds of thousands of indigenous workers'
    ]
  },
  {
    id: 'mughal-founded',
    year: 1526,
    yearLabel: '1526',
    title: 'Mughal Empire Founded',
    region: 'South Asia',
    unitId: 3,
    description: 'Babur defeated the Delhi Sultanate at the First Battle of Panipat, establishing the Mughal Empire in India. His grandson Akbar the Great expanded the empire and implemented religious tolerance, abolishing the jizya tax on non-Muslims and welcoming Hindus into his administration.',
    ledTo: [
      'Akbar\'s policies of inclusion stabilized a religiously diverse empire',
      'Aurangzeb\'s later religious intolerance reversed this and weakened the empire',
      'Mughal decline opened the door for British East India Company expansion'
    ]
  },
  {
    id: 'tokugawa-japan',
    year: 1603,
    yearLabel: '1603',
    title: 'Tokugawa Shogunate Unifies Japan',
    region: 'East Asia',
    unitId: 3,
    description: 'Tokugawa Ieyasu unified Japan after a century of civil war and established the Tokugawa Shogunate. The shogunate implemented sakoku — a strict closed-country policy limiting foreign contact to Dutch traders at a single port. Japan entered over 250 years of enforced isolation.',
    ledTo: [
      'Japan developed a distinctive culture without Western influence',
      'When US Commodore Perry forced Japan open in 1853, the shock led directly to the Meiji Restoration',
      'Sakoku preserved Japan\'s political independence but delayed industrialization'
    ]
  },
  {
    id: 'qing-dynasty',
    year: 1644,
    yearLabel: '1644',
    title: 'Qing Dynasty Replaces Ming in China',
    region: 'East Asia',
    unitId: 3,
    description: 'The Manchu people from northeast of China overthrew the Ming Dynasty. Qing emperors Kangxi and Qianlong presided over a prosperous era, but the Canton System restricted Western trade to a single port, and the kowtow requirement complicated diplomacy with European powers.',
    ledTo: [
      'Qing expansion incorporated Tibet, Mongolia, and Central Asian territories',
      'Canton System eventually led to tensions with Britain — and the Opium Wars',
      'Qing refusal to modernize left China vulnerable to 19th-century imperialism'
    ]
  },
  {
    id: 'scientific-revolution',
    year: 1687,
    yearLabel: 'c. 1543\u20131687',
    title: 'Scientific Revolution',
    region: 'Europe',
    unitId: 3,
    description: 'From Copernicus\'s heliocentric model (1543) to Newton\'s laws of motion and gravity (1687), European thinkers revolutionized understanding of the natural world by applying observation and mathematics rather than religious authority. Galileo, Kepler, and Bacon developed the scientific method.',
    ledTo: [
      'Enlightenment philosophy applied scientific reasoning to government and society',
      'Technological advances enabled the Industrial Revolution',
      'Challenged Church authority, contributing to secularism in European thought'
    ]
  },

  /* ── ERA 3: c. 1750–1900 (Units 5 & 6) ─────────────────── */

  {
    id: 'enlightenment',
    year: 1748,
    yearLabel: 'c. 1700\u20131780s',
    title: 'Enlightenment Peaks in Europe',
    region: 'Europe',
    unitId: 5,
    description: 'Enlightenment philosophers applied reason to politics and society. Locke argued for natural rights and consent of the governed; Rousseau for the social contract; Montesquieu for separation of powers; Voltaire for religious tolerance. These ideas spread through salons, pamphlets, and the great Encyclopédie.',
    ledTo: [
      'American Revolution (1776) — Declaration of Independence directly quoted Locke',
      'French Revolution (1789) — Declaration of Rights of Man',
      'Latin American independence movements of the early 1800s',
      'Abolitionism — natural rights arguments were applied to enslaved people'
    ]
  },
  {
    id: 'industrial-revolution',
    year: 1760,
    yearLabel: 'c. 1760\u20131840',
    title: 'Industrial Revolution Begins in Britain',
    region: 'Europe',
    unitId: 5,
    description: 'Britain\'s coal and iron deposits, navigable rivers, colonial empire, and accumulated capital enabled the first Industrial Revolution. James Watt\'s steam engine (1769), the spinning jenny, and the factory system transformed production. Cities swelled with workers facing brutal conditions.',
    ledTo: [
      'Urbanization and rise of the working class (proletariat)',
      'Karl Marx\'s Communist Manifesto (1848) and socialist movements',
      'Britain\'s industrial advantage fueled imperial expansion in Africa and Asia',
      'Industrialization spread to France, Germany, US, Japan by mid-1800s'
    ]
  },
  {
    id: 'american-revolution',
    year: 1776,
    yearLabel: '1776',
    title: 'American Revolution & Independence',
    region: 'Americas',
    unitId: 5,
    description: 'Thirteen British colonies declared independence, citing Enlightenment principles of natural rights and consent of the governed. The Declaration of Independence (Jefferson, 1776) and the U.S. Constitution (1787) established the first modern democratic republic.',
    ledTo: [
      'Inspired the French Revolution — French officers like Lafayette brought democratic ideas home',
      'Established a model of republican government copied worldwide',
      'Monroe Doctrine (1823) extended American influence over Latin America'
    ]
  },
  {
    id: 'french-revolution',
    year: 1789,
    yearLabel: '1789',
    title: 'French Revolution',
    region: 'Europe',
    unitId: 5,
    description: 'France\'s fiscal crisis and social inequality exploded into revolution. The Estates-General convened, the Bastille was stormed, and the Declaration of the Rights of Man proclaimed liberty and equality. The Reign of Terror executed thousands. Napoleon Bonaparte rose from the chaos to conquer most of Europe.',
    ledTo: [
      'Napoleon spread revolutionary ideals (and the Napoleonic Code) across Europe',
      'Haitian Revolution — enslaved people in Saint-Domingue applied revolutionary ideals',
      'Nationalism became a dominant political force across Europe and Latin America',
      'Conservative backlash led to the Concert of Europe system after 1815'
    ]
  },
  {
    id: 'haitian-revolution',
    year: 1791,
    yearLabel: '1791\u20131804',
    title: 'Haitian Revolution',
    region: 'Caribbean',
    unitId: 5,
    description: 'The only successful slave revolt in history. Toussaint Louverture led enslaved Africans in Saint-Domingue to overthrow French colonial rule. Haiti declared independence in 1804 as the first Black republic and the second republic in the Western Hemisphere.',
    ledTo: [
      'Terrified slaveholders across the Americas and strengthened pro-slavery arguments in the US South',
      'Napoleon sold Louisiana to the US (partly to fund the failed attempt to retake Haiti)',
      'Inspired enslaved people and abolitionists globally',
      'Haiti was isolated diplomatically and economically for decades as punishment'
    ]
  },
  {
    id: 'latin-american-independence',
    year: 1810,
    yearLabel: '1810\u20131825',
    title: 'Latin American Independence Movements',
    region: 'Americas',
    unitId: 5,
    description: 'Simón Bolívar liberated Venezuela, Colombia, Ecuador, Peru, and Bolivia; José de San Martín liberated Argentina and Chile; Miguel Hidalgo sparked Mexican independence. Creole elites — American-born people of Spanish descent — led most movements, motivated by Enlightenment ideas and resentment of Spanish trade restrictions.',
    ledTo: [
      'Spain lost its entire American empire within 15 years',
      'New nations struggled with political instability and caudillo rule',
      'Monroe Doctrine declared the Americas off-limits to European re-colonization',
      'Economic dependence on Britain and later the US replaced Spanish colonial dependency'
    ]
  },
  {
    id: 'communist-manifesto',
    year: 1848,
    yearLabel: '1848',
    title: 'Marx\'s Communist Manifesto & Revolutions of 1848',
    region: 'Europe',
    unitId: 5,
    description: 'Karl Marx and Friedrich Engels published The Communist Manifesto arguing that all history is class struggle and predicting workers\' revolution against capitalism. Simultaneously, revolutions broke out across Europe in 1848, driven by nationalism and liberal demands for constitutional government.',
    ledTo: [
      'Socialist and labor movements grew throughout the 19th century',
      'Trade unions and workers\' rights movements organized across industrialized nations',
      'Russian Revolution (1917) was directly inspired by Marxist ideology',
      'Governments responded with social reforms to preempt more radical change'
    ]
  },
  {
    id: 'opium-wars',
    year: 1839,
    yearLabel: '1839\u20131860',
    title: 'Opium Wars — China Opened by Force',
    region: 'East Asia',
    unitId: 6,
    description: 'Britain fought two wars to force China to accept British opium trade and open its ports. The Treaty of Nanking (1842) ceded Hong Kong, opened five treaty ports, and established extraterritoriality. Spheres of influence carved up Chinese trade among European powers and Japan.',
    ledTo: [
      'China lost effective sovereignty over key ports and territories',
      'Boxer Rebellion (1900) — Chinese nationalist uprising against foreign influence',
      'Qing Dynasty\'s weakness accelerated its collapse in 1912',
      'Demonstrated European willingness to use force to open markets'
    ]
  },
  {
    id: 'sepoy-mutiny',
    year: 1857,
    yearLabel: '1857',
    title: 'Sepoy Mutiny — Indian Rebellion',
    region: 'South Asia',
    unitId: 6,
    description: 'Indian soldiers (sepoys) in the British East India Company\'s army revolted, partly over rifle cartridges believed to be greased with pig and cow fat (offensive to Muslims and Hindus). The uprising spread but was suppressed. Britain abolished the East India Company and established direct Crown rule.',
    ledTo: [
      'British Raj established — Queen Victoria became Empress of India',
      'Economic exploitation intensified, draining India\'s wealth',
      'Indian National Congress founded in 1885, beginning organized political resistance',
      'Gandhi\'s independence movement was the long-term consequence'
    ]
  },
  {
    id: 'meiji-restoration',
    year: 1868,
    yearLabel: '1868',
    title: 'Meiji Restoration — Japan Modernizes',
    region: 'East Asia',
    unitId: 6,
    description: 'Alarmed by Western imperialism (especially US Commodore Perry\'s forced opening of Japan in 1853), Japanese leaders overthrew the Tokugawa Shogunate and rapidly modernized: industrialization, Western-style military, national education, and a constitution were all adopted within decades.',
    ledTo: [
      'Japan avoided colonization and became an imperial power itself',
      'Defeated China (1895) and Russia (1905), shocking the world',
      'Meiji model inspired other non-Western nations to modernize',
      'Japanese imperialism eventually led to WWII in the Pacific'
    ]
  },
  {
    id: 'berlin-conference',
    year: 1884,
    yearLabel: '1884\u20131885',
    title: 'Berlin Conference — Scramble for Africa',
    region: 'Africa',
    unitId: 6,
    description: 'European powers met in Berlin (without any African representation) to set rules for claiming African territory. The result was the rapid colonial division of Africa — by 1914, only Ethiopia and Liberia remained free. Belgium\'s Leopold II personally owned the Congo, where an estimated 10 million died.',
    ledTo: [
      'Africa under European colonial rule for most of the 20th century',
      'Artificial colonial borders ignored ethnic and linguistic boundaries, causing future conflicts',
      'Resource extraction (rubber, ivory, minerals) impoverished African populations',
      'African nationalism and anti-colonial movements grew in response'
    ]
  },
  {
    id: 'battle-adwa',
    year: 1896,
    yearLabel: '1896',
    title: 'Battle of Adwa — Ethiopia Defeats Italy',
    region: 'Africa',
    unitId: 6,
    description: 'Emperor Menelik II of Ethiopia decisively defeated the Italian army attempting to colonize Ethiopia, making it the first African nation to defeat a European colonial force. Ethiopia remained independent throughout the Scramble for Africa.',
    ledTo: [
      'Ethiopia became a symbol of African resistance and independence',
      'Pan-African movement adopted Ethiopia as a symbol of Black freedom',
      'Italy\'s humiliation contributed to its later aggressive foreign policy under Mussolini'
    ]
  },

  /* ── ERA 4: c. 1900–present (Units 7, 8 & 9) ───────────── */

  {
    id: 'wwi-begins',
    year: 1914,
    yearLabel: '1914',
    title: 'World War I Begins',
    region: 'Europe / Global',
    unitId: 7,
    description: 'The assassination of Archduke Franz Ferdinand triggered a chain reaction through Europe\'s alliance system (MAIN: Militarism, Alliances, Imperialism, Nationalism). The Triple Entente (Britain, France, Russia) faced the Triple Alliance (Germany, Austria-Hungary, Italy). Trench warfare on the Western Front created a stalemate that killed millions.',
    ledTo: [
      'Russian Revolution (1917) — war exhaustion toppled the Tsar',
      'Ottoman Empire collapsed, reshaping the Middle East',
      'Treaty of Versailles created conditions for WWII',
      'First use of poison gas, tanks, and aerial warfare'
    ]
  },
  {
    id: 'russian-revolution',
    year: 1917,
    yearLabel: '1917',
    title: 'Russian Revolution — Bolsheviks Seize Power',
    region: 'Europe / Asia',
    unitId: 7,
    description: 'WWI\'s devastating losses and food shortages toppled Tsar Nicholas II in the February Revolution. Lenin\'s Bolsheviks then seized power in the October Revolution, promising "peace, land, bread." Russia signed a separate peace with Germany (Treaty of Brest-Litovsk) and a brutal civil war followed.',
    ledTo: [
      'Soviet Union formed — world\'s first communist state',
      'Cold War ideological conflict between capitalism and communism',
      'Inspired communist movements globally, from China to Cuba',
      'Stalin\'s totalitarian rule and the Gulag system'
    ]
  },
  {
    id: 'treaty-versailles',
    year: 1919,
    yearLabel: '1919',
    title: 'Treaty of Versailles Ends WWI',
    region: 'Europe',
    unitId: 7,
    description: 'The Treaty forced Germany to accept sole war guilt (Article 231), pay crushing reparations, lose territory, and disarm. Woodrow Wilson\'s idealistic Fourteen Points were largely ignored. The League of Nations formed without US participation. Germany\'s humiliation created fertile ground for extremism.',
    ledTo: [
      'Great Depression worsened by reparations debt and economic instability',
      'Hitler\'s rise — Nazi Party exploited German resentment of the treaty',
      'League of Nations proved unable to stop aggression without US backing',
      'New nations created from collapsed empires faced immediate instability'
    ]
  },
  {
    id: 'great-depression',
    year: 1929,
    yearLabel: '1929',
    title: 'Great Depression',
    region: 'Global',
    unitId: 7,
    description: 'The US stock market crash triggered a global economic collapse. Unemployment reached 25% in the US. International trade collapsed. Governments that could not provide economic relief lost legitimacy. Extremist parties — fascist and communist — surged in popularity.',
    ledTo: [
      'Hitler\'s Nazi Party won power in Germany — promising economic recovery',
      'Mussolini consolidated fascist control in Italy',
      'Japan\'s military leaders pursued imperial expansion to secure resources',
      'New Deal in US and Keynesian economics transformed government\'s economic role'
    ]
  },
  {
    id: 'nazi-rise',
    year: 1933,
    yearLabel: '1933',
    title: 'Hitler Becomes Chancellor — Nazi Germany',
    region: 'Europe',
    unitId: 7,
    description: 'Adolf Hitler became German Chancellor in 1933 and rapidly dismantled the Weimar Republic. The Nazi regime combined extreme nationalism, antisemitism, and totalitarian control through propaganda, terror, and the Gestapo. The Nuremberg Laws (1935) stripped Jews of citizenship.',
    ledTo: [
      'Holocaust — systematic genocide of 6 million Jews and 5 million others',
      'Appeasement by Britain and France allowed German expansion',
      'WWII — Germany\'s invasion of Poland (1939) triggered the war',
      'Nuremberg Trials established the concept of crimes against humanity'
    ]
  },
  {
    id: 'wwii',
    year: 1939,
    yearLabel: '1939\u20131945',
    title: 'World War II',
    region: 'Global',
    unitId: 7,
    description: 'Germany\'s invasion of Poland launched WWII. Allied powers (Britain, US from 1941, USSR from 1941) faced the Axis (Germany, Italy, Japan). D-Day (1944) opened the Western Front; the Pacific War ended with the atomic bombs on Hiroshima and Nagasaki (1945). The Holocaust murdered 6 million Jews.',
    ledTo: [
      'Cold War — US and USSR emerged as rival superpowers',
      'United Nations formed to prevent future wars',
      'Decolonization accelerated — weakened European empires could no longer hold colonies',
      'Nuclear age began — MAD doctrine shaped global strategy for decades',
      'Marshall Plan rebuilt Europe; Nuremberg Trials established international law'
    ]
  },
  {
    id: 'indian-independence',
    year: 1947,
    yearLabel: '1947',
    title: 'Indian Independence & Partition',
    region: 'South Asia',
    unitId: 8,
    description: 'Britain granted India independence after Gandhi\'s decades-long nonviolent resistance movement. The Partition simultaneously created Muslim-majority Pakistan, causing one of history\'s largest refugee migrations — 14 million people displaced — and an estimated one million deaths in communal violence.',
    ledTo: [
      'Wave of African and Asian decolonization followed',
      'Nehru led India as a founding voice of the Non-Aligned Movement',
      'India-Pakistan conflict over Kashmir remains unresolved',
      'Partition trauma shaped South Asian politics for generations'
    ]
  },
  {
    id: 'cold-war-begins',
    year: 1947,
    yearLabel: '1947\u20131991',
    title: 'Cold War — US vs. USSR',
    region: 'Global',
    unitId: 8,
    description: 'The wartime alliance between the US and USSR collapsed into ideological rivalry. The Truman Doctrine committed the US to containing communism; the Marshall Plan rebuilt Western Europe; the Iron Curtain divided Europe. NATO and the Warsaw Pact militarized the divide. The arms race produced tens of thousands of nuclear weapons.',
    ledTo: [
      'Korean War and Vietnam War as proxy conflicts',
      'Cuban Missile Crisis (1962) brought the world close to nuclear war',
      'Space Race — Sputnik (1957) and Apollo 11 (1969)',
      'Decolonizing nations forced to choose sides or form Non-Aligned Movement'
    ]
  },
  {
    id: 'communist-china',
    year: 1949,
    yearLabel: '1949',
    title: 'Communist Revolution in China',
    region: 'East Asia',
    unitId: 8,
    description: 'Mao Zedong\'s Communist Party defeated the US-backed Nationalist Party in China\'s civil war, establishing the People\'s Republic of China. The "loss" of China shocked the West and intensified Cold War fears.',
    ledTo: [
      'Korean War (1950\u201353) — China intervened to prevent US forces reaching its border',
      'Great Leap Forward and Cultural Revolution caused tens of millions of deaths',
      'Sino-Soviet split complicated Cold War alliances',
      'China\'s eventual reform under Deng Xiaoping created the economic giant of today'
    ]
  },
  {
    id: 'decolonization-africa',
    year: 1957,
    yearLabel: '1957\u20131975',
    title: 'African Decolonization Wave',
    region: 'Africa',
    unitId: 8,
    description: 'Ghana became the first sub-Saharan African country to gain independence (1957) under Kwame Nkrumah, who promoted Pan-Africanism. 1960 — "Year of Africa" — saw 17 countries gain independence. Algerian War of Independence from France (1954\u201362) was especially brutal.',
    ledTo: [
      'New African nations faced arbitrary colonial borders, ethnic tensions, and Cold War interference',
      'Pan-African movement and Organization of African Unity (1963)',
      'Continued struggle against apartheid in South Africa',
      'Economic neo-colonialism replaced direct colonial rule for many'
    ]
  },
  {
    id: 'bandung-conference',
    year: 1955,
    yearLabel: '1955',
    title: 'Bandung Conference — Non-Aligned Movement',
    region: 'Asia / Africa',
    unitId: 8,
    description: '29 Asian and African nations met in Bandung, Indonesia to assert independence from both Cold War blocs. Nehru (India), Nasser (Egypt), Sukarno (Indonesia), and Tito (Yugoslavia) led the Non-Aligned Movement, insisting that newly independent nations need not join either superpower\'s camp.',
    ledTo: [
      'Non-Aligned Movement gave developing nations a collective diplomatic voice',
      'Third World became a political concept — nations outside the two blocs',
      'Inspired calls for a New International Economic Order in the 1970s'
    ]
  },
  {
    id: 'cuban-missile-crisis',
    year: 1962,
    yearLabel: '1962',
    title: 'Cuban Missile Crisis',
    region: 'Americas / Global',
    unitId: 8,
    description: 'The US discovered Soviet nuclear missiles being installed in Cuba. For 13 days the world stood on the brink of nuclear war. President Kennedy imposed a naval blockade; Soviet Premier Khrushchev agreed to remove missiles in exchange for a US pledge not to invade Cuba and secret removal of US missiles from Turkey.',
    ledTo: [
      'Nuclear hotline established between Washington and Moscow',
      'Nuclear Test Ban Treaty (1963)',
      'Both sides more cautious about direct confrontation',
      'Vietnam War escalated partly because Kennedy/Johnson feared appearing weak'
    ]
  },
  {
    id: 'berlin-wall-falls',
    year: 1989,
    yearLabel: '1989\u20131991',
    title: 'Berlin Wall Falls — Soviet Collapse',
    region: 'Europe',
    unitId: 8,
    description: 'Gorbachev\'s reforms (glasnost and perestroika) destabilized the Soviet system. Eastern European satellite states broke free in 1989; the Berlin Wall fell November 9. German reunification followed in 1990. The Soviet Union itself dissolved in December 1991, ending the Cold War.',
    ledTo: [
      'US emerged as the sole superpower — "unipolar moment"',
      'NATO expanded eastward toward Russia\'s borders',
      'Russian resentment of post-Cold War settlement shaped later aggression (Georgia, Ukraine)',
      'Globalization accelerated as former communist economies integrated into world markets'
    ]
  },
  {
    id: 'globalization-wto',
    year: 1995,
    yearLabel: '1990s\u20132000s',
    title: 'Economic Globalization & the WTO',
    region: 'Global',
    unitId: 9,
    description: 'The World Trade Organization (1995), NAFTA, and other free trade agreements reduced tariffs globally. Multinational corporations moved production to low-wage countries. Containerization made shipping cheap. The internet enabled global communication. China\'s integration into world markets after 1978 became the largest economic transformation in history.',
    ledTo: [
      'Hundreds of millions lifted from poverty in China and Southeast Asia',
      'Deindustrialization in wealthy nations and growing inequality within them',
      'Anti-globalization movement protested corporate power and inequality',
      'North-South divide — wealthy vs. developing nations\' access to markets'
    ]
  },
  {
    id: 'digital-revolution',
    year: 2000,
    yearLabel: 'c. 1990s\u20132010s',
    title: 'Digital Revolution & the Internet Age',
    region: 'Global',
    unitId: 9,
    description: 'The internet, mobile phones, and social media transformed how billions of people communicate, access information, and organize politically. The digital revolution created new industries, accelerated globalization, and enabled both democratic movements (Arab Spring) and authoritarian surveillance.',
    ledTo: [
      'Information spreads globally in seconds, making censorship harder',
      'Platform economies (Amazon, Alibaba) disrupted traditional trade and retail',
      'Social media enabled political organizing — and disinformation at scale',
      'Digital divide — unequal access to technology deepened global inequality'
    ]
  },
  {
    id: 'climate-change',
    year: 1990,
    yearLabel: 'c. 1990s\u2013present',
    title: 'Climate Change Becomes a Global Crisis',
    region: 'Global',
    unitId: 9,
    description: 'Scientific consensus established that human industrial activity was warming the planet through greenhouse gas emissions. The Kyoto Protocol (1997) and Paris Agreement (2015) attempted international action. Rising sea levels, extreme weather, and ecosystem collapse threaten hundreds of millions.',
    ledTo: [
      'Mass migration driven by climate displacement',
      'Resource conflicts over water and arable land',
      'Green energy transition underway but insufficient to meet 1.5°C targets',
      'Environmental justice movements highlight that the poorest suffer most'
    ]
  }

];
