<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    //Loại tin
    Route::post('loai-tin', [LoaiTinController::class, 'store']);
    Route::put('loai-tin/{id}', [LoaiTinController::class, 'update']);
    Route::delete('loai-tin/{id}', [LoaiTinController::class, 'destroy']);
    
    //Tin tức
    Route::post('tin-tuc', [TinTucController::class, 'store']);
    Route::put('tin-tuc/{id}', [TinTucController::class, 'update']);
    Route::delete('tin-tuc/{id}', [TinTucController::class, 'destroy']);
    Route::post('/upload-images', [TinTucController::class, 'uploadImages']);

    //Cập nhật Covid
    Route::post('/covid', [CovidController::class, 'store']);

    //Đăng xuất
    Route::post('/logout', [AuthController::class, 'logout']);
});

//Public routes
Route::get('loai-tin', [LoaiTinController::class, 'index']);
Route::get('loai-tin/{id}', [LoaiTinController::class, 'show']);

Route::get('tin-tuc', [TinTucController::class, 'index']);
Route::get('tin-tuc/{id}', [TinTucController::class, 'show']);
Route::get('tin-tuc-noi-bat', [TinTucController::class, 'highlight']);
Route::get('tin-tuc-moi-dang', [TinTucController::class, 'new_tt']);
Route::get('tin-tuc/loai-tin/{id}', [TinTucController::class, 'loaitin']);
Route::get('tin-tuc/view/{id}', [TinTucController::class, 'view']);
Route::get('tin-tuc/search/{title}', [TinTucController::class, 'search']);

//Lấy danh sách covid 19
Route::get('/covid', [CovidController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
