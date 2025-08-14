<?php

require_once 'vendor/autoload.php';

use Monolog\Logger;
use Twig\Environment;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\DBAL\Connection;

$logger = new Logger('app');
$twig = new Environment(new \Twig\Loader\ArrayLoader([]));
$request = Request::createFromGlobals();

echo "Hello, World!\n";