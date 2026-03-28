import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContentCard } from '@/components/features/ContentCard';
import { useContent } from '@/contexts/ContentContext';
import { Search as SearchIcon, Filter, X } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { contents } = useContent();

  const allTags = Array.from(new Set(contents.flatMap(c => c.tags)));
  const contentTypes = ['article', 'ebook', 'guide', 'magazine'];

  const filteredContents = contents.filter(content => {
    const matchesQuery = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        content.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => content.tags.includes(tag));
    const matchesType = !selectedType || content.type === selectedType;
    const isPublished = content.status === 'published';

    return matchesQuery && matchesTags && matchesType && isPublished;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button size="lg" className="px-8">
              Search
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                {(selectedTags.length > 0 || selectedType) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                )}
              </div>

              {/* Content Type Filter */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">Content Type</p>
                <div className="space-y-2">
                  {contentTypes.map(type => (
                    <Badge
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      className="cursor-pointer capitalize w-full justify-center"
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <p className="text-sm font-semibold mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 15).map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && (
                        <X className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Content'}
              </h2>
              <p className="text-muted-foreground">
                {filteredContents.length} {filteredContents.length === 1 ? 'result' : 'results'} found
              </p>
            </div>

            {filteredContents.length > 0 ? (
              <div className="grid gap-6">
                {filteredContents.map(content => (
                  <ContentCard key={content.id} content={content} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
