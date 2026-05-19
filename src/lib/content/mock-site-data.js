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
      gallery: [
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/01.jpg", alt: "Интерьер бара Щука на 8 Марта" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/02.webp", alt: "Гости в баре Щука на 8 Марта" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/03.webp", alt: "Атмосфера вечера в баре Щука" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/04.jpg", alt: "Спортивные трансляции в баре Щука" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/05.jpg", alt: "Подача блюд в баре Щука" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/06.jpg", alt: "Мидии в меню бара Щука" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/07.jpg", alt: "Закуски в баре Щука" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/08.jpg", alt: "Блюдо из меню бара Щука" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/09.jpg", alt: "Подача тартар в баре Щука" },
        { src: "/mock/bars/shchuka-8-marta-18k1/gallery/10.jpg", alt: "Крылышки и закуски в баре Щука" },
      ],
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
          title: "Основное меню",
          description:
            "Закуски, горячее и позиции, вокруг которых строится спокойный вечер или большой стол.",
          href: null,
          status: "PDF обновляется",
        },
        {
          title: "Барная карта",
          description:
            "Пиво и напитки для сценария от короткой встречи до длинного матча.",
          href: null,
          status: "Заменим после утверждения контента",
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
      gallery: [
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/01.webp", alt: "Гости в баре Щука на 9 Марта" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/02.webp", alt: "Интерьер бара Щука на 9 Марта" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/03.jpg", alt: "Посадка и интерьер бара Щука" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/04.jpg", alt: "Атмосфера бара вечером" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/05.webp", alt: "Фотография гостей бара Щука" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/06.webp", alt: "Освещение и интерьер бара Щука" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/07.webp", alt: "Компания гостей в баре Щука" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/08.webp", alt: "Зал бара Щука на 9 Марта" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/09.webp", alt: "Вечерняя атмосфера бара Щука" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/10.webp", alt: "Бар Щука, интерьер и свет" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/11.webp", alt: "Интерьер с посадочными местами" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/12.webp", alt: "Обстановка для встречи с друзьями" },
        { src: "/mock/bars/shchuka-9-marta-19k2/gallery/13.jpg", alt: "Закуски в баре Щука на 9 Марта" },
      ],
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
          title: "Меню кухни",
          description:
            "Базовый локальный набор блюд для этой точки, который можно будет менять отдельно от других баров.",
          href: null,
          status: "Контент для PDF добавим позже",
        },
        {
          title: "Напитки",
          description:
            "Вторая точка может получать собственные позиции и обновления без влияния на остальные страницы.",
          href: null,
          status: "Раздел оставлен CMS-ready",
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
