<?php
// Obter o caminho da URL atual
$path = $_SERVER['REQUEST_URI'];

// Se o caminho não começa com /marca/, redirecionar para a página inicial
if (!preg_match('#^/marca/#', $path)) {
    header('Location: /');
    exit;
}

// Se for uma URL da pasta marca mas o arquivo não existe, redirecionar para a página inicial
$file_path = $_SERVER['DOCUMENT_ROOT'] . $path;
if (!file_exists($file_path)) {
    header('Location: /');
    exit;
}
?> 