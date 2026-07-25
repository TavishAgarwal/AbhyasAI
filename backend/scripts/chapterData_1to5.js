// backend/scripts/chapterData_1to5.js
// Comprehensive NCERT chapter catalog — Classes 1-5

const chapters = [

  // =========================================================================
  //  CLASS 1 — English (Marigold) — 10 chapters
  // =========================================================================
  {
    class_num: 1, subject: 'English', chapter_num: 1,
    chapter_title: 'A Happy Child / Three Little Pigs', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read simple sentences with proper expression',
      'Identify rhyming words in the poem',
      'Understand feelings and emotions vocabulary'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This unit combines a poem about happiness and a classic fairy tale. The poem "A Happy Child" introduces young learners to rhyming words and feelings vocabulary, while "Three Little Pigs" teaches sequencing and the importance of hard work through a beloved story.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 2,
    chapter_title: 'After a Bath / The Bubble, the Straw and the Shoe', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn vocabulary related to daily routines',
      'Understand the concept of cooperation',
      'Recite a poem with actions and rhythm'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This unit pairs a playful poem about bath time with a folk tale about three unlikely friends — a bubble, a straw, and a shoe — who try to cross a river. It teaches children about daily hygiene and the value of teamwork.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 3,
    chapter_title: 'One Little Kitten / Lalu and Peelu', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count using English number words',
      'Identify names of common animals',
      'Read a simple story with picture clues'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "One Little Kitten" introduces counting and animal names in a fun rhythmic format. The story of "Lalu and Peelu" follows two parrots and teaches colours, fruits, and basic conversation through a simple narrative.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 4,
    chapter_title: 'Once I Saw a Little Bird / Mittu and the Yellow Mango', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Observe birds and describe their features',
      'Understand the sequence of events in a story',
      'Learn names of fruits and colours'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This unit features a poem about observing a little bird and a story about a parrot named Mittu who loves mangoes. Children learn to appreciate nature, recognise colours and fruits, and develop observation skills.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 5,
    chapter_title: 'Merry-Go-Round / Circle', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify circular shapes in everyday life',
      'Understand the concept of round and circular motion',
      'Read a poem with rhythm and expression'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Merry-Go-Round" describes the joy of riding a carousel, while "Circle" explores the shape in everyday objects. Together, they introduce the concept of circular shapes and motion in a playful, engaging way.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 6,
    chapter_title: 'If I Were an Apple / Our Tree', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Use imaginative language and "If I were" expressions',
      'Learn names of fruits and trees',
      'Understand the importance of trees in our lives'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This unit sparks imagination through a poem where the child imagines being an apple, and a story about a tree that is home to many creatures. It teaches children about nature, fruits, and the role trees play in our ecosystem.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 7,
    chapter_title: 'A Kite / Sundari', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Describe the movement of a kite using action words',
      'Read and enjoy a simple story about a cow',
      'Identify action words (verbs) in sentences'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "A Kite" describes the soaring, diving, and dancing of a kite in the sky, introducing action words. The story "Sundari" is about a beautiful cow, teaching children about domestic animals and care.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 8,
    chapter_title: 'A Little Turtle / The Tiger and the Mosquito', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about different animals and their characteristics',
      'Understand that size does not determine strength',
      'Read with expression and understand humour in stories'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem describes a little turtle who lives in a box and snaps at things. The story tells a humorous tale of a mighty tiger bothered by a tiny mosquito, teaching that even small creatures can be powerful.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 9,
    chapter_title: 'Clouds / Anandi\'s Rainbow', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about weather and natural phenomena',
      'Identify the colours of the rainbow',
      'Use descriptive words related to weather'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Clouds" introduces children to different types of clouds and weather, while "Anandi\'s Rainbow" is a delightful story about a girl who sees a rainbow after the rain. Children learn about colours, weather, and the beauty of nature.' }] }
  },
  {
    class_num: 1, subject: 'English', chapter_num: 10,
    chapter_title: 'Flying Man / The Tailor and His Friend', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Explore the concept of flying and imagination',
      'Understand the value of friendship',
      'Retell a story in their own words'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Flying Man" ignites imagination about flight and adventure. "The Tailor and His Friend" is a folk tale about an unlikely friendship between a tailor and an elephant, teaching kindness and loyalty.' }] }
  },

  // =========================================================================
  //  CLASS 1 — Mathematics (Math Magic) — 13 chapters
  // =========================================================================
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 1,
    chapter_title: 'Shapes and Space', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify basic shapes — circle, square, triangle, rectangle',
      'Differentiate between flat and solid shapes',
      'Recognize shapes in daily life objects'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces young learners to the world of shapes. Children identify circles, squares, triangles, and rectangles in everyday objects like wheels, windows, and rooftops. They also explore spatial concepts such as inside, outside, above, and below.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 2,
    chapter_title: 'Numbers from One to Nine', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count objects from 1 to 9',
      'Write numerals 1 through 9',
      'Match number names with numerals'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn to count objects up to 9 using pictures and real-world examples. They practise writing numerals, match numbers to groups of objects, and begin to understand the concept of quantity through hands-on counting activities.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 3,
    chapter_title: 'Addition', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the concept of adding two groups together',
      'Use the plus (+) and equals (=) symbols',
      'Solve simple addition problems within 9'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces addition as combining two groups. Children use pictures, fingers, and objects to add numbers. They learn the symbols + and = and solve story-based addition problems with sums up to 9.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 4,
    chapter_title: 'Subtraction', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand subtraction as taking away from a group',
      'Use the minus (−) symbol correctly',
      'Solve simple subtraction problems within 9'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn subtraction as the process of taking away objects from a group. Using pictures and stories, they understand how many are left after some are removed. They practise using the minus sign and solve problems within 9.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 5,
    chapter_title: 'Numbers from Ten to Twenty', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count and write numbers from 10 to 20',
      'Understand the concept of tens and ones',
      'Compare numbers between 10 and 20'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter extends counting skills from 10 to 20. Children learn that numbers beyond 9 are made of tens and ones. They practise writing these numerals, order them, and compare quantities using more and less.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 6,
    chapter_title: 'Time', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the sequence of daily events',
      'Distinguish between day and night activities',
      'Read a clock to the nearest hour'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn about time through their daily routine — waking up, going to school, eating meals, and sleeping. They sequence events in order and get introduced to the clock, learning to tell time to the hour.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 7,
    chapter_title: 'Measurement', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Compare objects by length — longer, shorter, taller',
      'Measure using non-standard units like handspans',
      'Understand the concept of heavy and light'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces measurement through comparison. Children compare lengths using words like longer, shorter, and taller. They measure objects using handspans, footsteps, and other non-standard units, and explore concepts of heavy and light.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 8,
    chapter_title: 'Numbers from Twenty-One to Fifty', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count and write numbers from 21 to 50',
      'Skip count by 2s and 5s',
      'Arrange numbers in ascending and descending order'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children extend their number knowledge to 50, learning to read and write these numbers. They practise skip counting by 2s and 5s, arrange numbers in order, and identify numbers before, after, and between given numbers.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 9,
    chapter_title: 'Data Handling', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Collect and organize simple data',
      'Represent data using pictures and tally marks',
      'Read simple pictographs'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces data collection in a fun way. Children gather information about favourite fruits, colours, or pets, organise it using tally marks, and read simple pictographs to answer questions about the data.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 10,
    chapter_title: 'Patterns', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify and extend simple patterns',
      'Create patterns using shapes, colours, and numbers',
      'Recognize patterns in the environment'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore repeating patterns using shapes, colours, and objects. They identify the rule in a pattern, extend it, and create their own patterns. This chapter builds foundational skills for algebraic thinking.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 11,
    chapter_title: 'Numbers', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Consolidate understanding of numbers up to 100',
      'Compare and order numbers',
      'Solve simple word problems using numbers'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter consolidates number sense by working with numbers up to 100. Children practise comparing numbers, placing them on a number line, and solving simple word problems that require addition and subtraction.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 12,
    chapter_title: 'Money', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify Indian coins and notes',
      'Understand the value of different denominations',
      'Solve simple problems involving money'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn to identify Indian coins (₹1, ₹2, ₹5, ₹10) and notes. They understand the value of each denomination, make simple purchases in role-play, and solve basic problems involving adding and comparing amounts of money.' }] }
  },
  {
    class_num: 1, subject: 'Mathematics', chapter_num: 13,
    chapter_title: 'How Many', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count large groups of objects accurately',
      'Group objects in tens for easier counting',
      'Estimate quantities before counting'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter reinforces counting skills by asking children to count larger collections of objects. They learn to group objects in tens to count more efficiently and begin to develop estimation skills by guessing before counting.' }] }
  },

  // =========================================================================
  //  CLASS 2 — English (Marigold) — 10 chapters
  // =========================================================================
  {
    class_num: 2, subject: 'English', chapter_num: 1,
    chapter_title: 'First Day at School', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Describe feelings about school experiences',
      'Read a poem with expression and rhythm',
      'Use vocabulary related to school and emotions'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter captures the excitement and nervousness of a child\'s first day at school. Through a poem, children explore emotions, learn school-related vocabulary, and share their own experiences of starting something new.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 2,
    chapter_title: 'Haldi\'s Adventure', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Follow a simple adventure narrative',
      'Learn vocabulary about places and directions',
      'Sequence events in a story'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Haldi goes on an exciting adventure, encountering different places and characters along the way. This story teaches children about directions, places in a neighbourhood, and the courage to explore the world around them.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 3,
    chapter_title: 'I Am Lucky', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Express gratitude for things in their lives',
      'Read and understand a poem about blessings',
      'Write sentences about what makes them feel lucky'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This poem encourages children to appreciate the good things in their lives — family, friends, nature, and health. It builds vocabulary around gratitude and helps children articulate what makes them feel fortunate.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 4,
    chapter_title: 'I Want', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Express wants and wishes using proper sentence structures',
      'Differentiate between needs and wants',
      'Use "I want" and "I wish" in sentences'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter helps children express their desires and wishes. Through a poem and activities, they learn to form sentences using "I want" and begin to understand the difference between things they need and things they desire.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 5,
    chapter_title: 'Funny Bunny', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read a humorous story with enjoyment',
      'Identify funny elements in a story',
      'Retell a story using sequence words'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Funny Bunny is a light-hearted story about a rabbit and its amusing adventures. Children enjoy the humour while learning new words, understanding story structure, and practising retelling skills.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 6,
    chapter_title: 'Mr Nobody', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the concept of taking responsibility',
      'Identify rhyming words in a poem',
      'Relate the poem to personal behaviour'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Mr Nobody" humorously describes a mysterious person who is blamed for all the mischief in the house — broken cups, muddy floors, and squeaking doors. It teaches children about responsibility and accountability.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 7,
    chapter_title: 'Curlylocks and the Three Bears', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Retell a classic fairy tale in sequence',
      'Use comparison words like big, medium, and small',
      'Understand the concept of respecting others\' belongings'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This classic fairy tale retells the story of a girl who enters the house of three bears. Children learn about size comparisons, sequencing, and the moral of respecting others\' property and privacy.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 8,
    chapter_title: 'On My Blackboard I Can Draw', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Use creative and imaginative language',
      'Learn vocabulary related to drawing and art',
      'Describe pictures and scenes using adjectives'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This poem celebrates creativity as a child describes all the wonderful things they can draw on a blackboard — mountains, rivers, the sun, and animals. It encourages imagination and introduces descriptive language.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 9,
    chapter_title: 'The Magic Garden', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Describe a garden using sensory words',
      'Learn names of flowers and plants',
      'Understand the concept of growth and seasons'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This story takes children into a magical garden where flowers talk and trees dance. It introduces vocabulary related to plants and nature, and encourages children to observe and appreciate the natural world around them.' }] }
  },
  {
    class_num: 2, subject: 'English', chapter_num: 10,
    chapter_title: 'The Mumbai Musicians', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about musical instruments and sounds',
      'Understand the value of teamwork and collaboration',
      'Read a story inspired by folk tales'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Inspired by the classic tale of the Bremen Musicians, this story follows a group of animals in Mumbai who come together to form a musical band. It teaches about music, teamwork, and the power of unity.' }] }
  },

  // =========================================================================
  //  CLASS 2 — Mathematics (Math Magic) — 15 chapters
  // =========================================================================
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 1,
    chapter_title: 'What Is Long, What Is Round', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Classify objects as long, round, flat, or curved',
      'Identify 3D shapes in everyday objects',
      'Describe objects using shape-related vocabulary'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore shapes by classifying objects as long, round, flat, or curved. They observe cylinders (rolling pins), spheres (balls), and cuboids (bricks), building foundational understanding of 3D geometry through tactile activities.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 2,
    chapter_title: 'Counting in Groups', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count objects by grouping them in 2s, 5s, and 10s',
      'Understand the advantage of grouping for counting',
      'Skip count forwards and backwards'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter teaches children to count more efficiently by grouping objects. They learn to skip count by 2s, 5s, and 10s, understanding that grouping makes counting large collections faster and more accurate.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 3,
    chapter_title: 'How Much Can You Carry', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Compare weights of objects using heavy and light',
      'Estimate weights of everyday items',
      'Understand simple balance and weighing concepts'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore weight by comparing objects as heavy or light. They estimate which objects they can carry, use a simple balance to compare weights, and develop an intuitive understanding of measurement concepts.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 4,
    chapter_title: 'Counting in Tens', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count objects by grouping them in tens',
      'Read and write two-digit numbers using tens and ones',
      'Represent numbers on an abacus'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter focuses on the base-ten number system. Children group objects into tens and ones, learn place value for two-digit numbers, and practise representing numbers using bundles, an abacus, and written notation.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 5,
    chapter_title: 'Patterns', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify and extend repeating and growing patterns',
      'Create patterns using shapes, numbers, and colours',
      'Find patterns in nature and surroundings'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore more complex patterns using shapes, numbers, and colours. They identify the rule governing a pattern, extend incomplete patterns, create their own, and discover patterns in nature like petals and honeycombs.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 6,
    chapter_title: 'Footprints', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Measure length using non-standard units like footsteps',
      'Compare distances using footprints',
      'Understand that different units give different measurements'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Using footprints as a measuring tool, children learn about length and distance. They measure classroom objects and distances using their own feet, discovering that different-sized feet give different answers, laying the groundwork for standard units.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 7,
    chapter_title: 'Jugs and Mugs', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand capacity and volume concepts',
      'Compare containers using more, less, and equal',
      'Measure liquids using non-standard units'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the concept of capacity by comparing how much different containers can hold. They pour water between jugs and mugs, estimate and compare volumes, and begin to understand measurement of liquids.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 8,
    chapter_title: 'Tens and Ones', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Decompose two-digit numbers into tens and ones',
      'Add and subtract two-digit numbers',
      'Use place value to compare numbers'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter deepens understanding of place value. Children break numbers into tens and ones, use this understanding to add and subtract two-digit numbers, and compare numbers using their knowledge of place value.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 9,
    chapter_title: 'My Funday', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read and interpret a calendar',
      'Identify days of the week and months',
      'Solve problems related to dates and durations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through a fun narrative about planning a holiday, children learn to read a calendar, identify days and months, and calculate simple durations. They connect mathematical thinking to planning everyday activities.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 10,
    chapter_title: 'Add Our Points', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Add two-digit numbers with and without carrying',
      'Solve addition word problems',
      'Check addition using estimation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Using a game-based context, children practise adding two-digit numbers. They learn to add with and without regrouping (carrying), solve contextual word problems, and verify their answers through estimation.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 11,
    chapter_title: 'Lines and Lines', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify straight and curved lines',
      'Recognise horizontal, vertical, and slanting lines',
      'Create designs using different types of lines'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore different types of lines — straight, curved, horizontal, vertical, and slanting. They identify these lines in their environment and create artistic designs, building foundational geometry concepts.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 12,
    chapter_title: 'Give and Take', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand subtraction as the inverse of addition',
      'Subtract two-digit numbers with and without borrowing',
      'Solve subtraction word problems'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter teaches subtraction of two-digit numbers through contextual problems. Children learn to subtract with and without regrouping (borrowing) and understand the relationship between addition and subtraction.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 13,
    chapter_title: 'The Longest Step', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Compare and measure lengths using standard units',
      'Understand centimetres and metres',
      'Estimate and measure objects using a ruler'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children transition from non-standard to standard measurement units. They learn about centimetres and metres, use a ruler to measure objects, and compare lengths. Activities include measuring steps and classroom objects.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 14,
    chapter_title: 'Birds Come, Birds Go', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Collect and organise data about observations',
      'Read and create simple bar graphs and pictographs',
      'Answer questions based on data'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through observing birds, children learn to collect and organise data. They create pictographs and simple bar graphs, then answer questions about their data. This chapter connects mathematics to nature observation.' }] }
  },
  {
    class_num: 2, subject: 'Mathematics', chapter_num: 15,
    chapter_title: 'How Many Ponytails', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Conduct a simple survey and collect data',
      'Organise data in tables and charts',
      'Interpret data to draw conclusions'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children conduct a fun classroom survey about hairstyles, organise their findings in tables and charts, and draw conclusions. This chapter reinforces data handling skills through an engaging, relatable activity.' }] }
  },

  // =========================================================================
  //  CLASS 3 — English (Marigold) — 10 chapters
  // =========================================================================
  {
    class_num: 3, subject: 'English', chapter_num: 1,
    chapter_title: 'Good Morning / The Magic Garden', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Greet others appropriately at different times of day',
      'Read a poem with expression and identify rhyming words',
      'Understand the concept of a magical garden'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This unit pairs a cheerful morning poem about greeting the new day with a story about a magical garden. Children learn greetings, time-related vocabulary, and enjoy a narrative that celebrates nature and imagination.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 2,
    chapter_title: 'Bird Talk / Nina and the Baby Sparrows', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about different birds and their sounds',
      'Understand empathy and caring for animals',
      'Use dialogue in storytelling'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Bird Talk" imagines conversations between birds, while the story follows Nina who discovers and cares for baby sparrows. Together, they teach children about bird life, empathy, and responsibility towards animals.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 3,
    chapter_title: 'Little by Little / The Enormous Turnip', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the concept of growth and patience',
      'Learn the value of teamwork and perseverance',
      'Sequence events in a cumulative story'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem describes how an acorn grows into a mighty oak tree little by little. The story of the enormous turnip shows how a family and their animals work together to pull out a giant turnip, teaching patience and cooperation.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 4,
    chapter_title: 'Sea Song / A Little Fish Story', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn vocabulary related to the sea and marine life',
      'Understand the concept of freedom and exploration',
      'Read and enjoy a narrative about underwater life'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Sea Song" paints a vivid picture of the ocean with its waves, shells, and creatures. "A Little Fish Story" follows a small fish who explores the vast sea, learning lessons about curiosity and the wonders of the underwater world.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 5,
    chapter_title: 'The Balloon Man / Running', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Describe people by their occupation and appearance',
      'Use action words related to movement',
      'Understand the joy of simple pleasures'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem describes a cheerful balloon man who brings joy with his colourful balloons. "Running" is a poem about the exhilaration of running freely. Together, they celebrate movement, colour, and the simple joys of childhood.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 6,
    chapter_title: 'Trains / The Story of the Road', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about different modes of transport',
      'Understand how roads and railways connect places',
      'Use descriptive words for speed and movement'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Trains" captures the excitement of train travel — the rhythm, speed, and landscapes seen from the window. "The Story of the Road" traces how a small path becomes a big road, teaching about infrastructure and connectivity.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 7,
    chapter_title: 'Puppy and I / Little Tiger, Big Tiger', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about pets and wild animals',
      'Understand parent-child relationships in the animal world',
      'Compare domestic and wild animals'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Puppy and I" is about a child\'s friendship with a puppy, while "Little Tiger, Big Tiger" explores the relationship between a tiger cub and its parent. Children learn about animal behaviour, parenting, and the differences between pets and wild animals.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 8,
    chapter_title: 'What\'s in the Mailbox / My Silly Sister', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand how letters and mail work',
      'Learn about family relationships and humour',
      'Write a simple letter to a friend'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem builds excitement about receiving mail, while "My Silly Sister" is a humorous story about funny things a younger sibling does. This unit introduces letter writing and celebrates family bonds with warmth and humour.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 9,
    chapter_title: 'Don\'t Tell / He Is My Brother', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the value of keeping secrets and trust',
      'Learn about sibling relationships and responsibility',
      'Read with emotional expression'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Don\'t Tell" playfully explores childhood secrets, while "He Is My Brother" tells a heartwarming story about sibling love and sacrifice. The unit teaches about trust, family bonds, and caring for others.' }] }
  },
  {
    class_num: 3, subject: 'English', chapter_num: 10,
    chapter_title: 'How Creatures Move / The Ship of the Desert', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Describe how different animals move',
      'Learn about camels and desert life',
      'Use action verbs for different types of movement'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem describes various ways creatures move — fish swim, birds fly, snakes slither. "The Ship of the Desert" is about the camel and how it is uniquely adapted to desert life. Children learn about animal adaptations and diverse habitats.' }] }
  },

  // =========================================================================
  //  CLASS 3 — Mathematics (Math Magic) — 14 chapters
  // =========================================================================
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 1,
    chapter_title: 'Where to Look From', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand different views of objects — top, side, front',
      'Draw objects as seen from different angles',
      'Develop spatial reasoning and visualization'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter develops spatial thinking by asking children to observe objects from different viewpoints. A glass looks like a circle from the top but a rectangle from the side. Children draw and identify objects from multiple perspectives.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 2,
    chapter_title: 'Fun with Numbers', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read, write, and compare numbers up to 1000',
      'Understand place value of hundreds, tens, and ones',
      'Form the greatest and smallest numbers from given digits'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children work with numbers up to 1000, learning to read, write, and compare them using place value. They form the greatest and smallest numbers from given digits and solve puzzles involving number sense.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 3,
    chapter_title: 'Give and Take', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Add and subtract three-digit numbers',
      'Solve real-life problems involving addition and subtraction',
      'Verify answers using inverse operations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter practises addition and subtraction of three-digit numbers with and without regrouping. Children solve shopping, distance, and everyday problems, learning to check their work by using the inverse operation.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 4,
    chapter_title: 'Long and Short', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Measure length in centimetres and metres',
      'Convert between metres and centimetres',
      'Estimate and verify measurements'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn standard units of length — centimetres and metres. They measure objects using rulers and metre tapes, estimate lengths before measuring, and convert between units. Real-world contexts make measurement meaningful.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 5,
    chapter_title: 'Shapes and Designs', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify and draw basic 2D shapes',
      'Understand symmetry in shapes and designs',
      'Create tessellation patterns using shapes'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores 2D shapes — their properties, symmetry, and how they combine to create designs. Children identify shapes in rangoli, tile patterns, and nature, and create their own tessellation designs.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 6,
    chapter_title: 'Fun with Give and Take', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Solve multi-step word problems using addition and subtraction',
      'Apply mental math strategies',
      'Choose the correct operation for a given problem'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Building on earlier skills, this chapter presents more complex problems requiring both addition and subtraction. Children develop mental math strategies, learn to choose the right operation, and solve multi-step word problems.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 7,
    chapter_title: 'Time Goes On', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read time on a clock to the nearest 5 minutes',
      'Understand AM, PM, and the 12-hour clock',
      'Calculate simple durations of time'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn to read analog clocks to the nearest 5 minutes and understand AM and PM. They calculate how long activities take, sequence daily events by time, and solve problems involving elapsed time.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 8,
    chapter_title: 'Who Is Heavier', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Compare and measure weights using standard units',
      'Understand grams and kilograms',
      'Solve real-life problems involving weight'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces standard units of weight — grams and kilograms. Children weigh objects, compare weights, and solve problems about shopping, cooking, and postal weights, connecting math to everyday experiences.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 9,
    chapter_title: 'How Many Times', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand multiplication as repeated addition',
      'Learn multiplication tables from 2 to 5',
      'Solve word problems involving multiplication'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Multiplication is introduced as repeated addition. If there are 3 groups of 4 apples, that is 4 + 4 + 4 = 12, or 3 × 4 = 12. Children build multiplication tables and solve contextual problems using this concept.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 10,
    chapter_title: 'Play with Patterns', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify patterns in numbers, shapes, and tiles',
      'Extend and create growing patterns',
      'Use patterns to predict what comes next'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore more complex patterns including number sequences, shape rotations, and tiling patterns. They learn to identify the rule, extend the pattern, and predict future terms, building algebraic thinking.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 11,
    chapter_title: 'Jugs and Mugs', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Measure capacity in litres and millilitres',
      'Compare the capacity of different containers',
      'Solve problems involving volume and capacity'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces standard units of capacity — litres and millilitres. Children measure and compare how much different containers hold, estimate capacities, and solve practical problems about liquids in cooking and daily life.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 12,
    chapter_title: 'Can We Share', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand division as equal sharing and grouping',
      'Solve simple division problems',
      'Relate division to multiplication'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Division is introduced as equal sharing. If 12 sweets are shared among 3 friends, each gets 4. Children also learn division as grouping and begin to see the relationship between multiplication and division.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 13,
    chapter_title: 'Smart Charts', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Collect, organise, and represent data in charts',
      'Read and interpret bar graphs and pictographs',
      'Draw conclusions from data representations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn to collect data through surveys and observations, organise it in tally charts and tables, and represent it using pictographs and bar graphs. They practise reading charts and drawing conclusions from data.' }] }
  },
  {
    class_num: 3, subject: 'Mathematics', chapter_num: 14,
    chapter_title: 'Rupees and Paise', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the relationship between rupees and paise',
      'Add and subtract amounts of money',
      'Make change and solve shopping problems'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter teaches children about Indian currency. They learn that 1 rupee = 100 paise, practise adding and subtracting money amounts, and solve shopping problems including making change and calculating totals.' }] }
  },

  // =========================================================================
  //  CLASS 3 — EVS (Looking Around) — 24 chapters
  // =========================================================================
  {
    class_num: 3, subject: 'EVS', chapter_num: 1,
    chapter_title: 'Poonam\'s Day Out', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Observe and describe different animals and their features',
      'Classify animals based on body coverings and movement',
      'Appreciate the diversity of animal life'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Poonam visits a park and observes many animals — birds, insects, and squirrels. Through her observations, children learn to notice and describe animal features like feathers, fur, wings, and legs, and how different animals move.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 2,
    chapter_title: 'The Plant Fairy', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify different parts of a plant',
      'Understand the importance of plants in our lives',
      'Describe how plants grow from seeds'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'A fairy introduces children to the wonderful world of plants. They learn about roots, stems, leaves, flowers, and fruits, and discover how seeds grow into plants. The chapter emphasises why plants are essential for life.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 3,
    chapter_title: 'Water O Water', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the importance of water for living things',
      'Identify sources of water',
      'Learn about water conservation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores water — where it comes from, why we need it, and how we use it daily. Children learn about rivers, wells, rain, and taps as sources, and understand why saving water is important for everyone.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 4,
    chapter_title: 'Our First School', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the family as the first place of learning',
      'Appreciate the role of family members in education',
      'Share and compare family experiences'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter helps children appreciate their family as their first school. They learn how grandparents, parents, and siblings teach them values, skills, and traditions long before formal schooling begins.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 5,
    chapter_title: 'Chhotu\'s House', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Describe different types of houses',
      'Understand why houses are built differently in different places',
      'Identify materials used in building houses'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through Chhotu\'s story, children learn about the variety of houses people live in — kutcha, pucca, flats, houseboats, and igloos. They understand how climate, geography, and available materials influence the type of houses built.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 6,
    chapter_title: 'Foods We Eat', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify different types of food and their sources',
      'Understand the concept of a balanced meal',
      'Learn about food habits across India'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the variety of foods eaten across India — from rice and sambar to roti and dal. They classify foods by source (plant or animal) and learn why eating a mix of different foods keeps us healthy.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 7,
    chapter_title: 'Saying Without Speaking', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand non-verbal communication — gestures, expressions, signs',
      'Recognise common signs and symbols',
      'Appreciate how animals communicate without words'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores communication without words. Children learn about body language, facial expressions, hand gestures, and symbols like traffic signs. They also discover how animals communicate through sounds, colours, and movements.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 8,
    chapter_title: 'Flying High', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Observe and describe different birds',
      'Understand bird features that help them fly',
      'Learn about nests and bird habitats'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn about the fascinating world of birds — their feathers, beaks, claws, and nesting habits. They observe local birds, learn which ones can fly and which cannot, and discover how birds are adapted to different environments.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 9,
    chapter_title: 'It\'s Raining', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the rain cycle in simple terms',
      'Describe changes that rain brings to the environment',
      'Learn how rain affects daily life and agriculture'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores rain — where it comes from, what happens when it rains, and how it changes the world around us. Children learn about puddles, mud, rainbows, and the importance of rain for farmers and plants.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 10,
    chapter_title: 'What Is Cooking', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about different methods of cooking',
      'Understand why we cook food',
      'Identify kitchen utensils and fuels used for cooking'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the kitchen as a learning space. They discover how food is prepared — boiling, frying, roasting, and steaming. They learn about different fuels like gas, wood, and electricity, and understand why cooking makes food safe and tasty.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 11,
    chapter_title: 'From Here to There', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify different modes of transport',
      'Classify transport as land, water, or air',
      'Understand how transport has changed over time'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter traces the evolution of transport from bullock carts to aeroplanes. Children identify different vehicles, classify them by type, and understand how transport connects people and places across distances.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 12,
    chapter_title: 'Work We Do', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify different occupations and their contributions',
      'Appreciate the dignity of all types of work',
      'Understand the tools used in various professions'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn about various occupations — farmers, doctors, teachers, potters, and more. They understand that every job is important, learn about the tools professionals use, and appreciate the contributions of workers to society.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 13,
    chapter_title: 'Sharing Our Feelings', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify and name different emotions',
      'Understand that sharing feelings is healthy',
      'Develop empathy by understanding others\' feelings'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter helps children recognise and express emotions like happiness, sadness, anger, and fear. They learn that talking about feelings is important, and they develop empathy by understanding what others might feel in different situations.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 14,
    chapter_title: 'The Story of Food', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Trace the journey of food from farm to plate',
      'Understand the effort involved in food production',
      'Learn about food storage and preservation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children follow the journey of food from the farm where it is grown, to the market where it is sold, to the kitchen where it is cooked. They appreciate the hard work of farmers and understand basic food preservation methods.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 15,
    chapter_title: 'Making Pots', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about pottery as a traditional craft',
      'Understand the process of making pots from clay',
      'Appreciate the work of artisans and craftspeople'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces pottery — an ancient craft. Children learn how potters dig clay, shape it on a wheel, dry it, and fire it in a kiln. They appreciate the skill and patience required and the beauty of handmade objects.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 16,
    chapter_title: 'Games We Play', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify traditional and modern games',
      'Understand the importance of play and exercise',
      'Learn about games played in different parts of India'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the world of games — from kho-kho and kabaddi to cricket and chess. They learn about traditional Indian games, the importance of physical activity, and how games teach teamwork and fair play.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 17,
    chapter_title: 'Here Comes a Letter', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand how the postal system works',
      'Learn about different ways to communicate',
      'Write a simple letter with address and greeting'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explains how letters travel from sender to receiver through the postal system. Children learn about post offices, postmen, stamps, and addresses. They also compare postal mail with modern communication methods.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 18,
    chapter_title: 'A House Like This', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Compare houses in different regions of India',
      'Understand how climate affects house design',
      'Describe the features of their own home'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the diversity of Indian homes — stilt houses in Assam, houseboats in Kashmir, mud houses in Rajasthan, and flats in cities. They understand how geography, climate, and culture shape the homes people build.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 19,
    chapter_title: 'Our Friends — Animals', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify domestic and wild animals',
      'Understand how animals help humans',
      'Learn about responsible pet care'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter celebrates the bond between humans and animals. Children learn about pets, farm animals, and working animals like guide dogs and police horses. They discuss responsible care and kindness towards animals.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 20,
    chapter_title: 'Drop by Drop', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the importance of water conservation',
      'Identify ways water is wasted in daily life',
      'Learn simple methods to save water'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Water is precious and this chapter teaches children why every drop counts. They identify ways water is wasted — leaking taps, overflowing tanks — and learn practical conservation methods like rainwater harvesting and reusing water.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 21,
    chapter_title: 'Families Can Be Different', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Recognise that families come in different structures',
      'Understand the roles of different family members',
      'Appreciate and respect diverse family types'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn that families come in many forms — nuclear, joint, single-parent, and extended families. They understand that despite differences in structure, all families share love and support. The chapter promotes respect for diversity.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 22,
    chapter_title: 'Left-Right', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify left and right directions',
      'Follow and give simple directions',
      'Read a simple map using directions'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter helps children learn directions — left, right, forward, and backward. They practise following directions, guiding a friend through an obstacle course, and reading simple maps to find locations.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 23,
    chapter_title: 'A Beautiful Cloth', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about different fabrics and their sources',
      'Understand the weaving and dyeing process',
      'Appreciate traditional textile crafts of India'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the world of textiles — from cotton and silk to wool and jute. They learn about spinning, weaving, and dyeing processes, and discover the rich tradition of Indian textiles like Banarasi silk and Pochampalli ikkat.' }] }
  },
  {
    class_num: 3, subject: 'EVS', chapter_num: 24,
    chapter_title: 'Web of Life', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand that all living things are interconnected',
      'Learn about simple food chains',
      'Appreciate the importance of protecting the environment'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces the concept of interconnectedness in nature. Plants make food from sunlight, animals eat plants, and other animals eat those animals. Children learn that harming one part of nature affects everything else, building environmental awareness.' }] }
  },

  // =========================================================================
  //  CLASS 4 — English (Marigold) — 10 chapters
  // =========================================================================
  // NOTE: Chapter 1 has full content from the original file
  {
    class_num: 4, subject: 'English', chapter_num: 1,
    chapter_title: 'Wake Up / Neha\'s Alarm Clock', language: 'english',
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
  },
  {
    class_num: 4, subject: 'English', chapter_num: 2,
    chapter_title: 'Noses / The Little Fir Tree', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Appreciate the uniqueness of every individual',
      'Understand the moral of being content with what you have',
      'Learn vocabulary related to nature and trees'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Noses" humorously describes noses of different shapes and sizes, celebrating uniqueness. "The Little Fir Tree" tells the story of a small tree that is unhappy with its needles and wishes for different kinds of leaves, learning that what it already has is best.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 3,
    chapter_title: 'Run / Nasruddin\'s Aim', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Enjoy a humorous folk tale about Nasruddin',
      'Understand the use of irony and humour in stories',
      'Use action words and movement vocabulary'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Run" celebrates the freedom and joy of running outdoors. "Nasruddin\'s Aim" is a classic Mulla Nasruddin tale about archery that ends with a clever twist, teaching children to enjoy humour and think creatively.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 4,
    chapter_title: 'Why / Alice in Wonderland', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Encourage curiosity and asking questions',
      'Follow a fantasy narrative with imaginative elements',
      'Learn vocabulary from classic English literature'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Why" celebrates a child\'s endless curiosity about the world. The excerpt from "Alice in Wonderland" takes children on a fantastical journey with Alice, introducing them to classic literature and the power of imagination.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 5,
    chapter_title: 'Don\'t Be Afraid of the Dark / Helen Keller', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Overcome common childhood fears',
      'Learn about Helen Keller and her determination',
      'Understand the concept of courage and resilience'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem encourages children not to fear the dark. The story of Helen Keller — who was blind and deaf but became a famous author and activist — inspires children with her extraordinary courage, perseverance, and love of learning.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 6,
    chapter_title: 'I Had a Little Pony / The Milkman\'s Cow', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read and enjoy a nursery rhyme',
      'Understand the theme of sharing and generosity',
      'Learn about domestic animals and their uses'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The nursery rhyme about a little pony is fun and rhythmic. "The Milkman\'s Cow" is a humorous story about a clever cow and her milkman owner, teaching about dairy farming, animal care, and the humour in everyday situations.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 7,
    chapter_title: 'Hiawatha / The Scholar\'s Mother Tongue', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Appreciate poetry from different cultures',
      'Understand the importance of one\'s mother tongue',
      'Learn about the life of Native American Hiawatha'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem about Hiawatha describes the childhood of the Native American hero and his love for nature. "The Scholar\'s Mother Tongue" tells how Akbar and Birbal tested scholars who claimed to know many languages, showing that one\'s mother tongue always reveals itself.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 8,
    chapter_title: 'A Watering Rhyme / The Giving Tree', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about plant care and gardening',
      'Understand the concept of selfless giving',
      'Appreciate the relationship between humans and trees'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem teaches children when and how to water plants. "The Giving Tree" is a touching story about a tree that gives everything — its fruit, branches, and trunk — to a boy it loves. It teaches about generosity, love, and our dependence on nature.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 9,
    chapter_title: 'Books / Going to Buy a Book', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Develop love for reading and books',
      'Learn about different types of books — fiction, non-fiction, comics',
      'Understand the value of bookshops and libraries'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem celebrates the joy of reading books and the worlds they open up. The story follows a child\'s exciting trip to a bookshop, discovering different genres and choosing a special book. It nurtures a love for reading and learning.' }] }
  },
  {
    class_num: 4, subject: 'English', chapter_num: 10,
    chapter_title: 'The Naughty Boy / Pinocchio', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the consequences of mischief and lying',
      'Follow a classic literature narrative',
      'Learn the moral of being honest and responsible'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem by John Keats tells of a naughty boy who runs away from home. The excerpt from "Pinocchio" follows the wooden puppet who dreams of becoming a real boy, teaching that honesty, obedience, and hard work bring rewards.' }] }
  },

  // =========================================================================
  //  CLASS 4 — Mathematics (Math Magic) — 14 chapters
  // =========================================================================
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 1,
    chapter_title: 'Building with Bricks', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand patterns in brick arrangements',
      'Count objects in rows and columns',
      'Calculate area using unit squares',
      'Identify symmetry in patterns'
    ],
    content_json: { sections: [
      { heading: 'Brick Patterns', type: 'text',
        content: 'Look at the walls around you. Bricks are arranged in patterns. Some walls have bricks placed lengthwise, others have them placed sideways. These different arrangements create different patterns and give walls different strengths.' },
      { heading: 'Counting in Rows', type: 'text',
        content: 'If a wall has 5 bricks in each row and 4 rows, the total number of bricks is 5 times 4 which equals 20. This is the same as finding the area of a rectangle.' },
      { heading: 'Making Patterns', type: 'text',
        content: 'Using square blocks or paper squares, create your own patterns. Try making patterns that look the same on both sides. This is called symmetry.' }
    ]}
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 2,
    chapter_title: 'Long and Short', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Measure lengths using metres and centimetres',
      'Convert between metres and centimetres',
      'Estimate lengths before measuring',
      'Solve word problems involving length'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter deepens children\'s understanding of length measurement. They measure objects in metres and centimetres, convert between units, estimate before measuring, and solve real-world problems involving distances and heights.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 3,
    chapter_title: 'A Trip to Bhopal', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read and use a railway timetable',
      'Calculate travel time and fare',
      'Solve multi-step word problems involving money and time',
      'Work with four-digit numbers'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through a family trip to Bhopal, children learn to read railway timetables, calculate travel times, manage budgets, and work with large numbers. This chapter connects mathematics to real-life travel planning.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 4,
    chapter_title: 'Tick Tick Tick', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read time on a clock to the nearest minute',
      'Calculate elapsed time between events',
      'Understand the 12-hour and 24-hour clock systems',
      'Solve problems involving duration'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children master telling time to the minute, learn about 24-hour clocks, and calculate how long events take. They solve scheduling problems and understand concepts of duration, helping them manage their daily routine.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 5,
    chapter_title: 'The Way the World Looks', language: 'english',
    word_count: 500,
    learning_objectives: [
      'View objects and scenes from different perspectives',
      'Draw top view, front view, and side view of objects',
      'Understand how viewpoint changes what we see',
      'Develop spatial visualization skills'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter develops spatial thinking by exploring how objects look from different positions — above, below, left, right, front, and back. Children draw views from multiple perspectives and learn that our position changes what we see.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 6,
    chapter_title: 'The Junk Seller', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Add and subtract large numbers',
      'Solve problems involving money and trade',
      'Understand profit and loss in simple terms',
      'Work with four and five-digit numbers'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through the context of a junk seller buying and selling recyclable materials, children practise addition and subtraction of large numbers. They calculate costs, earnings, and simple profit, connecting arithmetic to real-world commerce.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 7,
    chapter_title: 'Jugs and Mugs', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Measure capacity in litres and millilitres',
      'Convert between litres and millilitres',
      'Estimate and compare capacities',
      'Solve problems involving volume'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children deepen their understanding of capacity by measuring in litres and millilitres. They convert between units, estimate how much containers hold, and solve practical problems involving recipes, water tanks, and beverages.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 8,
    chapter_title: 'Carts and Wheels', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand circles and their properties',
      'Identify centre, radius, and diameter of a circle',
      'Draw circles using different methods',
      'Recognise circular shapes in everyday life'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Using wheels and carts as context, children explore circles. They learn about centre, radius, and diameter, draw circles using compasses and other methods, and discover circular shapes in nature and human-made objects.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 9,
    chapter_title: 'Halves and Quarters', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand fractions as equal parts of a whole',
      'Identify and represent halves and quarters',
      'Compare simple fractions',
      'Solve problems involving fractions in daily life'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces fractions through sharing — cutting a pizza in half, dividing a chocolate into quarters. Children learn that fractions represent equal parts of a whole and practise identifying, drawing, and comparing simple fractions.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 10,
    chapter_title: 'Play with Patterns', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify and extend number and shape patterns',
      'Create growing patterns and tiling designs',
      'Use pattern rules to predict terms',
      'Connect patterns to multiplication tables'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore complex patterns — number sequences, tessellations, and magic squares. They discover patterns in multiplication tables, create their own tiling designs, and use rules to predict future terms in a sequence.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 11,
    chapter_title: 'Tables and Shares', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Memorise multiplication tables up to 10',
      'Understand division as equal sharing',
      'Solve multiplication and division word problems',
      'Connect multiplication and division as inverse operations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter strengthens multiplication and division skills. Children memorise tables, divide objects into equal groups, and solve contextual problems. They discover that multiplication and division are inverse operations.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 12,
    chapter_title: 'How Heavy, How Light', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Measure weight in grams and kilograms',
      'Convert between grams and kilograms',
      'Estimate and compare weights of objects',
      'Solve shopping and recipe problems involving weight'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children work with standard units of weight — grams and kilograms. They weigh objects, convert between units, estimate before measuring, and solve real-world problems involving shopping lists, recipes, and postal weights.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 13,
    chapter_title: 'Fields and Fences', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the concept of perimeter',
      'Calculate perimeter of simple shapes',
      'Differentiate between area and perimeter',
      'Solve fencing and boundary problems'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces perimeter through the context of fields and fences. Children learn that perimeter is the total distance around a shape, calculate perimeters of rectangles and irregular shapes, and solve fencing problems.' }] }
  },
  {
    class_num: 4, subject: 'Mathematics', chapter_num: 14,
    chapter_title: 'Smart Charts', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Collect and organize data from surveys',
      'Create bar graphs and pictographs with scales',
      'Read and interpret data from charts and graphs',
      'Draw conclusions and make predictions from data'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children advance their data handling skills by working with larger datasets. They conduct surveys, create bar graphs with scales, read data from complex charts, and draw conclusions. This chapter builds critical thinking through data analysis.' }] }
  },

  // =========================================================================
  //  CLASS 4 — EVS (Looking Around) — 27 chapters
  // =========================================================================
  {
    class_num: 4, subject: 'EVS', chapter_num: 1,
    chapter_title: 'Going to School', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about different ways children travel to school across India',
      'Understand challenges faced by children in remote areas',
      'Appreciate the value of education'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores the diverse ways children across India reach school — by walking, cycling, boats, cable cars, and buses. It highlights the determination of children in hilly and remote areas who face tough journeys to get an education.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 2,
    chapter_title: 'Ear to Ear', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the importance of hearing and ears',
      'Learn about different sounds in our environment',
      'Appreciate how animals use their ears differently'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the sense of hearing — how ears work, the variety of sounds in our environment, and how different animals like rabbits, elephants, and owls have ears adapted to their needs. They learn to protect their hearing.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 3,
    chapter_title: 'A Day with Nandu', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about elephants and their behaviour',
      'Understand the social structure of elephant herds',
      'Appreciate wildlife and the need for conservation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Nandu is a baby elephant, and this chapter follows a day in his life. Children learn about elephant herds, how mothers care for calves, what elephants eat, and their intelligence. It builds awareness about wildlife conservation.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 4,
    chapter_title: 'The Story of Amrita', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn the story of Amrita Devi and the Bishnoi community',
      'Understand the importance of protecting trees',
      'Appreciate environmental activism and sacrifice'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter tells the inspiring story of Amrita Devi Bishnoi who sacrificed her life to protect khejri trees in Rajasthan. It teaches children about the Bishnoi community\'s love for nature and the Chipko movement inspired by their sacrifice.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 5,
    chapter_title: 'Anita and the Honeybees', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about honeybees and how they make honey',
      'Understand the structure of a beehive',
      'Appreciate the role of bees in pollination'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Anita discovers a beehive and learns how bees live, work together, make honey, and communicate through dance. The chapter explains the social structure of a hive and why bees are essential for pollination and food production.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 6,
    chapter_title: 'Omana\'s Journey', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about the geography of Kerala — backwaters, hills, and coast',
      'Understand different modes of water transport',
      'Appreciate India\'s geographical diversity'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Omana travels through Kerala, experiencing backwaters, houseboats, coconut groves, and spice gardens. Through her journey, children learn about Kerala\'s unique geography, water transport, and the diversity of Indian landscapes.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 7,
    chapter_title: 'From the Window', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Observe and describe scenes from a train window',
      'Identify different landscapes — plains, plateaus, and hills',
      'Understand how geography changes as we travel'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'A child watches the changing landscape from a train window — fields, rivers, tunnels, bridges, cities, and villages. This chapter teaches observation skills and introduces India\'s varied geography through an engaging travel narrative.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 8,
    chapter_title: 'Reaching Grandmother\'s House', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read and follow directions on a simple map',
      'Understand the concept of routes and distances',
      'Learn about landmarks used for navigation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'A child describes the journey to grandmother\'s house using landmarks, turns, and distances. Children learn to read simple maps, follow directions, and understand how landmarks help us navigate from one place to another.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 9,
    chapter_title: 'Changing Families', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand how families grow and change over time',
      'Learn about family trees and generations',
      'Appreciate the continuity of family traditions'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores how families change over generations — through marriages, births, and migration. Children learn to draw family trees, understand relationships across generations, and see how traditions pass from one generation to the next.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 10,
    chapter_title: 'Hu Tu Tu Hu Tu Tu', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about traditional Indian games and sports',
      'Understand the rules and skills involved in kabaddi',
      'Appreciate the cultural significance of indigenous games'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Named after the chant in kabaddi, this chapter celebrates traditional Indian sports. Children learn about kabaddi, gilli-danda, pitthu, and other games, understanding their rules, the physical skills they develop, and their cultural roots.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 11,
    chapter_title: 'The Valley of Flowers', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about the Valley of Flowers in Uttarakhand',
      'Understand biodiversity and endemic species',
      'Appreciate the need to protect natural habitats'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter takes children on a virtual trip to the Valley of Flowers National Park in Uttarakhand. They discover the stunning variety of wildflowers, rare plants, and animals that live in this UNESCO World Heritage Site.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 12,
    chapter_title: 'Changing Times', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Compare life in the past and present',
      'Understand how technology has changed daily life',
      'Appreciate both traditional and modern ways of living'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children compare how life has changed over time — from oil lamps to LED lights, bullock carts to cars, and letters to emails. They understand that while technology makes life easier, traditional knowledge and practices remain valuable.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 13,
    chapter_title: 'A River\'s Tale', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Trace the journey of a river from source to sea',
      'Understand how rivers are polluted',
      'Learn about the importance of keeping rivers clean'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'A river tells its own story — starting as a clean mountain stream, flowing through villages and cities, and becoming polluted with sewage and factory waste. This chapter teaches about river ecosystems and the urgency of preventing water pollution.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 14,
    chapter_title: 'Basva\'s Farm', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about farming practices in India',
      'Understand the life of a farmer',
      'Appreciate where our food comes from'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Basva is a farmer who grows different crops through the year. Children learn about ploughing, sowing, irrigation, and harvesting. They understand the challenges farmers face and appreciate the hard work behind the food on their plates.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 15,
    chapter_title: 'From Market to Home', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the supply chain from producer to consumer',
      'Learn about different types of markets',
      'Appreciate the roles of traders, farmers, and transporters'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter traces how goods travel from producers to consumers — vegetables from farms to mandis to local shops to homes. Children understand the roles of farmers, wholesalers, retailers, and transporters in the supply chain.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 16,
    chapter_title: 'A Busy Month', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about seasons and their effect on daily life',
      'Understand how festivals are connected to seasons',
      'Keep a weather diary and observe seasonal changes'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through the narrative of a busy month filled with festivals, exams, and weather changes, children learn about seasons, their impact on daily life, agriculture, and celebrations. They observe and record weather patterns.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 17,
    chapter_title: 'Nandita in Mumbai', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about city life and urban infrastructure',
      'Compare rural and urban living',
      'Understand the challenges of living in a big city'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Nandita moves to Mumbai from a village and experiences the contrasts — tall buildings, crowded trains, busy roads, but also parks and the sea. Children compare city and village life, understanding the advantages and challenges of each.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 18,
    chapter_title: 'Too Much Water, Too Little Water', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand floods and droughts as natural disasters',
      'Learn about water management and conservation',
      'Appreciate the uneven distribution of water resources'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter contrasts floods and droughts — too much water in some places and too little in others. Children learn about the causes and effects of both, and understand why water management, dams, and conservation are essential.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 19,
    chapter_title: 'Abdul in the Garden', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about different types of plants in a garden',
      'Understand how plants grow and what they need',
      'Develop interest in gardening as a hobby'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Abdul takes care of a beautiful garden with flowers, vegetables, and fruit trees. Through his work, children learn about soil, sunlight, water needs, composting, and the joy of growing plants. It encourages hands-on gardening.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 20,
    chapter_title: 'Eating Together', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about the social aspects of food and meals',
      'Understand mid-day meal schemes in schools',
      'Appreciate food diversity and shared dining traditions'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter celebrates the joy of eating together — at home, at school, and during festivals. Children learn about the mid-day meal programme, why shared meals build community, and the diversity of food traditions across India.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 21,
    chapter_title: 'Food and Fun', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about food preparation and preservation',
      'Understand seasonal foods and their importance',
      'Explore fun food activities like pickling and drying'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore how food is preserved through drying, pickling, and freezing. They learn about seasonal fruits and vegetables, traditional preservation methods used in Indian households, and enjoy fun activities like making pickles and squash.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 22,
    chapter_title: 'The World in My Home', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand diversity within families and communities',
      'Learn about different religions, languages, and customs',
      'Appreciate India\'s pluralistic culture'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores the diversity found within a single home — different generations speaking different languages, following different customs, yet living together. Children learn to appreciate India\'s multicultural, multilingual society.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 23,
    chapter_title: 'Pochampalli', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about the Pochampalli weaving tradition',
      'Understand the process of creating ikkat fabric',
      'Appreciate traditional Indian crafts and artisans'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children visit Pochampalli village in Telangana, famous for its ikkat weaving. They learn about the tie-and-dye technique, how weavers create intricate patterns, and the importance of supporting traditional crafts and artisan communities.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 24,
    chapter_title: 'Home and Abroad', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about Indians who have gone abroad',
      'Understand the concept of migration and diaspora',
      'Appreciate different cultures while valuing one\'s own'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces children to the Indian diaspora — people who have moved to other countries for work, education, or family. They learn about life abroad while maintaining cultural roots, fostering a global perspective.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 25,
    chapter_title: 'Spicy Riddles', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about common spices and their sources',
      'Understand the role of spices in Indian cooking',
      'Know the history of the spice trade'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through fun riddles, children learn about Indian spices — turmeric, pepper, cardamom, cloves, and cinnamon. They discover which parts of plants spices come from and learn about India\'s historic role in the global spice trade.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 26,
    chapter_title: 'Defence Officer — Wahida', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about defence forces and their role',
      'Understand gender equality in professions',
      'Appreciate the service and sacrifice of defence personnel'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter tells the inspiring story of Wahida, a woman in India\'s defence forces. Children learn about the army, navy, and air force, and understand that women can excel in every profession, including defending the nation.' }] }
  },
  {
    class_num: 4, subject: 'EVS', chapter_num: 27,
    chapter_title: 'Chuskit Goes to School', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the challenges of disability and inclusion',
      'Learn about the right to education for all children',
      'Appreciate community support and accessibility'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Chuskit uses a wheelchair and dreams of going to school in Ladakh. When the rocky path seems impossible, her community comes together to build a proper path. This touching story teaches about inclusion, accessibility, and the right to education.' }] }
  },

  // =========================================================================
  //  CLASS 5 — English (Marigold) — 10 chapters
  // =========================================================================
  {
    class_num: 5, subject: 'English', chapter_num: 1,
    chapter_title: 'Ice Cream Man / Wonderful Waste', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read and enjoy a poem about a beloved street vendor',
      'Learn about recycling and reducing waste',
      'Understand how waste materials can be reused creatively'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Ice Cream Man" describes the joy children feel when they see the ice cream vendor on a hot summer day. "Wonderful Waste" teaches how waste materials like old newspapers, bottles, and cloth can be creatively recycled into useful items.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 2,
    chapter_title: 'Teamwork / Flying Together', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the importance of teamwork and collaboration',
      'Learn how birds fly in formation and help each other',
      'Apply the concept of teamwork to daily life'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Teamwork" emphasises how working together achieves more than working alone. "Flying Together" tells how geese fly in V-formation, taking turns to lead, showing that cooperation makes difficult tasks easier for everyone.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 3,
    chapter_title: 'My Shadow / Robinson Crusoe', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the behaviour of shadows through a poem',
      'Follow an adventure story about survival',
      'Learn vocabulary related to exploration and nature'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Robert Louis Stevenson\'s poem "My Shadow" playfully describes a child\'s fascination with their shadow. The excerpt from "Robinson Crusoe" introduces children to the classic adventure of a man stranded on a desert island, teaching resourcefulness and survival.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 4,
    chapter_title: 'Crying / My Elder Brother', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand that crying is a natural human emotion',
      'Learn about sibling relationships and respect for elders',
      'Discuss emotions and how to handle them'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Crying" explores different reasons why people cry and normalises the expression of emotions. "My Elder Brother" is adapted from Premchand\'s classic story about two brothers, teaching about responsibility, respect, and familial love.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 5,
    chapter_title: 'The Lazy Frog / Rip Van Winkle', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the consequences of laziness',
      'Follow a fantasy narrative involving time',
      'Learn vocabulary related to time, sleep, and change'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The humorous poem about a lazy frog who does nothing all day contrasts with the classic tale of Rip Van Winkle, who falls asleep for 20 years and wakes to find everything changed. Both teach about the value of being active and engaged.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 6,
    chapter_title: 'Class Discussion / Talkative Barber', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Participate in group discussions with proper etiquette',
      'Understand the art of listening vs talking too much',
      'Read a humorous folk tale with expression'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Class Discussion" teaches rules for good group conversations — listening, not interrupting, and respecting others\' views. "Talkative Barber" is a humorous folk tale about a barber who talks so much that his customer regrets coming for a haircut.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 7,
    chapter_title: 'Topsy-Turvy Land / Gulliver\'s Travels', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Enjoy imaginative and fantastical literature',
      'Understand the concept of different perspectives on size',
      'Learn vocabulary from classic English literature'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem describes a funny upside-down world where everything is reversed. The excerpt from "Gulliver\'s Travels" takes children to Lilliput where tiny people capture a giant Gulliver, teaching about perspective, size, and classic storytelling.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 8,
    chapter_title: 'Nobody\'s Friend / The Little Bully', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the importance of sharing and kindness',
      'Learn about the consequences of bullying behaviour',
      'Discuss how to be a good friend'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Nobody\'s Friend" contrasts a selfish child who won\'t share with a generous one who shares everything. "The Little Bully" tells about Hari who pinches and bites others until sea creatures teach him a lesson about how it feels.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 9,
    chapter_title: 'Sing a Song of People / Around the World', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Appreciate the diversity of people in a city',
      'Learn about different countries and cultures',
      'Use descriptive language about people and places'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Sing a Song of People" describes the vibrant life of people in a busy city — walking, talking, rushing, and resting. "Around the World" takes children on a global journey, learning about different cultures, foods, and traditions.' }] }
  },
  {
    class_num: 5, subject: 'English', chapter_num: 10,
    chapter_title: 'Malu Bhalu / Who Will Be Ningthou', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about animals in different habitats',
      'Understand the concept of just and wise leadership',
      'Read a folk tale from Manipur with cultural appreciation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'The poem "Malu Bhalu" follows a little bear cub learning to swim in icy waters. "Who Will Be Ningthou" is a Manipuri folk tale about choosing a ruler — the one who shows compassion rather than strength wins the throne, teaching about wise leadership.' }] }
  },

  // =========================================================================
  //  CLASS 5 — Mathematics (Math Magic) — 14 chapters
  // =========================================================================
  // NOTE: Chapter 1 has full content from the original file
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
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 2,
    chapter_title: 'Shapes and Angles', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify and classify angles — right, acute, and obtuse',
      'Measure angles using a protractor',
      'Recognize angles in everyday objects',
      'Understand the concept of perpendicular and parallel lines'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces angles as the amount of turning between two lines. Children learn to identify right angles, acute angles, and obtuse angles in their environment. They use a protractor to measure angles and explore perpendicular and parallel lines.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 3,
    chapter_title: 'How Many Squares', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Count squares and rectangles in complex figures',
      'Understand area as the space covered by a shape',
      'Estimate area by counting squares on a grid',
      'Compare areas of different shapes'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn to calculate area by counting square units on a grid. They find areas of regular and irregular shapes, compare them, and develop strategies for counting squares in overlapping and complex figures.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 4,
    chapter_title: 'Parts and Wholes', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand fractions as parts of a whole',
      'Add and subtract fractions with like denominators',
      'Compare fractions using visual models',
      'Relate fractions to everyday situations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter deepens understanding of fractions. Children visualise fractions as parts of shapes and collections, compare fractions, and learn to add and subtract fractions with the same denominator using real-life contexts like recipes and sharing.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 5,
    chapter_title: 'Does It Look the Same', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify lines of symmetry in shapes and figures',
      'Create symmetrical designs and patterns',
      'Understand rotational symmetry',
      'Find symmetry in alphabets, rangoli, and nature'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore symmetry by folding shapes and finding lines where both halves match exactly. They discover symmetry in nature (butterflies, leaves), art (rangoli), and letters of the alphabet, and create their own symmetrical designs.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 6,
    chapter_title: 'Be My Multiple, I\'ll Be Your Factor', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the concepts of factors and multiples',
      'Find factors and multiples of numbers',
      'Identify prime and composite numbers',
      'Solve problems using factors and multiples'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces factors and multiples through engaging activities. Children learn that factors divide a number exactly, while multiples are products of a number. They explore prime numbers, composite numbers, and use these concepts in problem-solving.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 7,
    chapter_title: 'Can You See the Pattern', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify complex number and shape patterns',
      'Understand growing and shrinking patterns',
      'Use pattern rules to find missing terms',
      'Explore magic squares and number puzzles'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore advanced patterns — arithmetic sequences, geometric patterns, magic squares, and palindromes. They discover rules governing patterns, predict future terms, and enjoy mathematical puzzles that build logical thinking.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 8,
    chapter_title: 'Mapping Your Way', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read and create simple maps with symbols',
      'Understand scale and direction on maps',
      'Use landmarks and compass directions for navigation',
      'Relate maps to real-world locations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter teaches map reading skills. Children learn about map symbols, compass directions (N, S, E, W), and the concept of scale. They create maps of their school and neighbourhood, developing spatial reasoning and navigation skills.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 9,
    chapter_title: 'Boxes and Sketches', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Identify and describe 3D shapes — cubes, cuboids, cylinders, cones',
      'Draw nets of 3D shapes',
      'Understand the relationship between 2D and 3D shapes',
      'Count faces, edges, and vertices of 3D shapes'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore 3D shapes by examining boxes, cans, and balls. They learn about faces, edges, and vertices, draw nets (flat layouts) of cubes and cuboids, and fold them back into 3D shapes, connecting 2D and 3D geometry.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 10,
    chapter_title: 'Tenths and Hundredths', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand decimals as parts of a whole',
      'Read and write decimal numbers to hundredths',
      'Relate fractions to decimals',
      'Use decimals in measurement and money contexts'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter introduces decimal numbers. Children learn that 0.1 means one-tenth and 0.01 means one-hundredth. They connect decimals to fractions and money (₹5.50 = 5 rupees and 50 paise), read measuring scales, and compare decimal numbers.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 11,
    chapter_title: 'Area and Its Boundary', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Calculate area and perimeter of rectangles and squares',
      'Understand the difference between area and perimeter',
      'Solve real-life problems involving area and perimeter',
      'Explore shapes with the same area but different perimeters'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children deepen their understanding of area and perimeter. They calculate these for rectangles and squares, discover that shapes with the same area can have different perimeters, and solve practical problems about painting walls, tiling floors, and fencing gardens.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 12,
    chapter_title: 'Smart Charts', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Read and interpret complex data displays',
      'Create pie charts and line graphs',
      'Analyse data to draw conclusions and make predictions',
      'Conduct surveys and present findings'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter advances data handling with more complex charts. Children learn about pie charts and line graphs, conduct surveys on topics they care about, present their findings visually, and practise drawing conclusions from real data.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 13,
    chapter_title: 'Ways to Multiply and Divide', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Multiply multi-digit numbers using different strategies',
      'Divide large numbers with and without remainders',
      'Solve complex word problems using multiplication and division',
      'Check answers using inverse operations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children master multiplication and division of larger numbers using lattice multiplication, partial products, and long division. They solve multi-step word problems and verify answers using inverse operations, building computational fluency.' }] }
  },
  {
    class_num: 5, subject: 'Mathematics', chapter_num: 14,
    chapter_title: 'How Big, How Heavy', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Convert between units of length, weight, and capacity',
      'Solve problems involving mixed units of measurement',
      'Estimate measurements in real-world contexts',
      'Compare and order measurements'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter consolidates measurement skills. Children convert between mm, cm, m, and km for length; g and kg for weight; and mL and L for capacity. They estimate, measure, and solve real-world problems involving multiple units.' }] }
  },

  // =========================================================================
  //  CLASS 5 — EVS (Looking Around) — 22 chapters
  // =========================================================================
  {
    class_num: 5, subject: 'EVS', chapter_num: 1,
    chapter_title: 'Super Senses', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the extraordinary senses of different animals',
      'Compare animal senses with human senses',
      'Learn how animals use their senses for survival'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores the amazing sensory abilities of animals. Dogs smell thousands of times better than humans, eagles see prey from great heights, and bats navigate using sound. Children compare these abilities with their own senses and understand how animals use them to survive.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 2,
    chapter_title: 'A Snake Charmer\'s Story', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about snakes and dispel common myths',
      'Understand the Wildlife Protection Act',
      'Appreciate the challenges faced by the Kalbeliya community'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through the eyes of a Kalbeliya snake charmer, children learn about snakes — that they don\'t hear music, most are non-venomous, and they are protected by law. The chapter addresses the community\'s livelihood challenges after the Wildlife Protection Act.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 3,
    chapter_title: 'From Tasting to Digesting', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the process of digestion',
      'Identify the organs involved in digestion',
      'Learn about taste buds and the tongue map'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter follows the journey of food from the mouth through the digestive system. Children learn about taste, chewing, swallowing, and how the stomach and intestines break down food. They understand why chewing well and drinking water are important.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 4,
    chapter_title: 'Mangoes Round the Year', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about food preservation methods',
      'Understand the process of making pickles, jams, and dried fruits',
      'Know why food spoils and how to prevent it'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Mangoes are seasonal, but we enjoy them all year as pickles, aam papad, juice, and jam. This chapter teaches how food is preserved through drying, pickling, freezing, and canning, and explains why food spoils due to microorganisms.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 5,
    chapter_title: 'Seeds and Seeds', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand how seeds germinate and grow',
      'Identify different types of seeds and their dispersal methods',
      'Learn about the parts of a seed'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore the fascinating world of seeds — from tiny mustard seeds to large coconuts. They learn about seed structure, germination conditions (water, air, warmth), and how seeds travel via wind, water, animals, and explosion.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 6,
    chapter_title: 'Every Drop Counts', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the water crisis and scarcity',
      'Learn about traditional water conservation methods',
      'Appreciate the importance of saving water daily'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter addresses water scarcity, showing how some communities walk miles for water. Children learn about traditional methods like stepwells, johads, and rainwater harvesting, and understand why every drop of water is precious and must be conserved.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 7,
    chapter_title: 'Experiments with Water', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand what dissolves in water and what doesn\'t',
      'Learn about evaporation and condensation',
      'Conduct simple experiments with water'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through hands-on experiments, children discover that sugar dissolves in water but sand doesn\'t. They learn about evaporation (water becoming vapour) and condensation (vapour becoming water), connecting these to the water cycle in nature.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 8,
    chapter_title: 'A Treat for Mosquitoes', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about mosquito-borne diseases — malaria and dengue',
      'Understand the mosquito life cycle',
      'Know methods to prevent mosquito breeding'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter teaches about mosquitoes and the diseases they spread. Children learn about the mosquito life cycle, why stagnant water helps mosquitoes breed, and practical prevention methods like using nets, removing standing water, and keeping surroundings clean.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 9,
    chapter_title: 'Up You Go', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about mountain life and high-altitude challenges',
      'Understand how altitude affects climate and vegetation',
      'Appreciate the lifestyle of mountain communities'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children learn about life in the mountains — how altitude affects breathing, temperature, and vegetation. They discover how mountain communities in places like Ladakh and the Northeast adapt to challenging conditions, growing terrace crops and building special homes.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 10,
    chapter_title: 'Walls Tell Stories', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about historical buildings and monuments',
      'Understand how architecture tells us about the past',
      'Appreciate the importance of preserving heritage sites'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children visit old forts, palaces, and monuments to discover what walls can tell us about the past — how people lived, what they valued, and how they built. This chapter introduces architectural heritage and the importance of preservation.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 11,
    chapter_title: 'Sunita in Space', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about Sunita Williams and her space journey',
      'Understand basic concepts about space and zero gravity',
      'Appreciate the role of women in science and exploration'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter tells the inspiring story of astronaut Sunita Williams, who spent months on the International Space Station. Children learn about life in space — floating in zero gravity, eating space food, and conducting experiments — and are inspired by women in STEM.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 12,
    chapter_title: 'What If It Finishes', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the concept of renewable and non-renewable resources',
      'Learn about fossil fuels and their limited supply',
      'Explore alternative energy sources'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter raises awareness about non-renewable resources like coal, petroleum, and natural gas. Children learn that these will run out someday and explore alternative energy sources like solar, wind, and water power as sustainable solutions.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 13,
    chapter_title: 'A Shelter So High', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about life in Ladakh and high-altitude regions',
      'Understand how people adapt homes to extreme cold',
      'Appreciate the culture and traditions of mountain communities'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores life in Ladakh, one of the highest inhabited places on Earth. Children learn about stone houses with thick walls, yak wool clothing, and how people survive extreme cold. They appreciate the unique culture and challenges of high-altitude living.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 14,
    chapter_title: 'When the Earth Shook', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand what causes earthquakes',
      'Learn earthquake safety measures',
      'Know about the 2001 Gujarat earthquake and disaster relief'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Through the story of the 2001 Gujarat earthquake, children learn what earthquakes are, why they happen, and how to stay safe during one. They understand the importance of earthquake-resistant buildings and community disaster preparedness.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 15,
    chapter_title: 'Blow Hot Blow Cold', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand how heating and cooling affects materials',
      'Learn about expansion and contraction',
      'Conduct experiments showing the effects of temperature'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'Children explore how temperature affects materials — metals expand when heated and contract when cooled. They discover why railway tracks have gaps, why hot water bottles work, and conduct experiments with hot and cold air, building scientific thinking.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 16,
    chapter_title: 'Who Will Do This Work', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the dignity of all types of labour',
      'Learn about sanitation workers and their challenges',
      'Discuss discrimination based on occupation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter highlights the essential but often undervalued work of sanitation workers, waste collectors, and manual labourers. Children learn about the challenges these workers face, discuss fairness and dignity, and understand that all work deserves respect.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 17,
    chapter_title: 'Across the Wall', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand gender equality in sports and education',
      'Learn about girls\' right to play and participate',
      'Challenge stereotypes about what girls can do'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter addresses gender barriers through the story of girls who want to play cricket but face opposition. It teaches children about gender equality, the right of every child to play and learn, and the importance of challenging stereotypes.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 18,
    chapter_title: 'No Place for Us', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about displacement and its impact on communities',
      'Understand how development projects affect forest dwellers',
      'Appreciate the rights of tribal and indigenous communities'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter tells the stories of communities displaced by dams, mining, and development projects. Children learn about the struggles of tribal people who lose their homes and forests, and discuss the balance between development and people\'s rights.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 19,
    chapter_title: 'A Seed Tells a Farmer\'s Story', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand the challenges faced by Indian farmers',
      'Learn about the farming cycle from sowing to selling',
      'Appreciate the role of farmers in food security'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'A seed narrates the story of an Indian farmer — from borrowing money for seeds and fertilisers, to depending on rain, battling pests, and selling the harvest. Children understand the challenges of farming and the farmer\'s crucial role in feeding the nation.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 20,
    chapter_title: 'Whose Forests', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Learn about forests and the communities that depend on them',
      'Understand deforestation and its consequences',
      'Appreciate the importance of forest conservation'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores the relationship between forests and people. Tribal communities have lived in forests for centuries, depending on them for food, medicine, and shelter. Children learn about deforestation, its impact on wildlife and communities, and why forests must be protected.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 21,
    chapter_title: 'Like Father, Like Daughter', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand inheritance and similarities between parents and children',
      'Learn about family traits and characteristics',
      'Discuss how qualities are passed down through generations'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores how children inherit physical traits and talents from their parents — eye colour, hair type, height, and even skills. Children observe similarities within their own families and understand that while we inherit traits, each person is unique.' }] }
  },
  {
    class_num: 5, subject: 'EVS', chapter_num: 22,
    chapter_title: 'On the Move Again', language: 'english',
    word_count: 500,
    learning_objectives: [
      'Understand migration — why people and animals move',
      'Learn about nomadic communities in India',
      'Appreciate the challenges of mobile lifestyles'
    ],
    content_json: { sections: [{ heading: 'Overview', type: 'text', content: 'This chapter explores migration — birds that fly thousands of kilometres, nomadic herders who move with seasons, and families that relocate for work. Children understand the reasons behind migration and the challenges faced by communities constantly on the move.' }] }
  }
];

module.exports = chapters;
