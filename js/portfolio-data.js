/**
 * Hexasolv Portfolio Data
 * Central repository of all production client work and case studies.
 * Global variable PORTFOLIO_DATA & CASE_STUDIES_DATA bypasses CORS issues on local file execution.
 */

const PORTFOLIO_DATA = [
  {
    id: "blood-bridge",
    title: "Blood Bridge Pro",
    category: "Full-Stack Web App",
    dataCategory: "fullstack",
    badge: "Live System",
    description: "Production blood donation network featuring donor lookup, QR verification, AI chatbot, SMTP alerts, and donor dashboard.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-blood-bridge.webp",
    fallbackImage: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&auto=format&fit=crop&q=80",
    techs: ["Laravel", "MySQL", "REST API"],
    link: "https://bloodbridge.infinityfreeapp.com",
    target: "_blank"
  },
  {
    id: "vyapar",
    title: "Vyapar POS System",
    category: "POS & Enterprise",
    dataCategory: "desktop",
    badge: "Client (France)",
    description: "Retail Point-of-Sale solution engineered for a European store client with barcode billing, inventory logs, and PDF invoicing.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-vyapar.webp",
    fallbackImage: "https://images.unsplash.com/photo-1556742049-0a67daf4095a?w=600&auto=format&fit=crop&q=80",
    techs: ["Laravel", "POS Engine", "PDF Generation"],
    link: "contact.html",
    target: "_self"
  },
  {
    id: "kinnow",
    title: "KinnowFactory Software",
    category: "Desktop Application",
    dataCategory: "desktop",
    badge: "Desktop Suite",
    description: "Operational WPF desktop suite managing factory labor, raw citrus grading (Tapa A/B/C), ledger balances, and offline SQLite reports.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-kinnow.webp",
    fallbackImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
    techs: [".NET 8 / WPF", "C#", "SQLite"],
    link: "contact.html",
    target: "_self"
  },
  {
    id: "foodbreak",
    title: "The FoodBreak",
    category: "WordPress & E-Commerce",
    dataCategory: "cms",
    badge: "Live Business",
    description: "High-traffic restaurant portal featuring online takeaway food ordering, responsive menus, and custom WooCommerce setup.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-foodbreak.webp",
    fallbackImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    techs: ["WordPress", "WooCommerce", "Custom Theme"],
    link: "https://thefoodbreaksgd.com/",
    target: "_blank"
  },
  {
    id: "toolkit",
    title: "Business Toolkit",
    category: "SaaS & Business Tools",
    dataCategory: "fullstack",
    badge: "Web SaaS",
    description: "Productivity web application for small businesses offering staff tracking, automated invoice generation, and expense analytics.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-business.webp",
    fallbackImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    techs: ["Laravel", "MySQL", "Analytics"],
    link: "contact.html",
    target: "_self"
  },
  {
    id: "wedding",
    title: "Event & Wedding Portal",
    category: "WordPress Theme",
    dataCategory: "cms",
    badge: "CMS Portal",
    description: "Luxury event website with custom gallery carousels, instant RSVP form submission, and responsive layout.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-wedding.webp",
    fallbackImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80",
    techs: ["WordPress", "PHP", "JS Animations"],
    link: "https://wedding.canvasolutionsllc.com/",
    target: "_blank"
  },
  {
    id: "youtube-dl",
    title: "YouTube Video Downloader",
    category: "Utility Tool",
    dataCategory: "fullstack",
    badge: "Web Application",
    description: "Clean, responsive web tool built with HTML5, CSS3, and JavaScript featuring instant video URL parsing and modern UI.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-youtube.webp",
    fallbackImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
    techs: ["HTML5 / CSS3", "JavaScript", "REST API"],
    link: "contact.html",
    target: "_self"
  },
  {
    id: "music-manager",
    title: "Music Playlist Manager",
    category: "C++ / Data Structures",
    dataCategory: "desktop",
    badge: "Academic Project",
    description: "Application demonstrating core logic, data structures, and database management for dynamic music playlist control.",
    image: "https://arslan-professional-portfolio.netlify.app/images/project-music.webp",
    fallbackImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    techs: ["C / C++", "Data Structures", "Database"],
    link: "contact.html",
    target: "_self"
  }
];

const CASE_STUDIES_DATA = [
  {
    id: "cs-vyapar",
    stat: "65% Faster",
    title: "Vyapar POS — Retail Checkout Acceleration",
    description: "Engineered custom barcode processing, offline caching, and instant PDF invoice engine for a retail store client in France.",
    techs: ["Laravel POS", "Offline Cache", "PDF Engine"],
    duration: "4 Weeks",
    problem: "The client ran a high-traffic retail outlet in France where manual checkout queues were causing significant cart abandonment. Their legacy system failed to parse barcodes quickly and lacked robust offline capabilities during network drops.",
    solution: "We architected a customized Point-of-Sale web dashboard using Laravel with an integrated SQLite local cache. The system buffers transactional data locally and syncing automatically once connectivity is restored. Barcode scans are parsed using client-side JavaScript regex optimizations, triggering instant invoice outputs via a custom headless HTML-to-PDF rendering engine.",
    impact: "Checkout transaction speed was reduced from 45 seconds to just 15 seconds (65% faster). Automated invoicing saved manual administrative hours, leading to a direct increase in daily sales volume."
  },
  {
    id: "cs-foodbreak",
    stat: "+120% Sales",
    title: "The FoodBreak — E-Commerce Growth",
    description: "Overhauled mobile UI/UX, streamlined checkout workflow, and integrated real-time order notifications for restaurant takeaway.",
    techs: ["WooCommerce", "Custom UI", "SEO Pro"],
    duration: "3 Weeks",
    problem: "The FoodBreak had a sluggish online ordering interface. Over 70% of potential orders dropped during mobile navigation due to slow page routing, and customers had no clear notification whether the kitchen had accepted their orders.",
    solution: "We completely overhauled the mobile interface using dynamic AJAX pagination and a highly polished single-page checkout modal. Additionally, we set up a real-time order status engine using Webhooks and Twilio integration to instantly notify both the kitchen terminal and the client's WhatsApp upon checkout confirmation.",
    impact: "Takeaway order conversion rates spiked dramatically, boosting daily sales by 120% within the first month. Page loading times fell to under 1.2 seconds site-wide."
  },
  {
    id: "cs-blood-bridge",
    stat: "1,500+ Donors",
    title: "Blood Bridge Pro — Emergency Lifesaving Network",
    description: "Architected QR verification system, location-based donor search algorithms, and automated SMTP alert workflows.",
    techs: ["Laravel", "MySQL API", "QR Engine"],
    duration: "5 Weeks",
    problem: "Local hospitals faced severe delays matching critical patients with blood donors. Manual lists were outdated, and verifying donor eligibility (days since last donation) was slow and error-prone.",
    solution: "We designed a unified web network using location geolocation lookups (Haversine Formula) to instantly map the closest active donors. A secure QR verification engine was built to validate donor identity at testing centers, automatically updating donor cooldown states in a secure MySQL database.",
    impact: "Over 1,500 local donors successfully registered. The emergency donor matching loop was shortened from hours to under 4 minutes, saving lives during urgent hospital callouts."
  }
];
