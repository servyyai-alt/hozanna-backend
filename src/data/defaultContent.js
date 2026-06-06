const services = [
  {
    title: "Warehouse Shed Works",
    slug: "warehouse-shed-works",
    category: "Commercial Sheds",
    summary: "Heavy-duty steel warehouse sheds built for logistics, storage, and industrial operations.",
    description:
      "Hosanna Enterprises delivers warehouse shed solutions with optimized spans, ventilation, loading access, and corrosion-resistant fabrication details.",
    features: ["Custom span design", "Crane-ready framing", "Fast-track erection"],
    image: {
      url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      alt: "Warehouse steel shed",
    },
    isFeatured: true,
    order: 1,
  },
  {
    title: "Pergola Works",
    slug: "pergola-works",
    category: "Architectural Steel",
    summary: "Durable metal pergolas that add shade and premium curb appeal to commercial sites.",
    description:
      "Our pergola systems combine fabrication precision with weather-ready coatings for rooftops, courtyards, and hospitality environments.",
    features: ["Powder-coated finish", "Modern modular detailing", "Site-specific fabrication"],
    image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      alt: "Metal pergola",
    },
    order: 2,
  },
  {
    title: "Turf & Badminton Court Shed",
    slug: "turf-badminton-court-shed",
    category: "Sports Infrastructure",
    summary: "High-clearance court sheds engineered for lighting, airflow, and spectator comfort.",
    description:
      "We fabricate sports shed envelopes that support turf arenas and badminton courts with controlled spans and durable roof systems.",
    features: ["High-bay lighting support", "Wide clear spans", "Rain and heat protection"],
    image: {
      url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
      alt: "Sports shed",
    },
    order: 3,
  },
  {
    title: "Lattice Sheet Works",
    slug: "lattice-sheet-works",
    category: "Cladding",
    summary: "Decorative and protective lattice sheet fabrication for facades and boundaries.",
    description:
      "From industrial screens to stylish partitions, we build lattice assemblies that balance airflow, durability, and visual identity.",
    features: ["Laser-cut patterns", "Powder coating", "Facade integration"],
    image: {
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      alt: "Lattice works",
    },
    order: 4,
  },
  {
    title: "Poultry Farm Shed",
    slug: "poultry-farm-shed",
    category: "Agriculture",
    summary: "Ventilated poultry sheds designed for productivity, hygiene, and operational ease.",
    description:
      "Our poultry shed packages support environmental control, side cladding, and efficient internal circulation layouts.",
    features: ["Ventilation planning", "Low-maintenance cladding", "Scalable modules"],
    image: {
      url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80",
      alt: "Poultry farm shed",
    },
    order: 5,
  },
  {
    title: "Roofing Side Cover Works",
    slug: "roofing-side-cover-works",
    category: "Roofing",
    summary: "Complete roofing and side cladding systems for weatherproof industrial buildings.",
    description:
      "We install side covers and roof assemblies that improve weather protection, heat management, and asset life.",
    features: ["Leak-resistant overlaps", "Heat control layers", "Custom flashing details"],
    image: {
      url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
      alt: "Roofing works",
    },
    order: 6,
  },
  {
    title: "PEB Structure Works",
    slug: "peb-structure-works",
    category: "Industrial Structures",
    summary: "Pre-engineered building systems for efficient, scalable commercial construction.",
    description:
      "We design, fabricate, and erect PEB solutions that reduce construction time while maintaining structural performance.",
    features: ["Optimized steel weight", "Rapid installation", "Industrial-grade detailing"],
    image: {
      url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      alt: "PEB structure",
    },
    isFeatured: true,
    order: 7,
  },
  {
    title: "SS & MS Main Gates",
    slug: "ss-ms-main-gates",
    category: "Entrance Systems",
    summary: "Bespoke stainless steel and mild steel gates built for security and brand presence.",
    description:
      "Our gate fabrication team produces durable entrance systems for industries, villas, campuses, and warehouses.",
    features: ["Motor-ready options", "Decorative patterns", "Heavy-duty locking frames"],
    image: {
      url: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
      alt: "Steel gate",
    },
    order: 8,
  },
  {
    title: "Cast Iron Spiral Staircase",
    slug: "cast-iron-spiral-staircase",
    category: "Custom Fabrication",
    summary: "Elegant spiral staircase fabrication with structural safety and ornamental detailing.",
    description:
      "We create spiral staircases for industrial access and premium feature installations using cast iron and steel combinations.",
    features: ["Compact footprint", "Decorative balusters", "Safe anti-slip steps"],
    image: {
      url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
      alt: "Spiral staircase",
    },
    order: 9,
  },
  {
    title: "Rocket Stove Manufacturing",
    slug: "rocket-stove-manufacturing",
    category: "Specialty Products",
    summary: "Efficient rocket stove fabrication for commercial, institutional, and rural applications.",
    description:
      "We manufacture durable stoves with optimized combustion and material quality tailored to repeated use environments.",
    features: ["Fuel-efficient design", "Heavy-gauge fabrication", "Bulk supply support"],
    image: {
      url: "https://images.unsplash.com/photo-1517976487492-576ea6b2936d?auto=format&fit=crop&w=1200&q=80",
      alt: "Rocket stove",
    },
    order: 10,
  },
  {
    title: "Fabrication Services",
    slug: "fabrication-services",
    category: "General Fabrication",
    summary: "End-to-end metal fabrication for industrial, architectural, and commercial needs.",
    description:
      "From concept detailing to installation, we deliver fabrication packages for structural members, brackets, frames, and custom assemblies.",
    features: ["Shop drawing support", "Precision cutting and welding", "On-site installation"],
    image: {
      url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      alt: "Fabrication workshop",
    },
    isFeatured: true,
    order: 11,
  },
  {
    title: "Industrial Shed Construction",
    slug: "industrial-shed-construction",
    category: "Turnkey Construction",
    summary: "Turnkey industrial sheds from foundation coordination through steel erection and enclosure.",
    description:
      "We handle planning, fabrication, erection, roofing, side covers, and fit-out coordination for robust industrial sheds.",
    features: ["Turnkey execution", "Schedule-driven delivery", "Single-vendor accountability"],
    image: {
      url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      alt: "Industrial shed construction",
    },
    order: 12,
  },
];

