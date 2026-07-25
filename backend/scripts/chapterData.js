// backend/scripts/chapterData.js
// 20 NCERT-aligned chapters for seeding

const chapters = [
  // ===== DEMO CHAPTER 1: Class 5 Science Ch2 =====
  {
    class_num: 5, subject: 'Science', chapter_num: 2,
    chapter_title: 'Components of Food', language: 'english',
    word_count: 850,
    learning_objectives: [
      'Identify the main nutrients found in food',
      'Explain the role of each nutrient in the body',
      'Identify food sources of each nutrient',
      'Understand what a balanced diet means',
      'Recognize common deficiency diseases'
    ],
    content_json: { sections: [
      { heading: 'What Do Different Foods Contain', type: 'text',
        content: 'We eat many different foods every day. Rice, chapati, bread, butter, fruits, vegetables, meat, fish and eggs are some common foods. Each of these foods contains one or more nutrients. Nutrients are substances that our body needs to work properly. The main nutrients in our food are carbohydrates, proteins, fats, vitamins and minerals. Our body also needs dietary fibre and water. All these components together make our food nutritious and wholesome.' },
      { heading: 'Carbohydrates', type: 'text',
        content: 'Carbohydrates are the main source of energy for our body. Foods like rice, wheat, potatoes, sugar and bread are rich in carbohydrates. When we eat these foods, our body breaks down the carbohydrates into glucose. Glucose gives us the energy to run, play, study and do all our daily activities. If we eat too many carbohydrates, the extra energy is stored as fat in our body.' },
      { heading: 'Proteins', type: 'text',
        content: 'Proteins are needed for the growth and repair of our body. They help build our muscles, skin, hair and nails. Foods rich in proteins include pulses (dal), milk, eggs, fish, meat, soybeans and paneer. Growing children need more proteins because their bodies are still developing. Proteins are often called body-building foods.' },
      { heading: 'Fats', type: 'text',
        content: 'Fats give us energy. In fact, fats give us more than twice the energy that carbohydrates give. Butter, ghee, oil, nuts and cheese are rich in fats. Our body stores extra fat under the skin, which keeps us warm in cold weather. However, eating too much fat can make us overweight and unhealthy.' },
      { heading: 'Vitamins and Minerals', type: 'text',
        content: 'Vitamins and minerals are needed in small amounts but they are very important. Vitamin A keeps our eyes healthy and is found in carrots, papaya and milk. Vitamin C helps fight infections and is found in citrus fruits like oranges and lemons. Vitamin D is needed for strong bones and we get it from sunlight. Minerals like calcium make our bones and teeth strong, and iron helps carry oxygen in our blood. Lack of vitamins causes deficiency diseases like scurvy (lack of Vitamin C) and rickets (lack of Vitamin D).' },
      { heading: 'Balanced Diet', type: 'text',
        content: 'A balanced diet contains the right amounts of all nutrients, water and roughage. No single food contains all the nutrients we need. That is why we should eat a variety of foods. A balanced diet helps us stay healthy, active and free from diseases. Roughage or dietary fibre is found in whole grains, fruits and vegetables. It helps our body get rid of waste. Water is essential for digestion, absorption and transportation of nutrients in our body.' }
    ]}
  },
  // ===== DEMO CHAPTER 2: Class 5 Science Ch3 =====
  {
    class_num: 5, subject: 'Science', chapter_num: 3,
    chapter_title: 'Fibre to Fabric', language: 'english',
    word_count: 720,
    learning_objectives: [
      'Distinguish between plant and animal fibres',
      'Explain how cotton is obtained from plants',
      'Describe the spinning process',
      'Differentiate weaving from knitting'
    ],
    content_json: { sections: [
      { heading: 'Plant Fibres', type: 'text',
        content: 'We wear clothes made from different types of fabrics. These fabrics are made from fibres. Some fibres come from plants. Cotton and jute are two important plant fibres. Cotton comes from the cotton plant. The cotton plant bears fruits called cotton bolls. When the bolls mature and burst open, we can see white cotton fibres attached to the seeds. These fibres are picked by hand or by machines and sent to factories.' },
      { heading: 'Animal Fibres', type: 'text',
        content: 'Some fibres come from animals. Wool comes from the hair of sheep, goats and yaks. Silk comes from the cocoon of the silkworm. Sheep are sheared once or twice a year to get their fleece, which is then processed to make woollen yarn. Silkworms spin cocoons using a single long thread. This thread is unwound and twisted together to make silk yarn.' },
      { heading: 'Making Yarn from Fibre — Spinning', type: 'text',
        content: 'The process of making yarn from fibres is called spinning. In spinning, fibres are drawn out and twisted to form yarn. A simple device used for spinning is the hand spindle called takli. A larger device is the charkha, which Mahatma Gandhi popularised. Today, spinning is mostly done by machines in large factories. The yarn produced is then used to make fabric.' },
      { heading: 'Weaving and Knitting', type: 'text',
        content: 'There are two main ways to make fabric from yarn: weaving and knitting. In weaving, two sets of yarn are arranged together — one set goes lengthwise (warp) and the other goes crosswise (weft). A loom is used for weaving. In knitting, a single yarn is used to make a piece of fabric by forming interlocking loops. Socks, sweaters and caps are often knitted. You can try knitting using two knitting needles and some yarn.' }
    ]}
  },
  // ===== DEMO CHAPTER 3: Class 6 Science Ch1 =====
  {
    class_num: 6, subject: 'Science', chapter_num: 1,
    chapter_title: 'Food: Where Does It Come From', language: 'english',
    word_count: 780,
    learning_objectives: [
      'Identify the variety of food eaten across India',
      'Classify food items by their source',
      'Identify edible parts of plants',
      'Understand herbivores, carnivores and omnivores'
    ],
    content_json: { sections: [
      { heading: 'Food Variety', type: 'text',
        content: 'India is a land of diverse food habits. People in different parts of India eat different types of food. In South India, people eat rice, sambar and coconut chutney. In North India, wheat-based foods like roti and paratha are popular. Coastal areas have a lot of fish and seafood. Each region has its own special dishes, but all food provides us with nutrients we need.' },
      { heading: 'Food Materials and Sources', type: 'text',
        content: 'All the food we eat comes from either plants or animals. Foods like rice, wheat, vegetables and fruits come from plants. Foods like milk, eggs, meat and honey come from animals. Some food items need ingredients from both plants and animals. For example, a cake needs flour from plants, eggs from hens and butter from milk.' },
      { heading: 'Plant Parts as Food', type: 'text',
        content: 'We eat different parts of plants. We eat the roots of carrot, radish and turnip. We eat the stems of potato and ginger. We eat the leaves of spinach, cabbage and lettuce. We eat the flowers of cauliflower and broccoli. We eat the fruits of mango, apple and tomato. We eat the seeds of wheat, rice, maize and peas. Different plants give us different edible parts.' },
      { heading: 'Animal Products as Food', type: 'text',
        content: 'Animals provide us with many food products. Cows, buffaloes and goats give us milk. From milk we make curd, butter, cheese and ghee. Hens give us eggs. Fish, prawns and crabs are eaten in many parts of India. Honey is produced by honeybees. Meat from goats, chickens and fish provides proteins to our body.' },
      { heading: 'What Do Animals Eat', type: 'text',
        content: 'Animals eat different types of food. Animals that eat only plants are called herbivores. Cows, goats, deer and rabbits are herbivores. Animals that eat only other animals are called carnivores. Lions, tigers and eagles are carnivores. Animals that eat both plants and animals are called omnivores. Bears, crows and humans are omnivores.' }
    ]}
  },
  // ===== DEMO CHAPTER 4: Class 5 Mathematics Ch1 =====
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 1,
    chapter_title: 'The Fish Tale', language: 'english',
    word_count: 650,
    learning_objectives: [
      'Read and interpret data from tables and charts',
      'Apply measurement concepts in real contexts',
      'Solve word problems involving weight and money',
      'Understand large numbers in everyday context'
    ],
    content_json: { sections: [
      { heading: 'A Visit to a Fish Market', type: 'text',
        content: 'Fazila lives near the sea in Kerala. Her family catches fish and sells them at the market. At the fish market, you can see many types of fish — sardines, mackerel, prawns and pomfret. Each type of fish has a different price. Sardines cost about 80 rupees per kilogram, while pomfret costs about 400 rupees per kilogram. The fishermen use large weighing scales to measure the fish.' },
      { heading: 'How Much Does the Fish Weigh', type: 'text',
        content: 'Fish is sold by weight. Small fish like sardines are measured in kilograms. A basket of sardines might weigh 5 kg. If one kilogram costs Rs 80, then 5 kg costs 5 times 80 which equals Rs 400. The fishermen catch hundreds of kilograms of fish each day. If a boat catches 200 kg of fish in one trip, and they make 2 trips a day, they catch 400 kg total. That is almost half a tonne of fish!' },
      { heading: 'Measuring in Different Ways', type: 'text',
        content: 'At the fish market, people use different units of measurement. Weight is measured in grams and kilograms. 1 kilogram equals 1000 grams. Very large amounts are measured in tonnes. 1 tonne equals 1000 kilograms. Length of fish is measured in centimetres. A sardine is about 15 cm long, while a swordfish can be 300 cm or 3 metres long. Money is counted in rupees and paise.' },
      { heading: 'Fisherfolk Math', type: 'text',
        content: 'Fisherfolk use mathematics every day. They calculate the cost of fuel for their boats. A boat uses about 10 litres of diesel per trip. If diesel costs Rs 90 per litre, one trip costs Rs 900 in fuel. They also calculate their earnings. If they sell 100 kg of fish at Rs 120 per kg, they earn Rs 12,000. After subtracting fuel cost of Rs 900 and other expenses of Rs 1,100, their profit is Rs 10,000. Mathematics helps them run their business.' }
    ]}
  },
  // ===== DEMO CHAPTER 5: Class 4 English Ch1 =====
  {
    class_num: 4, subject: 'English', chapter_num: 1,
    chapter_title: 'Wake Up', language: 'english',
    word_count: 520,
    learning_objectives: [
      'Read a poem with proper expression and rhythm',
      'Understand new vocabulary words from context',
      'Answer comprehension questions about the poem',
      'Relate themes of nature to personal experience'
    ],
    content_json: { sections: [
      { heading: 'The Poem', type: 'text',
        content: 'Wake up! Wake up! The morning is here. The sun is shining bright and clear. The birds are singing in the trees, the flowers are dancing in the breeze. The dew drops sparkle on the grass, like tiny diamonds made of glass. The rooster crows, the cows they moo, the whole wide world says "Good morning to you!" Come out and see the golden light, the sky is blue, the clouds are white. The butterflies are all around, their colourful wings make not a sound. So stretch your arms and rub your eyes, come see the beauty of sunrise!' },
      { heading: 'Word Meanings', type: 'text',
        content: 'Shining means giving out bright light. Breeze means a gentle wind. Dew drops are tiny drops of water that form on grass and leaves early in the morning. Sparkle means to shine with small bright flashes of light. Diamonds are precious stones that shine brightly. Rooster is a male chicken that crows in the morning. Golden means having the colour of gold, bright yellow.' },
      { heading: 'Reading Comprehension', type: 'text',
        content: 'Questions to think about: What time of day is the poem about? What are the birds doing? What do the dew drops look like? Which animals are mentioned in the poem? What colours are described in the poem? How does the poem make you feel? Can you describe what you see when you wake up in the morning?' },
      { heading: 'Let Us Talk', type: 'text',
        content: 'Talk about your morning routine. What is the first thing you do when you wake up? Do you hear any birds near your home? What does the sky look like in the morning? Have you ever seen dew drops on leaves? Share your favourite thing about mornings with your classmates.' },
      { heading: 'Let Us Write', type: 'text',
        content: 'Write three sentences about what you see in the morning. Draw a picture of a sunrise and label the things you can see — the sun, birds, trees, flowers and clouds. Write a short poem of four lines about your morning. Try to use rhyming words like sun-fun, day-play, light-bright.' }
    ]}
  }
];

