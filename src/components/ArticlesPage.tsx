import React, { useState, useEffect } from 'react'; import { getArticles } from '../services/contentService';
export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState(getArticles());
  return <div className="pt-32 container mx-auto px-6"><h1 className="font-serif text-5xl mb-12">Блог</h1><div className="grid md:grid-cols-2 gap-8">{articles.map(a => <div key={a.id} className="border p-8"><h3 className="text-xl font-serif mb-4">{a.title}</h3><p className="text-sm text-gray-500">{a.summary}</p></div>)}</div></div>;
};