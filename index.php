<?php
/*
Plugin Name:  mytheme-blocks
Plugin URI:   
Description:  blocks for my theme
Author:       Reece Stieller
Author URI:   http://stieller.com/
*/

if( ! defined('ABSPATH') ){
    exit;
}

// useful function for witing to the log
if ( ! function_exists('write_log')) {
    function write_log ( $log )  {
       if ( is_array( $log ) || is_object( $log ) ) {
          error_log( print_r( $log, true ) );
       } else {
          error_log( $log );
       }
    }
 }

// its is possible to pass the post and only display for certain types...
function mytheme_blocks_categories( $categories, $post ) { 

    //write_log($post);

    //this is how you get the page template
    //write_log( get_page_template_slug( $post->ID ) );

    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'mytheme-cetegory',
                'title' => __('My Theme Category', "mytheme-blocks"),
                'icon' => 'wordpress'
            )
        )
    );
}


// 10 is the priority, 2 is the amount of arguments
add_filter('block_categories', 'mytheme_blocks_categories', 10, 2 );

function mytheme_blocks_register_block_type( $block, $options = array() ) {
    register_block_type(
        'mytheme-blocks/' . $block,
        array_merge(
            array(
                'editor_script' => 'mytheme-blocks-editor-script',
                'editor_style' => 'mytheme-blocks-editor-style',
                'script' => 'mytheme-blocks-script',
                'style' => 'mytheme-blocks-style',
            ),
            $options
        )
    );
}

function mytheme_blocks_register() {

    wp_register_script(
        'mytheme-blocks-editor-script',
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components', 'lodash')
    );

    wp_register_script(
        'mytheme-blocks-script',
        plugins_url('dist/script.js', __FILE__),
        array('jquery')
    );

    wp_register_style(
        'mytheme-blocks-editor-style',
        plugins_url('dist/editor.css', __FILE__),
        array('wp-edit-blocks')
    );

    wp_register_style(
        'mytheme-blocks-style',
        plugins_url('dist/style.css', __FILE__),
        array('twentynineteen-style', 'twentynineteen-print-style')
    );

    mytheme_blocks_register_block_type( 'firstblock' );
    mytheme_blocks_register_block_type( 'secondblock' );
    mytheme_blocks_register_block_type( 'team-member' );
    mytheme_blocks_register_block_type( 'team-members' );

}

add_action('init', 'mytheme_blocks_register');