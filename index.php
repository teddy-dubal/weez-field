<?php

/**
 * lanch server
 * php -S 0.0.0.0:8888
 */
$rootDir   = __DIR__;
$vendorDir = $rootDir . '/vendor/';

require_once $vendorDir . 'autoload.php';
require_once $rootDir . '/data/mock.php';
@mkdir($rootDir . '/data/perso');
$time_start  = microtime(true);
$loader      = new Twig_Loader_Filesystem($rootDir . '/templates');
$twig        = new Twig_Environment($loader, array(
//    'cache' => $rootDir . '/cache',
    'debug' => true
        ));
$fd         = $rootDir . '/data/perso/';

$persofiles = array_diff(scandir($fd), array(
    '..', '.'));
array_unshift($persofiles, '');

$defaultTpl    = [
    ['id' => 'id', 'label' => 'Id', 'lip' => '123'],
    ['id' => 'lastname', 'label' => 'Nom', 'lip' => 'ER'],
    ['id' => 'firstname', 'label' => 'Prénom', 'lip' => 'Teddy'],
    ['id' => 'email', 'label' => 'Email', 'lip' => 'teddy.boss@boss.fr'],
];
$modeToInclude = 'index.twig';
echo $twig->render($modeToInclude, array(
    'persoFiles' => $persofiles,
    'defaultTpl' => $defaultTpl
));
