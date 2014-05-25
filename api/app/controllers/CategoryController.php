<?php

namespace Phirational\Withlove\Controllers;

use Input;
use Validator;
use Response;
use Phirational\Withlove\Models\Category;
use Phirational\Withlove\Models\Place;

class CategoryController extends BaseController
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $categories = Category::orderBy('order', 'asc')->get();

        return $categories;
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
                    'name' => 'required'
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
                $category = new Category();

                $category->name = $input['name'];
                $category->icon_normal = isset($input['icon_normal']) ? $input['icon_normal'] : '';
                $category->icon_over = isset($input['icon_over']) ? $input['icon_over'] : '';
                $category->icon_pin = isset($input['icon_pin']) ? $input['icon_pin'] : '';
                $category->can_has_children = isset($input['can_has_children']) ? $input['can_has_children'] : 0;
                $category->color = isset($input['color']) ? $input['color'] : '';

                if ($category->save()) {
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
        $categories = Category::find($id);
        if (!empty($categories)) {
            return $categories;
        } else {
            return Response::json(array('status' => 'error', 'msg' => 'This category was not found.'), 404);
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

        if ($this->userRole != 500) {

            $category = Category::find($id);

            if (!empty($category)) {

                $input = Input::all();

                $validator = Validator::make(
                    $input,
                    array(
                        'name' => 'required'
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

                    $category->name = $input['name'];
                    $category->icon_normal = isset($input['icon_normal']) ? $input['icon_normal'] : '';
                    $category->icon_over = isset($input['icon_over']) ? $input['icon_over'] : '';
                    $category->icon_pin = isset($input['icon_pin']) ? $input['icon_pin'] : '';
                    $category->can_has_children = isset($input['can_has_children']) ? $input['can_has_children'] : 0;
                    $category->color = isset($input['color']) ? $input['color'] : '';

                    if ($category->save()) {
                        return array('status' => 'success');
                    } else {
                        return Response::json(array('status' => 'error',
                            'msg' => 'Somethig wrong happened, repeat the action or contact the administrator.'), 500);
                    }
                }

            } else {
                return Response::json(array('status' => 'error', 'msg' => 'This category was not found.'), 404);
            }
        } else {
            return Response::json(array('status' => 'error',
            'msg' => 'You do not have permissions to update category.'), 401);
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

            Place::where('category_id', '=', $id)->delete();
            Category::destroy($id);
            return array('status' => 'success');

        } else {
            return Response::json(array('status' => 'error',
                'msg' => 'You do not have permissions to remove this category.'), 401);
        }
    }
}
