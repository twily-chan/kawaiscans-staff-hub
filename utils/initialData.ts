
import { StaffMember, MascotData } from '../types';

// Update this version number whenever you push new changes to GitHub!
// This forces visitors' browsers to load the new data instead of their old cached copy.
export const DATA_VERSION = '1768921107158';

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
    "roles": [
      "Leader"
    ],
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
    "roles": [
      "Translator",
      "Proofreader"
    ],
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
    "roles": [
      "Redrawer"
    ],
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
    "roles": [
      "Typesetter"
    ],
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
        "category": "Chill"
      }
    ],
    "powerLevel": 5000,
    "coffeeConsumption": 1
  },
  {
    "id": "1768920906822",
    "name": "Azasapag",
    "roles": [
      "Translator"
    ],
    "avatarUrl": "https://media.tenor.com/Ru5PhSjAJ3gAAAAi/hikari-shupogaki.gif",
    "bio": "Hey there I'm new I'm from Indonesia but currently I'm living in Japan.",
    "favManga": "Uma Musume ",
    "hobbies": [
      {
        "name": "Reading ",
        "category": "Active"
      },
      {
        "name": "Gaming ",
        "category": "Active"
      },
      {
        "name": "Gooning ",
        "category": "Active"
      },
      {
        "name": "Sleeping ",
        "category": "Active"
      }
    ],
    "powerLevel": 5000,
    "coffeeConsumption": 1
  }
];

export const INITIAL_MASCOT: MascotData = {
  "gifs": [
    "https://media1.tenor.com/m/wr2bCL53YR8AAAAd/kubo-san-anime.gif",
    "https://media.tenor.com/tLqhlbuMdXoAAAAi/duong2.gif"
  ],
  "quotes": [
    "Kubo is watching!",
    "Did you translate today?",
    "Caffeine level critical!",
    "Where is the raw provider?"
  ],
  "fallbackImage": "https://media1.tenor.com/m/wr2bCL53YR8AAAAd/kubo-san-anime.gif"
};
