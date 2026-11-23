/* =========================================================
   VINENDDER — DREAM CV · ALL YOUR INFO LIVES IN THIS FILE
   Edit text between the quotes. Add a row by copying a
   { ... }, line. Delete a row by deleting its line.
   Never touch index.html or main.js to change content.
   ========================================================= */
window.CV = {

  /* ---------- HOME ---------- */
  home: {
    title: 'Dream CV',                       // first letter becomes the big swash capital
    name: 'Vinendder Singh Bassi',
    tagline: 'Robotics & Automation, 1st year.',
    metaLabel: 'Curriculum Vitae',
    date: 'November, 2026',
    photo: '',                               // e.g. 'img/me.jpg'. Leave empty to show the monogram
    monogram: 'V',
    caption: 'Future roboticist ^-^',
    about: [
      'Hi, I\'m Vinendder, a first-year Robotics and Automation student at Lovely Professional University. I build things end to end, from Arduino sensor rigs to PyTorch models, and I work as a generalist at ScalarAI.',
      'This is the CV I am building towards: where I want to work, what I still have to learn, and the plan to get there.'
    ],
    links: [
      { label: 'Email',     url: 'mailto:vinenddersingh@gmail.com' },
      { label: 'GitHub',    url: 'https://github.com/Vinendder' },
      { label: 'Portfolio', url: 'https://vinendder.github.io/Portfolio' }
    ],
    nav: {                                   // which button sits where (use the page keys below)
      top:  ['plan'],
      side: ['companies', 'skills', 'chasing'],
      foot: ['projects', 'internships', 'company']
    }
  },

  /* ---------- PAGE HEADINGS (button text, heading, small line in the top bar) ---------- */
  pages: {
    companies:   { n: 1, button: 'Dream companies',     title: 'Dream companies',  eyebrow: 'Where I want to build',   intro: 'The teams I would love to join full time.' },
    skills:      { n: 2, button: 'Skills',              title: 'Skills',           eyebrow: 'What I use now',          intro: 'Learned by building, one project at a time.' },
    chasing:     { n: 3, button: 'Skills I\'m chasing', title: 'Levelling up',     eyebrow: 'Tap a skill to tick it', intro: 'What I am learning next, in my own words.' },
    projects:    { n: 4, button: 'Projects',            title: 'Projects',         eyebrow: 'Things I have built',     intro: 'Finished, ongoing and soon to start.' },
    plan:        { n: 5, button: 'Career plan',         title: 'Career plan',      eyebrow: 'The road ahead',          intro: '' },
    internships: { n: 6, button: 'Internship targets',  title: 'Internships',      eyebrow: 'Where I want to learn',   intro: 'Places I want to learn from before I graduate.' },
    company:     { n: 7, button: 'My own company',      title: 'My company',       eyebrow: 'The long game',           intro: '' }
  },

  /* ---------- 01 DREAM COMPANIES ---------- */
  companies: [
    { title: 'Boston Dynamics', text: 'Legged and mobile robots that balance, adapt and do useful work in the real world.' },
    { title: 'NVIDIA',          text: 'Simulation, Jetson and robot learning: where my vision and RL work would scale up.' },
    { title: 'Google DeepMind', text: 'Reinforcement learning research, the field my CarAI simulation is a first step into.' },
    { title: 'DRDO',            text: 'Autonomy and robotics for Defence and Survey missions. The dream closest to home.' }
  ],

  /* ---------- 02 SKILLS ---------- */
  skills: [
    { title: 'Languages',                text: 'Python, C, Luau.' },
    { title: 'Libraries & frameworks',   text: 'OpenCV, PyTorch, ResNet.' },
    { title: 'Hardware',                 text: 'Arduino, ultrasonic sensors, ESP32.' },
    { title: 'Areas',                    text: 'Computer vision, reinforcement learning, deep learning, embedded systems.' }
  ],

  /* ---------- 03 SKILLS I'M CHASING (these become tick-able goals) ---------- */
  chasing: [
    { title: 'Making Custom Neural Networks from complete scratch',     text: 'Forward pass, backprop and Adam in plain NumPy, no frameworks.' },
    { title: 'C++, MicroPython',                        text: 'Essential for hardware.' },
    { title: 'Hardware and wireless robotics',          text: 'Robot-to-Robot messaging with hardware.' },
    { title: 'LIDAR & SLAM',                            text: 'Stream a live map of obstacles from a robot to my Mac.' },
    { title: 'CAD, Solidworks & Fusion',                text: 'Needed for my robotics coursework.' },
    { title: 'Embedded systems',                        text: 'More Raw Exploration and Experimenting.' },
    { title: 'Custom 256-bit and 512-bit encryption',   text: 'Designing my own algorithms from the ground up.' }
  ],

  /* ---------- 04 PROJECTS ---------- */
  projects: [
    { title: 'Object Recognition System',   text: 'A Python and OpenCV program that detects and recognises objects, correctly identifying 59 of 60 test samples.', stack: 'Python · OpenCV' },
    { title: 'CarAI Simulation',            text: 'A simulated self-driving car trained with a DQN agent that learns to navigate multiple custom race tracks.', stack: 'Python · PyTorch · Reinforcement learning' },
    { title: 'Electronics Parts Classifier', text: 'A fine-tuned ResNet18 that recognises four electronic parts from photos, reaching about 98% validation accuracy.', stack: 'PyTorch · ResNet18' },
    { title: 'Text Chatbot from Scratch',   text: 'A chatbot built from the ground up, progressing from text prediction to attention to full conversation. Ongoing.', stack: 'PyTorch · Attention' },
    { title: 'Obstacle-Avoidance Car',      text: 'An ESP32 robot car with manual and automatic modes. Ongoing.', stack: 'ESP32 · Ultrasonic sensor · Motor drivers' }
  ],

  /* ---------- 05 CAREER PLAN (a timeline, newest goal at the bottom) ---------- */
  plan: [
    { when: '2026 — 2027 · Year 1', title: 'Foundations',                   text: 'Solid Python and C, PyTorch from scratch, and the car and chatbot projects finished. Started at ScalarAI.' },
    { when: '2027 — 2028 · Year 2', title: 'AI/ML minor',                    text: 'Go deeper into reinforcement learning and attention models, build the swarm cars, and land a first internship.' },
    { when: '2028 — 2029 · Year 3', title: 'Embedded minor and placements', text: 'Ship an embedded-heavy project, sit the LPU placement drive and complete a second internship.' },
    { when: '2029 — 2030 · Year 4', title: 'Specialise',                     text: 'A final-year project in autonomous robotics, then choose between a dream-company offer and further research.' },
    { when: '2030 and beyond',      title: 'Dream job',                      text: 'Join a team on the dream companies list and work on robots that think.' },
    { when: 'Later',                title: 'My own company',                text: 'Take everything I learned and build a robotics company of my own.' }
  ],

  /* ---------- 06 INTERNSHIP TARGETS ---------- */
  internships: [
    { title: 'DRDO (CAIR)',   text: 'The Centre for Artificial Intelligence and Robotics, for defence robotics and AI research.' },
    { title: 'Bosch Robotics',          text: 'Research internships close to space robotics and autonomy.' },
    { title: 'Ati Motors',    text: 'Autonomous vehicles for industrial floors: perception and navigation in the real world.' },
    { title: 'CynLr',         text: 'Vision-guided robotics, which links straight to my computer vision work.' },
    { title: 'Addverb',       text: 'Warehouse automation and mobile robots built in India.' }
  ],

  /* ---------- 07 MY OWN COMPANY ---------- */
  company: {
    name: 'Bassi Robotics',                 // working name, change it whenever
    tagline: 'Maybe When the time is right.',
    rows: [
      
    ]
  }
};
