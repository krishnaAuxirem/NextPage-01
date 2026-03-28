import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ContentCard } from '@/components/features/ContentCard';
import { useContent } from '@/contexts/ContentContext';
import {
  Laptop,
  Microscope,
  Briefcase,
  Heart,
  GraduationCap,
  Palette,
  Brain,
  Sparkles,
  Code,
  Megaphone,
  DollarSign,
  Scroll,
} from 'lucide-react';

const Categories = () => {
  const navigate = useNavigate();
  const { contents } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Technology', icon: Laptop, count: '1,245', color: 'bg-blue-500', description: 'Latest in tech, programming, and innovation' },
    { name: 'Science', icon: Microscope, count: '856', color: 'bg-green-500', description: 'Scientific discoveries and research' },
    { name: 'Business', icon: Briefcase, count: '2,134', color: 'bg-purple-500', description: 'Entrepreneurship, finance, and strategy' },
    { name: 'Health', icon: Heart, count: '945', color: 'bg-red-500', description: 'Wellness, fitness, and medical insights' },
    { name: 'Education', icon: GraduationCap, count: '1,567', color: 'bg-yellow-500', description: 'Learning methodologies and pedagogy' },
    { name: 'Art & Design', icon: Palette, count: '678', color: 'bg-pink-500', description: 'Creative arts and design principles' },
    { name: 'Philosophy', icon: Brain, count: '432', color: 'bg-indigo-500', description: 'Philosophical thoughts and discussions' },
    { name: 'Wellness', icon: Sparkles, count: '789', color: 'bg-teal-500', description: 'Mental health and mindfulness' },
    { name: 'Programming', icon: Code, count: '1,890', color: 'bg-orange-500', description: 'Code, frameworks, and development' },
    { name: 'Marketing', icon: Megaphone, count: '623', color: 'bg-cyan-500', description: 'Marketing strategies and branding' },
    { name: 'Finance', icon: DollarSign, count: '1,023', color: 'bg-emerald-500', description: 'Personal finance and investing' },
    { name: 'History', icon: Scroll, count: '345', color: 'bg-amber-500', description: 'Historical events and analysis' },
  ];

  const filteredContents = selectedCategory
    ? contents.filter(c => c.category === selectedCategory && c.status === 'published')
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore by Category</h1>
          <p className="text-xl opacity-90">Find content that matches your interests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.name}
                  className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className={`h-16 w-16 rounded-2xl ${category.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-3">{category.description}</p>
                  <p className="text-center text-sm font-medium text-primary">{category.count} articles</p>
                </Card>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-center gap-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:underline"
              >
                ← Back to all categories
              </button>
              <h2 className="text-3xl font-bold">{selectedCategory}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents.map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
              {filteredContents.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-12">
                  No content found in this category yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
