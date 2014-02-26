<?php

namespace Phirational\Withlove\Controllers;

use Input;
use Validator;
use Response;
use Auth;
use Phirational\Withlove\Models\People;
use Phirational\Withlove\Models\Place;
use Phirational\Withlove\Models\Parents;

class PeopleController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $people = People::all();
        $people_attributes = array();

        foreach ($people as $row) {
            $people_attributes[] = $row->getAttributes();
        }
        return $people_attributes;
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
                    'email' => 'email'
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
                $person = new People();
                $person->firstname = $input['firstname'];
                $person->lastname = $input['lastname'];
                $person->email = isset($input['email']) ? $input['email'] : '';
                $person->phone = isset($input['phone']) ? $input['phone'] : '';
                if ($person->save()) {
                    return array('status' => 'success');
                } else {
                    return Response::json(array('status' => 'error',
                        'msg' => 'Somethig wrong happened, repeat the action or contact the administrator.'), 500);
                }
            }

        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to create new category.'), 401);
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
        $person = People::find($id);

        if (! empty($person)) {
            return $person;
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'This person was not found.'), 404);
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

            $person = People::find($id);

            if (!empty($person)) {

                $input = Input::all();

                $validator = Validator::make(
                    $input,
                    array(
                        'firstname' => 'required',
                        'lastname' => 'required',
                        'email' => 'email'
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
                    $person->firstname = $input['firstname'];
                    $person->lastname = $input['lastname'];
                    $person->email = isset($input['email']) ? $input['email'] : '';
                    $person->phone = isset($input['phone']) ? $input['phone'] : '';
                    if ($person->save()) {
                        return array('status' => 'success');
                    } else {
                        return Response::json(array('status' => 'error',
                            'msg' => 'Somethig wrong happened, repeat the action or contact the administrator.'), 500);
                    }
                }
            } else {
                return Response::json(array('status' => 'error',
                    'msg' => 'This person was not found.'), 404);
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to update person.'), 401);
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
            $places = Parents::where('children_id', '=', $id)->delete();
            People::destroy($id);
            return array('status' => 'success');
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to remove person.'), 401);
        }

    }


    public function assign($id)
    {

        if ($this->userRole == 500) {

            $person = People::find($id);

            if (!empty($person)) {

                $input = Input::all();

                if (isset($input['parent_place_id'])) {

                    $place = Place::find($input['parent_place_id']);

                    if (!empty($place)) {

                        $exist_parent = Parents::where(
                            'parent_id',
                            '=',
                            $input['parent_place_id']
                        )->where('children_id', '=', $id)->count();

                        if ($exist_parent == 0) {
                            $parent_object = new Parents();

                            $parent_object->parent_id = $input['parent_place_id'];
                            $parent_object->children_id = $id;
                            $parent_object->type = 'PERSON';

                            if ($parent_object->save()) {
                                return array('status' => 'success');
                            } else {
                                return Response::json(array('status' => 'error',
                                    'msg' => 'Unexpected error, please contact the administrator.'), 500);
                            }
                        } else {
                            return Response::json(array('status' => 'error',
                                'msg' => 'This relationship already exists.'), 404);
                        }
                    } else {
                        return Response::json(array('status' => 'error',
                            'msg' => 'This place was not found.'), 404);
                    }
                } else {
                    return Response::json(array('status' => 'error',
                        'msg' => 'No place was selected.'), 404);
                }
            } else {
                return Response::json(array('status' => 'error',
                    'msg' => 'This person was not found.'), 404);
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to remove person.'), 401);
        }
    }
}
