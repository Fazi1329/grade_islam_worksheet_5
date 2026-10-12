/**
 * Quran Quest: The Three Surahs Challenge
 * Authentic Quiz Data strictly derived from Grade 5 Islamic Studies Textbook
 * Chapters:
 *  - Chapter 4: Surat at-Teen (The Fig) [Pages 19-22 / PDF Pages 27-30]
 *  - Chapter 5: Surat al-Qadr (The Decree) [Pages 23-26 / PDF Pages 31-34]
 *  - Chapter 6: Surat az-Zalzalah (The Earthquake) [Pages 27-31 / PDF Pages 35-39]
 */

const QUIZ_DATA = {
  levels: [
    {
      id: "zalzalah",
      levelNumber: 1,
      title: "Surah Az-Zalzalah",
      titleArabic: "سُورَةُ الزَّلْزَلَةِ",
      meaning: "The Earthquake",
      versesCount: 8,
      revelationCity: "Makkah",
      badgeName: "Earthquake Scholar",
      badgeIcon: "⚡",
      colorTheme: "#0284c7",
      intro: {
        summary: "This surah of eight verses was revealed in Makkah. It gives a powerful vision of the fearful events of the Day of Judgement when all men will be gathered together to reap the fruit of their deeds. The earth will shake, give up its treasures and the dead, and report people's actions. Even an atom's weight of good or evil will be seen!",
        keyVerses: [
          { ar: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", en: "When the earth is shaken with a great quake," },
          { ar: "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", en: "And the earth gives up its burdens," },
          { ar: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", en: "So whoever does an atom's weight of good will see it," },
          { ar: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ", en: "And whoever does an atom's weight of evil will see it." }
        ]
      },
      questions: [
        {
          id: "z1",
          type: "one-word",
          title: "Place of Revelation",
          prompt: "In which blessed city was Surat az-Zalzalah revealed according to the textbook?",
          placeholder: "Type city name...",
          acceptedAnswers: ["makkah", "mecca", "makka"],
          hint: "The book states: 'This surah of eight verses was revealed in ______.'",
          explanation: "Surat az-Zalzalah was revealed in Makkah and contains 8 verses.",
          bookReference: "Chapter 6, Page 28 (PDF p. 36)",
          points: 10
        },
        {
          id: "z2",
          type: "one-word",
          title: "Number of Verses",
          prompt: "How many verses (ayaat) are there in Surat az-Zalzalah?",
          placeholder: "Type number...",
          acceptedAnswers: ["8", "eight", "8 verses", "eight verses"],
          hint: "Check the textbook introduction to Chapter 6: 'This surah of _____ verses was revealed in Makkah.'",
          explanation: "Surat az-Zalzalah consists of 8 verses.",
          bookReference: "Chapter 6, Page 28 (PDF p. 36)",
          points: 10
        },
        {
          id: "z3",
          type: "one-word",
          title: "English Meaning of the Title",
          prompt: "What is the English meaning of the title 'Az-Zalzalah'?",
          placeholder: "Type meaning...",
          acceptedAnswers: ["the earthquake", "earthquake", "the quake", "quake", "great earthquake"],
          hint: "Think about what shakes violently under our feet on that dreadful day.",
          explanation: "Az-Zalzalah means 'The Earthquake' (or 'The Quake').",
          bookReference: "Chapter 6, Page 27 (PDF p. 35)",
          points: 10
        },
        {
          id: "z4",
          type: "matching",
          title: "Match the Textbook Statements",
          prompt: "Match each beginning statement on the left with its correct completion from the textbook exercise on the right.",
          pairs: [
            { id: "p1", left: "Surat az-Zalzalah", right: "has eight verses" },
            { id: "p2", left: "Everyone", right: "will be shown his actions on the Day of Judgement" },
            { id: "p3", left: "Whoever does an atom's weight of good", right: "will see it" },
            { id: "p4", left: "People will ask", right: '"What has happened to it?"' }
          ],
          distractors: ["are the Companions of the fire"],
          hint: "These exact pairs come straight from Exercise A in Chapter 6 of your textbook.",
          explanation: "Directly from Chapter 6 Exercise A: Surat az-Zalzalah has eight verses; Everyone will be shown his actions; Whoever does an atom's weight of good will see it; People will ask 'What has happened to it?'.",
          bookReference: "Chapter 6 Exercise A, Page 30 (PDF p. 38)",
          points: 20
        },
        {
          id: "z5",
          type: "matching",
          title: "Arabic Vocabulary of Surah Az-Zalzalah",
          prompt: "Match each Arabic word from Surat az-Zalzalah with its correct meaning from the book.",
          pairs: [
            { id: "v1", left: "Zulzilat (زُلْزِلَتِ)", right: "is shaken with a quake" },
            { id: "v2", left: "Athqaalahaa (أَثْقَالَهَا)", right: "its burdens (treasures and the dead)" },
            { id: "v3", left: "Tuhaddithu (تُحَدِّثُ)", right: "will report / speak its news" },
            { id: "v4", left: "Ashtaataa (أَشْتَاتًا)", right: "scattered groups" },
            { id: "v5", left: "Mithqaala dharrah (مِثْقَالَ ذَرَّةٍ)", right: "an atom's weight" }
          ],
          hint: "Look at the verse translations: Verse 1, Verse 2, Verse 4, Verse 6, and Verse 7.",
          explanation: "These Arabic terms describe the events of the Day of Judgement: the shaking, earth giving up its burdens, speaking by Allah's command, people proceeding in scattered groups, and reckoning to an atom's weight.",
          bookReference: "Chapter 6 Verses 1–8 (PDF p. 36–37)",
          points: 25
        },
        {
          id: "z6",
          type: "fill-blank",
          title: "Complete the Textbook Sentences",
          prompt: "Fill in the missing words in these sentences from the Chapter 6 exercise.",
          segments: [
            { text: "1. The earth will be shaken with a great " },
            { input: true, answer: "quake", acceptable: ["earthquake", "quake"] },
            { text: ".\n2. On that day it will " },
            { input: true, answer: "report", acceptable: ["report", "speak", "tell"] },
            { text: " its news, because your " },
            { input: true, answer: "Lord", acceptable: ["Lord", "Allah"] },
            { text: " will inspire it.\n3. On that day people will proceed in " },
            { input: true, answer: "scattered groups", acceptable: ["scattered groups", "scattered", "groups"] },
            { text: " to be shown their actions." }
          ],
          wordBank: ["quake", "report", "Lord", "scattered groups", "fire", "heavens"],
          hint: "Read verses 1, 4, 5, and 6 carefully as translated in your book.",
          explanation: "The sentences are directly taken from Chapter 6 Exercise B: 'The earth will be shaken with a great quake; On that day it will report its news, because your Lord will inspire it; On that day people will proceed in scattered groups to be shown their actions.'",
          bookReference: "Chapter 6 Exercise B, Page 30 (PDF p. 38)",
          points: 20
        },
        {
          id: "z7",
          type: "one-word",
          title: "The Earth's Burdens",
          prompt: "When the earth is shaken and gives up its 'burdens', what will it throw out according to the book? (Name one: treasures or the dead)",
          placeholder: "Type answer...",
          acceptedAnswers: ["treasures", "the dead", "dead", "its treasures", "burdens", "treasures and the dead"],
          hint: "The textbook says: 'The earth will throw out its treasures and the ______.'",
          explanation: "The textbook explains verse 2: 'The earth will throw out its treasures and the dead.'",
          bookReference: "Chapter 6, Page 28 (PDF p. 36)",
          points: 10
        },
        {
          id: "z8",
          type: "fill-blank",
          title: "Witnesses on the Day of Judgement",
          prompt: "Complete these statements about what will speak out on the Day of Judgement.",
          segments: [
            { text: "All the people who ever lived since the time of Prophet " },
            { input: true, answer: "Adam", acceptable: ["Adam"] },
            { text: " will be brought to life again. People's own " },
            { input: true, answer: "tongues", acceptable: ["tongues", "tongue"] },
            { text: ", hands and feet, eyes and ears, and even their " },
            { input: true, answer: "skins", acceptable: ["skins", "skin"] },
            { text: " will also speak out about the deeds they committed!" }
          ],
          wordBank: ["Adam", "tongues", "skins", "Musa", "shadows", "secrets"],
          hint: "Prophet Adam was the first man; your own body parts will bear witness.",
          explanation: "The book states: 'All the people who ever lived since the time of Prophet Adam will be brought to life again... People's own tongues, hands and feet, eyes and ears, and even their skins will also speak out about the deeds they committed with them.'",
          bookReference: "Chapter 6, Page 29 (PDF p. 37)",
          points: 15
        },
        {
          id: "z9",
          type: "ordering",
          title: "Order the Verses of Surah Az-Zalzalah",
          prompt: "Arrange the first four verses of Surah Az-Zalzalah in their correct order as translated in the textbook.",
          items: [
            { id: "v1", text: "1. When the earth is shaken with a great quake," },
            { id: "v2", text: "2. And the earth gives up its burdens," },
            { id: "v3", text: "3. And man exclaims, 'What is the matter with it?'" },
            { id: "v4", text: "4. On that Day it will report its news," }
          ],
          correctOrder: ["v1", "v2", "v3", "v4"],
          hint: "First the shaking, then the burdens come out, then man's astonished question, then the earth reports its news.",
          explanation: "The opening 4 verses progress from the physical upheaval (quake, burdens) to human shock ('What is the matter with it?') to the earth testifying.",
          bookReference: "Chapter 6 Verses 1–4, Page 28 (PDF p. 36)",
          points: 20
        }
      ]
    },
    {
      id: "qadr",
      levelNumber: 2,
      title: "Surah Al-Qadr",
      titleArabic: "سُورَةُ الْقَدْرِ",
      meaning: "The Decree",
      versesCount: 5,
      revelationCity: "Makkah",
      badgeName: "Night of Decree Master",
      badgeIcon: "🌙",
      colorTheme: "#0d9488",
      intro: {
        summary: "This surah of five verses reveals the supreme blessings of Laylat al-Qadr (The Night of Decree) during Ramadan. On this night, which is better than a thousand months, Allah sent down the entire Qur'an from al-Lawh al-Mahfoodh to Baitul-'Izzah in the lowest heaven. Angels and the Ruh (Angel Jibreel) descend with decrees and peace until dawn!",
        keyVerses: [
          { ar: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", en: "Truly, We sent it (the Qur'an) down on the Night of al-Qadr." },
          { ar: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", en: "The Night of al-Qadr is better than a thousand months." },
          { ar: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ", en: "In it, the angels and the Ruh descend by the permission of their Lord with decrees." },
          { ar: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", en: "It is peace until the coming of the dawn." }
        ]
      },
      questions: [
        {
          id: "q1",
          type: "one-word",
          title: "The Blessed Month",
          prompt: "During which Islamic month does Laylat al-Qadr occur?",
          placeholder: "Type month name...",
          acceptedAnswers: ["ramadan", "ramadhan", "ramzan"],
          hint: "The book states: 'Laylat al-Qadr occurs during the month of ______.'",
          explanation: "Laylat al-Qadr occurs during the month of Ramadan, specifically in its last ten nights.",
          bookReference: "Chapter 5, Page 24 (PDF p. 32)",
          points: 10
        },
        {
          id: "q2",
          type: "one-word",
          title: "Meaning of The Ruh",
          prompt: "According to the textbook, who is 'the Ruh' mentioned in verse 4 of Surat al-Qadr?",
          placeholder: "Type angel name...",
          acceptedAnswers: ["jibreel", "angel jibreel", "gabriel", "angel gabriel", "jibril", "angel jibril"],
          hint: "The book states: 'The Ruh in the verse means Angel ______ (alayhis salam).'",
          explanation: "The Ruh in Surat al-Qadr refers to Angel Jibreel (alayhis salam).",
          bookReference: "Chapter 5, Page 25 (PDF p. 33)",
          points: 10
        },
        {
          id: "q3",
          type: "one-word",
          title: "Mosque Seclusion",
          prompt: "What is the Islamic term for spending the last ten days in the mosque in seclusion to pray and recite the Qur'an?",
          placeholder: "Type Islamic term...",
          acceptedAnswers: ["i'tikaaf", "itikaaf", "i'tikaf", "itikaf", "i’tikaaf"],
          hint: "The textbook notes: '...spend all of their time in the mosque in seclusion (______).'",
          explanation: "Seclusion in the mosque during the last ten nights of Ramadan is called I'tikaaf.",
          bookReference: "Chapter 5, Page 24 (PDF p. 32)",
          points: 10
        },
        {
          id: "q4",
          type: "fill-blank",
          title: "Textbook Exercise Fill-in-the-Blanks",
          prompt: "Complete the official textbook exercise questions for Surat al-Qadr.",
          segments: [
            { text: "1. Laylat al-Qadr occurs during the month of " },
            { input: true, answer: "Ramadan", acceptable: ["Ramadan", "Ramadhan"] },
            { text: ".\n2. It is one of the " },
            { input: true, answer: "odd-numbered", acceptable: ["odd-numbered", "odd", "odd numbered"] },
            { text: " nights of Ramadan.\n3. The Qur'an came down in parts over a period of " },
            { input: true, answer: "twenty-three", acceptable: ["twenty-three", "23", "twenty three"] },
            { text: " years.\n4. The Night of al-Qadr is better than a " },
            { input: true, answer: "thousand", acceptable: ["thousand", "1000", "a thousand"] },
            { text: " months." }
          ],
          wordBank: ["Ramadan", "odd-numbered", "twenty-three", "thousand", "even", "twelve"],
          hint: "Look directly at Chapter 5 Exercise A in your textbook.",
          explanation: "These are the exact blanks from Chapter 5 Exercise A: Ramadan, odd-numbered nights, twenty-three years, and a thousand months.",
          bookReference: "Chapter 5 Exercise A, Page 26 (PDF p. 34)",
          points: 20
        },
        {
          id: "q5",
          type: "matching",
          title: "Match Key Terms of Surat Al-Qadr",
          prompt: "Match each important concept from the chapter to its exact book explanation.",
          pairs: [
            { id: "qp1", left: "Al-Lawh al-Mahfoodh", right: "The Preserved Tablet" },
            { id: "qp2", left: "Baitul-'Izzah", right: "The House of Might in the lowest heaven" },
            { id: "qp3", left: "Laylat al-Qadr", right: "The Night of Decree (better than 1,000 months)" },
            { id: "qp4", left: "The Ruh", right: "Angel Jibreel (alayhis salam)" },
            { id: "qp5", left: "I'tikaaf", right: "Seclusion in the mosque during the last ten days" }
          ],
          hint: "The textbook describes the journey of the Qur'an from the Preserved Tablet to Baitul-'Izzah, and the sunnah of the Prophet (pbuh).",
          explanation: "Allah sent down the Qur'an from al-Lawh al-Mahfoodh to Baitul-'Izzah, and then to the Prophet (pbuh) over 23 years. The companions observed I'tikaaf in search of Laylat al-Qadr.",
          bookReference: "Chapter 5, Page 24 (PDF p. 32)",
          points: 25
        },
        {
          id: "q6",
          type: "matching",
          title: "Arabic Vocabulary of Surah Al-Qadr",
          prompt: "Match each Arabic word/phrase with its English translation from the textbook.",
          pairs: [
            { id: "qv1", left: "Al-Qadr (الْقَدْرِ)", right: "The Decree" },
            { id: "qv2", left: "Alfi shahr (أَلْفِ شَهْرٍ)", right: "A thousand months" },
            { id: "qv3", left: "Tanazzalu (تَنَزَّلُ)", right: "Descend" },
            { id: "qv4", left: "Salaam (سَلَامٌ)", right: "Peace" },
            { id: "qv5", left: "Matla'il-fajr (مَطْلَعِ الْفَجْرِ)", right: "The coming of the dawn" }
          ],
          hint: "Recall the 5 verses of Surat al-Qadr.",
          explanation: "Surat al-Qadr contains these 5 key vocabulary words, highlighting the descent of angels, the peace till dawn, and value exceeding 1,000 months.",
          bookReference: "Chapter 5 Verses 1–5 (PDF p. 32)",
          points: 25
        },
        {
          id: "q7",
          type: "one-word",
          title: "Why There is Peace",
          prompt: "The textbook explains that there is peace on this night until dawn because which creature cannot do any evil or harm?",
          placeholder: "Type creature name...",
          acceptedAnswers: ["satan", "shaytan", "shaitan", "iblees", "the devil"],
          hint: "The book states: 'There is peace on this night because ______ cannot do any evil or harm until the coming of dawn.'",
          explanation: "The textbook explains: 'There is peace on this night because Satan cannot do any evil or harm until the coming of dawn.'",
          bookReference: "Chapter 5, Page 25 (PDF p. 33)",
          points: 10
        },
        {
          id: "q8",
          type: "fill-blank",
          title: "Hadith and Odd Nights",
          prompt: "Complete the facts about the odd nights and the reward for praying during Laylat al-Qadr.",
          segments: [
            { text: "The Prophet (pbuh) mentioned that the Night of Decree falls on the odd-numbered nights: 21st, 23rd, 25th, " },
            { input: true, answer: "27th", acceptable: ["27th", "27"] },
            { text: ", or 29th. Whoever stands in prayer with faith will be " },
            { input: true, answer: "forgiven", acceptable: ["forgiven", "pardoned"] },
            { text: " for his previous sins!" }
          ],
          wordBank: ["27th", "forgiven", "30th", "punished", "praised"],
          hint: "Check the listed dates in Chapter 5 and the hadith narrated by Muslim.",
          explanation: "The odd nights are 21st, 23rd, 25th, 27th, and 29th. The Prophet (pbuh) said: 'Whoever stands (in prayer) during the Night of al-Qadr with faith and expecting reward... he will be forgiven for his previous sins.' (Muslim)",
          bookReference: "Chapter 5, Pages 24–25 (PDF p. 32–33)",
          points: 15
        },
        {
          id: "q9",
          type: "ordering",
          title: "Order the Verses of Surah Al-Qadr",
          prompt: "Arrange all five verses of Surah Al-Qadr in the exact sequence given in the textbook.",
          items: [
            { id: "qv1", text: "1. Truly, We sent it (the Qur'an) down on the Night of al-Qadr." },
            { id: "qv2", text: "2. And what will make you understand what the Night of al-Qadr is!" },
            { id: "qv3", text: "3. The Night of al-Qadr is better than a thousand months." },
            { id: "qv4", text: "4. In it, the angels and the Ruh descend by the permission of their Lord with decrees." },
            { id: "qv5", text: "5. It is peace until the coming of the dawn." }
          ],
          correctOrder: ["qv1", "qv2", "qv3", "qv4", "qv5"],
          hint: "The Surah starts with sending down the Qur'an, describes its greatness (better than 1000 months), then the descent of angels, and ends with peace till dawn.",
          explanation: "Surat al-Qadr has 5 verses in this exact order: sent down -> question of understanding -> better than 1000 months -> angels and Ruh descend -> peace until dawn.",
          bookReference: "Chapter 5 Verses 1–5, Page 24 (PDF p. 32)",
          points: 25
        }
      ]
    },
    {
      id: "tin",
      levelNumber: 3,
      title: "Surah At-Tin",
      titleArabic: "سُورَةُ التِّينِ",
      meaning: "The Fig",
      versesCount: 8,
      revelationCity: "Makkah",
      badgeName: "Mount Sinai Explorer",
      badgeIcon: "🌿",
      colorTheme: "#059669",
      intro: {
        summary: "This surah of eight verses was revealed in Makkah and takes its title from 'at-Teen' (the fig). Allah swears by four sacred things: the Fig, the Olive, Mount Sinai (where Allah spoke to Prophet Musa), and the Safe Land (Makkah). Allah affirms that He created man in the finest mould, yet man can be reduced to the lowest of the low (Hellfire), except believers who do good deeds!",
        keyVerses: [
          { ar: "وَالتِّينِ وَالزَّيْتُونِ", en: "By the fig and the olive," },
          { ar: "وَطُورِ سِينِينَ", en: "And Mount Sinai," },
          { ar: "وَهَٰذَا الْبَلَدِ الْأَمِينِ", en: "And this Safe Land;" },
          { ar: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ", en: "We have certainly created man in the best form;" },
          { ar: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", en: "Is Allah not the Best of judges?" }
        ]
      },
      questions: [
        {
          id: "t1",
          type: "one-word",
          title: "Meaning of the Surah Title",
          prompt: "What does the Arabic word 'At-Teen' mean in English?",
          placeholder: "Type English word...",
          acceptedAnswers: ["fig", "the fig", "figs"],
          hint: "The title refers to a wholesome, health-giving sweet fruit mentioned in verse 1.",
          explanation: "Surat at-Teen takes its title from the first word which means 'fig'.",
          bookReference: "Chapter 4, Page 20 (PDF p. 28)",
          points: 10
        },
        {
          id: "t2",
          type: "one-word",
          title: "The Safe Land",
          prompt: "Which holy city is referred to as 'this Safe Land' (Al-Balad al-Ameen) in Surat at-Tin?",
          placeholder: "Type city name...",
          acceptedAnswers: ["makkah", "mecca", "makka"],
          hint: "The textbook explains: '...and the Safe Land is ______, where the Qur'an was first revealed.'",
          explanation: "The 'Safe Land' is Makkah, where the Qur'an was first revealed.",
          bookReference: "Chapter 4, Page 20 (PDF p. 28)",
          points: 10
        },
        {
          id: "t3",
          type: "one-word",
          title: "Prophet at Mount Sinai",
          prompt: "Which Prophet of Allah spoke to Allah at Mount Sinai (Toor Sineen) as mentioned in Chapter 4?",
          placeholder: "Type Prophet's name...",
          acceptedAnswers: ["musa", "moses", "prophet musa", "prophet moses"],
          hint: "The book states: 'Mount Sinai is the place where Allah spoke to Prophet ______ (alayhis salam).'",
          explanation: "Mount Sinai is the sacred mountain where Allah spoke to Prophet Musa (alayhis salam).",
          bookReference: "Chapter 4, Page 20 (PDF p. 28)",
          points: 10
        },
        {
          id: "t4",
          type: "fill-blank",
          title: "Textbook Exercise Fill-in-the-Blanks",
          prompt: "Complete the official textbook blanks from Chapter 4 Exercise A.",
          segments: [
            { text: "1. Surat at-Teen was revealed in " },
            { input: true, answer: "Makkah", acceptable: ["Makkah", "Mecca"] },
            { text: ".\n2. Allah created man in the best " },
            { input: true, answer: "form", acceptable: ["form", "mould", "image and form"] },
            { text: ".\n3. Then He reduced him to the " },
            { input: true, answer: "lowest", acceptable: ["lowest"] },
            { text: " of the low." }
          ],
          wordBank: ["Makkah", "form", "lowest", "Madinah", "highest", "earth"],
          hint: "These are the exact three sentences from Chapter 4 Exercise A in your textbook.",
          explanation: "Directly from Chapter 4 Exercise A: '1. Surat at-Teen was revealed in Makkah. 2. Allah created man in the best form. 3. Then He reduced him to the lowest of the low.'",
          bookReference: "Chapter 4 Exercise A, Page 22 (PDF p. 30)",
          points: 15
        },
        {
          id: "t5",
          type: "matching",
          title: "The Four Oaths of Surat At-Tin",
          prompt: "Match the four sacred things Allah swears by in Surat at-Tin with their textbook explanations.",
          pairs: [
            { id: "tp1", left: "The Fig and the Olive", right: "Wholesome health-giving fruits" },
            { id: "tp2", left: "Mount Sinai", right: "Where Allah spoke to Prophet Musa (as)" },
            { id: "tp3", left: "This Safe Land", right: "Makkah, where the Qur'an was first revealed" },
            { id: "tp4", left: "The Lowest of the Low", right: "Hellfire (and old age according to some scholars)" }
          ],
          hint: "Allah swears by four things in the opening verses of Surat at-Tin before declaring man's noble creation.",
          explanation: "In verses 1–3, Allah swears by the fig, olive, Mount Sinai, and Makkah. Then verse 5 mentions reducing the disobedient to the lowest of the low (Hellfire).",
          bookReference: "Chapter 4, Pages 20–21 (PDF p. 28–29)",
          points: 20
        },
        {
          id: "t6",
          type: "matching",
          title: "Arabic Vocabulary of Surah At-Tin",
          prompt: "Match each Arabic phrase with its meaning according to the textbook.",
          pairs: [
            { id: "tv1", left: "At-Teen (التِّينِ)", right: "The Fig" },
            { id: "tv2", left: "Az-Zaytoon (الزَّيْتُونِ)", right: "The Olive" },
            { id: "tv3", left: "Toor Sineen (طُورِ سِينِينَ)", right: "Mount Sinai" },
            { id: "tv4", left: "Al-Balad al-Ameen (الْبَلَدِ الْأَمِينِ)", right: "This Safe Land (Makkah)" },
            { id: "tv5", left: "Ahsani taqweem (أَحْسَنِ تَقْوِيمٍ)", right: "The best form / finest mould" },
            { id: "tv6", left: "Ahkamul haakimeen (أَحْكَمِ الْحَاكِمِينَ)", right: "The Best of judges" }
          ],
          hint: "Review verses 1, 2, 3, 4, and 8 of Surat at-Tin.",
          explanation: "These Arabic phrases are the cornerstone vocabulary of Surat at-Tin, culminating in Allah being 'Ahkamul-haakimeen' (The Best of judges).",
          bookReference: "Chapter 4 Verses 1–8 (PDF p. 28–29)",
          points: 30
        },
        {
          id: "t7",
          type: "fill-blank",
          title: "Reward and Justice in Surah At-Tin",
          prompt: "Fill in the missing words about the believers' reward and Allah's absolute justice.",
          segments: [
            { text: "Those who believe and do right actions will have a " },
            { input: true, answer: "never-ending", acceptable: ["never-ending", "never ending", "without end"] },
            { text: " reward. Allah is the Best of judges Who does not do any " },
            { input: true, answer: "injustice", acceptable: ["injustice", "wrong"] },
            { text: " to anyone." }
          ],
          wordBank: ["never-ending", "injustice", "temporary", "favour", "doubt"],
          hint: "The book says their reward is without end, and Allah never wrongs anyone.",
          explanation: "Verse 6 promises a never-ending reward for those who believe and do good deeds. The closing explanation confirms Allah is the Best of judges Who does no injustice.",
          bookReference: "Chapter 4, Page 21 (PDF p. 29)",
          points: 15
        },
        {
          id: "t8",
          type: "one-word",
          title: "Meaning of Ahkamul-Haakimeen",
          prompt: "What does the question 'Is Allah not the Best of judges?' mean in the textbook? It means Allah will establish the Day of Judgement in absolute [______].",
          placeholder: "Type quality...",
          acceptedAnswers: ["justice", "absolute justice", "fairness"],
          hint: "The book states: 'It is in absolute ______ that He will establish the Day of Judgement...'",
          explanation: "The textbook explains: 'It is in absolute Justice that He will establish the Day of Judgement, and He will then reward the good people and punish the evil ones.'",
          bookReference: "Chapter 4, Page 21 (PDF p. 29)",
          points: 10
        },
        {
          id: "t9",
          type: "ordering",
          title: "Order the Verses of Surah At-Tin",
          prompt: "Arrange the first four verses of Surat at-Tin in their proper order.",
          items: [
            { id: "tv1", text: "1. By the fig and the olive," },
            { id: "tv2", text: "2. And Mount Sinai," },
            { id: "tv3", text: "3. And this Safe Land;" },
            { id: "tv4", text: "4. We have certainly created man in the best form;" }
          ],
          correctOrder: ["tv1", "tv2", "tv3", "tv4"],
          hint: "Fruits first, then Mount Sinai, then the Safe Land, then the creation of man.",
          explanation: "Allah swears by the fig & olive (1), Mount Sinai (2), the Safe Land (3), and then states that He created man in the best form (4).",
          bookReference: "Chapter 4 Verses 1–4, Page 20 (PDF p. 28)",
          points: 20
        }
      ]
    },
    {
      id: "master",
      levelNumber: 4,
      title: "The Three Surahs Master Quiz",
      titleArabic: "التَّحَدِّي الشَّامِلُ لِلسُّوَرِ الثَّلَاثِ",
      meaning: "Final Master Challenge",
      versesCount: 21,
      revelationCity: "Comprehensive Review",
      badgeName: "Quran Quest Champion",
      badgeIcon: "🏆",
      colorTheme: "#d97706",
      intro: {
        summary: "Welcome to the Grand Final Challenge! Here, all three Surahs—Az-Zalzalah, Al-Qadr, and At-Tin—are brought together. Test your knowledge, distinguish between the chapters, match their unique messages, and earn the title of Quran Quest Champion!",
        keyVerses: [
          { ar: "Surah Az-Zalzalah", en: "The great earthquake and accurate reckoning to an atom's weight." },
          { ar: "Surah Al-Qadr", en: "The blessed Night of Decree, better than a thousand months." },
          { ar: "Surah At-Tin", en: "The four oaths, creation in finest form, and absolute justice." }
        ]
      },
      questions: [
        {
          id: "m1",
          type: "one-word",
          title: "Which Surah?",
          prompt: "Which of the three Surahs describes the earth throwing out its burdens and shaking over and over again on the Day of Judgement?",
          placeholder: "Type Surah name...",
          acceptedAnswers: ["az-zalzalah", "zalzalah", "surat az-zalzalah", "surah az-zalzalah"],
          hint: "Its title means 'The Earthquake'.",
          explanation: "Surat az-Zalzalah describes the fearful events of the Day of Judgement when the earth is shaken and gives up its burdens.",
          bookReference: "Chapter 6 (PDF p. 35–37)",
          points: 10
        },
        {
          id: "m2",
          type: "one-word",
          title: "Which Surah?",
          prompt: "In which Surah does Allah describe a single night during Ramadan that is 'better than a thousand months'?",
          placeholder: "Type Surah name...",
          acceptedAnswers: ["al-qadr", "qadr", "surat al-qadr", "surah al-qadr"],
          hint: "Its title means 'The Decree'.",
          explanation: "Surat al-Qadr reveals that Laylat al-Qadr (the Night of Decree) is better than a thousand months.",
          bookReference: "Chapter 5 (PDF p. 31–33)",
          points: 10
        },
        {
          id: "m3",
          type: "one-word",
          title: "Which Surah?",
          prompt: "In which Surah does Allah swear by two wholesome fruits, Mount Sinai, and the Safe Land?",
          placeholder: "Type Surah name...",
          acceptedAnswers: ["at-tin", "at-teen", "tin", "teen", "surat at-tin", "surat at-teen", "surah at-tin"],
          hint: "Its title means 'The Fig'.",
          explanation: "Surat at-Tin opens with the oaths: By the fig and the olive, Mount Sinai, and this Safe Land.",
          bookReference: "Chapter 4 (PDF p. 27–29)",
          points: 10
        },
        {
          id: "m4",
          type: "matching",
          title: "Classify Key Facts to the Correct Surah",
          prompt: "Match each statement or fact from the textbook to the Surah it belongs to.",
          pairs: [
            { id: "mp1", left: "Angel Jibreel descends with decrees", right: "Surah Al-Qadr" },
            { id: "mp2", left: "The earth throws out its treasures and the dead", right: "Surah Az-Zalzalah" },
            { id: "mp3", left: "Mount Sinai where Allah spoke to Prophet Musa (as)", right: "Surah At-Tin" },
            { id: "mp4", left: "Whoever does an atom's weight of good will see it", right: "Surah Az-Zalzalah" },
            { id: "mp5", left: "The entire Qur'an sent down to Baitul-'Izzah", right: "Surah Al-Qadr" },
            { id: "mp6", left: "Man created in the best form, then reduced to lowest of low", right: "Surah At-Tin" }
          ],
          hint: "Think carefully about which chapter taught each specific lesson.",
          explanation: "Each Surah highlights distinct events: Al-Qadr focuses on Laylat al-Qadr and Qur'an's revelation; Az-Zalzalah focuses on the Day of Judgement; At-Tin focuses on human creation and divine justice.",
          bookReference: "Chapters 4, 5, and 6",
          points: 30
        },
        {
          id: "m5",
          type: "matching",
          title: "Match All Three Surah Titles to English Meanings",
          prompt: "Match each Arabic Surah name to its English title given in the textbook.",
          pairs: [
            { id: "mt1", left: "Surat az-Zalzalah (الزلزلة)", right: "The Earthquake" },
            { id: "mt2", left: "Surat al-Qadr (القدر)", right: "The Decree" },
            { id: "mt3", left: "Surat at-Teen (التين)", right: "The Fig" }
          ],
          hint: "Check the title headers of Chapters 4, 5, and 6 in your book.",
          explanation: "Az-Zalzalah = The Earthquake, Al-Qadr = The Decree, At-Teen = The Fig.",
          bookReference: "Chapters 4, 5, and 6 Titles",
          points: 15
        },
        {
          id: "m6",
          type: "fill-blank",
          title: "Compare Verses and Revelation",
          prompt: "Fill in the missing numbers and place names to compare the three Surahs.",
          segments: [
            { text: "Both Surat az-Zalzalah and Surat at-Teen have " },
            { input: true, answer: "eight", acceptable: ["eight", "8"] },
            { text: " verses, while Surat al-Qadr has " },
            { input: true, answer: "five", acceptable: ["five", "5"] },
            { text: " verses. All three chapters were revealed in the holy city of " },
            { input: true, answer: "Makkah", acceptable: ["Makkah", "Mecca"] },
            { text: "." }
          ],
          wordBank: ["eight", "five", "Makkah", "Madinah", "ten", "three"],
          hint: "Count: Az-Zalzalah has 8, At-Tin has 8, Al-Qadr has 5.",
          explanation: "Surat az-Zalzalah (8 verses) and Surat at-Teen (8 verses) were both revealed in Makkah. Surat al-Qadr has 5 verses.",
          bookReference: "Chapters 4, 5, 6 Introductions",
          points: 15
        },
        {
          id: "m7",
          type: "one-word",
          title: "Gradual Revelation Period",
          prompt: "According to Chapter 5, over how many years did the Qur'an come down in parts to Prophet Muhammad (pbuh)?",
          placeholder: "Type number of years...",
          acceptedAnswers: ["23", "twenty-three", "twenty three", "23 years", "twenty-three years"],
          hint: "The book states: '...according to the incidents that occurred over a period of ______ years.'",
          explanation: "The Qur'an came down in parts to the Prophet (pbuh) over 23 years.",
          bookReference: "Chapter 5, Page 24 (PDF p. 32)",
          points: 10
        },
        {
          id: "m8",
          type: "fill-blank",
          title: "Key Teachings Across the Surahs",
          prompt: "Fill in the blanks with the exact concepts from the textbook.",
          segments: [
            { text: "On the Day of Judgement, an " },
            { input: true, answer: "atom's", acceptable: ["atom's", "atom"] },
            { text: " weight of good or evil will be counted. During Laylat al-Qadr, Satan cannot cause harm until the coming of " },
            { input: true, answer: "dawn", acceptable: ["dawn", "the dawn", "fajr"] },
            { text: ". Those who believe and do good actions in Surat at-Tin receive a " },
            { input: true, answer: "never-ending", acceptable: ["never-ending", "never ending"] },
            { text: " reward." }
          ],
          wordBank: ["atom's", "dawn", "never-ending", "mountain's", "sunset", "limited"],
          hint: "Review verse 7 in Az-Zalzalah, verse 5 in Al-Qadr, and verse 6 in At-Tin.",
          explanation: "Az-Zalzalah teaches precision down to an atom's weight; Al-Qadr brings peace until dawn; At-Tin guarantees never-ending reward for righteous believers.",
          bookReference: "Chapters 4, 5, 6 Summary",
          points: 15
        },
        {
          id: "m9",
          type: "matching",
          title: "Master Arabic Vocabulary Match",
          prompt: "Match these famous Arabic phrases from the three chapters with their English meanings.",
          pairs: [
            { id: "mm1", left: "Mithqaala dharrah (مِثْقَالَ ذَرَّةٍ)", right: "An atom's weight" },
            { id: "mm2", left: "Alfi shahr (أَلْفِ شَهْرٍ)", right: "A thousand months" },
            { id: "mm3", left: "Al-Balad al-Ameen (الْبَلَدِ الْأَمِينِ)", right: "The Safe Land (Makkah)" },
            { id: "mm4", left: "Ahkamul haakimeen (أَحْكَمِ الْحَاكِمِينَ)", right: "The Best of judges" }
          ],
          hint: "Identify which phrase belongs to each of the three chapters.",
          explanation: "Mithqaala dharrah (Az-Zalzalah v. 7-8), Alfi shahr (Al-Qadr v. 3), Al-Balad al-Ameen (At-Tin v. 3), Ahkamul haakimeen (At-Tin v. 8).",
          bookReference: "Chapters 4, 5, 6 Arabic ayaat",
          points: 20
        },
        {
          id: "m10",
          type: "one-word",
          title: "Ultimate Moral of the Chapters",
          prompt: "The textbook emphasizes that Allah will surely hand out exact ______ to His creatures on the Day of Judgement because He is the Best of judges.",
          placeholder: "Type word...",
          acceptedAnswers: ["justice", "exact justice", "fairness"],
          hint: "The book states: 'Allah will surely hand out exact ______ to His creatures in the end!'",
          explanation: "The textbook emphasizes that Allah will surely hand out exact justice to His creatures, rewarding the good and punishing the evil.",
          bookReference: "Chapter 4, Page 21 (PDF p. 29)",
          points: 10
        }
      ]
    }
  ]
};

// Freeze data to prevent accidental mutations
Object.freeze(QUIZ_DATA);

if (typeof window !== "undefined") {
  window.QUIZ_DATA = QUIZ_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = QUIZ_DATA;
}
