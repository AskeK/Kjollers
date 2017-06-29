<?php

/*
Title: Side type
Post Type: page
*/

// Piklist
piklist('field', array(
    'type' => 'radio',
    'field' => 'page-type',
    'label' => 'Side type',
    'scope' => 'post_meta',
    'value' => 'article',
    'choices' => array(
        'frontpage' => 'Forside',
        'article' => 'Artikel side',
        'contact' => 'Kontakt side',
        'signup' => 'Tilmeldings side'
    )
));
