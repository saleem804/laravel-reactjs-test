<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Services\NewsScraperService;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query()
            ->with([
                'source:id,name',
                'category:id,name',
                'author:id,name'
            ]);

        // Search filter
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('content', 'like', "%$search%");
            });
        }

        // Source filter
        if ($request->has('source')) {
            $query->whereHas('source', function ($q) use ($request) {
                $q->where('name', $request->input('source'));
            });
        }

        // Category filter
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->input('category'));
            });
        }

        // Date range filter
        if ($request->has('start_date') && $request->has('end_date')) {
            $startDate = Carbon::parse($request->input('start_date'))->startOfDay();
            $endDate = Carbon::parse($request->input('end_date'))->endOfDay();
            $query->whereBetween('published_at', [$startDate, $endDate]);
        }

        // Pagination (optional)
        $articles = $query->paginate(15);

        return response()->json($articles);
    }


    public function newsfeed(Request $request)
    {
        $user = $request->user();
        $preference = $user->preference;

        $query = Article::with([
            'source:id,name',
            'category:id,name',
            'author:id,name'
        ]);

        if ($preference && $preference->source_ids) {
            $query->whereIn('source_id', $preference->source_ids);
        }

        if ($preference && $preference->category_ids) {
            $query->whereIn('category_id', $preference->category_ids);
        }

        if ($preference && $preference->author_ids) {
            $query->whereIn('author_id', $preference->author_ids);
        }

        $articles = $query->get();

        return response()->json($articles);
    }
}
