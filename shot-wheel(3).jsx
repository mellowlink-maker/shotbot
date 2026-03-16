import { useState, useRef, useEffect } from "react";

const shots = [
  { name: "Tequila", color: "#f9ca24", strength: 3, ingredients: ["1.5 oz Blanco Tequila", "Salt (for hand)", "Lime wedge"], steps: ["Pour tequila into a shot glass.", "Lick the back of your hand and pour a pinch of salt on it.", "Lick the salt, shoot the tequila, then bite the lime wedge."], tip: "Chill the tequila first — it goes down much smoother cold.", glass: "Shot glass" },
  { name: "Jäger-bomb", color: "#6c5ce7", strength: 3, ingredients: ["1.5 oz Jägermeister", "½ can Red Bull"], steps: ["Fill a rocks glass halfway with Red Bull.", "Pour Jägermeister into a shot glass.", "Drop the shot glass into the Red Bull and drink immediately."], tip: "Drop it fast and drink faster — it gets foamy quickly.", glass: "Pint + shot glass" },
  { name: "Fireball", color: "#e55039", strength: 2, ingredients: ["1.5 oz Fireball Cinnamon Whisky"], steps: ["Pour Fireball into a shot glass.", "Optionally chill the bottle in the freezer first.", "Shoot it neat."], tip: "Straight from the freezer makes it go down much smoother.", glass: "Shot glass" },
  { name: "Kamikaze", color: "#00b894", strength: 3, ingredients: ["1 oz Vodka", "1 oz Triple Sec", "1 oz Fresh Lime Juice"], steps: ["Fill a shaker with ice.", "Add vodka, triple sec, and lime juice.", "Shake 10–15 seconds and strain into a shot glass."], tip: "Always use fresh lime juice — it makes a huge difference.", glass: "Shot glass" },
  { name: "Lemon Drop", color: "#f6d365", strength: 2, ingredients: ["1 oz Vodka", "½ oz Triple Sec", "½ oz Lemon Juice", "Sugar rim"], steps: ["Rim the shot glass with sugar.", "Shake vodka, triple sec, and lemon juice with ice.", "Strain into the sugar-rimmed glass."], tip: "The sugar rim is essential — it balances the tartness.", glass: "Sugar-rimmed shot glass" },
  { name: "B-52", color: "#e17055", strength: 2, ingredients: ["⅓ oz Kahlúa", "⅓ oz Baileys", "⅓ oz Grand Marnier"], steps: ["Pour Kahlúa as the base.", "Layer Baileys slowly over a spoon.", "Layer Grand Marnier on top the same way."], tip: "Chill the glass first for cleaner, more defined layers.", glass: "Shot glass (layered)" },
  { name: "Buttery Nipple", color: "#f9e4b7", strength: 1, ingredients: ["¾ oz Butterscotch Schnapps", "¾ oz Baileys Irish Cream"], steps: ["Pour butterscotch schnapps into a shot glass.", "Slowly layer Baileys over the back of a spoon.", "Serve without stirring."], tip: "One of the smoothest shots out there — great for beginners.", glass: "Shot glass (layered)" },
  { name: "Blow Job", color: "#fffde7", strength: 1, ingredients: ["½ oz Baileys Irish Cream", "½ oz Butterscotch Schnapps", "Whipped cream on top"], steps: ["Pour schnapps into a shot glass.", "Layer Baileys on top.", "Add a generous swirl of whipped cream.", "Drink without using your hands — tilt the glass with your mouth."], tip: "The whipped cream is non-negotiable. That's the whole bit.", glass: "Shot glass" },
  { name: "Green Tea", color: "#55efc4", strength: 2, ingredients: ["½ oz Jameson", "½ oz Peach Schnapps", "½ oz Sour Mix", "Splash Sprite"], steps: ["Shake Jameson, schnapps, and sour mix with ice.", "Strain into a shot glass.", "Top with a splash of Sprite."], tip: "No actual tea in here — it just magically tastes like it.", glass: "Shot glass" },
  { name: "Woo Woo", color: "#e84393", strength: 2, ingredients: ["1 oz Vodka", "½ oz Peach Schnapps", "Splash Cranberry Juice"], steps: ["Add vodka and peach schnapps to a shaker with ice.", "Add a splash of cranberry juice.", "Shake and strain into a shot glass."], tip: "Add more cranberry for a deeper color and slightly tarter taste.", glass: "Shot glass" },
  { name: "Alabama Slammer", color: "#e07a5f", strength: 2, ingredients: ["½ oz Southern Comfort", "½ oz Amaretto", "Splash OJ", "Splash Grenadine"], steps: ["Combine Southern Comfort and amaretto in a shaker with ice.", "Add orange juice and a splash of grenadine.", "Shake well and strain into a shot glass."], tip: "The grenadine sinks to the bottom — don't stir for a pretty gradient.", glass: "Shot glass" },
  { name: "Sex on Beach", color: "#fd79a8", strength: 2, ingredients: ["½ oz Vodka", "½ oz Peach Schnapps", "Splash OJ", "Splash Cranberry"], steps: ["Shake vodka and peach schnapps with ice.", "Add equal splashes of OJ and cranberry.", "Strain into a shot glass."], tip: "Equal parts OJ and cranberry gives the best pink color and balance.", glass: "Shot glass" },
  { name: "Slippery Nipple", color: "#f3e9d2", strength: 2, ingredients: ["¾ oz Sambuca", "¾ oz Baileys Irish Cream"], steps: ["Pour Sambuca into a shot glass.", "Carefully layer Baileys over the back of a spoon.", "Serve layered."], tip: "The anise from Sambuca plus cream is surprisingly delicious together.", glass: "Shot glass (layered)" },
  { name: "Four Horsemen", color: "#a29bfe", strength: 5, ingredients: ["¼ oz Jim Beam", "¼ oz Jack Daniel's", "¼ oz Johnnie Walker", "¼ oz Jameson"], steps: ["Pour all four whiskeys equally into a shot glass.", "Mix or layer — your call.", "Take a deep breath and shoot it."], tip: "Four whiskeys, one shot. Have a chaser ready and pace your night.", glass: "Shot glass" },
  { name: "Prairie Fire", color: "#ff7675", strength: 4, ingredients: ["1.5 oz Blanco Tequila", "3–5 dashes Tabasco"], steps: ["Pour tequila into a shot glass.", "Drop 3–5 dashes of Tabasco on top.", "Do not stir — shoot it in one go."], tip: "The heat blooms after the tequila. Have a cold beer ready.", glass: "Shot glass" },
  { name: "Vodka Red Bull", color: "#c0392b", strength: 3, ingredients: ["1.5 oz Vodka", "½ can Red Bull"], steps: ["Pour Red Bull into a rocks glass.", "Add vodka as a shot drop-in, or mix directly.", "Drink immediately while fizzy."], tip: "Great as a bomb shot — drop the vodka glass into the Red Bull.", glass: "Rocks + shot glass" },
  { name: "Irish Car Bomb", color: "#8e6b47", strength: 4, ingredients: ["½ pint Guinness", "½ oz Baileys", "½ oz Jameson"], steps: ["Pour Guinness into a pint glass.", "Combine Baileys and Jameson in a shot glass.", "Drop the shot into the Guinness and chug immediately."], tip: "Drink it FAST — Baileys curdles in the stout if you wait.", glass: "Pint + shot glass" },
  { name: "Sake Bomb", color: "#dfe6e9", strength: 2, ingredients: ["1 oz Sake", "½ pint Light Beer"], steps: ["Fill a glass halfway with cold beer.", "Balance chopsticks across the top and place a sake shot on them.", "Slam the table so the sake drops in, then chug."], tip: "The table slam method is the classic way — it's half the fun.", glass: "Pint + shot glass" },
  { name: "Cement Mixer", color: "#b8e994", strength: 1, ingredients: ["½ oz Baileys Irish Cream", "½ oz Lime Juice"], steps: ["Pour Baileys into a shot glass.", "Pour lime juice into a separate shot glass.", "Pour both into your mouth at the same time and swirl — don't swallow immediately."], tip: "The lime curdles the Baileys into a cottage-cheese texture in your mouth. It's a dare shot.", glass: "Two shot glasses" },
  { name: "Mind Eraser", color: "#a8d8ea", strength: 3, ingredients: ["1 oz Vodka", "1 oz Kahlúa", "Splash Club Soda"], steps: ["Pour Kahlúa into a rocks glass over ice.", "Layer vodka on top.", "Top with a splash of club soda.", "Drink through a straw in one go from the bottom up."], tip: "The straw method is key — it blends the layers as you drink.", glass: "Rocks glass with straw" },
  { name: "Watermelon", color: "#ff6b81", strength: 2, ingredients: ["½ oz Vodka", "½ oz Watermelon Schnapps", "Splash Cranberry Juice"], steps: ["Shake vodka and watermelon schnapps with ice.", "Add a small splash of cranberry for color.", "Strain into a shot glass."], tip: "A splash of lime juice brightens the whole flavor.", glass: "Shot glass" },
  { name: "Flaming Dr Pepper", color: "#d35400", strength: 3, ingredients: ["¾ oz Amaretto", "¼ oz 151 Rum", "½ glass Beer"], steps: ["Pour amaretto into a shot glass.", "Float 151 rum on top and light it on fire.", "Drop the flaming shot into a half-glass of beer and chug."], tip: "Blow out the flame before drinking. Seriously.", glass: "Pint + shot glass" },
  { name: "Pickleback", color: "#7dce82", strength: 3, ingredients: ["1.5 oz Jameson Irish Whiskey", "1.5 oz Pickle Brine (chaser)"], steps: ["Pour Jameson into one shot glass.", "Pour cold pickle brine into a second shot glass.", "Shoot the whiskey, then immediately chase with the brine."], tip: "The brine neutralizes the whiskey burn instantly. Try it before you judge it.", glass: "Two shot glasses" },
  { name: "Liquid Cocaine", color: "#f8c291", strength: 4, ingredients: ["½ oz Jägermeister", "½ oz Rumple Minze", "½ oz Bacardi 151"], steps: ["Combine all three in a shaker with ice.", "Shake hard for 10 seconds.", "Strain into a chilled shot glass."], tip: "This one sneaks up on you fast. Two max.", glass: "Shot glass" },
  { name: "Washington Apple", color: "#b8f5a0", strength: 2, ingredients: ["1 oz Crown Royal", "½ oz Apple Schnapps", "Splash Cranberry Juice"], steps: ["Shake Crown Royal and apple schnapps with ice.", "Add a splash of cranberry juice.", "Strain into a shot glass."], tip: "Use DeKuyper Sour Apple Schnapps for the most authentic taste.", glass: "Shot glass" },
];

