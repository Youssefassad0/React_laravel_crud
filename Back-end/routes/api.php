<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


Route::get('/employes', [ApiController::class, 'index']);
Route::get('/employes/{id}', [ApiController::class, 'show']);
Route::post('/employes', [ApiController::class, 'store']);
Route::put('/updateemploye/{id}', [ApiController::class, 'update']);
Route::delete('/deleteemploye/{id}', [ApiController::class, 'destroy']);
