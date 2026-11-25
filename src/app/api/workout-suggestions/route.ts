import { NextRequest, NextResponse } from "next/server";

type Exercise = { name: string; muscle: string; equipment: string; kind: "weighted" | "bodyweight" | "timed"; sets: string; reps: string; weight: string };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { goal, level, equipment, duration, availableExercises } = body ?? {};
    if (typeof goal !== "string" || typeof level !== "string" || !Array.isArray(equipment) || !Array.isArray(availableExercises)) {
      return NextResponse.json({ error: "Invalid workout preferences." }, { status: 400 });
    }
    const allowed = (availableExercises as Exercise[]).filter((item) =>
      item && typeof item.name === "string" && typeof item.muscle === "string" &&
      typeof item.equipment === "string" && ["weighted", "bodyweight", "timed"].includes(item.kind) &&
      (equipment.includes(item.equipment) || item.equipment === "Bodyweight")
    );
    if (!allowed.length) return NextResponse.json({ error: "Choose at least one equipment option." }, { status: 400 });
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "AI provider is not configured." }, { status: 503 });

    const prompt = {
      goal: goal.slice(0, 60),
      experience: level.slice(0, 40),
      equipment: equipment.slice(0, 8),
      minutes: Math.max(15, Math.min(120, Number(duration) || 45)),
      exerciseLibrary: allowed.map(({ name, muscle, equipment: itemEquipment, kind }) => ({ name, muscle, equipment: itemEquipment, kind }))
    };
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.35,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a conservative strength-training planner. Return JSON only with keys title and exercises. Build a balanced session that fits the time budget, uses ONLY exact exercise names from exerciseLibrary, respects equipment, and suits the goal and experience. Avoid excessive volume: beginner 2 working sets, intermediate 2-3, advanced 3-4; usually 6-12 reps for strength/hypertrophy and 10-15 for general fitness. For timed exercises reps means seconds. Never prescribe max effort, training through pain, or medical treatment. Each exercise object must contain name, muscle, equipment, kind, sets, reps, weight. Set weight to an empty string; never invent a working load. Include 3-7 exercises depending on time. No explanations outside JSON." },
          { role: "user", content: JSON.stringify(prompt) }
        ]
      }),
      signal: AbortSignal.timeout(18000)
    });
    if (!response.ok) return NextResponse.json({ error: "AI workout generation is temporarily unavailable." }, { status: 502 });
    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    if (typeof content !== "string") return NextResponse.json({ error: "AI returned an empty plan." }, { status: 502 });
    const parsed = JSON.parse(content);
    const allowedByName = new Map(allowed.map((item) => [item.name, item]));
    const exercises: Exercise[] = Array.isArray(parsed.exercises) ? parsed.exercises.flatMap((item: Partial<Exercise>) => {
      const original = typeof item.name === "string" ? allowedByName.get(item.name) : undefined;
      if (!original) return [];
      const sets = Math.max(1, Math.min(4, Math.round(Number(item.sets) || 2)));
      const reps = Math.max(1, Math.min(60, Math.round(Number(item.reps) || 10)));
      return [{ ...original, sets: String(sets), reps: String(reps), weight: "" }];
    }).slice(0, 7) : [];
    if (!exercises.length) return NextResponse.json({ error: "AI could not build a valid plan from this equipment." }, { status: 502 });
    return NextResponse.json({ title: typeof parsed.title === "string" ? parsed.title.slice(0, 60) : "Personalized workout", exercises });
  } catch {
    return NextResponse.json({ error: "Could not generate a workout. Please try again." }, { status: 500 });
  }
}
