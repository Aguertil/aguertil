import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Tag, ArrowRight, Search } from 'lucide-react';
import blogData from '../data/blogData.json';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // Filtrer les articles publiés (status: "published" OU publishDate <= maintenant)
    const now = new Date();
    const publishedArticles = blogData.articles.filter(article => {
      const publishDate = new Date(article.publishDate);
      return article.status === 'published' || (article.status === 'scheduled' && publishDate <= now);
    });
    setArticles(publishedArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (categorySlug) => {
    const category = blogData.categories.find(c => c.slug === categorySlug.toLowerCase().replace(/ /g, '-'));
    return category?.color || 'gray';
  };

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

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex items-center gap-2"
          >
            ← Retour aux articles
          </button>

          {/* Article Header */}
          <article className="card mb-8">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${getCategoryColor(selectedArticle.category)}-500/20 text-${getCategoryColor(selectedArticle.category)}-300 border border-${getCategoryColor(selectedArticle.category)}-400/30`}>
                  {selectedArticle.category}
                </span>
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/10 text-blue-200">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedArticle.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedArticle.publishDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {getReadingTime(selectedArticle.content)} min de lecture
                </div>
              </div>
            </div>

            {selectedArticle.image && (
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
            )}

            {/* Article Content (Markdown-style) */}
            <div className="prose prose-invert max-w-none">
              {selectedArticle.content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4 text-blue-300">{line.replace('# ', '')}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold mt-6 mb-3 text-blue-400">{line.replace('## ', '')}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-bold mt-4 mb-2 text-blue-400">{line.replace('### ', '')}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-4 mb-2 text-blue-100">{line.replace('- ', '')}</li>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={idx} className="font-bold text-white mb-2">{line.replace(/\*\*/g, '')}</p>;
                } else if (line.startsWith('---')) {
                  return <hr key={idx} className="my-6 border-blue-400/30" />;
                } else if (line.trim()) {
                  return <p key={idx} className="mb-3 text-blue-100 leading-relaxed">{line}</p>;
                } else {
                  return <br key={idx} />;
                }
              })}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            📰 Blog
          </h1>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Investigations, analyses et révélations sur les liens entre politique, finance et médias
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <label className="text-sm font-semibold text-blue-300 mb-2 block">Rechercher :</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Titre, mots-clés, tags..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-semibold text-blue-300 mb-2 block">Catégories :</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/10 text-blue-300 hover:bg-white/20'
                  }`}
                >
                  Tous ({articles.length})
                </button>
                {blogData.categories.map(cat => {
                  const count = articles.filter(a => a.category === cat.name).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedCategory === cat.name
                          ? `bg-${cat.color}-500 text-white shadow-lg`
                          : 'bg-white/10 text-blue-300 hover:bg-white/20'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-blue-300 text-lg">Aucun article trouvé</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <article
                key={article.id}
                className="card group cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedArticle(article)}
              >
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${getCategoryColor(article.category)}-500/20 text-${getCategoryColor(article.category)}-300 border border-${getCategoryColor(article.category)}-400/30`}>
                    {article.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                  {article.title}
                </h2>

                <p className="text-sm text-blue-200 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-blue-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.publishDate)}
                  </div>
                  <div className="flex items-center gap-1 text-blue-400 font-semibold">
                    Lire <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded text-blue-300">
                      #{tag}
                    </span>
                  ))}
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
