// Key verses selected from a Progressive Christianity theological lens.
// Emphasis: justice, radical inclusion, liberation, love over law,
// God's solidarity with the suffering, anti-punitive theology,
// transformation, questioning, and abundant life NOW.

export interface KeyVersePair {
  ref: string;   // exact reference to fetch (2 verses)
  note: string;  // brief progressive framing
}

export interface DayKeyVerses {
  ot: KeyVersePair;
  psalm: KeyVersePair;
  epistle: KeyVersePair;
  gospel: KeyVersePair;
}

// Keyed by sundayDate (YYYY-MM-DD) matching rcl.ts
const KEY_VERSES: Record<string, DayKeyVerses> = {
  // ── Advent 2025 ──
  "2025-11-30": {
    ot:      { ref: "Isa 2:4",        note: "전쟁에서 평화로 — 정의의 하나님" },
    psalm:   { ref: "Psalm 122:6-7",  note: "예루살렘의 평화를 위한 기도" },
    epistle: { ref: "Rom 13:12-13",   note: "빛의 무기를 입으라 — 새로운 삶" },
    gospel:  { ref: "Matt 24:42-44",  note: "깨어 있음 — 지금 이 순간의 책임" },
  },
  "2025-12-07": {
    ot:      { ref: "Isa 11:6-7",     note: "늑대와 어린 양이 함께 — 화해의 비전" },
    psalm:   { ref: "Psalm 72:12-13", note: "가난한 자를 건지시는 하나님" },
    epistle: { ref: "Rom 15:5-6",     note: "서로 환영하여 하나님께 영광을" },
    gospel:  { ref: "Matt 3:7-8",     note: "회개 = 삶의 열매 — 종교적 위선 비판" },
  },
  "2025-12-14": {
    ot:      { ref: "Isa 35:5-6",     note: "눈먼 자, 귀먹은 자, 다리 저는 자의 회복" },
    psalm:   { ref: "Psalm 146:7-8",  note: "억눌린 자를 위한 정의, 굶주린 자의 밥" },
    epistle: { ref: "Jas 5:7-8",      note: "인내하라 — 농부처럼 기다리는 믿음" },
    gospel:  { ref: "Matt 11:4-5",    note: "눈먼 자가 보고, 가난한 자가 복음을 — 해방의 표징" },
  },
  "2025-12-21": {
    ot:      { ref: "Isa 7:14",       note: "임마누엘 — 하나님이 우리와 함께" },
    psalm:   { ref: "Psalm 80:3",     note: "우리를 회복시키소서 — 공동체의 간구" },
    epistle: { ref: "Rom 1:4-5",      note: "은혜와 사도의 직분 — 모든 민족을 위해" },
    gospel:  { ref: "Matt 1:22-23",   note: "임마누엘 — 성육신, 하나님의 현존" },
  },
  // Christmas
  "2025-12-25": {
    ot:      { ref: "Isa 9:6-7",      note: "평화의 왕 — 정의와 공의로 다스림" },
    psalm:   { ref: "Psalm 96:11-13", note: "온 땅이 기뻐하라, 정의로 다스리시니" },
    epistle: { ref: "Titus 2:11-12",  note: "모든 사람에게 나타난 하나님의 은혜" },
    gospel:  { ref: "Luke 2:13-14",   note: "땅에는 평화 — 크리스마스의 핵심 메시지" },
  },
  "2025-12-28": {
    ot:      { ref: "Isa 63:8-9",     note: "고난 중에 함께 고통받으시는 하나님" },
    psalm:   { ref: "Psalm 148:12-13",note: "모든 연령, 모든 피조물이 함께 찬양" },
    epistle: { ref: "Heb 2:14-15",    note: "죽음의 두려움에서 해방 — 공감하시는 예수" },
    gospel:  { ref: "Matt 2:13-14",   note: "이집트로 피신 — 난민 가족으로 태어난 예수" },
  },
  // Epiphany 2026
  "2026-01-06": {
    ot:      { ref: "Isa 60:1-2",     note: "어두움 속에서 빛이 — 억눌린 자의 희망" },
    psalm:   { ref: "Psalm 72:10-11", note: "모든 왕이 경배 — 보편적 하나님 나라" },
    epistle: { ref: "Eph 3:5-6",      note: "이방인도 함께 상속자 — 급진적 포용" },
    gospel:  { ref: "Matt 2:1-2",     note: "동방에서 온 이방인이 먼저 예수를 찾다" },
  },
  "2026-01-11": {
    ot:      { ref: "Isa 42:6-7",     note: "눈먼 자의 눈을 여는 종의 사명" },
    psalm:   { ref: "Psalm 29:3-4",   note: "물 위의 하나님 소리 — 자연 속 신성" },
    epistle: { ref: "Acts 10:34-35",  note: "하나님은 사람을 외모로 취하지 않으신다 — 보편적 환영" },
    gospel:  { ref: "Matt 3:16-17",   note: "하나님의 사랑받는 자 — 모든 이의 사랑받음" },
  },
  "2026-01-18": {
    ot:      { ref: "Isa 49:5-6",     note: "이방의 빛 — 구원은 모든 민족에게" },
    psalm:   { ref: "Psalm 40:4-5",   note: "여호와를 의지하는 자의 복" },
    epistle: { ref: "1 Cor 1:4-5",    note: "풍성하게 주신 은혜 — 차별 없는 선물" },
    gospel:  { ref: "John 1:38-39",   note: "\"무엇을 원하느냐?\" / \"와서 보라\" — 열린 초대" },
  },
  "2026-01-25": {
    ot:      { ref: "Isa 9:1-2",      note: "어둠 속 걷는 백성이 큰 빛을 보다" },
    psalm:   { ref: "Psalm 27:4-5",   note: "한 가지 구함 — 하나님의 아름다움 보기" },
    epistle: { ref: "1 Cor 1:10",     note: "분쟁 말고 하나 되라 — 교회 일치" },
    gospel:  { ref: "Matt 4:16-17",   note: "어둠의 백성에게 빛이, 하나님 나라가 가까이" },
  },
  "2026-02-01": {
    ot:      { ref: "Mic 6:7-8",      note: "정의, 사랑, 겸손 — 예언자적 윤리의 핵심" },
    psalm:   { ref: "Psalm 15:1-2",   note: "하나님의 산에 머물 자 — 정직하게 행하는 자" },
    epistle: { ref: "1 Cor 1:27-28",  note: "약한 자와 천한 자를 택하신 하나님" },
    gospel:  { ref: "Matt 5:6-7",     note: "의를 주리고 목마른 자, 긍휼히 여기는 자의 복" },
  },
  "2026-02-08": {
    ot:      { ref: "Isa 58:6-7",     note: "진정한 금식 — 억눌린 자 해방, 굶주린 자에게 빵" },
    psalm:   { ref: "Psalm 112:4-5",  note: "어두움 속 빛 — 긍휼히 여기고 꾸어 주는 자" },
    epistle: { ref: "1 Cor 2:1-2",    note: "십자가 외에는 아무것도 — 단순한 복음" },
    gospel:  { ref: "Matt 5:14-16",   note: "세상의 빛 — 선한 행실로 하나님께 영광" },
  },
  "2026-02-15": {
    ot:      { ref: "Exod 24:15-16",  note: "하나님의 영광 — 거룩함과 임재" },
    psalm:   { ref: "Psalm 2:11-12",  note: "여호와께 복종하라 — 경외와 기쁨" },
    epistle: { ref: "2 Pet 1:17-18",  note: "거룩한 산에서 들린 하나님 소리" },
    gospel:  { ref: "Matt 17:5-7",    note: "\"그의 말을 들으라\" + \"두려워 말라\" — 신뢰의 초대" },
  },
  // Ash Wednesday
  "2026-02-18": {
    ot:      { ref: "Joel 2:13-14",   note: "마음을 찢으라, 옷이 아니라 — 진정한 회개" },
    psalm:   { ref: "Psalm 51:10-12", note: "정한 마음 창조 — 내면의 변화" },
    epistle: { ref: "2 Cor 6:1-2",    note: "지금이 구원의 날 — 현재의 긴박성" },
    gospel:  { ref: "Matt 6:19-21",   note: "재물을 땅에 쌓지 말라 — 가치의 재정렬" },
  },
  // Lent 2026
  "2026-02-22": {
    ot:      { ref: "Gen 2:16-17",    note: "자유와 한계 — 창조의 선함과 책임" },
    psalm:   { ref: "Psalm 32:3-5",   note: "숨김에서 고백으로 — 정직함의 치유" },
    epistle: { ref: "Rom 5:18-19",    note: "한 사람으로 모든 사람에게 의와 생명 — 보편적 은혜" },
    gospel:  { ref: "Matt 4:3-4",     note: "돌이 떡이 되게 하라 / 말씀으로 사는 인간 — 제국에 저항" },
  },
  "2026-03-01": {
    ot:      { ref: "Gen 12:1-3",     note: "떠나라 — 부르심과 축복, 모든 족속을 위한" },
    psalm:   { ref: "Psalm 121:1-2",  note: "산을 향하여 눈을 들리라 — 도움은 어디서?" },
    epistle: { ref: "Rom 4:4-5",      note: "행위가 아닌 믿음 — 은혜의 경제" },
    gospel:  { ref: "John 3:16-17",   note: "정죄하러 오신 게 아니라 — 하나님은 사랑" },
  },
  "2026-03-08": {
    ot:      { ref: "Exod 17:5-6",    note: "바위에서 물이 나오다 — 광야에서의 공급" },
    psalm:   { ref: "Psalm 95:7-8",   note: "오늘 그의 음성 들으라 — 마음을 완악히 말라" },
    epistle: { ref: "Rom 5:8-9",      note: "우리가 죄인이었을 때 — 조건 없는 사랑" },
    gospel:  { ref: "John 4:23-24",   note: "영과 진리로 예배 — 장소와 형식을 넘어선 예배" },
  },
  "2026-03-15": {
    ot:      { ref: "1 Sam 16:6-7",   note: "외모로 보지 않으심 — 마음을 보시는 하나님" },
    psalm:   { ref: "Psalm 23:4-5",   note: "사망의 음침한 골짜기에서도 — 함께하시는 하나님" },
    epistle: { ref: "Eph 5:8-9",      note: "한때는 어둠이었으나 이제 빛 — 변화의 신학" },
    gospel:  { ref: "John 9:2-3",     note: "죄 때문이 아니다 — 벌주시는 하나님 신화 해체" },
  },
  "2026-03-22": {
    ot:      { ref: "Ezek 37:5-6",    note: "마른 뼈에 생기를 — 절망에서 부활로" },
    psalm:   { ref: "Psalm 130:3-4",  note: "죄를 일일이 따지신다면 누가 서리요 — 급진적 용서" },
    epistle: { ref: "Rom 8:6",        note: "성령의 마음은 생명과 평화 — 지금 여기서" },
    gospel:  { ref: "John 11:35-36",  note: "예수께서 눈물을 흘리셨다 — 슬픔 속의 하나님" },
  },
  "2026-03-29": {
    ot:      { ref: "Isa 50:6-7",     note: "모욕과 침 뱉음을 견딤 — 비폭력의 종" },
    psalm:   { ref: "Psalm 31:14-15", note: "나는 주를 신뢰합니다 — 권력에 맞선 믿음" },
    epistle: { ref: "Phil 2:7-8",     note: "자기를 비워 종의 형체 — 권력 포기의 신학" },
    gospel:  { ref: "Matt 26:39",     note: "내 뜻대로 마시고 — 항복과 신뢰의 기도" },
  },
  // Holy Week
  "2026-03-30": {
    ot:      { ref: "Isa 42:2-3",     note: "상한 갈대를 꺾지 않으심 — 연약함에 대한 돌봄" },
    psalm:   { ref: "Psalm 36:7-8",   note: "주의 날개 아래 피하는 자 — 하나님의 품" },
    epistle: { ref: "Heb 9:14",       note: "죽은 행실에서 깨끗하게 — 양심의 자유" },
    gospel:  { ref: "John 12:3",      note: "마리아의 향유 — 사회 규범을 깬 사랑의 행위" },
  },
  "2026-03-31": {
    ot:      { ref: "Isa 49:5-6",     note: "이방의 빛이 되라 — 구원의 보편성" },
    psalm:   { ref: "Psalm 71:12-13", note: "하나님이여 멀리 하지 마소서 — 울부짖는 기도" },
    epistle: { ref: "1 Cor 1:18",     note: "십자가의 도는 미련한 것 — 세상 권력에 도전" },
    gospel:  { ref: "John 12:24-25",  note: "밀알이 죽어야 — 생명은 내어줌에서 옴" },
  },
  "2026-04-01": {
    ot:      { ref: "Isa 50:7-8",     note: "내 얼굴을 부싯돌처럼 — 불의에 맞서는 용기" },
    psalm:   { ref: "Psalm 70:4-5",   note: "주를 찾는 자에게 기쁨을 — 가난하고 궁핍한 자" },
    epistle: { ref: "Heb 12:1-2",     note: "무거운 것을 벗어버리고 예수를 바라보며" },
    gospel:  { ref: "John 13:21-22",  note: "예수의 마음이 괴로워지심 — 배신 앞의 취약성" },
  },
  "2026-04-02": {
    ot:      { ref: "Exod 12:11-12",  note: "서둘러 먹으라 — 해방의 식사" },
    psalm:   { ref: "Psalm 116:1-2",  note: "내가 여호와를 사랑함은 들으셨기 때문에" },
    epistle: { ref: "1 Cor 11:25-26", note: "새 언약의 잔 — 오실 때까지 주의 죽음을 전함" },
    gospel:  { ref: "John 13:14-15",  note: "내가 너희 발을 씻었으니 — 섬김의 공동체" },
  },
  "2026-04-03": {
    ot:      { ref: "Isa 53:4-5",     note: "우리의 고통을 짊어지심 — 연대와 대속" },
    psalm:   { ref: "Psalm 22:1-2",   note: "나의 하나님 어찌 나를 버리셨나이까 — 하나님 부재의 신학" },
    epistle: { ref: "Heb 10:19-20",   note: "담대히 성소에 들어갈 권세 — 모든 이에게 열린 길" },
    gospel:  { ref: "John 18:37-38",  note: "진리란 무엇이냐 — 권력과 진실의 충돌" },
  },
  "2026-04-04": {
    ot:      { ref: "Job 14:7-9",     note: "나무는 베어져도 — 희망을 붙드는 신앙" },
    psalm:   { ref: "Psalm 31:3-4",   note: "피난처 되어 주소서 — 위험 속의 신뢰" },
    epistle: { ref: "1 Pet 4:7-8",    note: "만물의 마지막이 가까웠으니 — 서로 사랑하라" },
    gospel:  { ref: "Matt 27:61",     note: "무덤 곁에 앉아 있는 여인들 — 침묵의 충실함" },
  },
  // Easter 2026
  "2026-04-05": {
    ot:      { ref: "Acts 10:34-35",  note: "하나님은 사람을 외모로 취하지 않으심 — 보편적 환영" },
    psalm:   { ref: "Psalm 118:22-23",note: "버린 돌이 머릿돌이 — 주변부에서 중심으로" },
    epistle: { ref: "Col 3:1-2",      note: "위의 것을 찾으라 — 지금 여기서 새로운 삶" },
    gospel:  { ref: "John 20:16-17",  note: "\"마리아야!\" — 여성이 첫 부활 증인, 사도 중의 사도" },
  },
  "2026-04-12": {
    ot:      { ref: "Acts 2:23-24",   note: "죽였으나 하나님이 살리셨으니 — 권력 역전" },
    psalm:   { ref: "Psalm 16:9-10",  note: "내 몸도 안전히 살리니 — 신뢰 속의 쉼" },
    epistle: { ref: "1 Pet 1:3-4",    note: "산 소망 — 썩지 않는 기업" },
    gospel:  { ref: "John 20:24-25",  note: "도마의 의심 — 질문과 의심이 신앙의 일부" },
  },
  "2026-04-19": {
    ot:      { ref: "Acts 2:38-39",   note: "너희와 너희 자녀와 모든 먼 데 사람 — 보편적 약속" },
    psalm:   { ref: "Psalm 116:5-6",  note: "여호와는 은혜로우시며 약한 자를 보호하심" },
    epistle: { ref: "1 Pet 1:18-19",  note: "헛된 행실에서 구속 — 자유의 신학" },
    gospel:  { ref: "Luke 24:30-31",  note: "빵을 떼실 때 눈이 열리다 — 밥상 공동체에서의 부활" },
  },
  "2026-04-26": {
    ot:      { ref: "Acts 2:44-45",   note: "함께 있어 모든 것을 나누다 — 초대교회 공동체" },
    psalm:   { ref: "Psalm 23:5-6",   note: "원수 앞에서 상을 차려 주심 — 급진적 환대" },
    epistle: { ref: "1 Pet 2:24-25",  note: "그의 상처로 너희가 나음을 — 치유" },
    gospel:  { ref: "John 10:9-10",   note: "내가 온 것은 생명을 풍성히 — 지금 여기의 충만한 삶" },
  },
  "2026-05-03": {
    ot:      { ref: "Acts 7:59-60",   note: "스데반 순교 시 기도 — 원수를 용서함" },
    psalm:   { ref: "Psalm 31:5",     note: "내 영혼을 주의 손에 — 신뢰의 마지막 말" },
    epistle: { ref: "1 Pet 2:9-10",   note: "왕 같은 제사장, 거룩한 나라 — 공동체의 정체성" },
    gospel:  { ref: "John 14:1-2",    note: "마음이 괴롭지 않게 하라 — 하나님 집에 많은 방" },
  },
  "2026-05-10": {
    ot:      { ref: "Acts 17:26-27",  note: "한 혈통으로 만들어 — 인류의 통일성, 하나님 탐색" },
    psalm:   { ref: "Psalm 66:16-17", note: "내게 행하신 일을 들으라 — 개인의 증언" },
    epistle: { ref: "1 Pet 3:15-16",  note: "소망의 이유를 온유와 경외로 — 대화적 신앙" },
    gospel:  { ref: "John 14:17-18",  note: "진리의 성령이 너희 안에 / 고아 되지 않게 하리라" },
  },
  "2026-05-14": {
    ot:      { ref: "Acts 1:8",       note: "성령을 받으면 땅 끝까지 증인 — 보편적 사명" },
    psalm:   { ref: "Psalm 47:1-2",   note: "온 땅은 하나님께 — 모든 민족의 하나님" },
    epistle: { ref: "Eph 1:22-23",    note: "교회는 그의 몸 — 그리스도의 충만함" },
    gospel:  { ref: "Luke 24:50-51",  note: "축복하시며 떠나심 — 위임과 파송" },
  },
  "2026-05-17": {
    ot:      { ref: "Acts 1:13-14",   note: "여자들과 함께 기도 — 초대교회의 젠더 평등" },
    psalm:   { ref: "Psalm 68:5-6",   note: "고아의 아버지, 과부의 재판장 — 하나님의 편향" },
    epistle: { ref: "1 Pet 4:12-13",  note: "불 같은 시련을 이상히 여기지 말라 — 고난의 신학" },
    gospel:  { ref: "John 17:11",     note: "그들이 하나가 되게 하소서 — 일치의 기도" },
  },
  "2026-05-24": {
    ot:      { ref: "Acts 2:17-18",   note: "아들딸이 예언, 늙은이가 꿈 꾸리 — 모든 세대, 성별에게" },
    psalm:   { ref: "Psalm 104:30",   note: "주의 영을 보내시면 창조 — 성령과 생태" },
    epistle: { ref: "1 Cor 12:12-13", note: "유대인이나 헬라인이나 한 몸 — 다양성 속의 일치" },
    gospel:  { ref: "John 20:21-22",  note: "평화 있을지어다 / 성령을 받으라 — 파송과 성령" },
  },
  "2026-05-31": {
    ot:      { ref: "Gen 1:27-28",    note: "하나님의 형상으로 창조 — 인간의 존엄과 청지기직" },
    psalm:   { ref: "Psalm 8:3-4",    note: "주의 작품을 볼 때 — 피조물 앞의 경이" },
    epistle: { ref: "2 Cor 13:11-12", note: "하나 되라, 평화를 누리라 — 공동체 윤리" },
    gospel:  { ref: "Matt 28:19-20",  note: "모든 민족을 제자로 / 항상 함께 — 포용과 현존" },
  },
  // Ordinary Time 2026
  "2026-06-07": {
    ot:      { ref: "Gen 12:2-3",     note: "모든 족속이 복을 받으리라 — 선택은 독점이 아닌 책임" },
    psalm:   { ref: "Psalm 33:5",     note: "의와 공의를 사랑하시니 — 하나님의 윤리적 성품" },
    epistle: { ref: "Rom 4:16-17",    note: "은혜에 속한 것 — 모든 씨에게 약속" },
    gospel:  { ref: "Matt 9:12-13",   note: "의인 아닌 죄인을 부르러 — 제도 밖의 환대" },
  },
  "2026-06-14": {
    ot:      { ref: "Gen 18:3-4",     note: "나그네 환대 — 천사를 대접한 아브라함" },
    psalm:   { ref: "Psalm 116:12-13",note: "구원의 잔을 들고 — 감사의 응답" },
    epistle: { ref: "Rom 5:6-8",      note: "우리가 연약할 때 / 죄인이었을 때 — 조건 없는 사랑" },
    gospel:  { ref: "Matt 9:35-36",   note: "무리를 보시고 불쌍히 여기시다 — 공감적 리더십" },
  },
  "2026-06-21": {
    ot:      { ref: "Gen 21:16-17",   note: "하갈의 울음, 들으신 하나님 — 이방인과 홀어머니의 하나님" },
    psalm:   { ref: "Psalm 86:5-6",   note: "주는 선하사 용서하심 풍부 — 기도를 들으시는 하나님" },
    epistle: { ref: "Rom 6:4",        note: "새 생명 안에서 행하게 — 부활의 현재성" },
    gospel:  { ref: "Matt 10:28-29",  note: "참새 하나도 아버지 없이 떨어지지 않음 — 모든 생명의 소중함" },
  },
  "2026-06-28": {
    ot:      { ref: "Gen 22:12",      note: "아이에게 네 손을 대지 말라 — 폭력에 맞서는 하나님" },
    psalm:   { ref: "Psalm 13:5-6",   note: "주의 구원을 기뻐하리이다 — 절망 끝의 신뢰" },
    epistle: { ref: "Rom 6:22-23",    note: "죄에서 해방되어 — 자유의 신학" },
    gospel:  { ref: "Matt 10:40-41",  note: "너희를 영접하는 자는 나를 영접 — 급진적 환대" },
  },
  "2026-07-05": {
    ot:      { ref: "Gen 24:58",      note: "리브가의 자율적 선택 — 여성의 주체성" },
    psalm:   { ref: "Psalm 45:10-11", note: "왕의 딸이여 들을지어다 — 복잡한 본문의 재해석" },
    epistle: { ref: "Rom 7:15",       note: "내가 원하는 것은 하지 않고 — 인간의 나약함 인정" },
    gospel:  { ref: "Matt 11:28-29",  note: "수고하고 무거운 짐 진 자들아 오라 — 종교의 짐에서 해방" },
  },
  "2026-07-12": {
    ot:      { ref: "Gen 25:29-30",   note: "에서의 즉각적 필요 — 지금 배고픈 자" },
    psalm:   { ref: "Psalm 119:105",  note: "말씀은 내 발의 등 — 일상의 안내" },
    epistle: { ref: "Rom 8:6",        note: "성령의 마음은 생명과 평화 — 지금 여기" },
    gospel:  { ref: "Matt 13:8",      note: "좋은 땅에 떨어진 씨 백 배 — 풍성한 결실" },
  },
  "2026-07-19": {
    ot:      { ref: "Gen 28:15",      note: "내가 너와 함께 있어 — 어디서나 함께하시는 하나님" },
    psalm:   { ref: "Psalm 139:7-8",  note: "주의 영을 피할 수 있으랴 — 편재하는 하나님" },
    epistle: { ref: "Rom 8:22-23",    note: "피조물이 탄식하며 — 생태 신학" },
    gospel:  { ref: "Matt 13:31-32",  note: "겨자씨 — 작은 씨앗에서 큰 그늘, 주변부의 힘" },
  },
  "2026-07-26": {
    ot:      { ref: "Gen 29:20",      note: "라헬을 사랑하므로 — 사랑이 노동을 가볍게" },
    psalm:   { ref: "Psalm 105:8-9",  note: "언약을 기억하심 — 신실한 하나님" },
    epistle: { ref: "Rom 8:38-39",    note: "아무것도 하나님의 사랑에서 끊을 수 없음 — 무조건적 사랑" },
    gospel:  { ref: "Matt 13:44-45",  note: "숨겨진 보물, 값진 진주 — 하나님 나라의 가치" },
  },
  "2026-08-02": {
    ot:      { ref: "Gen 32:28",      note: "이스라엘이라 불리리라 — 씨름 후의 축복" },
    psalm:   { ref: "Psalm 17:15",    note: "주의 형상으로 만족하리이다 — 영성의 목표" },
    epistle: { ref: "Rom 9:4-5",      note: "양자됨, 언약, 약속 — 다양한 신앙 전통 존중" },
    gospel:  { ref: "Matt 14:19-20",  note: "다 먹고 남다 — 나눔의 기적, 풍요의 경제" },
  },
  "2026-08-09": {
    ot:      { ref: "Gen 37:19-20",   note: "꿈꾸는 자가 온다 — 비전과 박해" },
    psalm:   { ref: "Psalm 105:16-17",note: "요셉을 종으로 팔렸으나 — 고통 속의 섭리" },
    epistle: { ref: "Rom 10:12-13",   note: "유대인이나 헬라인이나 차별 없음 — 구원의 보편성" },
    gospel:  { ref: "Matt 14:27-28",  note: "두려워 말라 / 물 위로 오라 — 두려움 앞의 믿음" },
  },
  "2026-08-16": {
    ot:      { ref: "Gen 45:4-5",     note: "울면서 자기를 알리다 — 화해와 용서" },
    psalm:   { ref: "Psalm 133:1",    note: "형제가 연합하여 사는 것 — 공동체의 아름다움" },
    epistle: { ref: "Rom 11:29-32",   note: "하나님의 선물과 부르심은 후회함이 없음 — 포기 없는 사랑" },
    gospel:  { ref: "Matt 15:27-28",  note: "개도 부스러기를 — 이방 여인이 예수의 마음을 바꾸다" },
  },
  "2026-08-23": {
    ot:      { ref: "Exod 2:1-2",     note: "모세 탄생 — 억압 속에서 지켜진 생명" },
    psalm:   { ref: "Psalm 124:1-2",  note: "주께서 우리 편이 아니셨다면 — 연대의 하나님" },
    epistle: { ref: "Rom 12:4-5",     note: "한 몸 많은 지체 — 다양성 속의 통일" },
    gospel:  { ref: "Matt 16:15-16",  note: "너희는 나를 누구라 하느냐 — 오늘도 묻는 질문" },
  },
  "2026-08-30": {
    ot:      { ref: "Exod 3:7-8",     note: "고통을 보고, 소리를 듣고, 내려왔다 — 행동하시는 하나님" },
    psalm:   { ref: "Psalm 105:1",    note: "여호와께 감사하라, 그의 행하심을 알게 하라" },
    epistle: { ref: "Rom 12:9-10",    note: "사랑은 거짓이 없나니 — 진정한 사랑의 특징" },
    gospel:  { ref: "Matt 16:24-25",  note: "자기를 부인하고 십자가를 지라 — 급진적 제자도" },
  },
  "2026-09-06": {
    ot:      { ref: "Exod 12:12-13",  note: "표적이 있는 집을 넘어감 — 해방의 상징" },
    psalm:   { ref: "Psalm 149:4",    note: "겸손한 자를 구원으로 아름답게 하심" },
    epistle: { ref: "Rom 13:8-9",     note: "사랑은 율법의 완성 — 사랑이 유일한 계명" },
    gospel:  { ref: "Matt 18:19-20",  note: "두 세 사람이 모인 곳에 나도 — 공동체 기도" },
  },
  "2026-09-13": {
    ot:      { ref: "Exod 14:21-22",  note: "바다가 갈라지다 — 불가능 앞의 해방" },
    psalm:   { ref: "Psalm 114:7-8",  note: "땅이여 주 앞에 떨라 — 자연을 통한 해방" },
    epistle: { ref: "Rom 14:7-8",     note: "우리 중 아무도 자기를 위해 살지 않음 — 서로를 위한 삶" },
    gospel:  { ref: "Matt 18:21-22",  note: "일흔 번씩 일곱 번 용서하라 — 무한 용서" },
  },
  "2026-09-20": {
    ot:      { ref: "Exod 16:12",     note: "저녁에 고기, 아침에 떡 — 광야에서의 공급" },
    psalm:   { ref: "Psalm 105:40-41",note: "떡, 하늘 양식, 반석의 물 — 풍성한 공급" },
    epistle: { ref: "Phil 1:27",      note: "복음에 합당하게 생활하라 — 공적인 신앙" },
    gospel:  { ref: "Matt 20:14-16",  note: "나의 후함으로 시기하느냐 / 나중 된 자가 먼저 — 은혜의 경제" },
  },
  "2026-09-27": {
    ot:      { ref: "Exod 17:5-6",    note: "바위를 치라 물이 나오리라 — 불가능의 공급" },
    psalm:   { ref: "Psalm 78:15-16", note: "반석을 쪼개 물을 주심 — 돌봄의 하나님" },
    epistle: { ref: "Phil 2:3-4",     note: "겸손으로 남을 낫게 여기라 — 섬김의 공동체" },
    gospel:  { ref: "Matt 21:31",     note: "세리와 창녀가 먼저 들어가리라 — 뒤집힌 종교 질서" },
  },
  "2026-10-04": {
    ot:      { ref: "Exod 20:2-3",    note: "나는 너를 종 됨에서 구원한 하나님 — 해방이 먼저" },
    psalm:   { ref: "Psalm 19:7-8",   note: "여호와의 율법은 완전하여 영혼을 소성시킴" },
    epistle: { ref: "Phil 3:8-9",     note: "그리스도를 알기 위해 모든 것을 해로 여김 — 가치의 재정렬" },
    gospel:  { ref: "Matt 21:42-43",  note: "버린 돌이 머릿돌이 되었나니 — 주변부의 역전" },
  },
  "2026-10-11": {
    ot:      { ref: "Exod 32:12-13",  note: "뜻을 돌이키소서 — 하나님의 마음을 돌린 모세" },
    psalm:   { ref: "Psalm 106:4-5",  note: "주의 백성과 함께 기억하소서 — 공동체 구원" },
    epistle: { ref: "Phil 4:8-9",     note: "참되고 경건하고 옳은 것을 생각하라 — 긍정적 사고의 훈련" },
    gospel:  { ref: "Matt 22:9-10",   note: "길에서 만나는 자를 다 청하라 — 무조건적 초대" },
  },
  "2026-10-18": {
    ot:      { ref: "Exod 33:18-19",  note: "내 영광을 보이소서 / 긍휼히 여길 자를 긍휼히 여기리 — 하나님의 성품" },
    psalm:   { ref: "Psalm 99:1-2",   note: "여호와는 왕이시니 — 권력에 대한 대항적 주권" },
    epistle: { ref: "1 Thess 1:5-6",  note: "기쁨으로 받아 모본이 됨 — 본보기의 신앙" },
    gospel:  { ref: "Matt 22:20-21",  note: "황제 것은 황제에게 하나님 것은 하나님께 — 두 충성" },
  },
  "2026-10-25": {
    ot:      { ref: "Deut 34:10-11",  note: "모세처럼 하나님을 대면한 선지자 — 신비적 앎" },
    psalm:   { ref: "Psalm 90:12",    note: "우리 날 계수함을 가르치소서 — 시간의 지혜" },
    epistle: { ref: "1 Thess 2:7-8",  note: "유모같이, 자기 영혼도 주려 함 — 돌봄의 리더십" },
    gospel:  { ref: "Matt 22:37-39",  note: "온 마음으로 하나님 사랑, 이웃 사랑 — 두 계명으로 요약" },
  },
  "2026-11-01": {
    ot:      { ref: "Rev 7:16-17",    note: "다시는 굶주리지 않으리 — 종말론적 정의" },
    psalm:   { ref: "Psalm 34:8-9",   note: "주의 선하심을 맛보라 — 직접 경험의 신앙" },
    epistle: { ref: "1 John 3:2-3",   note: "우리가 어떻게 될지 아직 모름 — 열린 미래의 신학" },
    gospel:  { ref: "Matt 5:6-7",     note: "의에 주리고, 긍휼히 여기는 자 — 정의와 자비" },
  },
  "2026-11-08": {
    ot:      { ref: "Josh 24:14-15",  note: "오늘 섬길 자를 택하라 — 신앙의 결단" },
    psalm:   { ref: "Psalm 78:5-6",   note: "다음 세대에게 전하라 — 신앙의 전수" },
    epistle: { ref: "1 Thess 4:13-14",note: "자는 자들에 대해 슬퍼하지 말라 — 희망 있는 슬픔" },
    gospel:  { ref: "Matt 25:1-2",    note: "열 처녀 비유 — 준비와 주의" },
  },
  "2026-11-15": {
    ot:      { ref: "Judg 4:6-7",     note: "드보라의 리더십 — 여성 지도자와 해방" },
    psalm:   { ref: "Psalm 123:1-2",  note: "눈을 들어 주를 바라봄 — 간절한 기다림" },
    epistle: { ref: "1 Thess 5:10-11",note: "서로 위로하고 세워 주라 — 공동체의 역할" },
    gospel:  { ref: "Matt 25:24-25",  note: "두려워 숨겼나이다 — 두려움 기반 신앙에 대한 비판" },
  },
  "2026-11-22": {
    ot:      { ref: "Ezek 34:15-16",  note: "잃어버린 자 찾고, 상한 자 고치고 — 목자 하나님의 돌봄" },
    psalm:   { ref: "Psalm 95:6-7",   note: "엎드려 경배하자 — 우리는 그의 백성" },
    epistle: { ref: "Eph 4:15-16",    note: "사랑 안에서 자라남 — 공동체의 성장" },
    gospel:  { ref: "Matt 25:35-36",  note: "굶주린 자, 이방인, 벗은 자, 병든 자 — 그리스도를 만나는 곳" },
  },
  // Year B starts
  "2026-11-29": {
    ot:      { ref: "Jer 33:14-15",   note: "공의로운 싹 — 정의와 공평의 다윗 가지" },
    psalm:   { ref: "Psalm 25:6-7",   note: "긍휼과 인자하심을 기억하소서" },
    epistle: { ref: "1 Thess 3:12-13",note: "사랑이 더욱 풍성하게 — 공동체의 사랑" },
    gospel:  { ref: "Luke 21:28",     note: "고개를 들라, 속량이 가까웠으니 — 위기 속의 희망" },
  },
};

export function getKeyVerses(sundayDate: string): DayKeyVerses | null {
  return KEY_VERSES[sundayDate] ?? null;
}
