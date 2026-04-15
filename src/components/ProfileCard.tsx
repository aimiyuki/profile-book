import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { BinderHoles, MusicNotes, FlowerCluster, GemStone, Sparkle, LaceEdge, CloverIcon } from "./Decorations";

type PersonalStatKey = "stamina" | "angerControl" | "sense" | "intelligence" | "action" | "luck";

type PersonalStats = Record<PersonalStatKey, number>;

const PERSONAL_STAT_CONFIG: Array<{
  key: PersonalStatKey;
  label: string;
  labelClassName: string;
}> = [
  { key: "stamina", label: "理解力", labelClassName: "text-pink-600" },
  { key: "sense", label: "思考力", labelClassName: "text-pink-400" },
  { key: "intelligence", label: "判断力", labelClassName: "text-orange-500" },
  { key: "action", label: "創造力", labelClassName: "text-yellow-500" },
  { key: "angerControl", label: "アンガーコントロール", labelClassName: "text-lime-500 text-[9px] leading-none" },
  { key: "luck", label: "適応力", labelClassName: "text-cyan-400" },
];

const clampStat = (value: number) => Math.max(1, Math.min(5, value));

const radarPoint = (index: number, radius: number) => {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  const cx = 100;
  const cy = 85;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
};

interface ProfileData {
  name: string;
  nickname: string;
  location: string;
  age: string;
  sns: string;
  birthday: string;
  zodiac: string;
  bloodType: string;
  mbti: string;
  personality: string;
  animalSelf: string;
  hobby: string;
  recentBoom: string;
  favoriteFood: string;
  dislikedFood: string;
  wantItem: string;
  favType: string;
  crushCount: string;
  favMusic: string;
  favManga: string;
  favTv: string;
  recentHobby: string;
  ifReborn: string;
  ifJob: string;
  ifMagic: string;
  best3Title: string;
  best3_1: string;
  best3_2: string;
  best3_3: string;
  whichAnimal: string;
  whichHoliday: string;
  whichBreakfast: string;
  whichCurry: string;
  whichSweet: string;
  whichMovie: string;
  whichFight: string;
  whichVoice: string;
  whichSleep: string;
  whichTidy: string;
  whichTripPlan: string;
  whichResetOrFuture: string;
  favSport: string;
  favColor: string;
  favBook: string;
  favLanguage: string;
  favLocation: string;
  favPlace: string;
  favWord: string;
  secretStarText: string;
  secretHeartText: string;
  secretFlowerText: string;
  likeAboutWork: string;
  freeSpace: string;
}

const initialData: ProfileData = {
  name: "", nickname: "", location: "", age: "", sns: "",
  birthday: "", zodiac: "", bloodType: "", mbti: "", personality: "",
  animalSelf: "", hobby: "", recentBoom: "", favoriteFood: "",
  dislikedFood: "", wantItem: "", favType: "", crushCount: "",
  favMusic: "", favManga: "", favTv: "", recentHobby: "",
  ifReborn: "", ifJob: "", ifMagic: "",
  best3Title: "", best3_1: "", best3_2: "", best3_3: "",
  whichAnimal: "", whichHoliday: "", whichBreakfast: "",
  whichCurry: "", whichSweet: "", whichMovie: "",
  whichFight: "",
  whichVoice: "",
  whichSleep: "",
  whichTidy: "",
  whichTripPlan: "",
  whichResetOrFuture: "",
  favSport: "", favColor: "", favBook: "", favLanguage: "", favLocation: "", favPlace: "", favWord: "",
  secretStarText: "",
  secretHeartText: "",
  secretFlowerText: "",
  likeAboutWork: "", freeSpace: "",
};

