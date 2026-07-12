export type Room = {
  id: string;
  code: string;
  name: string;
  type: 'Office' | 'Lab' | 'Lecture Hall' | 'Hall' | 'Facility';
  capacity?: string;
  area?: string;
  description: string;
  facilities?: string[];
  panorama: string;
  pointsOfInterest?: string[];
};

export type Floor = {
  id: string;
  name: string;
  rooms: number;
  labs: number;
  offices: number;
  facilities: number;
  description: string;
  tourRooms: Room[];
};

export type Building = {
  id: string;
  number: number;
  name: string;
  short: string;
  image: string;
  thumb: string;
  pin: { top: string; left: string };
  floors: number;
  roomsCount: number;
  labsCount: number;
  departmentsCount: number;
  description: string;
  departments: string[];
  floorList: Floor[];
};

const enginePanorama = '/uploads/sphere.jpg';

const groundFloorTour: Room[] = [
  {
    id: 'main-hall',
    code: 'G-00',
    name: 'Main Hall',
    type: 'Hall',
    description:
      'The central hall of the building. You can access various departments and labs from here.',
    panorama: enginePanorama,
    pointsOfInterest: ['Staircase', 'Lab 1', 'Dean Office'],
  },
  {
    id: 'reception',
    code: 'G-02',
    name: 'Reception',
    type: 'Office',
    description: 'The front desk where visitors and students check in and get directions around the building.',
    panorama: enginePanorama,
    pointsOfInterest: ['Main Hall', 'Corridor'],
  },
  {
    id: 'corridor',
    code: 'G-05',
    name: 'Corridor',
    type: 'Hall',
    description: 'The main corridor connecting the labs, offices, and the lecture hall on the ground floor.',
    panorama: enginePanorama,
    pointsOfInterest: ['Lab 1', 'Lab 2', 'Lecture Hall'],
  },
  {
    id: 'lab-1',
    code: 'G-01',
    name: 'Computer Lab 1',
    type: 'Lab',
    capacity: '40 Students',
    area: '85 m²',
    description:
      'A fully equipped computer lab with high-performance PCs, projector, smart board, and high-speed internet access. Used for programming, data structures, and software engineering courses.',
    facilities: ['40 PCs', 'Projector', 'Smart Board', 'Air Conditioned', 'High Speed Wi-Fi'],
    panorama: enginePanorama,
  },
  {
    id: 'lab-2',
    code: 'G-04',
    name: 'Electronics Lab',
    type: 'Lab',
    capacity: '30 Students',
    area: '70 m²',
    description:
      'Equipped with oscilloscopes, signal generators, and circuit boards for practical sessions in electronics and mechatronics engineering.',
    facilities: ['Oscilloscopes', 'Signal Generators', 'Workbenches', 'Air Conditioned'],
    panorama: enginePanorama,
  },
  {
    id: 'dean-office',
    code: 'G-06',
    name: 'Dean Office',
    type: 'Office',
    description: 'The office of the Dean of the Faculty of Engineering and administrative staff.',
    panorama: enginePanorama,
  },
  {
    id: 'staircase',
    code: 'G-07',
    name: 'Staircase',
    type: 'Facility',
    description: 'Central staircase connecting all four floors of the Engineering Building.',
    panorama: enginePanorama,
  },
  {
    id: 'exit',
    code: 'G-08',
    name: 'Exit',
    type: 'Facility',
    description: 'Main exit leading back to the campus courtyard.',
    panorama: enginePanorama,
  },
];

