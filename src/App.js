import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [loveMessages, setLoveMessages] = useState([]);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  const emojis = ['🐬', '🌊', '🧚🏼', '🪼', '🦋', '🩵', '💙', '🌸', '✨', '🐋', '🐠', '🐡', '🫧'];
  
  const loveMessagesList = [
    'I love you more than all the stars in the sky ✨',
    'More than all the waves in the ocean 🌊',
    'More than all the fairies in the world 🧚🏼',
    'You are my favorite thought 💭',
    'My heart beats for you 💙',
    'Every emoji you send is a piece of your soul 💌',
    'I see you, elli. I really see you. 👁️💙',
    'You are magic ✨'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 20 + 15, speedY: Math.random() * 1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5, rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2, opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particleArray.forEach(p => {
        p.y -= p.speedY; p.x += p.speedX; p.rotation += p.rotationSpeed;
        if (p.y < -50) { p.y = canvas.height + 50; p.x = Math.random() * canvas.width; }
        ctx.save(); ctx.globalAlpha = p.opacity; ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180); ctx.font = `${p.size}px Arial`;
        ctx.textAlign = 'center'; ctx.fillText(p.emoji, 0, 0); ctx.restore();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animationFrameId); };
  }, []);

  const handleCardClick = () => { setClickCount(prev => prev + 1); createExplosion(window.innerWidth / 2, window.innerHeight / 2, '✨'); };
  const handleCreatureClick = (e, emoji) => { setClickCount(prev => prev + 1); createExplosion(e.clientX, e.clientY, emoji); };
  
  const createExplosion = (x, y, emoji) => {
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      newParticles.push({ id: Date.now() + i, x: x + Math.cos(angle) * distance, y: y + Math.sin(angle) * distance, emoji, size: Math.random() * 30 + 20 });
    }
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id))), 4000);
  };

  const openSurprise = () => {
    setClickCount(prev => prev + 1); setSurpriseOpen(true);
    for (let i = 0; i < 50; i++) setTimeout(() => createExplosion(Math.random() * window.innerWidth, Math.random() * window.innerHeight, '💙'), i * 30);
  };

  const clickHeart = (e) => {
    setClickCount(prev => prev + 1); createExplosion(e.clientX, e.clientY, '💙');
    const newMessage = loveMessagesList[loveMessages.length % loveMessagesList.length];
    setLoveMessages(prev => [...prev, { id: Date.now(), text: newMessage }]);
    if ((loveMessages.length + 1) % 3 === 0) for (let i = 0; i < 30; i++) setTimeout(() => createExplosion(Math.random() * window.innerWidth, Math.random() * window.innerHeight, '✨'), i * 30);
  };

  const confettiRain = () => { setClickCount(prev => prev + 1); for (let i = 0; i < 40; i++) setTimeout(() => createExplosion(Math.random() * window.innerWidth, -50, Math.random() > 0.5 ? '💙' : '✨'), i * 50); };
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const showStats = () => alert(`You've clicked ${clickCount} times! Amazing! 💙`);

  const cards = [
    { icon: '🌸', title: 'The Flower Person', message: 'You buy flowers for neighbors on their birthdays. That\'s the kind of person you are - spreading love everywhere 🌸' },
    { icon: '🍛', title: 'Samosa Chai Queen', message: 'Samosa chaat + Chai = Your happiness formula. You find joy in the simplest, most beautiful things 🍵' },
    { icon: '🐕', title: 'Leo\'s Mom', message: 'Leo is just as much your baby. The way you care for him shows your incredibly loving heart 💙' },
    { icon: '🎵', title: 'Music Sender', message: 'Every song you share is a piece of your soul. I listen to them always thinking of you 🎶' },
    { icon: '🌙', title: 'Midnight Adventurer', message: 'Late night clubs, viewpoints, adventures with friends. You live for those magical moments ✨' },
    { icon: '💙', title: 'Ocean Soul', message: '🐬🌊🪼🐋 - Your emoji language. The ocean lives in your soul, and I\'m forever captivated 💙' }
  ];

  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas" />
      <div className="progress-bar-container"><div className="progress-bar" style={{ width: `${Math.min((clickCount / 50) * 100, 100)}%` }}></div></div>
      
      <div className="container">
        <section className="hero" id="hero">
          <h1 className="hero-title" onClick={(e) => { createExplosion(e.clientX, e.clientY, '✨'); setClickCount(prev => prev + 1); }}>✨ For elli ✨</h1>
          <p className="hero-subtitle">the girl who collects ocean dreams 🌊🐬🧚🏼</p>
          <p className="hero-subtitle" style={{ fontSize: '0.9rem', marginTop: '10px' }}>⬇️ Click everything! It's all interactive! ⬇️</p>
          <div className="scroll-hint" onClick={() => scrollToSection('cards')}>⬇️</div>
        </section>

        <section className="cards-section" id="cards">
          <h2 className="section-title">💙 Tap Each Card 💙</h2>
          <div className="cards-grid">
            {cards.map((card, index) => (
              <div className="card" key={index} onClick={handleCardClick}>
                <div className="card-inner">
                  <div className="card-front">
                    <div className="card-icon">{card.icon}</div>
                    <div className="card-title">{card.title}</div>
                    <div className="card-hint">Tap to reveal ✨</div>
                  </div>
                  <div className="card-back">
                    <div className="card-title">{card.title}</div>
                    <div className="card-message">{card.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ocean-section">
          <h2 className="section-title">🌊 Click The Creatures 🌊</h2>
          <div className="creatures-container">
            {['🐬', '🐋', '🪼', '🐠', '🧜‍♀️'].map((creature, index) => (
              <div key={index} className="creature" onClick={(e) => handleCreatureClick(e, creature)}>{creature}</div>
            ))}
          </div>
          <p className="ocean-hint">(click them! they're alive!)</p>
        </section>

        <section className="surprise-section">
          <h2 className="section-title">🎁 Open The Mystery 🎁</h2>
          {!surpriseOpen && <div className="mystery-box" onClick={openSurprise}>🎁</div>}
          <div className={`surprise-content ${surpriseOpen ? 'show' : ''}`}>
            <h3>💌 For You, elli 💌</h3>
            <p>I know things have been hard. I know I haven't been the partner you deserve.</p>
            <p className="highlight"><strong>But I want you to know - I see you. I really see you.</strong></p>
            <p>The way you care for everyone. The way you send me 🐬🌊🧚🏼🪼💙 when you're happy.</p>
            <p className="highlight"><strong>You are magic. Don't ever forget that.</strong></p>
            <p>Take all the time you need. I'll be here, learning how to love you the way you deserve.</p>
            <p className="signature">- someone who notices everything about you 💙</p>
          </div>
        </section>

        <section className="heart-section">
          <h2 className="section-title">💓 Click The Heart 💓</h2>
          <div className="big-heart" onClick={clickHeart}>❤️</div>
          <div className="love-messages">
            {loveMessages.map((msg, index) => (
              <div key={msg.id} className={`love-message ${index >= loveMessages.length - 1 ? 'show' : ''}`}>{msg.text}</div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <p className="footer-text">Made with 💙 and endless ✨</p>
          <div className="footer-emojis" onClick={confettiRain}>🩵💙🌸🦋🐬🧚🏼🪼</div>
          <p className="footer-note">because you deserve to be reminded how special you are</p>
        </footer>
      </div>

      <div className="click-counter" onClick={showStats}>🔢 Clicks: {clickCount}</div>
      {particles.map(particle => (
        <div key={particle.id} className="explosion-particle" style={{ left: particle.x, top: particle.y, fontSize: particle.size }}>{particle.emoji}</div>
      ))}
    </div>
  );
}

export default App;
