<?php

use App\Http\Controllers\ClientsController;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); */

Route::apiResource('clients', ClientsController::class);
