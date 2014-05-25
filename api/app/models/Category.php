<?php
namespace Phirational\Withlove\Models;

/**
 * Category
 *
 * @property integer $id
 * @property string $name
 * @property string $slug
 * @property boolean $can_has_children
 * @property string $color
 * @property string $icon_normal
 * @property string $icon_pin
 * @property integer $order
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Category extends BaseModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'category';

    public $timestamps = true;
}