export const buildings: Building[] = [
  {
    id: 'main-gate',
    number: 1,
    name: 'Main Gate',
    short: 'The main entrance of Helwan National University campus.',
    image: '/images/main-gate.png',
    thumb: '/images/main-gate.png',
    pin: { top: '18%', left: '34%' },
    floors: 1,
    roomsCount: 2,
    labsCount: 0,
    departmentsCount: 0,
    description: 'The main gate welcomes students, staff, and visitors to the Helwan National University campus.',
    departments: ['Security', 'Visitor Reception'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 2,
        labs: 0,
        offices: 1,
        facilities: 1,
        description: 'Security checkpoint and visitor reception.',
        tourRooms: [
          {
            id: 'gate-checkpoint',
            code: 'MG-01',
            name: 'Security Checkpoint',
            type: 'Facility',
            description: 'Entry checkpoint for all campus visitors.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
  {
    id: 'administration-building',
    number: 2,
    name: 'Administration Building',
    short: 'Home to the university administration and student affairs offices.',
    image: '/images/administration-building.png',
    thumb: '/images/administration-building.png',
    pin: { top: '30%', left: '28%' },
    floors: 3,
    roomsCount: 18,
    labsCount: 0,
    departmentsCount: 4,
    description: 'The Administration Building houses the university president office, registrar, and student affairs departments.',
    departments: ['Registrar', 'Student Affairs', 'HR', 'Finance'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 6,
        labs: 0,
        offices: 6,
        facilities: 1,
        description: 'Registrar and student affairs offices.',
        tourRooms: [
          {
            id: 'admin-reception',
            code: 'A-01',
            name: 'Reception',
            type: 'Office',
            description: 'Main reception for the administration building.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
  {
    id: 'engineering-building',
    number: 3,
    name: 'Engineering Building',
    short: 'The hub of engineering innovation and academic excellence.',
    image: '/images/engineering-building.png',
    thumb: '/images/engineering-building.png',
    pin: { top: '20%', left: '46%' },
    floors: 4,
    roomsCount: 46,
    labsCount: 18,
    departmentsCount: 3,
    description:
      'The Faculty of Engineering is dedicated to excellence in education, research, and innovation. It contains state-of-the-art labs, classrooms and administrative offices.',
    departments: ['Smart Systems Engineering', 'Mechatronics Engineering', 'Networks & Cybersecurity'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 12,
        labs: 2,
        offices: 6,
        facilities: 2,
        description: 'The ground floor includes main facilities, administrative offices, labs and lecture halls.',
        tourRooms: groundFloorTour,
      },
      {
        id: 'first',
        name: 'First Floor',
        rooms: 14,
        labs: 4,
        offices: 7,
        facilities: 1,
        description: 'Home to the Mechatronics Engineering department labs and staff offices.',
        tourRooms: [],
      },
      {
        id: 'second',
        name: 'Second Floor',
        rooms: 11,
        labs: 5,
        offices: 6,
        facilities: 1,
        description: 'Home to the Networks & Cybersecurity department labs and staff offices.',
        tourRooms: [],
      },
      {
        id: 'third',
        name: 'Third Floor',
        rooms: 9,
        labs: 7,
        offices: 5,
        facilities: 1,
        description: 'Research labs and the Smart Systems Engineering department.',
        tourRooms: [],
      },
    ],
  },
  {
    id: 'library',
    number: 4,
    name: 'Library',
    short: 'Central library with study halls and digital resources.',
    image: '/images/library.png',
    thumb: '/images/library.png',
    pin: { top: '22%', left: '58%' },
    floors: 2,
    roomsCount: 12,
    labsCount: 0,
    departmentsCount: 1,
    description: 'The central library offers study halls, digital archives, and quiet reading rooms for all students.',
    departments: ['Library Services'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 6,
        labs: 0,
        offices: 2,
        facilities: 4,
        description: 'Book stacks, reading halls, and circulation desk.',
        tourRooms: [
          {
            id: 'reading-hall',
            code: 'L-01',
            name: 'Reading Hall',
            type: 'Hall',
            description: 'A quiet space for individual study, seating 120 students.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
  {
    id: 'smart-systems-building',
    number: 5,
    name: 'Smart Systems Building',
    short: 'Dedicated labs for AI, robotics, and smart systems research.',
    image: '/images/smart-systems-building.png',
    thumb: '/images/smart-systems-building.png',
    pin: { top: '38%', left: '52%' },
    floors: 3,
    roomsCount: 24,
    labsCount: 10,
    departmentsCount: 2,
    description: 'Purpose-built labs supporting AI, robotics, IoT, and intelligent systems research.',
    departments: ['Intelligent Systems', 'Robotics'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 8,
        labs: 4,
        offices: 2,
        facilities: 1,
        description: 'AI and robotics research labs.',
        tourRooms: [
          {
            id: 'ai-lab',
            code: 'S-01',
            name: 'AI Research Lab',
            type: 'Lab',
            description: 'GPU workstations for machine learning and AI research projects.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
  {
    id: 'water-tower',
    number: 6,
    name: 'Water Tower',
    short: 'Campus landmark and water supply facility.',
    image:
      'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=400&q=80',
    pin: { top: '25%', left: '70%' },
    floors: 1,
    roomsCount: 1,
    labsCount: 0,
    departmentsCount: 0,
    description: 'A recognizable campus landmark visible from most of the university grounds.',
    departments: ['Facilities Management'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 1,
        labs: 0,
        offices: 0,
        facilities: 1,
        description: 'Maintenance access to the water tower.',
        tourRooms: [
          {
            id: 'tower-base',
            code: 'WT-01',
            name: 'Tower Base',
            type: 'Facility',
            description: 'Base access point for maintenance staff.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
  {
    id: 'student-center',
    number: 7,
    name: 'Student Center',
    short: 'Cafeterias, clubs, and student activity spaces.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80',
    pin: { top: '52%', left: '30%' },
    floors: 2,
    roomsCount: 15,
    labsCount: 0,
    departmentsCount: 3,
    description: 'The heart of student life on campus with cafeterias, club rooms, and activity halls.',
    departments: ['Student Activities', 'Cafeteria Services', 'Clubs & Societies'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 8,
        labs: 0,
        offices: 2,
        facilities: 6,
        description: 'Cafeteria and open seating areas.',
        tourRooms: [
          {
            id: 'cafeteria',
            code: 'SC-01',
            name: 'Cafeteria',
            type: 'Facility',
            description: 'The main student cafeteria, seating up to 300 students.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
  {
    id: 'mosque',
    number: 8,
    name: 'Mosque',
    short: 'Campus mosque serving students, faculty, and staff.',
    image:
      'https://images.unsplash.com/photo-1545167496-28be8f7d5e76?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1545167496-28be8f7d5e76?auto=format&fit=crop&w=400&q=80',
    pin: { top: '48%', left: '55%' },
    floors: 1,
    roomsCount: 3,
    labsCount: 0,
    departmentsCount: 0,
    description: 'A peaceful place of worship at the center of the campus.',
    departments: ['Campus Facilities'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 3,
        labs: 0,
        offices: 0,
        facilities: 3,
        description: 'Main prayer hall and ablution area.',
        tourRooms: [
          {
            id: 'prayer-hall',
            code: 'MQ-01',
            name: 'Prayer Hall',
            type: 'Hall',
            description: 'The main prayer hall of the campus mosque.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
  {
    id: 'sports-complex',
    number: 9,
    name: 'Sports Complex',
    short: 'Football pitch, running track, and indoor sports halls.',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
    pin: { top: '58%', left: '46%' },
    floors: 1,
    roomsCount: 6,
    labsCount: 0,
    departmentsCount: 1,
    description: 'Outdoor and indoor sports facilities including a football pitch and running track.',
    departments: ['Athletics Department'],
    floorList: [
      {
        id: 'ground',
        name: 'Ground Floor',
        rooms: 6,
        labs: 0,
        offices: 1,
        facilities: 5,
        description: 'Changing rooms, gym, and equipment storage.',
        tourRooms: [
          {
            id: 'gym',
            code: 'SP-01',
            name: 'Gym',
            type: 'Facility',
            description: 'Indoor gym with fitness equipment for student athletes.',
            panorama: enginePanorama,
          },
        ],
      },
    ],
  },
];

export function getBuilding(id: string): Building | undefined {
  return buildings.find((b) => b.id === id);
}

export function getFloor(building: Building, floorId: string): Floor | undefined {
  return building.floorList.find((f) => f.id === floorId);
}

export const campusStats = {
  buildings: buildings.length,
  pointsOfInterest: buildings.reduce((sum, b) => sum + b.roomsCount, 0),
};

export const sidebarNav = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Buildings', href: '/buildings', icon: 'buildings' },
  { label: 'Campus Map', href: '/', icon: 'map' },
  { label: 'Favorites', href: '/', icon: 'star' },
  { label: 'Recent', href: '/', icon: 'clock' },
  { label: 'Emergency', href: '/', icon: 'alert' },
  { label: 'Accessibility', href: '/', icon: 'accessibility' },
  { label: 'Settings', href: '/', icon: 'settings' },
] as const;
