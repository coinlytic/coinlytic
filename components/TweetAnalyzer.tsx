import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/TweetAnalyzer.module.css'; // Import the CSS module

const BlogSection = () => {
  const [entries, setEntries] = useState<any[]>([]);
  
  // Fetch the entries from the backend
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/results');
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching blog entries:", error);
      }
    };
    
    fetchEntries();
  }, []);

  return (
    <div className={styles.blogSection}>
      <h1 className={styles.title}>Latest Entries</h1>
      <div className={styles.entriesList}>
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div key={index} className={styles.entry}>
              <h2 className={styles.entryTitle}>{entry.tweet_text}</h2>
              <p className={styles.entryAnalysis}>Analysis: {entry.analysis}</p>
              <a href={entry.tweet_link} target="_blank" rel="noopener noreferrer" className={styles.entryLink}>
                View Tweet
              </a>
            </div>
          ))
        ) : (
          <p>No entries yet. Add some tweets to analyze.</p>
        )}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.profileContainer}>
        <img
          src="/path/to/your/profile-image.png" // Replace with the path to your profile image
          alt="Coinlytic Profile"
          className={styles.profileImage}
        />
        <h1 className={styles.mainTitle}>Coinlytic</h1>
      </div>
      <div className={styles.socialLinks}>
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          Twitter
        </a>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          GitHub
        </a>
      </div>
    </header>
  );
};

export default BlogSection;
