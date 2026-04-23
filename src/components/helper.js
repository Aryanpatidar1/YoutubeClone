const nameList = [
  'Time', 'Past', 'Future', 'Dev',
  'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
  'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
  'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
  'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
  'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
  'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
  'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
  'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
  'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
  'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
  'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
  'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
  'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
  'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
  'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
  'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
  'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
  'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
  'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
  'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich',
  'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy',
  'Girl', 'Vortex', 'Paradox'
];


export const generate = () => {

  return nameList[Math.floor(Math.random() * nameList.length)];

};

export const makeid = function (length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function nextPrime(value) {
  if (value > 2) {
    var i, q;
    do {
      i = 3;
      value += 2;
      q = Math.floor(Math.sqrt(value));
      while (i <= q && value % i) {
        i += 2;
      }
    } while (i <= q);
    return value;
  }
  return value === 2 ? 3 : 2;
}


export const generatePrime = function (userValue) {
  var value = 0, result = [];
  for (var i = 0; i < userValue; i++) {
    value = nextPrime(value);
    result.push(value);
  }

  return value;
}

export const fetchVideoData = async (url) => {
  try {
    const data = await fetch(url);
    const json = await data.json();
    if (json.items && json.items.length > 0) {
      return json;
    }
    throw new Error('API limits exceeded or no key provided');
  } catch (error) {
    console.warn("Using fallback mock data due to API failure:", error);
    const mockItems = Array.from({ length: 20 }).map((_, i) => ({
      id: `mock-video-id-${Date.now()}-${i}`,
      snippet: {
        thumbnails: { high: { url: `https://picsum.photos/600/340?random=${i}` } },
        localized: { title: `Mock Youtube Video Title - Interview Demo #${i + 1} - React Mastery` },
        channelTitle: `Awesome Channel ${i + 1}`,
      },
      contentDetails: { duration: `PT${Math.floor(Math.random() * 20 + 2)}M${Math.floor(Math.random() * 59)}S` },
      statistics: { 
        viewCount: `${Math.floor(Math.random() * 1000000 + 50000)}`,
        likeCount: `${Math.floor(Math.random() * 100000 + 5000)}` 
      }
    }));
    return { items: mockItems, nextPageToken: `mock-page-${Date.now()}` };
  }
}