<?php
namespace App\Http\Controllers;

use App\Models\Preference;
use App\Models\Source;
use App\Models\Category;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PreferenceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $preferences = Preference::where('user_id', $user->id)
            ->first();

        return response()->json([
            'preferences' => $preferences,
            'metadata' => [
                'sources' => Source::all(),
                'categories' => Category::all(),
                'authors' => Author::all(),
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $preferences = Preference::updateOrCreate(
            ['user_id' => $user->id],
            ['source_ids' => $request->source_ids, 'category_ids' => $request->category_ids, 'author_ids' => $request->author_ids]
        );

        return response()->json([
            'message' => 'Preferences updated successfully',
            'preferences' => $preferences
        ]);
    }
}
