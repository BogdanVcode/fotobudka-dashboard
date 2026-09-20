// Generated from MASTER-SPEC.md and CHANGELOG.md. Do not edit.
window.PROJECT_DATA = {
  "date": "2026-09-12",
  "subsystems": [
    {
      "id": "01",
      "name": "Корпус",
      "status": "NEEDS VERIFICATION",
      "note": "Габарити, доступність, вентиляція та сервісний доступ не визначені."
    },
    {
      "id": "02",
      "name": "Камера",
      "status": "NEEDS VERIFICATION",
      "note": "Canon EOS R50 SELECTED; EDSDK і живлення потребують перевірки."
    },
    {
      "id": "03",
      "name": "Оптика",
      "status": "NEEDS VERIFICATION",
      "note": "Об’єктив, дистанція та поле зору не визначені."
    },
    {
      "id": "04",
      "name": "Світло",
      "status": "NEEDS VERIFICATION",
      "note": "LED + Godox за розсіювачем; весь ланцюг синхронізації відкритий."
    },
    {
      "id": "05",
      "name": "Підйом камери",
      "status": "NEEDS VERIFICATION",
      "note": "Перший вузол для доведення до APPROVED."
    },
    {
      "id": "06",
      "name": "Комп’ютер",
      "status": "NEEDS VERIFICATION",
      "note": "Windows mini-PC; 16 GB+ RAM, SSD, Ethernet, Wi-Fi, USB — вимоги."
    },
    {
      "id": "07",
      "name": "Сенсорний екран",
      "status": "NEEDS VERIFICATION",
      "note": "Модель, діагональ та інтерфейси не визначені."
    },
    {
      "id": "08",
      "name": "Принтер",
      "status": "NEEDS VERIFICATION",
      "note": "DNP DS-RX1HS і Brother HL-L5210DN SELECTED. Сканер Brother DS-740D SELECTED (ревізія 07): наскрізний тракт card+A4."
    },
    {
      "id": "09",
      "name": "Оплата",
      "status": "NEEDS VERIFICATION",
      "note": "Вендинговий термінал; Nayax VPOS Touch SELECTED (ревізія 07)."
    },
    {
      "id": "10",
      "name": "Живлення",
      "status": "NEEDS VERIFICATION",
      "note": "EcoFlow DELTA 2 (1024 Вт·год) SELECTED (ревізія 07); пусковий струм принтерів ще потребує вимірювання."
    },
    {
      "id": "11",
      "name": "Автоматика",
      "status": "NEEDS VERIFICATION",
      "note": "Окремий MCU; ESP32 — кандидат. Вентиляція CTL-002 SELECTED (ревізія 07): один витяжний Arctic P12 + пасивний приплив."
    },
    {
      "id": "12",
      "name": "Мережа",
      "status": "NEEDS VERIFICATION",
      "note": "Роутер, канал зв’язку і резервування не визначені."
    },
    {
      "id": "13",
      "name": "ПЗ",
      "status": "NEEDS VERIFICATION",
      "note": "ПЗ кіоска пишеться власноруч у Cursor / Codex; окремої закупівлі бота немає."
    },
    {
      "id": "14",
      "name": "AI",
      "status": "NEEDS VERIFICATION",
      "note": "Важкий AI може працювати через backend/API."
    },
    {
      "id": "15",
      "name": "Document Photo",
      "status": "NEEDS VERIFICATION",
      "note": "Профілі документів та критерії якості ще не визначені."
    },
    {
      "id": "16",
      "name": "Phone Upload",
      "status": "NEEDS VERIFICATION",
      "note": "QR → активна сесія → HTTPS upload; backend/WebSocket запропоновано."
    },
    {
      "id": "17",
      "name": "Instagram",
      "status": "NEEDS VERIFICATION",
      "note": "Пошук за @username не гарантовано доступний; перевірити Meta API."
    },
    {
      "id": "18",
      "name": "Security",
      "status": "NEEDS VERIFICATION",
      "note": "Повноекранного вікна недостатньо; перевірити можливості редакції Windows."
    },
    {
      "id": "19",
      "name": "Remote Monitoring",
      "status": "NEEDS VERIFICATION",
      "note": "Дистанційна діагностика потрібна; архітектура ще не затверджена."
    },
    {
      "id": "20",
      "name": "Assembly & Testing",
      "status": "NEEDS VERIFICATION",
      "note": "Стендові випробування ще не починалися."
    }
  ],
  "components": [
    {
      "id": "ENC-001",
      "subsystem": "01",
      "name": "Корпус кабінки",
      "manufacturer": "TODO: VERIFY",
      "model": "Авторська геометрія БУДКА.blend від 17.09.2026, ревізія 09",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "Спершу Вена/майстерні Славутича; порізка поки не підтверджена. Запасний варіант Віяр.",
      "verifiedAt": null,
      "specifications": "Dimensions авторських панелей; корпус 1672×1072, дах 1800×1200, висота 2232 мм. Переважно ДСП 16 мм; дверцята 8,87 мм потребують узгодження.",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Спільні стіни. Каркас модуля всередині (X≥1326), не на фасаді. Труба 20×20. Без водозбірника. Два принтери та сканер у шафі.",
      "verify": "Приховане кріплення, деталізація кишень, товщини, міцність і складання майстром; REVISION-09.md."
    },
    {
      "id": "CAM-001",
      "subsystem": "02",
      "name": "Основна камера",
      "manufacturer": "Canon",
      "model": "EOS R50",
      "status": "SELECTED",
      "confidence": "D",
      "priceUah": 31360,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://fotomost.com.ua/ua/canon-eos-r50-kit-18-45mm/",
      "store": "Фотоміст",
      "verifiedAt": "2026-09-13",
      "specifications": "[A] APS-C 22,3×14,9 мм. Решта параметрів і інтеграція — див. окремі claims; сумісність усього вузла не підтверджена.",
      "compatibility": "[A] Canon вимагає AD-E1 для аксесуарів не під Multi-function shoe. [D] EDSDK, безперервне живлення, кінцевий sync-ланцюг потребують перевірки.",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Прямий вибір користувача. Ціна за KIT із OPT-001, не за body; не замінювати.",
      "verify": "EDSDK: підтримка конкретної моделі, версії Windows/SDK, live view, спуск, передача файлів, відновлення USB; безперервне живлення та тепловий режим; синхронізація спалаху.",
      "claims": [
        {
          "confidence": "B",
          "date": "2026-09-13",
          "url": "https://fotomost.com.ua/ua/canon-eos-r50-kit-18-45mm/",
          "statement": "Комплект 18–45 Black, артикул 102231, 31360 грн, В наявності; не резервовано."
        },
        {
          "confidence": "A",
          "date": "2026-09-13",
          "url": "https://www.canon-europe.com/cameras/eos-r50/specifications/",
          "statement": "Матриця 22,3×14,9 мм."
        }
      ],
      "priceIncludes": [
        "CAM-001",
        "OPT-001"
      ]
    },
    {
      "id": "CAM-002",
      "subsystem": "02",
      "name": "Безперервне живлення Canon",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "OPT-001",
      "subsystem": "03",
      "name": "Об’єктив",
      "manufacturer": "Canon",
      "model": "RF-S18–45mm F4.5–6.3 IS STM",
      "status": "CANDIDATE",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": 1,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "[A] Зум ручний; мотор STM для фокусування. [C] Кнопки ближче/далі можуть керувати цифровим кропом, не моторизованим оптичним зумом.",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Комплектний об’єктив. Пропозиція: фіксувати 18 мм і кадрувати під послугу; перевірити якість документних фото. Ціна включена в комплект камери.",
      "verify": "Деталізація після кропу, distortion, робоча довжина висунутого об’єктива, команди AF через SDK, захист кільця від зсуву.",
      "priceIncludedIn": "CAM-001"
    },
    {
      "id": "LGT-001",
      "subsystem": "04",
      "name": "Постійне LED-світло",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "LGT-002",
      "subsystem": "04",
      "name": "Студійний спалах Godox",
      "manufacturer": "Godox",
      "model": "MS200V",
      "status": "SELECTED",
      "confidence": "D",
      "priceUah": 3360,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://fotomost.com.ua/ua/godox-ms200-v/",
      "store": "Фотоміст",
      "verifiedAt": "2026-09-13",
      "specifications": "[A] Версія MS200-V: 200 Вт·с, LED-пілот 10 Вт, синхрогніздо 3,5 мм. Не переносити характеристики пілотної лампи звичайного MS200.",
      "compatibility": "Кабельна синхронізація — пріоритет. Кандидат: R50 → AD-E1 → PC-sync адаптер AliExpress → кабель 3,5 мм → MS200V. Адаптер з AliExpress не кріпиться на Multi-function shoe напряму.",
      "alternatives": "Звичайний MS200 — історичний кандидат, більше не поточний вибір.",
      "reason": "Користувач прямо обрав MS200V із Фотомосту замість попереднього кандидата MS200.",
      "verify": "Контактний адаптер та кабель, напруга й полярність, витримка, нагрів, реальні монтажні розміри та робота на всьому ході ліфта.",
      "claims": [
        {
          "confidence": "A",
          "date": "2026-09-13",
          "url": "https://godox.com/static/upload/file/20230608/1686187763592895.pdf",
          "statement": "Інструкція саме MS200-V / MS300-V; 3,5 мм синхрогніздо."
        },
        {
          "confidence": "B",
          "date": "2026-09-13",
          "url": "https://fotomost.com.ua/ua/godox-ms200-v/",
          "statement": "3360 грн, артикул 503031, В наявності на сторінці; не куплено."
        }
      ]
    },
    {
      "id": "LGT-003",
      "subsystem": "04",
      "name": "Великий матовий розсіювач",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "LGT-004",
      "subsystem": "04",
      "name": "Кабельний запуск спалаху",
      "manufacturer": "Ще не визначено",
      "model": "Контактний адаптер → PC-sync / 3,5 мм → MS200V",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "[C] Кандидат R50 → AD-E1 → Pixel TF-321 або JJC JSC-2 → кабель. PC-sync означає тип контакту, а не персональний комп’ютер. Попередній резерв кабелю 3 м; рухома ділянка в кабелеукладачі.",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Користувач обрав кабельний напрям без щоденного заряджання передавача.",
      "verify": "Адаптери в українських магазинах не підтверджені як доступний повний комплект. Виміряти напругу, полярність, протестувати синхронізацію та рух. Звичайний фотокабель не має доведеної стійкості до багаторазового згинання."
    },
    {
      "id": "LGT-005",
      "subsystem": "04",
      "name": "Адаптер башмака за необхідності",
      "manufacturer": "Canon",
      "model": "AD-E1",
      "status": "CANDIDATE",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "[A] Canon R50: лише 21-pin Multi-function shoe, без X-контакту і без PC. AD-E1 обов’язковий, щоб поставити звичайний PC-sync адаптер (AliExpress 1005005876468662) і кабель 3,5 мм на MS200V. Адаптер з AliExpress не замінює AD-E1.",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Потрібність і сумісність для обраного тригера: TODO: VERIFY. Не вважати обов’язковим або достатнім без документації."
    },
    {
      "id": "MOT-001",
      "subsystem": "05",
      "name": "Ремінний лінійний модуль",
      "manufacturer": "Times Brilliant",
      "model": "TBD45-700",
      "status": "SELECTED",
      "confidence": "B",
      "priceUah": 4939,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://cncprom.ua/ua/p1089226920-linejnyj-modul-tbd45.html",
      "store": "CNCPROM",
      "verifiedAt": "2026-09-20",
      "specifications": "Хід 700 мм, напрямна 45×45×820 мм; каретка 104×90×26 мм; 72 мм/оберт; вал Ø12; ремінь HTD3M 15 мм. Дані сторінки продавця; вертикальні умови навантаження потребують підтвердження.",
      "compatibility": "Інженерний огляд: docs/camera-module/README.md. Перевірити отвори, LJZ8, муфту 8×12 D25L30, криву моменту та захист від падіння. Не випробувано.",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Нове пряме ТЗ користувача від 20.09.2026: хід 700 мм. Старий 500 мм залишається в історичній геометрії кабінки до узгодження нового вирізу.",
      "verify": "Заводські креслення, вертикальне навантаження, робочий момент при 36 В, незалежне утримання каретки, E-STOP, інтеграція з кабінкою; фізичних випробувань немає."
    },
    {
      "id": "MOT-002",
      "subsystem": "05",
      "name": "Звичайний кроковий двигун NEMA23",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": [
        1000,
        1500
      ],
      "quantity": 1,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Користувач обрав звичайний NEMA23 як клас; точна модель не обрана. Дорогий closed-loop не обґрунтований.",
      "verify": "Момент і крива момент/RPM, струм фази, опір/індуктивність, напруга обмотки та живлення драйвера окремо, вал (діаметр/довжина), корпус, кронштейн, муфта, нагрів, вертикальна вісь без живлення."
    },
    {
      "id": "MOT-003",
      "subsystem": "05",
      "name": "Кронштейн двигуна серії 57 / NEMA23",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Артикул у каталозі продавця, креслення, отвори, центрування, сумісність з модулем і корпусом конкретного двигуна."
    },
    {
      "id": "MOT-004",
      "subsystem": "05",
      "name": "Муфта",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-005",
      "subsystem": "05",
      "name": "Драйвер крокового двигуна",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-006",
      "subsystem": "05",
      "name": "Блок живлення осі",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-007",
      "subsystem": "05",
      "name": "Кінцевики",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-008",
      "subsystem": "05",
      "name": "Аварійна зупинка та апаратний ланцюг безпеки",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-009",
      "subsystem": "05",
      "name": "Рухомі кабелі та роз’єми",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-010",
      "subsystem": "05",
      "name": "Кабелеукладач",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-011",
      "subsystem": "05",
      "name": "Кронштейн Canon",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-012",
      "subsystem": "05",
      "name": "Незалежний механічний захист від падіння",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "MOT-013",
      "subsystem": "05",
      "name": "Огородження, упори та захист від защемлення",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "PC-001",
      "subsystem": "06",
      "name": "Windows mini-PC",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": 1,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "Вимога користувача: Windows 11 Pro (попередньо), RAM ≥16 GB, SSD, Ethernet, Wi-Fi, достатньо USB. Фактичні характеристики не перевірені.",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, USB topology, енергоспоживання, відновлення AC, SDK і підтримувана kiosk-конфігурація."
    },
    {
      "id": "DSP-001",
      "subsystem": "07",
      "name": "Сенсорний екран",
      "manufacturer": "TODO: VERIFY",
      "model": "Elo 2470L 24″; артикул E511419 — кандидат",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": 28850,
      "budgetUah": null,
      "quantity": null,
      "url": "https://prom.ua/p2974515545-elo-2470l-e511419.html",
      "store": "TODO: VERIFY",
      "verifiedAt": "2026-09-17",
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Ревізія 10: бюджет із джерелами та припущеннями; перевірити комплектацію перед замовленням.",
      "sourceUrl": "https://prom.ua/p2974515545-elo-2470l-e511419.html"
    },
    {
      "id": "PRI-001",
      "subsystem": "08",
      "name": "Фотопринтер DNP DS-RX1HS",
      "manufacturer": "DNP",
      "model": "DS-RX1HS",
      "status": "SELECTED",
      "confidence": "A",
      "priceUah": null,
      "budgetUah": [
        50000,
        50000
      ],
      "quantity": 1,
      "url": "https://new.dnpphoto.com/en-us/Products/Printers/DS-RX1HS",
      "store": "Авторизований продавець ще не обраний",
      "verifiedAt": "2026-09-15",
      "specifications": "322×351×281 мм, приблизно 13,8 кг; 10×15 за 12,4 с; до 700 відбитків 10×15 з RX1HS4x6.",
      "compatibility": "USB до внутрішнього ПК; точний драйвер, статуси помилок, вентиляцію і тракт видачі перевірити на першому модулі.",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Модель прямо зафіксована користувачем у конфігурації ревізії 06.",
      "verify": "Windows-драйвер, статус і помилки, носії, вентиляція, вихід паперу, пікове споживання та ціна."
    },
    {
      "id": "PRI-002",
      "subsystem": "08",
      "name": "Монохромний принтер документів A4",
      "manufacturer": "Brother",
      "model": "HL-L5210DN",
      "status": "SELECTED",
      "confidence": "A",
      "priceUah": null,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://www.brother.eu/-/media/Product-Downloads/Devices/Printers/HL/HLL5210DN/HL-L5210DN---Datasheet.ashx",
      "store": "Авторизований продавець ще не обраний",
      "verifiedAt": "2026-09-15",
      "specifications": "373×388×257 мм, 11,2 кг; автоматичний duplex; до 48 стор./хв; Gigabit Ethernet; USB 2.0.",
      "compatibility": "Ethernet або USB з внутрішнім ПК. Підтримка керованої черги, вихід паперу й сервісний доступ перевіряються на першому модулі.",
      "alternatives": "HL-L6410DN потрібен лише якщо принципово необхідний TN3610XL на 25 000 сторінок.",
      "reason": "Модель прямо зафіксована користувачем.",
      "verify": "Ціна, Windows-драйвер, мережеве адміністрування, вихід паперу, вентиляція та поведінка після помилок."
    },
    {
      "id": "PRI-002-TONER",
      "subsystem": "08",
      "name": "Тонер для Brother HL-L5210DN",
      "manufacturer": "Brother",
      "model": "TN3600XXL",
      "status": "SELECTED",
      "confidence": "A",
      "priceUah": null,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://www.brother.eu/-/media/Product-Downloads/Devices/Printers/HL/HLL5210DN/HL-L5210DN---Datasheet.ashx",
      "store": "TODO: VERIFY",
      "verifiedAt": "2026-09-15",
      "specifications": "Приблизно 11 000 сторінок за ISO/IEC 19752; максимальний заявлений ресурс для HL-L5210DN.",
      "compatibility": "TN3610XL приблизно на 25 000 сторінок не заявлений для HL-L5210DN і має статус REJECTED у цій конфігурації.",
      "alternatives": "TN3600 3 000 стор.; TN3600XL 6 000 стор.",
      "reason": "Технічна корекція конфігурації за офіційним паспортом Brother.",
      "verify": "Ціна, доступність і регіональний артикул перед закупівлею."
    },
    {
      "id": "PRI-003",
      "subsystem": "08",
      "name": "Окремий протяжний A4 duplex scanner",
      "manufacturer": "Brother",
      "model": "DS-740D",
      "status": "SELECTED",
      "confidence": "C",
      "priceUah": 8247,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://hotline.ua/ua/computer-skanery/brother-ds-740d-ds740dtk1/",
      "store": "Saren.com.ua / Redprice.sale / Tomdom.in.ua (Львів)",
      "verifiedAt": "2026-09-16",
      "specifications": "A4, двостороннє сканування за один прохід, TWAIN і WIA, прямий наскрізний тракт (без розвороту), офіційно сканує й пластикові картки завтовшки до 1,24 мм.",
      "compatibility": "USB з внутрішнім ПК. Встановлюється вертикально за похилою консоллю кабінки ревізії 07: слот картки/A4 зверху, лоток-жолоб видачі знизу — картка або аркуш просто випадають після сканування.",
      "alternatives": "DS-640 відхилено (односторонній). Прямий наскрізний тракт DS-740D закриває вимогу «вставив — відсканувалось — випало» без другого механізму для картки.",
      "reason": "Обрано користувачем для ревізії 07 (БУДКА.blend) саме за прямим наскрізним трактом, що приймає і картки, і папір.",
      "verify": "Ресурс роликів, стабільність подачі картки 1,24 мм без заминання, драйвер TWAIN/WIA на внутрішньому ПК, реальна ціна й наявність перед оплатою."
    },
    {
      "id": "PAY-001",
      "subsystem": "09",
      "name": "Вендинговий платіжний термінал",
      "manufacturer": "Nayax",
      "model": "VPOS Touch",
      "status": "SELECTED",
      "confidence": "D",
      "priceUah": 28613,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://rozetka.com.ua/ua/415202109/p415202109/",
      "store": "BristotUkr через Rozetka / ucoffee-machines через Prom",
      "verifiedAt": "2026-09-13",
      "specifications": "Вендинговий POS-термінал з сенсорним дисплеєм, безконтактним і чіповим прийомом карток; монтується біля входу кабінки.",
      "compatibility": "Договір еквайрингу, тарифи, фіскалізація, реальні API/SDK/протокол і зв’язок з Windows-кіоском ще не перевірені на стенді.",
      "alternatives": "Не переглядалась після підтвердження користувачем.",
      "reason": "Користувач прямо підтвердив Nayax VPOS Touch для ревізії 07; статус піднято з CANDIDATE до SELECTED.",
      "verify": "Доступність в Україні, еквайринг, Visa/Mastercard/NFC/Apple Pay/Google Pay, тарифи, фіскалізація, реальні API/SDK/протокол і зв’язок з Windows; не вважати сумісність підтвердженою."
    },
    {
      "id": "PWR-001",
      "subsystem": "10",
      "name": "Резервне живлення",
      "manufacturer": "EcoFlow",
      "model": "DELTA 2 (1024 Вт·год)",
      "status": "SELECTED",
      "confidence": "C",
      "priceUah": 31999,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://sanlarix.com.ua/product/zaryadna-stancziya-ecoflow-delta-2-1024-vt-god/",
      "store": "Sanlarix / bolt-on.com.ua",
      "verifiedAt": "2026-09-16",
      "specifications": "1024 Вт·год, LiFePO4, 1800 Вт (пік 2700 Вт), ДБЖ-перемикання <30 мс, розмір 400×211×281 мм, вага 12 кг.",
      "compatibility": "Розміщується у службовій ніші кабінки ревізії 07 поруч із принтерами й mini-PC.",
      "alternatives": "EcoFlow DELTA 3 EU розглядався раніше; користувач прямо підтвердив DELTA 2 для ревізії 07.",
      "reason": "Користувач прямо підтвердив EcoFlow DELTA 2 для ревізії 07 (БУДКА.blend).",
      "verify": "NEEDS CALCULATION: пусковий струм DNP DS-RX1HS + Brother HL-L5210DN + mini-PC одночасно, реальний час автономної роботи, місце в службовій ніші за геометрією blend."
    },
    {
      "id": "PWR-002",
      "subsystem": "10",
      "name": "Розподіл живлення та електричний захист",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "CTL-001",
      "subsystem": "11",
      "name": "Контролер автоматики",
      "manufacturer": "TODO: VERIFY",
      "model": "ESP32 (точна плата TODO: VERIFY)",
      "status": "CANDIDATE",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "Запропоновані функції: STEP/DIR/ENABLE, кінцевики, статус, світло, датчики, вентилятори. Піни та рівні не визначені.",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна плата, інтерфейс Windows, драйвер і електричні рівні, watchdog, boot/reset стани, апаратний E-stop незалежно від прошивки."
    },
    {
      "id": "CTL-002",
      "subsystem": "11",
      "name": "Датчики та вентиляція",
      "manufacturer": "Arctic",
      "model": "P12 PWM PST, 120×120×25 мм",
      "status": "SELECTED",
      "confidence": "C",
      "priceUah": 332,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://brain.com.ua/ukr/Kuler_do_korpusu_Arctic_P12_PWM_Black_ACFAN00119A-p662540.html",
      "store": "Brain.com.ua",
      "verifiedAt": "2026-09-16",
      "specifications": "Один осьовий вентилятор 12 В, 4-pin PWM, 200–1800 об/хв, гідродинамічний підшипник, з пиловим фільтром — витяжка у верхній частині стіни ЗАД (service side). Приплив пасивний через решітку з фільтром у стіні ЛІВО, без окремого вентилятора.",
      "compatibility": "Живлення від PWR-002; отвори вирізані в панелях ЗАД (220×220 мм, витяжка) і ЛІВО (250×160 мм, приплив) за geometrию drawings/revision-07/design.json (design.parts holes vent-exhaust/vent-intake).",
      "alternatives": "Пара вентиляторів розглядалась раніше; для одного невеликого технічного відсіку достатньо одного витяжного + пасивного припливу.",
      "reason": "Ревізія 07 додала реальну геометрію CTL-002 (раніше порожній плейсхолдер): закритий ДСП-короб з 2 принтерами, ПК, камерою, LED і EcoFlow потребує охолодження.",
      "verify": "Реальний тепловий розрахунок відсіку, шумність у гостьовому просторі, розмір ґраток і кріплення пилового фільтра перед серійним вирізанням."
    },
    {
      "id": "NET-001",
      "subsystem": "12",
      "name": "Роутер та канал зв’язку",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "SW-001",
      "subsystem": "13",
      "name": "Єдина програма фотобудки",
      "manufacturer": "TODO: VERIFY",
      "model": "C# / .NET + WPF",
      "status": "CANDIDATE",
      "confidence": "C",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "Запропонований стек, DI, модульні сервіси та simulator. Версія .NET не обрана.",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Canon SDK, платіжний SDK, друк та kiosk mode до великої реалізації."
    },
    {
      "id": "AI-001",
      "subsystem": "14",
      "name": "AI backend/API",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "DOC-001",
      "subsystem": "15",
      "name": "Профілі фото на документи",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "UPL-001",
      "subsystem": "16",
      "name": "Сервіс завантаження з телефона",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "CANDIDATE",
      "confidence": "C",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "Запропоновано: session ID → QR → HTTPS upload → активна сесія; backend + WebSocket.",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Хостинг, одноразові токени, ізоляція сесій, ліміти, термін зберігання, декодування та видалення файлів."
    },
    {
      "id": "IG-001",
      "subsystem": "17",
      "name": "Instagram API",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "IDEA",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Актуальні офіційні обмеження Meta, типи акаунтів, дозволи та доступність пошуку @username; scraping не є основою."
    },
    {
      "id": "SEC-001",
      "subsystem": "18",
      "name": "Windows kiosk lockdown",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Матриця редакцій Windows для Assigned Access / Shell Launcher та WPF; kiosk user, автологін, заборона Explorer/налаштувань, watchdog, USB, reboot, сервісний PIN."
    },
    {
      "id": "MON-001",
      "subsystem": "19",
      "name": "Дистанційний моніторинг",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "TST-001",
      "subsystem": "20",
      "name": "Стенд та приймальні випробування",
      "manufacturer": "TODO: VERIFY",
      "model": "TODO: VERIFY",
      "status": "NEEDS VERIFICATION",
      "confidence": "D",
      "priceUah": null,
      "budgetUah": null,
      "quantity": null,
      "url": null,
      "store": "TODO: VERIFY",
      "verifiedAt": null,
      "specifications": "TODO: VERIFY",
      "compatibility": "TODO: VERIFY",
      "alternatives": "Не обрано; заміна SELECTED потребує окремого рішення.",
      "reason": "Позиція для виконання вимог користувача; точний підбір не виконано.",
      "verify": "Точна модель, технічна документація, інтерфейси, електричні параметри, кількість, ціна та сумісність: TODO: VERIFY."
    },
    {
      "id": "OPT-002",
      "subsystem": "03",
      "name": "Моторизований об’єктив у плані покупки",
      "manufacturer": "Canon",
      "model": "RF-S 14–30mm F4–6.3 IS STM PZ",
      "status": "SELECTED",
      "confidence": "B",
      "priceUah": 7899,
      "budgetUah": null,
      "quantity": 1,
      "url": "https://ti.ua/ua/obektiv-dlya-fotoapparata-canon-rf-s-14-30mm-f-4-6-3-is-stm-pz.html",
      "store": "Техно Їжак",
      "verifiedAt": "2026-09-13",
      "specifications": "[A] Моторизований зум 14–30 мм. [B] Сторінка продавця та її структуровані дані: 7899 грн, у наявності.",
      "compatibility": "Керування моторизованим зумом через Canon EOS Utility підтверджено користувачем і прийнято у план для EOS R50.",
      "alternatives": "Не шукаємо заміну вибраному виробу. Комплектний 18–45 залишається у складі камери.",
      "reason": "Прямий вибір користувача. Окрема покупка додатково до раніше вибраного комплекту R50; комплектну ціну камери не змінювали.",
      "verify": "Власний тест агента не проведено. Під час інтеграції зберегти версії EOS Utility і прошивки, перевірити крайні фокусні та повторюваність команд.",
      "claims": [
        {
          "confidence": "A",
          "date": "2026-09-13",
          "url": "https://cam.start.canon/en/S003/manual/html/UG-03_RemoteCamera_0070.html",
          "statement": "У розділі Powered Zooming для PZ названо R50 V; звичайну R50 не названо.",
          "archived": true
        },
        {
          "confidence": "B",
          "date": "2026-09-13",
          "url": "https://ti.ua/ua/obektiv-dlya-fotoapparata-canon-rf-s-14-30mm-f-4-6-3-is-stm-pz.html",
          "statement": "Пряме читання сторінки: 7899 UAH, InStock; це знімок ціни, не бронювання.",
          "archived": true
        },
        {
          "confidence": "C",
          "date": "2026-09-13",
          "statement": "Користувач підтвердив керування зумом через EOS Utility. Прийнято як користувацьке підтвердження, не як власний стендовий тест агента.",
          "source": "Останнє уточнення користувача",
          "archived": false
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "Q-001",
      "topic": "CAMERA LIFT",
      "question": "Отримати паспорт, креслення і комплектність TBD45-500 та точний артикул кронштейна серії 57.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-002",
      "topic": "CAMERA LIFT",
      "question": "Визначити масу рухомої збірки з об’єктивом, потрібний діапазон висоти очей, швидкість, прискорення і робочий цикл.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-003",
      "topic": "CAMERA LIFT",
      "question": "Знайти звичайний NEMA23 у бюджеті 1000–1500 грн та перевірити момент на потрібних RPM, вал і габарити.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-004",
      "topic": "CAMERA LIFT",
      "question": "Узгодити муфту, драйвер, живлення і електричний інтерфейс ESP32 лише після вибору двигуна.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-005",
      "topic": "CAMERA LIFT",
      "question": "Вибрати незалежний захист від падіння; довести безпечну поведінку при втраті живлення, обриві ременя, reset MCU й E-stop.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-006",
      "topic": "CAMERA LIFT",
      "question": "Визначити кінцевики, homing, упори, огородження, кабелеукладач, кронштейн Canon і ресурс кабелів.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-007",
      "topic": "CAMERA LIFT",
      "question": "Визначити метод пошуку рівня очей, допустиму похибку та реакцію на кілька облич або втрату обличчя.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-008",
      "topic": "Наступні етапи",
      "question": "Перевірити EDSDK для R50 і повний ланцюг спалаху; не починати детальну реалізацію до APPROVED підйому.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-009",
      "topic": "Наступні етапи",
      "question": "Затвердити принтер, витратні матеріали та різання фотосмужок.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-010",
      "topic": "Наступні етапи",
      "question": "Перевірити термінал, український еквайринг, інтеграцію й фіскалізацію за актуальними офіційними джерелами.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-011",
      "topic": "Наступні етапи",
      "question": "Виміряти повний профіль навантаження для 30 хвилин автономії.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-012",
      "topic": "Наступні етапи",
      "question": "Перевірити Windows 11 Pro, WPF та потрібний kiosk lockdown; зміну редакції записати окремим рішенням.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    },
    {
      "id": "Q-013",
      "topic": "Наступні етапи",
      "question": "Визначити профілі документів, персональні дані, строки видалення, AI-провайдера й допустимість Instagram API.",
      "status": "NEEDS VERIFICATION",
      "confidence": "D"
    }
  ],
  "knowledgeGraph": {
    "version": 1,
    "notes": "Проєкція структури та проєктних намірів з наявних документів. Не свідчить про монтаж або сумісність. Статуси компонентів успадковуються з components. NEEDS_VERIFICATION використовується лише як status_key, оригінальний статус збережено.",
    "nodes": [
      {
        "id": "HOME",
        "title": "Фотобудка Славутич",
        "file": "docs/obsidian/00_HOME.md",
        "category": "system",
        "description": "Технічна карта проєкту: компоненти, ПЗ, механіка, електрика, залежності, тести й проблеми."
      },
      {
        "id": "SYSTEM",
        "title": "System Architecture",
        "file": "docs/obsidian/01_SYSTEM/System Architecture.md",
        "category": "system",
        "description": "",
        "document": "docs/architecture/SYSTEM_ARCHITECTURE.md"
      },
      {
        "id": "HARDWARE",
        "title": "Hardware",
        "file": "docs/obsidian/02_HARDWARE/Hardware.md",
        "category": "hardware",
        "description": ""
      },
      {
        "id": "CAMERA",
        "title": "Camera",
        "file": "docs/obsidian/03_CAMERA/Camera.md",
        "category": "hardware",
        "description": ""
      },
      {
        "id": "LIFT",
        "title": "Camera Lift",
        "file": "docs/obsidian/04_CAMERA_LIFT/Camera Lift.md",
        "category": "mechanical",
        "description": "",
        "document": "docs/MECHANICAL.md"
      },
      {
        "id": "LIGHT",
        "title": "Lighting",
        "file": "docs/obsidian/05_LIGHTING/Lighting.md",
        "category": "hardware",
        "description": ""
      },
      {
        "id": "PRINT",
        "title": "Printing",
        "file": "docs/obsidian/06_PRINTING/Printing.md",
        "category": "hardware",
        "description": ""
      },
      {
        "id": "PAY",
        "title": "Payment",
        "file": "docs/obsidian/07_PAYMENT/Payment.md",
        "category": "hardware",
        "description": ""
      },
      {
        "id": "COMPUTER",
        "title": "Computer",
        "file": "docs/obsidian/08_COMPUTER/Computer.md",
        "category": "hardware",
        "description": ""
      },
      {
        "id": "POWER",
        "title": "Electrical",
        "file": "docs/obsidian/09_POWER/Electrical.md",
        "category": "electrical",
        "description": "",
        "document": "docs/SAFETY.md"
      },
      {
        "id": "SOFTWARE",
        "title": "Software",
        "file": "docs/obsidian/10_SOFTWARE/Software.md",
        "category": "software",
        "description": "",
        "document": "docs/SOFTWARE.md"
      },
      {
        "id": "UX",
        "title": "UI UX",
        "file": "docs/obsidian/11_UI_UX/UI UX.md",
        "category": "software",
        "description": ""
      },
      {
        "id": "VISION",
        "title": "AI Vision",
        "file": "docs/obsidian/12_AI_VISION/AI Vision.md",
        "category": "software",
        "description": ""
      },
      {
        "id": "WIRING",
        "title": "Wiring",
        "file": "docs/obsidian/13_WIRING/Wiring.md",
        "category": "electrical",
        "description": "",
        "document": "docs/WIRING.md"
      },
      {
        "id": "MECHANICAL",
        "title": "Mechanical",
        "file": "docs/obsidian/14_MECHANICAL/Mechanical.md",
        "category": "mechanical",
        "description": ""
      },
      {
        "id": "ASSEMBLY",
        "title": "Assembly",
        "file": "docs/obsidian/15_ASSEMBLY/Assembly.md",
        "category": "mechanical",
        "description": ""
      },
      {
        "id": "TESTS",
        "title": "Tests",
        "file": "docs/obsidian/16_TESTING/Tests.md",
        "category": "tests",
        "description": "",
        "document": "docs/TESTING.md"
      },
      {
        "id": "PURCHASES",
        "title": "Purchases",
        "file": "docs/obsidian/17_PURCHASES/Purchases.md",
        "category": "purchases",
        "description": ""
      },
      {
        "id": "COSTS",
        "title": "Costs",
        "file": "docs/obsidian/18_COSTS/Costs.md",
        "category": "costs",
        "description": "",
        "document": "docs/design/BUDGET-04.md"
      },
      {
        "id": "PROBLEMS",
        "title": "Problems",
        "file": "docs/obsidian/19_PROBLEMS/Problems.md",
        "category": "problems",
        "description": ""
      },
      {
        "id": "DECISIONS",
        "title": "Decisions",
        "file": "docs/obsidian/20_DECISIONS/Decisions.md",
        "category": "decisions",
        "description": "",
        "document": "docs/DECISIONS.md"
      },
      {
        "id": "ENC-001",
        "title": "ENC-001 Корпус кабінки",
        "file": "docs/obsidian/14_MECHANICAL/ENC-001 Корпус кабінки.md",
        "category": "hardware",
        "description": "Корпус кабінки"
      },
      {
        "id": "CAM-001",
        "title": "Canon EOS R50",
        "file": "docs/obsidian/03_CAMERA/Canon EOS R50.md",
        "category": "hardware",
        "description": "Основна камера"
      },
      {
        "id": "CAM-002",
        "title": "CAM-002 Безперервне живлення Canon",
        "file": "docs/obsidian/03_CAMERA/CAM-002 Безперервне живлення Canon.md",
        "category": "hardware",
        "description": "Безперервне живлення Canon"
      },
      {
        "id": "OPT-001",
        "title": "OPT-001 Об’єктив",
        "file": "docs/obsidian/03_CAMERA/OPT-001 Об’єктив.md",
        "category": "hardware",
        "description": "Об’єктив"
      },
      {
        "id": "LGT-001",
        "title": "LGT-001 Постійне LED-світло",
        "file": "docs/obsidian/05_LIGHTING/LGT-001 Постійне LED-світло.md",
        "category": "hardware",
        "description": "Постійне LED-світло"
      },
      {
        "id": "LGT-002",
        "title": "LGT-002 Студійний спалах Godox",
        "file": "docs/obsidian/05_LIGHTING/LGT-002 Студійний спалах Godox.md",
        "category": "hardware",
        "description": "Студійний спалах Godox"
      },
      {
        "id": "LGT-003",
        "title": "LGT-003 Великий матовий розсіювач",
        "file": "docs/obsidian/05_LIGHTING/LGT-003 Великий матовий розсіювач.md",
        "category": "hardware",
        "description": "Великий матовий розсіювач"
      },
      {
        "id": "LGT-004",
        "title": "LGT-004 Синхронізатор Godox",
        "file": "docs/obsidian/05_LIGHTING/LGT-004 Синхронізатор Godox.md",
        "category": "hardware",
        "description": "Синхронізатор Godox"
      },
      {
        "id": "LGT-005",
        "title": "LGT-005 Адаптер башмака за необхідності",
        "file": "docs/obsidian/05_LIGHTING/LGT-005 Адаптер башмака за необхідності.md",
        "category": "hardware",
        "description": "Адаптер башмака за необхідності"
      },
      {
        "id": "MOT-001",
        "title": "TBD45-700",
        "file": "docs/obsidian/04_CAMERA_LIFT/TBD45-700.md",
        "category": "hardware",
        "description": "Новий модуль 700 мм за ТЗ 20.09.2026"
      },
      {
        "id": "MOT-002",
        "title": "NEMA 23",
        "file": "docs/obsidian/04_CAMERA_LIFT/NEMA 23.md",
        "category": "hardware",
        "description": "Звичайний кроковий двигун NEMA23"
      },
      {
        "id": "MOT-003",
        "title": "NEMA23 Bracket",
        "file": "docs/obsidian/04_CAMERA_LIFT/NEMA23 Bracket.md",
        "category": "hardware",
        "description": "Кронштейн двигуна серії 57 / NEMA23"
      },
      {
        "id": "MOT-004",
        "title": "Motor Coupling",
        "file": "docs/obsidian/04_CAMERA_LIFT/Motor Coupling.md",
        "category": "hardware",
        "description": "Муфта"
      },
      {
        "id": "MOT-005",
        "title": "Motor Driver",
        "file": "docs/obsidian/04_CAMERA_LIFT/Motor Driver.md",
        "category": "hardware",
        "description": "Драйвер крокового двигуна"
      },
      {
        "id": "MOT-006",
        "title": "Motor PSU",
        "file": "docs/obsidian/04_CAMERA_LIFT/Motor PSU.md",
        "category": "hardware",
        "description": "Блок живлення осі"
      },
      {
        "id": "MOT-007",
        "title": "Limit Switches",
        "file": "docs/obsidian/04_CAMERA_LIFT/Limit Switches.md",
        "category": "hardware",
        "description": "Кінцевики"
      },
      {
        "id": "MOT-008",
        "title": "Emergency Stop",
        "file": "docs/obsidian/04_CAMERA_LIFT/Emergency Stop.md",
        "category": "hardware",
        "description": "Аварійна зупинка та апаратний ланцюг безпеки"
      },
      {
        "id": "MOT-009",
        "title": "Motion Cables",
        "file": "docs/obsidian/04_CAMERA_LIFT/Motion Cables.md",
        "category": "hardware",
        "description": "Рухомі кабелі та роз’єми"
      },
      {
        "id": "MOT-010",
        "title": "Cable Chain",
        "file": "docs/obsidian/04_CAMERA_LIFT/Cable Chain.md",
        "category": "hardware",
        "description": "Кабелеукладач"
      },
      {
        "id": "MOT-011",
        "title": "Canon Mount",
        "file": "docs/obsidian/04_CAMERA_LIFT/Canon Mount.md",
        "category": "hardware",
        "description": "Кронштейн Canon"
      },
      {
        "id": "MOT-012",
        "title": "Fall Protection",
        "file": "docs/obsidian/04_CAMERA_LIFT/Fall Protection.md",
        "category": "hardware",
        "description": "Незалежний механічний захист від падіння"
      },
      {
        "id": "MOT-013",
        "title": "Motion Guards",
        "file": "docs/obsidian/04_CAMERA_LIFT/Motion Guards.md",
        "category": "hardware",
        "description": "Огородження, упори та захист від защемлення"
      },
      {
        "id": "PC-001",
        "title": "Mini PC",
        "file": "docs/obsidian/08_COMPUTER/Mini PC.md",
        "category": "hardware",
        "description": "Windows mini-PC"
      },
      {
        "id": "DSP-001",
        "title": "Touchscreen",
        "file": "docs/obsidian/11_UI_UX/Touchscreen.md",
        "category": "hardware",
        "description": "Сенсорний екран"
      },
      {
        "id": "PRI-001",
        "title": "DNP DS-RX1HS",
        "file": "docs/obsidian/06_PRINTING/Printer.md",
        "category": "hardware",
        "description": "Фотопринтер DNP DS-RX1HS"
      },
      {
        "id": "PRI-002",
        "title": "Brother HL-L5210DN",
        "file": "docs/obsidian/06_PRINTING/Brother HL-L5210DN.md",
        "category": "hardware",
        "description": "Монохромний принтер документів A4"
      },
      {
        "id": "PRI-002-TONER",
        "title": "Brother TN3600XXL",
        "file": "docs/obsidian/06_PRINTING/Brother TN3600XXL.md",
        "category": "hardware",
        "description": "Сумісний тонер HL-L5210DN приблизно на 11 000 сторінок"
      },
      {
        "id": "PRI-003",
        "title": "A4 Duplex Scanner",
        "file": "docs/obsidian/06_PRINTING/A4 Duplex Scanner.md",
        "category": "hardware",
        "description": "Майбутній протяжний A4 duplex scanner з TWAIN/WIA"
      },
      {
        "id": "PAY-001",
        "title": "Payment Terminal",
        "file": "docs/obsidian/07_PAYMENT/Payment Terminal.md",
        "category": "hardware",
        "description": "Вендинговий платіжний термінал"
      },
      {
        "id": "PWR-001",
        "title": "PWR-001 Резервне живлення",
        "file": "docs/obsidian/09_POWER/PWR-001 Резервне живлення.md",
        "category": "hardware",
        "description": "Резервне живлення"
      },
      {
        "id": "PWR-002",
        "title": "PWR-002 Розподіл живлення та електричний захист",
        "file": "docs/obsidian/09_POWER/PWR-002 Розподіл живлення та електричний захист.md",
        "category": "hardware",
        "description": "Розподіл живлення та електричний захист"
      },
      {
        "id": "CTL-001",
        "title": "ESP32",
        "file": "docs/obsidian/09_POWER/ESP32.md",
        "category": "hardware",
        "description": "Контролер автоматики"
      },
      {
        "id": "CTL-002",
        "title": "CTL-002 Датчики та вентиляція",
        "file": "docs/obsidian/09_POWER/CTL-002 Датчики та вентиляція.md",
        "category": "hardware",
        "description": "Датчики та вентиляція"
      },
      {
        "id": "NET-001",
        "title": "NET-001 Роутер та канал зв’язку",
        "file": "docs/obsidian/08_COMPUTER/NET-001 Роутер та канал зв’язку.md",
        "category": "hardware",
        "description": "Роутер та канал зв’язку"
      },
      {
        "id": "SW-001",
        "title": "SW-001 Єдина програма фотобудки",
        "file": "docs/obsidian/10_SOFTWARE/SW-001 Єдина програма фотобудки.md",
        "category": "software",
        "description": "Єдина програма фотобудки"
      },
      {
        "id": "AI-001",
        "title": "AI-001 AI backend/API",
        "file": "docs/obsidian/12_AI_VISION/AI-001 AI backend/API.md",
        "category": "software",
        "description": "AI backend/API"
      },
      {
        "id": "DOC-001",
        "title": "DOC-001 Профілі фото на документи",
        "file": "docs/obsidian/06_PRINTING/DOC-001 Профілі фото на документи.md",
        "category": "software",
        "description": "Профілі фото на документи"
      },
      {
        "id": "UPL-001",
        "title": "UPL-001 Сервіс завантаження з телефона",
        "file": "docs/obsidian/11_UI_UX/UPL-001 Сервіс завантаження з телефона.md",
        "category": "software",
        "description": "Сервіс завантаження з телефона"
      },
      {
        "id": "IG-001",
        "title": "IG-001 Instagram API",
        "file": "docs/obsidian/11_UI_UX/IG-001 Instagram API.md",
        "category": "software",
        "description": "Instagram API"
      },
      {
        "id": "SEC-001",
        "title": "SEC-001 Windows kiosk lockdown",
        "file": "docs/obsidian/10_SOFTWARE/SEC-001 Windows kiosk lockdown.md",
        "category": "software",
        "description": "Windows kiosk lockdown"
      },
      {
        "id": "MON-001",
        "title": "MON-001 Дистанційний моніторинг",
        "file": "docs/obsidian/10_SOFTWARE/MON-001 Дистанційний моніторинг.md",
        "category": "software",
        "description": "Дистанційний моніторинг"
      },
      {
        "id": "TST-001",
        "title": "TST-001 Стенд та приймальні випробування",
        "file": "docs/obsidian/16_TESTING/TST-001 Стенд та приймальні випробування.md",
        "category": "software",
        "description": "Стенд та приймальні випробування"
      },
      {
        "id": "CAM-SVC",
        "title": "Camera Service",
        "file": "docs/obsidian/10_SOFTWARE/Camera Service.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "FACE-SVC",
        "title": "FaceTrackingService",
        "file": "docs/obsidian/10_SOFTWARE/FaceTrackingService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "MOTION-SVC",
        "title": "MotionService",
        "file": "docs/obsidian/10_SOFTWARE/MotionService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "PAY-SVC",
        "title": "PaymentService",
        "file": "docs/obsidian/10_SOFTWARE/PaymentService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "PRINT-SVC",
        "title": "PrinterService",
        "file": "docs/obsidian/10_SOFTWARE/PrinterService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "DOC-SVC",
        "title": "DocumentPhotoService",
        "file": "docs/obsidian/10_SOFTWARE/DocumentPhotoService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "AI-SVC",
        "title": "AIService",
        "file": "docs/obsidian/10_SOFTWARE/AIService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "UPLOAD-SVC",
        "title": "UploadService",
        "file": "docs/obsidian/10_SOFTWARE/UploadService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "SESSION-SVC",
        "title": "SessionService",
        "file": "docs/obsidian/10_SOFTWARE/SessionService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "HEALTH-SVC",
        "title": "HealthService",
        "file": "docs/obsidian/10_SOFTWARE/HealthService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "UPDATE-SVC",
        "title": "UpdateService",
        "file": "docs/obsidian/10_SOFTWARE/UpdateService.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "UI",
        "title": "Kiosk UI",
        "file": "docs/obsidian/11_UI_UX/Kiosk UI.md",
        "category": "software",
        "description": "Запланований модуль; реалізація та SDK ще не перевірені."
      },
      {
        "id": "LIVE",
        "title": "Live View",
        "file": "docs/obsidian/03_CAMERA/Live View.md",
        "category": "interface",
        "description": "Запланований потік preview з Canon; підтримку конкретного EDSDK треба перевірити."
      },
      {
        "id": "CALIBRATION",
        "title": "Calibration",
        "file": "docs/obsidian/04_CAMERA_LIFT/Calibration.md",
        "category": "mechanical",
        "description": "Homing, калібрування координат і висоти очей; метод, точність і межі UNKNOWN."
      },
      {
        "id": "CONCEPT01",
        "title": "Концепт 01 — геометрія і конструкція",
        "file": "docs/obsidian/14_MECHANICAL/Концепт 01 — геометрія і конструкція.md",
        "category": "mechanical",
        "description": "Архів. Відхилено користувачем: нестабільне відображення й нелогічне компонування. Актуальна ревізія 02 у dashboard.",
        "document": "docs/design/CONCEPT-V1.md"
      },
      {
        "id": "RESEARCH01",
        "title": "Камера світло і магазини — 2026-09-13",
        "file": "docs/obsidian/14_MECHANICAL/Камера світло і магазини — 2026-09-13.md",
        "category": "hardware",
        "description": "Концепт для перевірки; виробництво не погоджене.",
        "document": "docs/research/CAMERA-LIGHTING-2026-09-13.md"
      },
      {
        "id": "REVISION02",
        "title": "Ревізія 02 — актуальна конструкція",
        "file": "docs/obsidian/14_MECHANICAL/Ревізія 02 — актуальна конструкція.md",
        "category": "mechanical",
        "document": "docs/design/REVISION-02.md",
        "description": "Цілісний модуль за фото 4, дзеркало справа, MS200V, єдиний український дашборд."
      },
      {
        "id": "REVISION03",
        "title": "Ревізія 03 — вбудований блок",
        "file": "docs/obsidian/14_MECHANICAL/Ревізія 03 — вбудований блок.md",
        "category": "mechanical",
        "document": "docs/design/REVISION-03.md",
        "description": "Спрощена шафа, сервіс ззаду, каркас і проводка; об’єктив PZ у плані, підтримка R50 обмежена."
      },
      {
        "id": "OPT-002",
        "title": "OPT-002 Моторизований об’єктив 14–30 PZ",
        "file": "docs/obsidian/03_CAMERA/OPT-002 Моторизований об’єктив 14–30 PZ.md",
        "category": "hardware",
        "description": "Вибрано користувачем; керування EOS Utility для R50 не заявлене Canon."
      },
      {
        "id": "DESIGN-04",
        "title": "Ревізія 04 Єдиний каркас",
        "file": "docs/obsidian/14_MECHANICAL/Ревізія 04 Єдиний каркас.md",
        "category": "mechanical",
        "document": "docs/design/REVISION-04.md",
        "description": "Поточна конструктивна пропозиція після відхилення ревізії 03.",
        "status": "CANDIDATE",
        "confidence": "C"
      },
      {
        "id": "DESIGN-08",
        "title": "Ревізія 08 Авторська геометрія Blender",
        "file": "docs/obsidian/14_MECHANICAL/Ревізія 08 Авторська геометрія.md",
        "category": "mechanical",
        "document": "docs/design/REVISION-08.md",
        "description": "Точний перенос 62 авторських мешів і Dimensions; доповнення обладнанням.",
        "status": "CANDIDATE",
        "confidence": "C"
      },
      {
        "id": "DESIGN-09",
        "title": "Ревізія 09 Монтаж корпусу Богдана",
        "file": "docs/obsidian/14_MECHANICAL/Ревізія 09 Монтаж корпусу.md",
        "category": "mechanical",
        "document": "docs/design/REVISION-09.md",
        "description": "Авторська модель 17.09.2026: 72 об’єкти, зведені аркуші ДСП та каркаса, завдання майстру.",
        "status": "CANDIDATE",
        "confidence": "C"
      }
    ],
    "edges": [
      {
        "source": "HOME",
        "target": "SYSTEM",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "HARDWARE",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "CAMERA",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "LIFT",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "LIGHT",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "PRINT",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "PAY",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "COMPUTER",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "POWER",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "SOFTWARE",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "UX",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "VISION",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "WIRING",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "MECHANICAL",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "ASSEMBLY",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "TESTS",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "PURCHASES",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "COSTS",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "PROBLEMS",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HOME",
        "target": "DECISIONS",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "MECHANICAL",
        "target": "ENC-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "ENC-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "CAMERA",
        "target": "CAM-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "CAM-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "CAMERA",
        "target": "CAM-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "CAM-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "CAMERA",
        "target": "OPT-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "OPT-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIGHT",
        "target": "LGT-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "LGT-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIGHT",
        "target": "LGT-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "LGT-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIGHT",
        "target": "LGT-003",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "LGT-003",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIGHT",
        "target": "LGT-004",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "LGT-004",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIGHT",
        "target": "LGT-005",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "LGT-005",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-003",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-003",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-004",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-004",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-005",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-005",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-006",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-006",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-007",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-007",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-008",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-008",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-009",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-009",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-010",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-010",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-011",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-011",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-012",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-012",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "MOT-013",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "MOT-013",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "COMPUTER",
        "target": "PC-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "PC-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "UX",
        "target": "DSP-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "DSP-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "PRINT",
        "target": "PRI-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "PRI-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "PAY",
        "target": "PAY-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "PAY-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "POWER",
        "target": "PWR-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "PWR-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "POWER",
        "target": "PWR-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "PWR-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "POWER",
        "target": "CTL-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "CTL-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "POWER",
        "target": "CTL-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "CTL-002",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "COMPUTER",
        "target": "NET-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "HARDWARE",
        "target": "NET-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "SW-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "VISION",
        "target": "AI-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "PRINT",
        "target": "DOC-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "UX",
        "target": "UPL-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "UX",
        "target": "IG-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "SEC-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "MON-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "TESTS",
        "target": "TST-001",
        "relation": "contains",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "CAM-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "FACE-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "MOTION-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "PAY-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "PRINT-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "DOC-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "AI-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "UPLOAD-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "SESSION-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "HEALTH-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "UPDATE-SVC",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "SOFTWARE",
        "target": "UI",
        "relation": "contains",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "C",
        "evidence": "структура реєстру"
      },
      {
        "source": "UI",
        "target": "SESSION-SVC",
        "relation": "sends",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "DSP-001",
        "target": "UI",
        "relation": "connects_to",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "SESSION-SVC",
        "target": "CAM-SVC",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "SESSION-SVC",
        "target": "MOTION-SVC",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "SESSION-SVC",
        "target": "PAY-SVC",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "SESSION-SVC",
        "target": "PRINT-SVC",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CAM-SVC",
        "target": "CAM-001",
        "relation": "controls",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CAM-SVC",
        "target": "LIVE",
        "relation": "sends",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIVE",
        "target": "FACE-SVC",
        "relation": "sends",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "FACE-SVC",
        "target": "MOTION-SVC",
        "relation": "sends",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOTION-SVC",
        "target": "CTL-001",
        "relation": "sends",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CTL-001",
        "target": "MOT-005",
        "relation": "controls",
        "sourceDocument": "docs/WIRING.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-005",
        "target": "MOT-002",
        "relation": "controls",
        "sourceDocument": "docs/WIRING.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-001",
        "target": "MOT-002",
        "relation": "driven_by",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-001",
        "target": "MOT-004",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-002",
        "target": "MOT-003",
        "relation": "depends_on",
        "sourceDocument": "docs/WIRING.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-002",
        "target": "MOT-006",
        "relation": "powered_by",
        "sourceDocument": "docs/WIRING.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-005",
        "target": "MOT-006",
        "relation": "powered_by",
        "sourceDocument": "docs/WIRING.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CTL-001",
        "target": "MOT-007",
        "relation": "uses",
        "sourceDocument": "docs/WIRING.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "CALIBRATION",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CALIBRATION",
        "target": "MOT-007",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "MOT-012",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "MOT-008",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CAM-001",
        "target": "MOT-011",
        "relation": "depends_on",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "MOT-009",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-009",
        "target": "MOT-010",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "MOT-013",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CAM-001",
        "target": "CAM-002",
        "relation": "powered_by",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CAM-001",
        "target": "OPT-001",
        "relation": "uses",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CAM-001",
        "target": "LGT-004",
        "relation": "connects_to",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LGT-004",
        "target": "LGT-005",
        "relation": "depends_on",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "лише за необхідності; потрібність AD-E1 НЕ підтверджена"
      },
      {
        "source": "LGT-004",
        "target": "LGT-002",
        "relation": "controls",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LGT-002",
        "target": "LGT-003",
        "relation": "uses",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "PAY-SVC",
        "target": "PAY-001",
        "relation": "controls",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "PRINT-SVC",
        "target": "PRI-001",
        "relation": "controls",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "DOC-SVC",
        "target": "DOC-001",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "DOC-SVC",
        "target": "PRINT-SVC",
        "relation": "sends",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "AI-SVC",
        "target": "AI-001",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "UPLOAD-SVC",
        "target": "UPL-001",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "UPLOAD-SVC",
        "target": "PRINT-SVC",
        "relation": "sends",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "UI",
        "target": "UPLOAD-SVC",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "UI",
        "target": "DOC-SVC",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "UI",
        "target": "AI-SVC",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "HEALTH-SVC",
        "target": "MON-001",
        "relation": "uses",
        "sourceDocument": "docs/SOFTWARE.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "UPDATE-SVC",
        "target": "PC-001",
        "relation": "controls",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "SW-001",
        "target": "PC-001",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "UI",
        "target": "SEC-001",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "COMPUTER",
        "target": "NET-001",
        "relation": "uses",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "VISION",
        "target": "FACE-SVC",
        "relation": "contains",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "структура реєстру"
      },
      {
        "source": "LIFT",
        "target": "WIRING",
        "relation": "documented_by",
        "sourceDocument": "docs/WIRING.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "ASSEMBLY",
        "target": "MECHANICAL",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "ASSEMBLY",
        "target": "WIRING",
        "relation": "depends_on",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "TESTS",
        "relation": "tested_by",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "PROBLEMS",
        "relation": "blocked_by",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LIFT",
        "target": "DECISIONS",
        "relation": "documented_by",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MECHANICAL",
        "target": "LIFT",
        "relation": "contains",
        "sourceDocument": "docs/MECHANICAL.md",
        "confidence": "D",
        "evidence": "структура реєстру"
      },
      {
        "source": "COSTS",
        "target": "PURCHASES",
        "relation": "depends_on",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "PC-001",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "DSP-001",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "PRI-001",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CAM-002",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LGT-001",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "LGT-002",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "MOT-006",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "PAY-001",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "NET-001",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "CTL-001",
        "target": "PWR-002",
        "relation": "powered_by",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "PWR-002",
        "target": "PWR-001",
        "relation": "depends_on",
        "sourceDocument": "docs/SAFETY.md",
        "confidence": "D",
        "evidence": "проєктний намір; NEEDS VERIFICATION"
      },
      {
        "source": "HOME",
        "target": "CONCEPT01",
        "relation": "has_concept",
        "sourceDocument": "docs/design/CONCEPT-V1.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "CONCEPT01",
        "target": "ENC-001",
        "relation": "defines_proposal",
        "sourceDocument": "docs/design/CONCEPT-V1.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "CONCEPT01",
        "target": "MOT-001",
        "relation": "reserves_space",
        "sourceDocument": "docs/design/CONCEPT-V1.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "CONCEPT01",
        "target": "RESEARCH01",
        "relation": "uses_sources",
        "sourceDocument": "docs/research/CAMERA-LIGHTING-2026-09-13.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "RESEARCH01",
        "target": "CAM-001",
        "relation": "investigates",
        "sourceDocument": "docs/research/CAMERA-LIGHTING-2026-09-13.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "RESEARCH01",
        "target": "OPT-001",
        "relation": "investigates",
        "sourceDocument": "docs/research/CAMERA-LIGHTING-2026-09-13.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "RESEARCH01",
        "target": "LGT-002",
        "relation": "investigates",
        "sourceDocument": "docs/research/CAMERA-LIGHTING-2026-09-13.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "RESEARCH01",
        "target": "DOC-001",
        "relation": "constrains_processing",
        "sourceDocument": "docs/research/CAMERA-LIGHTING-2026-09-13.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "RESEARCH01",
        "target": "SW-001",
        "relation": "proposes_workflow",
        "sourceDocument": "docs/research/CAMERA-LIGHTING-2026-09-13.md",
        "confidence": "C",
        "evidence": "Явний зв’язок у концепті 13.09.2026; не доказ сумісності."
      },
      {
        "source": "REVISION02",
        "target": "HOME",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-02.md",
        "confidence": "C",
        "evidence": "Новий запит користувача і переглянуті технічні висновки. Не доказ сумісності."
      },
      {
        "source": "REVISION02",
        "target": "ENC-001",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-02.md",
        "confidence": "C",
        "evidence": "Новий запит користувача і переглянуті технічні висновки. Не доказ сумісності."
      },
      {
        "source": "REVISION02",
        "target": "CAM-001",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-02.md",
        "confidence": "C",
        "evidence": "Новий запит користувача і переглянуті технічні висновки. Не доказ сумісності."
      },
      {
        "source": "REVISION02",
        "target": "OPT-001",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-02.md",
        "confidence": "C",
        "evidence": "Новий запит користувача і переглянуті технічні висновки. Не доказ сумісності."
      },
      {
        "source": "REVISION02",
        "target": "LGT-002",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-02.md",
        "confidence": "C",
        "evidence": "Новий запит користувача і переглянуті технічні висновки. Не доказ сумісності."
      },
      {
        "source": "REVISION02",
        "target": "SOFTWARE",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-02.md",
        "confidence": "C",
        "evidence": "Новий запит користувача і переглянуті технічні висновки. Не доказ сумісності."
      },
      {
        "source": "REVISION02",
        "target": "CONCEPT01",
        "relation": "supersedes",
        "sourceDocument": "docs/design/REVISION-02.md",
        "confidence": "C",
        "evidence": "Новий запит користувача і переглянуті технічні висновки. Не доказ сумісності."
      },
      {
        "source": "REVISION03",
        "target": "HOME",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Поточна пропозиція після уточнення користувача; не сертифікація."
      },
      {
        "source": "REVISION03",
        "target": "ENC-001",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Поточна пропозиція після уточнення користувача; не сертифікація."
      },
      {
        "source": "REVISION03",
        "target": "CAM-001",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Поточна пропозиція після уточнення користувача; не сертифікація."
      },
      {
        "source": "REVISION03",
        "target": "LGT-002",
        "relation": "defines_current_proposal",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Поточна пропозиція після уточнення користувача; не сертифікація."
      },
      {
        "source": "REVISION03",
        "target": "REVISION02",
        "relation": "supersedes",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Поточна пропозиція після уточнення користувача; не сертифікація."
      },
      {
        "source": "REVISION03",
        "target": "OPT-002",
        "relation": "requires_verification",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Зв’язок проєктного плану, не доказ сумісності або остаточної ціни."
      },
      {
        "source": "OPT-002",
        "target": "CAM-001",
        "relation": "requires_verification",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Зв’язок проєктного плану, не доказ сумісності або остаточної ціни."
      },
      {
        "source": "REVISION03",
        "target": "COSTS",
        "relation": "requires_verification",
        "sourceDocument": "docs/design/REVISION-03.md",
        "confidence": "C",
        "evidence": "Зв’язок проєктного плану, не доказ сумісності або остаточної ціни."
      },
      {
        "source": "DESIGN-04",
        "target": "ENC-001",
        "relation": "визначає поточне компонування",
        "sourceDocument": "docs/design/REVISION-04.md",
        "confidence": "C",
        "evidence": "Уточнення користувача: один каркас і один шар обшивки."
      },
      {
        "source": "DESIGN-08",
        "target": "ENC-001",
        "relation": "визначає актуальну авторську геометрію",
        "sourceDocument": "docs/design/REVISION-08.md",
        "confidence": "C",
        "evidence": "Файл користувача БУДКА.blend, незмінні вершини та Dimensions."
      },
      {
        "source": "DESIGN-08",
        "target": "PRI-002",
        "relation": "показує монтажний габарит; сумісність не підтверджує",
        "sourceDocument": "docs/design/REVISION-08.md",
        "confidence": "C",
        "evidence": "Принтер A4 і сканер з реєстру включено до компонування 08."
      },
      {
        "source": "DESIGN-08",
        "target": "PRI-003",
        "relation": "показує монтажний габарит; сумісність не підтверджує",
        "sourceDocument": "docs/design/REVISION-08.md",
        "confidence": "C",
        "evidence": "Принтер A4 і сканер з реєстру включено до компонування 08."
      },
      {
        "source": "PRI-002",
        "target": "PRI-002-TONER",
        "relation": "має запис кандидата витратного матеріалу в реєстрі",
        "sourceDocument": "docs/MASTER-SPEC.md",
        "confidence": "C",
        "evidence": "Зв’язок записів PRI-002 і PRI-002-TONER; не є незалежною перевіркою сумісності."
      },
      {
        "source": "DESIGN-09",
        "target": "ENC-001",
        "relation": "актуалізує авторську геометрію і завдання майстру",
        "sourceDocument": "docs/design/REVISION-09.md",
        "confidence": "C",
        "evidence": "Нова модель та уточнення Богдана від 17.09.2026."
      }
    ]
  },
  "conceptDesign": {
    "version": "10",
    "date": "2026-10-15",
    "status": "CANDIDATE",
    "confidence": "C",
    "envelopeMm": [
      1600,
      1000,
      2200
    ],
    "axes": {
      "X": "фасад зліва направо",
      "Y": "глибина від входу",
      "Z": "висота"
    },
    "seats": 2,
    "groupWish": 5,
    "approvedOccupancy": null,
    "benchSide": "left",
    "cameraSide": "right",
    "eyeToLensEstimateMm": 950,
    "referenceManifest": "assets/references/manifest.json",
    "brief": "docs/design/REVISION-10.md",
    "research": "docs/research/REVISION-04-SOURCES.md",
    "viewer": "dashboard/index.html#model",
    "generator": "scripts/blender/build-author-model-10.py",
    "productionReleased": false,
    "requirements": [
      "Вбудована м’яка лавка; комірки для речей",
      "Білий корпус, власна реклама, велике дзеркало справа, біла штора",
      "Велика LED-стеля, верхній і передній розсіювачі",
      "Тонкий верх камери, наближений сенсорний екран, нижній сервісний модуль",
      "Голос і оцінка пози/погляду; вибілення лише фону за профілем документа",
      "Canon R50 kit 18–45; Godox MS200V вибраний; синхронізація без щоденних батарей",
      "Єдиний каркас зі звичайної алюмінієвої труби, один шар ЛДСП 16 мм; спільні стіни без щік модуля",
      "Спалах під камерою, камера за вузьким прозорим вікном 110 мм без великого чорного кожуха",
      "Готова біла штора з карнизом, місцеві роботи Славутич у пріоритеті, групування продавців",
      "DS-RX1HS і HL-L5210DN на двох незалежних полицях; duplex A4 TWAIN/WIA scanner і дві підлогові кишені в нижній вертикальній панелі Z=180–420 мм",
      "Одна незмінна 3D-збірка; ракурси змінюють лише камеру; прозорість і люк керуються окремо",
      "Приховані внутрішні кріплення без видимих головок на зовнішніх і гостьових поверхнях",
      "Один сервісний люк позаду модуля, без водозбірника"
    ],
    "mirrorSide": "right",
    "entrySide": "left",
    "focalLengthProposalMm": null,
    "zoomMode": "Керування RF-S 14–30 PZ через EOS Utility підтверджене користувачем; власного стендового тесту агент не проводив",
    "archive": "drawings/concept-v1",
    "previousConceptRejected": true,
    "integratedModule": true,
    "budgetDocument": "docs/design/REVISION-10.md",
    "budgetData": "drawings/revision-10/budget.json",
    "cutlist": "drawings/revision-10/panel-schedule.json",
    "rearAccess": true,
    "skinThicknessMm": 16,
    "profileCandidate": "Звичайна алюмінієва труба 20×20×2 без покриття",
    "serviceAccess": "Один люк у правій зовнішній стіні — за модулем; видимі сервісні гвинти допустимі лише всередині відкритого люка",
    "viewerRule": "Усі кнопки ракурсів змінюють лише камеру; склад і видимість деталей не змінюються",
    "outputStation": "Два слоти майбутнього A4 duplex TWAIN/WIA scanner + підлогові кишені 10×15 і A4 у нижній вертикальній панелі, Z=180–420 мм",
    "printerShelfZMm": [
      154,
      414
    ],
    "moduleFrame": "Повернутий старий просторовий каркас: зовнішня рама, сервісна обв’язка, внутрішні стійки, три рівні поперечок, центральна оптична касета та профільні полиці. Видалено тільки дві крайні стійки касети Y=16/964, які дублювали довгі стійки X=1326; їхні зв’язки перенесено на довгі стійки. Разом 37 деталей 20×20 і 4 балки 40×20. Звичайні вузли — комплекти 2028; комплекти 2040 застосовуються лише на 8 навантажених кінцях балок полиць",
    "moduleDrawing": "drawings/revision-06/module/index.html",
    "photoPrinter": "DNP DS-RX1HS, 322×351×281 мм, 13.8 кг; джерело — офіційне керівництво DNP",
    "a4Printer": "Brother HL-L5210DN, 373×388×257 мм, 11.2 кг, Gigabit Ethernet або USB 2.0",
    "a4Toner": "TN3600XXL, приблизно 11 000 сторінок; TN3610XL 25 000 сторінок відхилений як несумісний",
    "scanner": "Окремий протяжний A4 duplex scanner з TWAIN/WIA; USB або Ethernet; точна модель TBD",
    "projectState": "PAUSED_UNTIL_FIRST_MODULE",
    "publicMounting": "Приховані внутрішні Z-кліпси й стопори; міцність потребує стендової перевірки",
    "cameraAxisAbsoluteMm": [
      1000,
      1500
    ],
    "ceilingCavityMm": 100,
    "sourceBlend": "БУДКА.blend",
    "sourceSHA256": "2b8f48152970a00ad30e395a091eca47b85e14f904886c514a4f78d67ea8b577",
    "sceneJson": "drawings/revision-10/design.json",
    "dimensionPolicy": "Саме Dimensions і меші об’єктів Blender; без зміни авторської форми та розмірів",
    "dashboardRepository": "https://github.com/BogdanVcode/fotobudka-dashboard"
  },
  "cameraModuleReview": {
    "date": "2026-09-20",
    "status": "prototype-review",
    "document": "docs/camera-module/README.md",
    "visualization": "dashboard/camera-module/index.html",
    "hardwareTested": false,
    "integratedIntoCabin": false
  },
  "changelog": "# Модуль камери 700 мм · 20.09.2026\n\nДодано окрему інтерактивну 3D-модель, симулятор HOME/руху/зупинок, інженерний огляд, схему інтерфейсів, розрахунки та кошик із розмежуванням перевірених цін і резервів. Стару модель кабінки не перебудовано. Апаратні випробування та виробничі отвори не підтверджені.\n\n<!-- REV10 -->\n# Поточна ревізія 10\n\n[Опис актуальних змін](design/REVISION-10.md): сканер у верхньому вирізі, V-Slot, Elo 2470L, повний оцінний кошторис і калькулятор прибутковості. Попередні записи нижче — історія.\n<!-- END-REV10 -->\n\n<!-- REV09 -->\n# Поточна ревізія 09 · 17.09.2026\n\nДив. [актуальний опис](design/REVISION-09.md). Нова модель: scripts/blender/build-author-model-09.py; креслення: scripts/draw-author-panels-09.py; дашборд: scripts/build-dashboard-09.mjs; перевірка: scripts/verify-author-09.mjs. Попередні записи нижче — історія.\n<!-- END-REV09 -->\n\n<!-- REV08 -->\n# Актуалізація 08 · 16.09.2026\n\nСтворено ревізію 08 з прямим переносом мешів Blender, альбомом 16 сторінок А3 та очищеним дашбордом.\n\nПопередні записи нижче — історія.\n<!-- END-REV08 -->\n\n<!-- REV05 -->\n# Оновлення · ревізія 05 · 14.09.2026\n\nРевізія 05: внутрішній каркас модуля 20×20, два принтери, сканер, Cue 2, без водозбірника, без бота 8000 грн. Кожна кнопка 3D-вигляду має власну камеру і набір видимих деталей.\n\nПопередні записи нижче збережені як історія.\n\n<!-- REV04 -->\n# Оновлення · ревізія 04 · 13.09.2026\n\nРевізію 03 відхилено. Перебудовано геометрію, відомість і DXF з одного джерела; прибрано дубльовані щоки. Оновлено кошторис: невідомі ціни не входять у підсумок, готова штора та групування покупок.\n\nПопередні записи нижче збережені як історія.\n\n## Ревізія 03 · 13 вересня 2026\n\nЧинна docs/design/REVISION-03.md. Вбудований блок без підрізу, задні двері, модель з каркасом і кабелями, креслення та попередній кошторис у спільній панелі. RF-S 14–30 PZ SELECTED за користувачем; звичайна R50 відсутня у списку моторизованого зуму EOS Utility. Камеру та інші вибрані позиції не замінено. Кошторис містить резерви, не є остаточною сумою закупівлі.\n\n## Ревізія 02 · виправлення після відгуку\n\nВідхилений концепт 01 збережено в архіві. Нова модель має повноцінну перевірку глибини, цілісні боковини й опору екрана, правильний нахил верхнього розсіювача, дзеркало справа. Панель перероблена на українські картки з документами всередині. MS200V тепер SELECTED за прямим запитом; ціна 3360 грн. Кабель від камери — кандидат, не від комп’ютера.\n\n## 2026-09-13 · Концепт 01\n\nЗа новим запитом користувача розширено ескізну роботу за межі ліфта: фасад 1600/глибина 1000/висота 2200, лавка 2, групове побажання 5. Додано 4 референси, модель OBJ/OpenSCAD,3SVG, DXF, варіанти світла, дослідження Canon/Godox і кандидатів матеріалів. CAM-001:31360 грн за kit із OPT-001, один облік. MS200 кандидат; MS200-V лише альтернатива. Виявлено необхідність адаптера для звичайного Godox trigger наR50; кабельний/оптичний сценарії потребують стенда. Ніщо не APPROVED і не PURCHASED.\n\n# CHANGELOG\n\n## 2026-09-13 · CHG-003 · Graphify та Obsidian\n\n- Що змінено: встановлено Obsidian, New 3D Graph та ізольований Graphify; додано knowledgeGraph до MASTER-SPEC, похідний Vault, master dashboard, Mermaid-схему та команди оновлення.\n- Було: список компонентів і текстові зв’язки без графа.\n- Стало: пов’язані картки й явні спрямовані зв’язки з джерелами та рівнем довіри. MASTER-SPEC залишається головним джерелом. AST-граф коду відокремлений від інженерного графа.\n- Причина: запит користувача «тепер встанови й налаштуй усе».\n- Хто затвердив: користувач дозволив інтеграцію. Нового APPROVED обладнання немає; архітектура фотобудки й вибрані моделі не замінювалися.\n- Статуси: канонічні значення збережено; NEEDS_VERIFICATION у Vault — лише нормалізований status_key/тег. Повної міграції статусів немає.\n\n## 2026-09-12 · CHG-001 · Початкова фіксація\n\n- Що змінено: створено репозиторну структуру, документацію, канонічний реєстр та dashboard.\n- Було: вимоги у повідомленні користувача; файли відсутні.\n- Стало: вимоги перенесені без заміни Canon R50 або TBD45-500.\n- Причина: виконання першого етапу.\n- Хто затвердив: користувач доручив створення структури; технічного APPROVED обладнання немає.\n\n## 2026-09-12 · CHG-002 · Нормалізація статусів\n\n- Що змінено: позначення, які суперечили закритому переліку статусів у запиті.\n- Було: принтер REVIEW, оплата REVIEW, живлення NEEDS CALCULATION; приклад журналу рішень OPEN.\n- Стало: принтер і живлення NEEDS VERIFICATION; Nayax як конкретний кандидат CANDIDATE; незакриті рішення NEEDS VERIFICATION. Потреба розрахунку живлення збережена в примітках.\n- Причина: дотримання явно заданого переліку статусів. Це не зміна апаратної архітектури.\n- Хто затвердив: Codex застосував правило статусів користувача; жодного нового апаратного APPROVED.\n\nНові зміни додавати окремими записами з датою, описом, «Було», «Стало», причиною та тим, хто затвердив. Історію не переписувати.\n"
};
