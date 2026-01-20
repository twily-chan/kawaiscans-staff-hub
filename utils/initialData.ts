
import { StaffMember, MascotData } from '../types';

// Update this version number whenever you push new changes to GitHub!
// This forces visitors' browsers to load the new data instead of their old cached copy.
export const DATA_VERSION = '1768914129558';

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
  },
  {
    "id": "1768913155413",
    "name": "Azasapag",
    "role": "Translator",
    "avatarUrl": "https://media.tenor.com/Ru5PhSjAJ3gAAAAi/hikari-shupogaki.gif",
    "bio": "I'm new here I'm from Indonesia but I'm currently living in Japan ",
    "favManga": "Uma Musume ",
    "hobbies": [
      {
        "name": "Reading ",
        "category": "Active"
      },
      {
        "name": "Translating ",
        "category": "Lolicon"
      },
      {
        "name": "Gooning ",
        "category": "Otaku"
      },
      {
        "name": "Sleeping ",
        "category": "Weeb"
      }
    ],
    "powerLevel": 5000,
    "coffeeConsumption": 1
  },
  {
    "id": "1768913707622",
    "name": "Risrock",
    "role": "Redrawer",
    "avatarUrl": "https://media.tenor.com/1qQAPvpu2FwAAAAi/shinky-id.gif",
    "bio": "I'm just a normal cleaner and redrawer I love reading manga's and stuff.",
    "favManga": "One piece ",
    "hobbies": [
      {
        "name": "Reading ",
        "category": "Active"
      },
      {
        "name": "Cleaning ",
        "category": "Otaku"
      },
      {
        "name": "Drawing ",
        "category": "Weeb"
      },
      {
        "name": "Sleeping ",
        "category": "Cringe"
      }
    ],
    "powerLevel": 5000,
    "coffeeConsumption": 1
  },
  {
    "id": "1768913873671",
    "name": "Chen",
    "role": "Redrawer",
    "avatarUrl": "https://media1.tenor.com/m/PVwkr8OVipEAAAAC/my-dress-up-darling-marin-kitagawa.gif",
    "bio": "I'm a digital artist i love drawing stuff.",
    "favManga": "Angel next door ",
    "hobbies": [
      {
        "name": "Artist ",
        "category": "Weeb"
      },
      {
        "name": "Drawing ",
        "category": "Active"
      },
      {
        "name": "Sleeping ",
        "category": "Otaku"
      }
    ],
    "powerLevel": 5000,
    "coffeeConsumption": 1
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
