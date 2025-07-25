enum HeroTag {
  // Hero
  DVa = "D.Va",
  Roadhog = "Roadhog",
  Mercy = "Mercy",
  Reaper = "Reaper",
  Doomfist = "Doomfist",
  JunkerQueen = "Junker Queen",
  Orisa = "Orisa",
  Ramatra = "Ramatra",
  Reinhardt = "Reinhardt",
  Winston = "Winston",
  WreakingBall = "Wreaking ball",
  Sigma = "Sigma",
  Zarya = "Zarya",
  Ashe = "Ashe",
  Bastion = "Bastion",
  Cass = "Cass",
  Genji = "Genji",
  Hanzo = "Hanzo",
  Junkrat = "Junkrat",
  Mei = "Mei",
  Pharah = "Pharah",
  Sojourn = "Sojourn",
  Soldier76 = "Soldier 76",
  Sombra = "Sombra",
  Symetra = "Symetra",
  Torbjorn = "Torbjorn",
  Widowmaker = "Widowmaker",
  Moira = "Moira",
  Zenyatta = "Zenyatta",
  Ana = "Ana",
  Tracer = "Tracer",
  Baptiste = "Baptiste",
  Brigitte = "Brigitte",
  Kiriko = "Kiriko",
  Lucio = "Lucio",
  Echo = "Echo",
  LifeWeaver = "Life Weaver",
  Illari = "Illari",
  Hazard = "Hazard",
  Juno = "Juno",
  Venture = "Venture",
  Mauga = "Mauga",
  Freja = "Freja",
}

enum TypeTag {
  HeroAvatar = "Hero Avatar",
  Ability = "Ability",
  Weapon = "Weapon",
  Passive = "Passive",
  Ultimate = "Ultimate",
  Control = "Control",
  Gamemode = "Gamemode",
  Role = "Role",
  UI = "UI",
  Misc = "Misc",
  Currency = "Currency",
  Symbol = "Symbol",
  Event = "Event",
}

export type IconData = {
  code: string;
  tags: (HeroTag | TypeTag)[];
};