function EField({ value, onChange, placeholder, className = "" }: {
  value: string; onChange: (v: string) => void; placeholder: string; className?: string;
}) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-white/40 border-b-2 border-current/20 outline-none placeholder:opacity-40 focus:border-current/50 transition-colors px-1 rounded-sm ${className}`}
    />
  );
}

function QRow({ label, after, v1, o1, p1, v2, o2, p2, after2 }: {
  label: string; after: string; v1: string; o1: (v: string) => void; p1: string;
  v2: string; o2: (v: string) => void; p2: string; after2?: string;
}) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <span className="font-bold">{label}</span>
      <EField value={v1} onChange={o1} placeholder={p1} className="w-10" />
      <span>{after}</span>
      <EField value={v2} onChange={o2} placeholder={p2} className="w-24" />
      {after2 && <span>{after2}</span>}
    </div>
  );
}

function Fav({ label, v, o }: { label: string; v: string; o: (v: string) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-xs font-bold shrink-0">{label}</span>
      <EField value={v} onChange={o} placeholder="" className="flex-1 w-0 text-xs" />
    </div>
  );
}

function ChoiceButtons({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string];
}) {
  return (
    <div className="flex items-center gap-1">
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className="min-w-[56px] rounded-full px-2 py-0.5 text-[10px] font-bold leading-tight transition-all"
            style={{
              background: selected ? "oklch(0.83 0.16 155)" : "oklch(0.92 0.01 140)",
              border: selected ? "2px solid oklch(0.74 0.15 180)" : "2px solid transparent",
              color: selected ? "oklch(0.2 0 0)" : "oklch(0.72 0.01 140)",
              boxShadow: selected
                ? "0 1px 0 oklch(1 0 0 / 0.35) inset"
                : "0 0 0 1px oklch(0.88 0.01 140 / 0.45) inset",
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function PersonalDataSection({
  stats,
  onChange,
}: {
  stats: PersonalStats;
  onChange: (key: PersonalStatKey, value: number) => void;
}) {
  const radarFillPoints = PERSONAL_STAT_CONFIG.map(({ key }, index) => {
    const radius = (75 * stats[key]) / 5;
    const point = radarPoint(index, radius);
    return `${point.x},${point.y}`;
  }).join(" ");
  const labelRadius = 84;
  const labelTransforms = [
    "translate(-50%, -68%)",
    "translate(0%, -50%)",
    "translate(0%, -50%)",
    "translate(-50%, 8%)",
    "translate(-58%, -50%)",
    "translate(-96%, -50%)",
  ] as const;

  return (
    <div
      className="relative rounded-xl overflow-hidden p-4"
      style={{
        background: "linear-gradient(180deg, oklch(0.94 0.05 350), oklch(0.9 0.05 330))",
        border: "2px solid oklch(0.82 0.08 340 / 0.5)",
      }}
    >
      <h3
        className="text-center font-black tracking-wide text-lg mb-3"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.7 0.2 20), oklch(0.78 0.2 80), oklch(0.68 0.2 150), oklch(0.67 0.2 250), oklch(0.7 0.2 340))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        My Graph
      </h3>

      <div className="relative h-[260px] pt-3 pb-2">
        {PERSONAL_STAT_CONFIG.map((item, index) => {
          const point = radarPoint(index, labelRadius);
          return (
            <span
              key={item.key}
              className={`absolute text-[12px] font-black px-1.5 py-0.5 rounded-md bg-white/75 ${item.labelClassName}`}
              style={{
                left: `${(point.x / 200) * 100}%`,
                top: `${(point.y / 170) * 100}%`,
                transform: labelTransforms[index],
              }}
            >
              {item.label}
            </span>
          );
        })}

        <svg viewBox="0 0 200 170" className="absolute inset-0 h-full w-full">
          {[15, 30, 45, 60, 75].map((r) => (
            <polygon
              key={r}
              points={PERSONAL_STAT_CONFIG.map((_, index) => {
                const point = radarPoint(index, r);
                return `${point.x},${point.y}`;
              }).join(" ")}
              fill="none"
              stroke="oklch(0.86 0.01 0)"
              strokeWidth="1.2"
            />
          ))}
          <polygon
            points={radarFillPoints}
            fill="oklch(0.76 0.14 330 / 0.35)"
            stroke="oklch(0.64 0.18 330 / 0.85)"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-2">
        {PERSONAL_STAT_CONFIG.map((item) => (
          <div key={item.key} className="rounded-lg bg-white/55 px-1.5 py-1">
            <div className="text-[10px] font-black leading-tight mb-1">{item.label}</div>
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => onChange(item.key, stats[item.key] - 1)}
                className="h-6 w-6 rounded-full text-xs font-black active:scale-95 transition-transform"
                style={{ background: "oklch(0.94 0.02 0)", border: "1px solid oklch(0.82 0.03 0)" }}
                aria-label={`${item.label} down`}
              >
                -
              </button>
              <span className="text-xs font-black tabular-nums">{stats[item.key]}</span>
              <button
                type="button"
                onClick={() => onChange(item.key, stats[item.key] + 1)}
                className="h-6 w-6 rounded-full text-xs font-black active:scale-95 transition-transform"
                style={{ background: "oklch(0.84 0.14 150)", border: "1px solid oklch(0.75 0.14 175)" }}
                aria-label={`${item.label} up`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecretCloudSection({
  data,
  onChange,
}: {
  data: Pick<ProfileData, "secretStarText" | "secretHeartText" | "secretFlowerText">;
  onChange: (key: "secretStarText" | "secretHeartText" | "secretFlowerText") => (value: string) => void;
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden p-4 min-h-[280px]"
      style={{
        background: "linear-gradient(180deg, oklch(0.95 0.04 350), oklch(0.94 0.03 20))",
        border: "2px solid oklch(0.82 0.06 330 / 0.45)",
      }}
    >
      {[
        "top-3 left-4 text-xl",
        "top-7 left-14 text-sm",
        "top-4 right-6 text-base",
        "top-16 right-16 text-xs",
        "top-24 left-8 text-sm",
        "top-28 right-4 text-base",
        "bottom-20 left-5 text-sm",
        "bottom-16 left-20 text-xs",
        "bottom-14 right-10 text-sm",
        "bottom-24 right-2 text-xs",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} opacity-45 pointer-events-none select-none`}
          style={{ color: "oklch(0.86 0.11 88)" }}
        >
          ✦
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-5xl opacity-55">🐱</div>

      <div className="relative h-[250px]">
        <div className="absolute left-3 top-20 h-36 w-40 z-10">
          <svg viewBox="0 0 120 100" className="h-full w-full">
            <path
              d="M60 5 L72 36 L106 36 L79 56 L89 90 L60 70 L31 90 L41 56 L14 36 L48 36 Z"
              fill="oklch(0.86 0.07 240 / 0.95)"
              stroke="oklch(0.86 0.1 95 / 0.75)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute top-2 left-1/2 -translate-x-1/2 w-[150px] text-center text-sm leading-tight font-black whitespace-normal" style={{ color: "oklch(0.72 0.14 340)" }}>
            最近納得いかなかった話
          </span>
          <textarea
            value={data.secretStarText}
            onChange={(e) => onChange("secretStarText")(e.target.value)}
            placeholder="ここに入力"
            rows={3}
            className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108px] resize-none border-0 bg-transparent text-center text-xs leading-tight text-slate-700 placeholder:opacity-45 outline-none"
          />
        </div>

        <div className="absolute left-1/2 top-8 h-36 w-48 -translate-x-1/2 z-20">
          <svg viewBox="0 0 160 120" className="h-full w-full">
            <path
              d="M80 106 C48 82 20 60 20 36 C20 21 32 10 48 10 C61 10 72 17 80 29 C88 17 99 10 112 10 C128 10 140 21 140 36 C140 60 112 82 80 106 Z"
              fill="oklch(0.9 0.06 340 / 0.95)"
              stroke="oklch(0.84 0.1 95 / 0.75)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute top-2 left-1/2 -translate-x-1/2 w-[185px] text-center text-sm leading-tight font-black whitespace-normal" style={{ color: "oklch(0.7 0.12 40)" }}>
            忘年会で盛り上がった話
          </span>
          <textarea
            value={data.secretHeartText}
            onChange={(e) => onChange("secretHeartText")(e.target.value)}
            placeholder="ここに入力"
            rows={3}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[124px] resize-none border-0 bg-transparent text-center text-xs leading-tight text-slate-700 placeholder:opacity-45 outline-none"
          />
        </div>

        <div className="absolute right-6 top-20 h-34 w-34 z-10">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <path
              d="M60 90
                 C56 102 48 108 38 106
                 C26 103 20 90 24 78
                 C27 69 31 64 38 60
                 C28 60 20 55 17 45
                 C14 33 22 21 34 19
                 C44 17 53 21 58 31
                 C57 20 62 12 73 10
                 C85 8 95 17 97 29
                 C98 39 94 48 86 55
                 C96 53 104 55 110 64
                 C117 74 114 88 104 94
                 C95 100 84 100 76 94
                 C75 102 70 109 60 110
                 C50 109 44 102 42 92
                 C47 89 53 89 60 90 Z"
              fill="oklch(0.93 0.05 95 / 0.95)"
              stroke="oklch(0.84 0.1 95 / 0.75)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[125px] text-center text-sm leading-tight font-black whitespace-normal" style={{ color: "oklch(0.66 0.13 230)" }}>
            今だから言える話
          </span>
          <textarea
            value={data.secretFlowerText}
            onChange={(e) => onChange("secretFlowerText")(e.target.value)}
            placeholder="ここに入力"
            rows={3}
            className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[96px] resize-none border-0 bg-transparent text-center text-[11px] leading-tight text-slate-700 placeholder:opacity-45 outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ProfileData>(initialData);
  const [personalStats, setPersonalStats] = useState<PersonalStats>({
    stamina: 3,
    angerControl: 3,
    sense: 3,
    intelligence: 3,
    action: 3,
    luck: 3,
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const u = useCallback(
    (key: keyof ProfileData) => (value: string) => setData((p) => ({ ...p, [key]: value })),
    []
  );

  const updatePersonalStat = useCallback((key: PersonalStatKey, value: number) => {
    setPersonalStats((prev) => ({ ...prev, [key]: clampStat(value) }));
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const saveAsImage = async () => {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      cardRef.current.querySelectorAll("input, textarea").forEach((el) => (el as HTMLElement).blur());
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true, backgroundColor: null });
      const link = document.createElement("a");
      link.download = "my-profile.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-6 px-3">
      <button onClick={saveAsImage} disabled={saving}
        className="mb-4 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
        style={{ background: "linear-gradient(135deg, oklch(0.75 0.15 140), oklch(0.7 0.18 180))", color: "white" }}>
        <span>📸</span>{saving ? "保存中..." : "画像を保存する"}
      </button>

      {/* Main Card - Two page notebook spread */}
      <div ref={cardRef} className="w-full max-w-[1080px] relative overflow-hidden rounded-2xl flex flex-row"
        style={{ background: "oklch(0.96 0.02 90)" }}>

        {/* ===== LEFT PAGE ===== */}
        <div className="w-1/2 relative overflow-visible"
          style={{ background: "linear-gradient(180deg, oklch(0.88 0.1 140), oklch(0.92 0.06 90), oklch(0.9 0.08 350))" }}>
          <BinderHoles side="right" />
          <div className="relative z-10 pr-4 pl-4 py-4 flex flex-col gap-3" style={{ fontSize: "clamp(9px, 1.6vw, 12px)" }}>

            {/* My Profile */}
            <div className="relative rounded-xl p-3 overflow-hidden"
              style={{ background: "linear-gradient(135deg, oklch(0.88 0.12 140) 0%, oklch(0.92 0.08 100) 50%, oklch(0.85 0.1 140) 100%)", border: "2px solid oklch(0.7 0.15 140 / 0.4)" }}>
              <LaceEdge color="oklch(0.7 0.15 140)" />
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-black text-lg tracking-wider" style={{ color: "oklch(0.5 0.15 140)" }}>🌿 おともだちデータ</h2>
                <CloverIcon />
              </div>
              <div className="flex gap-3">
                <div className="flex-1 space-y-1.5" style={{ color: "oklch(0.4 0.1 140)" }}>
                  <div className="flex items-center gap-1">
                    <span className="font-bold shrink-0">Name</span>
                    <EField value={data.name} onChange={u("name")} placeholder="なまえ" className="flex-1 w-0" />
                    <span className="font-bold shrink-0 ml-2">Nickname</span>
                    <EField value={data.nickname} onChange={u("nickname")} placeholder="" className="flex-1 w-0" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold shrink-0">SNS ID</span>
                    <EField value={data.sns} onChange={u("sns")} placeholder="@username" className="flex-1 w-0" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold shrink-0">Location</span>
                    <EField value={data.location} onChange={u("location")} placeholder="" className="flex-1 w-0" />
                  </div>
                </div>
                <label className="shrink-0 w-20 h-24 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                  style={{ border: "2px dashed oklch(0.6 0.12 140 / 0.5)", background: "oklch(0.95 0.04 140 / 0.5)" }}>
                  {photo ? <img src={photo} alt="Photo" className="w-full h-full object-cover" />
                    : <div className="text-center text-xs leading-tight" style={{ color: "oklch(0.5 0.1 140)" }}>
                      <div className="text-xl mb-1">📷</div>にがおえ<br />or 写真
                    </div>}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
              <MusicNotes className="absolute top-2 right-16" />
              <Sparkle className="absolute bottom-3 left-2 text-lg" />
              <FlowerCluster className="absolute -bottom-2 right-0 opacity-40" />
            </div>

            {/* Questions */}
            <div className="relative rounded-xl p-3 overflow-hidden"
              style={{ background: "linear-gradient(135deg, oklch(0.93 0.08 90), oklch(0.92 0.06 60), oklch(0.9 0.08 350))", border: "2px solid oklch(0.8 0.1 60 / 0.4)" }}>
              <div className="space-y-1" style={{ color: "oklch(0.4 0.08 30)" }}>
                <QRow label="わたしは" after="歳" v1={data.age} o1={u("age")} p1="○" v2={data.birthday} o2={u("birthday")} p2="○月○日生まれ" />
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-bold shrink-0">星座は</span>
                  <EField value={data.zodiac} onChange={u("zodiac")} placeholder="○○" className="w-16" />
                  <span>座で、血液型は</span>
                  <EField value={data.bloodType} onChange={u("bloodType")} placeholder="○" className="w-10" />
                  <span>型だよ！</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-bold">自分を動物に例えると</span>
                  <EField value={data.animalSelf} onChange={u("animalSelf")} placeholder="" className="w-20" />
                  <span>かな？性格は</span>
                  <EField value={data.personality} onChange={u("personality")} placeholder="" className="flex-1 w-0" />
                  <span>だよ♪</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-bold">特技は</span>
                  <EField value={data.hobby} onChange={u("hobby")} placeholder="" className="w-24" />
                  <span>で、趣味は</span>
                  <EField value={data.recentBoom} onChange={u("recentBoom")} placeholder="" className="flex-1 w-0" />
                  <span>かな。</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-bold">好きなタイプは有名人で言うと</span>
                  <EField value={data.favType} onChange={u("favType")} placeholder="" className="flex-1 w-0" />
                  <span>！</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span>得意料理は</span>
                  <EField value={data.favMusic} onChange={u("favMusic")} placeholder="" className="w-24" />
                  <span>♪ 一押しのマンガは</span>
                  <EField value={data.favManga} onChange={u("favManga")} placeholder="" className="flex-1 w-0" />
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span>よく観るコンテンツは</span>
                  <EField value={data.favTv} onChange={u("favTv")} placeholder="" className="flex-1 w-0" />
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-bold">マイブームは</span>
                  <EField value={data.recentHobby} onChange={u("recentHobby")} placeholder="" className="flex-1 w-0" />
                  <span>だよ！</span>
                </div>
              </div>
              <GemStone className="absolute top-1 right-3" color="oklch(0.8 0.15 60)" />
              <Sparkle className="absolute top-8 right-12 text-base" />
            </div>

            <PersonalDataSection stats={personalStats} onChange={updatePersonalStat} />

            {/* Bottom deco left */}
            <div className="flex justify-center gap-2 opacity-40 items-center">
              <Sparkle />
              <Sparkle />
            </div>
          </div>

          {/* Floating decorations left */}
          <div className="absolute top-20 left-2 opacity-25 pointer-events-none text-3xl">🌸</div>
          <div className="absolute bottom-32 left-3 opacity-20 pointer-events-none text-2xl">🎵</div>
          <GemStone className="absolute top-40 left-6 opacity-30" color="oklch(0.65 0.2 230)" />
        </div>

        {/* Center spine line */}
        <div className="relative w-6 shrink-0">
          <div
            className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, oklch(0.8 0.08 140), oklch(0.75 0.1 350), oklch(0.8 0.08 230))" }}
          />
        </div>

        {/* ===== RIGHT PAGE ===== */}
        <div className="w-1/2 relative overflow-visible"
          style={{ background: "linear-gradient(180deg, oklch(0.9 0.08 350), oklch(0.88 0.06 270), oklch(0.85 0.06 230))" }}>
          <BinderHoles side="left" />
          <div className="relative z-10 pr-4 pl-4 py-4 flex flex-col gap-3" style={{ fontSize: "clamp(9px, 1.6vw, 12px)" }}>

            {/* My Best 3 + もしもコーナー */}
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl p-3 relative overflow-hidden"
                style={{ background: "linear-gradient(180deg, oklch(0.9 0.1 140), oklch(0.85 0.08 120))", border: "2px solid oklch(0.7 0.12 140 / 0.4)" }}>
                <h3 className="font-black text-sm mb-2" style={{ color: "oklch(0.45 0.15 140)" }}>🌟 My Best 3</h3>
                <div className="mb-1 flex items-center gap-1" style={{ color: "oklch(0.4 0.1 140)" }}>
                  <span className="font-bold">好きな</span>
                  <EField value={data.best3Title} onChange={u("best3Title")} placeholder="○○" className="w-20" />
                </div>
                {[data.best3_1, data.best3_2, data.best3_3].map((v, i) => (
                  <div key={i} className="flex items-center gap-1 mb-1" style={{ color: "oklch(0.4 0.1 140)" }}>
                    <span className="font-bold w-5 text-center rounded-full text-xs" style={{ background: "oklch(0.95 0.05 90)", color: "oklch(0.5 0.15 30)" }}>{i + 1}</span>
                    <EField value={v} onChange={u((`best3_${i + 1}` as keyof ProfileData))} placeholder="" className="flex-1 w-0" />
                  </div>
                ))}
                <GemStone className="absolute bottom-1 right-1" color="oklch(0.7 0.18 230)" />
              </div>

              <div className="flex-1 rounded-xl p-3 relative overflow-hidden"
                style={{ background: "linear-gradient(180deg, oklch(0.92 0.06 350), oklch(0.88 0.08 340))", border: "2px solid oklch(0.7 0.15 350 / 0.3)" }}>
                <h3 className="font-black text-sm mb-2" style={{ color: "oklch(0.5 0.18 350)" }}>💭 もしもコーナー</h3>
                <div className="space-y-1.5" style={{ color: "oklch(0.4 0.08 350)" }}>
                  <div><span className="font-bold text-xs">生まれ変わるなら？</span>
                    <EField value={data.ifReborn} onChange={u("ifReborn")} placeholder="" className="w-full" /></div>
                  <div><span className="font-bold text-xs">別の職業につくなら？</span>
                    <EField value={data.ifJob} onChange={u("ifJob")} placeholder="" className="w-full" /></div>
                  <div><span className="font-bold text-xs">別の時代を1日だけ体験できたら？</span>
                    <EField value={data.ifMagic} onChange={u("ifMagic")} placeholder="" className="w-full" /></div>
                </div>
              </div>
            </div>

            {/* MY FAVORITE + WHICH ONE */}
            <div className="flex flex-col gap-3">
              <div className="rounded-xl p-3 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, oklch(0.93 0.05 350), oklch(0.95 0.03 60))", border: "2px solid oklch(0.8 0.1 350 / 0.3)" }}>
                <h3 className="font-black text-sm mb-2" style={{
                  background: "linear-gradient(90deg, oklch(0.65 0.2 350), oklch(0.7 0.18 60), oklch(0.6 0.2 140), oklch(0.65 0.2 270))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>♡ MY FAVORITE</h3>
                <div className="grid grid-cols-1 gap-y-1" style={{ color: "oklch(0.4 0.08 350)" }}>
                  <Fav label="🍽️ 食べ物" v={data.favMusic} o={u("favMusic")} />
                  <Fav label="⚽ スポーツ" v={data.favSport} o={u("favSport")} />
                  <Fav label="🎨 カラー" v={data.favColor} o={u("favColor")} />
                  <Fav label="📕 本" v={data.favBook} o={u("favBook")} />
                  <Fav label="🌏 言語" v={data.favLanguage} o={u("favLanguage")} />
                  <Fav label="🗾 場所" v={data.favLocation} o={u("favLocation")} />
                  <Fav label="📚 マンガ" v={data.favManga} o={u("favManga")} />
                  <Fav label="💬 ことば" v={data.favWord} o={u("favWord")} />
                  <Fav label="📍 お店" v={data.favPlace} o={u("favPlace")} />
                </div>
              </div>

              <div className="rounded-xl p-3 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, oklch(0.9 0.08 270), oklch(0.92 0.05 230))", border: "2px solid oklch(0.7 0.12 270 / 0.3)" }}>
                <h3 className="font-black text-sm mb-1" style={{ color: "oklch(0.5 0.18 270)" }}>🔮 WHICH ONE</h3>
                <p className="text-xs mb-1.5 opacity-60">あなたはどっち？</p>
                <div className="grid grid-cols-[0.9fr_1.1fr] gap-x-0 text-xs" style={{ color: "oklch(0.4 0.08 270)" }}>
                  <div className="space-y-0.5">
                    {[
                      { q: "動物は", a: "犬・猫", k: "whichAnimal" as const },
                      { q: "休日は", a: "インドア・アウトドア", k: "whichHoliday" as const },
                      { q: "朝食は", a: "ごはん・パン", k: "whichBreakfast" as const },
                      { q: "カレーは", a: "牛肉・ブタ肉", k: "whichCurry" as const },
                      { q: "食べ物は", a: "甘党・辛党", k: "whichSweet" as const },
                      { q: "朝方？夜型？", a: "朝型・夜型", k: "whichMovie" as const },
                    ].map(({ q, a, k }) => (
                      <div key={k} className="flex items-center gap-0.5">
                        <span>♥</span><span className="font-bold">{q}</span>
                        <ChoiceButtons
                          value={data[k]}
                          onChange={u(k)}
                          options={a.split("・") as [string, string]}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { q: "喧嘩したら", a: "すぐに謝る・絶対に謝らない", k: "whichFight" as const },
                      { q: "声は", a: "大きい方・小さい方", k: "whichVoice" as const },
                      { q: "寝たら", a: "忘れる・忘れない", k: "whichSleep" as const },
                      { q: "片付けは", a: "できる方・できない方", k: "whichTidy" as const },
                      { q: "旅行は計画を", a: "立てる・立てない", k: "whichTripPlan" as const },
                      { q: "一度だけ", a: "未来を見られる・記憶をリセットできる", k: "whichResetOrFuture" as const },
                    ].map(({ q, a, k }) => (
                      <div key={k} className="flex items-center gap-0">
                        <span>♥</span><span className="font-bold whitespace-nowrap">{q}</span>
                        <ChoiceButtons
                          value={data[k]}
                          onChange={u(k)}
                          options={a.split("・") as [string, string]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <SecretCloudSection data={data} onChange={u} />

            {/* Bottom deco right */}
            <div className="flex justify-center gap-2 opacity-40 items-center">
              <Sparkle />
              <Sparkle />
            </div>
          </div>

          {/* Floating decorations right */}
          <div className="absolute top-1/3 right-12 opacity-20 pointer-events-none text-2xl">✨</div>
          <div className="absolute bottom-16 right-14 opacity-20 pointer-events-none"><FlowerCluster /></div>
          <GemStone className="absolute top-60 right-6 opacity-25" color="oklch(0.7 0.2 350)" />
        </div>
      </div>

      <p className="text-muted-foreground text-xs mt-3 text-center">
        入力して「画像を保存する」を押すとJPEG画像としてダウンロードできます 📲
      </p>
    </div>
  );
}
