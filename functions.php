<?php

/*
Theme Name: Kjøllers Køreskole
Author: Aske K. 2017
Version: 0.1.0
*/

// init
add_action( 'init', 'initilize' );
function initilize() {

    add_theme_support( 'post-thumbnails' );
    show_admin_bar( false );

}

add_action( 'wp_enqueue_scripts', 'enqueue_styelsheet' );
function enqueue_styelsheet() {

    if ( !is_404() ) {

        wp_register_script( 'main_script', get_template_directory_uri() . '/app/bundle.js' );

        // Gets id
        $url = get_site_url();
        $current_url = get_permalink();
        $id = get_the_ID();
        $type = is_404() ? '404' : 'page';
        $page_type = get_post_meta( $id, 'page-type', true );
        $slug = ( get_post( $id ) )->post_name;

        // Localizes data
        wp_enqueue_script( 'main_script' );
        wp_localize_script( 'main_script', 'site_data', array(

            'url' => $url,
            'current_url' => $current_url,
            'id' => $id,
            'type' => $type,
            'page_type' => $page_type,
            'slug' => $slug,
            'rest_api' => get_theme_mod( 'rest_api_url' )

        ));

    } else {
        wp_enqueue_style( '404', get_template_directory_uri() . '/css/404.css' );
    }

    wp_enqueue_style( 'montserrat', 'https://fonts.googleapis.com/css?family=Montserrat:300,500' );
    wp_enqueue_style( 'raleway', 'https://fonts.googleapis.com/css?family=Raleway:600,800' );

}

// Kirki
add_action( 'init', 'admin_initilize' );

// Theme Mods
function admin_initilize() {

    // Config
    Kirki::add_config( 'mods', array(
        'capability'    => 'edit_theme_options',
        'option_type'   => 'theme_mod'
    ));

    // Rest api section
    Kirki::add_section( 'rest_api', array(
        'title'          => __( 'API indstillinger' ),
        'description'    => __( 'Ændre API indstillinger her' ),
        'panel'          => '', // Not typically needed.
        'priority'       => 160,
        'capability'     => 'edit_theme_options',
        'theme_supports' => '',
    ));

    // Rest api field
    Kirki::add_field( 'mods', array(
        'settings' => 'rest_api_url',
        'label'    => __( 'Rest API url', 'translation_domain' ),
        'section'  => 'rest_api',
        'type'     => 'text',
        'priority' => 10,
        'default'  => 'http://localhost/wp-json/api/',
    ));

    // Contact info section
    Kirki::add_section( 'contact_info', array(
        'title'          => __( 'Kontakt informationer' ),
        'description'    => __( 'Ændre kontakt oplysninger her' ),
        'panel'          => '', // Not typically needed.
        'priority'       => 160,
        'capability'     => 'edit_theme_options',
        'theme_supports' => '',
    ));

    // Phone field
    Kirki::add_field( 'mods', array(
        'settings' => 'phone',
        'label'    => __( 'Telefonnummer', 'translation_domain' ),
        'section'  => 'contact_info',
        'type'     => 'text',
        'priority' => 10,
        'default'  => '+45 11 22 33 44',
    ));

    // Mail field
    Kirki::add_field( 'mods', array(
        'settings' => 'mail',
        'label'    => __( 'Email', 'translation_domain' ),
        'section'  => 'contact_info',
        'type'     => 'text',
        'priority' => 10,
        'default'  => 'test@testmail.dk',
    ));

    // CVR field
    Kirki::add_field( 'mods', array(
        'settings' => 'cvr',
        'label'    => __( 'CVR', 'translation_domain' ),
        'section'  => 'contact_info',
        'type'     => 'text',
        'priority' => 10,
        'default'  => '-',
    ));

    // CVR field
    Kirki::add_field( 'mods', array(
        'settings' => 'address',
        'label'    => __( 'Adresse', 'translation_domain' ),
        'section'  => 'contact_info',
        'type'     => 'text',
        'priority' => 10,
        'default'  => 'Korsgade 18, 2. sal, 5700 Svendborg.',
    ));

    // Contact info section
    Kirki::add_section( 'frontpage_bubbels', array(
        'title'          => __( 'Forside cirkler' ),
        'description'    => __( 'Ændre forside cirklerne her' ),
        'panel'          => '',
        'priority'       => 160,
        'capability'     => 'edit_theme_options',
        'theme_supports' => '',
    ));

    // Frontpage circles
    Kirki::add_field( 'mods', array(

        'type'        => 'repeater',
        'label'       => esc_attr__( 'Forside cirkler', 'my_textdomain' ),
        'section'     => 'frontpage_bubbels',
        'priority'    => 10,
        'row_label' => array(
            'type' => 'text',
            'value' => esc_attr__('Cirkel', 'my_textdomain' ),
        ),

        'settings'    => 'frontpage_bubbles',
        'default'     => array(
        ),

        'fields' => array(
            'bubble_img' => array(
                'type'        => 'image',
                'label'       => esc_attr__( 'Cirkel Billede', 'my_textdomain' ),
                'description' => esc_attr__( 'Billedet der bliver vist i cirklen', 'my_textdomain' ),
                'default'     => '',
                'save'        => 'url'
            ),
            'bubble_link' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Cirkel Link', 'my_textdomain' ),
                'description' => esc_attr__( 'Linket som cirklen peger på', 'my_textdomain' ),
                'default'     => '',
            ),
            'bubble_headline' => array(
                'type' => 'text',
                'label' => 'Cirkel overskrift',
                'description' => 'Overskriften for cirklen',
                'default' => '',
            ),
            'bubble_text' => array(
                'type' => 'text',
                'label' => 'Cirkel tekst',
                'description' => 'Teksten til cirklen',
                'default' => '',
            )
        )

    ));

}

// Teams
add_action( 'init', 'init_teams' );
function init_teams() {
    register_post_type( 'teams',
        array(
            'public' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-groups',
            'labels' => array(
                'name' => __( 'Hold' ),
                'singular_name' => __( 'Hold' )
            )
        )
    );

    remove_post_type_support( 'teams', 'editor' );
}

// Signups
add_action( 'init', 'init_signups' );
function init_signups() {
    register_post_type( 'signups',
        array(
            'public' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-clipboard',
            'labels' => array(
                'name' => __( 'Tilmeldinger' ),
                'singular_name' => __( 'Tilmelding' )
            )
        )
    );

    remove_post_type_support( 'signups', 'editor' );
}
