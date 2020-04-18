<?php

function firsttheme_theme_support() {

    // Add support for full and wide align images.
    add_theme_support( 'align-wide' );

    // Editor color palette.
    add_theme_support(
        'editor-color-palette',
        array(
            array(
                'name'  => __( 'Greyish Purple', 'twentynineteen' ),
                'slug'  => 'greyish-purple',
                'color' => '#524d5b'
            ),
            array(
                'name'  => __( 'Pale Green', 'twentynineteen' ),
                'slug'  => 'pale-green',
                'color' => '#9dd3aB'
            ),
            array(
                'name'  => 'default' === get_theme_mod( 'primary_color' ) ? __( 'Blue', 'twentynineteen' ) : null,
                'slug'  => 'primary',
                //'color' => twentynineteen_hsl_hex( 'default' === get_theme_mod( 'primary_color' ) ? 199 : get_theme_mod( 'primary_color_hue', 199 ), 100, 33 ),
            ),
            array(
                'name'  => 'default' === get_theme_mod( 'primary_color' ) ? __( 'Dark Blue', 'twentynineteen' ) : null,
                'slug'  => 'secondary',
                //'color' => twentynineteen_hsl_hex( 'default' === get_theme_mod( 'primary_color' ) ? 199 : get_theme_mod( 'primary_color_hue', 199 ), 100, 23 ),
            ),
            array(
                'name'  => __( 'Dark Gray', 'twentynineteen' ),
                'slug'  => 'dark-gray',
                'color' => '#111',
            ),
            array(
                'name'  => __( 'Light Gray', 'twentynineteen' ),
                'slug'  => 'light-gray',
                'color' => '#767676',
            ),
            array(
                'name'  => __( 'White', 'twentynineteen' ),
                'slug'  => 'white',
                'color' => '#FFF',
            ),
        )
    );

    // Add support for responsive embedded content.
    add_theme_support( 'responsive-embeds' );

    // Add editor styles
    add_theme_support('editor-styles');
    add_editor_style('dist/assets/css/editor.css');
}

add_action( 'after_setup_theme', 'firsttheme_theme_support' );


//example styles for editor-styles
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700');

body {
	background-color: blue;
	font-family: 'Roboto Slab', serif;
}

.editor-post-title__block .editor-post-title__input {
	font-family: 'Roboto Slab', serif;	
}

.wp-block {
	max-width: 900px;
}

.wp-block[data-align="wide"] {
	max-width: 1200px;
}

.wp-block[data-align="full"] {
	max-width: none;
}

// code to hide meta box for certain page template
/* 
 * Change Meta Box visibility according to Page Template
 *
 * Observation: this example swaps the Featured Image meta box visibility
 *
 * Usage:
 * - adjust $('#postimagediv') to your meta box
 * - change 'page-portfolio.php' to your template's filename
 * - remove the console.log outputs
 */

add_action('admin_head', 'wpse_50092_script_enqueuer');

function wpse_50092_script_enqueuer() {
    global $current_screen;
    if('page' != $current_screen->id) return;

    echo <<<HTML
        <script type="text/javascript">
        jQuery(document).ready( function($) {

            /**
             * Adjust visibility of the meta box at startup
            */
            if($('#page_template').val() == 'page-portfolio.php') {
                // show the meta box
                $('#postimagediv').show();
            } else {
                // hide your meta box
                $('#postimagediv').hide();
            }

            // Debug only
            // - outputs the template filename
            // - checking for console existance to avoid js errors in non-compliant browsers
            if (typeof console == "object") 
                console.log ('default value = ' + $('#page_template').val());

            /**
             * Live adjustment of the meta box visibility
            */
            $('#page_template').live('change', function(){
                    if($(this).val() == 'page-portfolio.php') {
                    // show the meta box
                    $('#postimagediv').show();
                } else {
                    // hide your meta box
                    $('#postimagediv').hide();
                }

                // Debug only
                if (typeof console == "object") 
                    console.log ('live change value = ' + $(this).val());
            });                 
        });    
        </script>
HTML;
}
