<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('source_ids')->nullable();   // Store multiple source IDs as JSON
            $table->json('category_ids')->nullable(); // Store multiple category IDs as JSON
            $table->json('author_ids')->nullable();   // Store multiple author IDs as JSON
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('preferences');
    }
};
