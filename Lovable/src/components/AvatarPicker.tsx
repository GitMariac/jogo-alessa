import a1 from "@/assets/avatars/1.png";
import a2 from "@/assets/avatars/2.png";
import a3 from "@/assets/avatars/3.png";
import a4 from "@/assets/avatars/4.png";
import a5 from "@/assets/avatars/5.png";
import a6 from "@/assets/avatars/6.png";
import a7 from "@/assets/avatars/7.png";
import a8 from "@/assets/avatars/8.png";
import a9 from "@/assets/avatars/9.png";
import a10 from "@/assets/avatars/10.png";
import a11 from "@/assets/avatars/11.png";

export const AVATAR_SRC: Record<number, string> = {
  1: a1, 2: a2, 3: a3, 4: a4, 5: a5, 6: a6, 7: a7, 8: a8, 9: a9, 10: a10, 11: a11,
};

export const AVATAR_IDS = Object.keys(AVATAR_SRC).map(Number);

export function AvatarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-11">
      {AVATAR_IDS.map((id) => {
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-label={`Avatar ${id}`}
            className={
              "relative h-16 w-16 overflow-hidden rounded-full border-2 transition sm:h-20 sm:w-20 " +
              (active
                ? "border-primary shadow-[var(--glow-primary)] scale-150"
                : "border-border/60 hover:border-primary/60 hover:scale-150")
            }
          >
            <img src={AVATAR_SRC[id]} alt="" className="h-full w-full object-cover" />
          </button>
        );
      })}
    </div>
  );
}