<?php

namespace Phirational\Withlove\Helpers;

class Helper
{
    public static function pre_r($expression, $return = false)
    {
        list($callee) = debug_backtrace();

        if ($return) {
            if (is_string($expression)) {
                return '<pre>'
                    . print_r(str_replace(array('<','>'), array('&lt;','&gt;'), $expression), true)
                    . '</pre>';
            }
            return '<pre>' . print_r($expression, true) . '</pre>';
        } else {
            echo  '<strong>'.$callee['file'].'</strong>  <span style="color:tomato">@line '.$callee['line']. '</span>';
            echo '<pre>';
            if (is_string($expression)) {
                print_r(str_replace(array('<','>'), array('&lt;','&gt;'), $expression), false);
            } else {
                print_r($expression, false);
            }
            echo '</pre>';
        }
    }
}
