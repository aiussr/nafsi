// src/data/flashcards.js

// Categories organized by week (from your PDF documents)
export const categories = {
  week1: [
    "Encouragement to Use Reason",
    "Demand for Proof",
    "Challenging Blind Following",
    "Call for Analytical Thinking",
    "Critique of False Assumptions"
  ],
  week2: [
    "Cosmology and the Universe",
    "Celestial Bodies and Light",
    "Motion, Orbits, and Rotation",
    "Water Cycle, Rain, and Clouds",
    "Wind, Thunder, and Natural Forces",
    "Earth, Mountains, and Geological Processes",
    "Heat, Fire, and Energy",
    "Creation, Biology, and Life",
    "Earth and Ecosystems",
    "Time, Space, and Relativity"
  ],
  week3: [
    "Truthfulness and Integrity",
    "Kindness and Compassion",
    "Justice and Fairness",
    "Trust and Responsibility",
    "Patience and Forgiveness",
    "Humility and Gratitude",
    "Good Speech and Knowledge"
  ],
  week4: [
    "Governance, Leadership, and Authority",
    "Justice and Fairness",
    "War, Peace, and Security",
    "Corruption and Accountability",
    "Laws, Legislation, and Divine Guidance",
    "Peace, Reconciliation, and Unity"
  ],
  week5: [
    "The Nature and Attributes of God",
    "God's Knowledge and the Unseen",
    "Creation and Cosmology",
    "Divine Presence and Immanence",
    "The Human Condition, Soul, and Free Will",
    "Time, Death, and the Afterlife"
  ]
};

// Week names for UI display
export const weekNames = {
  week1: "Logic",
  week2: "Physics",
  week3: "Ethics",
  week4: "Politics",
  week5: "Metaphysics"
};

