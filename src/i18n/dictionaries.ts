export type Locale = "sr" | "en";

interface ProcessStep {
  label: string;
  description: string;
}

interface MaterialItem {
  name: string;
  description: string;
  trend: string;
}

export interface Dictionary {
  nav: {
    home: string;
    projects: string;
    process: string;
    materials: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    tagline: string;
    cta: string;
  };
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  projects: {
    title: string;
    subtitle: string;
    filterRoom: string;
    filterVibe: string;
    rooms: Record<string, string>;
    vibes: Record<string, string>;
    viewProject: string;
    noResults: string;
  };
  materials: {
    title: string;
    subtitle: string;
    items: MaterialItem[];
  };
  footer: {
    tagline: string;
    contact: string;
    headline: string;
    headlineAccent: string;
    rights: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  sr: {
    nav: {
      home: "Početna",
      projects: "Radovi",
      process: "Kako radimo",
      materials: "Materijali",
      contact: "Kontakt",
    },
    hero: {
      subtitle: "Nameštaj i kuhinje po meri",
      tagline: "Svaki komad ima svoju priču.",
      cta: "Pogledajte naše radove",
    },
    process: {
      title: "Kako nastaje",
      subtitle: "Od prve ideje do poslednjeg detalja",
      steps: [
        {
          label: "Razgovor",
          description:
            "Sve počinje razgovorom — slušamo šta vam treba, kako živite, šta volite. Tek kad razumemo prostor, krenemo dalje.",
        },
        {
          label: "Skica",
          description:
            "Crtamo rukom. Svaka linija ima razlog, svaki detalj se promisli unapred. Ovde ideja dobija oblik.",
        },
        {
          label: "Odabir",
          description:
            "Biramo samo proveren materijal — masivan hrast, narebreno staklo, kamen koji je lep i na dodir.",
        },
        {
          label: "Izrada",
          description:
            "Svaki spoj je precizan, svaka površina ručno obrađena. Kod nas nema prečica.",
        },
        {
          label: "Ugradnja",
          description:
            "Dan ugradnje. Trenutak kad prostor konačno postane — vaš.",
        },
      ],
    },
    projects: {
      title: "Naši radovi",
      subtitle: "Prostori koje smo oblikovali",
      filterRoom: "Prostorija",
      filterVibe: "Stil",
      rooms: {
        all: "Sve",
        kitchen: "Kuhinja",
        bedroom: "Spavaća soba",
        living: "Dnevni boravak",
        bathroom: "Kupatilo",
      },
      vibes: {
        all: "Sve",
        warmMinimal: "Topli minimalizam",
        industrial: "Industrijski",
        organicLuxury: "Prirodni luksuz",
      },
      viewProject: "Pogledaj",
      noResults: "Nema radova za izabrane filtere.",
    },
    materials: {
      title: "Materijali",
      subtitle: "Teksture koje biramo",
      items: [
        {
          name: "Frezovani hrast",
          description:
            "Kanali urezani u masivni hrast stvaraju igru svetla i senke. Površina koja živi sa prostorom — ujutru izgleda drugačije nego uveče.",
          trend: "Taktilne površine",
        },
        {
          name: "Rebrasto staklo",
          description:
            "Propušta svetlost, a čuva privatnost. Daje dubinu svakom prostoru i lepo stari — materijal sa karakterom.",
          trend: "Igra svetlosti",
        },
        {
          name: "Ultra-mat kamen",
          description:
            "Fenix površine koje upijaju svetlost umesto da je odbijaju. Svilenkaste na dodir, ne ostavljaju otiske prstiju.",
          trend: "Bez sjaja",
        },
        {
          name: "Brušeni mesing",
          description:
            "Metal koji dobija patinu s vremenom. Svaka ručka i šarka postaje jedinstvena — kao da priča svoju priču.",
          trend: "Žive površine",
        },
        {
          name: "Dimljeni eukaliptus",
          description:
            "Termički obrađen furnir dubokih jantarnih tonova. Toplina starog drveta, ali sa modernim karakterom.",
          trend: "Svesna izrada",
        },
        {
          name: "Laneni kompozit",
          description:
            "Presovana lanena vlakna u čvrstim panelima. Prirodna tekstura koja se oseća pod prstima, a traje godinama.",
          trend: "Prirodni materijali",
        },
      ],
    },
    footer: {
      tagline: "Pravimo u Srbiji. Ugrađujemo gde treba.",
      contact: "Javite nam se",
      headline: "Hajde da napravimo",
      headlineAccent: "nešto vaše.",
      rights: "Sva prava zadržana.",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      process: "Our Process",
      materials: "Materials",
      contact: "Contact",
    },
    hero: {
      subtitle: "Bespoke Furniture & Cabinetry",
      tagline: "Every piece tells its own story.",
      cta: "Explore Our Work",
    },
    process: {
      title: "How It\u2019s Made",
      subtitle: "From first idea to final detail",
      steps: [
        {
          label: "The Talk",
          description:
            "Everything starts with a conversation — we listen to what you need, how you live, what you love. Only when we understand the space do we move forward.",
        },
        {
          label: "Sketch",
          description:
            "We draw by hand. Every line has a reason, every detail is thought through. This is where the idea takes shape.",
        },
        {
          label: "Selection",
          description:
            "We choose only proven materials — solid oak, fluted glass, stone that feels beautiful to the touch.",
        },
        {
          label: "Craft",
          description:
            "Every joint is precise, every surface hand-finished. We don\u2019t take shortcuts.",
        },
        {
          label: "Installation",
          description:
            "Installation day. The moment when a space finally becomes — yours.",
        },
      ],
    },
    projects: {
      title: "Our Work",
      subtitle: "Spaces we\u2019ve shaped",
      filterRoom: "Room",
      filterVibe: "Style",
      rooms: {
        all: "All",
        kitchen: "Kitchen",
        bedroom: "Bedroom",
        living: "Living Room",
        bathroom: "Bathroom",
      },
      vibes: {
        all: "All",
        warmMinimal: "Warm Minimal",
        industrial: "Industrial",
        organicLuxury: "Organic Luxury",
      },
      viewProject: "View",
      noResults: "No projects match the selected filters.",
    },
    materials: {
      title: "Materials",
      subtitle: "Textures we work with",
      items: [
        {
          name: "Ribbed Oak",
          description:
            "Channels carved into solid oak create a play of light and shadow. A surface that lives with the room — it looks different in the morning than at night.",
          trend: "Tactile Surfaces",
        },
        {
          name: "Fluted Glass",
          description:
            "Lets light through while keeping privacy. Adds depth to any space and ages beautifully — a material with character.",
          trend: "Light Play",
        },
        {
          name: "Ultra-Matte Stone",
          description:
            "Fenix surfaces that absorb light instead of reflecting it. Silken to the touch, immune to fingerprints.",
          trend: "Anti-Gloss",
        },
        {
          name: "Burnished Brass",
          description:
            "Metal that develops a patina over time. Every handle and hinge becomes unique — as if telling its own story.",
          trend: "Living Finishes",
        },
        {
          name: "Smoked Eucalyptus",
          description:
            "Heat-treated veneer with deep amber tones. The warmth of aged wood, but with modern character.",
          trend: "Conscious Craft",
        },
        {
          name: "Raw Linen Composite",
          description:
            "Pressed linen fibers in rigid panels. A natural texture you can feel under your fingertips, built to last.",
          trend: "Bio Materials",
        },
      ],
    },
    footer: {
      tagline: "Made in Serbia. Installed wherever needed.",
      contact: "Get in Touch",
      headline: "Let\u2019s build",
      headlineAccent: "something yours.",
      rights: "All rights reserved.",
    },
  },
};
