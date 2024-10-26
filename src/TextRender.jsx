// This would be the area where the text will be rendered

import { useEffect, useState } from 'react';

// Ninja quotes API information
const apiURL = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
const ninjaKey = import.meta.env.VITE_API_NINJA_KEY;

// Text to speech API - AssemblyAI info

// const uploadEndpoint = 'https://api.assemblyai.com/v2/upload';
// const transcribeEndpoint = 'https://api.assemblyai.com/v2/transcript';

function TextRender() {
  const [quoteText, setText] = useState({
    quote: 'Hello World',
    author: 'Ivan Romero',
  });

  useEffect(() => {
    async function dataFetch() {
      try {
        const response = await fetch(apiURL, {
          method: 'GET',
          headers: {
            'X-Api-Key': ninjaKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setText(data[0]);
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        alert(error);
      }
    }

    dataFetch();
  }, []);

  return (
    <div className="quote-container">
      <div className="quote">{quoteText.quote}</div>
      <div className="author">{quoteText.author}</div>
    </div>
  );
}

export default TextRender;
