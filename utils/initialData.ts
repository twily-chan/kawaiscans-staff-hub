
import { StaffMember, MascotData } from '../types';

// Update this version number whenever you push new changes to GitHub!
// This forces visitors' browsers to load the new data instead of their old cached copy.
<<<<<<< HEAD
export const DATA_VERSION = '1.0.1';

export const INITIAL_HOBBY_CATEGORIES = [
  'Creative',
  'Active',
  'Chill',
  'Tech',
  'Otaku'
];
=======
export const DATA_VERSION = '1768902713725';
>>>>>>> ec2b9ef9362dd77739b0d176464ac55f44fe9ec4

export const INITIAL_STAFF: StaffMember[] = [
  {
    "id": "1",
    "name": "lol",
    "role": "Leader",
    "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=Kubo",
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
    "name": "have fun",
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
    "name": "Yo SUp",
    "role": "Redrawer",
    "avatarUrl": "https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel",
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
