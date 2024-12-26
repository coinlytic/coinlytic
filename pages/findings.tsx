import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/findings.module.css"; // Assuming you have a findings.css file
import { FaTwitter, FaGithub } from "react-icons/fa";
import Link from "next/link"; // Import Link for navigation

const Findings = () => {
  const [entries, setEntries] = useState<any[]>([]); // State to store entries
  const [loading, setLoading] = useState(true); // Loading state
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref for the canvas

  // Fetch the entries from cache.json when the component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/cache.json");
        if (!response.ok) {
          throw new Error("Failed to fetch cache.json");
        }

        const data = await response.json();
        setEntries(data); // Store the fetched entries in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching entries:", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchEntries(); // Call the function to fetch entries
  }, []); // Empty array ensures this runs only once when the component mounts

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
    <div className={styles.findingsContainer}>
      {/* Canvas for mouse animation */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Navbar with Twitter and GitHub links */}
      <nav className={styles.navbar}>
        <a href="https://x.com/Coinlyticdotpro" target="_blank" rel="noopener noreferrer">
          <FaTwitter className={styles.icon} />
        </a>
        <a href="https://github.com/coinlytic/coinlytic" target="_blank" rel="noopener noreferrer">
          <FaGithub className={styles.icon} />
        </a>
      </nav>

      {/* Logo at the top for navigation to homepage */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <img src="/profile-pic.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {/* Main Findings Content */}
      <h1 className={styles.title}>My Findings</h1>

      <div className={styles.entriesList}>
        {loading ? (
          <p>Loading...</p>
        ) : entries.length > 0 ? (
          entries.map((entry, index) => (
            <div key={index} className={styles.entry}>
              <h2>{entry.tweet_text}</h2>
              <p>{entry.analysis}</p>
              <a
                href={entry.tweet_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tweetLink}
              >
                <FaTwitter className={styles.tweetIcon} /> View Tweet
              </a>
            </div>
          ))
        ) : (
          <p>No entries found.</p>
        )}
      </div>
    </div>
  );
};

export default Findings;
