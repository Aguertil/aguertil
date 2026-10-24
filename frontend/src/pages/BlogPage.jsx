import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import blogData from '../data/blogData.json';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // Filtrer les articles publiés (status: "published" OU publishDate <= maintenant)
    const now = new Date();
    const publishedArticles = blogData.articles.filter(article => {
      const publishDate = new Date(article.publishDate);
      return article.status === 'published' || (article.status === 'scheduled' && publishDate <= now);
    });
    // Trier par date décroissante
    publishedArticles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    setArticles(publishedArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    return selectedCategory === 'all' || article.category === selectedCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Page de lecture d'article
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white text-gray-900 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 font-medium transition-colors"
          >
            ← Retour aux articles
          </button>

          {/* Article */}
          <article>
            {/* Category badge */}
            <div className="mb-4">
              <span className={`inline-block px-4 py-1 text-xs font-bold uppercase tracking-wide rounded ${
                selectedArticle.category === 'Investigations' ? 'bg-red-100 text-red-700' :
                selectedArticle.category === 'Scandales' ? 'bg-orange-100 text-orange-700' :
                selectedArticle.category === 'Dette publique' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {selectedArticle.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {selectedArticle.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedArticle.publishDate)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {getReadingTime(selectedArticle.content)} min
              </div>
            </div>

            {/* Image */}
            {selectedArticle.image && (
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {selectedArticle.content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return <h1 key={idx} className="text-3xl font-bold mt-12 mb-6 text-gray-900">{line.replace('# ', '')}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold mt-10 mb-4 text-gray-900">{line.replace('## ', '')}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-bold mt-8 mb-3 text-gray-900">{line.replace('### ', '')}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-6 mb-2 text-gray-700 leading-relaxed">{line.replace('- ', '')}</li>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={idx} className="font-bold text-gray-900 mb-3 text-lg">{line.replace(/\*\*/g, '')}</p>;
                } else if (line.startsWith('---')) {
                  return <hr key={idx} className="my-8 border-gray-300" />;
                } else if (line.trim()) {
                  return <p key={idx} className="mb-4 text-gray-700 leading-relaxed text-lg">{line}</p>;
                } else {
                  return <br key={idx} />;
                }
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Page liste des articles
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Investigations et analyses sur les liens entre politique, finance et médias
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            {blogData.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.name
                    ? cat.color === 'red' ? 'bg-red-600 text-white' :
                      cat.color === 'orange' ? 'bg-orange-600 text-white' :
                      cat.color === 'blue' ? 'bg-blue-600 text-white' :
                      'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Aucun article dans cette catégorie</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <article
                key={article.id}
                className="group cursor-pointer pb-8 border-b border-gray-200 last:border-0 hover:opacity-80 transition-opacity"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Image */}
                  {article.image && (
                    <div className="md:col-span-1">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className={article.image ? "md:col-span-2" : "md:col-span-3"}>
                    {/* Category */}
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide rounded ${
                        article.category === 'Investigations' ? 'bg-red-100 text-red-700' :
                        article.category === 'Scandales' ? 'bg-orange-100 text-orange-700' :
                        article.category === 'Dette publique' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.publishDate)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {getReadingTime(article.content)} min
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
