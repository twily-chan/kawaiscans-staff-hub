
import { StaffMember, MascotData } from '../types';

// Update this version number whenever you push new changes to GitHub!
// This forces visitors' browsers to load the new data instead of their old cached copy.
export const DATA_VERSION = '1768910679913';

export const INITIAL_HOBBY_CATEGORIES = [
  "Creative",
  "Active",
  "Chill",
  "Tech",
  "Otaku"
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    "id": "1",
    "name": "Carrot ",
    "role": "Leader",
    "avatarUrl": "https://cdn.discordapp.com/attachments/1436296684069060681/1462898404119023860/97fb8fb9be9ddc7b8181253d3e3254a3.jpg?ex=6970868e&is=696f350e&hm=d2756ba549b99977105ae60448f703ed1214ea4082d7802076f1368d56023a1f&",
    "bio": "The one who started it all. Fueled by ramen and deadline panic.",
    "favManga": "Bleach",
    "hobbies": [
      {
        "name": "Drawing",
        "category": "Creative"
      },
      {
        "name": "Karaoke",
        "category": "Active"
      }
    ],
    "powerLevel": 9001,
    "coffeeConsumption": 5
  },
  {
    "id": "2",
    "name": "Hisdjaigj",
    "role": "Translator",
    "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=Shiraishi",
    "bio": "Can translate sound effects into pure emotion.",
    "favManga": "Kubo-san wa Mob wo Yurusanai",
    "hobbies": [
      {
        "name": "Reading",
        "category": "Chill"
      },
      {
        "name": "Tea Tasting",
        "category": "Chill"
      }
    ],
    "powerLevel": 8500,
    "coffeeConsumption": 2
  },
  {
    "id": "3",
    "name": "Kombucha ",
    "role": "Redrawer",
    "avatarUrl": "https://cdn.discordapp.com/attachments/1436296684069060681/1450429092674535534/kubo-nagisa-kubo-san-wa-mob-wo-yurusanai_1.gif?ex=6970a55b&is=696f53db&hm=6023bc73ac1f3dd2589f96ce243e8813062e27184ec73eec710205f21f5c3928&",
    "bio": "Removing text from complicated backgrounds is my passion (and nightmare).",
    "favManga": "One Piece",
    "hobbies": [
      {
        "name": "Digital Art",
        "category": "Creative"
      },
      {
        "name": "Gaming",
        "category": "Tech"
      }
    ],
    "powerLevel": 7200,
    "coffeeConsumption": 4
  },
  {
    "id": "4",
    "name": "Type-Setter",
    "role": "Typesetter",
    "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=Font",
    "bio": "I have 5000 fonts installed and I use 3 of them.",
    "favManga": "Yotsuba&!",
    "hobbies": [
      {
        "name": "Typography",
        "category": "Creative"
      },
      {
        "name": "Mechanical Keyboards",
        "category": "Tech"
      }
    ],
    "powerLevel": 6800,
    "coffeeConsumption": 3
  }
];

export const INITIAL_MASCOT: MascotData = {
  "gifs": [
    "https://media1.tenor.com/m/wr2bCL53YR8AAAAd/kubo-san-anime.gif",
    "https://media1.tenor.com/m/f37213_CgacAAAAd/kubo-nagisa-kubo-san-wa-mob-wo-yurusanai.gif",
    "https://media1.tenor.com/m/Wj4j2Z1t3VQAAAAd/kubo-san-kubo-nagisa.gif"
  ],
  "quotes": [
    "Don't forget to hydrate!",
    "Is that a new chapter? Nope, just me.",
    "Ganbatte!",
    "Scanlation is art!",
    "Did you check for typos?",
    "Deadline approaching!"
  ],
  "fallbackImage": "https://media1.tenor.com/m/wr2bCL53YR8AAAAd/kubo-san-anime.gif"
};
