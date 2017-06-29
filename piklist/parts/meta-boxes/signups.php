<?php

/*
Title: Tilmeldings informations
Post Type: signups
*/

// Name
piklist('field', array(
    'type' => 'text',
    'field' => 'name',
    'label' => 'Navn',
    'value' => 'Test',
    'attributes' => array(
        'readonly' => 'readonly',
        'class' => 'large-text'
    )
));

// Last name
piklist('field', array(
    'type' => 'text',
    'field' => 'lastname',
    'label' => 'Efternavn',
    'value' => 'Testensen',
    'attributes' => array(
        'readonly' => 'readonly',
        'class' => 'large-text'
    )
));

// Birth day
piklist('field', array(
    'type' => 'text',
    'field' => 'birthday',
    'label' => 'Fødselsdato',
    'value' => '1 / 1 - 1970',
    'attributes' => array(
        'readonly' => 'readonly',
        'class' => 'large-text'
    )
));

// Telefon nummer
piklist('field', array(
    'type' => 'text',
    'field' => 'phone',
    'label' => 'Telefon nr.',
    'value' => '+45 11 22 33 44',
    'attributes' => array(
        'readonly' => 'readonly',
        'class' => 'large-text'
    )
));

// Mail
piklist('field', array(
    'type' => 'text',
    'field' => 'mail',
    'label' => 'Email',
    'value' => 'hej@med.dig',
    'attributes' => array(
        'readonly' => 'readonly',
        'class' => 'large-text'
    )
));

// Addresse
piklist('field', array(
    'type' => 'text',
    'field' => 'address',
    'label' => 'Adresse',
    'value' => 'Hejmeddigvej 8, 23. sal, 5700 svendborg',
    'attributes' => array(
        'readonly' => 'readonly',
        'class' => 'large-text'
    )
));

// Addresse
piklist('field', array(
    'type' => 'text',
    'field' => 'category',
    'label' => 'Kategori',
    'value' => 'Bil',
    'attributes' => array(
        'readonly' => 'readonly',
        'class' => 'large-text'
    )
));



