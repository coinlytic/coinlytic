import React, { useEffect, useRef } from "react";
import styles from "../styles/home.module.css"; // Import styles for the homepage
import { FaTwitter, FaGithub } from "react-icons/fa"; // Import Twitter and GitHub icons
import Link from "next/link"; // Import Link for navigation

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref for the canvas

  // Mouse animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: { x: number; y: number; radius: number; dx: number; dy: number }[] = [];
    const colors = ["#ff6b6b", "#5f6bff", "#ffd166", "#06d6a0"];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createParticle = (x: number, y: number) => {
      const radius = Math.random() * 5 + 2;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      particles.push({ x, y, radius, dx, dy });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        ctx.closePath();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.dx *= -1;
        }

        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.dy *= -1;
        }
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      createParticle(event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Canvas for mouse animation */}
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />

      {/* Navbar with Twitter and GitHub */}
      <nav className={styles.navbar}>
        <a href="https://x.com/Coinlyticdotpro" target="_blank" rel="noopener noreferrer">
          <FaTwitter className={styles.icon} />
        </a>
        <a href="https://github.com/coinlytic/coinlytic" target="_blank" rel="noopener noreferrer">
          <FaGithub className={styles.icon} />
        </a>
      </nav>

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        {/* Profile Picture */}
        <img 
          src="/profile-pic.png" 
          alt="Profile Picture" 
          className={styles.profilePicture} 
        />
        
        {/* Coinlytic Text */}
        <h1 className={styles.coinlytic}>Coinlytic</h1>

        {/* Findings Button: Link to /findings */}
        <Link href="/findings">
          <button className={styles.findingsButton}>Findings</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
