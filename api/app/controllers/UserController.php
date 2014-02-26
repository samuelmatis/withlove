<?php

namespace Phirational\Withlove\Controllers;

use Input;
use Validator;
use Hash;
use Response;
use Auth;
use Phirational\Withlove\Models\User;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        if ($this->userRole == 500) {
            $user = User::all();
            return $user;
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to list users.'), 401);
        }
    }

    /**
     * Login user from api
     *
     * @return Response
     */
    public function login()
    {
        if(Input::has('email') && Input::has('password'))
        {
            $email = Input::get('email');
            $password = Input::get('password');
            if (Auth::attempt(array('email' => $email, 'password' => $password)))
            {
                if(Auth::user()->role == 500){
                    $token = Auth::user()->api_token;
                    return Response::json(array('status' => 'success', 'api_token' => \Crypt::encrypt($token)), 200);
                } else {
                    return Response::json(array('status' => 'error', 'msg' => 'No permissions.'), 401);
                }

            }

            return Response::json(array('status' => 'error', 'msg' => 'Bad credentials.'), 401);
        }

        return Response::json(array('status' => 'error', 'msg' => 'Missing data.'), 401);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        if ($this->userRole == 500) {

            $input = Input::all();
            $validator = Validator::make(
                $input,
                array(
                    'firstname' => 'required',
                    'lastname' => 'required',
                    'email' => 'email|required',
                    'role' => 'required|numeric',
                    'password' => 'required'
                )
            );

            if ($validator->fails()) {
                $messages = $validator->messages();
                $response = array(
                    'status' => 'error',
                    'errors' => $messages->toArray()
                );
                return Response::json($response, 400);
            } else {
                $user = new User();
                $user->firstname = $input['firstname'];
                $user->lastname = $input['lastname'];
                $user->password = Hash::make($input['password']);
                $user->email = $input['email'];
                $user->role = $input['role'];
                $user->telephone = isset($input['phone']) ? $input['phone'] : '';
                $user->street = isset($input['street']) ? $input['street'] : '';
                $user->town = isset($input['town']) ? $input['town'] : '';
                $user->zip = isset($input['zip']) ? $input['zip'] : '';
                if ($user->save()) {
                    return array('status' => 'success');
                } else {
                    return Response::json(array('status' => 'error',
                        'msg' => 'Somethig wrong happened, repeat the action or contact the administrator.'), 500);
                }
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to add new users.'), 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        if ($this->userRole == 500) {
            $user = User::find($id);
            if (!empty($user)) {
                return $user;
            } else {
                return Response::json(array('status' => 'error',
                    'msg' => 'This user was not found.'), 404);
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to show user.'), 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        if ($this->userRole == 500) {
            $user = User::find($id);
            if (!empty($user)) {
                $input = Input::all();

                $validator = Validator::make(
                    $input,
                    array(
                        'firstname' => 'required',
                        'lastname' => 'required',
                        'email' => 'email|required',
                        'role' => 'required|numeric',
                        'password' => 'required'
                    )
                );

                if ($validator->fails()) {
                    $messages = $validator->messages();
                    $response = array(
                        'status' => 'error',
                        'errors' => $messages->toArray()
                    );
                    return Response::json($response, 400);
                } else {
                    $user->firstname = $input['firstname'];
                    $user->lastname = $input['lastname'];
                    $user->password = Hash::make($input['password']);
                    $user->email = $input['email'];
                    $user->role = $input['role'];
                    $user->phone = isset($input['phone']) ? $input['phone'] : '';
                    $user->street = isset($input['street']) ? $input['street'] : '';
                    $user->town = isset($input['town']) ? $input['town'] : '';
                    $user->zip = isset($input['zip']) ? $input['zip'] : '';
                    if ($user->save()) {
                        return array('status' => 'success');
                    } else {
                        return Response::json(array('status' => 'error',
                            'msg' => 'Somethig wrong happened, repeat the action or contact the administrator.'), 500);
                    }
                }
            } else {
                return Response::json(array('status' => 'error',
                    'msg' => 'This user was not found.'), 404);
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to edit user.'), 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        if ($this->userRole == 500) {
            User::destroy($id);
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to delete user.'), 401);
        }

    }
}
