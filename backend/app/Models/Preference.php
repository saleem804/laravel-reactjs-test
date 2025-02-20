<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Preference extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'source_ids', 'category_ids', 'author_ids'];

    protected $casts = [
        'source_ids' => 'array',
        'category_ids' => 'array',
        'author_ids' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
