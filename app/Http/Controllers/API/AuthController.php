<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserPostRequest;
use App\Http\Requests\UserLoginRequest;
use App\Models\User;


class AuthController extends Controller
{
    public function register(UserPostRequest $request)
    {
            $request->merge(['password' => bcrypt($request->password)]);
            $user =  User::create($request->all());
            $accessToken = $user->createToken('userToken')->accessToken;
            return response()->json(['user' => $user, 'accessToken' => $accessToken],200);
    }
    public function login(UserLoginRequest $request)
    {
        $credentials = ['email' => $request->email, 'password' => $request->password];
        if(!auth()->attempt($credentials))
        {
            return response()->json(['message' => 'Invalid Email and Password Combination'],401);
        }
        $accessToken = auth()->user()->createToken('userToken')->accessToken;
        return response()->json(['user' => auth()->user(),'accessToken' => $accessToken],200);
    }

    public function logout()
    {
        if(auth()->check())
        {
            $user = auth()->user()->token();
            $user->revoke();
            return response()->json(['message' => 'Logout successfully.'],200);
        }
    }
}
