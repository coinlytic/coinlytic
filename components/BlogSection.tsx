import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/TweetAnalyzer.module.css'; // Importing the styles module

const BlogSection = () => {
  const [entries, setEntries] = useState<any[]>([]); // State to store the entries fetched from the backend

  // Fetch the entries from the backend API when the component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/results'); // Assuming your Flask backend is running here
        setEntries(response.data); // Store the response data in the entries state
      } catch (error) {
        console.error('Error fetching blog entries:', error);
      }
    };

    fetchEntries(); // Call the function to fetch the entries when the component is mounted
  }, []); // Empty dependency array to only fetch once when the component mounts

  return (
    <div className={styles.blogSection}>
      <h1 className={styles.title}>Latest Entries</h1>
      <div className={styles.entriesList}>
        {/* Display the list of entries */}
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div key={index} className={styles.entry}>
              <h2 className={styles.entryTitle}>{entry.tweet_text}</h2> {/* Display the tweet text */}
              <p className={styles.entryAnalysis}>Analysis: {entry.analysis}</p> {/* Display the analysis */}
              <a
                href={entry.tweet_link} // Link to the tweet
                target="_blank"
                rel="noopener noreferrer"
                className={styles.entryLink}
              >
                View Tweet
              </a>
            </div>
          ))
        ) : (
          <p>No entries yet. Add some tweets to analyze.</p> // This is where the error happened
        )}
      </div>
    </div>
  );
};

export default BlogSection;
