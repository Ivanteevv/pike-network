const sharedPhoneDisplay = "+7 (925) 191-57-10";
const sharedPhoneE164 = "+79251915710";
const sharedMapUrl = "https://yandex.com/maps/-/CPR3aEoB";
const networkMapSearchUrl =
  "https://yandex.com/maps/?text=%D0%91%D0%B0%D1%80%20%D0%A9%D1%83%D0%BA%D0%B0%20%D0%9B%D1%8E%D0%B1%D0%B5%D1%80%D1%86%D1%8B";
const sharedHours = [
  "Пн-Чт, Вс · 16:00-02:00",
  "Пт-Сб · 16:00-04:00",
];
const sharedSocials = [
  { label: "Telegram", href: "https://t.me/PikeBeerBar" },
  { label: "Instagram", href: "https://www.instagram.com/pike_beer/" },
  { label: "VK", href: "https://vk.com/pikebeer" },
];

export const mockSiteData = {
  network: {
    name: "Бар Щука",
    displayName: 'Сеть баров "Щука"',
    logoUrl: "/logo-shchuka.svg",
    phoneDisplay: sharedPhoneDisplay,
    phoneE164: sharedPhoneE164,
    mapSearchUrl: networkMapSearchUrl,
    locale: "ru-RU",
    routeStrategy: "single-domain-bars-slug",
    hero: {
      eyebrow: "Сеть баров",
      title: "Бар Щука",
      description:
        "Теплый бар для вечера после работы: еда, напитки, компания и спортивные трансляции, ради которых удобно собраться вместе.",
      media: {
        kind: "video",
        videoUrl: "/mock/network/hero/bgVid7_mod.mp4",
        imageUrl: "/mock/bars/shchuka-8-marta-18k1/hero/hero.webp",
        posterUrl: "/mock/bars/shchuka-8-marta-18k1/hero/hero.webp",
      },
    },
    locationChoice: {
      eyebrow: "Выбор бара",
      title: "Выберите ближайшую Щуку",
      description:
        "Откройте страницу нужной локации, чтобы посмотреть детали бара, меню, события и контакты.",
      reservationLabel: "Позвонить и забронировать",
      countLabels: {
        one: "локация",
        few: "локации",
        many: "локаций",
      },
      cardIndexLabel: "Бар",
      openLabel: "Открыть бар",
      phoneLabel: "Позвонить",
    },
    pillars: [
      {
        title: "Спорт и большие поводы",
        description:
          "Каждая точка может вести собственные трансляции и локальные анонсы, не дублируя весь контент сети.",
      },
      {
        title: "Кухня без статичных шаблонов",
        description:
          "Меню закладываем как заменяемую сущность: PDF, ссылки или карточки блюд позже можно будет менять независимо по каждому бару.",
      },
      {
        title: "Атмосфера как часть бренда",
        description:
          "Главный экран, фотосеты и ритм блоков должны передавать характер Щуки, а не быть универсальной сеткой “для всего”.",
      },
    ],
    commonFormats: [
      {
        title: "Трансляции важных матчей",
        description:
          "Спорт остаётся частью бренда, но каждая точка сама решает, какие события подсвечивать на своей странице.",
      },
      {
        title: "Кухня и закуски к вечеру",
        description:
          "Меню можно развести по локациям, но базовый сценарий понятен: бар, еда, компания и длинный вечер.",
      },
      {
        title: "Прямой звонок без лишних шагов",
        description:
          "Пока не усложняем путь бронирования: телефон остаётся самым быстрым и понятным CTA на всём сайте.",
      },
    ],
    cta: {
      title: "Позвонить и выбрать свою точку",
      description:
        "Пока оставляем простой и понятный путь: общий номер телефона и прямой переход на страницу нужного бара.",
    },
    socials: sharedSocials,
    seo: {
      title: 'Бар Щука | Сеть баров в Люберцах',
      description:
        'Сеть баров "Щука" в Люберцах: выберите свою точку, посмотрите меню, события и контакты каждого бара.',
    },
  },
  bars: [
    {
      id: "shchuka-8-marta-18k1",
      slug: "shchuka-8-marta-18k1",
      name: "Бар Щука",
      shortLabel: "Щука на 8 Марта",
      locationLabel: "ул. 8 Марта, 18к1",
      city: "Люберцы",
      addressLine: "ул. 8 Марта, 18к1",
      phoneDisplay: sharedPhoneDisplay,
      phoneE164: sharedPhoneE164,
      hours: sharedHours,
      statusLabel: "Открыто",
      summary:
        "Уютная точка для вечера с компанией, кухней, напитками и спортивными трансляциями.",
      vibe:
        "Точка с более плотной барной подачей, кухней и акцентом на спортивные вечера.",
      features: [
        "Большой вечерний экран",
        "Плотная кухня и закуски",
        "Спокойная посадка для компании",
      ],
      bestFor: [
        "Плотная кухня и закуски для компании",
        "Пиво на кранах и барная карта на вечер",
        "Спортивные трансляции на большом экране",
      ],
      hero: {
        eyebrow: "Бар Щука · Люберцы",
        title: "Щука на 8 Марта",
        subtitle: "Место для тех, кто любит вечер с характером.",
        description:
          "Большой экран, плотная кухня, спортивные трансляции и узнаваемая барная подача в духе Щуки.",
        kind: "image",
        imageUrl: "/mock/bars/shchuka-8-marta-18k1/hero/hero.webp",
        posterUrl: "/mock/bars/shchuka-8-marta-18k1/hero/hero.webp",
      },
      gallery: [],
      broadcasts: [
        {
          dayLabel: "Сегодня",
          dateLabel: "20 мая",
          timeLabel: "20:45",
          category: "Футбол",
          title: "Спартак — Динамо",
        },
        {
          dayLabel: "Пятница",
          dateLabel: "22 мая",
          timeLabel: "19:30",
          category: "Хоккей",
          title: "ЦСКА — Локомотив",
        },
        {
          dayLabel: "Суббота",
          dateLabel: "23 мая",
          timeLabel: "22:00",
          category: "UFC",
          title: "Главный кард вечера",
        },
        {
          dayLabel: "Воскресенье",
          dateLabel: "24 мая",
          timeLabel: "18:00",
          category: "Футбол",
          title: "Зенит — Краснодар",
        },
      ],
      menuLinks: [
        {
          title: "Барная карта",
          description:
            "PDF с напитками для этой точки. В CMS файл должен заменяться отдельно для каждого бара.",
          href: "/mock/menus/bar-menu.pdf",
          mobilePdfOpenMode: "new-tab",
          status: "PDF",
          fileType: "pdf",
          previewImages: [
            {
              src: "/mock/menus/bar-menu-01.jpg",
              alt: "Барная карта",
              width: 1190,
              height: 1684,
            },
          ],
        },
        {
          title: "Меню кухни",
          description:
            "PDF с кухней для этой точки. В CMS файл должен заменяться отдельно для каждого бара.",
          href: "/mock/menus/kitchen-menu.pdf",
          mobilePdfOpenMode: "current-tab",
          status: "PDF",
          fileType: "pdf",
          previewImages: [
            {
              src: "/mock/menus/kitchen-menu-01.jpg",
              alt: "Меню кухни",
              width: 1190,
              height: 1684,
            },
          ],
        },
      ],
      menuPreview: [
        { name: "Мидии", note: "для долгого вечера" },
        { name: "Креветки", note: "к напиткам и матчам" },
        { name: "Тартар", note: "акцентная подача" },
        { name: "Крылышки", note: "для компании" },
      ],
      events: [
        {
          title: "Трансляции матчей",
          timing: "Во время главных игр недели",
          description:
            "Футбол, хоккей и главные спортивные события, ради которых удобно собраться компанией.",
        },
        {
          title: "Вечера с локальной атмосферой",
          timing: "По выходным и в пиковые часы",
          description:
            "Точка с более камерным настроением, где важны барная подача, свет и плотный визуальный характер.",
        },
      ],
      mapUrl: sharedMapUrl,
      socialLinks: sharedSocials,
      seo: {
        title: 'Бар Щука на 8 Марта | Люберцы',
        description:
          'Бар "Щука" на 8 Марта в Люберцах: меню, спортивные трансляции, атмосфера и контакты точки.',
      },
    },
    {
      id: "shchuka-9-marta-19k2",
      slug: "shchuka-9-marta-19k2",
      name: "Бар Щука",
      shortLabel: "Щука на 9 Марта",
      locationLabel: "ул. 9 Марта, 19к2",
      city: "Люберцы",
      addressLine: "ул. 9 Марта, 19к2",
      phoneDisplay: sharedPhoneDisplay,
      phoneE164: sharedPhoneE164,
      hours: sharedHours,
      statusLabel: "Скоро открытие",
      summary:
        "Новая точка сети, которая готовится к открытию и скоро появится на карте Щуки.",
      vibe:
        "Более светлая и социальная точка, где важны локальные встречи и отдельные сценарии событий.",
      features: [
        "Собственные анонсы",
        "Независимая страница и SEO",
        "Гибкое обновление локального меню",
      ],
      bestFor: [
        "Закуски и основные позиции для долгого вечера",
        "Пиво на кранах и напитки для компании",
        "Локальные трансляции и свои вечерние события",
      ],
      hero: {
        eyebrow: "Бар Щука · Люберцы",
        title: "Щука на 9 Марта",
        subtitle: "Та же сеть, но своё настроение и свой маршрут вечера.",
        description:
          "Отдельная локация для локальных событий, встреч, трансляций и меню, которое можно обновлять независимо от других точек.",
        kind: "image",
        imageUrl: "/mock/bars/shchuka-9-marta-19k2/hero/hero.webp",
        posterUrl: "/mock/bars/shchuka-9-marta-19k2/hero/hero.webp",
      },
      gallery: [],
      broadcasts: [
        {
          dayLabel: "Сегодня",
          dateLabel: "20 мая",
          timeLabel: "21:00",
          category: "Футбол",
          title: "Арсенал — Челси",
        },
        {
          dayLabel: "Пятница",
          dateLabel: "22 мая",
          timeLabel: "19:30",
          category: "Хоккей",
          title: "Динамо — СКА",
        },
        {
          dayLabel: "Суббота",
          dateLabel: "23 мая",
          timeLabel: "20:15",
          category: "Баскетбол",
          title: "Финал конференции",
        },
      ],
      menuLinks: [
        {
          title: "Барная карта",
          description:
            "PDF с напитками для этой точки. В CMS файл должен заменяться отдельно для каждого бара.",
          href: "/mock/menus/bar-menu.pdf",
          mobilePdfOpenMode: "new-tab",
          status: "PDF",
          fileType: "pdf",
          previewImages: [
            {
              src: "/mock/menus/bar-menu-01.jpg",
              alt: "Барная карта",
              width: 1190,
              height: 1684,
            },
          ],
        },
        {
          title: "Меню кухни",
          description:
            "PDF с кухней для этой точки. В CMS файл должен заменяться отдельно для каждого бара.",
          href: "/mock/menus/kitchen-menu.pdf",
          mobilePdfOpenMode: "current-tab",
          status: "PDF",
          fileType: "pdf",
          previewImages: [
            {
              src: "/mock/menus/kitchen-menu-01.jpg",
              alt: "Меню кухни",
              width: 1190,
              height: 1684,
            },
          ],
        },
      ],
      menuPreview: [
        { name: "Гренки", note: "к старту вечера" },
        { name: "Закуски к бару", note: "под компанию" },
        { name: "Основные позиции", note: "можно обновлять отдельно" },
        { name: "Напитки", note: "локальные изменения без дублирования" },
      ],
      events: [
        {
          title: "Свои спортивные трансляции",
          timing: "Под расписание именно этой точки",
          description:
            "Расписание и анонсы будут отдельными именно для этой точки, без общей ленты на все бары.",
        },
        {
          title: "Локальные вечерние события",
          timing: "Под будущие анонсы бара",
          description:
            "Страница уже готова под будущие анонсы формата конкретного бара: от матчей до тематических вечеров.",
        },
      ],
      mapUrl: sharedMapUrl,
      socialLinks: sharedSocials,
      seo: {
        title: 'Бар Щука на 9 Марта | Люберцы',
        description:
          'Бар "Щука" на 9 Марта в Люберцах: отдельная страница точки, локальные события, меню и контакты.',
      },
    },
  ],
};
