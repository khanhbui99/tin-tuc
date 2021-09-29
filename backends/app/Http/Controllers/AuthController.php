<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class AuthController extends Controller
{
    public function login(Request $request) {
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        $user = User::where('email', $request->email)->first();

        //check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            $response['data'] = '';
            $response['success'] = false;
            $response['message'] = "Sai tài khoản hoặc mật khẩu!";
            return $response;
        }
            
        $token = $user->createToken('myapptoken')->plainTextToken;

        $data['user'] = $user;
        $data['token'] = $token;

        $response['data'] = $data;
        $response['success'] = true;
        $response['message'] = "Đăng nhập thành công!";

        return $response;
    }

    public function logout(Request $request) {
        $response = array('success'=>false, 'message' => '', 'data'=> '');
        auth()->user()->tokens()->delete();
        $response['success'] = true;
        $response['message'] = "Đăng xuất thành công!";
        return $response;
    }
}