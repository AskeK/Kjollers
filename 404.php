<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404</title>
</head>
<body>
    <?php wp_head(); ?>

    <div class="p404">
        <div class="title">
            Siden kunne desværre ikke findes
        </div>

        <div class="divider"></div>
        <a href="<?php echo get_home_url(); ?>" class="return">
            Gå tilbage til forsiden
        </a>
    </div>

    <?php wp_footer(); ?>
</body>
</html>
