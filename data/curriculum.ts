
import { LevelData, UserLevel } from '../types';

// Helper to generate a standardized list of questions for a block
// In a real app, these would be unique database entries.

export const CURRICULUM: LevelData[] = [
  {
    id: UserLevel.A1,
    title: "Level A1: Beginner",
    description: "Start your journey here. Basics of grammar and vocabulary.",
    blocks: [
      {
        id: "a1-basics",
        title: "Unit 1: The Basics",
        description: "To Be, Pronouns, and Numbers",
        questions: [
          { id: 1, topic: "To Be", type: "multiple-choice", question: "I ___ a student.", options: ["is", "am", "are", "be"], correctAnswer: "am" },
          { id: 2, topic: "To Be", type: "multiple-choice", question: "She ___ my sister.", options: ["am", "is", "are", "be"], correctAnswer: "is" },
          { id: 3, topic: "Pronouns", type: "multiple-choice", question: "___ are happy.", options: ["We", "He", "She", "It"], correctAnswer: "We" },
          { id: 4, topic: "Vocabulary", type: "text-input", question: "Write the number 1 (one) as a word.", correctAnswer: "one" },
          { id: 5, topic: "Articles", type: "multiple-choice", question: "It is ___ orange.", options: ["a", "an", "the", "-"], correctAnswer: "an" },
          { id: 6, topic: "Plurals", type: "text-input", question: "One cat, two ___.", correctAnswer: "cats" },
          { id: 7, topic: "To Be (Negative)", type: "multiple-choice", question: "They ___ at home.", options: ["isn't", "aren't", "not", "am not"], correctAnswer: "aren't" },
          { id: 8, topic: "Greetings", type: "multiple-choice", question: "___ morning!", options: ["Good", "Nice", "Well", "Fine"], correctAnswer: "Good" },
          { id: 9, topic: "Possessives", type: "multiple-choice", question: "This is ___ book (I).", options: ["my", "mine", "me", "I"], correctAnswer: "my" },
          { id: 10, topic: "Demonstratives", type: "multiple-choice", question: "___ is a pen (here).", options: ["This", "That", "These", "Those"], correctAnswer: "This" },
          { id: 11, topic: "Vocabulary: Colors", type: "text-input", question: "The sky is ___.", correctAnswer: "blue" },
          { id: 12, topic: "Numbers", type: "text-input", question: "Ten plus five is ___.", correctAnswer: "fifteen" },
          { id: 13, topic: "Question Words", type: "multiple-choice", question: "___ is your name?", options: ["What", "Who", "Where", "When"], correctAnswer: "What" },
          { id: 14, topic: "To Be (Question)", type: "multiple-choice", question: "___ you ready?", options: ["Is", "Am", "Are", "Do"], correctAnswer: "Are" },
          { id: 15, topic: "Vocabulary: Family", type: "text-input", question: "My dad's wife is my ___.", correctAnswer: "mother" }
        ]
      },
      {
        id: "a1-verbs",
        title: "Unit 2: Action & Routine",
        description: "Present Simple and Daily Activities",
        questions: [
          { id: 1, topic: "Present Simple", type: "multiple-choice", question: "He ___ football.", options: ["play", "plays", "playing", "played"], correctAnswer: "plays" },
          { id: 2, topic: "Present Simple", type: "multiple-choice", question: "We ___ to school.", options: ["go", "goes", "going", "gone"], correctAnswer: "go" },
          { id: 3, topic: "Present Simple (Negative)", type: "multiple-choice", question: "I ___ like pizza.", options: ["doesn't", "don't", "not", "no"], correctAnswer: "don't" },
          { id: 4, topic: "Adverbs of Frequency", type: "multiple-choice", question: "She ___ late.", options: ["never is", "is never", "never", "not never"], correctAnswer: "is never" },
          { id: 5, topic: "Can", type: "multiple-choice", question: "I ___ swim.", options: ["can", "cans", "to can", "canning"], correctAnswer: "can" },
          { id: 6, topic: "Vocabulary: Food", type: "text-input", question: "A red fruit often used in pies is an ___.", correctAnswer: "apple" },
          { id: 7, topic: "Prepositions", type: "multiple-choice", question: "The book is ___ the table.", options: ["on", "in", "at", "to"], correctAnswer: "on" },
          { id: 8, topic: "Have got", type: "multiple-choice", question: "She ___ a car.", options: ["have got", "has got", "having", "got"], correctAnswer: "has got" },
          { id: 9, topic: "Imperatives", type: "multiple-choice", question: "___ the door, please.", options: ["Open", "Opens", "Opening", "To open"], correctAnswer: "Open" },
          { id: 10, topic: "Vocabulary: Days", type: "text-input", question: "After Monday comes ___.", correctAnswer: "Tuesday" },
          { id: 11, topic: "Object Pronouns", type: "multiple-choice", question: "Listen to ___!", options: ["me", "my", "I", "mine"], correctAnswer: "me" },
          { id: 12, topic: "Present Continuous", type: "multiple-choice", question: "Look! It is ___.", options: ["snow", "snows", "snowing", "snowed"], correctAnswer: "snowing" },
          { id: 13, topic: "Vocabulary: Home", type: "text-input", question: "You sleep in the ___.", correctAnswer: "bedroom" },
          { id: 14, topic: "Time", type: "multiple-choice", question: "It is 5 o'___.", options: ["clock", "watch", "time", "hour"], correctAnswer: "clock" },
          { id: 15, topic: "Connectors", type: "multiple-choice", question: "I like tea ___ coffee.", options: ["and", "but", "so", "or"], correctAnswer: "and" }
        ]
      }
    ]
  },
  {
    id: UserLevel.A2,
    title: "Level A2: Elementary",
    description: "Talking about the past and future.",
    blocks: [
      {
        id: "a2-past",
        title: "Unit 1: The Past",
        description: "Past Simple and Regular Verbs",
        questions: [
          { id: 1, topic: "Past Simple", type: "multiple-choice", question: "Yesterday I ___ home.", options: ["stay", "stayed", "staying", "stays"], correctAnswer: "stayed" },
          { id: 2, topic: "Irregular Verbs", type: "text-input", question: "Past of 'go':", correctAnswer: "went" },
          { id: 3, topic: "Past Simple (Be)", type: "multiple-choice", question: "They ___ happy.", options: ["was", "were", "are", "did"], correctAnswer: "were" },
          { id: 4, topic: "Past Time Expressions", type: "multiple-choice", question: "I saw him two days ___.", options: ["ago", "before", "last", "past"], correctAnswer: "ago" },
          { id: 5, topic: "Did", type: "multiple-choice", question: "___ you see the movie?", options: ["Do", "Did", "Does", "Were"], correctAnswer: "Did" },
          { id: 6, topic: "Irregular Verbs", type: "text-input", question: "Past of 'buy':", correctAnswer: "bought" },
          { id: 7, topic: "Past Continuous", type: "multiple-choice", question: "I was ___ TV.", options: ["watch", "watched", "watching", "watches"], correctAnswer: "watching" },
          { id: 8, topic: "Vocabulary: Holidays", type: "text-input", question: "A time when you don't work is a ___.", correctAnswer: "holiday" },
          { id: 9, topic: "Comparatives", type: "multiple-choice", question: "This car is ___ than that one.", options: ["fast", "faster", "more fast", "fastest"], correctAnswer: "faster" },
          { id: 10, topic: "Superlatives", type: "text-input", question: "The ___ (big) animal is the whale.", correctAnswer: "biggest" },
          { id: 11, topic: "Possessive 's", type: "multiple-choice", question: "___ bag is blue.", options: ["Jane", "Jane's", "Janes", "Janes'"], correctAnswer: "Jane's" },
          { id: 12, topic: "Adverbs", type: "multiple-choice", question: "He runs ___.", options: ["quick", "quickly", "good", "fastly"], correctAnswer: "quickly" },
          { id: 13, topic: "Vocabulary: Jobs", type: "text-input", question: "Someone who cooks food in a restaurant is a ___.", correctAnswer: "chef" },
          { id: 14, topic: "Would like", type: "multiple-choice", question: "I ___ like a coffee.", options: ["would", "will", "do", "can"], correctAnswer: "would" },
          { id: 15, topic: "Prepositions of Place", type: "multiple-choice", question: "The bank is ___ to the park.", options: ["next", "near", "opposite", "front"], correctAnswer: "next" }
        ]
      },
      {
        id: "a2-future",
        title: "Unit 2: Future & Experiences",
        description: "Future forms and Present Perfect",
        questions: [
            { id: 1, topic: "Future Plans", type: "multiple-choice", question: "I ___ visit my grandma tomorrow.", options: ["am going to", "will", "go to", "going"], correctAnswer: "am going to" },
            { id: 2, topic: "Predictions", type: "multiple-choice", question: "I think it ___ rain.", options: ["will", "is going to", "is", "can"], correctAnswer: "will" },
            { id: 3, topic: "Future Arrangement", type: "multiple-choice", question: "We are ___ to Paris next week.", options: ["fly", "flying", "flew", "flown"], correctAnswer: "flying" },
            { id: 4, topic: "Vocabulary: Weather", type: "text-input", question: "You need an umbrella when it is ___.", correctAnswer: "raining" },
            { id: 5, topic: "Irregular Comparative", type: "multiple-choice", question: "The book was ___ (good) than the movie.", options: ["gooder", "better", "best", "more good"], correctAnswer: "better" },
            { id: 6, topic: "Irregular Superlative", type: "text-input", question: "It was the ___ (bad) day ever.", correctAnswer: "worst" },
            { id: 7, topic: "Present Perfect", type: "multiple-choice", question: "Have you ___ been to London?", options: ["ever", "never", "always", "yet"], correctAnswer: "ever" },
            { id: 8, topic: "Past Participle", type: "text-input", question: "Past participle of 'write':", correctAnswer: "written" },
            { id: 9, topic: "Vocabulary: Travel", type: "text-input", question: "The bags you take on a trip are your ___.", correctAnswer: "luggage" },
            { id: 10, topic: "Modals: Advice", type: "multiple-choice", question: "You ___ see a doctor.", options: ["should", "would", "will", "can"], correctAnswer: "should" },
            { id: 11, topic: "Adverbs", type: "text-input", question: "He drives ___ (careful).", correctAnswer: "carefully" },
            { id: 12, topic: "Zero Conditional", type: "multiple-choice", question: "If you heat ice, it ___ water.", options: ["becomes", "will become", "became", "become"], correctAnswer: "becomes" },
            { id: 13, topic: "Vocabulary: Health", type: "text-input", question: "My head hurts. I have a ___.", correctAnswer: "headache" },
            { id: 14, topic: "Time Clauses", type: "multiple-choice", question: "I will call you ___ I arrive.", options: ["when", "during", "while", "for"], correctAnswer: "when" },
            { id: 15, topic: "Infinitive of Purpose", type: "multiple-choice", question: "I went to the shop ___ milk.", options: ["to buy", "for buy", "buying", "buy"], correctAnswer: "to buy" }
        ]
      }
    ]
  },
  {
    id: UserLevel.B1,
    title: "Level B1: Intermediate",
    description: "Complex structures and professional topics.",
    blocks: [
      {
        id: "b1-complex",
        title: "Unit 1: Complex Grammar",
        description: "Conditionals and Perfect Tenses",
        questions: [
          { id: 1, topic: "Present Perfect", type: "multiple-choice", question: "I ___ seen that movie.", options: ["have", "has", "did", "was"], correctAnswer: "have" },
          { id: 2, topic: "Since/For", type: "multiple-choice", question: "I have lived here ___ 2010.", options: ["since", "for", "in", "from"], correctAnswer: "since" },
          { id: 3, topic: "First Conditional", type: "multiple-choice", question: "If it rains, we ___ go.", options: ["don't", "won't", "didn't", "wouldn't"], correctAnswer: "won't" },
          { id: 4, topic: "Passive Voice", type: "multiple-choice", question: "The letter ___ sent yesterday.", options: ["is", "was", "were", "has"], correctAnswer: "was" },
          { id: 5, topic: "Vocabulary: Tech", type: "text-input", question: "To move a file from the internet to your PC is to ___.", correctAnswer: "download" },
          { id: 6, topic: "Gerunds", type: "multiple-choice", question: "I enjoy ___ books.", options: ["read", "reading", "to read", "reads"], correctAnswer: "reading" },
          { id: 7, topic: "Second Conditional", type: "multiple-choice", question: "If I ___ rich, I would travel.", options: ["am", "was", "were", "be"], correctAnswer: "were" },
          { id: 8, topic: "Used to", type: "multiple-choice", question: "I ___ to smoke.", options: ["use", "used", "using", "uses"], correctAnswer: "used" },
          { id: 9, topic: "Reported Speech", type: "text-input", question: "'I am tired' -> He said he ___ tired.", correctAnswer: "was" },
          { id: 10, topic: "Modals", type: "multiple-choice", question: "You ___ wear a seatbelt.", options: ["must", "might", "can", "may"], correctAnswer: "must" },
          { id: 11, topic: "Relative Clauses", type: "multiple-choice", question: "The person ___ called me.", options: ["which", "who", "where", "whose"], correctAnswer: "who" },
          { id: 12, topic: "Vocabulary: Feelings", type: "text-input", question: "Feeling fear means you are ___.", correctAnswer: "afraid" },
          { id: 13, topic: "Question Tags", type: "multiple-choice", question: "It's cold, ___?", options: ["isn't it", "is it", "doesn't it", "does it"], correctAnswer: "isn't it" },
          { id: 14, topic: "Past Perfect", type: "multiple-choice", question: "The train ___ left when we arrived.", options: ["has", "had", "was", "did"], correctAnswer: "had" },
          { id: 15, topic: "Phrasal Verbs", type: "multiple-choice", question: "Never give ___.", options: ["up", "in", "on", "off"], correctAnswer: "up" }
        ]
      },
      {
        id: "b1-mastery",
        title: "Unit 2: Mastery & Nuance",
        description: "Hard Mode: Advanced Structures",
        questions: [
            { id: 1, topic: "Third Conditional", type: "multiple-choice", question: "If I ___ known, I would have come.", options: ["had", "have", "has", "would"], correctAnswer: "had" },
            { id: 2, topic: "Third Conditional", type: "multiple-choice", question: "I ___ have bought it if it was cheaper.", options: ["will", "would", "can", "did"], correctAnswer: "would" },
            { id: 3, topic: "Phrasal Verbs", type: "multiple-choice", question: "I can't put ___ with this noise.", options: ["up", "on", "in", "down"], correctAnswer: "up" },
            { id: 4, topic: "Future Perfect", type: "multiple-choice", question: "By 5 PM, I will ___ finished.", options: ["have", "had", "be", "has"], correctAnswer: "have" },
            { id: 5, topic: "Passive + Modals", type: "multiple-choice", question: "This work must ___ done today.", options: ["be", "been", "being", "have"], correctAnswer: "be" },
            { id: 6, topic: "Indirect Questions", type: "multiple-choice", question: "Can you tell me where ___?", options: ["is the bank", "the bank is", "bank is", "is bank"], correctAnswer: "the bank is" },
            { id: 7, topic: "Vocabulary: Business", type: "text-input", question: "A formal discussion to reach an agreement is a ___.", correctAnswer: "negotiation" },
            { id: 8, topic: "Idioms", type: "multiple-choice", question: "Let's call it a ___ (stop working).", options: ["day", "night", "time", "finish"], correctAnswer: "day" },
            { id: 9, topic: "Wishes", type: "multiple-choice", question: "I wish I ___ studied harder.", options: ["had", "have", "would", "did"], correctAnswer: "had" },
            { id: 10, topic: "Causative", type: "multiple-choice", question: "I had my car ___ (repair).", options: ["repaired", "repair", "repairing", "to repair"], correctAnswer: "repaired" },
            { id: 11, topic: "Connectors", type: "multiple-choice", question: "___ the rain, we went out.", options: ["Despite", "Although", "Even", "However"], correctAnswer: "Despite" },
            { id: 12, topic: "Reported Speech", type: "multiple-choice", question: "She ___ me she was busy.", options: ["told", "said", "spoke", "asked"], correctAnswer: "told" },
            { id: 13, topic: "Vocabulary: Personality", type: "text-input", question: "Someone who wants to be successful is ___.", correctAnswer: "ambitious" },
            { id: 14, topic: "Verbs + Prepositions", type: "multiple-choice", question: "I look forward to ___ you.", options: ["seeing", "see", "saw", "seen"], correctAnswer: "seeing" },
            { id: 15, topic: "Conditional Linkers", type: "multiple-choice", question: "I won't go ___ you go.", options: ["unless", "if", "when", "as"], correctAnswer: "unless" }
        ]
      }
    ]
  }
];