const projects = [
  {
    title: "High-Capacity Logistics Warehouse",
    slug: "high-capacity-logistics-warehouse",
    category: "Warehouse",
    summary: "48,000 sq.ft. logistics shed with dock access and heavy-duty steel frame.",
    description:
      "A complete industrial warehouse package including wide-span roof framing, insulated cladding, and trailer movement planning.",
    location: "Coimbatore, Tamil Nadu",
    clientName: "Southline Logistics",
    completedOn: new Date("2025-05-12"),
    thumbnail: {
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      alt: "Warehouse project",
    },
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1586528116493-86ae7655465e?auto=format&fit=crop&w=1200&q=80", alt: "Warehouse exterior" },
      { url: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80", alt: "Warehouse interior" },
    ],
    beforeImages: [
      { url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80", alt: "Before warehouse construction" },
    ],
    afterImages: [
      { url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80", alt: "Completed warehouse construction" },
    ],
    features: ["Docking bays", "Insulated roofing", "Fire access routes"],
    status: "completed",
    isFeatured: true,
  },
  {
    title: "Covered Badminton Arena",
    slug: "covered-badminton-arena",
    category: "Sports",
    summary: "Steel badminton court shed built for heat reduction and glare-controlled play.",
    description:
      "An indoor sports structure with optimized truss depth, side ventilation, and spectator seating canopies.",
    location: "Madurai, Tamil Nadu",
    clientName: "Apex Sports",
    completedOn: new Date("2024-11-18"),
    thumbnail: {
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      alt: "Badminton court shed",
    },
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80", alt: "Sports shed overview" },
    ],
    beforeImages: [
      { url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80", alt: "Court site before construction" },
    ],
    afterImages: [
      { url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80", alt: "Completed indoor sports court" },
    ],
    features: ["Glare control", "Clear-span court", "Rain-safe circulation"],
    status: "completed",
  },
  {
    title: "Turnkey Poultry Shed Cluster",
    slug: "turnkey-poultry-shed-cluster",
    category: "Agriculture",
    summary: "Multi-bay poultry farm sheds with ventilated sides and durable enclosure system.",
    description:
      "Turnkey fabrication and erection for a poultry operator scaling production with efficient, low-maintenance steel sheds.",
    location: "Erode, Tamil Nadu",
    clientName: "Golden Farms",
    completedOn: new Date("2025-02-03"),
    thumbnail: {
      url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
      alt: "Poultry shed project",
    },
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80", alt: "Poultry shed facade" },
    ],
    beforeImages: [
      { url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80", alt: "Open site before farm shed" },
    ],
    afterImages: [
      { url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80", alt: "Completed poultry shed" },
    ],
    features: ["Ventilation-ready", "Washable surfaces", "Future expansion layout"],
    status: "completed",
  },
];

const testimonials = [
  {
    clientName: "Prakash N",
    company: "Southline Logistics",
    designation: "Operations Head",
    rating: 5,
    review:
      "Hosanna Enterprises delivered our warehouse shed with disciplined execution, clean steel detailing, and strong project communication.",
    location: "Coimbatore",
    isFeatured: true,
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    clientName: "Ranjitha S",
    company: "Apex Sports",
    designation: "Facility Director",
    rating: 5,
    review:
      "The badminton court shed looks premium and performs well in heat and rain. The team handled fabrication and site issues confidently.",
    location: "Madurai",
    isFeatured: true,
  },
  {
    clientName: "Daniel Raj",
    company: "Golden Farms",
    designation: "Managing Partner",
    rating: 4,
    review:
      "Their poultry shed system was practical, durable, and completed on time. The post-handover support has also been reliable.",
    location: "Erode",
  },
];

const blogs = [
  {
    title: "How to Choose the Right Industrial Shed for Long-Term Expansion",
    slug: "choose-right-industrial-shed-for-expansion",
    excerpt: "A practical guide to span sizing, cladding choices, ventilation, and lifecycle thinking for industrial shed projects.",
    content:
      "Industrial shed planning should start with future expansion, material handling routes, heat loads, and lifecycle maintenance. Hosanna Enterprises recommends beginning with a capacity roadmap, then aligning steel sections, bay spacing, roof slope, and cladding options to actual operations. Planning these early improves cost control and operational performance over time.",
    category: "Industrial Sheds",
    tags: ["shed planning", "peb", "fabrication"],
    publishedAt: new Date("2025-04-20"),
    readTime: 6,
    coverImage: {
      url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      alt: "Industrial shed planning",
    },
    isPublished: true,
  },
  {
    title: "PEB Structures vs Conventional Steel: What Commercial Owners Should Know",
    slug: "peb-structures-vs-conventional-steel",
    excerpt: "Comparing speed, flexibility, and lifecycle considerations between PEB systems and conventional structural steel.",
    content:
      "PEB systems reduce site time and can be highly efficient when the functional brief is clear. Conventional steel remains useful for irregular geometry and heavier custom integrations. The right answer depends on schedule, span, architectural priorities, and downstream maintenance access.",
    category: "PEB",
    tags: ["peb", "commercial construction"],
    publishedAt: new Date("2025-01-14"),
    readTime: 5,
    coverImage: {
      url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      alt: "PEB structures",
    },
    isPublished: true,
  },
];

const openings = [
  {
    id: "site-engineer",
    title: "Site Engineer",
    type: "Full Time",
    location: "Tamil Nadu",
    experience: "3+ Years",
    description: "Lead execution planning, site coordination, and quality monitoring for shed and fabrication projects.",
  },
  {
    id: "fabrication-supervisor",
    title: "Fabrication Supervisor",
    type: "Full Time",
    location: "Coimbatore",
    experience: "4+ Years",
    description: "Supervise workshop production, welding quality, and dispatch readiness across fabrication packages.",
  },
  {
    id: "estimation-executive",
    title: "Estimation Executive",
    type: "Full Time",
    location: "Remote / Hybrid",
    experience: "2+ Years",
    description: "Prepare BOQs, vendor coordination inputs, and proposal documentation for incoming commercial enquiries.",
  },
];

module.exports = { services, projects, testimonials, blogs, openings };
