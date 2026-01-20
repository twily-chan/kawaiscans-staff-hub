
import { StaffMember, MascotData } from '../types';

// Update this version number whenever you push new changes to GitHub!
// This forces visitors' browsers to load the new data instead of their old cached copy.
export const DATA_VERSION = '1768912632820';

export const INITIAL_HOBBY_CATEGORIES = [
  "Active",
  "Chill",
  "Otaku",
  "Lolicon",
  "Weeb",
  "Cringe"
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    "id": "1",
    "name": "Carrot ",
    "role": "Leader",
    "avatarUrl": "https://media1.tenor.com/m/vORI9e-AqoUAAAAC/menhera-chan-chibi.gif",
    "bio": "yeah i started it all but i don't know who will finish it.",
    "favManga": "Kubo",
    "hobbies": [
      {
        "name": "Gooning",
        "category": "Creative"
      },
      {
        "name": "Translating",
        "category": "Weeb"
      },
      {
        "name": "Sleeping",
        "category": "Otaku"
      },
      {
        "name": "Eating",
        "category": "Creative"
      }
    ],
    "powerLevel": 9001,
    "coffeeConsumption": 5
  },
  {
    "id": "2",
    "name": "Houjicha",
    "role": "Translator",
    "avatarUrl": "https://media.tenor.com/tLqhlbuMdXoAAAAi/duong2.gif",
    "bio": "I'm gay i don't know why i joined i slack around all the time.",
    "favManga": "One-Room Ta",
    "hobbies": [
      {
        "name": "Reading",
        "category": "Active"
      },
      {
        "name": "Gooning",
        "category": "Otaku"
      },
      {
        "name": "Bl lover",
        "category": "Cringe"
      }
    ],
    "powerLevel": 8500,
    "coffeeConsumption": 2
  },
  {
    "id": "3",
    "name": "Kombucha ",
    "role": "Redrawer",
    "avatarUrl": "https://media.tenor.com/-LgKbMFgUWoAAAAi/vulpisfoglia-cry.gif",
    "bio": "I'm a pumpkin in real life too.",
    "favManga": "Fragrant Flowers",
    "hobbies": [
      {
        "name": "Digital Art",
        "category": "Creative"
      },
      {
        "name": "Gooning",
        "category": "Tech"
      },
      {
        "name": "Sleeping",
        "category": "Lolicon"
      },
      {
        "name": "Racist",
        "category": "Weeb"
      }
    ],
    "powerLevel": 7200,
    "coffeeConsumption": 4
  },
  {
    "id": "4",
    "name": "Yuuki",
    "role": "Typesetter",
    "avatarUrl": "https://media.tenor.com/jaX_i8ry6AQAAAAi/enterprise-confused.gif",
    "bio": "I'm an old member but i still don't like to work i make fake excuses everytime",
    "favManga": "Yotsuba",
    "hobbies": [
      {
        "name": "Lying",
        "category": "Creative"
      },
      {
        "name": "Gooning",
        "category": "Weeb"
      },
      {
        "name": "Reading",
        "category": "Lolicon"
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
