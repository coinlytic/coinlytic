import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure the path matches your structure
import { collection, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";

interface Entry {
  id: string;
  tweet_text: string;
  analysis: string;
  tweet_link: string;
}

const FirestoreComponent: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!db) {
        console.error("Firestore is not initialized.");
        return;
      }

      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "results")); // Replace "results" with your collection name
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Entry[]; // Typecast to Entry[]
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Firestore Entries</h1>
      {entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <h2>{entry.tweet_text}</h2>
              <p>{entry.analysis}</p>
              <a href={entry.tweet_link} target="_blank" rel="noopener noreferrer">
                View Tweet
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
};

export default FirestoreComponent;
