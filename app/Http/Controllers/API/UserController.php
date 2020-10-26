<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Users as UserCollection;
use App\Http\Resources\User as UserResource;
use App\Models\User;
use App\Http\Requests\UserPostRequest;


class UserController extends Controller
{
  
    public function index()
    {
       return new UserCollection(User::where('id','!=',auth()->id())->orderBy('id','DESC')->get());
    }

    public function store(UserPostRequest $request)
    {
        $request->merge(['password' => bcrypt($request->password)]);
        $user = User::create($request->all());
        $accessToken = $user->createToken('userToken')->accessToken;
        return response()->json(['user' => $user, 'accessToken' => $accessToken],200);
    }
    public function show($id)
    {
        return new UserResource(User::findOrfail($id));
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrfail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['message' => "User Updated successfully."],200);
    }

    public function destroy($id)
    {
        $user = User::findOrfail($id);
        $user->delete();
        return response()->json(['message' => 'User '.ucwords($user->name).' Deleted successfully.'],200);
    }
}
