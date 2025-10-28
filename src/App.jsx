import { useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.3])

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
    }, 1000)

    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const createExplosion = () => {
    const emojis = ['💥', '🔥', '⚡', '💀']
    const newExplosion = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }
    setExplosions(prev => [...prev, newExplosion])
    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id))
    }, 1000)
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
        value: 80,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ['#ff0000', '#ff6600', '#ffff00', '#ff00ff', '#00ffff']
      },
      shape: {
        type: ['circle', 'triangle', 'star'],
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 3,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'out'
      }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        onClick: {
          enable: true,
          mode: 'push'
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          quantity: 4
        }
      }
    }
  }

  // Parallax offset based on mouse position
  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />

      {/* EXPLOSIONS - LESS FREQUENT */}
      <AnimatePresence>
        {explosions.map(exp => (
          <motion.div
            key={exp.id}
            className="explosion"
            style={{ left: exp.x, top: exp.y }}
            initial={{ scale: 0, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
            animate={{
              scale: [0, 3, 5],
              opacity: [1, 0.6, 0],
              rotate: [0, 180, 360],
              filter: ['blur(0px)', 'blur(5px)', 'blur(10px)']
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {exp.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3D Wolves and Metal Arms */}
      <div className="elements-3d-background">
        {/* Wolves */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`wolf-${i}`}
            className="wolf-3d"
            style={{
              left: `${(i * 20 + 5) % 100}%`,
              top: `${20 + (i * 15) % 60}%`,
              transform: `translate(${parallaxX * (i % 3 + 1)}px, ${parallaxY * (i % 3 + 1)}px)`
            }}
            animate={{
              rotateY: [0, 360],
              y: [0, -30, 0]
            }}
            transition={{
              rotateY: {
                duration: 20 + i * 3,
                repeat: Infinity,
                ease: 'linear'
              },
              y: {
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
          >
            <div className="wolf-body">
              <div className="wolf-head">
                <div className="wolf-ear wolf-ear-left"></div>
                <div className="wolf-ear wolf-ear-right"></div>
                <div className="wolf-snout"></div>
                <div className="wolf-eye wolf-eye-left"></div>
                <div className="wolf-eye wolf-eye-right"></div>
              </div>
              <div className="wolf-legs">
                <div className="wolf-leg"></div>
                <div className="wolf-leg"></div>
              </div>
              <div className="wolf-tail"></div>
            </div>
          </motion.div>
        ))}

        {/* Metal Arms */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`arm-${i}`}
            className="metal-arm-3d"
            style={{
              left: `${(i * 15 + 10) % 100}%`,
              top: `${10 + (i * 12) % 70}%`,
              transform: `translate(${parallaxX * (i % 4 + 1)}px, ${parallaxY * (i % 4 + 1)}px)`
            }}
            animate={{
              rotateZ: i % 2 === 0 ? [0, 360] : [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotateZ: {
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: 'linear'
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
          >
            <div className="metal-arm-upper">
              <div className="metal-joint"></div>
              <div className="metal-segment segment-1"></div>
            </div>
            <div className="metal-arm-lower">
              <div className="metal-joint"></div>
              <div className="metal-segment segment-2"></div>
            </div>
            <div className="metal-hand">
              <div className="metal-finger"></div>
              <div className="metal-finger"></div>
              <div className="metal-finger"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="content">
        {/* Animated gradient background blob */}
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
        <div className="gradient-blob blob-3" />

        {/* Title with flames */}
        <motion.div
          className="title-container"
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <motion.h1
            className="main-title glitch"
            data-text="ANTON"
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            🔥 ANTON 🔥
          </motion.h1>
          <motion.h2
            className="subtitle glow-text"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            ⚡ 10 ANI CU ARIPI DE ROCK ⚡
          </motion.h2>
        </motion.div>

        {/* BOGDAN MAI SUNT text with flames */}
        <motion.div
          className="bogdan-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <div className="flame-text-wrapper">
            <div className="flame flame-left" />
            <motion.h2
              className="bogdan-text"
              animate={{
                textShadow: [
                  '0 0 20px #ff6600, 0 0 40px #ff0000',
                  '0 0 40px #ff0000, 0 0 60px #ff6600',
                  '0 0 20px #ff6600, 0 0 40px #ff0000'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              BOGDAN MAI SUNT
            </motion.h2>
            <div className="flame flame-right" />
          </div>
        </motion.div>

        {/* Band Images with 3D card effect */}
        <motion.div
          className="images-container"
          style={{ y: y2 }}
        >
          {[
            'https://www.metal-archives.com/images/3/5/4/0/3540538884_logo.jpg?0005',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4V7A1Ht27Rsw_xJIWpa2RqCp9lrFfKaOWg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ToiHrGQB5pZgOHoseaKxs8KwscBUXSvPfg&s'
          ].map((src, i) => (
            <motion.div
              key={i}
              className="image-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, type: 'spring' }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                rotateX: 10,
                z: 50,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={createExplosion}
            >
              <div className="card-glow" />
              <img src={src} alt={`Band ${i + 1}`} className="rock-image" />
            </motion.div>
          ))}
        </motion.div>

        {/* Countdown with glassmorphism and flames */}
        <div className="countdown-wrapper">
          <div className="countdown-container">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                className="countdown-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.1,
                  y: -10,
                  transition: { type: 'spring', stiffness: 400 }
                }}
              >
                <div className="card-shine" />
                <div className="flame flame-card-left" />
                <div className="flame flame-card-right" />
                <motion.div
                  className="countdown-number"
                  animate={{
                    textShadow: [
                      '0 0 20px #ff0000',
                      '0 0 40px #ff00ff',
                      '0 0 20px #00ffff',
                      '0 0 20px #ff0000'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {String(value).padStart(2, '0')}
                </motion.div>
                <div className="countdown-label">{unit.toUpperCase()}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PANA LA CONCERT text with flames */}
        <motion.div
          className="pana-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <div className="flame-text-wrapper">
            <div className="flame flame-left" />
            <motion.h2
              className="pana-text"
              animate={{
                textShadow: [
                  '0 0 20px #ff6600, 0 0 40px #ff0000',
                  '0 0 40px #ff0000, 0 0 60px #ff6600',
                  '0 0 20px #ff6600, 0 0 40px #ff0000'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              PANA LA CONCERT !!!!
            </motion.h2>
            <div className="flame flame-right" />
          </div>
        </motion.div>

        {/* Venue Info with smooth animations */}
        <motion.div
          className="venue-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            className="venue-text"
            whileHover={{ scale: 1.05 }}
          >
            📍 QUANTIC, BUCUREȘTI
          </motion.p>
          <motion.p
            className="venue-text"
            whileHover={{ scale: 1.05 }}
          >
            📅 NOVEMBER 6, 2025 @ 18:30
          </motion.p>
        </motion.div>

        {/* Info Box with blur backdrop */}
        <motion.div
          className="info-box glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          {[
            '🎫 GET YOUR TICKETS NOW OR CRY LATER',
            '💀 SPECIAL GUESTS',
            '🔊 UNFORGETTABLE ATMOSPHERE',
            '🎵 CLOSING TOUR CONCERT',
            '⚡ PURE BRAINROT ENERGY'
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ x: 10, transition: { duration: 0.2 } }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Modern button with magnetic effect */}
        <motion.a
          href="https://www.iabilet.ro/bilete-scarlet-aura-10-ani-cu-aripi-de-rock-111891"
          target="_blank"
          rel="noopener noreferrer"
          className="buy-button modern-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: 'spring' }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 20px 60px rgba(255, 0, 255, 0.6)',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={createExplosion}
        >
          <span className="button-gradient" />
          <span className="button-text">🎟️ BUY TICKETS NOW 🎟️</span>
        </motion.a>

        <motion.div
          className="final-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          🧠❌ ZERO THOUGHTS HEAD EMPTY ONLY ROCK 🎸
        </motion.div>
      </div>
    </div>
  )
}

export default App
