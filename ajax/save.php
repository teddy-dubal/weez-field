<?php
$rootDir   = __DIR__ . '/..';
$vendorDir = $rootDir . '/vendor/';
$tmpDir    = sys_get_temp_dir() . '/';

require_once $vendorDir . 'autoload.php';

if (empty($_POST)) {
    die('No Hack');
}
$elt   = $_POST['json'];
$files = $rootDir . '/data/perso/' . date('YmdHis') . '.json';

if (file_put_contents($files, $elt)) {
    echo 'OK';
} else {
    echo 'KO';
}