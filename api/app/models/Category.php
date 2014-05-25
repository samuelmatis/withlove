<?php
namespace Phirational\Withlove\Models;

use Eloquent;

/**
 * Category
 *
 * @property integer $id
 * @property string $name
 * @property boolean $can_has_children
 * @property string $color
 * @property string $icon_normal
 * @property string $icon_over
 * @property string $slug
 * @property integer $order
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Category extends Eloquent
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'category';
}