// ===== 15 SHORTER CHAPTERS =====
const shortChapters = [
  { c:1, sub:'English', ch:1, title:'A Happy Child', obj:['Read simple sentences','Identify rhyming words','Understand feelings vocabulary','Describe what makes them happy'],
    secs:[{h:'The Poem',t:'A happy child is one who plays, and laughs and sings through all the days. With friends so dear and skies so blue, each morning brings something new. The flowers bloom and birds take flight, everything feels warm and bright.'},{h:'New Words',t:'Happy means feeling joy and pleasure. Child means a young boy or girl. Bloom means when flowers open up. Flight means the act of flying through the air.'},{h:'Activities',t:'Draw a picture of things that make you happy. Circle the rhyming words in the poem. Tell your friend about your happiest day.'}]},
  { c:1, sub:'Mathematics', ch:1, title:'Shapes and Space', obj:['Identify basic shapes','Differentiate between circle square triangle','Recognize shapes in daily life','Sort objects by shape'],
    secs:[{h:'Shapes Around Us',t:'Look around you. Can you see shapes everywhere? The wheel of a bicycle is a circle. The blackboard is a rectangle. A slice of pizza is a triangle. Shapes are all around us in our daily life.'},{h:'Circle Square Triangle',t:'A circle is round with no corners. A square has four equal sides and four corners. A triangle has three sides and three corners. Each shape looks different and has its own special features.'},{h:'Finding Shapes',t:'Go around your classroom and find objects shaped like circles, squares, triangles and rectangles. Make a list of what you find. Draw each shape and colour it.'}]},
  { c:2, sub:'Science', ch:1, title:'Is Matter Around Us Pure', obj:['Define matter and its states','Identify pure substances','Understand mixtures','Distinguish homogeneous from heterogeneous'],
    secs:[{h:'What is Matter',t:'Everything around us that has mass and takes up space is called matter. Matter exists in three states: solid, liquid and gas. A stone is solid, water is liquid and air is gas.'},{h:'Pure Substances',t:'A pure substance is made up of only one type of particle. Elements like iron and gold are pure substances. Compounds like water and salt are also pure because they have a fixed composition.'},{h:'Mixtures',t:'When two or more substances are mixed together without any chemical reaction, we get a mixture. Air is a mixture of gases. Lemonade is a mixture of water, lemon juice and sugar. Mixtures can be separated by physical methods.'}]},
  { c:2, sub:'Hindi', ch:1, title:'Oonth Chala', obj:['Read Hindi text fluently','Understand story sequence','Learn new Hindi vocabulary','Answer questions in Hindi'],
    secs:[{h:'Kahani',t:'Ek oonth tha jo bahut akal mein thha. Woh roz subah uthta aur paani peene jaata. Raaste mein usey bahut se dost milte. Ped, pakshi aur phool sab usey pyaar se dekhte the.'},{h:'Shabd Arth',t:'Oonth ka matlab hai camel jo registaan mein rehta hai. Akal ka matlab hai wisdom ya samajhdaari. Raasta ka matlab hai path ya road.'},{h:'Abhyaas',t:'Kahani ke baare mein paanch sawaal ka uttar likho. Oonth ke baare mein ek chhota sa paragraph likho.'}]},
  { c:3, sub:'Mathematics', ch:1, title:'Where to Look From', obj:['Understand different views of objects','Draw top and side views','Identify objects from different angles','Develop spatial reasoning'],
    secs:[{h:'Looking at Objects',t:'When you look at a glass from the top, it looks like a circle. When you look at it from the side, it looks like a rectangle. The same object can look very different depending on where you are looking from.'},{h:'Top View and Side View',t:'The top view is what you see when you look at an object from above. The side view is what you see from the side. A cone looks like a triangle from the side and a circle from the top.'},{h:'Practice',t:'Take different objects from your home. Draw them as they look from the top and from the side. Compare your drawings with your friends.'}]},
  { c:3, sub:'Science', ch:1, title:'Living and Non-Living Things', obj:['Distinguish living from non-living','Identify characteristics of living things','Give examples of both categories','Understand basic life processes'],
    secs:[{h:'What are Living Things',t:'Living things can breathe, eat, grow, move and reproduce. Plants and animals are living things. A dog can run and bark. A plant can grow towards sunlight.'},{h:'What are Non-Living Things',t:'Non-living things do not breathe, eat, grow or reproduce. Rocks, water, chairs and books are non-living things. Some non-living things like cars can move, but they need fuel or energy from outside.'},{h:'How to Tell the Difference',t:'To decide if something is living or non-living, ask: Does it breathe? Does it need food? Does it grow? Can it have babies? If the answer is yes to these questions, it is a living thing.'}]},
  { c:4, sub:'Mathematics', ch:1, title:'Building with Bricks', obj:['Understand patterns in arrangements','Count objects in rows and columns','Calculate area using unit squares','Identify symmetry in patterns'],
    secs:[{h:'Brick Patterns',t:'Look at the walls around you. Bricks are arranged in patterns. Some walls have bricks placed lengthwise, others have them placed sideways. These different arrangements create different patterns and give walls different strengths.'},{h:'Counting in Rows',t:'If a wall has 5 bricks in each row and 4 rows, the total number of bricks is 5 times 4 which equals 20. This is the same as finding the area of a rectangle.'},{h:'Making Patterns',t:'Using square blocks or paper squares, create your own patterns. Try making patterns that look the same on both sides. This is called symmetry.'}]},
  { c:4, sub:'Hindi', ch:1, title:'Chalak Lomdi', obj:['Read Hindi story with expression','Understand moral of the story','Learn animal names in Hindi','Retell story in own words'],
    secs:[{h:'Kahani',t:'Ek jungle mein ek chalak lomdi rehti thi. Woh bahut hoshiyaar thi. Ek din usey ek kauwe ke paas roti ka tukda dikha. Lomdi ne kauwe ki tareef ki aur kaha tumhari awaaz bahut meethi hai, ek gaana sunao.'},{h:'Seekh',t:'Is kahani se hum seekhte hain ki hamesha hoshiyaar rehna chahiye. Chamchagiri karne walon se savdhan rehna chahiye. Kisi ki jhoothi tareef par vishwaas nahi karna chahiye.'},{h:'Shabd',t:'Lomdi means fox. Chalak means clever. Kauwa means crow. Roti means bread. Tareef means praise.'}]},
  { c:6, sub:'Mathematics', ch:1, title:'Knowing Our Numbers', obj:['Read and write large numbers','Compare numbers using place value','Round off numbers','Use Indian and International number systems'],
    secs:[{h:'Large Numbers',t:'We use numbers every day. Small numbers like 5 and 10 are easy to understand. But what about large numbers like 5,00,000 or 10,00,00,000? In the Indian system, we use lakhs and crores. 1 lakh equals 1,00,000 and 1 crore equals 1,00,00,000.'},{h:'Comparing Numbers',t:'To compare numbers, we first look at the number of digits. A number with more digits is always larger. If two numbers have the same number of digits, we compare the leftmost digit first. For example, 8,543 is greater than 7,999 because 8 is greater than 7.'},{h:'Rounding Off',t:'Sometimes we do not need the exact number. We can round off to the nearest ten, hundred or thousand. 47 rounded to nearest ten is 50. 834 rounded to nearest hundred is 800. Rounding helps us estimate quickly.'}]},
  { c:6, sub:'Hindi', ch:1, title:'Vah Chidiya Jo', obj:['Appreciate Hindi poetry','Identify poetic devices','Understand bird metaphor','Write descriptive sentences in Hindi'],
    secs:[{h:'Kavita',t:'Vah chidiya jo chonch mein tinka dabakar laa rahi thi, woh bhi kya sundar sapna dekh rahi thi. Neele peele rang mein rang gayi thi, geet apna sunaa rahi thi.'},{h:'Shabdarth',t:'Chidiya means bird. Chonch means beak. Tinka means a piece of straw. Sapna means dream. Geet means song.'},{h:'Prashn',t:'Chidiya kya la rahi thi? Chidiya kaisi thi? Kavita mein kaun kaun se rang hain? Chidiya kya kar rahi thi?'}]},
  { c:7, sub:'Science', ch:1, title:'Nutrition in Plants', obj:['Understand autotrophic nutrition','Explain photosynthesis process','Identify parts of leaf involved','Describe insectivorous plants'],
    secs:[{h:'How Plants Make Food',t:'Plants make their own food through a process called photosynthesis. They use sunlight, carbon dioxide from air and water from soil. The green pigment chlorophyll in leaves captures sunlight energy. This energy converts carbon dioxide and water into glucose and oxygen.'},{h:'The Leaf Factory',t:'Leaves are like food factories for plants. They have tiny pores called stomata on their surface. Carbon dioxide enters through stomata. Water reaches leaves through the stem from roots. Chlorophyll gives leaves their green colour.'},{h:'Special Plants',t:'Some plants are insectivorous — they eat insects. Venus flytrap has leaves that snap shut when an insect lands on them. Pitcher plant has a slippery pitcher-shaped structure that traps insects. These plants grow in soil that lacks nitrogen, so they get it from insects.'}]},
  { c:7, sub:'Mathematics', ch:1, title:'Integers', obj:['Understand positive and negative numbers','Represent integers on number line','Add and subtract integers','Apply integers to real situations'],
    secs:[{h:'What are Integers',t:'Integers include all positive whole numbers, zero and all negative whole numbers. Examples: -3, -2, -1, 0, 1, 2, 3. Positive integers are greater than zero. Negative integers are less than zero. Zero is neither positive nor negative.'},{h:'Number Line',t:'We can show integers on a number line. Zero is in the middle. Positive numbers go to the right. Negative numbers go to the left. The further right, the larger the number. The further left, the smaller.'},{h:'Adding Integers',t:'To add two positive integers, add normally. To add two negative integers, add their values and put a minus sign. To add a positive and negative integer, find the difference and use the sign of the larger number.'}]},
  { c:8, sub:'Science', ch:1, title:'Crop Production and Management', obj:['Understand agricultural practices','Describe steps in crop production','Explain irrigation methods','Differentiate kharif and rabi crops'],
    secs:[{h:'Agricultural Practices',t:'Growing crops on a large scale requires several steps. These include preparation of soil, sowing, adding manure and fertilisers, irrigation, protecting from weeds and pests, harvesting and storage. India has been an agricultural country for thousands of years.'},{h:'Types of Crops',t:'Crops grown in the rainy season (June to September) are called kharif crops. Examples: paddy, maize, soybean. Crops grown in the winter season (October to March) are called rabi crops. Examples: wheat, gram, mustard.'},{h:'Irrigation',t:'Plants need water to grow. Supplying water to crops is called irrigation. Traditional methods include moat, chain pump and dhekli. Modern methods include sprinkler systems and drip irrigation, which save water.'}]},
  { c:8, sub:'Mathematics', ch:1, title:'Rational Numbers', obj:['Define rational numbers','Represent on number line','Perform operations with rationals','Find rationals between two numbers'],
    secs:[{h:'What are Rational Numbers',t:'A rational number is any number that can be written as p/q where p and q are integers and q is not zero. Examples: 1/2, -3/4, 5, 0. All integers, fractions and terminating decimals are rational numbers.'},{h:'Properties',t:'Rational numbers are closed under addition, subtraction and multiplication. This means adding, subtracting or multiplying two rational numbers always gives another rational number. Zero is the additive identity and 1 is the multiplicative identity.'},{h:'Between Two Rationals',t:'There are infinitely many rational numbers between any two rational numbers. To find a rational between 1/3 and 1/2, we can find their average: (1/3 + 1/2) / 2 = (5/6) / 2 = 5/12. So 5/12 lies between 1/3 and 1/2.'}]},
  { c:5, sub:'Social Science', ch:1, title:'Super Senses', obj:['Understand animal senses','Compare animal and human senses','Learn how animals communicate','Appreciate animal adaptations'],
    secs:[{h:'Animal Senses',t:'Animals have amazing senses. Dogs can hear sounds that humans cannot hear. Eagles can see a mouse from very high up in the sky. Sharks can smell blood from far away in the ocean. Snakes can feel vibrations through the ground.'},{h:'How Animals See',t:'Different animals see the world differently. Owls can see very well at night. Bees can see ultraviolet light that humans cannot see. Chameleons can move each eye independently, looking in two directions at once.'},{h:'Animal Communication',t:'Animals communicate in many ways. Birds sing songs to attract mates and warn of danger. Dolphins use clicking sounds underwater. Ants leave chemical trails for other ants to follow. Elephants can communicate using sounds too low for humans to hear.'}]}
];

for (const s of shortChapters) {
  chapters.push({
    class_num: s.c, subject: s.sub, chapter_num: s.ch,
    chapter_title: s.title, language: 'english',
    word_count: s.secs.reduce((a, x) => a + x.t.split(' ').length, 0),
    learning_objectives: s.obj,
    content_json: { sections: s.secs.map(x => ({ heading: x.h, content: x.t, type: 'text' })) }
  });
}

module.exports = chapters;
