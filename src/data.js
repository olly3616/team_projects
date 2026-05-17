export const dummyTargets = [
  {
    id: 1,
    name: "자취를 시작한 대학생",
    description: "식재료 관리 경험이 부족하고, 음식물 낭비를 자주 경험하는 사용자",
    reason: "냉장고 관리와 유통기한 알림 니즈가 높을 가능성이 있음",
    interests: ["편리함", "비용 절약", "귀찮음 최소화"],
    point: "직접 입력을 귀찮아하지 않을지",
    avatarColor: "bg-blue-600",
    avatarInitials: "대",
  },
  {
    id: 2,
    name: "1인 가구 직장인",
    description: "바쁜 생활로 장보기와 식재료 관리가 불규칙한 사용자",
    reason: "퇴근 후 요리 부담과 식재료 방치 문제가 있을 수 있음",
    interests: ["시간 절약", "자동화", "간편한 알림"],
    point: "앱 사용을 지속할 동기가 있는지",
    avatarColor: "bg-rose-600",
    avatarInitials: "직",
  },
  {
    id: 3,
    name: "식단관리 사용자",
    description: "건강, 다이어트, 운동을 위해 식재료와 식단을 관리하는 사용자",
    reason: "재료 기반 레시피와 식단 추천 기능에 관심이 높을 수 있음",
    interests: ["칼로리", "영양 정보", "목표 관리"],
    point: "단순 냉장고 관리 이상의 기능을 원하는지",
    avatarColor: "bg-emerald-600",
    avatarInitials: "식",
  },
  {
    id: 4,
    name: "신혼부부",
    description: "함께 장을 보고 식재료를 관리하기 시작한 사용자",
    reason: "공동 냉장고 관리와 식비 절약 니즈가 있을 수 있음",
    interests: ["공유 기능", "식비 관리", "장보기 계획"],
    point: "두 사람이 함께 쓰는 기능이 필요한지",
    avatarColor: "bg-purple-600",
    avatarInitials: "신",
  },
  {
    id: 5,
    name: "요리에 익숙하지 않은 사회초년생",
    description: "직접 요리를 시작했지만 재료 활용과 보관에 서툰 사용자",
    reason: "남은 재료 활용 레시피 추천에 반응할 가능성이 있음",
    interests: ["쉬운 레시피", "실패 없는 요리", "재료 활용"],
    point: "레시피 추천이 실제 사용으로 이어지는지",
    avatarColor: "bg-amber-600",
    avatarInitials: "초",
  }
];

export const dummyChatSequence = [
  {
    senderId: 1, // 자취 대학생
    message: "필요성은 느껴요. 자취하면서 재료를 사놓고 까먹어서 버리는 일이 많거든요. 다만 재료를 매번 직접 입력해야 한다면 오래 쓰지는 않을 것 같아요."
  },
  {
    senderId: 2, // 1인 가구 직장인
    message: "저도 입력이 귀찮다는 점은 공감해요. 퇴근하고 장 본 걸 하나씩 기록하는 건 피곤할 것 같아요. 영수증 촬영이나 자동 등록이 되면 더 써볼 것 같아요."
  },
  {
    senderId: 3, // 식단관리 사용자
    message: "저는 조금 다르게 느껴요. 원래 식단 기록 앱을 쓰고 있어서 입력 자체는 괜찮아요. 대신 칼로리나 영양 정보와 연결되면 더 매력적일 것 같아요."
  },
  {
    senderId: 1, // 자취 대학생
    message: "식단관리 기능까지 들어가면 저한테는 조금 복잡할 것 같아요. 저는 그냥 '이거 빨리 먹어야 함' 정도만 알려줘도 충분해요."
  },
  {
    senderId: 2, // 1인 가구 직장인
    message: "맞아요. 기본 기능은 단순해야 할 것 같고, 식단관리 기능은 원하는 사람만 쓰는 옵션이면 좋을 것 같아요."
  }
];
