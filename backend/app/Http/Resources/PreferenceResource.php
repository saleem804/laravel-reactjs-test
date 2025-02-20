<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PreferenceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sources' => $this->source_ids ?? [],
            'categories' => $this->category_ids ?? [],
            'authors' => $this->author_ids ?? [],
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
