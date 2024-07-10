import React, { useEffect, useState } from 'react';

const NewsSidebar = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'pub_4830860bd6de36452a0c7c85a5857bff3ea7b';
  const apiUrl = `https://newsapi.org/v2/everything?q=Blockchain&apiKey=${apiKey}`;

  useEffect(() => {
    loadNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news. Please try again later.');
    }
  };

  const loadNews = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const newArticles = await fetchNews();
      setArticles(prevArticles => [...prevArticles, ...newArticles]);
    } finally {
      setLoading(false);
    }
  };

  const newsContainerStyle = {
    marginTop: '1rem',
  };

  const newsItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
  };

  const titleStyle = {
    fontWeight: '600',
    marginBottom: '0.5rem',
  };

  const sourceStyle = {
    fontSize: '0.875rem',
    color: '#718096',
    marginBottom: '0.5rem',
  };

  const descriptionStyle = {
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
  };

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    color: '#718096',
    fontSize: '0.75rem',
  };

  const buttonStyle = {
    marginTop: '1rem',
    width: '100%',
    backgroundColor: '#1E40AF',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  };

  const buttonDisabledStyle = {
    opacity: '0.5',
    cursor: 'not-allowed',
  };

  return (
    <div className="flex justify-end max-w-sm mx-auto mt-10">
      <div id="news-sidebar" className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Latest News</h2>
          <div id="news-container" style={newsContainerStyle}>
            {articles.map((article, index) => (
              <div key={index} style={newsItemStyle}>
                <img
                  src={article.urlToImage || 'https://via.placeholder.com/100'}
                  alt="News"
                  style={imageStyle}
                />
                <div style={{ marginLeft: '1rem' }}>
                  <h3 style={titleStyle}>{article.title}</h3>
                  <p style={sourceStyle}>{article.source?.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
                  <p style={descriptionStyle}>{article.description}</p>
                  <div style={iconContainerStyle}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span style={{ marginLeft: '0.25rem' }}>0</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span style={{ marginLeft: '0.25rem' }}>0</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {error && <p style={{ color: '#EF4444', marginTop: '0.5rem' }}>{error}</p>}
          <button
            onClick={loadNews}
            disabled={loading}
            style={{ ...buttonStyle, ...(loading && buttonDisabledStyle) }}
          >
            {loading ? 'Loading...' : 'More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
