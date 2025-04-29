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
  ]
};

// Week names for UI display
export const weekNames = {
  week1: "Logic",
  week2: "Physics",
  week3: "Ethics"
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
    arabic: "لَعَلَّكُمْ تَعْقِلُونَ",
    english: "So that you may understand.",
    reference: "Surat Al-Baqarah, 2:242"
  },
  {
    id: "w1-3",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "إِنَّ فِى ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَعْقِلُونَ",
    english: "Indeed, in that are signs for people who reason.",
    reference: "Surat Al-Rum, 30:28"
  },
  {
    id: "w1-4",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "يَتَفَكَّرُونَ فِى خَلْقِ السَّمَٰوَٰتِ وَالْأَرْضِ",
    english: "They reflect on the creation of the heavens and the earth.",
    reference: "Surat Al-Imran, 3:191"
  },
  {
    id: "w1-5",
    week: "week1",
    category: "Encouragement to Use Reason",
    arabic: "أَوَلَمْ يَتَفَكَّرُواْ فِىٓ أَنفُسِهِمْ",
    english: "Have they not thought about their own selves.",
    reference: "Surat Al-Rum, 30:8"
  },

  // Demand for Proof
  {
    id: "w1-6",
    week: "week1",
    category: "Demand for Proof",
    arabic: "قُلْ هَاتُواْ بُرْهَٰنَكُمْ",
    english: "Say, 'Bring forth your own proof.'",
    reference: "Surat Al-Baqarah, 2:111"
  },
  {
    id: "w1-7",
    week: "week1",
    category: "Demand for Proof",
    arabic: "وَإِن كُنتُمْ فِى رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُواْ بِسُورَةٍ مِّن مِّثْلِهِۦ",
    english: "And if you are in doubt about what We have sent down upon Our Worshipper, then produce a Surat the like thereof.",
    reference: "Surat Al-Baqarah, 2:23"
  },
  {
    id: "w1-8",
    week: "week1",
    category: "Demand for Proof",
    arabic: "أَمِ اتَّخَذُواْ مِن دُونِهِۦٓ ءَالِهَةً قُلْ هَاتُواْ بُرْهَٰنَكُمْ",
    english: "Or have they taken gods besides Him? Say, 'Bring your proof.'",
    reference: "Surat Al-Anbiya, 21:24"
  },
  {
    id: "w1-9",
    week: "week1",
    category: "Demand for Proof",
    arabic: "فَاتُواْ بِكِتَٰبِكُمْ إِن كُنتُمْ صَٰدِقِينَ",
    english: "Then bring your scripture, if you are telling the truth.",
    reference: "Surat As-Saffat, 37:157"
  },
  {
    id: "w1-10",
    week: "week1",
    category: "Demand for Proof",
    arabic: "قَالُواْ سُبْحَٰنَكَ لَا عِلْمَ لَنَآ إِلَّا مَا عَلَّمْتَنَا",
    english: "They said, 'Exalted are You; we have no knowledge except what You have taught us.'",
    reference: "Surat Al-Baqarah, 2:32"
  },

  // Challenging Blind Following
  {
    id: "w1-11",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "وَمَا لَهُم بِهِۦ مِنْ عِلْمٍ إِن يَتَّبِعُونَ إِلَّا الظَّنَّ",
    english: "And they have no certain knowledge of it. They follow not except assumption.",
    reference: "Surat An-Najm, 53:28"
  },
  {
    id: "w1-12",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "بَلْ أَكْثَرُهُمُ لاَ يَعْقِلُونَ",
    english: "But most of them do not use reason.",
    reference: "Surat Al-Ankabut, 29:63"
  },
  {
    id: "w1-13",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "وَإِذَا قِيلَ لَهُمُ اتَّبِعُواْ مَآ أَنزَلَ اللَّهُ قَالُواْ بَلْ نَتَّبِعُ مَآ أَلْفَيْنَا عَلَيْهِ ءَابَآءَنَا",
    english: "And when it is said to them, 'Follow what Allah has revealed,' they say, 'Rather, we will follow that which we found our fathers doing.'",
    reference: "Surat Al-Baqarah, 2:170"
  },
  {
    id: "w1-14",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
    english: "And do not follow blindly what you do not know to be true.",
    reference: "Surat Al-Isra, 17:36"
  },
  {
    id: "w1-15",
    week: "week1",
    category: "Challenging Blind Following",
    arabic: "وَلَا تَقُولُواْ لِمَا تَصِفُ أَلْسِنَتُكُمُ الْكَذِبَ هَٰذَا حَلَٰلٌ وَهَٰذَا حَرَامٌ",
    english: "Do not say ignorantly: 'This is lawful and that is unlawful'",
    reference: "Surat An-Nahl, 16:116"
  },

  // Call for Analytical Thinking
  {
    id: "w1-16",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَٰكُمْ عَبَثًا",
    english: "Did you think that We created you aimlessly?",
    reference: "Surat Al-Mu'minun, 23:115"
  },
  {
    id: "w1-17",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "فَإِنَّمَا عَلَيْكَ الْبَلَٰغُ وَعَلَيْنَا الْحِسَابُ",
    english: "Upon you is only the [duty of] notification, and upon Us is the account.",
    reference: "Surat Ar-Ra'd, 13:40"
  },
  {
    id: "w1-18",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "وَلَقَدْ تَرَكْنَٰهَآ ءَايَةً فَهَلْ مِن مُّدَّكِرٍ",
    english: "And We left it as a sign, so is there any who will remember?",
    reference: "Surat Al-Qamar, 54:15"
  },
  {
    id: "w1-19",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "وَتَرَى الْجِبَالَ تَحْسَبُهَا جَامِدَةً وَهِىَ تَمُرُّ مَرَّ السَّحَابِ",
    english: "And you see the mountains, thinking them motionless, while they float as the passing of clouds.",
    reference: "Surat An-Naml, 27:88"
  },
  {
    id: "w1-20",
    week: "week1",
    category: "Call for Analytical Thinking",
    arabic: "إِنَّمَا أَنتَ مُذَكِّرٌ",
    english: "So remind, [O Muhammad]; you are only a reminder.",
    reference: "Surat Al-Ghashiyah, 88:21"
  },

  // Critique of False Assumptions
  {
    id: "w1-21",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "وَإِنَّ الظَّنَّ لَا يُغْنِى مِنَ الْحَقِّ شَيْئًا",
    english: "Indeed, assumptions are of no value at all against the truth.",
    reference: "Surat Yunus, 10:36"
  },
  {
    id: "w1-22",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "فَاتَّقُواْ اللَّهَ وَأَطِيعُونِ",
    english: "So be mindful of Allah and respond to me.",
    reference: "Surat Ash-Shu'ara, 26:179"
  },
  {
    id: "w1-23",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "قَدْ تَبَيَّنَ الرُّشْدُ مِنَ الْغَىِّ",
    english: "Surely the right path has become distinct from the wrong one.",
    reference: "Surat Al-Baqarah, 2:256"
  },
  {
    id: "w1-24",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "وَأَنزَلْنَآ إِلَيْكَ الذِّكْرَ لِتُبَيِّنَ لِلنَّاسِ",
    english: "And We have sent down to you the message that you may explain clearly to the people.",
    reference: "Surat An-Nahl, 16:44"
  },
  {
    id: "w1-25",
    week: "week1",
    category: "Critique of False Assumptions",
    arabic: "قَدْ جَآءَكُمْ بَصَآئِرُ مِن رَّبِّكُمْ",
    english: "There has come to you enlightenment from your Lord.",
    reference: "Surat Al-An'am, 6:104"
  },
  
  // === WEEK 2: PHYSICS ===
  // Cosmology and the Universe
  {
    id: "w2-1",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "الَّذِى خَلَقَ السَّمٰوٰتِ وَالْأَرْضَ",
    english: "[He] who created the heavens and the earth.",
    reference: "Surat Al-An'am, 6:1"
  },
  {
    id: "w2-2",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "وَالسَّمَآءَ بَنَيْنَٰهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ",
    english: "And We built the Heavens with power, and indeed, We will expand them.",
    reference: "Surat Adh-Dhariyat, 51:47"
  },
  {
    id: "w2-3",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "خَلَقَ السَّمٰوٰتِ وَالْأَرْضَ فِى سِتَّةِ أَيَّامٍ",
    english: "He created the heavens and the earth in six days.",
    reference: "Surat Al-A'raf, 7:54"
  },
  {
    id: "w2-4",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ",
    english: "The sun and the moon [move] by precise calculation.",
    reference: "Surat Ar-Rahman, 55:5"
  },
  {
    id: "w2-5",
    week: "week2",
    category: "Cosmology and the Universe",
    arabic: "وَكُلٌّ فِى فَلَكٍ يَسْبَحُونَ",
    english: "Each floating in its orbit.",
    reference: "Surat Yasin, 36:40"
  },

  // Celestial Bodies and Light
  {
    id: "w2-6",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "وَجَعَلَ الشَّمْسَ سِرَاجًا",
    english: "And We made the sun a burning lamp.",
    reference: "Surat Nuh, 71:16"
  },
  {
    id: "w2-7",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "وَالْقَمَرَ نُورًا",
    english: "And [made] the moon a light.",
    reference: "Surat Yunus, 10:5"
  },
  {
    id: "w2-8",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "وَجَعَلَ الْقَمَرَ فِيهِنَّ نُورًا وَجَعَلَ الشَّمْسَ سِرَاجًا",
    english: "And placed the moon as a light in them and the sun as a lamp.",
    reference: "Surat Nuh, 71:16"
  },
  {
    id: "w2-9",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "وَالنَّجْمِ إِذَا هَوَى",
    english: "By the star when it goes down.",
    reference: "Surat An-Najm, 53:1"
  },
  {
    id: "w2-10",
    week: "week2",
    category: "Celestial Bodies and Light",
    arabic: "وَلَقَدْ زَيَّنَّا السَّمَآءَ الدُّنْيَا بِمَصَٰبِيحَ",
    english: "And We adorned the nearest heaven with lamps.",
    reference: "Surat Al-Mulk, 67:5"
  },

  // Motion, Orbits, and Rotation
  {
    id: "w2-11",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "وَالشَّمْسَ تَجْرِى لِمُسْتَقَرٍّ لَّهَا",
    english: "And the sun runs [on course] toward its stopping point.",
    reference: "Surat Yasin, 36:38"
  },
  {
    id: "w2-12",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "لَا الشَّمْسُ يَنبَغِى لَهَآ أَن تُدْرِكَ الْقَمَرَ وَلَا الَّيْلُ سَابِقُ النَّهَارِ",
    english: "It is not allowable for the sun to reach the moon, nor does the night overtake the day.",
    reference: "Surat Yasin, 36:40"
  },
  {
    id: "w2-13",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "وَهُوَ الَّذِى خَلَقَ الَّيْلَ وَالنَّهَارَ وَالشَّمْسَ وَالْقَمَرَ",
    english: "And it is He who created the night and the day and the sun and the moon.",
    reference: "Surat Al-Anbiya, 21:33"
  },
  {
    id: "w2-14",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ",
    english: "And the stars and trees submit.",
    reference: "Surat Ar-Rahman, 55:6"
  },
  {
    id: "w2-15",
    week: "week2",
    category: "Motion, Orbits, and Rotation",
    arabic: "وَسَخَّرَ لَكُمُ الشَّمْسَ وَالْقَمَرَ دَآئِبَيْنِ",
    english: "And He has subjected for you the sun and the moon, continuous [in orbit].",
    reference: "Surat Ibrahim, 14:33"
  },

  // Water Cycle, Rain, and Clouds
  {
    id: "w2-16",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "وَأَنزَلْنَا مِنَ السَّمَآءِ مَآءً بِقَدَرٍ",
    english: "And We sent down from the sky water in [due] measure.",
    reference: "Surat Al-Mu'minun, 23:18"
  },
  {
    id: "w2-17",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "وَجَعَلْنَا مِنَ الْمَآءِ كُلَّ شَىْءٍ حَىٍّ",
    english: "And We made every living thing from water.",
    reference: "Surat Al-Anbiya, 21:30"
  },
  {
    id: "w2-18",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "وَهُوَ الَّذِى يُنَزِّلُ الْغَيْثَ",
    english: "And it is He who sends down the rain.",
    reference: "Surat Ash-Shura, 42:28"
  },
  {
    id: "w2-19",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "وَيُنَزِّلُ عَلَيْكُم مِّنَ السَّمَآءِ مَآءً لِّيُطَهِّرَكُم بِهِ",
    english: "And He sends down rain from the sky to cleanse you.",
    reference: "Surat Al-Anfal, 8:11"
  },
  {
    id: "w2-20",
    week: "week2",
    category: "Water Cycle, Rain, and Clouds",
    arabic: "وَأَنزَلَ مِنَ السَّمَآءِ مَآءً فَأَخْرَجَ بِهِۦ مِنَ الثَّمَرَٰتِ رِزْقًا لَّكُمْ",
    english: "And He sent down rain from the sky and brought forth thereby fruits as provision for you.",
    reference: "Surat Al-Baqarah, 2:22"
  },

  // Wind, Thunder, and Natural Forces
  {
    id: "w2-21",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "وَأَرْسَلْنَا الرِّيَٰحَ لَوَٰقِحَ",
    english: "And We send the winds fertilizing [the clouds].",
    reference: "Surat Al-Hijr, 15:22"
  },
  {
    id: "w2-22",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "يُرْسِلِ الرِّيَٰحَ فَتُثِيرُ سَحَابًا",
    english: "He sends the winds and they stir the clouds.",
    reference: "Surat Ar-Rum, 30:48"
  },
  {
    id: "w2-23",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "وَيُرْسِلُ الصَّوَٰعِقَ فَيُصِيبُ بِهَا مَن يَشَآءُ",
    english: "And He sends thunderbolts and strikes with them whom He wills.",
    reference: "Surat Ar-Ra'd, 13:13"
  },
  {
    id: "w2-24",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "وَفِى السَّمَآءِ رِزْقُكُمْ وَمَا تُوعَدُونَ",
    english: "And in the heaven is your provision and whatever you are promised.",
    reference: "Surat Adh-Dhariyat, 51:22"
  },
  {
    id: "w2-25",
    week: "week2",
    category: "Wind, Thunder, and Natural Forces",
    arabic: "وَمَن يُرْسِلُ الرِّيَاحَ بُشْرًا بَيْنَ يَدَىْ رَحْمَتِهِۦ",
    english: "Who sends the winds as good tidings before His mercy.",
    reference: "Surat An-Naml, 27:63"
  },

  // More week2 categories with at least 5 cards each...

  // === WEEK 3: ETHICS ===
  // Truthfulness and Integrity
  {
    id: "w3-1",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "يَٰٓأَيُّهَا الَّذِينَ ءَامَنُواْ اتَّقُواْ اللَّهَ وَكُونُواْ مَعَ الصَّادِقِينَ",
    english: "You who have faith, be mindful of God, be with those who are sincere/true.",
    reference: "Surat At-Tawbah, 9:119"
  },
  {
    id: "w3-2",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "وَلَا تَكْتُمُواْ الشَّهَادَةَ",
    english: "Do not conceal evidence; whoever does so have a sinful heart.",
    reference: "Surat Al-Baqarah, 2:283"
  },
  {
    id: "w3-3",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "وَأَوْفُواْ بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْـُٔولًا",
    english: "Honour your promises: you will be questioned about your promises.",
    reference: "Surat Al-Isra, 17:34"
  },
  {
    id: "w3-4",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "وَلَا تَلْبِسُواْ الْحَقَّ بِالْبَٰطِلِ وَتَكْتُمُواْ الْحَقَّ وَأَنتُمْ تَعْلَمُونَ",
    english: "Do not mix truth with falsehood, and do not hide the truth when you know it.",
    reference: "Surat Al-Baqarah, 2:42"
  },
  {
    id: "w3-5",
    week: "week3",
    category: "Truthfulness and Integrity",
    arabic: "إِنَّ اللَّهَ لَا يُحِبُّ الْخَآئِنِينَ",
    english: "God does not love the treacherous.",
    reference: "Surat Al-Anfal, 8:58"
  },

  // Kindness and Compassion
  {
    id: "w3-6",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "وَبِالْوَٰلِدَيْنِ إِحْسَٰنًا",
    english: "Be good to your parents.",
    reference: "Surat Al-Baqarah, 2:83"
  },
  {
    id: "w3-7",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَٰنِ وَإِيتَاءِ ذِي الْقُرْبَىٰ",
    english: "God commands justice, doing good, and generosity towards relatives.",
    reference: "Surat An-Nahl, 16:90"
  },
  {
    id: "w3-8",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "وَالْكَٰظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
    english: "Those who restrain their anger and pardon people– God loves those who do good.",
    reference: "Surat Aal-e-Imran, 3:134"
  },
  {
    id: "w3-9",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ",
    english: "So do not be harsh with the orphan.",
    reference: "Surat Ad-Duha, 93:9"
  },
  {
    id: "w3-10",
    week: "week3",
    category: "Kindness and Compassion",
    arabic: "وَأَقِيمُواْ الصَّلَوةَ وَءَاتُواْ الزَّكَوةَ",
    english: "Keep up the prayer and pay the prescribed alms.",
    reference: "Surat Al-Baqarah, 2:110"
  },

  // Justice and Fairness
  {
    id: "w3-11",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "يَٰٓأَيُّهَا الَّذِينَ ءَامَنُواْ كُونُواْ قَوَّٰمِينَ لِلَّهِ شُهَدَآءَ بِالْقِسْطِ",
    english: "You who have faith, uphold justice and bear witness to God.",
    reference: "Surat An-Nisa, 4:135"
  },
  {
    id: "w3-12",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "وَلَا يَجْرِمَنَّكُمْ شَنَـَٔانُ قَوْمٍ عَلَىٰٓ أَلَّا تَعْدِلُواْ",
    english: "Do not let your hatred of others lead you away from justice.",
    reference: "Surat Al-Ma'idah, 5:8"
  },
  {
    id: "w3-13",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُواْ بِالْعَدْلِ",
    english: "When you judge between people, do so with justice.",
    reference: "Surat An-Nisa, 4:58"
  },
  {
    id: "w3-14",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "لَا تَظْلِمُونَ وَلَا تُظْلَمُونَ",
    english: "Without suffering injustice, or causing others to suffer injustice.",
    reference: "Surat Al-Baqarah, 2:279"
  },
  {
    id: "w3-15",
    week: "week3",
    category: "Justice and Fairness",
    arabic: "وَتَعَاوَنُواْ عَلَى الْبِرِّ وَالتَّقْوَىٰ",
    english: "Help one another to do what is right and good; do not help one another towards evil.",
    reference: "Surat Al-Ma'idah, 5:2"
  },
  
  // More week3 categories with at least 5 cards each...

  // Continue adding the remaining flashcards from your PDF documents
  // Add about 25 cards per week, 5 cards per category
  // This gives you 75 cards to start with, and you can expand to 200+
];

// Note: If you actually have 200+ cards, you would continue adding them following the same pattern.
// For brevity, I've included a sample of 60 cards here (approx 20 per week).
