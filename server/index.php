<?php
header('X-Powered-By: ');
$path = $_SERVER['REQUEST_URI'];
$url = 'http://190.92.158.4:3000' . $path;
$opts = stream_context_create([
    'http' => [
        'follow_location' => 0,
        'ignore_errors' => true,
        'header' => 'Accept-Encoding: identity'
    ]
]);
$body = file_get_contents($url, false, $opts);
foreach ($http_response_header as $h) {
    $l = strtolower($h);
    if (str_starts_with($l, 'content-type:')) header($h);
    if (str_starts_with($l, 'location:')) header($h);
    if (str_starts_with($l, 'cache-control:')) header($h);
    if (str_starts_with($l, 'etag:')) header($h);
    if (str_starts_with($l, 'last-modified:')) header($h);
}
echo $body;
