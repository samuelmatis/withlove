<?php

namespace Phirational\Withlove\Controllers;

use Input;
use Validator;
use Response;
use Auth;
use Phirational\Withlove\Models\PlaceEdit;
use Phirational\Withlove\Models\Category;
use Phirational\Withlove\Models\Place;

class PlaceSuggestController extends BaseController {

    public function __construct()
    {

        $this->user_role = Auth::user()->getAttributes()['role'];

        Validator::extend('category_exist', function( $attribute, $value, $parameters )
        {
            $category = Category::find($value);

            if( !empty($category) ) return true;
            else return false;

        });

        $this->validation_messages = array(
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
        $places = PlaceEdit::where('parent', '=', NULL)->get();

        $places_attributes = array();

        foreach( $places as $row ) {

            $attributes = $row->getAttributes();

            $original_place = '';

            if($attributes['original'] != '')
            {
                $original_place = Place::find($attributes['original']);

                $original = $original_place->getAttributes();

                $original_category = Category::where('id', '=', $original['category'])->get();

                foreach($original_category as $value){
                    $original['category'] = $value->getAttributes();
                }

                $attributes['original'] = $original;
            }

            $category = Category::where('id', '=', $attributes['category'])->get();

            foreach($category as $value){
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
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
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
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        if( $this->user_role == 500 ) {

            $place = PlaceEdit::where('id', '=', $id)->get();

            if( !empty($place) ) {

                PlaceEdit::destroy($id);

            }
            else return Response::json(array('status' => 'error', 'msg' => 'This place was not found.'), 404);

        }
        else return Response::json(array('status' => 'error', 'msg' => 'You do not have permissions to delete place.'), 401);
	}

}