import { ServiceItem, PracticeArea } from '../types';

export interface SiteImages {
  hero: string;
  about: string;
}

export interface AboutSectionData {
  title: string;
  subtitle: string;
  quote: string;
  text: string;
  education: string;
  status: string;
}

export interface SiteSettings {
  password: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  images: SiteImages;
  
  about: AboutSectionData;
  services: ServiceItem[];
  practice: {
    title: string;
    subtitle: string;
    description: string;
    areas: PracticeArea[];
    quote: string;
  };
}

const STORAGE_KEY = 'bond_defender_settings_v3';
const ARTICLES_KEY = 'bond_defender_articles';
const LEADS_KEY = 'bond_defender_leads';

const DEFAULT_SETTINGS: SiteSettings = {
  password: 'admin',
  phone: '+7 (909) 776-88-59',
  email: 'kgorbunov@exitumlaw.ru',
  address: 'г. Калининград, ул. Октябрьская, д. 8, оф. 502 (Специальный административный район Остров Октябрьский)',
  heroTitle: 'Защита активов',
  heroSubtitle: 'в эпоху перемен',
  images: {
    hero: 'https://images.unsplash.com/photo-1572916164293-8ac433f81e62?auto=format&fit=crop&w=2400&q=80',
    about: 'https://placehold.co/1000x1333/f3f4f6/1a1a1a?text=Фото+Горбунова+К.Э.'
  },
  
  about: {
    title: 'Обо мне',
    subtitle: 'детали, которые решают всё',
    quote: '"В праве нет мелочей. Есть детали, которые решают всё."',
    text: `Я — Константин Горбунов, адвокат МСКА «Экзитум». Моя специализация — защита прав инвесторов, юридическое сопровождение сложных финансовых ситуаций, корпоративных конфликтов и процедур банкротства.

Работаю в точке, где пересекаются право, экономика и стратегия. Моя задача — не просто выиграть спор, но и создать работающий механизм защиты капитала, минимизировать риски и выстроить стратегию взыскания, которая приносит реальный результат.

За последние годы я сформировал практику, ориентированную на облигационные споры, банкротства, корпоративные конфликты и судебные механизмы возврата активов.

Я веду Telegram-канал, выступаю на профильных конференциях и участвую в развитии LegalTech-решений для защиты инвесторов.`,
    education: 'Военный Университет Министерства Обороны РФ 2004 год (диплом с отличием)',
    status: 'Адвокат филиала Московской специализированной коллегии адвокатов "Экзитум"'
  },

  services: [
    {
      id: '1',
      title: 'Взыскание задолженности по облигациям',
      description: 'Полное судебное сопровождение взыскания стоимости облигаций и купонного дохода.',
      icon: 'Gavel'
    },
    {
      id: '2',
      title: 'Сопровождение процедур банкротства',
      description: 'Включение в РТК. Оспаривание сделок. Субсидиарная ответственность бенефициаров.',
      icon: 'Landmark'
    },
    {
      id: '3',
      title: 'Коллективные иски',
      description: 'Консолидация требований владельцев облигаций для усиления позиции в суде.',
      icon: 'Scale'
    },
    {
      id: '4',
      title: 'Юридическое инвестирование',
      description: 'Взыскание денежных средств за процент от полученного.',
      icon: 'Handshake'
    },
    {
      id: '5',
      title: 'Анализ рисков проекта, сделки, покупки',
      description: 'Глубокий анализ рисков эмиссионной документации перед покупкой.',
      icon: 'FileWarning'
    },
    {
      id: '6',
      title: 'Досудебное урегулирование',
      description: 'Поиск альтернатив и решений в достижении результата.',
      icon: 'Briefcase'
    }
  ],

  practice: {
    title: 'Компетенции и сферы интересов',
    subtitle: 'сферы интересов',
    description: 'Сферы, в которых я добиваюсь конкретного финансового и правового результата для доверителя.',
    quote: 'Каждое дело — это отдельная стратегия. Я не использую шаблонные решения — только индивидуальный анализ и полное погружение в факты.',
    areas: [
      {
        id: 1,
        title: "Защита инвесторов и взыскание по дефолтным облигациям",
        icon: "Briefcase",
        items: [
          "Взыскание задолженности по облигационным обязательствам",
          "Успешное сопровождение процедуры досрочного погашения облигаций",
          "Снятие обременений по выполнению облигационных обязательств"
        ]
      },
      {
        id: 2,
        title: "Банкротные процессы",
        icon: "Gavel",
        items: [
          "Включение требований",
          "Признание действий управляющего незаконными",
          "Возврат активов из «серых» схем",
          "Субсидиарная ответственность топ-менеджмента"
        ]
      },
      {
        id: 3,
        title: "Корпоративные споры",
        icon: "Building2",
        items: [
          "Конфликты по структурам владения",
          "Взыскание действительной стоимости доли",
          "Оспаривание корпоративных действий",
          "Защита прав миноритариев"
        ]
      },
      {
        id: 4,
        title: "Споры с иностранным элементом",
        icon: "Globe",
        items: [
          "Редомициляция, офшорные структуры",
          "Работа с эмитентами из ЕС, СНГ и Азии",
          "Взыскание задолженности в иностранных юрисдикциях"
        ]
      },
      {
        id: 5,
        title: "Консультирование и стратегия",
        icon: "Lightbulb",
        items: [
          "Оценка рисков",
          "Подготовка дорожной карты споров",
          "Due Diligence компаний и проектов",
          "Сопровождение переговоров"
        ]
      }
    ]
  }
};

export const getSiteSettings = (): SiteSettings => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  const parsed = JSON.parse(stored);
  return { ...DEFAULT_SETTINGS, ...parsed };
};

export const saveSiteSettings = (settings: SiteSettings): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const createBackup = () => {
  return {
    settings: JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_SETTINGS)),
    articles: JSON.parse(localStorage.getItem(ARTICLES_KEY) || '[]'),
    leads: JSON.parse(localStorage.getItem(LEADS_KEY) || '[]'),
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
};

export const restoreBackup = (fileContent: string): boolean => {
  try {
    const data = JSON.parse(fileContent);
    if (!data.timestamp || !data.settings) {
      throw new Error("Invalid backup file format");
    }
    if (data.settings) localStorage.setItem(STORAGE_KEY, JSON.stringify(data.settings));
    if (data.articles) localStorage.setItem(ARTICLES_KEY, JSON.stringify(data.articles));
    if (data.leads) localStorage.setItem(LEADS_KEY, JSON.stringify(data.leads));
    return true;
  } catch (e) {
    console.error("Restore failed:", e);
    return false;
  }
};