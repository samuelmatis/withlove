<?php

namespace Phirational\Withlove\Controllers;

use Auth;
use Phirational\Withlove\Models\Parents;
use Validator;
use Response;
use Input;
use Phirational\Withlove\Models\Place;
use Phirational\Withlove\Models\Category;
use Phirational\Withlove\Models\PlaceEdit;


class PlaceController extends BaseController
{
    protected $validationMessages;

    public function __construct()
    {

        parent::__construct();

        Validator::extend('category_exist', function ($attribute, $value, $parameters) {
            $category = Category::find($value);

            if (!empty($category)) {
                return true;
            } else {
                return false;
            }
        });

        $this->validationMessages = array(
            'category_exist' => 'This category does not exist.',
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $places = Place::where('parent', '=', null)->get();

        $places_attributes = array();

        foreach ($places as $row) {
            $attributes = $row->getAttributes();
            $category = Category::where('id', '=', $attributes['category'])->get();
            foreach ($category as $value) {
                $attributes['category'] = $value->getAttributes();
            }
            $places_attributes[] = $attributes;
        }

        $response = Response::json($places_attributes, 200);
        $response->header('Access-Control-Allow-Origin', '*');
        return $response;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {

        $input = Input::all();

        $validator = Validator::make(
            $input,
            array(
                'name' => 'required',
                'category' => 'required|category_exist',
                'street' => 'required',
                'town' => 'required',
                'email' => 'email'
            ),
            $this->validationMessages
        );

        if ($validator->fails()) {
            $messages = $validator->messages();
            $response = array(
                'status' => 'error',
                'errors' => $messages->toArray()
            );
            return Response::json($response, 400);
        } else {

            if ($this->userRole == 500) {
                $place = new Place();
            } else {
                $place = new PlaceEdit();
                $place->original = null;
                $place->status = 'new';
            }

            $place->parent = null;
            $place->name = $input['name'];
            $place->category = $input['category'];
            $place->description = isset($input['description']) ? $input['description'] : '';
            $place->web = isset($input['web']) ? $input['web'] : '';
            $place->street = $input['street'];
            $place->zip = isset($input['zip']) ? $input['zip'] : '';
            $place->town = $input['town'];
            $place->email = isset($input['email']) ? $input['email'] : '';
            $place->phone = isset($input['phone']) ? $input['phone'] : '';
            $place->tags = isset($input['tags']) ? $input['tags'] : '';


            $lat_lng = $this->getLatLong($input['street'], $input['town']);

            if (!empty($lat_lng)) {
                $place->latitude = $lat_lng['latitude'];
                $place->longitude = $lat_lng['longitude'];
            }

            if ($place->save()) {
                return array('status' => 'success');
            } else {
                return Response::json(array('status' => 'error',
                    'msg' => 'Somethig wrong happened, repeat the action or contact the administrator.'), 500);
            }
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
        $places = Place::find($id);

        if (!empty($places)) {
            $places_attributes = $places->getAttributes();
            $category = Category::find($places_attributes['category']);
            $places_attributes['category'] = $category->getAttributes();
            return $places_attributes;
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'This place was not found.'), 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $place = Place::find($id);

        if (!empty($place)) {
            $places_attributes = $place->getAttributes();
            $input = Input::all();
            $validator = Validator::make(
                $input,
                array(
                    'name' => 'required',
                    'category' => 'required|category_exist',
                    'street' => 'required',
                    'town' => 'required',
                    'email' => 'email'
                ),
                $this->validationMessages
            );

            if ($validator->fails()) {
                $messages = $validator->messages();
                $response = array(
                    'status' => 'error',
                    'errors' => $messages->toArray()
                );
                return Response::json($response, 400);
            } else {

                $category = Category::find($input['category']);
                $same_place = Place::where('town', '=', $input['town'])
                                    ->where('street', '=', $input['street'])
                                    ->where('id', '!=', $id)
                                    ->get();

                if ($this->userRole == 500) {
                    $edited_place = $place;
                } else {
                    $edited_place = new PlaceEdit();
                    $edited_place->original = $id;
                    $edited_place->status = 'updated';
                }

                $edited_place->parent = null;
                $edited_place->name = $input['name'];
                $edited_place->category = $input['category'];
                $edited_place->description = isset($input['description']) ? $input['description'] : '';
                $edited_place->web = isset($input['web']) ? $input['web'] : '';
                $edited_place->street = $input['street'];
                $edited_place->zip = isset($input['zip']) ? $input['zip'] : '';
                $edited_place->town = $input['town'];
                $edited_place->email = isset($input['email']) ? $input['email'] : '';
                $edited_place->phone = isset($input['phone']) ? $input['phone'] : '';
                $edited_place->tags = isset($input['tags']) ? $input['tags'] : '';

                $lat_lng = $this->getLatLong($input['street'], $input['town']);

                if (!empty($lat_lng)) {
                    $edited_place->latitude = $lat_lng['latitude'];
                    $edited_place->longitude = $lat_lng['longitude'];
                }

                $edited_place->save();
                return array('status' => 'success');
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'This place was not found.'), 404);
        }
    }

    /**
     * @param $id - id of children place in URL
     *
     * Function assigns place to another place as child.
     */
    public function assign($id)
    {
        if ($this->userRole == 500) {
            $children_place = Place::find($id);
        } else {
            $children_place = PlaceEdit::find($id);
        }

        if (!empty($children_place)) {

            $input = Input::all();
            if (isset($input['parent_place'])) {
                $parent_place = Place::find($input['parent_place']);
                if (!empty($parent_place)) {
                    $exist_relation = Parents::where(
                        'parent_id',
                        '=',
                        $input['parent_place']
                    )->where('children_id', '=', $id)->count();

                    if ($exist_relation == 0) {
                        $parent_object = new Parents();
                        $parent_object->parent_id = $input['parent_place'];
                        $parent_object->children_id = $id;
                        $parent_object->type = 'PLACE';

                        if ($parent_object->save()) {
                            return array('status' => 'success');
                        } else {
                            return Response::json(array('status' => 'error',
                                'msg' => 'Something wrong happend. Please contact the administrator.'), 404);
                        }

                    } else {
                        return Response::json(array('status' => 'error',
                            'msg' => 'This relation exists.'), 404);
                    }
                } else {
                    return Response::json(array('status' => 'error',
                        'msg' => 'This parent place does not exist.'), 404);
                }
            } else {
                return Response::json(array('status' => 'error',
                    'msg' => 'No parent place selected.'), 404);
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'This place was not found.'), 404);
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
            $place = Place::find($id);
            if (!empty($place)) {
                Parents::where('children_id', '=', $id)->orWhere('parent_id', '=', $id)->delete();
                Place::destroy($id);
            } else {
                return Response::json(array('status' => 'error',
                    'msg' => 'This place was not found.'), 404);
            }
        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to delete place.'), 401);
        }
    }


    private function getLatLong($street, $town)
    {
        $street_string = strtolower(implode('+', explode(' ', $street)));
        $town_string = strtolower(implode('+', explode(' ', $town)));
        $url = 'http://maps.googleapis.com/maps/api/geocode/json?address='
           . $street_string . ',' . $town_string . ',Slovakia&sensor=false';
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $response = curl_exec($ch);
        $address_object = json_decode($response, true);
        $return = array();

        if (isset($address_object['status']) && $address_object['status'] == 'OK') {
            if (isset($address_object['results']) && !empty($address_object['results'])) {
                if (isset($address_object['results'][0]['geometry']['location'])) {
                    $return = array(
                        'latitude' => $address_object['results'][0]['geometry']['location']['lat'],
                        'longitude' => $address_object['results'][0]['geometry']['location']['lng']
                    );
                }
            }
        }
        return $return;
    }
}