const PLAYER_COLORS = ["#fd79a8", "#fdcb6e", "#55efc4", "#74b9ff", "#a29bfe", "#ff7675", "#00b894", "#e17055"];
const TWO_PI = Math.PI * 2;
const SLICE = TWO_PI / shots.length;
const strengthLabel = (n) => ["", "Mild", "Easy", "Medium", "Strong", "💀 Deadly"][n];
const strengthColor = (n) => ["", "#7bc67e", "#ffe066", "#f4a261", "#ff6b6b", "#e63946"][n];

function drawWheel(canvas, rotation) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2;
  const R = Math.min(cx, cy) - 10;
  ctx.clearRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(cx, cy, R - 8, cx, cy, R + 12);
  glow.addColorStop(0, "rgba(255,255,255,0.08)"); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath(); ctx.arc(cx, cy, R + 12, 0, TWO_PI); ctx.fillStyle = glow; ctx.fill();
  shots.forEach((shot, i) => {
    const startAngle = rotation + i * SLICE, endAngle = startAngle + SLICE, midAngle = startAngle + SLICE / 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, startAngle, endAngle); ctx.closePath();
    ctx.fillStyle = shot.color; ctx.fill();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, "rgba(255,255,255,0.18)"); grad.addColorStop(1, "rgba(0,0,0,0.15)");
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, startAngle, endAngle); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(startAngle), cy + R * Math.sin(startAngle));
    ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.save();
    ctx.translate(cx + (R * 0.62) * Math.cos(midAngle), cy + (R * 0.62) * Math.sin(midAngle));
    ctx.rotate(midAngle + Math.PI / 2);
    ctx.fillStyle = "rgba(0,0,0,0.8)"; ctx.font = `bold ${R < 150 ? 7 : 9}px 'Outfit', sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const words = shot.name.split(" ");
    if (words.length > 1) { ctx.fillText(words[0], 0, -6); ctx.fillText(words.slice(1).join(" "), 0, 6); }
    else ctx.fillText(shot.name, 0, 0);
    ctx.restore();
  });
  const btnR = Math.max(38, R * 0.18);
  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, btnR);
  cg.addColorStop(0, "#ff6b9d"); cg.addColorStop(1, "#e84393");
  ctx.beginPath(); ctx.arc(cx, cy, btnR, 0, TWO_PI); ctx.fillStyle = cg; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, btnR, 0, TWO_PI);
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 2.5; ctx.stroke();
  // Outer glow
  const btnGlow = ctx.createRadialGradient(cx, cy, btnR - 4, cx, cy, btnR + 10);
  btnGlow.addColorStop(0, "rgba(255,107,157,0.4)"); btnGlow.addColorStop(1, "rgba(255,107,157,0)");
  ctx.beginPath(); ctx.arc(cx, cy, btnR + 10, 0, TWO_PI); ctx.fillStyle = btnGlow; ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.max(10, btnR * 0.28)}px 'Outfit', sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("SPIN", cx, cy);
}

export default function ShotWheel() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [view, setView] = useState("wheel");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [assigningTo, setAssigningTo] = useState(null);
  const [storageReady, setStorageReady] = useState(false);
  const rotationRef = useRef(0);

  // Load players from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shotbot-players");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setPlayers(parsed);
      }
    } catch (e) {
      // No saved data yet, start fresh
    }
    setStorageReady(true);
  }, []);

  // Save players to localStorage whenever they change
  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem("shotbot-players", JSON.stringify(players));
    } catch (e) {
      console.error("Failed to save players", e);
    }
  }, [players, storageReady]);

  useEffect(() => {
    if (view !== "wheel") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const size = Math.min(window.innerWidth - 48, 400);
      canvas.width = size; canvas.height = size;
      drawWheel(canvas, rotationRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [view]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true); setShowResult(false); setResult(null); setAssigningTo(null);
    const extraSpins = (5 + Math.random() * 5) * TWO_PI;
    const totalRotation = extraSpins + Math.random() * TWO_PI;
    const duration = 3000 + Math.random() * 1500;
    const startTime = performance.now(), startRot = rotationRef.current;
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      rotationRef.current = startRot + totalRotation * easeOut(progress);
      drawWheel(canvasRef.current, rotationRef.current);
      if (progress < 1) { animRef.current = requestAnimationFrame(animate); }
      else {
        const normalized = (((-rotationRef.current - Math.PI / 2) % TWO_PI) + TWO_PI) % TWO_PI;
        const index = Math.floor(normalized / SLICE) % shots.length;
        setResult(shots[index]); setActiveTab("ingredients"); setSpinning(false);
        setTimeout(() => setShowResult(true), 100);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  const addPlayer = () => {
    const name = newPlayerName.trim();
    if (!name) return;
    const id = Date.now();
    setPlayers(p => [...p, { id, name, color: PLAYER_COLORS[p.length % PLAYER_COLORS.length], shots: [], total: 0 }]);
    setNewPlayerName("");
  };

  const removePlayer = (id) => {
    setPlayers(p => p.filter(pl => pl.id !== id));
    setCurrentPlayerIdx(0);
  };

  const assignShotToPlayer = (playerId) => {
    if (!result) return;
    setPlayers(p => p.map(pl => pl.id === playerId
      ? { ...pl, shots: [...pl.shots, { shot: result.name, color: result.color, strength: result.strength, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }], total: pl.total + result.strength }
      : pl
    ));
    setAssigningTo(playerId);
    setTimeout(() => setAssigningTo(null), 1500);
    // Auto-advance to next player
    if (players.length > 1) setCurrentPlayerIdx(i => (i + 1) % players.length);
  };

  const currentPlayer = players[currentPlayerIdx] || null;

  const Tab = ({ id, label }) => (
    <button onClick={() => setActiveTab(id)} style={{
      flex: 1, padding: "9px 4px", background: "transparent", border: "none",
      borderBottom: `2px solid ${activeTab === id ? result?.color : "transparent"}`,
      color: activeTab === id ? result?.color : "rgba(255,255,255,0.35)",
      fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s ease",
    }}>{label}</button>
  );

  const NavBtn = ({ id, label, icon }) => (
    <button onClick={() => setView(id)} style={{
      flex: 1, padding: "10px 8px", border: "none",
      background: view === id ? "rgba(255,255,255,0.1)" : "transparent",
      color: view === id ? "#fff" : "rgba(255,255,255,0.35)",
      fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
      cursor: "pointer", fontFamily: "'Outfit', sans-serif",
      borderBottom: `2px solid ${view === id ? "#fd79a8" : "transparent"}`,
      transition: "all 0.2s ease",
    }}>{icon} {label}</button>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", padding: "0 0 48px",
      fontFamily: "'Outfit', sans-serif", boxSizing: "border-box",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ width: "100%", maxWidth: "420px", padding: "24px 16px 0" }}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2px" }}>Spin to Drink</div>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>Shotbot</div>
        </div>
        {/* Nav tabs */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
          <NavBtn id="wheel" label="Wheel" icon="🎡" />
          <NavBtn id="players" label={`Players${players.length ? ` (${players.length})` : ""}`} icon="👥" />
          {players.length > 0 && <NavBtn id="scores" label="Scores" icon="🏆" />}
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "420px", padding: "0 16px" }}>

        {/* ── WHEEL VIEW ── */}
        {view === "wheel" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Current player banner */}
            {currentPlayer && (
              <div style={{
                width: "100%", marginBottom: "14px", padding: "10px 16px",
                background: currentPlayer.color + "22", border: `1px solid ${currentPlayer.color}44`,
                borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px",
              }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: currentPlayer.color, flexShrink: 0 }} />
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Up next:</div>
                <div style={{ color: currentPlayer.color, fontWeight: 700, fontSize: "14px" }}>{currentPlayer.name}</div>
                <div style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                  {currentPlayer.shots.length} shot{currentPlayer.shots.length !== 1 ? "s" : ""}
                </div>
              </div>
            )}

            {/* Wheel */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{
                position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                zIndex: 10, width: 0, height: 0,
                borderLeft: "12px solid transparent", borderRight: "12px solid transparent",
                borderTop: "24px solid #fff", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
              }} />
              <canvas ref={canvasRef} style={{
                display: "block", borderRadius: "50%",
                boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }} onClick={(e) => {
                const canvas = canvasRef.current;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left - canvas.width / 2;
                const y = e.clientY - rect.top - canvas.height / 2;
                const dist = Math.sqrt(x * x + y * y);
                const R = Math.min(canvas.width, canvas.height) / 2 - 10;
                const btnR = Math.max(38, R * 0.18);
                if (dist <= btnR) spin();
              }} />
            </div>

            <div style={{ marginTop: "10px", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
              {spinning ? "🌀 Spinning..." : "Tap the center to spin"}
            </div>

            {/* Result card */}
            <div style={{
              marginTop: "18px", width: "100%",
              background: showResult && result ? result.color + "18" : "rgba(255,255,255,0.04)",
              border: `1px solid ${showResult && result ? result.color + "44" : "rgba(255,255,255,0.07)"}`,
              borderRadius: "24px", overflow: "hidden", transition: "all 0.4s ease",
              transform: showResult ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
              opacity: showResult ? 1 : 0.35, minHeight: "80px",
            }}>
              {showResult && result ? (
                <div>
                  <div style={{ padding: "18px 20px 12px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>You're drinking...</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ fontSize: "22px", fontWeight: 900, color: result.color }}>{result.name}</div>
                      <span style={{ background: strengthColor(result.strength) + "25", color: strengthColor(result.strength), border: `1px solid ${strengthColor(result.strength)}55`, borderRadius: "20px", padding: "3px 10px", fontSize: "10px", fontWeight: 700, flexShrink: 0 }}>
                        {strengthLabel(result.strength)}
                      </span>
                    </div>
                  </div>

                  {/* Assign to player */}
                  {players.length > 0 && (
                    <div style={{ padding: "0 20px 14px" }}>
                      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "8px" }}>
                        Assign to player:
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {players.map(pl => (
                          <button key={pl.id} onClick={() => assignShotToPlayer(pl.id)} style={{
                            padding: "5px 12px", borderRadius: "20px", border: `1px solid ${pl.color}66`,
                            background: assigningTo === pl.id ? pl.color : pl.color + "22",
                            color: assigningTo === pl.id ? "#000" : pl.color,
                            fontSize: "12px", fontWeight: 700, cursor: "pointer",
                            fontFamily: "'Outfit', sans-serif", transition: "all 0.2s ease",
                          }}>
                            {assigningTo === pl.id ? "✓ Done!" : pl.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 20px" }}>
                    <Tab id="ingredients" label="Ingredients" />
                    <Tab id="recipe" label="How to Make" />
                    <Tab id="tip" label="Pro Tip" />
                  </div>
                  <div style={{ padding: "14px 20px 18px" }}>
                    {activeTab === "ingredients" && result.ingredients.map((ing, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.8)", fontSize: "13px", marginBottom: i < result.ingredients.length - 1 ? "8px" : 0 }}>
                        <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: result.color + "30", border: `1px solid ${result.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: result.color, flexShrink: 0 }}>{i + 1}</span>
                        {ing}
                      </div>
                    ))}
                    {activeTab === "recipe" && result.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: "10px", marginBottom: i < result.steps.length - 1 ? "11px" : 0 }}>
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: result.color, color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, flexShrink: 0, marginTop: "2px" }}>{i + 1}</div>
                        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", lineHeight: 1.6 }}>{step}</div>
                      </div>
                    ))}
                    {activeTab === "tip" && (
                      <div style={{ background: result.color + "15", border: `1px solid ${result.color}33`, borderRadius: "12px", padding: "12px 14px", display: "flex", gap: "10px" }}>
                        <span style={{ fontSize: "20px", flexShrink: 0 }}>💡</span>
                        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", lineHeight: 1.6 }}>{result.tip}</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80px", color: "rgba(255,255,255,0.18)", fontSize: "13px" }}>
                  Spin to reveal your shot...
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PLAYERS VIEW ── */}
        {view === "players" && (
          <div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "16px", textAlign: "center" }}>
              Add players before you start spinning!
            </div>

            {/* Add player input */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <input
                value={newPlayerName}
                onChange={e => setNewPlayerName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addPlayer()}
                placeholder="Player name..."
                maxLength={20}
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontSize: "14px", fontFamily: "'Outfit', sans-serif",
                  outline: "none",
                }}
              />
              <button onClick={addPlayer} style={{
                padding: "12px 18px", borderRadius: "12px", border: "none",
                background: "linear-gradient(135deg, #fd79a8, #e17055)", color: "#fff",
                fontSize: "18px", cursor: "pointer", fontFamily: "'Outfit', sans-serif",
              }}>+</button>
            </div>

            {/* Player list */}
            {players.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "rgba(255,255,255,0.15)", fontSize: "14px" }}>
                No players yet — add some above!
              </div>
            ) : (
              players.map((pl, idx) => (
                <div key={pl.id} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 16px", borderRadius: "14px", marginBottom: "8px",
                  background: currentPlayerIdx === idx ? pl.color + "20" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${currentPlayerIdx === idx ? pl.color + "55" : "rgba(255,255,255,0.07)"}`,
                  cursor: "pointer", transition: "all 0.2s ease",
                }} onClick={() => setCurrentPlayerIdx(idx)}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: pl.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{pl.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>
                      {pl.shots.length} shot{pl.shots.length !== 1 ? "s" : ""} · Strength total: {pl.total}
                    </div>
                  </div>
                  {currentPlayerIdx === idx && (
                    <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: pl.color, fontWeight: 700, textTransform: "uppercase" }}>Up next</span>
                  )}
                  <button onClick={e => { e.stopPropagation(); removePlayer(pl.id); }} style={{
                    background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.3)",
                    width: "26px", height: "26px", borderRadius: "50%", cursor: "pointer",
                    fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>✕</button>
                </div>
              ))
            )}

            {players.length > 0 && (
              <button onClick={() => setView("wheel")} style={{
                width: "100%", marginTop: "12px", padding: "14px", borderRadius: "14px", border: "none",
                background: "linear-gradient(135deg, #fd79a8, #e17055)", color: "#fff",
                fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "'Outfit', sans-serif",
              }}>
                🎡 Go to Wheel
              </button>
            )}
          </div>
        )}

        {/* ── SCORES VIEW ── */}
        {view === "scores" && (
          <div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "16px", textAlign: "center" }}>
              Leaderboard — sorted by shots taken
            </div>
            {[...players].sort((a, b) => b.shots.length - a.shots.length).map((pl, rank) => (
              <div key={pl.id} style={{
                marginBottom: "12px", borderRadius: "16px", overflow: "hidden",
                background: "rgba(255,255,255,0.05)", border: `1px solid ${pl.color}33`,
              }}>
                <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontSize: "20px", width: "32px", textAlign: "center", flexShrink: 0 }}>
                    {rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `#${rank + 1}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: pl.color, fontWeight: 800, fontSize: "15px" }}>{pl.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>
                      {pl.shots.length} shots · Strength total: {pl.total}
                    </div>
                  </div>
                  {/* Mini bar */}
                  <div style={{ width: "60px", textAlign: "right" }}>
                    <div style={{ fontSize: "20px", fontWeight: 900, color: pl.color }}>{pl.shots.length}</div>
                  </div>
                </div>

                {/* Shot history */}
                {pl.shots.length > 0 && (
                  <div style={{ padding: "0 16px 12px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {pl.shots.map((s, i) => (
                      <span key={i} style={{
                        background: s.color + "22", border: `1px solid ${s.color}44`,
                        color: s.color, borderRadius: "20px", padding: "2px 9px",
                        fontSize: "11px", fontWeight: 600,
                      }} title={s.time}>{s.shot}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button onClick={() => {
              const reset = players.map(pl => ({ ...pl, shots: [], total: 0 }));
              setPlayers(reset);
              try { localStorage.setItem("shotbot-players", JSON.stringify(reset)); } catch(e) {}
            }} style={{
              width: "100%", marginTop: "8px", padding: "12px", borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
              color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em",
            }}>
              🔄 Reset All Scores
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: "24px", fontSize: "11px", color: "rgba(255,255,255,0.1)", textAlign: "center" }}>
        🔞 Drink responsibly · 21+ only
        {storageReady && players.length > 0 && (
          <div style={{ marginTop: "4px", color: "rgba(255,255,255,0.15)" }}>💾 Progress auto-saved</div>
        )}
      </div>
    </div>
  );
}
