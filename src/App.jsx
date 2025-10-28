import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [explosions, setExplosions] = useState([])
  const [screenShake, setScreenShake] = useState(false)
  const [flashBang, setFlashBang] = useState(false)
  const [megaExplosion, setMegaExplosion] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(1)

  useEffect(() => {
    const eventDate = new Date('November 6, 2025 18:30:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })

      // MORE FREQUENT EXPLOSIONS
      if (Math.random() > 0.85) {
        createExplosion()
      }

      // Random mega explosions
      if (Math.random() > 0.98) {
        triggerMegaExplosion()
      }

      // Random flashbangs
      if (Math.random() > 0.95) {
        triggerFlashBang()
      }

      // Random glitch intensity changes
      if (Math.random() > 0.9) {
        setGlitchIntensity(Math.random() * 5 + 1)
      }
    }, 1000)

    // MORE FREQUENT SCREEN SHAKE
    const shakeInterval = setInterval(() => {
      setScreenShake(true)
      setTimeout(() => setScreenShake(false), 300)
    }, 3000)

    // Continuous mini explosions
    const miniExplosionInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        createExplosion()
      }
    }, 500)

    return () => {
      clearInterval(timer)
      clearInterval(shakeInterval)
      clearInterval(miniExplosionInterval)
    }
  }, [])

  const createExplosion = () => {
    const emojis = ['💥', '🔥', '💀', '⚡', '💣', '🌟', '✨', '💫', '🦾', '🦿', '🏍️', '🤖']
    const newExplosion = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }
    setExplosions(prev => [...prev, newExplosion])
    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id))
    }, 800)
  }

  const triggerFlashBang = () => {
    setFlashBang(true)
    setTimeout(() => setFlashBang(false), 150)
  }

  const triggerMegaExplosion = () => {
    setMegaExplosion(true)
    // Create multiple explosions at once
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createExplosion(), i * 50)
    }
    setScreenShake(true)
    setTimeout(() => {
      setMegaExplosion(false)
      setScreenShake(false)
    }, 800)
  }

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const particlesConfig = {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          area: 600
        }
      },
      color: {
        value: ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
      },
      shape: {
        type: ['circle', 'triangle', 'star', 'polygon'],
      },
      opacity: {
        value: { min: 0.1, max: 0.9 },
        animation: {
          enable: true,
          speed: 3,
          sync: false
        }
      },
      size: {
        value: { min: 0.3, max: 8 },
        animation: {
          enable: true,
          speed: 8,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'out',
        attract: {
          enable: true,
          rotate: {
            x: 1200,
            y: 1200
          }
        }
      },
      rotate: {
        value: { min: 0, max: 360 },
        direction: 'random',
        animation: {
          enable: true,
          speed: 15,
          sync: false
        }
      },
      life: {
        duration: {
          value: 3
        }
      }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: ['grab', 'repulse', 'bubble']
        },
        onClick: {
          enable: true,
          mode: 'push'
        },
        resize: {
          enable: true
        }
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 1,
            color: '#ff0000'
          }
        },
        repulse: {
          distance: 150,
          duration: 0.2
        },
        bubble: {
          distance: 200,
          size: 15,
          duration: 2,
          opacity: 1
        },
        push: {
          quantity: 20
        }
      }
    }
  }

  return (
    <div className={`app ${screenShake ? 'shake' : ''} ${megaExplosion ? 'mega-explosion' : ''}`}>
      {flashBang && <div className="flashbang" />}

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />

      {/* EXPLOSIONS EVERYWHERE */}
      <AnimatePresence>
        {explosions.map(exp => (
          <motion.div
            key={exp.id}
            className="explosion"
            style={{ left: exp.x, top: exp.y }}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              scale: [0, 2, 4],
              opacity: [1, 0.8, 0],
              rotate: [0, 180, 360]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {exp.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* MORE Floating emojis - FASTER AND MORE */}
      <div className="emoji-background">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-emoji"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${2 + Math.random() * 3}em`
            }}
            animate={{
              y: ['-100vh', '100vh'],
              rotate: [0, 720],
              x: [0, Math.sin(i) * 200],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 3
            }}
          >
            {['🔥', '🤘', '💀', '⚡', '🎸', '🎵', '💥', '⚠️', '💣', '🌟', '✨', '💫', '🦾', '🦿', '🏍️', '🤖', '⚙️'][Math.floor(Math.random() * 17)]}
          </motion.div>
        ))}
      </div>

      <div className="content">
        {/* Title with EXTREME glitch */}
        <motion.div
          className="title-container"
          animate={{
            scale: [1, 1.15, 0.95, 1.1, 1],
            rotate: [-3, 3, -2, 2, 0],
            y: [0, -10, 5, -5, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.h1
            className="main-title glitch"
            data-text="SCARLET AURA"
            style={{ '--glitch-intensity': glitchIntensity }}
            animate={{
              textShadow: [
                '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
                '0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff',
                '0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 90px #00ffff',
                '0 0 20px #ffff00, 0 0 40px #ffff00, 0 0 60px #ffff00',
                '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000'
              ]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          >
            🔥🎸 SCARLET AURA 🎸🔥
          </motion.h1>
          <motion.h2
            className="subtitle"
            animate={{
              color: ['#ff0000', '#ff6600', '#ffff00', '#ff00ff', '#00ffff', '#ff0000'],
              scale: [1, 1.1, 0.9, 1.15, 1],
              rotate: [-5, 5, -3, 3, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >
            ⚡ 10 ANI CU ARIPI DE ROCK ⚡
          </motion.h2>
          <motion.h3
            className="brainrot-text"
            animate={{
              scale: [1, 1.3, 0.8, 1.2, 1],
              rotate: [-10, 10, -8, 8, 0],
              y: [0, -20, 10, -10, 0]
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity
            }}
          >
            🧠❌ NO BRAIN ONLY HEADBANG 🤘💀
          </motion.h3>
        </motion.div>

        {/* Band Images - SPINNING LIKE CRAZY */}
        <div className="images-container">
          {[
            'https://www.metal-archives.com/images/3/5/4/0/3540538884_logo.jpg?0005',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4V7A1Ht27Rsw_xJIWpa2RqCp9lrFfKaOWg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ToiHrGQB5pZgOHoseaKxs8KwscBUXSvPfg&s'
          ].map((src, i) => (
            <motion.div
              key={i}
              className="image-wrapper"
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.2, 0.9, 1.15, 1],
                y: [0, -30, 20, -20, 0]
              }}
              transition={{
                rotate: {
                  duration: 2 - i * 0.3,
                  repeat: Infinity,
                  ease: 'linear'
                },
                scale: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse'
                },
                y: {
                  duration: 1.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              whileHover={{
                scale: 2,
                rotate: i % 2 === 0 ? 720 : -720,
                transition: { duration: 0.5 }
              }}
              onClick={() => {
                createExplosion()
                triggerFlashBang()
              }}
            >
              <img src={src} alt={`Anton Rock Band ${i + 1}`} className="rock-image" />
            </motion.div>
          ))}
        </div>

        {/* Countdown - EXTREME ANIMATIONS */}
        <div className="countdown-container">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              className="countdown-box"
              animate={{
                scale: [1, 1.1, 0.95, 1.08, 1],
                rotate: [-5, 5, -3, 3, 0],
                y: [0, -15, 10, -10, 0],
                boxShadow: [
                  '0 0 20px #ff00ff, 0 0 40px #ff0000',
                  '0 0 40px #00ffff, 0 0 60px #ffff00',
                  '0 0 60px #ff0000, 0 0 80px #ff00ff',
                  '0 0 40px #ffff00, 0 0 60px #00ffff',
                  '0 0 20px #ff00ff, 0 0 40px #ff0000'
                ]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.1
              }}
              whileHover={{
                scale: 1.5,
                rotate: 0,
                transition: { duration: 0.2 }
              }}
              onClick={createExplosion}
            >
              <motion.div
                className="countdown-number"
                animate={{
                  color: ['#ffffff', '#ff0000', '#ff00ff', '#00ffff', '#ffff00', '#ffffff'],
                  scale: [1, 1.2, 0.9, 1.1, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                {String(value).padStart(2, '0')}
              </motion.div>
              <motion.div
                className="countdown-label"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              >
                {unit.toUpperCase()}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Venue Info - SHAKING HARD */}
        <motion.div
          className="venue-info"
          animate={{
            x: [-10, 10, -8, 8, 0],
            y: [0, -5, 5, -3, 0],
            rotate: [-2, 2, -1, 1, 0]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity
          }}
        >
          <motion.p
            className="venue-text"
            animate={{
              scale: [1, 1.1, 1],
              textShadow: [
                '0 0 10px #ff0000, 0 0 20px #ff0000',
                '0 0 20px #ffff00, 0 0 40px #ffff00',
                '0 0 10px #ff0000, 0 0 20px #ff0000'
              ]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity
            }}
          >
            📍 QUANTIC, BUCUREȘTI 📍
          </motion.p>
          <motion.p
            className="venue-text"
            animate={{
              scale: [1, 1.15, 1],
              textShadow: [
                '0 0 10px #ff0000, 0 0 20px #ff0000',
                '0 0 20px #ff00ff, 0 0 40px #ff00ff',
                '0 0 10px #ff0000, 0 0 20px #ff0000'
              ]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity
            }}
          >
            📅 NOVEMBER 6, 2025 @ 18:30 📅
          </motion.p>
        </motion.div>

        {/* Info Box - PULSING HARD */}
        <motion.div
          className="info-box"
          animate={{
            borderColor: ['#ff00ff', '#ff0000', '#00ffff', '#ffff00', '#ff00ff'],
            scale: [1, 1.03, 0.98, 1.02, 1],
            boxShadow: [
              '0 0 30px #ff00ff',
              '0 0 50px #ff0000',
              '0 0 70px #00ffff',
              '0 0 50px #ffff00',
              '0 0 30px #ff00ff'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          {[
            '🎫 GET YOUR TICKETS NOW OR CRY LATER 🎫',
            '💀 SPECIAL GUESTS 💀',
            '🔊 UNFORGETTABLE ATMOSPHERE 🔊',
            '🎵 CLOSING TOUR CONCERT 🎵',
            '⚡ PURE BRAINROT ENERGY ⚡'
          ].map((text, i) => (
            <motion.p
              key={i}
              animate={{
                scale: [1, 1.08, 1],
                x: i % 2 === 0 ? [-5, 5, -5] : [5, -5, 5]
              }}
              transition={{
                duration: 0.5 + i * 0.1,
                repeat: Infinity,
                delay: i * 0.1
              }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Button - GOING CRAZY */}
        <motion.a
          href="https://www.iabilet.ro/bilete-scarlet-aura-10-ani-cu-aripi-de-rock-111891"
          target="_blank"
          rel="noopener noreferrer"
          className="buy-button"
          whileHover={{
            scale: 1.4,
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.4 }
          }}
          whileTap={{ scale: 0.8 }}
          animate={{
            scale: [1, 1.1, 0.95, 1.08, 1],
            rotate: [-3, 3, -2, 2, 0],
            boxShadow: [
              '0 0 20px #ff00ff, 0 0 40px #ff0000',
              '0 0 40px #00ffff, 0 0 60px #ffff00',
              '0 0 60px #ff0000, 0 0 80px #ff00ff',
              '0 0 80px #ffff00, 0 0 100px #00ffff',
              '0 0 20px #ff00ff, 0 0 40px #ff0000'
            ]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
          onClick={(e) => {
            triggerMegaExplosion()
          }}
        >
          🎟️ BUY TICKETS OR REGRET FOREVER 🎟️
        </motion.a>

        <motion.div
          className="final-text"
          animate={{
            rotate: [-5, 5, -3, 3, 0],
            scale: [1, 1.2, 0.9, 1.15, 1],
            y: [0, -20, 10, -10, 0]
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity
          }}
        >
          🧠❌ ZERO THOUGHTS HEAD EMPTY ONLY ROCK 🎸
        </motion.div>
      </div>
    </div>
  )
}

export default App
