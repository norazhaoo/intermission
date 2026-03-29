import { Show } from './types'

/** 预置音乐剧种子数据 */
export const SEED_SHOWS: Show[] = [
  {
    id: 'phantom',
    title: 'The Phantom of the Opera',
    composer: 'Andrew Lloyd Webber',
    synopsis: 'A disfigured musical genius haunts the Paris Opera House, where he falls in love with a young soprano and terrorizes the opera company to make her its star.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9a/The_Phantom_of_the_Opera_%281986_London_Cast%29_CD_cover.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Majestic Theatre',
    runDates: '1988 - 2023',
    isRunning: false,
    cast: [
      { name: 'Michael Crawford', role: 'The Phantom' },
      { name: 'Sarah Brightman', role: 'Christine Daaé' },
      { name: 'Steve Barton', role: 'Raoul' },
      { name: 'Judy Kaye', role: 'Carlotta Giudicelli' }
    ],
    awards: ['Tony Award for Best Musical', 'Tony Award for Best Direction', 'Olivier Award for Best New Musical'],
    productionHistory: [
      { year: '1986', description: 'World premiere at Her Majesty\'s Theatre, London' },
      { year: '1988', description: 'Opens on Broadway at Majestic Theatre' },
      { year: '2023', description: 'Closes on Broadway after 35 years' }
    ],
    reviews: [
      { id: 'r1', rating: 5, text: 'A timeless masterpiece that transcends generations.', reviewerName: 'Theater Lover', reviewerInitials: 'TL', date: '2024-03-15' }
    ],
    createdAt: '2024-01-01'
  },
  {
    id: 'hamilton',
    title: 'Hamilton',
    composer: 'Lin-Manuel Miranda',
    synopsis: 'The story of American Founding Father Alexander Hamilton, told through hip-hop, jazz, blues, rap, R&B, and Broadway music.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/83/Hamilton-poster.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Richard Rodgers Theatre',
    runDates: '2015 - Present',
    isRunning: true,
    cast: [
      { name: 'Lin-Manuel Miranda', role: 'Alexander Hamilton' },
      { name: 'Leslie Odom Jr.', role: 'Aaron Burr' },
      { name: 'Daveed Diggs', role: 'Marquis de Lafayette / Thomas Jefferson' },
      { name: 'Renée Elise Goldsberry', role: 'Angelica Schuyler' }
    ],
    awards: ['Pulitzer Prize for Drama', 'Tony Award for Best Musical', 'Grammy Award for Best Musical Theater Album'],
    createdAt: '2024-01-01'
  },
  {
    id: 'les-mis',
    title: 'Les Misérables',
    composer: 'Claude-Michel Schönberg',
    synopsis: 'In 19th-century France, Jean Valjean is released after serving 19 years in prison and must rebuild his life while being pursued by the relentless Inspector Javert.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Les_Mis%C3%A9rables_poster.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Imperial Theatre',
    runDates: '1987 - 2003',
    isRunning: false,
    cast: [
      { name: 'Colm Wilkinson', role: 'Jean Valjean' },
      { name: 'Terrence Mann', role: 'Inspector Javert' },
      { name: 'Randy Graff', role: 'Fantine' }
    ],
    awards: ['Tony Award for Best Musical', 'Tony Award for Best Book', 'Olivier Award for Best New Musical'],
    createdAt: '2024-01-01'
  },
  {
    id: 'wicked',
    title: 'Wicked',
    composer: 'Stephen Schwartz',
    synopsis: 'The untold story of the witches of Oz — how Elphaba, the future Wicked Witch of the West, and Glinda, the Good Witch, become unlikely friends.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Wicked_poster.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Gershwin Theatre',
    runDates: '2003 - Present',
    isRunning: true,
    cast: [
      { name: 'Idina Menzel', role: 'Elphaba' },
      { name: 'Kristin Chenoweth', role: 'Glinda' },
      { name: 'Joel Grey', role: 'The Wizard' }
    ],
    awards: ['Tony Award for Best Actress', 'Grammy Award for Best Musical Theater Album'],
    createdAt: '2024-01-01'
  },
  {
    id: 'lion-king',
    title: 'The Lion King',
    composer: 'Elton John & Tim Rice',
    synopsis: 'Young lion prince Simba must overcome betrayal and tragedy to reclaim his rightful place as king of the Pride Lands.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9d/The_Lion_King_Musical.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Minskoff Theatre',
    runDates: '1997 - Present',
    isRunning: true,
    cast: [
      { name: 'Jason Raize', role: 'Simba' },
      { name: 'John Vickery', role: 'Scar' },
      { name: 'Samuel E. Wright', role: 'Mufasa' }
    ],
    awards: ['Tony Award for Best Musical', 'Tony Award for Best Direction'],
    createdAt: '2024-01-01'
  },
  {
    id: 'chicago',
    title: 'Chicago',
    composer: 'John Kander & Fred Ebb',
    synopsis: 'Set in 1920s Chicago during the era of jazz, the story follows Roxie Hart and Velma Kelly — two murderesses who compete for fame and lawyers.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Chicago_the_Musical_logo.svg',
    region: 'broadway',
    language: 'English',
    theater: 'Ambassador Theatre',
    runDates: '1996 - Present',
    isRunning: true,
    cast: [
      { name: 'Ann Reinking', role: 'Roxie Hart' },
      { name: 'Bebe Neuwirth', role: 'Velma Kelly' },
      { name: 'James Naughton', role: 'Billy Flynn' }
    ],
    awards: ['Tony Award for Best Revival', 'Tony Award for Best Actress'],
    createdAt: '2024-01-01'
  },
  {
    id: 'rent',
    title: 'Rent',
    composer: 'Jonathan Larson',
    synopsis: 'A group of artists and musicians struggle to live and create under the shadow of HIV/AIDS in New York\'s East Village.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/22/Rent_poster.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Nederlander Theatre',
    runDates: '1996 - 2008',
    isRunning: false,
    cast: [
      { name: 'Adam Pascal', role: 'Roger Davis' },
      { name: 'Daphne Rubin-Vega', role: 'Mimi Marquez' },
      { name: 'Anthony Rapp', role: 'Mark Cohen' },
      { name: 'Idina Menzel', role: 'Maureen Johnson' }
    ],
    awards: ['Pulitzer Prize for Drama', 'Tony Award for Best Musical'],
    createdAt: '2024-01-01'
  },
  {
    id: 'hadestown',
    title: 'Hadestown',
    composer: 'Anaïs Mitchell',
    synopsis: 'A folk opera retelling of the ancient Greek myth of Orpheus and Eurydice, set against the backdrop of a dystopian industrial underworld.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Hadestown_Musical_Logo.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Walter Kerr Theatre',
    runDates: '2019 - Present',
    isRunning: true,
    cast: [
      { name: 'Reeve Carney', role: 'Orpheus' },
      { name: 'Eva Noblezada', role: 'Eurydice' },
      { name: 'André De Shields', role: 'Hermes' },
      { name: 'Patrick Page', role: 'Hades' }
    ],
    awards: ['Tony Award for Best Musical', 'Tony Award for Best Direction', 'Grammy Award for Best Musical Theater Album'],
    createdAt: '2024-01-01'
  },
  {
    id: 'cats',
    title: 'Cats',
    composer: 'Andrew Lloyd Webber',
    synopsis: 'A tribe of cats called the Jellicles make the "Jellicle choice," deciding which cat will ascend to the Heaviside Layer and be reborn.',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3e/CatsMusicalLogo.jpg',
    region: 'broadway',
    language: 'English',
    theater: 'Winter Garden Theatre',
    runDates: '1982 - 2000',
    isRunning: false,
    cast: [
      { name: 'Betty Buckley', role: 'Grizabella' },
      { name: 'Ken Page', role: 'Old Deuteronomy' },
      { name: 'Terrence Mann', role: 'Rum Tum Tugger' }
    ],
    awards: ['Tony Award for Best Musical', 'Olivier Award for Best New Musical'],
    createdAt: '2024-01-01'
  }
]
