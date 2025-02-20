<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Article;
use App\Models\Source;
use App\Models\Category;
use App\Models\Author;

class ScrapeNews extends Command
{
    protected $signature = 'news:scrape';
    protected $description = 'Scrape news articles from various sources and store them in the database';

    public function handle()
    {
        $sources = [
            'NewsAPI.org'   => 'https://newsapi.org/v2/top-headlines?country=us&apiKey=2676f20e67254cba869371f4a885d6ee',
            'The Guardian'  => 'https://content.guardianapis.com/search?api-key=7bb85a6c-5d43-4f80-bbb6-883d5450e4b6',
            'New York Times'       => 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=dfQcEGb4PnVxYAA9gF55R1fQWUQ96ZyZ',
        ];

        foreach ($sources as $source => $url) {
            $response = Http::get($url);
            if ($response->successful()) {
                $this->saveArticles($source, $response->json());
            } else {
                $this->error("Failed to fetch news from {$source}");
            }
        }

        $this->info('News scraping completed successfully!');
    }

    private function saveArticles($source, $data)
    {
        $articles = match ($source) {
            'NewsAPI.org' => $data['articles'] ?? [],
            'The Guardian' => $data['response']['results'] ?? [],
            'New York Times' => $data['results'] ?? [],
            default => [],
        };

        foreach ($articles as $article) {
            $sourceModel = Source::firstOrCreate(['name' => $source]);
            $categoryModel = Category::firstOrCreate(['name' => $article['section'] ?? ($article['category'] ?? 'General')]);
            $authorModel = Author::firstOrCreate(['name' => $article['author'] ?? 'Unknown']);

            Article::updateOrCreate(
                ['url' => $article['url'] ?? $article['webUrl'] ?? null],
                [
                    'source_id' => $sourceModel->id,
                    'category_id' => $categoryModel->id,
                    'author_id' => $authorModel->id,
                    'title' => $article['title'] ?? $article['webTitle'] ?? 'No Title',
                    'content' => $article['description'] ?? 'No Description',
                    'url' => $article['url'] ?? $article['webUrl'] ?? '',
                    'image' => $article['urlToImage'] ?? null,
                    'published_at' => $article['publishedAt'] ?? $article['webPublicationDate'] ?? now(),
                ]
            );
        }
    }
}