// Flashcard data from your PDF documents, formatted for the application
export const flashcardsData = [
  // === WEEK 1: LOGIC ===
  // Encouragement to Use Reason
  {
    id: "w1-1",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "أَفَلَا تَعْقِلُونَ",
    english: "Will you not use reason?",
    reference: "Surat Al-Baqarah, 2:44"
  },
  {
    id: "w1-2",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ",
    english: "Do they not reflect on the Qur'an?",
    reference: "Surat An-Nisa, 4:82"
  },
  {
    id: "w1-3",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "لَعَلَّكُمْ تَعْقِلُونَ",
    english: "So that you may understand.",
    reference: "Surat Al-Baqarah, 2:242"
  },
  {
    id: "w1-4",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "إِنَّ فِى ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَعْقِلُونَ",
    english: "Indeed, in that are signs for people who reason.",
    reference: "Surat Al-Rum, 30:28"
  },
  {
    id: "w1-5",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "يَتَفَكَّرُونَ فِى خَلْقِ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ",
    english: "They reflect on the creation of the heavens and the earth.",
    reference: "Surat Al-Imran, 3:191"
  },
  {
    id: "w1-6",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "أَوَلَمْ يَتَفَكَّرُواْ فِىٓ أَنفُسِهِمْ",
    english: "Have they not thought about their own selves.",
    reference: "Surat Al-Rum, 30:8"
  },
  {
    id: "w1-7",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "أَفَلَا يَنظُرُونَ إِلَى ٱلْإِبِلِ كَيْفَ خُلِقَتْ",
    english: "Do they not look at the camels – how they are created?",
    reference: "Surat Al-Ghashiyah, 88:17"
  },
  {
    id: "w1-8",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "وَفِىٓ أَنفُسِكُمْۚ أَفَلَا تُبْصِرُونَ",
    english: "And in yourselves. Then will you not see?",
    reference: "Surat Adh-Dhariyat, 51:21"
  },
  {
    id: "w1-9",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "وَتِلْكَ ٱلْأَمْثَٰـلُ نَضْرِبُهَا لِلنَّاسِ لَعَلَّهُمْ يَتَفَكَّرُونَ",
    english: "And these examples We present to the people that perhaps they will reflect.",
    reference: "Surat Al-Hashr, 59:21"
  },
  {
    id: "w1-10",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "وَفِى ٱلْأَرْضِ ءَايَـٰتٌ لِّلْمُوقِنِينَ",
    english: "And on the earth are signs for those who are certain.",
    reference: "Surat Adh-Dhariyat, 51:20"
  },
  
  // Demand for Proof
  {
    id: "w1-11",
    week: "week1",
    category: "Demand for Proof",
    arabic: "قُلْ هَاتُواْ بُرْهَٰنَكُمْ",
    english: "Say, 'Bring forth your own proof.'",
    reference: "Surat Al-Baqarah, 2:111"
  },
  {
    id: "w1-12",
    week: "week1",
    category: "Demand for Proof",
    arabic: "وَإِن كُنتُمْ فِى رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُواْ بِسُورَةٍ مِّن مِّثْلِهِۦ",
    english: "And if you are in doubt about what We have sent down upon Our Worshipper, then produce a Surat the like thereof.",
    reference: "Surat Al-Baqarah, 2:23"
  },
  {
    id: "w1-13",
    week: "week1",
    category: "Demand for Proof",
    arabic: "أَمِ ٱتَّخَذُواْ مِن دُونِهِۦٓ ءَالِهَةٌۭ ۖ قُلْ هَاتُواْ بُرْهَٰنَكُمْ",
    english: "Or have they taken gods besides Him? Say, 'Bring your proof.'",
    reference: "Surat Al-Anbiya, 21:24"
  },
  {
    id: "w1-14",
    week: "week1",
    category: "Demand for Proof",
    arabic: "فَاتُواْ بِكِتَٰبِكُمْ إِن كُنتُمْ صَٰدِقِينَ",
    english: "Then bring your scripture, if you are telling the truth.",
    reference: "Surat As-Saffat, 37:157"
  },
  {
    id: "w1-15",
    week: "week1",
    category: "Demand for Proof",
    arabic: "قَالُواْ سُبْحَٰنَكَ لَا عِلْمَ لَنَآ إِلَّا مَا عَلَّمْتَنَا",
    english: "They said, 'Exalted are You; we have no knowledge except what You have taught us.'",
    reference: "Surat Al-Baqarah, 2:32"
  },
  {
    id: "w1-16",
    week: "week1",
    category: "Demand for Proof",
    arabic: "فَٱسْتَبِقُواْ ٱلْخَيْرَٰتِ",
    english: "Vie in virtue.",
    reference: "Surat Al-Baqarah, 2:148"
  },
  {
    id: "w1-17",
    week: "week1",
    category: "Demand for Proof",
    arabic: "وَإِذَا قِيلَ لَهُمُ ٱتَّبِعُواْ مَآ أَنزَلَ ٱللَّهُ قَالُواْ بَلْ نَتَّبِعُ مَآ أَلْفَيْنَا عَلَيْهِ ءَابَآءَنَا",
    english: "And when it is said to them, 'Follow what Allah has revealed,' they say, 'Rather, we will follow that which we found our fathers doing.'",
    reference: "Surat Al-Baqarah, 2:170"
  },
  {
    id: "w1-18",
    week: "week1",
    category: "Demand for Proof",
    arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
    english: "And do not follow blindly what you do not know to be true.",
    reference: "Surat Al-Isra, 17:36"
  },
  {
    id: "w1-19",
    week: "week1",
    category: "Demand for Proof",
    arabic: "إِنَّ ٱلسَّمْعَ وَٱلْبَصَرَ وَٱلْفُؤَادَ كُلُّ أُوْلَـٰٓئِكَ كَانَ عَنْهُ مَسْـُٔولًا",
    english: "Ears, eyes, and heart; you will be questioned about all these.",
    reference: "Surat Al-Isra, 17:36"
  },
  {
    id: "w1-20",
    week: "week1",
    category: "Demand for Proof",
    arabic: "وَلَا تَقُولُواْ لِمَا تَصِفُ أَلْسِنَتُكُمُ ٱلْكَذِبَ هَٰذَا حَلَٰلٌ وَهَٰذَا حَرَامٌ",
    english: "Do not say ignorantly: 'This is lawful and that is unlawful'",
    reference: "Surat An-Nahl, 16:116"
  },
  {
    id: "w1-21",
    week: "week1",
    category: "Demand for Proof",
    arabic: "فَإِن كُنتَ فِى شَكٍّ مِّمَّآ أَنزَلْنَآ إِلَيْكَ فَسْـَٔلِ ٱلَّذِينَ يَقْرَءُونَ ٱلْكِتَٰبَ",
    english: "So if you are in doubt about what We have revealed to you, then ask those who have been reading the Scripture before you.",
    reference: "Surat Yunus, 10:94"
  },
  
  // Challenging Blind Following
  {
    id: "w1-22",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "وَمَا لَهُم بِهِۦ مِنْ عِلْمٍ إِن يَتَّبِعُونَ إِلَّا ٱلظَّنَّ",
    english: "And they have no certain knowledge of it. They follow not except assumption.",
    reference: "Surat An-Najm, 53:28"
  },
  {
    id: "w1-23",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "بَلْ أَكْثَرُهُمُ لَا يَعْقِلُونَ",
    english: "But most of them do not use reason.",
    reference: "Surat Al-Ankabut, 29:63"
  },
  {
    id: "w1-24",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "بَلِ ٱتَّبَعَ ٱلَّذِينَ ظَلَمُوٓاْ أَهْوَآءَهُم بِغَيْرِ عِلْمٍ",
    english: "But those who wrong, follow their low desires without knowledge.",
    reference: "Surat Ar-Rum, 30:29"
  },
  {
    id: "w1-25",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "قُلْ لَآ أَسْـَٔلُكُمْ عَلَيْهِ أَجْرًا إِنْ هُوَ إِلَّا ذِكْرٌ لِّلْعَـٰلَمِينَ",
    english: "Say, 'I do not ask you for any payment. It is but a reminder for the worlds.'",
    reference: "Surat Al-An'am, 6:90"
  },
  {
    id: "w1-26",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "أَفَلَا تَذَكَّرُونَ",
    english: "Will you not then take heed?",
    reference: "Surat Al-An'am, 6:80"
  },
  {
    id: "w1-27",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "يَـٰٓأُوْلِى ٱلْأَبْصَـٰرِ فَٱعْتَبِرُواْ",
    english: "So take warning, O people of vision.",
    reference: "Surat Al-Hashr, 59:2"
  },
  {
    id: "w1-28",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "وَلَوْ كَانَ مِنْ عِندِ غَيْرِ ٱللَّهِ لَوَجَدُواْ فِيهِ ٱخْتِلَـٰفًا كَثِيرًا",
    english: "If it had been from [any] other than Allah, they would have found within it much contradiction.",
    reference: "Surat An-Nisa, 4:82"
  },
  {
    id: "w1-29",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "وَمَا تَفَرَّقَ ٱلَّذِينَ أُوتُواْ ٱلْكِتَـٰبَ إِلَّا مِنٍۢ بَعْدِ مَا جَآءَتْهُمُ ٱلْبَيِّنَةُ",
    english: "Nor did those who were given the Scripture differ except after the clear evidence had come to them.",
    reference: "Surat Al-Bayyinah, 98:4"
  },
  
  // Call for Analytical Thinking
  {
    id: "w1-30",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَـٰكُمْ عَبَثًا",
    english: "Did you think that We created you aimlessly?",
    reference: "Surat Al-Mu'minun, 23:115"
  },
  {
    id: "w1-31",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "فَإِنَّمَا عَلَيْكَ ٱلْبَلَـٰغُ وَعَلَيْنَا ٱلْحِسَابُ",
    english: "Upon you is only the [duty of] notification, and upon Us is the account.",
    reference: "Surat Ar-Ra'd, 13:40"
  },
  {
    id: "w1-32",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "وَلَقَدْ تَرَكْنَـٰهَآ ءَايَةً فَهَلْ مِن مُّدَّكِرٍ",
    english: "And We left it as a sign, so is there any who will remember?",
    reference: "Surat Al-Qamar, 54:15"
  },
  {
    id: "w1-33",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "وَمَآ أَكْثَرُ ٱلنَّاسِ وَلَوْ حَرَصْتَ بِمُؤْمِنِينَ",
    english: "And most of the people, although you strive [for it], will not be believers.",
    reference: "Surat Yusuf, 12:103"
  },
  {
    id: "w1-34",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "وَٱلَّذِينَ يُجَـٰدِلُونَ فِىٓ ءَايَـٰتِ ٱللَّهِ بِغَيْرِ سُلْطَـٰنٍ أَتَىٰهُمْ",
    english: "And those who dispute concerning the signs of Allah without proof having come to them.",
    reference: "Surat Ghafir, 40:56"
  },
  {
    id: "w1-35",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "وَتَرَى ٱلْجِبَالَ تَحْسَبُهَا جَامِدَةً وَهِىَ تَمُرُّ مَرَّ ٱلسَّحَابِ",
    english: "And you see the mountains, thinking them motionless, while they float as the passing of clouds.",
    reference: "Surat An-Naml, 27:88"
  },
  {
    id: "w1-36",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "إِنَّمَآ أَنتَ مُذَكِّرٌ فَذَكِّرْ",
    english: "So remind, [O Muhammad]; you are only a reminder.",
    reference: "Surat Al-Ghashiyah, 88:21"
  },
  
  // Critique of False Assumptions
  {
    id: "w1-37",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "وَإِنَّ ٱلظَّنَّ لَا يُغْنِى مِنَ ٱلْحَقِّ شَيْـًٔا",
    english: "Indeed, assumption are of no value at all against the truth.",
    reference: "Surat Yunus, 10:36"
  },
  {
    id: "w1-38",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "فَٱتَّقُواْ ٱللَّهَ وَأَطِيعُونِ",
    english: "So be mindful of Allah and respond to me.",
    reference: "Surat Ash-Shu'ara, 26:179"
  },
  {
    id: "w1-39",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "قَدْ تَبَيَّنَ ٱلرُّشْدُ مِنَ ٱلْغَىِّ",
    english: "Surely the right path has become distinct from the wrong one.",
    reference: "Surat Al-Baqarah, 2:256"
  },
  {
    id: "w1-40",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "وَأَنزَلْنَآ إِلَيْكَ ٱلذِّكْرَ لِتُبَيِّنَ لِلنَّاسِ",
    english: "And We have sent down to you the message that you may explain clearly to the people.",
    reference: "Surat An-Nahl, 16:44"
  },
  {
    id: "w1-41",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "فَٱقْصُصِ ٱلْقَصَصَ لَعَلَّهُمْ يَتَفَكَّرُونَ",
    english: "So relate the stories that perhaps they will give thought.",
    reference: "Surat Al-A'raf, 7:176"
  },
  {
    id: "w1-42",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "قَدْ جَآءَكُمْ بَصَآئِرُ مِن رَّبِّكُمْ",
    english: "There has come to you enlightenment from your Lord.",
    reference: "Surat Al-An'am, 6:104"
  },
  {
    id: "w1-43",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "وَمَآ أَنزَلْنَا عَلَيْكَ ٱلْكِتَـٰبَ إِلَّا لِتُبَيِّنَ لَهُمُ ٱلَّذِى ٱخْتَلَفُواْ فِيهِ",
    english: "And We have not revealed to you the Book except that you may make clear to them that wherein they differ.",
    reference: "Surat An-Nahl, 16:64"
  },
  {
    id: "w1-44",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "وَلَوْ شَآءَ ٱللَّهُ لَجَعَلَكُمْ أُمَّةً وَٰحِدَةً",
    english: "And if Allah had willed, He could have made you one nation.",
    reference: "Surat Al-Ma'idah, 5:48"
  },
  {
    id: "w1-45",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "لِكُلّٖ َجعَلْنَا مِنكُمْ شِرْعَةً وَمِنْهَاجًا",
    english: "To each of you, we assigned a path and a clear track.",
    reference: "Surat Al-Ma'idah, 5:48"
  },
  {
    id: "w1-46",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ",
    english: "And they encompass not a thing of His knowledge except for what He wills.",
    reference: "Surat Al-Baqarah, 2:255"
  },
  
  // === WEEK 2: PHYSICS ===
{
    id: "w2-1",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "ٱلَِّذى َخلََق ٱلسََّمٰـَوِٰت َوٱْْلَْرَض",
    english: "[He] who created the heavens and the earth.",
    reference: "Surat Al-An'am, 6:1"
  },
  {
    id: "w2-2",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "َوٱلسََّمآَء بَنَْينَـَٰها بِأَْييٍد َوإِنَّا لَُموِسعُوَن",
    english: "And We built the Heavens with power, and indeed, We will expand them.",
    reference: "Surat Adh-Dhariyat, 51:47"
  },
  {
    id: "w2-3",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "َخلََق ٱلسََّمٰـَوِٰت َوٱْْلَْرَض فِى ِستَِّة أَيَّاٍم",
    english: "He created the heavens and the earth in six days.",
    reference: "Surat Al-A'raf, 7:54"
  },
  {
    id: "w2-4",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "ٱلشَّْمُس َوٱلْقََمُر بُِحْسبَاٍن",
    english: "The sun and the moon [move] by precise calculation.",
    reference: "Surat Ar-Rahman, 55:5"
  },
  {
    id: "w2-5",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "َوُكلٌّ فِى فَلٍَك يَْسبَُحوَن",
    english: "Each floating in its orbit.",
    reference: "Surat Yasin, 36:40"
  },
  
  // Celestial Bodies and Light
  {
    id: "w2-6",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "َوَجعََل ٱلشَّْمَس ِسَراًجا",
    english: "And We made the sun a burning lamp.",
    reference: "Surat Nuh, 71:16"
  },
  {
    id: "w2-7",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "َوٱلْقََمَر نُوًرا",
    english: "And [made] the moon a light.",
    reference: "Surat Yunus, 10:5"
  },
  {
    id: "w2-8",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "َوَجعََل ٱلْقََمَر فِيِهنَّ نُوًرا َوَجعََل ٱلشَّْمَس ِسَراًجا",
    english: "And placed the moon as a light in them and the sun as a lamp.",
    reference: "Surat Nuh, 71:16"
  },
  {
    id: "w2-9",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "َوٱلنَّْجِم إِذَا َهَوٰى",
    english: "By the star when it goes down.",
    reference: "Surat An-Najm, 53:1"
  },
  {
    id: "w2-10",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "َولَقَد َزيَّنَّا ٱلسََّمآَء ٱلدُّنْيَا بَِمَصٰـبِيَح",
    english: "And We adorned the nearest heaven with lamps.",
    reference: "Surat Al-Mulk, 67:5"
  },
  
  // Motion, Orbits, and Rotation
  {
    id: "w2-11",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "َوٱلشَّْمَس تَْجِرى ِلُمْستَقٍَر لََّها",
    english: "And the sun runs [on course] toward its stopping point.",
    reference: "Surat Yasin, 36:38"
  },
  {
    id: "w2-12",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "ََل ٱلشَّْمُس يَنبَِغى لََهآ أَن تُْدِرَك ٱلْقََمَر َوََل ٱلَّيُْل َسابُِق ٱلنََّهاِر",
    english: "It is not allowable for the sun to reach the moon, nor does the night overtake the day.",
    reference: "Surat Yasin, 36:40"
  },
  {
    id: "w2-13",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "َوُهَو ٱلَِّذى َخلََق ٱلَّيَْل َوٱلنََّهاَر َوٱلشَّْمَس َوٱلْقََمَر",
    english: "And it is He who created the night and the day and the sun and the moon.",
    reference: "Surat Al-Anbiya, 21:33"
  },
  {
    id: "w2-14",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "َوٱلنَّْجُم َوٱلشََّجُر يَْسُجَداِن",
    english: "And the stars and trees submit.",
    reference: "Surat Ar-Rahman, 55:6"
  },
  {
    id: "w2-15",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "َوَسخََّر لَُكُم ٱلشَّْمَس َوٱلْقََمَر َدآئِبَيِْن",
    english: "And He has subjected for you the sun and the moon, continuous [in orbit].",
    reference: "Surat Ibrahim, 14:33"
  },
  
  // Water Cycle, Rain, and Clouds
  {
    id: "w2-16",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "َوأَنَزلْنَا ِمَن ٱلسََّمآِء َمآًء بِقََدٍر",
    english: "And We sent down from the sky water in [due] measure.",
    reference: "Surat Al-Mu'minun, 23:18"
  },
  {
    id: "w2-17",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "َوَجعَلْنَا ِمَن ٱلَْمآِء ُكلَّ َشْىٍء َحٍى",
    english: "And We made every living thing from water.",
    reference: "Surat Al-Anbiya, 21:30"
  },
  {
    id: "w2-18",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "َوُهَو ٱلَِّذى يُنَِزُل ٱلْغَيَْث",
    english: "And it is He who sends down the rain.",
    reference: "Surat Ash-Shura, 42:28"
  },
  {
    id: "w2-19",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "َويُنَِزُل َعلَيُْكم ِمَن ٱلسََّمآِء َمآًء لِيَُطِهَرُكم بِِه",
    english: "And He sends down rain from the sky to cleanse you.",
    reference: "Surat Al-Anfal, 8:11"
  },
  {
    id: "w2-20",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "َوأَنَزَل ِمَن ٱلسََّمآِء َمآًء فَأَْخَرَج بِِهۦ ِمَن ٱلثََّمَرٰتِ ِرْزقًا لَُّكْم",
    english: "And He sent down rain from the sky and brought forth thereby fruits as provision for you.",
    reference: "Surat Al-Baqarah, 2:22"
  },
  
  // Wind, Thunder, and Natural Forces
  {
    id: "w2-21",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "َوأَْرَسلْنَا ٱلِريَٰـَح لََواقَِح",
    english: "And We send the winds fertilizing [the clouds].",
    reference: "Surat Al-Hijr, 15:22"
  },
  {
    id: "w2-22",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "يُْرِسِل ٱلِريَٰـَح فَتُثِيُر َسَحابًا",
    english: "He sends the winds and they stir the clouds.",
    reference: "Surat Ar-Rum, 30:48"
  },
  {
    id: "w2-23",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "َويُْرِسُل ٱلَصَواِعَق فَيُِصيُب بَِها َمن يََشآُء",
    english: "And He sends thunderbolts and strikes with them whom He wills.",
    reference: "Surat Ar-Ra'd, 13:13"
  },
  {
    id: "w2-24",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "َوفِى ٱلسََّمآِء ِرْزقُُكْم َوَما تُوَعُدوَن",
    english: "And in the heaven is your provision and whatever you are promised.",
    reference: "Surat Adh-Dhariyat, 51:22"
  },
  {
    id: "w2-25",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "َوَمن يُْرِسُل ٱلِريَاَح بُْشًرا بَيَْن يََدْى َرْحَمتِِهۦ",
    english: "Who sends the winds as good tidings before His mercy.",
    reference: "Surat An-Naml, 27:63"
  },
  
  // Earth, Mountains, and Geological Processes
  {
    id: "w2-26",
    week: "week2",
    category: "Earth, Mountains, and Geological Processes",
    arabic: "َوٱلِْجبَاَل أَْوتَاًدا",
    english: "And the mountains to keep it [the earth] stable.",
    reference: "Surat An-Naba, 78:7"
  },
  {
    id: "w2-27",
    week: "week2",
    category: "Earth, Mountains, and Geological Processes",
    arabic: "َوَجعَلْنَا فِيَها َرَواِسَى َشاِمَخاٍت",
    english: "And We placed therein lofty, firmly-set mountains.",
    reference: "Surat Al-Mursalat, 77:27"
  },
  {
    id: "w2-28",
    week: "week2",
    category: "Earth, Mountains, and Geological Processes",
    arabic: "َوأَلْقَٰى فِى ٱْْلَْرِض َرَواِسَى أَن تَِميَد بُِكْم",
    english: "And He placed firmly-set mountains upon the earth so it would not shake with you.",
    reference: "Surat Luqman, 31:10"
  },
  {
    id: "w2-29",
    week: "week2",
    category: "Earth, Mountains, and Geological Processes",
    arabic: "َوِمَن ٱلِْجبَاِل ُجَدٌد بِيٌض َوُحْمٌر مُّْختَِلٌف أَلَْوانَُها",
    english: "And of the mountains are white and red, of varying shades.",
    reference: "Surat Fatir, 35:27"
  },
  {
    id: "w2-30",
    week: "week2",
    category: "Earth, Mountains, and Geological Processes",
    arabic: "َوتََرى ٱلِْجبَاَل تَْحَسبَُها َجاِمَدةً َوِهَى تَُمرُّ َمرَّ ٱلسََّحاِب",
    english: "And you see the mountains, thinking them rigid, while they will pass as the passing of clouds.",
    reference: "Surat An-Naml, 27:88"
  },
  
  // Heat, Fire, and Energy
  {
    id: "w2-31",
    week: "week2",
    category: "Heat, Fire, and Energy",
    arabic: "الَِّذي َجعََل لَُكم ِمَن ٱلشََّجِر ٱْْلَْخَضِر نَاًرا فَإِذَآ أَنتُم ِمنْهُ تُوقُِدوَن",
    english: "He who produced for you fire from the green tree, and suddenly you ignite from it.",
    reference: "Surat Yasin, 36:80"
  },
  {
    id: "w2-32",
    week: "week2",
    category: "Heat, Fire, and Energy",
    arabic: "نَاٌر َحاِميَةٌ",
    english: "A blazing fire.",
    reference: "Surat Al-Qari'ah, 101:11"
  },
  {
    id: "w2-33",
    week: "week2",
    category: "Heat, Fire, and Energy",
    arabic: "َوَجعَلْنَا ِسَراًجا َوهَّاًجا",
    english: "And We placed therein a burning lamp (the sun).",
    reference: "Surat An-Naba, 78:13"
  },
  {
    id: "w2-34",
    week: "week2",
    category: "Heat, Fire, and Energy",
    arabic: "يَْصلَٰى نَاًرا ذَاَت لََهٍب",
    english: "He will [be] burned in a Fire of [blazing] flame.",
    reference: "Surat Al-Masad, 111:3"
  },
  
  // Creation, Biology, and Life
  {
    id: "w2-35",
    week: "week2",
    category: "Creation, Biology, and Life",
    arabic: "ثُمَّ َخلَقْنَا ٱلنُّْطفَةَ َعلَقَةً فََخلَقْنَا ٱلْعَلَقَةَ ُمْضغَةً",
    english: "Then We created the drop into a clinging substance, and We created the clinging substance into a lump.",
    reference: "Surat Al-Mu'minun, 23:14"
  },
  {
    id: "w2-36",
    week: "week2",
    category: "Creation, Biology, and Life",
    arabic: "َوبَثَّ ِمنُْهَما ِرَجاًَل َكثِيًرا َونَِسآًء",
    english: "And spread from both of them many men and women.",
    reference: "Surat An-Nisa, 4:1"
  },
  {
    id: "w2-37",
    week: "week2",
    category: "Creation, Biology, and Life",
    arabic: "َوَخلَقْنَاُكْم أَْزَواًجا",
    english: "And We created you in pairs.",
    reference: "Surat An-Naba, 78:8"
  },
  {
    id: "w2-38",
    week: "week2",
    category: "Creation, Biology, and Life",
    arabic: "َوٱللَّهُ َخلََق ُكلَّ َدآبٍَّة ِمن مَّآٍء",
    english: "And Allah created from water every living creature.",
    reference: "Surat An-Nur, 24:45"
  },
  {
    id: "w2-39",
    week: "week2",
    category: "Creation, Biology, and Life",
    arabic: "فِٓى أَْربَعَِة أَيَّاٍم َسَوآًء لِلسَّآئِِليَن",
    english: "In four days, equal for those who ask.",
    reference: "Surat Fussilat, 41:10"
  },
  
  // Earth and Ecosystems
  {
    id: "w2-40",
    week: "week2",
    category: "Earth and Ecosystems",
    arabic: "َوٱْْلَْرَض بَعَْد ذَٰلَِك َدَحٰىَها",
    english: "And after that He spread the earth.",
    reference: "Surat An-Nazi'at, 79:30"
  },
  {
    id: "w2-41",
    week: "week2",
    category: "Earth and Ecosystems",
    arabic: "َوٱْْلَْرَض فََرْشنَـَٰها فَنِعَْم ٱلَْمـِٰهُدوَن",
    english: "And We spread the earth, so how excellent is the one who prepares [it].",
    reference: "Surat Adh-Dhariyat, 51:48"
  },
  {
    id: "w2-42",
    week: "week2",
    category: "Earth and Ecosystems",
    arabic: "َوفِى ٱْْلَْرِض َءايَـٌٰت لِلُْموقِنِيَن",
    english: "And on the earth are signs for those with sure faith.",
    reference: "Surat Adh-Dhariyat, 51:20"
  },
  {
    id: "w2-43",
    week: "week2",
    category: "Earth and Ecosystems",
    arabic: "َوأَنَزلْنَا ِمَن ٱلسََّمآِء َمآًء فَأَنبَتْنَا فِيَها ِمن ُكِل َزْوٍج َكِريٍم",
    english: "And We sent down rain from the sky and made to grow therein [plants] of every good type.",
    reference: "Surat Luqman, 31:10"
  },
  {
    id: "w2-44",
    week: "week2",
    category: "Earth and Ecosystems",
    arabic: "َوِمن ُكِل َشْىٍء َخلَقْنَا َزْوَجيِْن",
    english: "And of all things We created two mates.",
    reference: "Surat Adh-Dhariyat, 51:49"
  },
  
  // Time, Space, and Relativity
  {
    id: "w2-45",
    week: "week2",
    category: "Time, Space, and Relativity",
    arabic: "يَُكِوُر ٱلَّيَْل َعلَى ٱلنََّهاِر َويَُكِوُر ٱلنََّهاَر َعلَى ٱلَّيِْل",
    english: "He wraps the night over the day and wraps the day over the night.",
    reference: "Surat Az-Zumar, 39:5"
  },
  {
    id: "w2-46",
    week: "week2",
    category: "Time, Space, and Relativity",
    arabic: "َوَجعَلْنَا ٱلَّيَْل ِلبَاًسا",
    english: "And We made the night as a covering.",
    reference: "Surat An-Naba, 78:10"
  },
  {
    id: "w2-47",
    week: "week2",
    category: "Time, Space, and Relativity",
    arabic: "َوَجعَلْنَا ٱلنََّهاَر َمعَاًشا",
    english: "And We made the day for livelihood.",
    reference: "Surat An-Naba, 78:11"
  },
  {
    id: "w2-48",
    week: "week2",
    category: "Time, Space, and Relativity",
    arabic: "فِى يَْوٍم َكاَن ِمقَْداُرهُۥ َخْمِسيَن أَلَْف َسنٍَة",
    english: "In a Day, the measure of which is fifty thousand years.",
    reference: "Surat Al-Ma'arij, 70:4"
  },
  {
    id: "w2-49",
    week: "week2",
    category: "Time, Space, and Relativity",
    arabic: "َوُهَو ٱلَِّذى َجعََل ٱلَّيَْل َوٱلنََّهاَر ِخلْفَةً",
    english: "And it is He who made the night and the day in succession.",
    reference: "Surat Al-Furqan, 25:62"
  },

  
  // === WEEK 3: ETHICS ===
{
    id: "w3-1",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "يَـٰٓأَيَُّها ٱلَِّذيَن َءاَمنُواْ ٱتَّقُواْ ٱللَّهَ َوُكونُواْ َمَع ٱلصَّـِٰدقِيَن",
    english: "You who have faith, be mindful of God, be with those who are sincere/true.",
    reference: "Surat At-Tawbah, 9:119"
  },
  {
    id: "w3-2",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "َوََل تَْكتُُمواْ ٱلشََّهـَٰدةَ",
    english: "Do not conceal evidence; whoever does so have a sinful heart.",
    reference: "Surat Al-Baqarah, 2:283"
  },
  {
    id: "w3-3",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "َوأَْوفُواْ بِٱلْعَْهِد إِنَّ ٱلْعَْهَد َكاَن َمْسـُٔوًَل",
    english: "Honour your promises: you will be questioned about your promises.",
    reference: "Surat Al-Isra, 17:34"
  },
  {
    id: "w3-4",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "َوََل تَلْبُِسواْ ٱلَْحقَّ بِٱلْبَـِٰطِل َوتَْكتُُمواْ ٱلَْحقَّ َوأَنتُْم تَعْلَُموَن",
    english: "Do not mix truth with falsehood, and do not hide the truth when you know it.",
    reference: "Surat Al-Baqarah, 2:42"
  },
  {
    id: "w3-5",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "إِنَّ ٱللَّهَ ََل يُِحبُّ ٱلَْخآٰئِنِيَن",
    english: "God does not love the treacherous.",
    reference: "Surat Al-Anfal, 8:58"
  },
  
  // Kindness, Compassion, and Mercy
  {
    id: "w3-6",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوبِٱلَْوٰلَِديِْن إِْحَسـٰنًا",
    english: "Be good to your parents.",
    reference: "Surat Al-Baqarah, 2:83"
  },
  {
    id: "w3-7",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "إِنَّ ٱللَّهَ يَأُْمُر بِٱلْعَْدِل َوٱْْلِْحَسـِٰن وإيتاء ذي القربى",
    english: "God commands justice, doing good, and generosity towards relatives.",
    reference: "Surat An-Nahl, 16:90"
  },
  {
    id: "w3-8",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوٱلَْكـِٰظِميَن ٱلْغَيَْظ َوٱلْعَافِيَن َعِن ٱلنَّاِس وهللا يحب المحسنين",
    english: "Those who restrain their anger and pardon people– God loves those who do good.",
    reference: "Surat Aal-e-Imran, 3:134"
  },
  {
    id: "w3-9",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "فَأَمَّا ٱلْيَتِيَم فََٰل تَقَْهْر",
    english: "So do not be harsh with the orphan.",
    reference: "Surat Ad-Duha, 93:9"
  },
  {
    id: "w3-10",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوأَقِيُمواْ ٱلصَّلَوةَ َوَءاتُواْ ٱلزََّكوةَ",
    english: "Keep up the prayer and pay the prescribed alms.",
    reference: "Surat Al-Baqarah, 2:110"
  },
  {
    id: "w3-11",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوقُولُواْ لِلنَّاِس ُحْسنًا",
    english: "Speak to people in a way that is good.",
    reference: "Surat Al-Baqarah, 2:83"
  },
  {
    id: "w3-12",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوإِذَا ُحيِيتُم بِتَِحيٍَّة فََحيُّواْ بِأَْحَسَن ِمنَْها أَْو ُردُّوَها",
    english: "When you are greeted with a greeting, respond with a better one, or at least return it.",
    reference: "Surat An-Nisa, 4:86"
  },
  {
    id: "w3-13",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوََل تَلِْمُزٓواْ أَنفَُسُكْم َوََل تَنَابَُزواْ بِٱْْلَلْقَـٰبِ",
    english: "Do not defame one another or insult one another by using nicknames.",
    reference: "Surat Al-Hujurat, 49:11"
  },
  {
    id: "w3-14",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوََل تَنَسُواْ ٱلْفَْضَل بَيْنَُكْم",
    english: "Never cease to be charitable towards one another.",
    reference: "Surat Al-Baqarah, 2:237"
  },
  {
    id: "w3-15",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "َوأَْحِسن َكَمآٰ أَْحَسَن ٱللَّهُ إِلَيَْك",
    english: "Do good, as God has been good to you.",
    reference: "Surat Al-Qasas, 28:77"
  },
  
  // Justice, Fairness, and Equity
  {
    id: "w3-16",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "يَـٰٓأَيَُّها ٱلَِّذيَن َءاَمنُواْ ُكونُواْ قَوَّٰـِميَن للَِّهِ شَُهَدآَٰء بِٱلْقِْسِط",
    english: "You who have faith, uphold justice and bear witness to God.",
    reference: "Surat An-Nisa, 4:135"
  },
  {
    id: "w3-17",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "َوََل يَْجِرَمنَُّكْم َشنَـَٔاُن قَْوٍم َعلَٰىٓ أََّلَ تَعِْدلُواْ",
    english: "Do not let your hatred of others lead you away from justice.",
    reference: "Surat Al-Ma'idah, 5:8"
  },
  {
    id: "w3-18",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "تَْحُكُمواْ بِٱلْعَْدِل َوإِذَا َحَكْمتُم بَيَْن ٱلنَّاِس أَن",
    english: "When you judge between people, do so with justice.",
    reference: "Surat An-Nisa, 4:58"
  },
  {
    id: "w3-19",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "ََل تَْظلُِموَن َوََل تُْظلَُموَن",
    english: "Without suffering injustice, or causing others to suffer injustice.",
    reference: "Surat Al-Baqarah, 2:279"
  },
  {
    id: "w3-20",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "َوتَعَاَونُواْ َعلَى ٱلْبِرِ َوٱلتَّقَْوى",
    english: "Help one another to do what is right and good; do not help one another towards evil.",
    reference: "Surat Al-Ma'idah, 5:2"
  },
  {
    id: "w3-21",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "إِنََّما ٱلُْمْؤِمنُوَن إِْخَوةٌ",
    english: "The believers are but siblings.",
    reference: "Surat Al-Hujurat, 49:10"
  },
  {
    id: "w3-22",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "َوأَقِيُمواْ ٱلَْوْزَن بِٱلْقِْسِط َوََل تُْخِسُرواْ ٱلِْميَزاَن",
    english: "Weigh with justice and do not fall short in the balance.",
    reference: "Surat Ar-Rahman, 55:9"
  },
  {
    id: "w3-23",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "َوََل تََجسَُّسواْ َوََل يَغْتَب بَّعُْضُكم بَعًْضا",
    english: "Do not spy on one another, nor backbite one another.",
    reference: "Surat Al-Hujurat, 49:12"
  },
  {
    id: "w3-24",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "َوََل تُبَذِْر تَبِْذيًرا",
    english: "Do not squander your wealth wastefully.",
    reference: "Surat Al-Isra, 17:26"
  },
  {
    id: "w3-25",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "َوأَْوفُواْ ٱلَْكيَْل َوٱلِْميَزاَن بِٱلْقِْسِط",
    english: "Give full measure and weight with justice.",
    reference: "Surat Al-An'am, 6:152"
  },
  {
    id: "w3-26",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "ٱللَّهُ ََل يُِحبُّ ٱلْفََساَد",
    english: "God does not love corruption.",
    reference: "Surat Al-Baqarah, 2:205"
  },
  
  // Trust, Loyalty, and Responsibility
  {
    id: "w3-27",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "إِنَّ ٱللَّهَ يَأُْمُرُكْم أَن تَُؤدُّواْ ٱْْلََمـٰنَـِٰت إِلَٰىٓ أَْهلَِها",
    english: "God commands you to return things entrusted to you to their rightful owners.",
    reference: "Surat An-Nisa, 4:58"
  },
  {
    id: "w3-28",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "أَْوفُواْ بِٱلْعُقُوِد",
    english: "Fulfil your obligations.",
    reference: "Surat Al-Ma'idah, 5:1"
  },
  {
    id: "w3-29",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "ُكلُّ نَفٍْسٍۢ بَِما َكَسبَْت َرِهينَةٌ",
    english: "Every soul is held in pledge for its deeds.",
    reference: "Surat Al-Muddathir, 74:38"
  },
  {
    id: "w3-30",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "ََل تَُخونُواْ ٱللَّهَ َوٱلرَّسُوَل",
    english: "Do not betray God and the Messenger.",
    reference: "Surat Al-Anfal, 8:27"
  },
  {
    id: "w3-31",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "َوََل تَُكن لِلَْخآٰئِنِيَن َخِصيًما",
    english: "Do not argue for those who betray their own souls.",
    reference: "Surat An-Nisa, 4:105"
  },
  {
    id: "w3-32",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "يَـٰٓأَيَُّها ٱلَِّذيَن َءاَمنُواْ ََل تَُخونُواْ ٱللَّهَ َوٱلرَّسُوَل",
    english: "You who believe, do not betray God and the Messenger.",
    reference: "Surat Al-Anfal, 8:27"
  },
  {
    id: "w3-33",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "فََمن يَعَْمْل ِمثْقَاَل ذَرٍَّة َخيًْرا يََرهُ",
    english: "Whoever does an atom's weight of good will see it.",
    reference: "Surat Az-Zalzalah, 99:7"
  },
  {
    id: "w3-34",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "َوأََمُرواْ بِٱلَْمعُْروِف َونََهْواْ َعِن ٱلُْمنَكِر",
    english: "They enjoined what is right and forbade what is wrong.",
    reference: "Surat At-Tawbah, 9:71"
  },
  {
    id: "w3-35",
    week: "week3",
    category: "Trust and Responsibility",
    arabic: "َوََل تَبَْخُسواْ ٱلنَّاَس أَْشيَآَٰءهُْم",
    english: "Do not deprive people of what is rightfully theirs.",
    reference: "Surat Al-A'raf, 7:85"
  },
  
  // Patience, Forgiveness, and Self-Control
  {
    id: "w3-36",
    week: "week3",
    category: "Patience and Forgiveness",
    arabic: "َوٱْصبِْر َوَما َصبُْرَك إَِّلَ بِٱللَِّه",
    english: "Be patient – your patience is possible only with God's help.",
    reference: "Surat An-Nahl, 16:127"
  },
  {
    id: "w3-37",
    week: "week3",
    category: "Patience and Forgiveness",
    arabic: "إِنَّ ٱللَّهَ َمَع ٱلصَّـٰبِِريَن",
    english: "God is with those who are patient.",
    reference: "Surat Al-Baqarah, 2:153"
  },
  {
    id: "w3-38",
    week: "week3",
    category: "Patience and Forgiveness",
    arabic: "فَٱْعفُواْ َوٱْصفَُحواْ حتى يأتي هللا بأمره",
    english: "Forgive and overlook until God gives His command.",
    reference: "Surat Al-Baqarah, 2:109"
  },
  {
    id: "w3-39",
    week: "week3",
    category: "Patience and Forgiveness",
    arabic: "َوَجَزٰٓـُؤاْ َسيِئٍَة َسيِئَةٌ ِمثْلَُها فََمْن َعفَا َوأَْصلََح فَأَْجُرهُۥ َعلَى ٱللَِّه",
    english: "The repayment of a bad action is one equivalent to it. But if someone pardons and puts things right, his reward is with God.",
    reference: "Surat Ash-Shura, 42:40"
  },
  {
    id: "w3-40",
    week: "week3",
    category: "Patience and Forgiveness",
    arabic: "ٱْعِدلُواْ ُهَو أَقَْرُب لِلتَّقَْوى",
    english: "Be just: that is closer to being mindful of God.",
    reference: "Surat Al-Ma'idah, 5:8"
  },
  
  // Humility, Gratitude, and Modesty
  {
    id: "w3-41",
    week: "week3",
    category: "Humility and Gratitude",
    arabic: "َوََل تَْمِش فِى ٱْْلَْرِض َمَرًحا",
    english: "Do not strut arrogantly about the earth.",
    reference: "Surat Al-Isra, 17:37"
  },
  {
    id: "w3-42",
    week: "week3",
    category: "Humility and Gratitude",
    arabic: "َوٱْشُكُرواْ للَِّهِ إِن ُكنتُْم إِيَّاهُ تَعْبُُدوَن",
    english: "Be grateful to God if it is Him you worship.",
    reference: "Surat Al-Baqarah, 2:172"
  },
  {
    id: "w3-43",
    week: "week3",
    category: "Humility and Gratitude",
    arabic: "فَٱذُْكُرونِٓى أَذُْكْرُكْم َوٱْشُكُرواْ لِى َوََل تَْكفُُروِن",
    english: "Remember Me; I will remember you. Be thankful to Me, and never ungrateful.",
    reference: "Surat Al-Baqarah, 2:152"
  },
  {
    id: "w3-44",
    week: "week3",
    category: "Humility and Gratitude",
    arabic: "إِنَّ ٱللَّهَ ََل يُِحبُّ ُكلَّ ُمْختَاٍل فَُخوٍر",
    english: "God does not love any arrogant boaster.",
    reference: "Surat Luqman, 31:18"
  },
  {
    id: "w3-45",
    week: "week3",
    category: "Humility and Gratitude",
    arabic: "َوََل تَُصعِْر َخدََّك لِلنَّاِس َوََل تَْمِش فِى ٱْْلَْرِض َمَرًحا",
    english: "Do not turn your nose up at people, nor walk about the place arrogantly.",
    reference: "Surat Luqman, 31:18"
  },
  
  // Good Speech and Knowledge
  {
    id: "w3-46",
    week: "week3",
    category: "Good Speech and Knowledge",
    arabic: "َوقُولُواْ قَْوًَل َسِديًدا",
    english: "Speak in a direct fashion and to good purpose.",
    reference: "Surat Al-Ahzab, 33:70"
  },
  {
    id: "w3-47",
    week: "week3",
    category: "Good Speech and Knowledge",
    arabic: "يَـٰٓأَيَُّها ٱلَِّذيَن َءاَمنُواْ ٱتَّقُواْ ٱللَّهَ َوقُولُواْ قَْوًَل َسِديًدا",
    english: "You who have faith, be mindful of God, and speak in a direct fashion and to good purpose.",
    reference: "Surat Al-Ahzab, 33:70"
  },
  {
    id: "w3-48",
    week: "week3",
    category: "Good Speech and Knowledge",
    arabic: "َوََل تَقُْف َما لَيَْس لََك بِِه ِعلٌْم",
    english: "And do not follow blindly what you do not know to be true.",
    reference: "Surat Al-Isra, 17:36"
  },
  {
    id: "w3-49",
    week: "week3",
    category: "Good Speech and Knowledge",
    arabic: "ََل يَْسَخْر قَْوٌم مِن قَْوٍم َعَسٰىٓ أَن يَُكونُواْ َخيًْرا ِمنُْهْم",
    english: "Let no group of people mock another, who may well be better than them.",
    reference: "Surat Al-Hujurat, 49:11"
  },
  {
    id: "w3-50",
    week: "week3",
    category: "Good Speech and Knowledge",
    arabic: "إِنَّ ٱللَّهَ يُِحبُّ ٱلُْمقِْسِطيَن",
    english: "God loves those who are fair.",
    reference: "Surat Al-Ma'idah, 5:42"
  },
    // === GOVERNANCE, LEADERSHIP, AND AUTHORITY ===
  { id: "w4-1",  week: "week4", category: "Governance, Leadership, and Authority",
    arabic: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ",
    english: "It was by God’s mercy that you were kind to them.",
    reference: "Surat Āl ʿImrān 3 : 159" },

  { id: "w4-2",  week: "week4", category: "Governance, Leadership, and Authority",
    arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
    english: "They decide their matters by consulting each other.",
    reference: "Surat Ash-Shūrā 42 : 38" },

  { id: "w4-3",  week: "week4", category: "Governance, Leadership, and Authority",
    arabic: "لَا طَاعَةَ لِمَخْلُوقٍ فِي مَعْصِيَةِ الْخَالِقِ",
    english: "No creature should be obeyed if it means disobeying the Creator.",
    reference: "Hadith principle" },

  { id: "w4-4",  week: "week4", category: "Governance, Leadership, and Authority",
    arabic: "وَمَنْ لَّمْ يَحْكُم بِمَا أَنزَلَ اللَّهُ فَأُولَٰئِكَ هُمُ الظَّالِمُونَ",
    english: "Those who do not rule by what God revealed are wrongdoers.",
    reference: "Surat Al-Māʾidah 5 : 45" },

  // === JUSTICE AND FAIRNESS ===
  { id: "w4-5",  week: "week4", category: "Justice and Fairness",
    arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ",
    english: "God commands justice and doing good.",
    reference: "Surat An-Naḥl 16 : 90" },

  { id: "w4-6",  week: "week4", category: "Justice and Fairness",
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ",
    english: "Believers, stand firm for God and be fair witnesses.",
    reference: "Surat An-Nisāʾ 4 : 135" },

  { id: "w4-7",  week: "week4", category: "Justice and Fairness",
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
    english: "Believers, keep your agreements.",
    reference: "Surat Al-Māʾidah 5 : 1" },

  { id: "w4-8",  week: "week4", category: "Justice and Fairness",
    arabic: "وَإِن جَنَحُوا لِلسِّلْمِ فَاجْنَحْ لَهَا",
    english: "If they incline toward peace, then you too incline to it.",
    reference: "Surat Al-Anfāl 8 : 61" },

  { id: "w4-9",  week: "week4", category: "Justice and Fairness",
    arabic: "وَأَوْفُوا بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا",
    english: "Honour your commitments; you will be questioned about them.",
    reference: "Surat Al-Isrāʾ 17 : 34" },

  { id: "w4-10", week: "week4", category: "Justice and Fairness",
    arabic: "وَلَا تَقْرَبُوا مَالَ الْيَتِيمِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ",
    english: "Do not go near an orphan’s property unless you're doing what's right (better or more just).",
    reference: "Surat Al-Isrāʾ 17 : 34" },

  // === WAR, PEACE, AND SECURITY ===
  { id: "w4-11", week: "week4", category: "War, Peace, and Security",
    arabic: "كُتِبَ عَلَيْكُمُ الْقِتَالُ وَهُوَ كُرْهٌ لَّكُمْ",
    english: "Fighting has been prescribed for you, though you dislike it.",
    reference: "Surat Al-Baqarah 2 : 216" },

  { id: "w4-12", week: "week4", category: "War, Peace, and Security",
    arabic: "وَإِن جَنَحُوا لِلسِّلْمِ فَاجْنَحْ لَهَا وَتَوَكَّلْ عَلَى اللَّهِ",
    english: "If they want peace, accept it and trust God.",
    reference: "Surat Al-Anfāl 8 : 61" },

  { id: "w4-13", week: "week4", category: "War, Peace, and Security",
    arabic: "وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ",
    english: "Prepare against them with all the strength you can.",
    reference: "Surat Al-Anfāl 8 : 60" },

  { id: "w4-14", week: "week4", category: "War, Peace, and Security",
    arabic: "وَقَاتِلُوا فِي سَبِيلِ اللَّهِ الَّذِينَ يُقَاتِلُونَكُمْ وَلَا تَعْتَدُوا",
    english: "Fight those who fight you—but do not go too far (transgress).",
    reference: "Surat Al-Baqarah 2 : 190" },

  { id: "w4-15", week: "week4", category: "War, Peace, and Security",
    arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
    english: "Believers are but siblings, so make peace between them.",
    reference: "Surat Al-Ḥujurāt 49 : 10" },

  // === CORRUPTION AND ACCOUNTABILITY ===
  { id: "w4-16", week: "week4", category: "Corruption and Accountability",
    arabic: "وَلَا تَبْغِ الْفَسَادَ فِي الْأَرْضِ",
    english: "Do not spread corruption on the earth.",
    reference: "Surat Al-Baqarah 2 : 205" },

  { id: "w4-17", week: "week4", category: "Corruption and Accountability",
    arabic: "إِنَّ اللَّهَ لَا يُحِبُّ الْمُفْسِدِينَ",
    english: "God does not love those who spread corruption.",
    reference: "Surat Al-Qaṣaṣ 28 : 77" },

  { id: "w4-18", week: "week4", category: "Corruption and Accountability",
    arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنْفُسِهِمْ",
    english: "God will not change a people’s condition until they change themselves.",
    reference: "Surat Ar-Raʿd 13 : 11" },

  { id: "w4-19", week: "week4", category: "Corruption and Accountability",
    arabic: "كُلُّ نَفْسٍ بِمَا كَسَبَتْ رَهِينَةٌ",
    english: "Every soul is held hostage/(accountable) for what it does/(earns).",
    reference: "Surat Al-Muddaththir 74 : 38" },

  { id: "w4-20", week: "week4", category: "Corruption and Accountability",
    arabic: "وَلَا تَكُنْ لِلْخَائِنِينَ خَصِيمًا",
    english: "Do not defend/(argue for) those who are dishonest/(traitors).",
    reference: "Surat An-Nisāʾ 4 : 105" },

  { id: "w4-21", week: "week4", category: "Corruption and Accountability",
    arabic: "ٱتَّبِعُوا مَا أُنْزِلَ إِلَيْكُمْ مِن رَّبِّكُمْ",
    english: "Follow what has been sent down to you from your Lord.",
    reference: "Surat Al-Aʿrāf 7 : 3" },

  { id: "w4-22", week: "week4", category: "Corruption and Accountability",
    arabic: "وَلَا تَتَّبِعْ أَهْوَاءَهُمْ عَمَّا جَاءَكَ مِنَ الْحَقِّ",
    english: "Do not follow their low desires over/(away from) what's true.",
    reference: "Surat Al-Māʾidah 5 : 48" },

  { id: "w4-23", week: "week4", category: "Corruption and Accountability",
    arabic: "إِنَّ الَّذِينَ يُحَادُّونَ اللَّهَ وَرَسُولَهُ كُبِتُوا",
    english: "Those who oppose God and His Messenger will be defeated/humiliated.",
    reference: "Surat Al-Mujādilah 58 : 5" },

  { id: "w4-24", week: "week4", category: "Corruption and Accountability",
    arabic: "وَلَا تَكُونَنَّ مِنَ الْمُشْرِكِينَ",
    english: "Do not be one of those who associate partners with God.",
    reference: "Surat Al-Anʿām 6 : 14" },

  // === LAWS, LEGISLATION, AND DIVINE GUIDANCE ===
  { id: "w4-25", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "يُرِيدُ اللَّهُ أَنْ يُخَفِّفَ عَنكُمْ وَخُلِقَ الْإِنسَانُ ضَعِيفًا",
    english: "God wishes to make it easier for you/(lighten your burden); people were created weak.",
    reference: "Surat An-Nisāʾ 4 : 28" },

  { id: "w4-26", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "فَلَا وَرَبِّكَ لَا يُؤْمِنُونَ حَتَّىٰ يُحَكِّمُوكَ فِيمَا شَجَرَ بَيْنَهُمْ",
    english: "By your Lord, they do not truly believe until they let you judge their disputes.",
    reference: "Surat An-Nisāʾ 4 : 65" },

  { id: "w4-27", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "ثُمَّ جَعَلْنَاكَ عَلَىٰ شَرِيعَةٍ مِّنَ الْأَمْرِ فَاتَّبِعْهَا",
    english: "We set you on a clear path—so follow it.",
    reference: "Surat Al-Jāthiyah 45 : 18" },

  { id: "w4-28", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "وَإِذَا حَكَمْتُمْ بَيْنَ النَّاسِ أَنْ تَحْكُمُوا بِالْعَدْلِ",
    english: "When you judge between people, judge with justice.",
    reference: "Surat An-Nisāʾ 4 : 58" },

  { id: "w4-29", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُمْ بَيْنَ النَّاسِ بِالْحَقِّ",
    english: "O David, We made you a leader; judge people with justice/(truth).",
    reference: "Surat Ṣād 38 : 26" },

  { id: "w4-30", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "وَجَعَلْنَا مِنْهُمْ أَئِمَّةً يَهْدُونَ بِأَمْرِنَا",
    english: "We made them leaders who guided by Our command.",
    reference: "Surat Al-Anbiyāʾ 21 : 73" },

  { id: "w4-31", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "لَا إِكْرَاهَ فِي الدِّينِ",
    english: "There is no compulsion in religion.",
    reference: "Surat Al-Baqarah 2 : 256" },

  { id: "w4-32", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ",
    english: "You have your religion and I have mine.",
    reference: "Surat Al-Kāfirūn 109 : 6" },

  { id: "w4-33", week: "week4", category: "Laws, Legislation, and Divine Guidance",
    arabic: "وَلَوْ شَاءَ رَبُّكَ لَآمَنَ مَن فِي الْأَرْضِ كُلُّهُمْ جَمِيعًا",
    english: "Had your Lord willed, everyone on earth would have believed.",
    reference: "Surat Yūnus 10 : 99" },

  // === PEACE, RECONCILIATION, AND UNITY ===
  { id: "w4-34", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
    english: "Make peace between your brothers.",
    reference: "Surat Al-Ḥujurāt 49 : 10" },

  { id: "w4-35", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
    english: "Hold firmly to the rope of God—all of you—and do not divide.",
    reference: "Surat Āl ʿImrān 3 : 103" },

  { id: "w4-36", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "تِلْكَ حُدُودُ اللَّهِ فَلَا تَعْتَدُوهَا",
    english: "These are God’s limits—do not overstep them.",
    reference: "Surat Al-Baqarah 2 : 229" },

  { id: "w4-37", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "يَا أَيُّهَا ٱلَّذِينَ آمَنُوا أَطِيعُوا ٱللَّهَ وَأَطِيعُوا ٱلرَّسُولَ وَأُوْلِي ٱلْأَمْرِ مِنكُمْ",
    english: "O believers! Obey God, obey the Messenger, and those in charge among you.",
    reference: "Surat An-Nisāʾ 4:59" },
  
  { id: "w4-38", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "وَٱلْمُؤْمِنُونَ وَٱلْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَآءُ بَعْضٍ ۚ يَأْمُرُونَ بِٱلْمَعْرُوفِ وَيَنْهَوْنَ عَنِ ٱلْمُنكَرِ",
    english: "Believing men and women are helpers of each other. They encourage what is good and stop what is wrong.",
    reference: "Surat At-Tawbah 9:71" },
  
  { id: "w4-39", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "وَعَدَ ٱللَّهُ ٱلَّذِينَ آمَنُوا مِنكُمْ وَعَمِلُوا ٱلصَّـٰلِحَاتِ لَيَسْتَخْلِفَنَّهُمْ فِي ٱلْأَرْضِ",
    english: "God has promised those of you who believe and do good that He will give them authority on earth.",
    reference: "Surat An-Nūr 24:55" },
  
  { id: "w4-40", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "وَلَوْلَا دَفْعُ ٱللَّهِ ٱلنَّاسَ بَعْضَهُم بِبَعْضٍ لَّهُدِّمَتْ صَوَٰمِعُ وَبِيَعٌ وَصَلَوَٰتٌ وَمَسَـٰجِدُ يُذْكَرُ فِيهَا ٱسْمُ ٱللَّهِ كَثِيرًا",
    english: "If God did not stop some people by means of others, monasteries, churches, synagogues, and mosques, where God's name is much invoked, would be destroyed.",
    reference: "Surat Al-Ḥajj 22:40" },
  
  { id: "w4-41", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِن تَنصُرُوا۟ ٱللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ",
    english: "O believers! If you help God, He will help you and keep you firm.",
    reference: "Surat Muḥammad 47:7" },
  
  { id: "w4-42", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "يَـٰٓأَيُّهَا ٱلنَّاسُ إِنَّا خَلَقْنَـٰكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَـٰكُمْ شُعُوبًا وَقَبَآئِلَ لِتَعَارَفُوٓا۟ ۚ إِنَّ أَكْرَمَكُمْ عِندَ ٱللَّهِ أَتْقَىٰكُمْ",
    english: "O people! We created you from a male and a female and made you into nations and tribes that you may know one another. The most noble of you in God's sight is the most mindful of Him.",
    reference: "Surat Al-Ḥujurāt 49:13" },
  
  { id: "w4-43", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "لَّا يَنْهَىٰكُمُ ٱللَّهُ عَنِ ٱلَّذِينَ لَمْ يُقَـٰتِلُوكُمْ فِى ٱلدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَـٰرِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوٓا۟ إِلَيْهِمْ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُقْسِطِينَ",
    english: "God does not forbid you from being kind and just to those who have not fought you because of your faith or driven you out of your homes. God loves those who are fair.",
    reference: "Surat Al-Mumtaḥanah 60:8" },
  
  { id: "w4-44", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "إِنَّمَا يَنْهَىٰكُمُ ٱللَّهُ عَنِ ٱلَّذِينَ قَـٰتَلُوكُمْ فِى ٱلدِّينِ وَأَخْرَجُوكُم مِّن دِيَـٰرِكُمْ وَظَـٰهَرُوا۟ عَلَىٰٓ إِخْرَاجِكُمْ أَن تَوَلَّوْهُمْ ۚ وَمَن يَتَوَلَّهُمْ فَأُو۟لَـٰٓئِكَ هُمُ ٱلظَّـٰلِمُونَ",
    english: "God only forbids you from befriending those who fought you because of your faith, drove you out of your homes, and helped others to do the same. Whoever takes them as allies, these are the wrongdoers.",
    reference: "Surat Al-Mumtaḥanah 60:9" },
  
  { id: "w4-45", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "فَٱحْكُم بَيْنَهُم بِمَآ أَنزَلَ ٱللَّهُ",
    english: "Judge between them with what God has revealed.",
    reference: "Surat Al-Māʾidah 5:49" },
  
  { id: "w4-46", week: "week4", category: "Peace, Reconciliation, and Unity",
    arabic: "وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰٓ أَلَّا تَعْدِلُوا",
    english: "Do not let hatred of a people prevent you from being just.",
    reference: "Surat Al-Māʾidah 5:8" }
];
