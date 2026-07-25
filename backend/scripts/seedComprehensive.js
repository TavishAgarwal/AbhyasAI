// backend/scripts/seedComprehensive.js
// ═══════════════════════════════════════════════════════════════════════
// Comprehensive NCERT chapter seeder — Classes 1–10
// Uses the EXACT authoritative chapter list provided by the user.
// Clears all existing data and inserts fresh.
// ═══════════════════════════════════════════════════════════════════════

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Helper ──────────────────────────────────────────────────────────
const ALL_CHAPTERS = [];

function add(classNum, subject, bookTitle, titles) {
  titles.forEach((title, i) => {
    ALL_CHAPTERS.push({
      class_num: classNum,
      subject,
      chapter_num: i + 1,
      chapter_title: title,
      language: 'english',
      content_json: { sections: [{ heading: title, content: '', type: 'text' }], bookTitle },
      learning_objectives: [
        `Understand the key concepts of ${title}`,
        `Explain the main ideas covered in this chapter`,
        `Apply knowledge from this chapter to solve problems`,
        `Recall important terms and definitions`
      ],
      word_count: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 1
// ═══════════════════════════════════════════════════════════════════════

add(1, 'English', 'Mridang', [
  'Two Little Hands',
  'Greetings',
  'Picture Time',
  'The Cap-seller and the Monkeys',
  'A Farm',
  'Fun with Pictures',
  'The Food We Eat',
  'The Four Seasons',
  'Anandi\'s Rainbow',
]);

add(1, 'Hindi', 'Sarangi', [
  'मीना का परिवार',
  'दादा-दादी',
  'रीना का दिन',
  'रानी भी',
  'मिठाई',
  'तीन साथी',
  'वाह, मेरे घोड़े!',
  'खतरे में साँप',
  'आलू की सड़क',
  'झूम-झूली',
  'भुट्टे',
  'फूली रोटी',
]);

add(1, 'Mathematics', 'Joyful Mathematics', [
  'Finding the Furry Cat!',
  'What is Long? What is Round?',
  'Mango Treat',
  'Making 10',
  'How Many?',
  'Vegetable Farm',
  'Lina\'s Family',
  'Fun with Numbers',
  'Utsav',
  'How Do I Spend My Day?',
  'How Many Times?',
  'How Much Can We Spend?',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 2
// ═══════════════════════════════════════════════════════════════════════

add(2, 'English', 'Mridang', [
  'My Bicycle',
  'Picture Reading',
  'It Is Fun',
  'A Show of Clouds',
  'My Name',
  'Benny Goes to School',
  'Come Back Soon',
  'Between Home and School',
  'This is My Town',
  'A Clean Street',
  'The Swing',
  'Trees',
  'The Crow',
  'The Smart Monkey',
  'Little Drops of Water',
]);

add(2, 'Hindi', 'Sarangi', [
  'ऊँट चला',
  'भालू ने खेली फुटबॉल',
  'म्याऊँ, म्याऊँ!!',
  'अधिक बलवान कौन?',
  'दोस्त की मदद',
  'बहुत हुआ',
  'मेरी किताब',
  'तितली और कली',
  'बुलबुल',
  'मीठी सारंगी',
  'टेसू राजा बीच बाजार',
  'बस के नीचे बाघ',
  'सूरज जल्दी आना जी',
]);

add(2, 'Mathematics', 'Joyful Mathematics', [
  'A Day at the Beach',
  'Shapes Around Us',
  'Fun with Numbers',
  'Shadow Story',
  'Playing with Lines',
  'Decoration for Festival',
  'Rani\'s Gift',
  'Grouping and Sharing',
  'Which Season Is It?',
  'Fun at the Fair',
  'Data Handling',
  'Give and Take',
  'Measurement Around Us',
  'Time Goes On',
  'Money Matters',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 3
// ═══════════════════════════════════════════════════════════════════════

add(3, 'English', 'Santoor', [
  'Welcome',
  'Toys and Games',
  'My Family',
  'The Sky',
  'Animals and Birds',
  'Food We Eat',
  'Travel and Adventure',
  'Nature Around Us',
  'Festivals',
  'Stories with Values',
  'Friendship',
  'Fun Time',
]);

add(3, 'Hindi', 'Veena', [
  'सीखो',
  'चींटी',
  'कितने पैर?',
  'बया हमारी चिड़िया रानी!',
  'आम का पेड़',
  'दोस्ती',
  'मिल-जुलकर रहना',
  'मदद का हाथ',
  'खेल-खेल में',
  'हमारा परिवार',
  'त्योहार',
  'प्रकृति',
  'पानी',
  'यात्रा',
  'सपने',
]);

add(3, 'Mathematics', 'Maths Mela', [
  'Where to Look From',
  'Toy Joy',
  'Double Century',
  'Vacation with My Nani Maa',
  'Fun with Shapes',
  'House of Hundreds – I',
  'Raksha Bandhan',
  'Fair Share',
  'House of Hundreds – II',
  'Fun at the Fair',
  'Filling and Lifting',
  'Give and Take',
  'Time Goes On',
  'The Surajkund Craft Mela',
]);

add(3, 'EVS', 'The World Around Us', [
  'Family and Friends',
  'Going to the Mela',
  'Celebrating Festivals',
  'Plants Around Us',
  'Animals Around Us',
  'Water for All',
  'Food We Eat',
  'Means of Transport',
  'Travelling Together',
  'Communication Around Us',
  'Keeping Clean',
  'Saving Nature',
  'Our Earth',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 4
// ═══════════════════════════════════════════════════════════════════════

add(4, 'English', 'Santoor', [
  'Together We Can',
  'The Tinkling Bells',
  'Be Smart, Be Safe',
  'One Thing at a Time',
  'The Old Stag',
  'Braille',
  'Fit Body, Fit Mind, Fit Nation',
  'The Lagori Champions',
  'Hekko',
  'The Swing',
  'A Journey to the Magical Mountains',
  'Maheshwar',
]);

add(4, 'Hindi', 'Veena', [
  'चिड़िया का गीत',
  'बगीचे का घोंघा',
  'नीम',
  'हमारा आहार',
  'आसमान गिरा',
  'जयपुर से पत्र',
  'नकली हीरे',
  'ओणम के रंग',
  'मिठाइयों का सम्मेलन',
  'कैमरा',
  'कविता का कमाल',
  'शतरंज में मात',
  'हमारा आदित्य',
]);

add(4, 'Mathematics', 'Ganit Mela', [
  'Shapes Around Us',
  'Hide and Seek',
  'Pattern Around Us',
  'Thousands Around Us',
  'Sharing and Measuring',
  'Measuring Length',
  'The Cleanest Village',
  'Weigh it, Pour it',
  'Equal Groups',
  'Elephants, Tigers and Leopards',
  'Fun with Symmetry',
  'Ticking Clocks and Turning Calendar',
  'The Transport Museum',
  'Data Handling',
]);

add(4, 'EVS', 'Our Wondrous World', [
  'Living Together',
  'Exploring Our Neighbourhood',
  'Nature Trail',
  'Growing Up with Nature',
  'Food for Health',
  'Happy and Healthy Living',
  'How Things Work',
  'How Things Are Made',
  'Safe Travel',
  'Sky Watch',
  'Caring for Earth',
  'Our Environment',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 5
// ═══════════════════════════════════════════════════════════════════════

add(5, 'English', 'Santoor', [
  'My Homeland',
  'Adventure with Books',
  'From a Railway Carriage',
  'The Unlikely Best Friends',
  'Culture and Tradition',
  'Teamwork',
  'Be a Buddy, Not a Bully!',
  'Paper Boats',
  'The World of Science',
  'A Happy Child',
  'Travel Diaries',
  'Curiosity',
  'The Mountain and the Squirrel',
  'A Friend\'s Letter',
  'Games We Play',
]);

add(5, 'Hindi', 'Veena', [
  'प्रकृति की सीख',
  'हम सब एक हैं',
  'खेल और स्वास्थ्य',
  'पेड़ों का महत्व',
  'मेहनत का फल',
  'सच्ची मित्रता',
  'त्योहारों की धूम',
  'यात्रा का आनंद',
  'जल बचाओ',
  'विज्ञान की दुनिया',
  'ईमानदारी',
  'साहस की कहानी',
  'हमारा संविधान',
  'पर्यावरण संरक्षण',
  'सपनों की उड़ान',
]);

add(5, 'Mathematics', 'Maths Mela', [
  'Building Numbers',
  'Shapes and Designs',
  'How Many Squares?',
  'Parts and Wholes',
  'Mapping Your Way',
  'Be My Multiple, I\'ll Be Your Factor',
  'Can You See the Pattern?',
  'Boxes and Sketches',
  'Tenths and Hundredths',
  'Area and Boundary',
  'Smart Charts',
  'Ways to Multiply and Divide',
  'Money Matters',
  'Data Handling',
  'Big Numbers Around Us',
]);

add(5, 'EVS', 'Exploring the World', [
  'Our Family',
  'Growing Together',
  'Friendship and Care',
  'Food and Nutrition',
  'Staying Healthy',
  'Houses Around Us',
  'Travelling Together',
  'Means of Communication',
  'Maps and Directions',
  'Plants Around Us',
  'Animals Around Us',
  'Water Resources',
  'Protecting Environment',
  'People and Their Work',
  'Festivals and Culture',
  'Community Helpers',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 6
// ═══════════════════════════════════════════════════════════════════════

add(6, 'English', 'Poorvi', [
  'A Bottle of Dew',
  'The Raven and the Fox',
  'Rama to the Rescue',
  'Change of Heart',
  'The Unlikely Best Friends',
  'Neem Baba',
  'What a Bird Thought',
  'Spices that Heal Us',
  'Yoga — A Way of Life',
  'The Winner',
  'Hamara Bharat — Incredible India!',
  'Festivals of India',
]);

add(6, 'Hindi', 'Malhar', [
  'मातृभूमि',
  'गोल',
  'पहली बूँद',
  'हार की जीत',
  'रहीम के दोहे',
  'यात्रा और यात्री',
  'जलाते चलो',
  'सतपुड़ा के जंगल',
  'सीख',
  'संसार पुस्तक है',
  'मैं सबसे छोटी होऊँ',
  'लोकगीत',
  'नाव बनाओ नाव बनाओ',
  'पेड़ की बात',
]);

add(6, 'Mathematics', 'Ganita Prakash', [
  'Patterns in Mathematics',
  'Lines and Angles',
  'Number Play',
  'Data Handling and Presentation',
  'Prime Time',
  'Perimeter and Area',
  'Fractions',
  'Playing with Constructions',
  'Symmetry',
  'The Other Side of Zero',
]);

add(6, 'Science', 'Curiosity', [
  'The Wonderful World of Science',
  'Diversity in the Living World',
  'Mindful Eating: A Path to a Healthy Body',
  'Exploring Magnets',
  'Measurement of Length and Motion',
  'Materials Around Us',
  'Temperature and its Measurement',
  'A Journey through States of Water',
  'Methods of Separation in Everyday Life',
  'Living Creatures: Exploring their Characteristics',
  'Nature\'s Treasures',
  'Beyond Earth',
]);

add(6, 'Social Science', 'Exploring Society: India and Beyond', [
  'Locating Places on the Earth',
  'Oceans and Continents',
  'Landforms and Life',
  'Timeline and Sources of History',
  'India\'s Cultural Roots',
  'The Beginnings of Indian Civilisation',
  'India\'s Cultural Traditions',
  'Unity in Diversity',
  'Family and Community',
  'Grassroots Democracy — Part 1',
  'Grassroots Democracy — Part 2',
  'Local Government and Administration',
  'Economic Activities Around Us',
  'Markets Around Us',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 7
// ═══════════════════════════════════════════════════════════════════════

add(7, 'English', 'Poorvi', [
  'The Day the River Spoke',
  'Try Again',
  'Three Days to See',
  'Animals, Birds, and Dr. Dolittle',
  'A Funny Man',
  'Say the Right Thing',
  'My Brother\'s Great Invention',
  'Paper Boats',
  'North, South, East, West',
  'The Tunnel',
  'Travel',
  'Conquering the Summit',
]);

add(7, 'Hindi', 'Malhar', [
  'माँ, कह एक कहानी',
  'तीन बुधिमान',
  'फूल और काँटा',
  'पानी रे पानी',
  'नहीं होना बीमार',
  'गिरिधर कविराय की कुंडलियाँ',
  'वर्षा-बहार',
  'बिरजू महाराज से साक्षात्कार',
  'चिड़िया',
  'मीरा के पद',
]);

add(7, 'Mathematics', 'Ganita Prakash', [
  'Large Numbers Around Us',
  'Arithmetic Expressions',
  'A Peek Beyond the Point',
  'Data Handling and Presentation',
  'Parallel and Intersecting Lines',
  'Number Play',
  'A Tale of Three Intersecting Lines',
  'Working with Fractions',
  'Perimeter, Area and Volume',
  'The Other Side of Zero',
  'Ratio and Proportion',
  'Algebraic Expressions',
  'Exponents and Powers',
]);

add(7, 'Science', 'Curiosity', [
  'The Ever-Evolving World of Science',
  'Exploring Substances: Acidic, Basic, and Neutral',
  'Electricity: Circuits and their Components',
  'The World of Metals and Non-metals',
  'Changes Around Us: Physical and Chemical',
  'Adolescence: A Stage of Growth and Change',
  'Heat Transfer in Nature',
  'Measurement of Time and Motion',
  'Life Processes in Animals',
  'Respiration and Circulation',
  'Weather, Climate and Adaptations',
  'Forests and Their Importance',
]);

add(7, 'Social Science', 'Exploring Society: India and Beyond', [
  'Geographical Diversity of India',
  'Understanding the Weather',
  'Climates of India',
  'New Beginnings: Cities and States',
  'The Rise of Empires',
  'The Age of Reorganisation',
  'The Gupta Era: An Age of Tireless Creativity',
  'How the Land Becomes Sacred',
  'From Pilgrimage to Trade, Beyond India',
  'From the Rulers to the Ruled: Types of Government',
  'The Constitution of India',
  'From Barter to Money',
  'Understanding Markets',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 8
// ═══════════════════════════════════════════════════════════════════════

add(8, 'English', 'Poorvi', [
  'The Wit That Won Hearts',
  'A Concrete Example',
  'Wisdom Paves the Way',
  'A Tale of Valour: Major Somnath Sharma',
  'Somebody\'s Mother',
  'Verghese Kurien: I Too Had a Dream',
  'The Case of the Fifth Word',
  'V. V. S. Aiyar',
  'The Magic of Words',
  'The World of Science',
  'Discoveries and Innovations',
  'Curiosity Leads the Way',
  'Nature\'s Wonders',
  'The Bond with Earth',
  'Caring for Our Planet',
]);

add(8, 'Hindi', 'Malhar', [
  'लाख की चूड़ियाँ',
  'बस की यात्रा',
  'दीवानों की हस्ती',
  'भगवान के डाकिए',
  'क्या निराश हुआ जाए',
  'यह सबसे कठिन समय नहीं',
  'कबीर की साखियाँ',
  'सुदामा चरित',
  'जहाँ पहिया है',
  'अकबरी लोटा',
  'सूरदास के पद',
  'पानी की कहानी',
  'बाज और साँप',
  'टोपी',
  'भारत की खोज',
]);

add(8, 'Mathematics', 'Ganita Prakash', [
  'A Square and A Cube',
  'Power Play',
  'A Story of Numbers',
  'Quadrilaterals',
  'Number Play',
  'We Distribute, Yet Things Multiply',
  'Proportional Reasoning',
  'Fractions in Disguise',
  'The Baudhayana-Pythagoras Theorem',
  'Playing with Data',
  'Introduction to Graphs',
  'Algebraic Expressions and Identities',
  'Visualising Solid Shapes',
  'Chances and Probability',
]);

add(8, 'Science', 'Curiosity', [
  'Exploring the Investigative World of Science',
  'The Invisible Living World: Beyond Our Naked Eye',
  'Health: The Ultimate Treasure',
  'Electricity: Magnetic and Heating Effects',
  'Exploring Forces',
  'Pressure, Winds, Storms and Cyclones',
  'Particulate Nature of Matter',
  'Light and Its Phenomena',
  'Sound and Communication',
  'Chemical Effects Around Us',
  'Earth and Beyond',
  'Sustainable Living',
]);

add(8, 'Social Science', 'Exploring Society: India and Beyond', [
  'Natural Resources and Their Use',
  'Reshaping India\'s Political Map',
  'The Rise of the Marathas',
  'The Colonial Era in India',
  'Universal Franchise and India\'s Electoral System',
  'The Parliamentary System: Legislature and Executive',
  'Factors of Production',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 9
// ═══════════════════════════════════════════════════════════════════════

// English — Beehive (Prose + Poems numbered sequentially)
add(9, 'English', 'Beehive', [
  // Prose
  'The Fun They Had',
  'The Sound of Music',
  'The Little Girl',
  'A Truly Beautiful Mind',
  'The Snake and the Mirror',
  'My Childhood',
  'Packing',
  'Reach for the Top',
  'The Bond of Love',
  'Kathmandu',
  'If I Were You',
  // Poems
  'The Road Not Taken',
  'Wind',
  'Rain on the Roof',
  'The Lake Isle of Innisfree',
  'A Legend of the Northland',
  'No Men Are Foreign',
  'The Duck and the Kangaroo',
  'On Killing a Tree',
  'The Snake Trying',
  'A Slumber Did My Spirit Seal',
]);

// English Supplementary — Moments
add(9, 'English Supplementary', 'Moments', [
  'The Lost Child',
  'The Adventures of Toto',
  'Iswaran the Storyteller',
  'In the Kingdom of Fools',
  'The Happy Prince',
  'Weathering the Storm in Ersama',
  'The Last Leaf',
  'A House Is Not a Home',
  'The Accidental Tourist',
  'The Beggar',
]);

// Hindi — Kshitij (Prose + Poetry numbered sequentially)
add(9, 'Hindi', 'Kshitij', [
  // गद्य (Prose)
  'दो बैलों की कथा',
  'ल्हासा की ओर',
  'उपभोक्तावाद की संस्कृति',
  'साँवले सपनों की याद',
  'नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया',
  'प्रेमचंद के फटे जूते',
  'मेरे बचपन के दिन',
  'एक कुत्ता और एक मैना',
  // कविताएँ (Poems)
  'साखियाँ एवं सबद',
  'वाख',
  'सवैये',
  'कैदी और कोकिला',
  'ग्राम श्री',
  'चंद्र गहना से लौटती बेर',
  'मेघ आए',
  'बच्चे काम पर जा रहे हैं',
]);

// Hindi Supplementary — Kritika
add(9, 'Hindi Supplementary', 'Kritika', [
  'इस जल प्रलय में',
  'मेरे संग की औरतें',
  'रीढ़ की हड्डी',
  'माटीवाली',
  'किस तरह आखिरकार मैं हिंदी में आया',
]);

// Mathematics
add(9, 'Mathematics', 'Mathematics', [
  'Number Systems',
  'Polynomials',
  'Coordinate Geometry',
  'Linear Equations in Two Variables',
  'Introduction to Euclid\'s Geometry',
  'Lines and Angles',
  'Triangles',
  'Quadrilaterals',
  'Areas of Parallelograms and Triangles',
  'Circles',
  'Constructions',
  'Heron\'s Formula',
  'Surface Areas and Volumes',
  'Statistics',
  'Probability',
]);

// Science — split into Physics, Chemistry, Biology
add(9, 'Chemistry', 'Science', [
  'Matter in Our Surroundings',
  'Is Matter Around Us Pure?',
  'Atoms and Molecules',
  'Structure of the Atom',
]);

add(9, 'Biology', 'Science', [
  'The Fundamental Unit of Life',
  'Tissues',
  'Improvement in Food Resources',
]);

add(9, 'Physics', 'Science', [
  'Motion',
  'Force and Laws of Motion',
  'Gravitation',
  'Work and Energy',
  'Sound',
]);

// Social Science — split into History, Geography, Political Science, Economics
add(9, 'History', 'India and the Contemporary World-I', [
  'The French Revolution',
  'Socialism in Europe and the Russian Revolution',
  'Nazism and the Rise of Hitler',
  'Forest Society and Colonialism',
  'Pastoralists in the Modern World',
]);

add(9, 'Geography', 'Contemporary India-I', [
  'India — Size and Location',
  'Physical Features of India',
  'Drainage',
  'Climate',
  'Natural Vegetation and Wildlife',
  'Population',
]);

add(9, 'Political Science', 'Democratic Politics-I', [
  'What is Democracy? Why Democracy?',
  'Constitutional Design',
  'Electoral Politics',
  'Working of Institutions',
  'Democratic Rights',
]);

add(9, 'Economics', 'Economics', [
  'The Story of Village Palampur',
  'People as Resource',
  'Poverty as a Challenge',
  'Food Security in India',
]);

// ═══════════════════════════════════════════════════════════════════════
//  CLASS 10
// ═══════════════════════════════════════════════════════════════════════

// English — First Flight (Prose + Poems)
add(10, 'English', 'First Flight', [
  // Prose
  'A Letter to God',
  'Nelson Mandela: Long Walk to Freedom',
  'Two Stories about Flying',
  'From the Diary of Anne Frank',
  'Glimpses of India',
  'Mijbil the Otter',
  'Madam Rides the Bus',
  'The Sermon at Benares',
  'The Proposal',
  // Poems
  'Dust of Snow',
  'Fire and Ice',
  'A Tiger in the Zoo',
  'How to Tell Wild Animals',
  'The Ball Poem',
  'Amanda!',
  'Animals',
  'The Trees',
  'Fog',
  'The Tale of Custard the Dragon',
  'For Anne Gregory',
]);

// English Supplementary — Footprints Without Feet
add(10, 'English Supplementary', 'Footprints Without Feet', [
  'A Triumph of Surgery',
  'The Thief\'s Story',
  'The Midnight Visitor',
  'A Question of Trust',
  'Footprints Without Feet',
  'The Making of a Scientist',
  'The Necklace',
  'The Hack Driver',
  'Bholi',
  'The Book That Saved the Earth',
]);

// Hindi — Kshitij (Prose + Poetry)
add(10, 'Hindi', 'Kshitij', [
  // गद्य खंड (Prose)
  'नेताजी का चश्मा',
  'बालगोबिन भगत',
  'लखनवी अंदाज़',
  'मानवीय करुणा की दिव्य चमक',
  'एक कहानी यह भी',
  'स्त्री शिक्षा के विरोधी कुतर्कों का खंडन',
  'नौबतखाने में इबादत',
  'संस्कृति',
  // काव्य खंड (Poetry)
  'सूरदास',
  'तुलसीदास',
  'देव',
  'जयशंकर प्रसाद',
  'सूर्यकांत त्रिपाठी \'निराला\'',
  'नागार्जुन',
  'गिरिजा कुमार माथुर',
  'ऋतुराज',
  'मंगलेश डबराल',
]);

// Hindi Supplementary — Kritika
add(10, 'Hindi Supplementary', 'Kritika', [
  'माता का आँचल',
  'जॉर्ज पंचम की नाक',
  'साना-साना हाथ जोड़ि',
  'एही ठैयाँ झुलनी हेरानी हो रामा!',
  'मैं क्यों लिखता हूँ',
]);

// Mathematics
add(10, 'Mathematics', 'Mathematics', [
  'Real Numbers',
  'Polynomials',
  'Pair of Linear Equations in Two Variables',
  'Quadratic Equations',
  'Arithmetic Progressions',
  'Triangles',
  'Coordinate Geometry',
  'Introduction to Trigonometry',
  'Some Applications of Trigonometry',
  'Circles',
  'Areas Related to Circles',
  'Surface Areas and Volumes',
  'Statistics',
  'Probability',
]);

// Science — split into Physics, Chemistry, Biology
add(10, 'Chemistry', 'Science', [
  'Chemical Reactions and Equations',
  'Acids, Bases and Salts',
  'Metals and Non-metals',
  'Carbon and Its Compounds',
  'Periodic Classification of Elements',
]);

add(10, 'Biology', 'Science', [
  'Life Processes',
  'Control and Coordination',
  'How do Organisms Reproduce?',
  'Heredity and Evolution',
  'Our Environment',
  'Sustainable Management of Natural Resources',
]);

add(10, 'Physics', 'Science', [
  'Light – Reflection and Refraction',
  'The Human Eye and the Colourful World',
  'Electricity',
  'Magnetic Effects of Electric Current',
  'Sources of Energy',
]);

// Social Science — split into History, Geography, Political Science, Economics
add(10, 'History', 'India and the Contemporary World-II', [
  'The Rise of Nationalism in Europe',
  'Nationalism in India',
  'The Making of a Global World',
  'The Age of Industrialisation',
  'Print Culture and the Modern World',
]);

add(10, 'Geography', 'Contemporary India-II', [
  'Resources and Development',
  'Forest and Wildlife Resources',
  'Water Resources',
  'Agriculture',
  'Minerals and Energy Resources',
  'Manufacturing Industries',
  'Lifelines of National Economy',
]);

add(10, 'Political Science', 'Democratic Politics-II', [
  'Power Sharing',
  'Federalism',
  'Gender, Religion and Caste',
  'Political Parties',
  'Outcomes of Democracy',
]);

add(10, 'Economics', 'Understanding Economic Development', [
  'Development',
  'Sectors of the Indian Economy',
  'Money and Credit',
  'Globalisation and the Indian Economy',
  'Consumer Rights',
]);


// ═══════════════════════════════════════════════════════════════════════
//  SEEDER
// ═══════════════════════════════════════════════════════════════════════

async function seed() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  AbhyasAI — Comprehensive NCERT Seeder');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(`Total chapters to seed: ${ALL_CHAPTERS.length}\n`);

  // Step 1: Delete ALL existing chapters
  console.log('Step 1: Clearing all existing chapters...');
  const { error: delErr, count: delCount } = await supabase
    .from('chapters')
    .delete({ count: 'exact' })
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (delErr) {
    console.error('Failed to delete:', delErr.message);
    process.exit(1);
  }
  console.log(`  Deleted ${delCount} existing rows\n`);

  // Step 2: Insert in batches of 50
  console.log('Step 2: Inserting chapters...');
  let inserted = 0;
  let failed = 0;
  const BATCH_SIZE = 50;

  for (let i = 0; i < ALL_CHAPTERS.length; i += BATCH_SIZE) {
    const batch = ALL_CHAPTERS.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('chapters').insert(batch);

    if (error) {
      console.error(`  Batch ${Math.floor(i / BATCH_SIZE) + 1} failed: ${error.message}`);
      // Try inserting one by one to find the problematic row
      for (const ch of batch) {
        const { error: singleErr } = await supabase.from('chapters').insert(ch);
        if (singleErr) {
          console.error(`    ✗ Class ${ch.class_num} ${ch.subject} Ch${ch.chapter_num} "${ch.chapter_title}" — ${singleErr.message}`);
          failed++;
        } else {
          inserted++;
        }
      }
    } else {
      inserted += batch.length;
      const lastCh = batch[batch.length - 1];
      process.stdout.write(`\r  Inserted: ${inserted}/${ALL_CHAPTERS.length} (Class ${lastCh.class_num} ${lastCh.subject})`);
    }
  }

  console.log(`\n\nStep 3: Verification\n`);

  // Step 3: Verify
  for (const cls of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    const { data } = await supabase
      .from('chapters')
      .select('subject')
      .eq('class_num', cls);

    const subjectCounts = {};
    data.forEach(row => {
      subjectCounts[row.subject] = (subjectCounts[row.subject] || 0) + 1;
    });

    const subjectStr = Object.entries(subjectCounts)
      .map(([s, c]) => `${s}(${c})`)
      .join(', ');

    console.log(`  Class ${String(cls).padStart(2)}: ${String(data.length).padStart(3)} chapters — ${subjectStr}`);
  }

  const { count: totalCount } = await supabase
    .from('chapters')
    .select('*', { count: 'exact', head: true });

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  SEEDING COMPLETE`);
  console.log(`  Inserted: ${inserted}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total in DB: ${totalCount}`);
  console.log(`═══════════════════════════════════════════════════`);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
