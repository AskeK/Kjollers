<?php

/*
Title: Hold indstillinger
Post Type: teams
*/

// Piklist
piklist('field', array(
    'type' => 'radio',
    'field' => 'team-type',
    'label' => 'Hold type',
    'scope' => 'post_meta',
    'value' => 'article',
    'choices' => array(
        'car' => 'Bil',
        'rec' => 'Generhvervelse',
        'test' => 'Kontrollerende prøve',
        'ban' => 'Kørselsforbud',
        'cpr' => 'Førstehjælp',
    )
));

// Price
piklist('field', array(
    'type' => 'number',
    'field' => 'price',
    'label' => 'Pris',
    'value' => 13000
));

// Date
piklist('field', array(
    'type' => 'datepicker',
    'field' => 'date',
    'label' => 'Dato',
    'value' => date('M d, Y', time()), // set default value
    'options' => array(
        'dateFormat' => 'd M, yy'
    )
));

// Hours
piklist('field', array(
    'type' => 'number',
    'field' => 'hours',
    'label' => 'Tidspunkt: Time',
    'value' => 21
));

// Minutes
piklist('field', array(
    'type' => 'number',
    'field' => 'minutes',
    'label' => 'Tidspunkt: Minutter',
    'value' => 30
));
