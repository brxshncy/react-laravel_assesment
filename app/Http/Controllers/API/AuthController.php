<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserPostRequest;
use App\Http\Requests\UserLoginRequest;
use App\Mail\NewUserMail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Klaviyo\Klaviyo as Klaviyo;
use Spatie\Permission\Models\Role;
use Klaviyo\Model\ProfileModel as KlaviyoProfile;

class AuthController extends Controller
{
    public function register(UserPostRequest $request)
    {
        try{
            $client = new Klaviyo( 'pk_cc9e88596d897ac7615de47772fd2ce725', 'WxWBc5' );
            $request->merge(['password' => bcrypt($request->password)]);
            Mail::to($request->email)->send(new NewUserMail());
            $role = Role::find(1);
            $user =  User::create($request->all());
            $userRole = $user->assignRole($role);
            $profile = new KlaviyoProfile(
                array(
                    '$email' => $request->email,
                    '$first_name' => $request->name,
                )
            );
            $client->lists->addMembersToList('UecVt6',[$profile]);
            $accessToken = $user->createToken('userToken')->accessToken;
            return response()->json(['user' => $user, 'accessToken' => $accessToken, 'role' => $userRole],200);
        }
        catch(Exception $err){
            return response()->json(['message' => $err]);
        }
           
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
