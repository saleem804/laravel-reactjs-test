<?php

use App\Http\Controllers\PreferenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MetadataController;
use App\Http\Controllers\NewsController;

Route::get('/health', function () {
    return response()->json(['status' => 'API is working']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// News Articles Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/newsfeed', [NewsController::class, 'newsfeed']);
    Route::get('/articles', [NewsController::class, 'index']);
    Route::get('/articles/search', [NewsController::class, 'search']);
    Route::get('/articles/filter', [NewsController::class, 'filter']);
    Route::get('/articles/personalized', [NewsController::class, 'personalizedFeed']);
  
    Route::get('/preferences', [PreferenceController::class, 'index']);
    Route::post('/preferences', [PreferenceController::class, 'store']);
});