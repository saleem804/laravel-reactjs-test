<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PreferenceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Ensure authentication middleware is applied
    }

    public function rules(): array
    {
        return [
            'source_ids' => 'nullable|array',
            'source_ids.*' => 'integer|exists:sources,id',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'integer|exists:categories,id',
            'author_ids' => 'nullable|array',
            'author_ids.*' => 'integer|exists:authors,id',
        ];
    }
}
