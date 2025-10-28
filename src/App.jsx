import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
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

      // Random explosions every 3 seconds
      if (Math.random() > 0.95) {
        createExplosion()
      }
    }, 1000)

    // Screen shake every 5 seconds
    const shakeInterval = setInterval(() => {
      setScreenShake(true)
      setTimeout(() => setScreenShake(false), 200)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(shakeInterval)
    }
  }, [])

  const createExplosion = () => {
    const newExplosion = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }
    setExplosions(prev => [...prev, newExplosion])
    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id))
    }, 1000)
  }

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const particlesConfig = {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#ff0000', '#ff6600', '#ffff00', '#ff00ff', '#00ffff']
      },
      shape: {
        type: ['circle', 'triangle', 'star'],
      },
      opacity: {
        value: 0.8,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 0.1,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 3,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      },
      rotate: {
        value: 0,
        random: true,
        direction: 'clockwise',
        animation: {
          enable: true,
          speed: 5,
          sync: false
        }
      }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        onClick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          quantity: 10
        }
      }
    }
  }

  return (
    <div className={`app ${screenShake ? 'shake' : ''}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />

      {/* Explosions */}
      {explosions.map(exp => (
        <motion.div
          key={exp.id}
          className="explosion"
          style={{ left: exp.x, top: exp.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          💥
        </motion.div>
      ))}

      {/* Floating emojis */}
      <div className="emoji-background">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-emoji"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
            animate={{
              y: ['-100vh', '100vh'],
              rotate: [0, 360],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5
            }}
          >
            {['🔥', '🤘', '💀', '⚡', '🎸', '🎵', '💥', '⚠️'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      <div className="content">
        {/* Title */}
        <motion.div
          className="title-container"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-2, 2, -2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <h1 className="main-title glitch" data-text="SCARLET AURA">
            🔥🎸 SCARLET AURA 🎸🔥
          </h1>
          <motion.h2
            className="subtitle"
            animate={{
              color: ['#ff0000', '#ff00ff', '#00ffff', '#ffff00', '#ff0000']
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            ⚡ 10 ANI CU ARIPI DE ROCK ⚡
          </motion.h2>
          <motion.h3
            className="brainrot-text"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity
            }}
          >
            🧠❌ NO BRAIN ONLY HEADBANG 🤘💀
          </motion.h3>
        </motion.div>

        {/* Band Images */}
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
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: 'linear'
                },
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }}
              whileHover={{ scale: 1.5 }}
              onClick={createExplosion}
            >
              <img src={src} alt={`Anton Rock Band ${i + 1}`} className="rock-image" />
            </motion.div>
          ))}
        </div>

        {/* Countdown */}
        <div className="countdown-container">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              className="countdown-box"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [-3, 3, -3],
                boxShadow: [
                  '0 0 20px #ff00ff',
                  '0 0 40px #00ffff',
                  '0 0 20px #ff00ff'
                ]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
              whileHover={{ scale: 1.2, rotate: 0 }}
            >
              <motion.div
                className="countdown-number"
                animate={{
                  color: ['#ffffff', '#ff00ff', '#00ffff', '#ffff00', '#ffffff']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                {String(value).padStart(2, '0')}
              </motion.div>
              <div className="countdown-label">{unit.toUpperCase()}</div>
            </motion.div>
          ))}
        </div>

        {/* Venue Info */}
        <motion.div
          className="venue-info"
          animate={{
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity
          }}
        >
          <p className="venue-text">📍 QUANTIC, BUCUREȘTI 📍</p>
          <p className="venue-text">📅 NOVEMBER 6, 2025 @ 18:30 📅</p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="info-box"
          animate={{
            borderColor: ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#ff00ff']
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        >
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🎫 GET YOUR TICKETS NOW OR CRY LATER 🎫
          </motion.p>
          <p>💀 SPECIAL GUESTS 💀</p>
          <p>🔊 UNFORGETTABLE ATMOSPHERE 🔊</p>
          <p>🎵 CLOSING TOUR CONCERT 🎵</p>
          <p>⚡ PURE BRAINROT ENERGY ⚡</p>
        </motion.div>

        {/* Button */}
        <motion.a
          href="https://www.iabilet.ro/bilete-scarlet-aura-10-ani-cu-aripi-de-rock-111891"
          target="_blank"
          rel="noopener noreferrer"
          className="buy-button"
          whileHover={{
            scale: 1.2,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 0 20px #ff00ff',
              '0 0 40px #00ffff',
              '0 0 60px #ffff00',
              '0 0 40px #00ffff',
              '0 0 20px #ff00ff'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          🎟️ BUY TICKETS OR REGRET FOREVER 🎟️
        </motion.a>

        <motion.div
          className="final-text"
          animate={{
            rotate: [-2, 2, -2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 0.5,
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