export const ICON_DATA: IconData[] = [
  // Hero Avatars
  {
    code: "000000038C19",
    tags: [HeroTag.DVa, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C1A",
    tags: [HeroTag.Doomfist, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C1B",
    tags: [HeroTag.JunkerQueen, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C1C",
    tags: [HeroTag.Orisa, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C1D",
    tags: [HeroTag.Ramatra, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C1E",
    tags: [HeroTag.Reinhardt, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C25",
    tags: [HeroTag.Winston, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C26",
    tags: [HeroTag.WreakingBall, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C27",
    tags: [HeroTag.Sigma, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C28",
    tags: [HeroTag.Zarya, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C29",
    tags: [HeroTag.Ashe, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C2A",
    tags: [HeroTag.Bastion, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C2B",
    tags: [HeroTag.Cass, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C2C",
    tags: [HeroTag.Genji, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C2D",
    tags: [HeroTag.Hanzo, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C2E",
    tags: [HeroTag.Junkrat, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C2F",
    tags: [HeroTag.Mei, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C30",
    tags: [HeroTag.Pharah, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C31",
    tags: [HeroTag.Reaper, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C33",
    tags: [HeroTag.Sojourn, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C34",
    tags: [HeroTag.Soldier76, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C35",
    tags: [HeroTag.Sombra, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C36",
    tags: [HeroTag.Symetra, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C37",
    tags: [HeroTag.Torbjorn, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C38",
    tags: [HeroTag.Widowmaker, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C39",
    tags: [HeroTag.Mercy, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C3A",
    tags: [HeroTag.Moira, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C3B",
    tags: [HeroTag.Zenyatta, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C3C",
    tags: [HeroTag.Ana, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C3D",
    tags: [HeroTag.Tracer, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C3E",
    tags: [HeroTag.Baptiste, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C3F",
    tags: [HeroTag.Brigitte, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C40",
    tags: [HeroTag.Kiriko, TypeTag.HeroAvatar],
  },
  {
    code: "000000038C41",
    tags: [HeroTag.Lucio, TypeTag.HeroAvatar],
  },
  {
    code: "000000039FDB",
    tags: [HeroTag.Echo, TypeTag.HeroAvatar],
  },
  {
    code: "00000003FF61",
    tags: [HeroTag.LifeWeaver, TypeTag.HeroAvatar],
  },
  {
    code: "00000004447D",
    tags: [HeroTag.Illari, TypeTag.HeroAvatar],
  },
  {
    code: "000000044C5E",
    tags: [HeroTag.Hazard, TypeTag.HeroAvatar],
  },
  {
    code: "000000045C2E",
    tags: [HeroTag.Juno, TypeTag.HeroAvatar],
  },
  {
    code: "0000000489CF",
    tags: [HeroTag.Venture, TypeTag.HeroAvatar],
  },
  {
    code: "0000000515F7",
    tags: [HeroTag.Freja, TypeTag.HeroAvatar],
  },

  // Mercy Abilities
  {
    code: "0000000012F6",
    tags: [HeroTag.Mercy, TypeTag.Ability],
  },
  {
    code: "0000000012F3",
    tags: [HeroTag.Mercy, TypeTag.Ability],
  },
  {
    code: "000000011E06",
    tags: [HeroTag.Mercy, TypeTag.Ability],
  },
  {
    code: "0000000012F4",
    tags: [HeroTag.Mercy, TypeTag.Ability],
  },
  {
    code: "000000011E07",
    tags: [HeroTag.Mercy, TypeTag.Ultimate],
  },

  // Hanzo Abilities
  {
    code: "000000014F0C",
    tags: [HeroTag.Hanzo, TypeTag.Ability],
  },
  {
    code: "000000016F30",
    tags: [HeroTag.Hanzo, TypeTag.Ability],
  },
  {
    code: "0000000012F9",
    tags: [HeroTag.Hanzo, TypeTag.Ability],
  },
  {
    code: "0000000012F7",
    tags: [HeroTag.Hanzo, TypeTag.Ultimate],
  },

  // Zenyatta Abilities
  {
    code: "0000000012FA",
    tags: [HeroTag.Zenyatta, TypeTag.Ability],
  },
  {
    code: "0000000012FB",
    tags: [HeroTag.Zenyatta, TypeTag.Ability],
  },
  {
    code: "0000000012FC",
    tags: [HeroTag.Zenyatta, TypeTag.Ultimate],
  },

  // Bastion Abilities
  {
    code: "0000000012FF",
    tags: [HeroTag.Bastion, TypeTag.Ability],
  },
  {
    code: "000000002A8A",
    tags: [HeroTag.Bastion, TypeTag.Ultimate],
  },

  // Torbjorn Abilities
  {
    code: "000000001301",
    tags: [HeroTag.Torbjorn, TypeTag.Ability],
  },
  {
    code: "0000000013A1",
    tags: [HeroTag.Torbjorn, TypeTag.Ability],
  },
  {
    code: "00000001B650",
    tags: [HeroTag.Torbjorn, TypeTag.Ultimate],
  },

  // Reinhardt Abilities
  {
    code: "000000001303",
    tags: [HeroTag.Reinhardt, TypeTag.Ability],
  },
  {
    code: "000000001305",
    tags: [HeroTag.Reinhardt, TypeTag.Ability],
  },
  {
    code: "000000001304",
    tags: [HeroTag.Reinhardt, TypeTag.Ultimate],
  },

  // Reaper Abilities
  {
    code: "000000003FCF",
    tags: [HeroTag.Reaper, TypeTag.Passive],
  },
  {
    code: "000000001308",
    tags: [HeroTag.Reaper, TypeTag.Ability],
  },
  {
    code: "000000001307",
    tags: [HeroTag.Reaper, TypeTag.Ability],
  },
  {
    code: "000000001306",
    tags: [HeroTag.Reaper, TypeTag.Ultimate],
  },

  // Pharah Abilities
  {
    code: "00000000130A",
    tags: [HeroTag.Pharah, TypeTag.Ability],
  },
  {
    code: "000000001309",
    tags: [HeroTag.Pharah, TypeTag.Ability],
  },
  {
    code: "0000000013EB",
    tags: [HeroTag.Pharah, TypeTag.Ultimate],
  },

  // Winston Abilities
  {
    code: "00000000130B",
    tags: [HeroTag.Winston, TypeTag.Ability],
  },
  {
    code: "00000000130D",
    tags: [HeroTag.Winston, TypeTag.Ability],
  },
  {
    code: "00000000130C",
    tags: [HeroTag.Winston, TypeTag.Ultimate],
  },

  // Symmetra Abilities
  {
    code: "00000000130E",
    tags: [HeroTag.Symetra, TypeTag.Ability],
  },
  {
    code: "00000000130F",
    tags: [HeroTag.Symetra, TypeTag.Ability],
  },
  {
    code: "000000017CE7",
    tags: [HeroTag.Symetra, TypeTag.Ultimate],
  },

  // Tracer Abilities
  {
    code: "000000001310",
    tags: [HeroTag.Tracer, TypeTag.Ability],
  },
  {
    code: "000000001312",
    tags: [HeroTag.Tracer, TypeTag.Ability],
  },
  {
    code: "000000001311",
    tags: [HeroTag.Tracer, TypeTag.Ultimate],
  },

  // Widowmaker Abilities
  {
    code: "000000001313",
    tags: [HeroTag.Widowmaker, TypeTag.Ability],
  },
  {
    code: "000000001315",
    tags: [HeroTag.Widowmaker, TypeTag.Ability],
  },
  {
    code: "000000001314",
    tags: [HeroTag.Widowmaker, TypeTag.Ultimate],
  },

  // Cassidy Abilities
  {
    code: "000000002692",
    tags: [HeroTag.Cass, TypeTag.Ability],
  },
  {
    code: "000000002694",
    tags: [HeroTag.Cass, TypeTag.Ability],
  },
  {
    code: "000000002693",
    tags: [HeroTag.Cass, TypeTag.Ultimate],
  },

  // Zarya Abilities
  {
    code: "000000003FD1",
    tags: [HeroTag.Zarya, TypeTag.Passive],
  },
  {
    code: "000000002699",
    tags: [HeroTag.Zarya, TypeTag.Ability],
  },
  {
    code: "000000002698",
    tags: [HeroTag.Zarya, TypeTag.Ability],
  },
  {
    code: "000000002695",
    tags: [HeroTag.Zarya, TypeTag.Ultimate],
  },

  // Brigitte Abilities
  {
    code: "0000000144A8",
    tags: [HeroTag.Brigitte, TypeTag.Passive],
  },
  {
    code: "0000000144A4",
    tags: [HeroTag.Brigitte, TypeTag.Ability],
  },
  {
    code: "000000003339",
    tags: [HeroTag.Brigitte, TypeTag.Ability],
  },
  {
    code: "0000000144A5",
    tags: [HeroTag.Brigitte, TypeTag.Ability],
  },
  {
    code: "0000000144A6",
    tags: [HeroTag.Brigitte, TypeTag.Ultimate],
  },

  // Soldier: 76 Abilities
  {
    code: "000000014ADF",
    tags: [HeroTag.Soldier76, TypeTag.Ability],
  },
  {
    code: "000000003C1A",
    tags: [HeroTag.Soldier76, TypeTag.Ability],
  },
  {
    code: "00000000333A",
    tags: [HeroTag.Soldier76, TypeTag.Ability],
  },
  {
    code: "00000000356C",
    tags: [HeroTag.Soldier76, TypeTag.Ultimate],
  },

  // Roadhog Abilities
  {
    code: "000000003380",
    tags: [HeroTag.Roadhog, TypeTag.Ability],
  },
  {
    code: "000000003381",
    tags: [HeroTag.Roadhog, TypeTag.Ability],
  },
  {
    code: "000000003382",
    tags: [HeroTag.Roadhog, TypeTag.Ultimate],
  },

  // Lúcio Abilities
  {
    code: "000000003E7A",
    tags: [HeroTag.Lucio, TypeTag.Ability],
  },
  {
    code: "000000003E78",
    tags: [HeroTag.Lucio, TypeTag.Ability],
  },
  {
    code: "000000003C5E",
    tags: [HeroTag.Lucio, TypeTag.Ability],
  },
  {
    code: "000000003C5F",
    tags: [HeroTag.Lucio, TypeTag.Ultimate],
  },

  // Junkrat Abilities
  {
    code: "000000004E54",
    tags: [HeroTag.Junkrat, TypeTag.Passive],
  },
  {
    code: "000000004E57",
    tags: [HeroTag.Junkrat, TypeTag.Ability],
  },
  {
    code: "000000004E56",
    tags: [HeroTag.Junkrat, TypeTag.Ability],
  },
  {
    code: "000000004E55",
    tags: [HeroTag.Junkrat, TypeTag.Ultimate],
  },

  // Mei Abilities
  {
    code: "000000004E6A",
    tags: [HeroTag.Mei, TypeTag.Ability],
  },
  {
    code: "000000004E6B",
    tags: [HeroTag.Mei, TypeTag.Ability],
  },
  {
    code: "000000004E6C",
    tags: [HeroTag.Mei, TypeTag.Ultimate],
  },

  // Genji Abilities
  {
    code: "000000004E94",
    tags: [HeroTag.Genji, TypeTag.Ability],
  },
  {
    code: "000000004E95",
    tags: [HeroTag.Genji, TypeTag.Ability],
  },
  {
    code: "000000004E93",
    tags: [HeroTag.Genji, TypeTag.Ultimate],
  },

  // D.Va Abilities
  {
    code: "000000005405",
    tags: [HeroTag.DVa, TypeTag.Passive],
  },
  {
    code: "000000004EA2",
    tags: [HeroTag.DVa, TypeTag.Ability],
  },
  {
    code: "000000011DFA",
    tags: [HeroTag.DVa, TypeTag.Ability],
  },
  {
    code: "000000004EA1",
    tags: [HeroTag.DVa, TypeTag.Ability],
  },
  {
    code: "000000004EA7",
    tags: [HeroTag.DVa, TypeTag.Ultimate],
  },
  {
    code: "000000004EAB",
    tags: [HeroTag.DVa, TypeTag.Ability],
  },

  // Ana Abilities
  {
    code: "000000009B36",
    tags: [HeroTag.Ana, TypeTag.Ability],
  },
  {
    code: "000000009B37",
    tags: [HeroTag.Ana, TypeTag.Ability],
  },
  {
    code: "000000009B38",
    tags: [HeroTag.Ana, TypeTag.Ultimate],
  },

  // Sombra Abilities
  {
    code: "00000000AFBF",
    tags: [HeroTag.Sombra, TypeTag.Passive],
  },
  {
    code: "000000009F9A",
    tags: [HeroTag.Sombra, TypeTag.Ability],
  },
  {
    code: "00000000A6B5",
    tags: [HeroTag.Sombra, TypeTag.Ability],
  },
  {
    code: "000000009F75",
    tags: [HeroTag.Sombra, TypeTag.Ultimate],
  },

  // Orisa Abilities
  {
    code: "00000000D7D2",
    tags: [HeroTag.Orisa, TypeTag.Ability],
  },

  // Doomfist Abilities
  {
    code: "00000000F4C2",
    tags: [HeroTag.Doomfist, TypeTag.Passive],
  },
  {
    code: "00000000F445",
    tags: [HeroTag.Doomfist, TypeTag.Ability],
  },
  {
    code: "00000000F446",
    tags: [HeroTag.Doomfist, TypeTag.Ability],
  },
  {
    code: "00000000F448",
    tags: [HeroTag.Doomfist, TypeTag.Ultimate],
  },

  // Moira Abilities
  {
    code: "000000011DBD",
    tags: [HeroTag.Moira, TypeTag.Ability],
  },
  {
    code: "000000011DD6",
    tags: [HeroTag.Moira, TypeTag.Ability],
  },
  {
    code: "000000011D87",
    tags: [HeroTag.Moira, TypeTag.Ultimate],
  },

  // Wrecking Ball Abilities
  {
    code: "000000017EFB",
    tags: [HeroTag.WreakingBall, TypeTag.Ability],
  },
  {
    code: "000000017EF9",
    tags: [HeroTag.WreakingBall, TypeTag.Ability],
  },
  {
    code: "000000017F12",
    tags: [HeroTag.WreakingBall, TypeTag.Ability],
  },
  {
    code: "000000017EF8",
    tags: [HeroTag.WreakingBall, TypeTag.Ability],
  },
  {
    code: "000000017EFC",
    tags: [HeroTag.WreakingBall, TypeTag.Ultimate],
  },

  // Ashe Abilities
  {
    code: "00000001BD54",
    tags: [HeroTag.Ashe, TypeTag.Ability],
  },
  {
    code: "00000001BD59",
    tags: [HeroTag.Ashe, TypeTag.Ability],
  },
  {
    code: "00000001BD47",
    tags: [HeroTag.Ashe, TypeTag.Ultimate],
  },

  // Baptiste Abilities
  {
    code: "00000001E304",
    tags: [HeroTag.Baptiste, TypeTag.Ability],
  },
  {
    code: "00000001E2D3",
    tags: [HeroTag.Baptiste, TypeTag.Ability],
  },
  {
    code: "00000001E2D9",
    tags: [HeroTag.Baptiste, TypeTag.Ability],
  },
  {
    code: "00000001E2E2",
    tags: [HeroTag.Baptiste, TypeTag.Ultimate],
  },

  // Sigma Abilities
  {
    code: "00000001FBDF",
    tags: [HeroTag.Sigma, TypeTag.Ability],
  },
  {
    code: "00000001FBDD",
    tags: [HeroTag.Sigma, TypeTag.Ability],
  },
  {
    code: "00000001FBE0",
    tags: [HeroTag.Sigma, TypeTag.Ability],
  },
  {
    code: "00000001FBDE",
    tags: [HeroTag.Sigma, TypeTag.Ultimate],
  },

  // Echo Abilities
  {
    code: "000000028FCD",
    tags: [HeroTag.Echo, TypeTag.Ability],
  },
  {
    code: "000000028FCC",
    tags: [HeroTag.Echo, TypeTag.Ability],
  },
  {
    code: "000000028FCE",
    tags: [HeroTag.Echo, TypeTag.Ability],
  },
  {
    code: "000000028FCB",
    tags: [HeroTag.Echo, TypeTag.Ultimate],
  },

  // Sojourn Abilities
  {
    code: "000000029D99",
    tags: [HeroTag.Sojourn, TypeTag.Ability],
  },
  {
    code: "000000029CE8",
    tags: [HeroTag.Sojourn, TypeTag.Ability],
  },
  {
    code: "000000029CE6",
    tags: [HeroTag.Sojourn, TypeTag.Ability],
  },
  {
    code: "000000029CE7",
    tags: [HeroTag.Sojourn, TypeTag.Ultimate],
  },

  // Weapons
  {
    code: "000000001331",
    tags: [HeroTag.Mercy, TypeTag.Weapon],
  },
  {
    code: "000000001332",
    tags: [HeroTag.Mercy, TypeTag.Weapon],
  },
  {
    code: "000000001333",
    tags: [HeroTag.Hanzo, TypeTag.Weapon],
  },
  {
    code: "000000001334",
    tags: [HeroTag.Zenyatta, TypeTag.Weapon],
  },
  {
    code: "000000001335",
    tags: [HeroTag.Torbjorn, TypeTag.Weapon],
  },
  {
    code: "000000001336",
    tags: [HeroTag.Torbjorn, TypeTag.Weapon],
  },
  {
    code: "000000001337",
    tags: [HeroTag.Reinhardt, TypeTag.Weapon],
  },
  {
    code: "00000000133D",
    tags: [HeroTag.Reinhardt, TypeTag.Weapon],
  },
  {
    code: "000000001338",
    tags: [HeroTag.Reaper, TypeTag.Weapon],
  },
  {
    code: "000000001339",
    tags: [HeroTag.Pharah, TypeTag.Weapon],
  },
  {
    code: "00000000133A",
    tags: [HeroTag.Winston, TypeTag.Weapon],
  },
  {
    code: "00000000133B",
    tags: [HeroTag.Symetra, TypeTag.Weapon],
  },
  {
    code: "00000000133C",
    tags: [HeroTag.Tracer, TypeTag.Weapon],
  },
  {
    code: "000000001407",
    tags: [HeroTag.Widowmaker, TypeTag.Weapon],
  },
  {
    code: "0000000016F3",
    tags: [HeroTag.Bastion, TypeTag.Weapon],
  },
  {
    code: "000000001BAD",
    tags: [HeroTag.Bastion, TypeTag.Weapon],
  },
  {
    code: "000000002697",
    tags: [HeroTag.Cass, TypeTag.Weapon],
  },
  {
    code: "000000002696",
    tags: [HeroTag.Zarya, TypeTag.Weapon],
  },
  {
    code: "0000000144A7",
    tags: [HeroTag.Brigitte, TypeTag.Weapon],
  },
  {
    code: "0000000144B1",
    tags: [HeroTag.Brigitte, TypeTag.Weapon],
  },
  {
    code: "000000003383",
    tags: [HeroTag.Roadhog, TypeTag.Weapon],
  },
  {
    code: "000000003592",
    tags: [HeroTag.Soldier76, TypeTag.Weapon],
  },
  {
    code: "0000000035CD",
    tags: [HeroTag.Lucio, TypeTag.Weapon],
  },
  {
    code: "000000004E58",
    tags: [HeroTag.Junkrat, TypeTag.Weapon],
  },
  {
    code: "000000004E75",
    tags: [HeroTag.Mei, TypeTag.Weapon],
  },
  {
    code: "000000004E83",
    tags: [HeroTag.Genji, TypeTag.Weapon],
  },
  {
    code: "000000004EA8",
    tags: [HeroTag.DVa, TypeTag.Weapon],
  },
  {
    code: "000000004EA9",
    tags: [HeroTag.DVa, TypeTag.Weapon],
  },
  {
    code: "000000009AF8",
    tags: [HeroTag.Ana, TypeTag.Weapon],
  },
  {
    code: "00000000A180",
    tags: [HeroTag.Sombra, TypeTag.Weapon],
  },
  {
    code: "00000000D296",
    tags: [HeroTag.Orisa, TypeTag.Weapon],
  },
  {
    code: "00000000F447",
    tags: [HeroTag.Doomfist, TypeTag.Weapon],
  },
  {
    code: "000000011D5D",
    tags: [HeroTag.Moira, TypeTag.Weapon],
  },
  {
    code: "000000011D5C",
    tags: [HeroTag.Moira, TypeTag.Weapon],
  },
  {
    code: "000000017E50",
    tags: [HeroTag.WreakingBall, TypeTag.Weapon],
  },
  {
    code: "00000001BCF3",
    tags: [HeroTag.Ashe, TypeTag.Weapon],
  },
  {
    code: "00000001E2A8",
    tags: [HeroTag.Baptiste, TypeTag.Weapon],
  },
  {
    code: "00000001E2AF",
    tags: [HeroTag.Baptiste, TypeTag.Weapon],
  },
  {
    code: "00000001FBDC",
    tags: [HeroTag.Sigma, TypeTag.Weapon],
  },
  {
    code: "00000002A394",
    tags: [HeroTag.Echo, TypeTag.Weapon],
  },
  {
    code: "000000029D83",
    tags: [HeroTag.Sojourn, TypeTag.Weapon],
  },

  // Misc Icons
  {
    code: "00000000894E",
    tags: [TypeTag.UI],
  },
  {
    code: "00000000894F",
    tags: [TypeTag.UI],
  },
  {
    code: "000000008E02",
    tags: [TypeTag.Currency],
  },
  {
    code: "00000000906E",
    tags: [TypeTag.Currency],
  },
  {
    code: "0000000190E0",
    tags: [TypeTag.Currency],
  },
  {
    code: "0000000059F1",
    tags: [TypeTag.Misc],
  },

  // Roles
  {
    code: "000000004120",
    tags: [TypeTag.Role],
  },
  {
    code: "000000004121",
    tags: [TypeTag.Role],
  },
  {
    code: "000000004122",
    tags: [TypeTag.Role],
  },
  {
    code: "000000004123",
    tags: [TypeTag.Role],
  },

  // Game Stats
  {
    code: "0000000015BB",
    tags: [TypeTag.UI],
  },
  {
    code: "00000000D29C",
    tags: [TypeTag.UI],
  },
  {
    code: "00000000E613",
    tags: [TypeTag.UI],
  },
  {
    code: "0000000039DD",
    tags: [TypeTag.UI],
  },
  {
    code: "0000000039DB",
    tags: [TypeTag.UI],
  },
  {
    code: "000000013521",
    tags: [TypeTag.UI],
  },

  // Communication
  {
    code: "0000000039D7",
    tags: [TypeTag.UI],
  },
  {
    code: "0000000039DA",
    tags: [TypeTag.UI],
  },
  {
    code: "000000003A73",
    tags: [TypeTag.UI],
  },
  {
    code: "000000005A0A",
    tags: [TypeTag.UI],
  },
  {
    code: "000000005A0B",
    tags: [TypeTag.UI],
  },
  {
    code: "000000005A0D",
    tags: [TypeTag.UI],
  },
  {
    code: "000000005A0E",
    tags: [TypeTag.UI],
  },
  {
    code: "000000005A0C",
    tags: [TypeTag.UI],
  },

  // UI Elements
  {
    code: "000000007114",
    tags: [TypeTag.UI],
  },
  {
    code: "0000000207B9",
    tags: [TypeTag.UI],
  },
  {
    code: "000000017112",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F923",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F924",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F925",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F922",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F926",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F927",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F928",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F929",
    tags: [TypeTag.Symbol],
  },

  // Card Suits and Symbols
  {
    code: "00000001F92A",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F92B",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F933",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F940",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F92C",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F92D",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F939",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F92E",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F92F",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F930",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F931",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F932",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F93E",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F93F",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F937",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F938",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F942",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F935",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F93A",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F93B",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F943",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F934",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F936",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F945",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F944",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F93C",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F93D",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001F941",
    tags: [TypeTag.Symbol],
  },
  {
    code: "00000001EF19",
    tags: [TypeTag.Misc],
  },
  {
    code: "00000000F76A",
    tags: [TypeTag.Event],
  },

  // Hero Gallery Events
  {
    code: "00000000ABAB",
    tags: [TypeTag.Event],
  },
  {
    code: "00000000ABAC",
    tags: [TypeTag.Event],
  },
  {
    code: "00000000ABAD",
    tags: [TypeTag.Event],
  },
  {
    code: "00000000B93A",
    tags: [TypeTag.Event],
  },
  {
    code: "00000000B93B",
    tags: [TypeTag.Event],
  },
  {
    code: "00000000EE0C",
    tags: [TypeTag.Event],
  },
  {
    code: "000000013DCC",
    tags: [TypeTag.Event],
  },
  {
    code: "00000001935F",
    tags: [TypeTag.Event],
  },

  // Game Modes
  {
    code: "000000020AF3",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "000000020AFB",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "000000020AF7",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "000000020AF8",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "000000020AFA",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "000000020AF6",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "0000000280C0",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "00000000D29B",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "000000020AF5",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "0000000221AC",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "0000000221AD",
    tags: [TypeTag.Gamemode],
  },
  {
    code: "0000000221AE",
    tags: [TypeTag.Gamemode],
  },

  // Controls
  {
    code: "00000000447F",
    tags: [TypeTag.Control],
  },
  {
    code: "000000004480",
    tags: [TypeTag.Control],
  },
  {
    code: "000000005DAD",
    tags: [TypeTag.Control],
  },
  {
    code: "000000005DAB",
    tags: [TypeTag.Control],
  },
  {
    code: "000000005DA0",
    tags: [TypeTag.Control],
  },
  {
    code: "000000005DA1",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044A5",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044A6",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044B4",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044B3",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000090D6",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000090D7",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044A7",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044A8",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044A9",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044AA",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044AE",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044AC",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044AD",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044AB",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000065FD",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044AF",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044B1",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044B0",
    tags: [TypeTag.Control],
  },
  {
    code: "0000000044B2",
    tags: [TypeTag.Control],
  },
];
